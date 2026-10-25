# docs-content Specification

## Purpose
Document and dogfood the shipped Vue 3 vd3 line — live demos, guides, and
routes with no dual-engine or invented APIs.

## Requirements

### Requirement: displayed package strings name the vd3 line

Displayed install and import strings SHALL name the vd3 line:
`@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`, and `@vanduo-oss/vd3-flowchart`.
They MUST NOT name retired packages or `@vanduo-oss/vdl-cbun`. Historical
changelog cards MAY still name `@vanduo-oss/vd3-cbun`.

#### Scenario: no old-line package name survives in any displayed string

- **GIVEN** the whole `src/` tree after this change
- **WHEN** it is grepped for `@vanduo-oss/vue`, `@vanduo-oss/charts`,
  `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, and `@vanduo-oss/music-player`
- **THEN** there are zero matches in snippet strings, prose `<code>`, or install
  commands

#### Scenario: charts and flowchart install strings name the dedicated packages

- **GIVEN** `canvas/Charts.vue` and `canvas/Flowchart.vue` after this change
- **WHEN** each page's displayed `installShell` / usage snippet is read
- **THEN** Charts shows `@vanduo-oss/vd3-charts` and Flowchart shows
  `@vanduo-oss/vd3-flowchart`, with no `@vanduo-oss/vd3-cbun/{charts,flowchart}`
  and no retired `@vanduo-oss/{charts,flowchart}` string

#### Scenario: guides do not install a removed labs bundle

- **GIVEN** `/cbun`, Getting started, Installation, and the ecosystem guide
- **WHEN** install and import strings are read
- **THEN** charts and flowchart name `@vanduo-oss/vd3-charts` and
  `@vanduo-oss/vd3-flowchart`
- **AND** those pages do not show `@vanduo-oss/vdl-cbun` or
  `@vanduo-oss/vd3-cbun`

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

### Requirement: there is no vanduo v2 migration guide

The docs MUST NOT ship a "Migrating from vanduo v2 to vd3" page, sidebar entry,
or `/guides/migration` route. Search keywords MUST NOT surface a v2 migration
guide. Cross-links that previously pointed at that page SHALL be retargeted to a
current guide. Visiting `/guides/migration` SHALL 404 via the existing catch-all.

#### Scenario: the migration page and its inbound links are gone

- **GIVEN** the repository after this change
- **WHEN** `src/pages/guides/` is listed and `src/` is grepped for
  `/guides/migration` and `MigrationComparison`
- **THEN** `MigrationComparison.vue` does not exist and there are zero
  user-facing link matches

### Requirement: the integration guide covers vd3 installation

The Installation guide SHALL show `pnpm add @vanduo-oss/vd3`, the charts and
flowchart packages, `@vanduo-oss/vd3/css`, and `app.use(VanduoVue)`. It MUST
NOT tell readers to install `@vanduo-oss/vdl-cbun` or load a vanilla runtime.

#### Scenario: the integration guide installs the plugin, not a runtime

- **GIVEN** `guides/FrameworkIntegration.vue` after this change
- **WHEN** its snippets are read
- **THEN** they show `pnpm add @vanduo-oss/vd3`, `import "@vanduo-oss/vd3/css"`,
  and `app.use(VanduoVue, …)`, and contain no `Vanduo.init` call or IIFE
  `<script>` include

#### Scenario: the integration guide names dedicated charts and flowchart packages

- **GIVEN** `guides/FrameworkIntegration.vue` after this change
- **WHEN** its canvas install and import snippets are read
- **THEN** they name `@vanduo-oss/vd3-charts` and `@vanduo-oss/vd3-flowchart`
  as separate packages and do not name `@vanduo-oss/vdl-cbun`

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

The changelog SHALL have three package columns: `@vanduo-oss/vd3` `1.8.0`,
charts `1.1.1`, and flowchart `1.5.0`, each marked Latest once. It MUST NOT
add a cbun column, a `data-engine` attribute, or retired package identities.
It tracks package releases only.

#### Scenario: the changelog names the vd3 packages and drops the old line

- **GIVEN** `pages/changelog.vue` after this change
- **WHEN** it is read and grepped
- **THEN** the three column titles are `@vanduo-oss/vd3`,
  `@vanduo-oss/vd3-charts`, and `@vanduo-oss/vd3-flowchart`, there is no
  cbun column title, there is no `data-engine` attribute, and there is no
  `@vanduo-oss/core`, `@vanduo-oss/framework`, `@vanduo-oss/vue`,
  `@vanduo-oss/charts`, `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, or
  `@vanduo-oss/music-player` reference as a package identity

