# start-ticket overrides: Bardic Inspiration

Project-specific values for the `/start-ticket` workflow. Two npm packages,
`backend/` (NestJS) and `frontend/` (Next.js), no monorepo tooling. Every
command runs from a package root, not the repo root.

## Pre-flight

- `git status` clean.
- `gh auth status` succeeds.
- No stale dev servers: `lsof -i :3000,:3001 -sTCP:LISTEN`. Stop them with
  `/stop-dev` rather than killing by hand.
- **MongoDB is not needed to run tests.** Every spec under `backend/src` mocks
  its Mongoose model. Only start Mongo (`docker compose up mongodb -d`) if the
  ticket involves seeding or manual API poking.

## Fast test runners (TDD inner loop)

From `backend/`:

- One file: `npx jest src/path/to/thing.spec.ts`
- One case: `npx jest src/path/to/thing.spec.ts -t "name fragment"`
- One module: `npx jest src/generation`

From `frontend/` (vitest, added by VEG-89):

- One file: `npx vitest run src/components/Thing.spec.tsx`
- One case: `npx vitest run src/components/Thing.spec.tsx -t "name fragment"`
- Watch: `npm run test:watch`

`npm test` is `vitest run`. The bare `vitest` binary watches, so never put it
in a script CI calls.

## Verification gate

There is no `verify.sh`. Run what CI runs, in this order:

```
cd backend  && npm run lint:check && npm test && npm run build
cd frontend && npm run lint:check && npm run typecheck && npm test && npm run build
```

**The frontend needs `typecheck` as its own step.** `next build` type-checks the
route graph, and spec files are not in it, so a type error under
`src/**/*.spec.*` builds green. Vitest strips types without checking them. The
backend needs no equivalent because `nest build` runs `tsc` over everything.

**Use `lint:check`, never `lint`.** The backend's `lint` script passes `--fix`,
so running it rewrites files and reports success on code that does not
actually lint clean. `lint:check` exists specifically for this.

Backend lint has been clean since VEG-90. Any failure is a regression you
introduced, not pre-existing noise.

## E2E policy

There is no usable E2E suite. `backend/test/app.e2e-spec.ts` is untouched Nest
boilerplate that expects `GET /` to return `Hello World!`, but the app serves
under an `/api` prefix with no root route. Jest's `rootDir: "src"` excludes it,
so it never runs.

Do not treat E2E as a gate, and do not claim it passed. State that no E2E
suite exists when reporting.

## Test conventions

- Specs live next to their subject: `foo.service.ts` → `foo.service.spec.ts`.
  Frontend included: `LyricsDisplay.tsx` → `LyricsDisplay.spec.tsx`, not
  `__tests__/LyricsDisplay.test.tsx`.
- Controller and pipe tests go through real HTTP with `supertest` plus the real
  `ValidationPipe`, not by calling methods directly. See
  `src/common/pipes/object-id-params.spec.ts`.
- Mongoose models are provided via `getModelToken` with plain `jest.fn()` mocks.
- The `no-unsafe-*` eslint rules are off for `**/*.spec.ts` because jest mocks
  are `any` by construction. `no-unused-vars` still applies there.
- Mocking `@anthropic-ai/sdk`: its error classes live on the prototype chain,
  not as own properties, so `Object.assign` over the default export does not
  copy them. Copy the ones you need explicitly or `instanceof` silently fails.

### Frontend specifics

- Vitest globals are **off**. Import `describe`/`it`/`expect`/`vi` from
  `vitest` in every spec. This is what keeps `eslint.config.mjs` free of
  test-only environment config.
- Stub `fetch` with `stubFetch` from `src/test/fetch-stub.ts`; do not mock
  `@/lib/api`. The real client then produces the real error strings, and the
  real child components render, so a spec cannot pass against an error shape
  the app never emits.
- Fixtures for `Spell`, `Genre` and `Generation` live in `src/test/fixtures.ts`.
- `userEvent` deadlocks against `vi.useFakeTimers()`. When a spec is about a
  timer, drive it with `fireEvent` inside `act` instead. See the two-second
  reset case in `LyricsDisplay.spec.tsx`.
- jsdom implements neither `navigator.clipboard` nor `document.execCommand`.
  Define them per spec with `Object.defineProperty(..., {configurable: true})`
  and delete them in `afterEach`.

## Commit and PR conventions

Commits: imperative subject with the ticket ID in parens, e.g.
`Validate ObjectIds and cap customPrompt length (VEG-63, VEG-64)`. Body explains
why, not what. Trailer:

```
Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

PRs: ticket ID in the title, `Fixes VEG-NN` in the body so Linear transitions
the issue, and the `🤖 Generated with [Claude Code](https://claude.com/claude-code)`
trailer. Bodies explain the reasoning and call out deliberate behavior changes
and anything left out of scope.

Stage only files relevant to the change. Never `git add -A`. `backend/coverage/`
and `.claude/settings.local.json` are gitignored, but new build artifacts appear
from time to time.

## Branch protection

`main` requires the `Backend` and `Frontend` checks to pass. Red CI blocks the
merge button. `enforce_admins` is off, so an override is possible but should be
deliberate. `strict` is off, so a PR green against an older `main` can still
merge.

## Review sizing

Use the skill defaults (skip / standard / deep). Treat these as risk triggers
for this project, escalating to **deep**:

- Anything under `src/common/`, which every module shares.
- Auth-adjacent or input-validation code: pipes, DTO validators, CORS, Helmet,
  rate limiting, the global exception filter.
- Anything touching the Anthropic call path, since failures there cost money
  and can leak upstream detail.
- Mongoose schema or index changes.

## Check the ticket is still real

The board is ~39 tickets filed in one batch on 2026-03-09 from a security and
code review. They overlap. VEG-77 silently delivered all of VEG-65, which was
only caught by reading current `main` before branching.

Before writing code, verify the described problem still exists. If it does not,
close the ticket with a comment recording what you checked and how, and file
any genuine gap separately.
