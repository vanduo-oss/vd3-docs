## Why

`docs-content` is the content-correctness + new-pages pass that finishes what
`docs-clone-and-strip` deliberately deferred. After the clone-and-strip the site
**builds** Vue3-only and the runtime chrome / SEO metadata no longer says
"two engines" — but the parts that change did **not** touch still describe the
old dual-engine `@vanduo-oss` line:

- **Guide bodies** still teach vanilla-engine concepts (`Vanduo.init`,
  `loadVanduoRuntime`, the IIFE bundle, "pick an engine") — most explicitly the
  two guides that exist *only* to explain the vanilla runtime (`EsmVsIife`,
  `LifecycleManager`) and the four architecture/migration/install/ecosystem
  guides.
- **`home.vue`** markets the system as "Two Engines, One System" / "Vanilla +
  Vue" across its feature cards, and two of those cards link to guides this
  change deletes.
- **Displayed doc-example snippet strings** across ~60 pages still show
  `import … from "@vanduo-oss/vue"`, `@vanduo-oss/{charts,flowchart,hex-grid,
  music-player}/vue`, and `pnpm add @vanduo-oss/{vue,charts,…}` — the live
  imports were retargeted by `docs-clone-and-strip`, but the *string literals a
  reader copies* were not.
- **The changelog** cards + history partial still name `@vanduo-oss/core /
  framework / vue` and the four ecosystem packages and carry inert
  `data-engine` attributes.

Separately, `@vanduo-oss/vd3` ships **seven new components**
(`VdBreadcrumb`, `VdFab`, `VdFooter`, `VdNavbar`, `VdThemeSwitcher`,
`VdThemeCustomizer`, `VdDocSearch`) and **new composables** (`useDocSearch`,
`useLazyLoad`, `useGrid` + `setGridSystem`), but the docs still document those
components as raw CSS classes and never demo the composables.

This change makes every word of prose, every displayed snippet, and the
changelog describe the **vd3 line only**, deletes the two vanilla-only guides,
rewrites the four architecture/migration/install/ecosystem guides for a single
standalone Vue 3 package line, upgrades six class-only component pages to
**dogfood the real new components**, adds a `DocSearch` page, and turns two
"explanatory" guides (`LazyLoading`, `GridSystem`) into **live demos of the real
composables**.

## What Changes

**Routes:** **+1** `/components/doc-search`; **−2** `/guides/esm-vs-iife`,
`/guides/lifecycle-manager`. Net **93 → 92**. The nav-tree / router
registration for the added and removed routes is performed by a dedicated
**wiring step** (this change does **not** edit `src/nav.ts` or `src/router.ts`);
this proposal reports the exact edits that step must make. All other 90 routes
keep their paths.

### Displayed package strings (capability `docs-content`)

- In doc-example snippet strings and prose `<code>` across all `src/pages`
  and `src/components`, retarget the **displayed** old-line names:
  `@vanduo-oss/vue` → `@vanduo-oss/vd3`;
  `@vanduo-oss/{charts,flowchart,hex-grid,music-player}/vue` →
  `@vanduo-oss/vd3-cbun/{charts,flowchart,hex-grid,music-player}`;
  `pnpm add @vanduo-oss/{vue,charts,flowchart,hex-grid,music-player}` →
  the vd3 / vd3-cbun package names. Live `import` statements are already correct
  (retargeted by `docs-clone-and-strip`); only the string literals change.

### Guide drops (capability `docs-content`)

- Delete `guides/EsmVsIife.vue` and `guides/LifecycleManager.vue` — both
  document vanilla-only concepts (IIFE vs ESM builds of the framework;
  `Vanduo.init`/`destroy` lifecycle) that do not exist in the standalone vd3
  line. Report their nav/router de-registration to the wiring step; re-point any
  inbound links (home feature card, `VanduoEcosystem` "next" cards) to surviving
  guides.

### Guide rewrites (capability `docs-content`)

- `guides/RuntimeArchitecture.vue` → **"vd3 Architecture"**: the standalone
  `tokens → generated CSS → components/composables` story; drop the
  `Vanduo.init` ⇄ composable side-by-side and every `loadVanduoRuntime` / IIFE /
  "both engines" reference.
- `guides/MigrationComparison.vue` → **"Migrating from vanduo v2 to vd3"**: the
  old→new **package map**, **composable API diffs**, the **CSS import change**
  (`@vanduo-oss/framework/css` → `@vanduo-oss/vd3/css`), and a
  **one-line-per-app** upgrade note.
- `guides/FrameworkIntegration.vue` → **"Installation & Integration"**: install
  the two packages, import `@vanduo-oss/vd3` + `@vanduo-oss/vd3/css`, install the
  `VanduoVue` plugin, and the **vite-ssg / SSR** notes.
