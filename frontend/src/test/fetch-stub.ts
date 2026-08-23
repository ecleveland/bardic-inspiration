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
  method: string;
  /** Parsed request body, or undefined when the request had none. */
  body: unknown;
}

export interface FetchStub {
  calls: RecordedCall[];
  /** Calls whose URL contains `fragment`, in order. */
  callsTo(fragment: string): RecordedCall[];
}

/**
 * Routes are keyed by a URL fragment. Longest key wins, so `/generations/x/rate`
 * can be routed separately from `/generations/x` without depending on the order
 * the keys were written in.
 */
export function stubFetch(routes: Record<string, Route>): FetchStub {
  const fragments = Object.keys(routes).sort((a, b) => b.length - a.length);
  const calls: RecordedCall[] = [];

  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const rawBody = init?.body;

      calls.push({
        url,
        method: init?.method ?? 'GET',
        body: typeof rawBody === 'string' ? JSON.parse(rawBody) : undefined,
      });

      const fragment = fragments.find((f) => url.includes(f));
      if (fragment === undefined) {
        throw new Error(
          `fetch-stub: no route for ${url}. Known fragments: ${fragments.join(', ') || '(none)'}`,
        );
      }

      const route = routes[fragment];
      const { body, status = 200, statusText } = typeof route === 'function' ? await route() : route;

      return new Response(body === undefined ? null : JSON.stringify(body), {
        status,
        statusText,
        headers: { 'Content-Type': 'application/json' },
      });
    }),
  );

  return {
    calls,
    callsTo: (fragment) => calls.filter((c) => c.url.includes(fragment)),
  };
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
