# Part 6 — Advanced state management

Exercises for [Full Stack Open](https://fullstackopen.com) part 6
(CSM141082): Zustand stores, TanStack Query, and connecting React apps
to servers.

## Apps

| App | Topic |
| --- | --- |
| `unicafe` | feedback stats in a Zustand store |
| `anecdotes` | voting, creation and filtering with an async store backed by json-server |
| `query-anecdotes` | the same app on TanStack Query with context-based notifications |

Each app has a matching `-tests` directory (or built-in unit tests for
`anecdotes`) with Vitest and Playwright coverage.

## Run

```bash
cd unicafe            # or anecdotes / query-anecdotes
npm install
npm run dev           # http://localhost:5173
npm run server        # json-server for the anecdote apps (where present)
```

## Test

```bash
cd anecdotes && npm test          # vitest store tests
cd unicafe-tests && npm test      # playwright e2e
cd query-anecdotes-tests && npm test
```

## Test in CI

`.github/workflows/ci.yml` runs the unit tests for `anecdotes` and the
Playwright suites for `unicafe` and `query-anecdotes` on every push and
pull request. This directory is self-contained — copy its contents into
a new repository and CI works without any extra setup.