- `guides/VanduoEcosystem.vue` → the **three-repo vd3 line** (`vd3-docs` +
  `vd3` + `vd3-cbun`) with a short **old-line maintenance note**; drop the
  dual-engine "pick an engine" framing and the four-package add-on grid.

### Home marketing (capability `docs-content`)

- `home.vue`: rewrite the feature cards + intro copy so no card describes the
  system as "both engines" / "Vanilla + Vue" / "two engines" / "dual-engine
  docs", and no feature card links to a deleted guide route.

### Changelog (capability `docs-content`)

- `pages/changelog.vue` + `pages/changelog-vue-content.html`: curate the inline
  release cards and the history partial so they name **only** `@vanduo-oss/vd3`
  and `@vanduo-oss/vd3-cbun` (fresh vd3 history, versions `vd3 0.1.0` /
  `vd3-cbun 0.2.0`), with no old-line package name and no `data-engine`
  attribute. Packages-only per the changelog-content policy.

### Component-page upgrades (capability `docs-content`)

- Upgrade six currently class-only pages to **dogfood the real component**
  (live `<Vd…>` render + a **Component API (Vue 3)** props/emits/slots table
  sourced from the component's own `defineProps`/`defineEmits`/`defineSlots`,
  keeping the CSS-class reference where it stays useful):
  `Breadcrumb → VdBreadcrumb`, `Fab → VdFab`, `Footer → VdFooter`,
  `Navbar → VdNavbar`, `ThemeSwitcher → VdThemeSwitcher`,
  `ThemeCustomizer → VdThemeCustomizer`.

### New page (capability `docs-content`)

- Add `pages/components/DocSearch.vue` documenting `VdDocSearch` (live render +
  props/emits table) and the underlying `useDocSearch` composable (controller
  table). Report the new `/components/doc-search` route to the wiring step.

### Composable demos (capability `docs-content`)

- `guides/LazyLoading.vue`: demo the real `useLazyLoad` composable (an
  `observe`-driven reveal and/or `loadSection`) instead of only narrating
  bundler code-splitting.
- `core/GridSystem.vue`: drive the standard⇄fibonacci toggle with the real
  `useGrid` / `setGridSystem` composable, replacing the page-local `mode` ref +
  ad-hoc scoped-CSS reimplementation.

## Non-goals

- **No changes to the vd3 / vd3-cbun packages.** `../vd3` and `../vd3-cbun` are
  read for their export surface (verified against source) and never modified;
  neither is any other old-line repo (`core`, `framework`, `vue`, `vd2`,
  `charts`, `flowchart`, `hex-grid`, `music-player`) — strictly read-only.
- **No new component behavior.** The six upgraded pages render the components
  **as shipped**; no prop, emit, slot, or CSS class is invented. If a page needs
  an API the component lacks, that is reported upward, not worked around.
- **No `nav.ts` / `router.ts` edits by this change.** Adding the DocSearch route
  and removing the two dropped-guide routes is a separate wiring step; this
  change only authors page content and reports the required registrations.
- **No a11y-hardening and no visual-baseline re-capture as deliverables of this
  change.** Markup moves (live components replace static markup), so the
  Playwright baselines *will* need re-capture and the axe smoke re-run — but the
  a11y audit and baseline sign-off are **Phase 7**; this change only lists the
  re-capture as a follow-up task.
- **No route restructuring beyond the +1 / −2 above.** The remaining 90 routes,
  their nav order, and their keywords are unchanged.
- **No publish, deploy, or CNAME.** `@vanduo-oss/vd3-docs` stays private; the
  deploy workflow stays disabled.
- **No `app.css` component styling.** `styles/app.css` stays shell/layout-only;
  component styling continues to come from `@vanduo-oss/vd3/css`.

## Impact

- Affected specs: **+`docs-content`** (new capability, 12 requirements).
- Affected code (implemented by a follow-up, not in this artifacts-only change):
  the ~60 pages carrying stale displayed strings; `guides/EsmVsIife.vue` (del),
  `guides/LifecycleManager.vue` (del); `guides/RuntimeArchitecture.vue`,
  `guides/MigrationComparison.vue`, `guides/FrameworkIntegration.vue`,
  `guides/VanduoEcosystem.vue`, `guides/LazyLoading.vue` (rewrites/demos);
  `core/GridSystem.vue`; `home.vue`; `pages/changelog.vue` +
  `pages/changelog-vue-content.html`; the six component pages
  (`Breadcrumb/Fab/Footer/Navbar/ThemeSwitcher/ThemeCustomizer.vue`); the new
  `pages/components/DocSearch.vue`; and — via the wiring step — `src/nav.ts` +
  `src/router.ts` (add DocSearch, remove the two guides) plus the Playwright
  visual baselines that shift when live components render.
- Dogfooding the seven new components + composables through real doc pages
  surfaces any API drift against `../vd3` at build time.
