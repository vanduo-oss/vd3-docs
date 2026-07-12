# Tasks

> Run all tooling under Node 24 (`mise exec node@24 -- <cmd>`). Old-line repos
> (`core`, `framework`, `vue`, `vd2`, `charts`, `flowchart`, `hex-grid`,
> `music-player`) are strictly read-only — read them and `../vd3` / `../vd3-cbun`
> for reference, never write into them. Do not commit or push (the orchestrator
> commits).

## 1. Retarget dependencies (`docs-build`)

- [x] 1.1 `package.json`: rename `"name"` `@vanduo-oss/vd2` → `@vanduo-oss/vd3-docs`
      (keep `private: true`); update `description` to name the vd3 line.
- [x] 1.2 Remove deps `@vanduo-oss/{core,framework,vue,charts,flowchart,hex-grid,music-player}`.
- [x] 1.3 Add `"@vanduo-oss/vd3": "link:../vd3"` and
      `"@vanduo-oss/vd3-cbun": "link:../vd3-cbun"`.
- [x] 1.4 `pnpm install` (Node 24) resolves the two `link:` targets; the lockfile
      updates with no old-`@vanduo-oss` entries left.

## 2. Entry, plugin & runtime (`docs-build`)

- [x] 2.1 `main.ts`: swap CSS imports — `@vanduo-oss/framework/css` →
      `@vanduo-oss/vd3/css`; `@vanduo-oss/{charts,flowchart,music-player}/css` →
      `@vanduo-oss/vd3-cbun/{charts,flowchart,music-player}/css`.
- [x] 2.2 `main.ts`: change the plugin import source `@vanduo-oss/vue` →
      `@vanduo-oss/vd3`; keep `app.use(VanduoVue, { themeDefaults: { PRIMARY_DARK: "blue" } })`
      (same identifier, same option).
- [x] 2.3 `main.ts`: delete the `loadVanduoRuntime` import **and** the
      `if (!import.meta.env.SSR) { await loadVanduoRuntime(); }` block. No
      IIFE/runtime bootstrap remains.
- [~] 2.4 Move chrome/page runtime imports (`VdToastContainer`, `VdOffcanvas`,
      `useFocusTrap`, and every `Vd*` component/composable the pages, customizer,
      and preview use) from `@vanduo-oss/vue` → `@vanduo-oss/vd3`.
      (Non-page chrome/customizer/preview + stores/types done; the 59 pages'
      `@vanduo-oss/vue` imports are retargeted in the page-flatten step.)

## 3. Vite dev-linking config (`docs-build`)

- [x] 3.1 `vite.config.ts`: add `resolve.dedupe: ["vue", "pinia"]`.
- [x] 3.2 Add `optimizeDeps.exclude: ["@vanduo-oss/vd3", "@vanduo-oss/vd3-cbun"]`;
      remove the stale `optimizeDeps.include: ["@vanduo-oss/framework/css"]`.
- [x] 3.3 Retarget `ssr.noExternal` off `@vanduo-oss/framework` onto
      `["@vanduo-oss/vd3", "@vanduo-oss/vd3-cbun"]`.

## 4. Ecosystem pages (`docs-build`)

- [ ] 4.1 `canvas/Charts.vue`: `@vanduo-oss/charts/vue` → `@vanduo-oss/vd3-cbun/charts`
      (component import + prose/snippet mentions).
- [ ] 4.2 `canvas/Flowchart.vue`: `@vanduo-oss/flowchart/vue` →
      `@vanduo-oss/vd3-cbun/flowchart`.
- [ ] 4.3 `canvas/Hex.vue`: `@vanduo-oss/hex-grid/vue` → `@vanduo-oss/vd3-cbun/hex-grid`
      and `@vanduo-oss/hex-grid/hex-math` → `@vanduo-oss/vd3-cbun/hex-grid/hex-math`.
- [ ] 4.4 `media/MusicPlayer.vue`: `@vanduo-oss/music-player/vue` →
      `@vanduo-oss/vd3-cbun/music-player`.
- [ ] 4.5 Update the in-page install/snippet strings (`pnpm add @vanduo-oss/charts`,
      etc.) to the vd3-cbun package name; drop the Vanilla-JS install snippets on
      these pages (their `EngineSwitch` flatten in §6 removes the Vanilla branch).

## 5. Delete dual-engine machinery (`single-engine-docs`)

- [x] 5.1 Delete `src/stores/engine.ts`.
- [x] 5.2 Delete `src/components/EngineSwitch.vue` and `src/components/EngineBadge.vue`.
- [x] 5.3 Delete `src/components/engineSnippetGroup.ts`.
- [x] 5.4 Delete `tests/unit/engine.spec.ts` (tests the removed store + component).

## 6. Flatten `EngineSwitch` usages (`single-engine-docs`)

- [ ] 6.1 In each of the 59 consumer pages, replace every `<EngineSwitch>…</EngineSwitch>`
      (108 blocks total) with the inner content of its `#vue3` template; delete the
      `#vanilla` branch and the `import EngineSwitch` line.