#### Scenario: standalone charts and flowchart have Latest cards

- **GIVEN** the changelog grid after this change
- **WHEN** the `@vanduo-oss/vd3-charts` and `@vanduo-oss/vd3-flowchart`
  columns are read
- **THEN** charts `v1.1.1` and flowchart `v1.5.0` are each marked Latest
- **AND** flowchart `v1.4.0` is present and is not marked Latest

#### Scenario: vd3 Latest is 1.8.0

- **GIVEN** the `@vanduo-oss/vd3` column on `/changelog`
- **WHEN** its latest release card is read
- **THEN** `v1.8.0` is marked Latest and documents layout and UI atom prop
  parity, theme runtime fixes, and composable hardening
- **AND** `v1.7.5` and `v1.7.4` remain earlier cards and are not marked Latest

### Requirement: the flowchart page documents package 1.5.0

`/canvas/flowchart` SHALL dogfood `@vanduo-oss/vd3-flowchart` `1.5.0` with one
live editor at camera `0.05`/`20` and node size `6`/`4800`, and SHALL document
the legacy defaults, `fitNode`, history methods, cardinal ports, and document
format `1.3.0`. The minimap SHALL stay
pointer-only and `aria-hidden`. The page MUST NOT present nested containers,
parent ids, ghost suggestions, floating panels, or an export API as shipped,
and MUST NOT claim an infinite canvas or WCAG conformance.

#### Scenario: the live editor opts into the wide bounds

- **GIVEN** `/canvas/flowchart`
- **WHEN** the live editor is rendered
- **THEN** it passes camera bounds `0.05` and `20` and node-size bounds `6`
  and `4800`
- **AND** a control calls `fitNode` on one visible node

#### Scenario: persistence and events stay within the shipped API

- **GIVEN** the flowchart API tables
- **WHEN** they are read
- **THEN** they name document format `1.3.0`, package `1.5.0`, `fitNode`,
  and the four cardinal ports
- **AND** they do not claim WCAG conformance or an infinite canvas

### Requirement: Charts component page documents SVG role overrides

The Charts page SHALL document the published `@vanduo-oss/vd3-charts@1.1.1`
accessibility role API: core factories accept `role`, while Vue accepts
`svgRole` so normal `role` continues to fall through to the wrapper root.

#### Scenario: Charts API distinguishes wrapper and SVG roles

- **GIVEN** the Charts Vue API table and WAI-ARIA explainer
- **WHEN** a reader looks for role overrides
- **THEN** the page names Vue `svgRole`, core `role`, and explains that standard
  Vue `role` remains on the wrapper root

### Requirement: six component pages dogfood the real vd3 components

Breadcrumb, Fab, Footer, Navbar, Theme Switcher, and Theme Customizer SHALL
live-render the matching `Vd*` component from `@vanduo-oss/vd3`. Their API
tables SHALL list only props, emits, and slots that exist on that component.

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

`DocSearch.vue` SHALL live-render `VdDocSearch` from `@vanduo-oss/vd3` and
document only props, emits, and `useDocSearch` members that exist in that
package.

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

### Requirement: moved widget pages MUST NOT remain as in-site routes

Draw, Hex Grid, Code Editor, and Music Player MUST NOT remain as in-site
routes, nav entries, or search hits. Their page modules MUST NOT exist.

#### Scenario: the four page modules and routes are gone

- **GIVEN** the repository after this change
- **WHEN** `src/pages/` is listed and `src/nav.ts` / `src/router.ts` are read
- **THEN** the four SFCs do not exist and those four paths are not registered

#### Scenario: search does not surface the moved pages

- **GIVEN** a rebuilt `public/search/search-index.json`
- **WHEN** it is grepped for `/canvas/draw`, `/canvas/hex`,
  `/editors/code-editor`, and `/media/music-player`
