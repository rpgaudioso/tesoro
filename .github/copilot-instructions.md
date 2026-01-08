# Tesoro — Copilot Instructions (Repo-wide)

## 0) Safety / Hard rules (must follow)

- NEVER run or suggest running: `git commit`, `git push`, `gh pr create`, `gh pr merge`, `git tag`, `npm publish`, `pnpm publish` unless I explicitly type one of the tokens below.
- NEVER modify or delete data in production-like environments.
- NEVER create or apply destructive DB changes without confirmation.

### Authorization tokens

Only perform these actions if I type the exact token:

- `AUTORIZO_COMMIT` → you may run `git commit` (and only after showing a summary + files list).
- `AUTORIZO_PUSH` → you may run `git push`.
- `AUTORIZO_PR` → you may open a PR.
- `AUTORIZO_MIGRATION` → you may create/apply Prisma migrations that modify schema.

If token is not present: stop before the action and ask for confirmation.

## 1) How to respond

- Prefer short, actionable answers.
- Before coding: write a brief plan (3–7 bullets).
- When changing code: list the files you will touch.
- At the end: provide a small manual test checklist.
- If multiple valid approaches exist: present 2 options with trade-offs and wait for my decision.

## 2) Repo tech stack (context)

- Backend: NestJS + Prisma + Postgres, JWT auth, Guards (JwtAuthGuard + WorkspaceGuard).
- Frontend: React + Vite + TypeScript, TanStack Query, React Router v6, CSS Modules + design tokens.
- Shared package: Zod schemas + shared TS types/enums.

## 3) Preferences

- Keep code simple: avoid over-abstraction (factories/formatters) unless clearly needed.
- Prefer functional utilities over heavy OOP patterns.
- Do not add new dependencies without asking first.

## 4) Definition of Done (default)

For any user-facing feature:

- Backend: endpoints + service + validation + workspace scoping.
- Prisma: migration (when needed) and indexes/constraints when appropriate.
- Frontend: route/page + loading/empty/error states + TanStack Query invalidation.
- Update `.http` for new endpoints.
