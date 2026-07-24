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

#### Scenario: the canvas pages are visual-baselined at their deterministic initial render

- **GIVEN** the Playwright visual-parity suite after this change
- **WHEN** its `ROUTES` list is enumerated
- **THEN** `/canvas/draw` is **present** (alongside `/canvas/{charts,flowchart,hex}`), so a `vd3-canvas-draw` baseline is committed — the earlier canvas-exclusion precedent is retired because the initial page-load render is deterministic (the non-deterministic behaviors — e.g. Hex's random terrain, MusicPlayer's wall-clock log — only fire on user interaction, which the suite does not perform)

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

### Requirement: the Modal page renders the real VdModal

`src/pages/components/Modal.vue` SHALL import and live-render `VdModal` from
`@vanduo-oss/vd3`, driving it with only the real props (`open`, `title`, `size`
of `sm`/`md`/`lg`, `closeOnBackdrop`) and handling `@update:open` / `@close`. The
page SHALL NOT document a `data-modal` / `data-dismiss` attribute API, SHALL NOT
list `modal:open` / `modal:close` events, and SHALL NOT hand-roll a
`<div class="vd-modal is-open">` dialog. Any CSS-class reference SHALL describe
the DOM the component actually renders (`.vd-modal`, `.vd-modal-open`,
`.vd-modal-backdrop`, `.vd-modal-panel[-sm|-md|-lg]`, `.vd-modal-header`,
`.vd-modal-title`, `.vd-modal-body`, `.vd-modal-footer`).

#### Scenario: the modal page uses the component, not a vanilla attribute API

- **GIVEN** `src/pages/components/Modal.vue` after this change
- **WHEN** its `<script setup>` and template are read
- **THEN** it imports `VdModal` from `@vanduo-oss/vd3`, live-renders it with
  `:open` bound to reactive state and `@update:open` / `@close` closing it, and
  the file contains no `data-modal`, `data-dismiss`, `modal:open`, `modal:close`,
  or `vd-modal is-open` string

#### Scenario: only real modal props and events are documented

- **GIVEN** the Modal page's API-reference tables
- **WHEN** the props / events tables are read
- **THEN** every documented prop is one of `open` / `title` / `size` /
  `closeOnBackdrop` and every documented event is `update:open` or `close`, each
  present on `VdModal` in `@vanduo-oss/vd3`

### Requirement: the Rating page documents the VdRating component API

`src/pages/components/Rating.vue` SHALL present `VdRating` usage through its real
component API — `v-model` (`modelValue`), `:max`, `:size` (`sm`/`lg`),
`:readonly`, and the `@change` / `@update:modelValue` events. It SHALL NOT show a
`data-vd-rating` auto-init snippet, SHALL NOT include a Data-Attributes table for
rating, and SHALL NOT document a `rating:change` event (which `VdRating` never
emits).

#### Scenario: rating snippets and tables use the component API

- **GIVEN** `src/pages/components/Rating.vue` after this change
- **WHEN** its code snippets and API tables are read
- **THEN** no `data-vd-rating` string and no `rating:change` row remain, and the
  documented props/events are exactly those on `VdRating` (`modelValue`, `max`,
  `size`, `readonly`, `name`; emits `update:modelValue` and `change`)

### Requirement: the Tree and Transfer pages document props, not data-attributes

`src/pages/components/Tree.vue` and `src/pages/components/Transfer.vue` SHALL show
their usage snippets as `<VdTree :nodes>` / `<VdTransfer :items>` component
markup and SHALL NOT present `data-vd-tree` / `data-vd-transfer` auto-init markup
or a Data-Attributes table describing such an API. The real `tree:check`,
`tree:toggle`, and `transfer:change` CustomEvents (dispatched by the components)
SHALL be retained in the events tables. Any CSS-class reference SHALL name only
classes the component renders.

#### Scenario: tree/transfer snippets reference the real props

- **GIVEN** the Tree and Transfer pages after this change
- **WHEN** their code snippets and reference tables are read
- **THEN** each page live-renders its component with the `:nodes` / `:items`
  prop, contains no `data-vd-tree` / `data-vd-transfer` string and no
  Data-Attributes table, and still documents the real
  `tree:check` / `tree:toggle` / `transfer:change` events

### Requirement: the exported form/group components are dogfooded

`src/pages/components/ButtonGroups.vue` SHALL live-render `VdButtonGroup` and
`src/pages/components/Forms.vue` SHALL live-render `VdCheckboxGroup`,
`VdRadioGroup`, and `VdSelect`, each imported from `@vanduo-oss/vd3`. Every
prop / emit / slot documented for these components SHALL exist on the installed
`@vanduo-oss/vd3` source — no invented API.

#### Scenario: the four previously-unrendered exports are shown live