- **THEN** there are zero route hits for those paths

### Requirement: /cbun showcases charts and flowchart

`/cbun` (`src/pages/cbun.vue`) SHALL present live charts and flowchart
previews from `@vanduo-oss/vd3-charts` and `@vanduo-oss/vd3-flowchart`, with
Documentation links on this site (`/canvas/charts`, `/canvas/flowchart`) and
install snippets for those two packages. It MUST NOT mount a labs canvas
bundle, MUST NOT depend on `@vanduo-oss/vdl-cbun`, and MUST NOT present a
vd3-versus-labs split or a "Why the split?" section.

#### Scenario: both published canvas packages are previewed

- **GIVEN** `/cbun`
- **WHEN** the page is rendered
- **THEN** a charts preview and a flowchart preview are present
- **AND** each links to its documentation page on this site
- **AND** the page does not mention `@vanduo-oss/vdl-cbun`

### Requirement: the About page is a vd3 overview, not vd2 founder copy

`/about` SHALL overview `@vanduo-oss/vd3`, charts, and flowchart without a
founder's message, dual-engine framing, labs-bundle dependency, or invented
APIs. Its styling SHALL stay in `about.vue`.

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

On each full page load of `/`, the home hero mark SHALL display the
`stroke-draw` effect.

#### Scenario: reload shows stroke-draw

- **GIVEN** the home page with motion allowed
- **WHEN** the user loads `/`
- **THEN** the hero mark uses the `stroke-draw` effect

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

### Requirement: docs color appearance has two sets

The docs shell SHALL paint with exactly two color sets, light and dark.
System SHALL be autodetect only: the stored preference may be `system`, and
while it is selected `html[data-theme]` and `color-scheme` SHALL match the
OS scheme's explicit mode. `data-theme` SHALL never be `system` or absent
after the theme store commits.

#### Scenario: system follows a dark OS

- **GIVEN** the stored theme preference is system
- **WHEN** the OS `prefers-color-scheme` is dark
- **THEN** `html[data-theme]` is `dark` and muted text matches explicit Dark

#### Scenario: system follows a light OS

- **GIVEN** the stored theme preference is system
- **WHEN** the OS `prefers-color-scheme` is light
- **THEN** `html[data-theme]` is `light` and muted text matches explicit Light

#### Scenario: explicit dark ignores a light OS

- **GIVEN** the stored theme preference is dark
- **WHEN** the OS `prefers-color-scheme` is light
- **THEN** `html[data-theme]` remains `dark`

### Requirement: first-visit default primary is green in dark

A first visit SHALL use primary Ink (`black`) in light and `green` in dark,
and SHALL persist both scheme keys. A lone legacy primary SHALL migrate as
the scenarios describe. Explicit dark `green` SHALL keep the logo green stop.

#### Scenario: fresh light visit uses black and persists both scheme defaults

- **GIVEN** a fresh visit with empty theme localStorage
- **WHEN** the theme store initializes in light
- **THEN** `data-primary` is `black` and both per-scheme keys are written
  (`light` = `black`, `dark` = `green`)

#### Scenario: fresh dark visit uses green and persists both scheme defaults

- **GIVEN** a fresh visit with empty theme localStorage
- **WHEN** the theme store initializes in dark
- **THEN** `data-primary` is `green` and both per-scheme keys are written
  (`light` = `black`, `dark` = `green`)

#### Scenario: legacy explicit primary stays on the current scheme

- **GIVEN** `localStorage` holds only `vanduo-primary-color` = `green` or
  `black` and a current scheme
- **WHEN** the theme store initializes
- **THEN** that stored primary remains on the current scheme and the other
  scheme uses its first-visit default

#### Scenario: primaries are independent per scheme

- **GIVEN** the user picks violet in light, then switches to dark
- **WHEN** they view dark, optionally pick green, then switch back
- **THEN** dark uses its stored primary (`green` until they pick otherwise)
  and light remains violet

### Requirement: integration snippets show docs bootstrap primary

