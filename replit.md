# SelfScan 3D Quiz Clone

A pixel-faithful React recreation of the SelfScan 3D custom-orthotics intake quiz, ready for rebranding.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/selfscan-quiz-clone run dev` — run the quiz web app
- `pnpm --filter @workspace/selfscan-quiz-clone run typecheck` — check the quiz app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/selfscan-quiz-clone/src/data/quiz-questions.ts` — canonical quiz copy and options
- `artifacts/selfscan-quiz-clone/src/pages/Quiz.tsx` — quiz state, navigation, and rendering
- `artifacts/selfscan-quiz-clone/docs/path-map.md` — complete question and branch map
- `artifacts/selfscan-quiz-clone/public/images/` — local quiz artwork

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- Fourteen-screen responsive intake and recommendation flow
- Exact single-select, multi-select, auto-advance, Previous/Next, progress, summary, and product-result behavior
- All six entry reasons converge on the verified live sequence while retaining answers

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