- [ ] 6.2 Remove the `EngineBadge` import + usage in `guides/RuntimeArchitecture.vue`.
- [ ] 6.3 Grep gate: `EngineSwitch`, `EngineBadge`, `engineSnippetGroup`,
      `ENGINE_SNIPPET_GROUP` return **zero** hits under `src/`.

## 7. De-wire engine-store consumers (`single-engine-docs`)

- [x] 7.1 `App.vue`: remove the `useEngineStore` import, the `engine` instance, and
      `engine.init()` in `onMounted`. Retire the dual-engine framing in the SEO
      chrome (`BRAND_TITLE`, `DEFAULT_DESCRIPTION`, the per-page description
      fallback) — no "two-engine" / "dual-engine" / "Vanilla" wording remains.
- [x] 7.2 `overlays/LiveCustomizer.vue`: remove the `useEngineStore` import and the
      `.lcc-engine` in-panel toggle block.
- [x] 7.3 `layout/VdSidebar.vue`: remove the `useEngineStore` import, `storeToRefs`
      engine ref, and the `.doc-engine-toggle` block.
- [x] 7.4 `components/DocCodeSnippet.vue`: remove the `ENGINE_SNIPPET_GROUP` inject
      and the `sharedExpanded` path; `expanded` falls back to `localExpanded`.
      Props and rendered markup unchanged.
- [x] 7.5 `components/customizer/CustomizerCode.vue`: remove the `useEngineStore`
      import and the engine branch; always render the `toVueSfc` output.
- [x] 7.6 `src/nav.ts`: remove the `EngineScope` type and the unused `engine?`
      field on `NavSection` (no section sets it).
- [~] 7.7 Grep gate: `useEngineStore`, `stores/engine`, `EngineScope`,
      `data-engine` return **zero** hits under `src/`.
      (Zero outside `src/pages/`; the inline changelog cards' inert `data-engine`
      attributes and any page-level residue clear in the page-flatten step.)

## 8. Changelog single-engine (`single-engine-docs`)

- [x] 8.1 `pages/changelog.vue`: remove the `changelog-content.html?raw` import and
      its `<div data-engine="vanilla" v-html="content">` block; keep the
      `changelog-vue-content.html` import + block.
- [x] 8.2 Remove `applyEngineFilter`, its `onMounted`/`watch` wiring, the
      `useEngineStore` import, and the header engine-toggle block; retire the
      dual-engine wording in the header copy.
- [x] 8.3 Delete `src/pages/changelog-content.html`.

## 9. Customizer codegen Vue-only (`single-engine-docs`)

- [x] 9.1 `customizer/codegen.ts`: delete `toVanilla` + the `VanillaCode`
      interface; keep `toVueSfc`. Simplify (or drop, if unused) `generate()` to
      the Vue SFC only. (Dropped `generate()` — unused after the strip; also
      retargeted the emitted SFC import `@vanduo-oss/vue` → `@vanduo-oss/vd3`.)

## 10. CSS cleanup (`single-engine-docs`)

- [ ] 10.1 `styles/docs.css`: remove the orphaned engine-toggle / `data-engine`
      rules (`.doc-engine-toggle`, `.doc-engine-option`, `.changelog-engine-toggle`,
      `.lcc-engine`, `.lcc-engine-btn`, and the changelog `data-engine` filter
      styles). `styles/app.css` stays shell/layout-only (untouched).

## 11. Verification

- [ ] 11.1 `pnpm typecheck` (vue-tsc) passes — no dangling engine imports/types.
- [ ] 11.2 `pnpm lint` and `pnpm stylelint` pass.
- [ ] 11.3 `pnpm test` (vitest) passes with the engine spec removed; no other unit
      test references the removed machinery.
- [ ] 11.4 `pnpm build` (`vite-ssg build`) prerenders **all 93 routes** clean
      against the linked `../vd3` + `../vd3-cbun`; sitemap generates.
- [ ] 11.5 Bundle gate: grep `dist/` for `window.Vanduo` / `Vanduo` globals →
      **zero** hits (no vanilla runtime shipped).
- [ ] 11.6 Re-capture the Playwright visual-parity baselines
      (`test:e2e` / `--update-snapshots`) now that markup is Vue3-only and CSS is
      sourced from `@vanduo-oss/vd3/css`; review each diff as intended, not blind.
- [ ] 11.7 `test:e2e` layout-navigation + `test:size` gzip budget + axe a11y smoke
      pass on the rebuilt site.
- [ ] 11.8 Nav/search unchanged: all 93 routes and their keywords preserved (no
      pages added/removed), so no search-index/nav-keyword edits are needed.

## 12. Spec bookkeeping

- [ ] 12.1 `openspec validate docs-clone-and-strip --strict` passes.
- [ ] 12.2 No edits to any old-line repo or to `../vd3` / `../vd3-cbun`; no publish,
      deploy, or CNAME.
