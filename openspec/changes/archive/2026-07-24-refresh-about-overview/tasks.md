## 1. Rewrite the About page

- [x] 1.1 Replace `/about` content in `src/pages/about.vue` with the vd3 overview (what it is / how it's built / what you get / open source); swap `.founders-message*` markup + scoped styles for `.about-intro*`. No `app.css` changes.
- [x] 1.2 Update the `/about` keywords in `src/nav.ts` to include `vd3` and `overview`.

## 2. Verify

- [x] 2.1 `mise exec node@24 -- pnpm build` prerenders all routes clean (base `/`).
- [x] 2.2 Gates pass: `pnpm typecheck`, `pnpm lint`, `pnpm stylelint`, `pnpm format:check`.
- [x] 2.3 Refresh the `/about` Playwright visual baseline: `pnpm exec playwright test visual-parity -g "about" --project='Chromium Desktop' --update-snapshots`, then inspect the diff and commit the updated `vd3-about-*` PNG.

## 3. Close out

- [x] 3.1 `openspec validate refresh-about-overview --strict` passes.
- [x] 3.2 No changelog entry (docs-site content is never tracked in the package changelog).
