## 1. Visual-parity coverage + drift guard

- [x] 1.1 Extract `ROUTES` into a Playwright-free `tests/e2e/routes.ts` (with a `VISUAL_PARITY_EXCLUSIONS` set) and re-point `visual-parity.spec.ts` at it
- [x] 1.2 Grow `ROUTES` to a superset of every `src/nav.ts` content route — add the 7 cbun routes + 16 first-party pages, using the exact paths/labels nav registers
- [x] 1.3 Add `tests/unit/visual-parity-routes.spec.ts`: assert every nav content route (pages + `flattenNav` sections) is in `ROUTES` or excluded, plus no duplicate/stale entries

## 2. a11y rich-ARIA widget

- [x] 2.1 Add `/components/tree` (the `VdTree` `role=tree` widget) to `a11y-smoke.spec.ts` ROUTES and update the archetype comment

## 3. Interactive-surface tests

- [x] 3.1 Add `tests/unit/global-search-modal.spec.ts`: mount `GlobalSearchModal`, cmd+k to open, type a query, ArrowDown, assert the `role=listbox` has `role=option` children and `aria-selected`, Escape closes
- [x] 3.2 Extend `tests/unit/customizer-codegen.spec.ts` to cover `toVueSfc` / `stageStyle` / `styleToCss` — the emitted import line, the scoped `--vd-*` override block, script/template/style ordering, and the overrides engine (radius/shadow/glass/outline/font-scale)

## 4. Deploy gates

- [x] 4.1 `.github/workflows/deploy.yml`: run `typecheck` + `test:a11y` + `test:size` before `upload-pages-artifact`; a11y/size against a base-`/` build, artifact rebuilt with `VITE_BASE=/vd3-docs/`

## 5. pnpm overrides hygiene

- [x] 5.1 Document all overrides in vd3-cbun's style; bump `brace-expansion` to `5.0.7` (cbun floor); drop the `picomatch 2.3.2` pin (verified: it downgraded vite/tinyglobby's picomatch 4; remaining 2.3.2 is a correct micromatch dep)
- [x] 5.2 `pnpm install` resolves cleanly with the updated overrides

## 6. Dead-code cleanup

- [x] 6.1 Delete `src/layout/DocSectionNav.vue` (confirmed imported by nothing; no `.vd-section-nav` CSS exists in the docs repo)

## 7. Intro-paragraph uniformity

- [x] 7.1 Add a one-line intro `<p class="vd-mb-8">` under the demo-title on `Button`, `ButtonGroups`, `Chip`, `Collection`, `Scrollspy`, `Table`, `Avatar`, `Flow`, `Toast` (real APIs only)
- [x] 7.2 Normalize the component-demo intro `<p>` to `vd-mb-8`, non-muted, across `src/pages/components/` + `editors/CodeEditor.vue` + `media/MusicPlayer.vue`; leave heading levels and the guide/effect `vd-mb-6` convention untouched

## 8. Gates

- [x] 8.1 `pnpm typecheck`
- [x] 8.2 `pnpm lint` · `pnpm stylelint` — `app.css` stays shell/layout-only
- [x] 8.3 `pnpm test` — units green (drift guard, search-modal, extended codegen)
- [x] 8.4 `mise exec node@24 -- pnpm build` — vite-ssg prerenders every route
- [x] 8.5 Regenerate the Playwright visual baselines once (`visual-parity --update-snapshots`), then re-run without `--update` and confirm green; report PNGs added/changed
- [x] 8.6 `openspec validate docs-quality-pass`
