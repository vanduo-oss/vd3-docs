# Tasks

> Run all tooling under Node 24 (`mise exec node@24 -- <cmd>`; the shell node is
> v22). Old-line repos (`core`, `framework`, `vue`, `vd2`, `charts`, `flowchart`,
> `hex-grid`, `music-player`) **and** the two vd3 packages (`../vd3`,
> `../vd3-cbun`) are strictly read-only — read them for the export surface, never
> write into them. Do **not** edit `src/nav.ts` or `src/router.ts` (a dedicated
> wiring step owns them — see §10). Do not commit or push (the orchestrator
> commits).

## 1. Displayed package strings (`docs-content`)

- [x] 1.1 Retarget the **displayed** old-line names in snippet strings and prose
      `<code>` across `src/pages` + `src/components`: `@vanduo-oss/vue` →
      `@vanduo-oss/vd3`; `@vanduo-oss/{charts,flowchart,hex-grid,music-player}/vue`
      → `@vanduo-oss/vd3-cbun/{charts,flowchart,hex-grid,music-player}`; the
      `.../css` and `.../hex-math` subpaths likewise. (Live `import` statements
      are already correct — do not touch them.)
- [x] 1.2 Retarget displayed `pnpm add @vanduo-oss/{vue,charts,flowchart,
      hex-grid,music-player}` install strings (incl. `canvas/Charts.vue`,
      `canvas/Flowchart.vue`, `canvas/Hex.vue`, `media/MusicPlayer.vue`,
      `guides/GettingStarted.vue`) to `pnpm add @vanduo-oss/vd3` /
      `@vanduo-oss/vd3-cbun`.
