## 1. Local dogfooding setup

- [x] 1.1 Point `@vanduo-oss/vd3-cbun` at `link:../vd3-cbun` in `package.json` and `pnpm install` (temporary — revert before commit); confirm `dist/code-editor/index.js` resolves
- [x] 1.2 Add `import "@vanduo-oss/vd3-cbun/code-editor/css";` to `src/main.ts`

## 2. Nav + routing

- [x] 2.1 Add the **Editors** `NavCategory` (id `editors`, icon `code`) with the `code-editor` section (route `/editors/code-editor`, keywords) to the Components tab in `src/nav.ts`
- [x] 2.2 In `src/router.ts`, import `CodeEditorPage from "@/pages/editors/CodeEditor.vue"` and add `"code-editor": CodeEditorPage` to `componentPages`
- [x] 2.3 Confirm no collision with the unimplemented `logo-effects-gallery` change (different nav category + import)

## 3. Page

- [x] 3.1 Add `src/pages/editors/CodeEditor.vue` (built on the `media/MusicPlayer.vue` pattern): intro, live v-model demo with bound-value readout + language switcher + feature toggles, per-language demos, read-only / wrap / no-gutter / placeholder demos, `DocCodeSnippet` install + usage, and props / events / exposed / CSS-vars / accessibility tables — rendering the real `VdCodeEditor`

## 4. Gates

- [x] 4.1 `mise exec node@24 -- pnpm build` (vite-ssg prerenders every route incl. `/editors/code-editor` cleanly)
- [x] 4.2 `pnpm typecheck` · `pnpm lint` · `pnpm stylelint` · `pnpm run format:check` pass
- [x] 4.3 `pnpm test` passes
- [x] 4.4 `pnpm run test:a11y` (axe smoke clean on the new page — textarea `aria-label`, gutter/highlight `aria-hidden`, copy-button label)
- [x] 4.5 `pnpm run test:size` under the gzip budget
- [x] 4.6 Visual-parity baseline: opt-in only — if the route is added to `tests/e2e/visual-parity.spec.ts` `ROUTES`, run `pnpm exec playwright test visual-parity --project='Chromium Desktop' --update-snapshots` and inspect the diff (cbun pages are currently excluded)

## 5. Land (after cbun 1.1.0 is published)

- [x] 5.1 Revert `package.json` `@vanduo-oss/vd3-cbun` back to a published caret range (`^1.1.0`); `pnpm install`
- [x] 5.2 `openspec validate add-code-editor-page --strict`
- [x] 5.3 Push to `origin/main` (docs works on main; CI + Pages deploy on push) — only after the manual-testing sign-off
