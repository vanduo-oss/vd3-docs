## 1. Verify the real APIs

- [x] 1.1 Read the installed `@vanduo-oss/vd3` component `.d.ts` in `node_modules` for `VdModal`, `VdRating`, `VdTree`, `VdTransfer`, `VdButtonGroup`, `VdCheckboxGroup`, `VdRadioGroup`, `VdSelect`, `VdButton`, `VdBadge`, `VdCard` — confirm every prop/emit/slot before documenting it
- [x] 1.2 Confirm the real DOM events (`tree:check`, `tree:toggle`, `transfer:change`) and the modal render (panel-based DOM, `update:open` + `close`) in the built package
- [x] 1.3 Confirm `useTheme` STORAGE_KEYS (`vanduo-palette`, `vanduo-primary-color`, `vanduo-neutral-color`, `vanduo-radius`, `vanduo-font-preference`, `vanduo-theme-preference`)

## 2. Page fixes

- [x] 2.1 `Modal.vue`: render `<VdModal>` (open/title/size/close-on-backdrop + body/`#footer` slots); drop data-modal/data-dismiss rows, the modal:open/close events table, the hand-rolled `.vd-modal.is-open` snippet and vanilla comments; rewrite the CSS-class table to the rendered panel DOM
- [x] 2.2 `Rating.vue`: replace `data-vd-rating` snippets + Data-Attributes table with the real component API; fix the "all via data attributes" prose; delete the `rating:change` events table
- [x] 2.3 `Tree.vue`: swap `data-vd-tree` snippets for `<VdTree :nodes>` markup; drop the Data-Attributes table + `.vd-tree-lines` class row; reword prose to the props; keep the events table
- [x] 2.4 `Transfer.vue`: swap `data-vd-transfer` snippet for `<VdTransfer :items>` markup; drop the Data-Attributes table; keep the events table
- [x] 2.5 `ButtonGroups.vue`: add a live `<VdButtonGroup>` demo (`size` / `vertical` / `fullWidth`) with a Component API table
- [x] 2.6 `Forms.vue`: add live `<VdCheckboxGroup>`, `<VdRadioGroup>`, and `<VdSelect>` demos with verbatim API tables
- [x] 2.7 `ThemeCustomizerGuide.vue`: correct the persisted `localStorage` keys to the real six
- [x] 2.8 `Badge.vue` / `Button.vue` / `Primitives.vue`: relabel "Vanilla-only" → "CSS-only classes (not wrapped as props)"; drop the dual-engine data-attribute framing

## 3. Customizer codegen

- [x] 3.1 `registry.ts` + `codegen.ts`: emit CSS-only looks as `class` on the element (outline/ghost/badge-outlined/card-outlined/filled/glow/glass) and keep only real props (`variant` primary/secondary, `size`, `pill`, `elevated`)
- [x] 3.2 Add `tests/unit/customizer-codegen.spec.ts` asserting the generated SFC contains only valid props and the expected classes for each component

## 4. Gates

- [x] 4.1 `pnpm typecheck` — no missing/mistyped prop or emit on any page or generated snippet source
- [x] 4.2 `pnpm test` — units green (including the new codegen test)
- [x] 4.3 `pnpm lint` · `pnpm run stylelint` · `pnpm run format:check` — `app.css` stays shell/layout-only
- [x] 4.4 `mise exec node@24 -- pnpm build` — vite-ssg prerenders every `nav.ts` route with zero errors
- [x] 4.5 Regenerate the affected Playwright visual baselines (`visual-parity --project='Chromium Desktop' --update-snapshots`) and report which PNGs changed
- [x] 4.6 `openspec validate docs-reality-fixes --strict`