- **GIVEN** the Button-Groups and Forms pages after this change
- **WHEN** their templates are read
- **THEN** `VdButtonGroup`, `VdCheckboxGroup`, `VdRadioGroup`, and `VdSelect` are
  each imported from `@vanduo-oss/vd3` and rendered in at least one demo, with API
  tables listing only real props (`VdButtonGroup`: `size`/`vertical`/`fullWidth`;
  the group inputs: `options`/`modelValue`/`name` and their optional
  `inline`/`size`/`disabled`; `VdSelect`: `modelValue`/`options` plus optional
  `name`/`id`/`placeholder`/`disabled`/`required`)

### Requirement: the customizer emits valid, preview-matching Vue code

`src/customizer/registry.ts` and `src/customizer/codegen.ts` SHALL generate a
copy-ready Vue SFC that typechecks against the real component prop types and
reproduces the live preview. CSS-only looks (button `outline-*` / `ghost-*`,
badge `outlined`, card `outlined` / `filled` / `glow`, and the glass
`vd-card-glass` / `vd-glass-tinted` modifiers) SHALL be emitted as classes on the
element's `class` attribute, not as component props. Only props that exist on the
components SHALL be emitted: `VdButton` `variant` (limited to `primary` /
`secondary`) and `size`; `VdBadge` `variant` (`primary` / `secondary`) and
`pill`; `VdCard` `elevated`.

#### Scenario: generated SFC contains valid props and the preview classes

- **GIVEN** a customizer state that selects an outlined/ghost/glass look
- **WHEN** `toVueSfc(entry, state, scope)` runs for the button, badge, and card
  entries
- **THEN** the emitted template contains no `variant="outline-primary"` /
  `variant="ghost-primary"` and no non-existent Card/Badge props, and instead
  carries the corresponding `vd-btn-outline-primary` / `vd-badge-outlined` /
  `vd-card-outlined` / `vd-card-glass` classes on the element — matching the
  preview's `rootClass`

#### Scenario: a unit test guards the codegen output

- **GIVEN** `tests/unit/customizer-codegen.spec.ts`
- **WHEN** `pnpm test` runs
- **THEN** the test asserts the generated button/badge/card SFCs contain only
  valid props and the expected CSS classes, and it passes

### Requirement: docs prose carries no dual-engine vanilla framing

The Theme Customizer guide (`src/pages/guides/ThemeCustomizerGuide.vue`) SHALL
list the real persisted `localStorage` keys — `vanduo-palette`,
`vanduo-primary-color`, `vanduo-neutral-color`, `vanduo-radius`,
`vanduo-font-preference`, `vanduo-theme-preference`. Across the touched pages
(`Badge.vue`, `Button.vue`, `Primitives.vue`, and comments in `Tree.vue` /
`Transfer.vue` / `Modal.vue`) "Vanilla-only" / "engine-specific" dual-engine
framing SHALL be removed, reworded to name CSS-only classes that ship in vd3's
CSS. `app.css` SHALL remain shell/layout-only.

#### Scenario: the guide lists the real storage keys

- **GIVEN** `src/pages/guides/ThemeCustomizerGuide.vue` after this change
- **WHEN** its persistence snippet is read
- **THEN** it names the six real keys and no longer lists `vanduo-theme`,
  `vanduo-primary`, `vanduo-neutral`, or `vanduo-font`

#### Scenario: no "Vanilla"/"engine-specific" framing remains on the touched pages

- **GIVEN** the touched component pages after this change
- **WHEN** they are grepped for `Vanilla` / `engine-specific`
- **THEN** no dual-engine framing remains; CSS-only class notes describe the
  classes as shipping in vd3's CSS rather than as a second-engine API

### Requirement: component demo pages open with a one-line intro

Every component **demo** page under `src/pages/components/` that renders a
`demo-title` — plus the cbun demo pages `editors/CodeEditor.vue` and
`media/MusicPlayer.vue` — SHALL render exactly one one-line intro `<p>` directly
under its `demo-title` (or the `lcc-demo-head` block that wraps it), describing
the component in plain language with no invented component or composable API. The
intro `<p>` SHALL carry the spacing token `vd-mb-8` and SHALL NOT be muted
(`vd-text-muted`), matching the majority convention across the demo family. The
nine pages that previously lacked an intro — `Button`, `ButtonGroups`, `Chip`,
`Collection`, `Scrollspy`, `Table`, `Avatar`, `Flow`, `Toast` — SHALL each gain
one. This change SHALL NOT add or alter any heading, and the guide/effect prose
pages (their own `vd-mb-6` lead convention) are out of scope.

#### Scenario: every component demo page has a normalized intro

- **GIVEN** any page under `src/pages/components/` that renders a `demo-title`
- **WHEN** the first paragraph under the demo-title is read
- **THEN** there is exactly one intro `<p class="vd-mb-8">` (not muted)
  describing the component, and the nine previously-missing pages now include one

#### Scenario: the intro names only real APIs

- **GIVEN** the `Toast` and `Scrollspy` intros after this change
- **WHEN** their prose is read
- **THEN** `Toast` names the real `useToast` composable and `Scrollspy` names the
  real `useWaypoint` composable, with no invented component or composable