Pages that document site bootstrap with `themeDefaults` SHALL show the docs
site's real primary override: `PRIMARY_DARK` `"green"` in
`guides/FrameworkIntegration.vue`, and `PRIMARY_LIGHT` `"black"` /
`PRIMARY_DARK` `"green"` in `components/ThemeSwitcher.vue`. Generic teaching
samples that demonstrate other hues (e.g. violet via `setThemeDefaults`)
SHALL remain unchanged.

#### Scenario: FrameworkIntegration mirrors site bootstrap

- **GIVEN** `guides/FrameworkIntegration.vue` after this change
- **WHEN** its bootstrap code snippets are read
- **THEN** `PRIMARY_DARK` is `"green"`

#### Scenario: ThemeSwitcher mirrors site bootstrap

- **GIVEN** `components/ThemeSwitcher.vue` after this change
- **WHEN** its bootstrap code snippet is read
- **THEN** `PRIMARY_LIGHT` is `"black"` and `PRIMARY_DARK` is `"green"`

### Requirement: marketing catalog counts match the published barrel

Landing `#docs-component-count`, the home “One Complete System” teaser, and
about “What you get” SHALL use one definition of “components”: the count of
`Vd*` component exports from `@vanduo-oss/vd3`. Composable copy on those
surfaces SHALL use the count of composable modules in that barrel. Landing
meta that counts docs pages SHALL be labeled as reference pages or guided
walkthroughs (not as “components”) and SHALL match `src/nav.ts`.

#### Scenario: marketing surfaces agree on package export counts

- **GIVEN** `/docs-landing`, `/`, and `/about` after this change
- **WHEN** their catalog copy is read
- **THEN** each names 63 components and (where composables are stated) 39
  composables, and `#docs-component-count` does not say “47+”

### Requirement: the Modal page renders the real VdModal

The Modal page SHALL live-render `VdModal` with its real props and events. It
MUST NOT document a `data-modal` attribute API or a hand-rolled dialog.

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

Tree and Transfer SHALL show `<VdTree :nodes>` and `<VdTransfer :items>`.
They MUST NOT document `data-vd-tree` or `data-vd-transfer` auto-init. Real
component events SHALL stay in the tables.

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

### Requirement: docs prose carries no dual-engine vanilla framing

The Theme Customizer guide SHALL list the real `vanduo-*` storage keys.
Touched component pages MUST NOT use dual-engine framing. `app.css` SHALL
stay shell and layout only.

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

Each component demo page SHALL open with one plain-language intro paragraph
using `vd-mb-8`, not muted. It MUST NOT invent an API. Guide pages are out
of scope.

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

### Requirement: site shell uses VdSiteDock chrome

The docs site shell SHALL render a fixed `VdDock` via `VdSiteDock` on every
route (`App.vue`) instead of a top site `VdNavbar` or site `VdFooter`. The
dock MUST use `cycle="edges"`, a docs-owned persist storage key, and
`Vd3BrandMark` in `#brand`. Nav items SHALL include Home (`/`), Docs
(`/docs-landing`), and CBUN (`/cbun`). The `#actions`
slot SHALL host Search (opens global search), ThemeSwitcher, then
ThemeCustomizer. Library demo pages for Navbar/Footer MAY remain.

#### Scenario: site dock replaces navbar and footer

- **GIVEN** any docs route
- **WHEN** the shell is inspected
- **THEN** a fixed site `VdDock` is present and neither a site navbar nor a
  site footer chrome component is mounted

### Requirement: docs-landing resource strip

`/docs-landing` SHALL expose a Resources strip with About (`/about`), GitHub,
NPM, and License. External links MUST use `target="_blank"` and
`rel="noopener"`.

#### Scenario: resource strip is present

- **GIVEN** `/docs-landing`
- **WHEN** the page is rendered
- **THEN** About, GitHub, NPM, and License are reachable and externals carry
  `rel=noopener`

### Requirement: global search component page

The docs site SHALL expose `/components/global-search` documenting
`VdGlobalSearch` and `useGlobalSearch` with a live in-memory adapter demo,
and SHALL register the route in `nav.ts`.

#### Scenario: reader finds palette API

- **GIVEN** `/components/global-search`
- **WHEN** the page is read
- **THEN** it shows live demo plus props/emits/composable surfaces that exist
  on `@vanduo-oss/vd3`, and links toward Doc Search

