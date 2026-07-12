## Why

`vd3-docs` is a byte-for-byte clone of the vd2 documentation site (93 routes,
already committed). It still ships against the **old** `@vanduo-oss` line
(`core` + `framework` + `vue` + the four ecosystem packages) and documents
**two engines** (Vanilla zero-build + Vue 3) via an `EngineSwitch` toggle. The
vd3 line is Vue3-only: `@vanduo-oss/vd3` (the Vue component library, formerly
`vue` + `framework` CSS) and `@vanduo-oss/vd3-cbun` (the canvas bundle, formerly
`charts` / `flowchart` / `hex-grid` / `music-player`). There is no vanilla
runtime to load anymore — `@vanduo-oss/vd3` is fully standalone with no
framework IIFE and no `loadVanduoRuntime`.

This change **retargets the clone onto the local vd3 packages and removes every
trace of the dual-engine machinery**, so the site builds (dogfooding the real,
unpublished packages via `link:`) and documents a single engine. It is a
mechanical retarget-and-strip: the *existing* pages become Vue3-only and
build-clean. It deliberately does **not** rewrite the vanilla-centric guide
prose or add the vd3 line's new component pages — those are the later
`docs-content` change.

## What Changes

**Routes:** none added, changed, or removed. All 93 routes stay; their
markup narrows to the Vue 3 branch and their imports move to the vd3 line.

### Build retarget (capability `docs-build`)

- Rename the package `@vanduo-oss/vd2` → `@vanduo-oss/vd3-docs` (stays
  `private: true`, never published).
- Drop deps `@vanduo-oss/{core,framework,vue,charts,flowchart,hex-grid,music-player}`.
  Add `"@vanduo-oss/vd3": "link:../vd3"` and
  `"@vanduo-oss/vd3-cbun": "link:../vd3-cbun"` (flips to published `^1.0.0` at
  launch).
- `main.ts`: framework/css → `@vanduo-oss/vd3/css`; per-package css →
  `@vanduo-oss/vd3-cbun/{charts,flowchart,music-player}/css`; drop the
  `loadVanduoRuntime()` import and its awaited client-only IIFE bootstrap;
  keep the `VanduoVue` plugin install with `themeDefaults: { PRIMARY_DARK: "blue" }`
  (re-exported from `@vanduo-oss/vd3` under the same name — import source
  changes, identifier does not).
- Move the runtime component/composable imports the pages/chrome use
  (`VdToastContainer`, `VdOffcanvas`, `useFocusTrap`, …) from `@vanduo-oss/vue`
  → `@vanduo-oss/vd3`.
- Ecosystem pages: `@vanduo-oss/{charts,flowchart,hex-grid,music-player}` and
  their `/vue` bindings → `@vanduo-oss/vd3-cbun/*`
  (`.../charts`, `.../flowchart`, `.../hex-grid`, `.../hex-grid/hex-math`,
  `.../music-player`).
- `vite.config.ts`: add `resolve.dedupe: ["vue","pinia"]` and
  `optimizeDeps.exclude` for both linked packages; retarget the existing
  `optimizeDeps.include` / `ssr.noExternal` off the removed
  `@vanduo-oss/framework` onto the vd3 packages.
- Build gate: `vite-ssg build` prerenders every route with **zero**
  `window.Vanduo*` references in the emitted bundle.

### Single-engine strip (capability `single-engine-docs`)

- Delete the dual-engine machinery: `src/stores/engine.ts`,
  `src/components/EngineSwitch.vue`, `src/components/EngineBadge.vue`,
  `src/components/engineSnippetGroup.ts`, and `tests/unit/engine.spec.ts`.
- Flatten all `<EngineSwitch>` usages (59 pages, 108 blocks) to their `#vue3`
  slot content; drop the now-unused Vanilla `#vanilla` branches.
- De-wire the consumers of the engine store: `App.vue`,
  `overlays/LiveCustomizer.vue`, `layout/VdSidebar.vue`,
  `components/DocCodeSnippet.vue`, `components/customizer/CustomizerCode.vue`
  (remove the in-sidebar and in-customizer engine toggles and the shared
  ordinal expand-state coordination; `DocCodeSnippet` keeps its standalone
  local expand state).
