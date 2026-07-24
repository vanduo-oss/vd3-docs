# docs-content Specification

## Purpose
TBD - created by archiving change docs-content. Update Purpose after archive.
## Requirements
### Requirement: displayed package strings name the vd3 line

Every **displayed** package specifier in the docs — the string literals inside
`DocCodeSnippet` props and the `<code>` spans of prose, i.e. the text a reader
copies — SHALL name the vd3 line. `@vanduo-oss/vue` SHALL be shown as
`@vanduo-oss/vd3`; `@vanduo-oss/{charts,flowchart,hex-grid,music-player}` and
their `/vue`, `/css`, and `/hex-math` subpaths SHALL be shown as
`@vanduo-oss/vd3-cbun/{charts,flowchart,hex-grid,music-player}` (and
`.../css` / `.../hex-math`); every `pnpm add @vanduo-oss/{vue,charts,flowchart,
hex-grid,music-player}` string SHALL name `@vanduo-oss/vd3` or
`@vanduo-oss/vd3-cbun`. Live `import` statements are already correct (retargeted
by `docs-clone-and-strip`) and MUST NOT change; only string literals are edited.

#### Scenario: no old-line package name survives in any displayed string

- **GIVEN** the whole `src/` tree after this change
- **WHEN** it is grepped for `@vanduo-oss/vue`, `@vanduo-oss/charts`,
  `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, and `@vanduo-oss/music-player`
- **THEN** there are zero matches in snippet strings, prose `<code>`, or install
  commands

#### Scenario: canvas install strings name the cbun bundle

- **GIVEN** `canvas/Charts.vue`, `canvas/Flowchart.vue`, `canvas/Hex.vue`, and
  `media/MusicPlayer.vue` after this change
- **WHEN** each page's displayed `installShell` / usage snippet is read
- **THEN** it shows `@vanduo-oss/vd3-cbun/<name>` and no `@vanduo-oss/<name>/vue`
  or bare-old-package string

### Requirement: the vanilla-only guides are removed

The two guides that document only vanilla-engine concepts SHALL be deleted:
`src/pages/guides/EsmVsIife.vue` (IIFE-vs-ESM builds of the framework) and
`src/pages/guides/LifecycleManager.vue` (`Vanduo.init`/`destroy` lifecycle) MUST
NOT exist after this change. No module under `src/` SHALL link to
`/guides/esm-vs-iife` or `/guides/lifecycle-manager`; every former inbound link
SHALL be re-pointed to a surviving guide. Their nav/router de-registration is
performed by the wiring step.

#### Scenario: the two guide pages and their inbound links are gone

- **GIVEN** the repository after this change
- **WHEN** `src/pages/guides/` is listed and `src/` is grepped for
  `/guides/esm-vs-iife` and `/guides/lifecycle-manager`
- **THEN** `EsmVsIife.vue` and `LifecycleManager.vue` do not exist and there are
  zero link matches (the home feature card and the ecosystem "next" cards point
  at surviving guides)

### Requirement: the architecture guide documents the standalone vd3 line

`guides/RuntimeArchitecture.vue` SHALL be rewritten as **"vd3 Architecture"** and
present the standalone layered story `@vanduo-oss/vd3` design tokens → generated
`@vanduo-oss/vd3/css` → typed `Vd*` components + composables. It MUST NOT
reference `Vanduo.init`, `Vanduo.destroy`, `loadVanduoRuntime`, an IIFE bundle, a
global `window.Vanduo*` runtime, or frame the system as running "both engines".

#### Scenario: the architecture guide has no vanilla runtime concepts

- **GIVEN** `guides/RuntimeArchitecture.vue` after this change
- **WHEN** its script and template are read
- **THEN** it describes tokens → CSS → components/composables, and contains no
  `Vanduo.init`, `loadVanduoRuntime`, `IIFE`, or "both engines" reference

### Requirement: the migration guide covers vanduo v2 to vd3

`guides/MigrationComparison.vue` SHALL be rewritten as **"Migrating from vanduo
v2 to vd3"** and SHALL contain: an old→new **package map**
(`@vanduo-oss/vue` → `@vanduo-oss/vd3`; `@vanduo-oss/framework/css` →
`@vanduo-oss/vd3/css`; the four ecosystem packages → `@vanduo-oss/vd3-cbun/*`),
**composable API diffs**, the **CSS import change**, and a **one-line-per-app**
note (the plugin import source changes from `@vanduo-oss/vue` to
`@vanduo-oss/vd3` while the `VanduoVue` identifier and its `themeDefaults` option
are unchanged). It MUST NOT frame migration as a vanilla-vs-vue engine choice.

#### Scenario: the migration guide maps the old line onto vd3

- **GIVEN** `guides/MigrationComparison.vue` after this change
- **WHEN** it is read
- **THEN** it shows the package map to `@vanduo-oss/vd3` + `@vanduo-oss/vd3-cbun`,
  the `@vanduo-oss/framework/css` → `@vanduo-oss/vd3/css` import change, and the
  one-line plugin-import-source swap, with no vanilla-engine migration path

### Requirement: the integration guide covers vd3 installation

`guides/FrameworkIntegration.vue` SHALL be rewritten as **"Installation &
Integration"** and SHALL document installing `@vanduo-oss/vd3` (and
`@vanduo-oss/vd3-cbun` when canvas components are needed), importing
`@vanduo-oss/vd3/css`, installing the `VanduoVue` plugin
(`app.use(VanduoVue, { themeDefaults })`), and vite-ssg / SSR usage. It MUST NOT
tell readers to run `Vanduo.init` after mount or load an IIFE bundle.

#### Scenario: the integration guide installs the plugin, not a runtime

- **GIVEN** `guides/FrameworkIntegration.vue` after this change
- **WHEN** its snippets are read
- **THEN** they show `pnpm add @vanduo-oss/vd3`, `import "@vanduo-oss/vd3/css"`,
  and `app.use(VanduoVue, …)`, and contain no `Vanduo.init` call or IIFE
  `<script>` include

### Requirement: the ecosystem guide describes the three-repo vd3 line

`guides/VanduoEcosystem.vue` SHALL be rewritten to describe the three-repo vd3
line — `vd3-docs` (the docs site), `vd3` (the Vue 3 component library with tokens
and CSS), and `vd3-cbun` (the canvas bundle: charts / flowchart / hex-grid /
music-player) — plus a short note that the old `core` + `framework` + `vue` +
four-package line is in maintenance and the vd3 line is where new work lands. It
MUST NOT present "pick an engine (Vanilla or Vue)" framing or the old
four-separate-add-on-package install grid.

#### Scenario: the ecosystem guide names the three vd3 repos

- **GIVEN** `guides/VanduoEcosystem.vue` after this change
- **WHEN** it is read
- **THEN** it names `vd3-docs`, `@vanduo-oss/vd3`, and `@vanduo-oss/vd3-cbun`,
  carries the old-line maintenance note, and contains no "when to use the Vanilla
  engine" / "when to use the Vue 3 engine" choice section

### Requirement: the home page drops dual-engine marketing

`home.vue` SHALL NOT market the system as multi-engine. Its feature cards and
intro copy MUST NOT contain "both engines", "Vanilla + Vue", "two engines",
"dual-engine", or a "flip between Vanilla and Vue 3" claim, and no feature card's
`to:` target SHALL point at a deleted guide route.

#### Scenario: no feature card frames the system as dual-engine

- **GIVEN** `home.vue` after this change
- **WHEN** its `features` data and template are read
- **THEN** none of the cards contains "both engines" / "Vanilla + Vue" /
  "two engines" / "dual-engine", and no card links to `/guides/esm-vs-iife` or
  `/guides/lifecycle-manager`

### Requirement: the changelog documents the vd3 line packages only

The changelog SHALL document **package** releases for the vd3 line only. Both the
inline release cards in `pages/changelog.vue` and the history partial
`pages/changelog-vue-content.html` SHALL name only `@vanduo-oss/vd3` (`0.1.0`)
and `@vanduo-oss/vd3-cbun` (`0.2.0`); they MUST NOT name `@vanduo-oss/core`,
`@vanduo-oss/framework`, `@vanduo-oss/vue`, or any of the four old ecosystem
packages, and MUST NOT carry any `data-engine` attribute. The header copy SHALL
name the two vd3 packages. Per the changelog-content policy the page tracks
package releases only, never docs-site content.

#### Scenario: the changelog names the vd3 packages and drops the old line

- **GIVEN** `pages/changelog.vue` and `pages/changelog-vue-content.html` after
  this change
- **WHEN** they are read and grepped
- **THEN** every release card names `@vanduo-oss/vd3` or `@vanduo-oss/vd3-cbun`,
  there is no `data-engine` attribute, and there is no `@vanduo-oss/core`,
  `@vanduo-oss/framework`, `@vanduo-oss/vue`, `@vanduo-oss/charts`,
  `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, or `@vanduo-oss/music-player`
  reference

### Requirement: six component pages dogfood the real vd3 components

Six currently class-only pages SHALL be upgraded to render the real shipped
component: `Breadcrumb.vue` (`VdBreadcrumb`), `Fab.vue` (`VdFab`),
`Footer.vue` (`VdFooter`), `Navbar.vue` (`VdNavbar`),
`ThemeSwitcher.vue` (`VdThemeSwitcher`), and `ThemeCustomizer.vue`
(`VdThemeCustomizer`). Each page SHALL import the component from
`@vanduo-oss/vd3`, live-render it in at least the primary demo, and add a
"Component API (Vue 3)" table whose props/emits/slots are transcribed **verbatim
from the component source** — no prop, emit, slot, or CSS class not present in
`@vanduo-oss/vd3` SHALL be documented. Any existing CSS-class reference SHALL be
kept where the component wraps documented classes. Page section IDs SHALL be
preserved so anchors and scrollspy stay stable.

#### Scenario: each upgraded page renders the real component with a true API table

- **GIVEN** any of the six pages after this change
- **WHEN** its `<script setup>` imports and template are read
- **THEN** it imports the named `Vd*` component from `@vanduo-oss/vd3`,
  live-renders it, and its Component API (Vue 3) table lists only props/emits/
  slots that exist on that component's `defineProps` / `defineEmits` /
  `defineSlots`

#### Scenario: the upgraded pages typecheck and prerender

- **GIVEN** the six upgraded pages
- **WHEN** `pnpm typecheck` and `pnpm build` (vite-ssg) run against the linked
  `../vd3`
- **THEN** typechecking reports no missing/mistyped prop or emit and every route
  prerenders without a client-only runtime error

### Requirement: the DocSearch page documents VdDocSearch and useDocSearch

A new page `src/pages/components/DocSearch.vue` SHALL document the vd3 doc-search
feature: it SHALL render a live `<VdDocSearch :data="docs">` over an inline
`DocSearchDoc[]` fixture, list `VdDocSearch`'s props and emits, and list the
`useDocSearch` controller surface (`query`, `results`, `isOpen`, `activeIndex`,
`search`, `open`, `close`, `navigate`, `select`, `handleKeydown`, `highlight`).
Every documented field SHALL match `@vanduo-oss/vd3`'s `VdDocSearch.vue` and
`useDocSearch.ts`. The `/components/doc-search` route registration is reported to
the wiring step; this change authors only the page.

#### Scenario: the DocSearch page renders the real component and composable API

- **GIVEN** `src/pages/components/DocSearch.vue` after this change
- **WHEN** it is read
- **THEN** it imports `VdDocSearch` (and references `useDocSearch`) from
  `@vanduo-oss/vd3`, live-renders `VdDocSearch` with a `DocSearchDoc[]` fixture,
  and its tables list only props/emits/controller members that exist in the vd3
  source

### Requirement: the lazy-loading guide demos the useLazyLoad composable

`guides/LazyLoading.vue` SHALL demonstrate the real `useLazyLoad` composable —
calling `useLazyLoad()` and using `observe` (an intersection-driven reveal)
and/or `loadSection` — rather than only narrating bundler code-splitting. Its
intro MUST NOT claim "the Vanilla engine lazy-loads component modules from a
global registry"; it SHALL frame lazy loading around the vd3 composable plus
native tactics.

#### Scenario: the guide calls useLazyLoad

- **GIVEN** `guides/LazyLoading.vue` after this change
- **WHEN** its `<script setup>` and template are read
- **THEN** it imports and calls `useLazyLoad` from `@vanduo-oss/vd3` and its intro
  contains no "Vanilla engine ... global registry" framing

### Requirement: the grid page demos the useGrid composable

`core/GridSystem.vue` SHALL drive its standard⇄fibonacci toggle with the real
`useGrid` / `setGridSystem` composable from `@vanduo-oss/vd3`, letting the shipped
`@vanduo-oss/vd3/css` Fibonacci rules apply. The page-local `mode` ref, its
`toggleMode()` handler, and the `<style scoped>` block that reimplemented the
Fibonacci column proportions SHALL be removed (the shipped composable + CSS
replace them).

#### Scenario: the grid toggle is composable-driven, not page-reimplemented

- **GIVEN** `core/GridSystem.vue` after this change
- **WHEN** its `<script setup>` and `<style>` are read
- **THEN** it imports and calls `useGrid` (and shows `setGridSystem`) from
  `@vanduo-oss/vd3`, and the previous page-local `mode` ref + `toggleMode()` +
  the scoped Fibonacci `flex`/`max-width` reimplementation are gone

### Requirement: Code Editor component page

The docs site SHALL provide a live Code Editor page at `/editors/code-editor`,
under a new **Editors** category in the Components tab, rendering the real
`VdCodeEditor` from `@vanduo-oss/vd3-cbun/code-editor` (no invented API). The
page MUST demonstrate `v-model` editing, language selection across the supported
languages, and the read-only, wrap, line-number-gutter, placeholder, and copy
features, and MUST document the component's props, events, and exposed methods.

#### Scenario: page renders the live editor

- **GIVEN** the docs site after this change
- **WHEN** a user navigates to `/editors/code-editor`
- **THEN** the page renders a live `VdCodeEditor` with syntax-highlighted content
  under the Editors nav category, without console errors

#### Scenario: typing updates the bound value

- **GIVEN** the `v-model` demo on the page
- **WHEN** the user types in the editor
- **THEN** the bound value displayed on the page updates to match the editor
  contents

#### Scenario: read-only demo blocks input

- **GIVEN** the read-only demo on the page
- **WHEN** the user attempts to type into it
- **THEN** the editor contents do not change

#### Scenario: page is registered in nav, router, and search

- **GIVEN** `src/nav.ts` and `src/router.ts`
- **WHEN** the app builds routes
- **THEN** `/editors/code-editor` resolves to the CodeEditor page under the
  Editors category, the section appears in the sidebar, and its `keywords` feed
  the search index

### Requirement: Draw component page

The docs site SHALL provide a live Draw page at `/canvas/draw`, under the existing **Canvas** category in the Components tab, rendering the real `VdDraw` from `@vanduo-oss/vd3-cbun/draw` (importing `@vanduo-oss/vd3-cbun/draw/css`) with no invented API. The page MUST demonstrate the interactive editor (drawing shapes, freehand, selection / move, and pan / zoom) and MUST document the component's props, events, and exposed methods. The page MUST be registered in BOTH `src/nav.ts` (a Canvas-category `NavSection` with a unique `id`, `route`, and search `keywords`) and `src/router.ts` (`componentPages`), and MUST NOT introduce any vanilla-engine reference or component-specific rule in `app.css`.

#### Scenario: page renders the live editor

- **GIVEN** the docs site after this change
- **WHEN** a user navigates to `/canvas/draw`
- **THEN** the page renders a live `VdDraw` editor under the Canvas nav category, themed by the active `--vd-*` palette, without console errors

#### Scenario: page is registered, routed, and searchable

- **GIVEN** the built route table and the search index
- **WHEN** `buildRoutes()` runs and a user searches the page's keywords
- **THEN** `/canvas/draw` resolves to the `Draw.vue` component (its `nav.ts` `id` matches its `router.ts` `componentPages` key), the route count stays consistent (`nav.pages` + sections + 2), and the page surfaces in search results

#### Scenario: page documents the real published API

- **GIVEN** the Draw page's API-reference card
- **WHEN** its props / events / methods tables are read
- **THEN** every entry corresponds to an actual member of the published `@vanduo-oss/vd3-cbun/draw` surface (`VdDraw` props/emits and exposed `undo`/`redo`/`toSVG`/`toPNG`/`getInstance`), with no invented API

#### Scenario: non-deterministic canvas page is excluded from visual baselines

- **GIVEN** the Playwright visual-parity suite
- **WHEN** its curated `ROUTES` list is enumerated
- **THEN** `/canvas/draw` is absent (following the charts / flowchart / hex precedent for non-deterministic canvas pages), so no pixel baseline is committed for it

### Requirement: the About page is a vd3 overview, not vd2 founder copy

The `/about` page ([src/pages/about.vue](../../../src/pages/about.vue)) SHALL present a
plain-language overview of the standalone vd3 line and MUST NOT carry the pre-strip
vd2 clone's founder's-message content (e.g. "The Shape of the Water") or any
dual-engine / vanilla-engine framing. Its prose SHALL describe only real facts about
`@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` and MUST NOT invent component or
composable APIs. All page styling SHALL remain scoped to `about.vue`; the change MUST
NOT modify `app.css` or other shell/layout stylesheets.

#### Scenario: the page describes the vd3 package, not a founder's message
- **WHEN** a reader opens `/about`
- **THEN** the page presents the vd3 overview sections (what it is, how it's built, what you get, open source)
- **AND** it contains no "Shape of the Water" founder's-message block and no vanilla-engine or dual-line references

#### Scenario: About is discoverable by vd3/overview keywords
- **WHEN** the site search index is built from `src/nav.ts`
- **THEN** the `/about` entry's keywords include `vd3` and `overview`

#### Scenario: the About visual baseline reflects the rewritten page
- **WHEN** the Playwright visual-parity suite runs the `/about` route
- **THEN** it matches a committed `vd3-about-*` baseline captured from the rewritten page (within tolerance)

### Requirement: home hero random approved logo effect

On each full page load of `/`, the home hero mark SHALL display one effect chosen
uniformly at random from the approved set: `bloom-spin`, `spin`, `counter-spin`,
`pulse`, `breathe-spin`, `wobble`, `heartbeat`, `stagger-pulse`, `morph-scale-swap`,
`soft-glow`, `chromatic-soft`, `liquid-displace`, `stroke-draw`, `outline-only`,
`specular-sweep`, `cascade-in`.

#### Scenario: reload may change effect

- **GIVEN** the home page with motion allowed
- **WHEN** the user performs multiple hard reloads
- **THEN** the hero mark may show different effects from the approved set only

### Requirement: upright mark on hero and chrome

The vd3 mark on home (static frames), navbar, footer, and favicon SHALL show two
small circles above and one small circle below (upright pose). Group rotations
SHALL use the inner (big) circle center as the axis.

#### Scenario: navbar shows upright static mark

- **GIVEN** any page after this change
- **WHEN** the navbar brand logo is viewed
- **THEN** it shows the upright two-up / one-down pose with no animation

### Requirement: lighter mark fills for dark UI

Outer and inner fills SHALL be lightened versus the prior near-black palette so
the mark remains visible on dark theme backgrounds.

#### Scenario: mark visible on dark theme

- **GIVEN** dark theme active
- **WHEN** the user views the navbar or home hero mark
- **THEN** the green fills are clearly visible (not near-black)

### Requirement: dark-mode default primary matches logo green

The docs site SHALL default dark-mode primary to the green hue
(`data-primary="green"`) via `themeDefaults.PRIMARY_DARK` at bootstrap. When dark
mode is active and primary is green, the docs shell CSS SHALL pin semantic primary
tokens to the logo stop (`--vd-green-8` = `#2f9e44`) and its ramp companions.
Light-mode primary SHALL remain package `PRIMARY_LIGHT` (`black`). The theme store
SHALL treat legacy stored `"blue"` as a docs auto-primary and migrate it to the
current default primary on init, theme change, and OS scheme flip (same pattern as
docs neutral auto-defaults).

#### Scenario: dark default primary is green with logo accent

- **GIVEN** a fresh visit with dark theme (explicit or system dark)
- **WHEN** the user views primary buttons, links, or nav accents
- **THEN** `data-primary` is `green` and `--vd-color-primary` resolves to the
  logo green stop (`--vd-green-8`)

#### Scenario: legacy blue primary migrates to green in dark

- **GIVEN** `localStorage` holds `vanduo-primary-color` = `blue` from a prior visit
- **WHEN** the theme store initializes in dark mode
- **THEN** primary becomes `green` and `data-primary` is `green`

#### Scenario: explicit non-default primary is preserved

- **GIVEN** the user picks violet (or any non-auto primary) in the customizer
- **WHEN** they switch between light and dark
- **THEN** the chosen primary hue persists

### Requirement: integration snippets show docs bootstrap primary

Pages that document site bootstrap with `themeDefaults` SHALL show the docs site's
real dark primary override as `PRIMARY_DARK: "green"` in
`guides/FrameworkIntegration.vue` and `components/ThemeSwitcher.vue`. Generic
teaching samples that demonstrate other hues (e.g. violet via `setThemeDefaults`)
SHALL remain unchanged.

#### Scenario: FrameworkIntegration mirrors site bootstrap

- **GIVEN** `guides/FrameworkIntegration.vue` after this change
- **WHEN** its bootstrap code snippets are read
- **THEN** `PRIMARY_DARK` is `"green"`, not `"blue"`