- [x] 1.3 Grep gate: `@vanduo-oss/vue`, `@vanduo-oss/charts`,
      `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, `@vanduo-oss/music-player`
      return **zero** hits in `src/` (code, snippet strings, or prose) — with the
      sole intended exception of `guides/MigrationComparison.vue`, which names the
      old `@vanduo-oss/vue` line as the labelled "Before (v2)" side of the map.

## 2. Drop the vanilla-only guides (`docs-content`)

- [x] 2.1 Delete `src/pages/guides/EsmVsIife.vue`.
- [x] 2.2 Delete `src/pages/guides/LifecycleManager.vue`.
- [x] 2.3 Re-point every inbound link to a surviving guide: `home.vue` feature
      card `to: "/guides/esm-vs-iife"` and the `VanduoEcosystem` "next" card to
      the same; any `guides/framework-integration` prose linking
      `esm-vs-iife`/`lifecycle-manager`.
- [x] 2.4 Grep gate: `/guides/esm-vs-iife` and `/guides/lifecycle-manager`
      return **zero** hits in `src/`. (The two stale Playwright baselines +
      their `ROUTES` entries were also removed — see §12.)

## 3. Rewrite the four architecture/migration/install/ecosystem guides (`docs-content`)

- [x] 3.1 `guides/RuntimeArchitecture.vue` → **"vd3 Architecture"**: the
      standalone `tokens → @vanduo-oss/vd3/css → components/composables` story;
      remove `Vanduo.init`/`destroy`, `loadVanduoRuntime`, IIFE, and every "both
      engines" / vanilla-vs-vue side-by-side.
- [x] 3.2 `guides/MigrationComparison.vue` → **"Migrating from vanduo v2 to
      vd3"**: package map (old → vd3 / vd3-cbun), composable API diffs, the
      `@vanduo-oss/framework/css` → `@vanduo-oss/vd3/css` import change, and the
      one-line-per-app plugin-import-source note.
- [x] 3.3 `guides/FrameworkIntegration.vue` → **"Installation & Integration"**:
      `pnpm add`, `import "@vanduo-oss/vd3/css"`, `app.use(VanduoVue, …)`, and
      vite-ssg / SSR guidance.
- [x] 3.4 `guides/VanduoEcosystem.vue` → the **three-repo vd3 line** (`vd3-docs`
      + `vd3` + `vd3-cbun`) + the old-line maintenance note; drop the "pick an
      engine" framing and the four-add-on-package grid.
- [x] 3.5 Grep gate: `Vanduo.init`, `loadVanduoRuntime`, `IIFE`/`iife`, and
      "both engines" return **zero** hits across these four files.

## 4. Home marketing (`docs-content`)

- [x] 4.1 `home.vue`: rewrite the feature cards + intro so no card says "both
      engines" / "Vanilla + Vue" / "two engines" / "dual-engine"; ensure no
      feature card `to:` points at a deleted guide route (§2.3).

## 5. Changelog curated onto the vd3 packages (`docs-content`)

- [x] 5.1 `pages/changelog.vue`: rewrite the inline release cards + header copy to
      name only `@vanduo-oss/vd3` (`0.1.0`) and `@vanduo-oss/vd3-cbun` (`0.2.0`);
      remove every `data-engine` attribute and every old-line package name.
- [x] 5.2 `pages/changelog-vue-content.html`: curate the history partial to the
      two vd3 packages (or replace its old-line body); no `@vanduo-oss/{core,
      framework,vue,charts,flowchart,hex-grid,music-player}` name survives.
- [x] 5.3 Grep gate: `data-engine` and the seven old-line package names return
      **zero** hits in `changelog.vue` + `changelog-vue-content.html`. Policy:
      packages only, never docs-site content.

## 6. Upgrade six class-only pages to dogfood the real components (`docs-content`)

- [x] 6.1 `components/Breadcrumb.vue` → import + live-render `VdBreadcrumb`
      (`items`/`separator`/`size`/`ariaLabel`, default slot); add a Component API
      (Vue 3) table; keep the `breadcrumbs.css` class reference.
- [x] 6.2 `components/Fab.vue` → `VdFab` (`variant`/`size`/`extended`/`glass`/
      `position`/`label`/`ariaLabel`, `click`, `default`+`actions` slots).
- [x] 6.3 `components/Footer.vue` → `VdFooter` (`columns`/`dark`/`size`,
      `default`+`copyright` slots).
- [x] 6.4 `components/Navbar.vue` → `VdNavbar` (`variant`/`dark`/`position`/
      `scrollThreshold`/`toggleLabel`/`closeOnNavigate`; `open`/`close`/`toggle`;
      exposed `{ isOpen, open, close, toggle }`).
- [x] 6.5 `components/ThemeSwitcher.vue` → `VdThemeSwitcher` (`menu`/`align`,
      `change`).
- [x] 6.6 `components/ThemeCustomizer.vue` → `VdThemeCustomizer` (`showPalette`;
      exposed `{ open, close, toggle }`; `vd:open-customizer` window event).
- [x] 6.7 For each: retarget the Usage snippet string to `@vanduo-oss/vd3`;
      transcribe the API table from the component source (no invented
      props/emits/slots); verify prop names/types against `../vd3` (read-only).

## 7. New DocSearch page (`docs-content`)

- [x] 7.1 Create `src/pages/components/DocSearch.vue`: an inline `DocSearchDoc[]`
      fixture, a live `<VdDocSearch :data="docs" />`, a props/emits table for
      `VdDocSearch`, and a controller table for `useDocSearch`.
- [x] 7.2 Verify the `DocSearchDoc` / `DocSearchResult` fields and the component
      props against `../vd3/src/composables/useDocSearch.ts` +
      `components/VdDocSearch.vue`.

## 8. Composable demos (`docs-content`)

- [x] 8.1 `guides/LazyLoading.vue`: add a live `useLazyLoad()` demo (an
      `observe`-driven reveal, optionally `loadSection`); reframe the intro off
      "the Vanilla engine lazy-loads modules" onto the vd3 composable + native
      tactics; keep the tactics table.
- [x] 8.2 `core/GridSystem.vue`: replace the page-local `mode` ref +
      `toggleMode()` + the scoped Fibonacci CSS with `useGrid(containerRef)`
      driving the toggle container; show `setGridSystem` for the document-level
      default. Delete the now-dead `<style scoped>` reimplementation.

## 9. Verification

- [x] 9.1 `pnpm typecheck` (vue-tsc) passes — the six upgraded pages + DocSearch
      import real exports; no missing prop/emit/slot; no dangling import to a
      deleted guide.
- [x] 9.2 `pnpm lint` and `pnpm stylelint` pass; `styles/app.css` stays
      shell/layout-only (untouched).
- [x] 9.3 `pnpm test` (vitest) passes (41 files / 143 tests).
- [x] 9.4 `pnpm build` (`vite-ssg build`, Node 24) prerenders **all 92 routes**
      clean against the linked `../vd3` + `../vd3-cbun` (93 − 2 dropped + 1
      DocSearch); sitemap generates; `dist/` has **zero** `window.Vanduo`
      references (bundle gate still holds).
- [ ] 9.5 Re-capture the Playwright visual-parity baselines (`--update-snapshots`)
      for the changed pages now that live components replace static markup; review
      each diff as intended (full a11y + baseline sign-off is Phase 7, not here).
      **Still open** — the two dropped-route baselines were deleted (§12); the
      remaining pages' snapshots are unchanged pending the `--update-snapshots`
      sign-off run.
- [ ] 9.6 `test:e2e` layout-navigation + `test:size` gzip budget pass on the
      rebuilt site. `test:size` passes (app.js gz 342.5 KB / app.css gz 104.0 KB);
      `test:e2e` (Playwright, needs a browser + running server) is left for the
      baseline sign-off run.

## 10. Nav / router wiring (separate step — completed in that step; verified here)

- [x] 10.1 `nav.ts`: add the `doc-search` section under the **Components**
      category (`route: "/components/doc-search"`, keywords `["search",
      "docsearch", "command palette", "cmd k", "combobox"]`); remove the
      `esm-vs-iife` and `lifecycle-manager` guide sections. (Verified: `nav.ts`
      has the `doc-search` section and no dropped-guide refs.)
- [x] 10.2 `router.ts`: `import DocSearchPage from
      "@/pages/components/DocSearch.vue"` and register it in `componentPages`
      under `"doc-search"`; remove the `EsmVsIife` / `LifecycleManager` imports +
      their `componentPages` entries. (Verified: `router.ts:65` imports
      `DocSearchPage`, `:154` registers `"doc-search"`, no dropped-guide refs.)
- [x] 10.3 Search-index / nav keywords reflect the +1 / −2 routes; all other 90
      routes keep their paths and keywords.

## 11. Spec bookkeeping

- [x] 11.1 `openspec validate docs-content --strict` passes.
- [x] 11.2 No edits to any old-line repo or to `../vd3` / `../vd3-cbun`; no
      publish, deploy, or CNAME. (The follow-up pass in §12 was pre-authorised to
      touch `nav.ts` / `router.ts` if a defect required it; none did, so both are
      untouched.)

## 12. Follow-up: verified-defect fixes (this pass)

Residual content-correctness defects surfaced after §1–§11 and fixed here. All
fixes stay inside `src/` + `tests/`; no old-line repo, `../vd3`, or `../vd3-cbun`
write; no publish.

- [x] 12.1 **Class A — displayed old-package import strings.** Retargeted
      `@vanduo-oss/vue` → `@vanduo-oss/vd3` in every `vue3Usage` / `vue3Wiring` /
      `typesJs` snippet string + prose `<code>` across 49 pages (the live
      `<script setup>` imports were already correct). `MigrationComparison.vue`
      keeps the old name as the labelled "Before (v2)" side (§1.3 exception).
- [x] 12.2 **Class B — deleted vanilla global runtime APIs shown as current
      usage.** Rewrote every `window.Vanduo*` / `Vanduo*.method()` /
      `Vanduo.init()` snippet + API-table row onto the real vd3 surface:
      `Charts.vue` (→ `<VdChart>`), `MusicPlayer.vue` (all
      `VanduoMusicPlayer.*` → `<VdMusicPlayer>` + the exposed `player` API),
      `Popover.vue` (`usePopover` controller), `Dropdown.vue` (`useDropdown`
      controller), `Menu.vue`, `Tooltip.vue`, `FormValidation.vue` (`useValidate`
      controller), `Sticky.vue` (`useAffix`), `CodeSnippet.vue`, `Spotlight.vue`
      (`useSpotlight` controller), `Search.vue` (`useSearch()` registry),
      `Parallax.vue`, and `Scrollspy.vue` (`useWaypoint`, found alongside).
- [x] 12.3 **Class C — dual-engine / "Vanilla engine" framing.** Rewrote
      `about.vue`'s "Two natures, one water" dual-engine section to Vue-3-only;
      dropped "Vanilla engine" from `Slider.vue` / `Switch.vue` / `Separator.vue`
      / `Menu.vue`; retargeted `ThemeCustomizerGuide.vue`'s removed Pinia
      `useThemeStore` onto vd3's `useThemePreference()` singleton (incl. the
      phantom `theme.init()`); fixed `CssVariables.vue` ("both engines" / "vd2
      theme store"), `Fibonacci.vue`, and `Glass.vue`.
- [x] 12.4 **Troubleshooting.vue.** Removed the IIFE/CDN fix (vd3 is ESM-only),
      the phantom `theme.init()` fix (`useThemePreference()` auto-hydrates), and
      the "building with vd2" intro (→ vd3).
- [x] 12.5 **e2e visual-parity suite.** Removed the two dead
      `/guides/esm-vs-iife` + `/guides/lifecycle-manager` `ROUTES` entries and
      deleted their two stale baseline PNGs.
- [x] 12.6 Gates: `typecheck`, `lint`, `stylelint`, `test` (143), `build`
      (92 routes + sitemap, `dist/` window.Vanduo bundle gate holds), `test:size`,
      and `openspec validate docs-content --strict` all green.

## 13. Follow-up: stale-ownership + de-pinia prose fixes (this pass)

Two verified content-correctness defects: four prose spots credited the
old-line `@vanduo-oss/core` as the current token owner/generator, and the
homepage feature grid still advertised vd3 as shipping "Pinia-friendly stores".
vd3 owns its own DTCG tokens (no runtime deps; sole peer dep `vue >=3.3`) and
dropped Pinia. Fixes stay inside `src/`; no old-line / `../vd3` / `../vd3-cbun`
write; no publish.

- [x] 13.1 **Stale token-owner attribution.** Retargeted `@vanduo-oss/core` →
      `@vanduo-oss/vd3` in the four prose `<code>` spots that named it as the
      *current* source: `guides/CssVariables.vue` ("token layer ships with"),
      `guides/ThemeCustomizerGuide.vue` ("option lists come from … its token
      catalog"), `about.vue` ("the tokens in …"), and
      `core/ColorPalette.vue` ("Fibonacci palette generated by …"). Left the two
      `guides/MigrationComparison.vue` mentions intact — they label the old
      vanduo-v2 three-package split as the "Before (v2)" side.
- [x] 13.2 **De-pinia homepage claim.** `home.vue` "Built for Vue 3" feature
      body: "Pinia-friendly stores" → "Pinia-free reactive stores", matching
      `changelog.vue` ("pinia is no longer a peer dependency") and
      `MigrationComparison.vue` ("vd3 also drops Pinia").
- [x] 13.3 Gates: `typecheck` (vue-tsc), `build` (vite-ssg, 92 routes +
      sitemap), the affected prerendered pages spot-checked, and
      `openspec validate docs-content --strict` all green.