- Remove the dead `EngineScope` type and the unused `engine?` field from
  `src/nav.ts` (no nav section ever set it).
- Changelog: drop the Vanilla history partial (`changelog-content.html`) and the
  `data-engine` filter machinery + header engine toggle; keep the Vue partial
  (`changelog-vue-content.html`). Packages-only per the changelog-content policy.
- Customizer codegen: drop `toVanilla`; keep `toVueSfc` (the Generated-code
  panel emits a Vue SFC only).
- Remove the orphaned engine-toggle / `data-engine` CSS from `styles/docs.css`.
- Retire the dual-engine framing in site chrome / SEO metadata (`App.vue`
  brand title + description, changelog header copy) — the *runtime* prose no
  longer calls the site "two-engine" or references "Vanilla" (guide-body prose
  is out of scope; see Non-goals).

### Spec bookkeeping (capability `repo-scaffold`)

- Retire the `repo-scaffold` requirement "no premature package or site code":
  the site (package.json, `src/`, configs, CI/deploy workflows) now exists,
  because this change lands the vd2 clone the scaffold deferred.

## Non-goals

- **NO guide-prose rewrite.** The six vanilla-centric guides
  (`EsmVsIife`, `LifecycleManager`, `RuntimeArchitecture`,
  `MigrationComparison`, `FrameworkIntegration`, `VanduoEcosystem`) keep their
  current bodies. This change only flattens their `EngineSwitch` blocks and
  retargets their imports so they build; their vanilla-centric narrative is
  rewritten in the later `docs-content` change. This is a **known, temporary
  deviation** from the repo rule "no vanilla-engine references in prose" — the
  rule is the end-state that `docs-content` completes.
- **NO new component pages.** The vd3 line's 9 new-component doc pages are added
  by `docs-content`, not here.
- **NO changelog content authoring.** The inline release cards (framework/vue/
  charts "Cool Breeze I") keep their current copy; only the vanilla partial and
  the engine filter are removed. Curating the changelog onto the vd3 packages
  (`@vanduo-oss/vd3`, `@vanduo-oss/vd3-cbun`) is deferred.
- **NO route, nav-tree, or search-index restructuring.** All 93 routes and their
  keywords are preserved; only dead engine plumbing is removed.
- **NO publish, deploy, or CNAME.** `@vanduo-oss/vd3-docs` is private; the deploy
  workflow stays disabled; no CNAME is added.
- **NO edits to any old-line repo** (`core`, `framework`, `vue`, `vd2`,
  `charts`, `flowchart`, `hex-grid`, `music-player`) — strictly read-only
  reference material. The `link:` targets `../vd3` and `../vd3-cbun` are read
  for their export surface but never modified.
- **NO app.css component styling.** `styles/app.css` stays shell/layout-only;
  component styling continues to come from `@vanduo-oss/vd3/css`.

## Impact

- Affected specs: **+`docs-build`** (new), **+`single-engine-docs`** (new),
  **~`repo-scaffold`** (one requirement removed).
- Affected code (implemented by a follow-up, not in this artifacts-only change):
  `package.json`, `vite.config.ts`, `src/main.ts`, `src/App.vue`, `src/nav.ts`,
  `src/stores/engine.ts` (del), `src/components/{EngineSwitch,EngineBadge}.vue`
  (del), `src/components/engineSnippetGroup.ts` (del),
  `src/components/DocCodeSnippet.vue`, `src/components/customizer/CustomizerCode.vue`,
  `src/customizer/codegen.ts`, `src/overlays/LiveCustomizer.vue`,
  `src/layout/VdSidebar.vue`, `src/pages/changelog.vue`,
  `src/pages/changelog-content.html` (del), `src/styles/docs.css`, the 59
  `EngineSwitch` consumer pages, `tests/unit/engine.spec.ts` (del), and the
  Playwright visual baselines that shift when the Vue3-only markup renders.
- The site builds locally against `../vd3` + `../vd3-cbun`; nothing is published
  or deployed. Dogfooding the real packages surfaces any API drift immediately.
