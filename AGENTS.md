# Repository Guidelines

## Project Structure & Module Organization
PPTist is a Vite-powered Vue 3 + TypeScript app. Runtime code lives in `src/`, with UI atoms under `src/components`, slide workspaces in `src/views`, shared logic in `src/hooks`/`src/utils`, and Pinia stores inside `src/store`. Service code that touches Dexie persistence, export, or network APIs sits in `src/services`. Static assets belong in `public/` for direct serving or `src/assets/` for processed SCSS/fonts. Documentation and specs (FAQ, Q&A) live under `doc/`—update them whenever a feature or hotkey changes.

## Build, Test, and Development Commands
- `npm install`: install dependencies; rerun after `package.json` edits.
- `npm run dev`: start the Vite dev server at http://127.0.0.1:5173/ with hot reload; use while building slides.
- `npm run build`: run `vue-tsc` and a production Vite build via `run-p` to ensure type safety and optimized bundles.
- `npm run preview`: serve the `dist/` output locally for smoke tests that mimic deployment.
- `npm run lint` / `npm run type-check`: enforce ESLint rules and TypeScript diagnostics; both must be clean before committing.

## Coding Style & Naming Conventions
Use TypeScript everywhere (no plain `.js` in `src/`). Follow the default 2-space indentation and avoid dangling semicolons, matching existing files. Components and Pinia stores should be PascalCase (`SlideToolbar.vue`, `useUserStore`). Composables exported from `src/hooks` follow a `useFeature` name. Alias imports with `@` instead of relative chains. Run `npm run lint -- --fix` to auto-resolve stylistic issues, and keep SCSS modules in `src/assets/styles` grouped by concern.

## Testing Guidelines
An automated test runner is not wired up yet, so rely on type-checking plus focused manual passes. Before submitting changes, launch `npm run dev` and verify slide CRUD, import/export, and animation timelines affected by your change. Document expected results in the PR description. If you introduce tests, co-locate them near the feature using a `.spec.ts` suffix and describe how to execute them until a dedicated script is added.

## Commit & Pull Request Guidelines
Commitlint enforces Conventional Commits (`feat(canvas): add alignment guides`, `fix(export): handle pptx fonts`). Reference an issue ID in the body when applicable. Each PR should include: what changed, why, manual test notes, and UI screenshots or GIFs for visual adjustments. Ensure `npm run lint` and `npm run type-check` pass, mention any follow-up work, and keep PRs scoped to one feature or fix.

## Architecture & Configuration Notes
Key libraries include Pinia for state, Dexie for IndexedDB persistence, pptxgenjs for exporting decks, and mitt for event buses; plan integrations around these. Vite aliases are configured in `vite.config.ts`, so update that file plus `tsconfig*.json` if you add path shortcuts. Keep credentials or AI keys out of the repo—store them in a local `.env` referenced by `env.d.ts`, and document configuration steps in `doc/` for future agents.