### Requirement: Oola chrome dogfoods package swatches, tint, and tooltip delay

Site chrome SHALL consume package APIs rather than local forks:
`VdSiteDock` MUST wire tooltips with `useTooltips` and a `showDelay`, and MUST
tint through `:tint` + `tint-mode="accent"`. The docs theme customizer overlay
MUST wrap the package `variant="swatches"` fan in controlled mode against the
docs theme store. No local reimplementation of dock tooltips, the swatches
fan, or accent tinting MAY remain as the primary chrome path.

#### Scenario: package APIs drive chrome

- **GIVEN** `VdSiteDock` and the docs theme customizer overlay
- **WHEN** their wiring is inspected
- **THEN** tooltips use `useTooltips` with a show delay, dock tint uses
  `:tint` + `tint-mode="accent"`, and the customizer runs controlled
  `variant="swatches"`

### Requirement: Seemore glass and surfaces effects pages

`/effects/glass` MUST document Seemore Glass Fibonacci strength steps and
demos staged on package `.vd-surface-*` backdrops. `/effects/surfaces` MUST
document `.vd-surface` variants and intensity modifiers and MUST be registered
under Effects in `nav.ts`. The homepage MUST include a Seemore Glass story
section with a CTA to `/effects/glass`.

#### Scenario: glass and surfaces routes exist

- **GIVEN** `src/nav.ts` and the effects pages
- **WHEN** Effects sections and demos are inspected
- **THEN** `/effects/glass` shows Fibonacci glass steps on surfaces and
  `/effects/surfaces` is registered and documented

### Requirement: login and table auth demos

`/components/login` MUST live-render `VdLogin` (and related auth pieces from
`@vanduo-oss/vd3`) with docs demos using `framed` false. `/components/table`
MUST live-render `VdDataTable` (sort/search/selection) and document real
package APIs only.

#### Scenario: login demo is live Vue

- **GIVEN** `/components/login`
- **WHEN** it is rendered
- **THEN** a `VdLogin` instance is in the document (not CSS-only markup)

#### Scenario: data table is live

- **GIVEN** `/components/table`
- **WHEN** it is rendered
- **THEN** a `.vd-data-table` is present

### Requirement: the button page documents the ring modifier

`/components/button` SHALL live-render `.vd-btn-ring` / `VdButton` `:ring` and
document the modifier in its reference tables. Nav keywords SHALL include
`ring`.

#### Scenario: live ring demo and tables

- **GIVEN** `/components/button`
- **WHEN** demos and API tables are read
- **THEN** real ring-marked buttons are shown and both class and Vue tables
  list the ring modifier/prop without inventing a `ring` variant

### Requirement: ecosystem guide states legacy retirement without a migration page

The ecosystem guide SHALL name the docs site, `@vanduo-oss/vd3`, charts, and
flowchart, and SHALL say these docs dogfood flowchart `1.5.0`. It MUST NOT
name a templates app, `@vanduo-oss/vdl-cbun`, or link to `/guides/migration`.

#### Scenario: retirement without migration

- **GIVEN** `/guides/vd3-ecosystem`
- **WHEN** retirement-related copy is read (if present)
- **THEN** it does not link to `/guides/migration` and does not revive
  dual-engine install framing

#### Scenario: migration route stays gone

- **GIVEN** the repository
- **WHEN** `src/` is grepped for `/guides/migration` and `MigrationComparison`
- **THEN** there is no migration page module and no user-facing nav entry for
  it

### Requirement: the ecosystem guide describes the vd3 line packages

`Vd3Ecosystem.vue` SHALL describe `vd3-docs`, `@vanduo-oss/vd3`, charts, and
flowchart. It MUST NOT present a templates package, a labs bundle, or a
vanilla-versus-Vue choice.

#### Scenario: the ecosystem guide names the vd3 line packages

- **GIVEN** `guides/Vd3Ecosystem.vue` after this change
- **WHEN** it is read
- **THEN** it names `vd3-docs`, `@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`,
  and `@vanduo-oss/vd3-flowchart`, says the docs dogfood flowchart `1.5.0`,
  and contains no templates package, `@vanduo-oss/vdl-cbun`, or vanilla-versus-Vue
  choice
