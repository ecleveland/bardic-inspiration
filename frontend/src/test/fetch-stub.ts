import { vi } from 'vitest';

/**
 * Installs a `fetch` stub so component specs exercise the real client in
 * `src/lib/api.ts` instead of a mock of it. Error strings, request bodies and
 * JSON parsing all come from the code that ships.
 */

export interface StubResponse {
  /** Serialized as the JSON body. Omit for an empty body. */
  body?: unknown;
  /** Defaults to 200. */
  status?: number;
  statusText?: string;
}

/** A static response, or a function called per request (for deferred resolution). */
export type Route = StubResponse | (() => StubResponse | Promise<StubResponse>);

export interface RecordedCall {
  url: string;
  /** Path only. Matching ignores origin and query string. */
  pathname: string;
  method: string;
  /** Parsed request body, or undefined when the request had none. */
  body: unknown;
}

export interface FetchStub {
  readonly calls: readonly RecordedCall[];
  /** Calls whose path ends with `fragment`, in order. */
  callsTo(fragment: string): readonly RecordedCall[];
}

/**
 * Requests that matched no route. A component that catches its own fetch
 * errors would otherwise hide a typo'd or renamed route, so the setup file
 * fails the test on any entry here rather than trusting each spec to notice.
 */
let unrouted: string[] = [];

/**
 * Routes are keyed by the end of the request path. Suffix rather than
 * substring so `/spells` cannot answer `getSpell(id)` with a list, and
 * `/generations/x` cannot answer a POST to `/generations/x/rate`. Longest key
 * wins where two both match.
 */
export function stubFetch(routes: Record<string, Route>): FetchStub {
  const fragments = Object.keys(routes).sort((a, b) => b.length - a.length);
  const calls: RecordedCall[] = [];
  unrouted = [];

  const impl = (async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = String(input);
    const { pathname } = new URL(url, 'http://stub.invalid');
    const rawBody = init?.body;

    if (rawBody !== undefined && rawBody !== null && typeof rawBody !== 'string') {
      // Recording `undefined` here would let a spec assert an empty body and
      // pass. Nothing sends a non-string body today; make it loud if it does.
      throw new Error(`fetch-stub: cannot record a ${typeof rawBody} request body for ${pathname}`);
    }

    calls.push({
      url,
      pathname,
      method: init?.method ?? 'GET',
      body: typeof rawBody === 'string' ? JSON.parse(rawBody) : undefined,
    });

    const fragment = fragments.find((f) => pathname.endsWith(f));
    if (fragment === undefined) {
      unrouted.push(`${init?.method ?? 'GET'} ${pathname}`);
      throw new Error(
        `fetch-stub: no route for ${pathname}. Known routes: ${fragments.join(', ') || '(none)'}`,
      );
    }

    const route = routes[fragment];
    const { body, status = 200, statusText } = typeof route === 'function' ? await route() : route;

    return new Response(body === undefined ? null : JSON.stringify(body), {
      status,
      statusText,
      headers: { 'Content-Type': 'application/json' },
    });
  }) satisfies typeof fetch;

  vi.stubGlobal('fetch', vi.fn(impl));

  return {
    calls,
    callsTo: (fragment) => calls.filter((c) => c.pathname.endsWith(fragment)),
  };
}

/**
 * Fails the test if any request went unrouted. Called from `vitest.setup.ts`,
 * because the components under test catch their own fetch errors and would
 * otherwise swallow the stub's complaint.
 */
export function assertNoUnroutedRequests(): void {
  if (unrouted.length === 0) return;
  const seen = unrouted.join(', ');
  unrouted = [];
  throw new Error(
    `fetch-stub: ${seen} matched no route. Add it to stubFetch, or the component swallowed the error and the spec passed for the wrong reason.`,
  );
}

/**
 * A promise plus its resolver, for holding a request in flight while asserting
 * on loading and disabled states.
 */
export function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}
