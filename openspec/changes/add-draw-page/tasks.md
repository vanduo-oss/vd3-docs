## 1. Local dogfooding setup

- [x] 1.1 Temporarily set `@vanduo-oss/vd3-cbun` to `link:../vd3-cbun` in `package.json` (keep `vue`/`pinia` dedupe + `optimizeDeps.exclude`); `pnpm install` so the unreleased `./draw` subpath resolves locally
- [x] 1.2 Build the sibling first (`vd3-cbun`: `pnpm build`) so `dist/draw/*` exists for the linked import

## 2. Nav + routing

- [x] 2.1 Add a `NavSection` to the **Canvas** category in `src/nav.ts`: `id: "draw"`, `title: "Draw"`, `route: "/canvas/draw"`, an icon, and `keywords` (draw, whiteboard, canvas, sketch, shapes, freehand, sticky, annotate)
- [x] 2.2 Import `Draw.vue` in `src/router.ts` and add `draw: DrawPage` to `componentPages` (key must equal the nav `id`)
- [x] 2.3 Confirm no collision with active `logo-effects-gallery` (it edits the Effects category of the same files) — resolve any adjacent-line overlap textually

## 3. Page

- [x] 3.1 Create `src/pages/canvas/Draw.vue` — `import { VdDraw } from "@vanduo-oss/vd3-cbun/draw"` + `import "@vanduo-oss/vd3-cbun/draw/css"`; follow the `Flowchart.vue` structure (live `vd-card demo-card` editor, then a `vd-card-glow` API-reference card)
- [x] 3.2 Add interactive controls bound to real APIs (tool switch, undo/redo, SVG/PNG export) via reactive refs and the exposed methods; seed a small starter document
- [x] 3.3 Write the API-reference tables (props / events / exposed methods) from the real `./draw` surface using `DocCodeSnippet` (install + usage) and `vd-table-striped` — no invented API

## 4. Gates

- [x] 4.1 `pnpm test` — `tests/unit/nav.spec.ts` (unique id/route) and `tests/unit/router.spec.ts` (route count) stay green
- [x] 4.2 `mise exec node@24 -- pnpm build` — vite-ssg prerenders all routes (including `/canvas/draw`) with zero errors
- [x] 4.3 Verify the page is NOT added to `tests/e2e/visual-parity.spec.ts` `ROUTES` (canvas precedent); optionally add `/canvas/draw` to `tests/e2e/a11y-smoke.spec.ts`
- [x] 4.4 `pnpm lint` · `pnpm run stylelint` · `pnpm run format:check` — confirm `app.css` stays shell/layout-only (no `draw`-specific rules)
- [x] 4.5 `openspec validate add-draw-page --strict`

## 5. Land

- [x] 5.1 Restore `@vanduo-oss/vd3-cbun` from `link:../vd3-cbun` to the published range (`^1.2.0` once cbun publishes; keep pending until then) and preserve the `vite-ssg` patch + pnpm `overrides` in the lockfile
- [x] 5.2 Commit locally on `dev-v1.1.0` (no push today); the PR to `main` under the new docs flow follows once cbun `1.2.0` is published
