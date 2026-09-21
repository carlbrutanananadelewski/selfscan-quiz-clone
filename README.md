# SelfScan 3D Quiz Clone

A standalone React/Vite recreation of the live SelfScan 3D custom-orthotics quiz at `https://selfscan3d.com/#quiz`.

## Run locally

```bash
pnpm install
pnpm dev
```

No API server, database, PostgreSQL instance, or `DATABASE_URL` is required.

## Verified live flow

- Six complete browser journeys were recorded, one for each first-question reason.
- The audit varied every arch and hurt-frequency answer, None/one/several conditions, no-pain/specific/multiple left and right pain choices, both genders, all weight bands, and single/multiple shoe types.
- All six observed journeys traverse the same 13 live questions and finish at the `Custom Orthotic Insoles` result.
- Navigation is resolved by `nextQuestion(currentId, answers)` from an explicit answer-transition graph. It does not advance by array index.

See [`docs/path-map.md`](docs/path-map.md) for the transition tree and audit matrix. The machine-readable browser evidence is in [`docs/live-branch-evidence.json`](docs/live-branch-evidence.json).

## Key files

- `src/data/quiz-questions.ts` — exact question and answer copy
- `src/data/quiz-flow.ts` — explicit answer-driven transition graph
- `src/pages/Quiz.tsx` — quiz state, history, rendering, and controls
- `public/images/` — local quiz artwork