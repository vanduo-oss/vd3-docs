# docs-content Specification

## Purpose
Document and dogfood the shipped Vue 3 vd3 line — live demos, guides, and
routes with no dual-engine or invented APIs.

## Requirements

### Requirement: displayed package strings name the vd3 line

Every **displayed** package specifier in the docs — the string literals inside
`DocCodeSnippet` props and the `<code>` spans of prose, i.e. the text a reader
copies — SHALL name the vd3 line. `@vanduo-oss/vue` SHALL be shown as
`@vanduo-oss/vd3`. Charts and flowchart install/import strings SHALL name
`@vanduo-oss/vd3-charts` and `@vanduo-oss/vd3-flowchart` (plus `/css`).
Hex-grid, music-player, code-editor, and draw SHALL show
`@vanduo-oss/vdl-cbun/{hex-grid,music-player,code-editor,draw}` (and
`.../css` / `.../hex-math`) on guides and `/cbun`. Displayed strings MUST NOT
name the retired packages `@vanduo-oss/charts`, `@vanduo-oss/flowchart`,
`@vanduo-oss/hex-grid`, `@vanduo-oss/music-player`, or `@vanduo-oss/vue`.
Historical changelog cards MAY still mention `@vanduo-oss/vd3-cbun/*` as the
published path for those past releases.

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

#### Scenario: remaining canvas widgets name vdl-cbun

- **GIVEN** `/cbun`, Getting started, Installation, and the ecosystem guide
- **WHEN** install/import strings for draw, hex-grid, code-editor, and
  music-player are read
- **THEN** they show `@vanduo-oss/vdl-cbun/<name>` (not `@vanduo-oss/vd3-cbun`)
  and no `@vanduo-oss/<name>/vue` or bare-old-package string

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

`guides/FrameworkIntegration.vue` SHALL be rewritten as **"Installation &
Integration"** and SHALL document installing `@vanduo-oss/vd3`, the dedicated
`@vanduo-oss/vd3-charts` and `@vanduo-oss/vd3-flowchart` packages when those
widgets are needed, and `@vanduo-oss/vdl-cbun` for the remaining canvas
widgets (documented on labs), importing `@vanduo-oss/vd3/css`, installing the
`VanduoVue` plugin (`app.use(VanduoVue, { themeDefaults })`), and vite-ssg /
SSR usage. It MUST NOT tell readers to run `Vanduo.init` after mount or load
an IIFE bundle.

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
  separately from `@vanduo-oss/vdl-cbun`

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
`pages/changelog-vue-content.html` SHALL name only `@vanduo-oss/vd3`,
`@vanduo-oss/vd3-charts`, `@vanduo-oss/vd3-flowchart`, and
`@vanduo-oss/vd3-cbun`; they MUST NOT name `@vanduo-oss/core`,
`@vanduo-oss/framework`, `@vanduo-oss/vue`, or any of the four old ecosystem
packages, and MUST NOT carry any `data-engine` attribute. The header copy SHALL
name those vd3-line packages. The latest inline cards SHALL identify
`@vanduo-oss/vd3` `1.7.2`, `@vanduo-oss/vd3-charts` `1.1.0`,
`@vanduo-oss/vd3-flowchart` `1.2.0`, and `@vanduo-oss/vd3-cbun` `1.4.2`.
Historical cbun cards MAY continue to mention `@vanduo-oss/vd3-cbun/charts`
and `@vanduo-oss/vd3-cbun/flowchart` as the published paths for those
releases. Per the changelog-content policy the page tracks package releases
only, never docs-site content.

#### Scenario: the changelog names the vd3 packages and drops the old line

- **GIVEN** `pages/changelog.vue` and `pages/changelog-vue-content.html` after
  this change
- **WHEN** they are read and grepped
- **THEN** every release card names `@vanduo-oss/vd3`,
  `@vanduo-oss/vd3-charts`, `@vanduo-oss/vd3-flowchart`, or
  `@vanduo-oss/vd3-cbun`, there is no `data-engine` attribute, and there is no
  `@vanduo-oss/core`, `@vanduo-oss/framework`, `@vanduo-oss/vue`,
  `@vanduo-oss/charts`, `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, or
  `@vanduo-oss/music-player` reference

#### Scenario: the latest cbun card documents 1.4.2

- **GIVEN** the `@vanduo-oss/vd3-cbun` column on `/changelog`
- **WHEN** its latest release card is read
- **THEN** `v1.4.2` is marked Latest and documents draw paint-order / gesture
  fixes, charts responsive tables plus core `role` / Vue `svgRole`, and
  hex-grid fast-frame render stats

#### Scenario: standalone charts and flowchart have Latest cards

- **GIVEN** the changelog grid after this change
- **WHEN** the `@vanduo-oss/vd3-charts` and `@vanduo-oss/vd3-flowchart`
  columns are read
- **THEN** charts `v1.1.0` and flowchart `v1.2.0` are each marked Latest and
  document the extract from `@vanduo-oss/vd3-cbun@1.4.2`

### Requirement: Charts component page documents SVG role overrides

The Charts page SHALL document the published `@vanduo-oss/vd3-charts@1.1.0`
accessibility role API: core factories accept `role`, while Vue accepts
`svgRole` so normal `role` continues to fall through to the wrapper root.

#### Scenario: Charts API distinguishes wrapper and SVG roles

- **GIVEN** the Charts Vue API table and WAI-ARIA explainer
- **WHEN** a reader looks for role overrides
- **THEN** the page names Vue `svgRole`, core `role`, and explains that standard
  Vue `role` remains on the wrapper root

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

### Requirement: moved widget pages MUST NOT remain as in-site routes

The four widget doc pages that moved to labs — Draw, Hex Grid, Code Editor, and
Music Player — MUST NOT remain as in-site routes. The SFCs
`src/pages/canvas/Draw.vue`, `src/pages/canvas/Hex.vue`,
`src/pages/editors/CodeEditor.vue`, and `src/pages/media/MusicPlayer.vue` MUST
NOT exist. `src/nav.ts` and `src/router.ts` MUST NOT register
`/canvas/draw`, `/canvas/hex`, `/editors/code-editor`, or
`/media/music-player`. The search index MUST NOT surface those four routes.
Full documentation lives on labs:
`https://labs.vanduo.dev/#widgets/{draw,hex,code-editor,music-player}`.

#### Scenario: the four page modules and routes are gone

- **GIVEN** the repository after this change
- **WHEN** `src/pages/` is listed and `src/nav.ts` / `src/router.ts` are read
- **THEN** the four SFCs do not exist and those four paths are not registered

#### Scenario: search does not surface the moved pages

- **GIVEN** a rebuilt `public/search/search-index.json`
- **WHEN** it is grepped for `/canvas/draw`, `/canvas/hex`,
  `/editors/code-editor`, and `/media/music-player`
- **THEN** there are zero route hits for those paths

### Requirement: /cbun showcase splits vd3 and vdl lines

`/cbun` (`src/pages/cbun.vue`) SHALL keep live showcase cards for both lines
with a visual **vd3 | vdl** separator between them. The **vd3** line SHALL
include charts and flowchart cards whose Documentation links stay on this site
(`/canvas/charts`, `/canvas/flowchart`). The **vdl** line SHALL include draw,
code-editor, music-player, and hex-grid with live previews importing from
`@vanduo-oss/vdl-cbun/*`, and Documentation links SHALL be absolute labs URLs
(`https://labs.vanduo.dev/#widgets/{draw,code-editor,music-player,hex}`).
`CbunShowcaseRow` MUST support external Documentation hrefs (not only
`RouterLink`).

#### Scenario: separator and labs docs links

- **GIVEN** `/cbun` after this change
- **WHEN** the page is rendered
- **THEN** vd3 cards appear above a visual vd3|vdl separator, vdl cards appear
  below it, and each vdl Documentation control points at the matching labs URL

### Requirement: the About page is a vd3 overview, not vd2 founder copy

The `/about` page ([src/pages/about.vue](../../../src/pages/about.vue)) SHALL present a
plain-language overview of the standalone vd3 line and MUST NOT carry the pre-strip
vd2 clone's founder's-message content (e.g. "The Shape of the Water") or any
dual-engine / vanilla-engine framing. Its prose SHALL describe only real facts about
`@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`, `@vanduo-oss/vd3-flowchart`, and
`@vanduo-oss/vdl-cbun` and MUST NOT invent component or composable APIs. All
page styling SHALL remain scoped to `about.vue`; the change MUST NOT modify
`app.css` or other shell/layout stylesheets.

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

### Requirement: first-visit default primary is blue

The docs site SHALL default first-visit (unset) primary to Ink (`black`) in
light and the published vd3 primary token `blue` in dark via
`themeDefaults.PRIMARY_LIGHT` / `PRIMARY_DARK` at bootstrap and the matching
`DOCS_DEFAULT_PRIMARY_*` constants. First visit SHALL persist both scheme
defaults to `vanduo-primary-color-light` and `vanduo-primary-color-dark`, then
apply the value for the resolved scheme.

A lone legacy `vanduo-primary-color` SHALL be migrated: stored `blue` (the
former shared docs default) remaps like a first visit; any other stored hue
SHALL be kept as the current/last scheme's preference, and the other scheme
SHALL receive its first-visit default. Per-scheme keys, once present, SHALL
win over the legacy key.

When dark mode is active and primary is `green` (an explicit user choice), the
docs shell CSS SHALL still pin semantic primary tokens to the logo stop
(`--vd-green-8` = `#2f9e44`) and its ramp companions.

#### Scenario: fresh light visit uses black and persists both scheme defaults

- **GIVEN** a fresh visit with empty theme localStorage
- **WHEN** the theme store initializes in light
- **THEN** `data-primary` is `black` and both per-scheme keys are written
  (`light` = `black`, `dark` = `blue`)

#### Scenario: fresh dark visit uses blue and persists both scheme defaults

- **GIVEN** a fresh visit with empty theme localStorage
- **WHEN** the theme store initializes in dark
- **THEN** `data-primary` is `blue` and both per-scheme keys are written
  (`light` = `black`, `dark` = `blue`)

#### Scenario: legacy explicit primary stays on the current scheme

- **GIVEN** `localStorage` holds only `vanduo-primary-color` = `green` or
  `black` and a current scheme
- **WHEN** the theme store initializes
- **THEN** that stored primary remains on the current scheme and the other
  scheme uses its first-visit default

#### Scenario: primaries are independent per scheme

- **GIVEN** the user picks violet in light, then switches to dark
- **WHEN** they view dark, optionally pick green, then switch back
- **THEN** dark uses its stored primary (`blue` until they pick otherwise)
  and light remains violet

### Requirement: integration snippets show docs bootstrap primary

Pages that document site bootstrap with `themeDefaults` SHALL show the docs
site's real primary override: `PRIMARY_DARK` `"blue"` in
`guides/FrameworkIntegration.vue`, and `PRIMARY_LIGHT` `"black"` /
`PRIMARY_DARK` `"blue"` in `components/ThemeSwitcher.vue`. Generic teaching
samples that demonstrate other hues (e.g. violet via `setThemeDefaults`)
SHALL remain unchanged.

#### Scenario: FrameworkIntegration mirrors site bootstrap

- **GIVEN** `guides/FrameworkIntegration.vue` after this change
- **WHEN** its bootstrap code snippets are read
- **THEN** `PRIMARY_DARK` is `"blue"`, not `"green"`

#### Scenario: ThemeSwitcher mirrors site bootstrap

- **GIVEN** `components/ThemeSwitcher.vue` after this change
- **WHEN** its bootstrap code snippet is read
- **THEN** `PRIMARY_LIGHT` is `"black"` and `PRIMARY_DARK` is `"blue"`

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
`demo-title` — SHALL render exactly one one-line intro `<p>` directly
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
  on `@vanduo-oss/vd3`, and links toward Doc Search and/or the hybrid search
  guide

### Requirement: hybrid search guide

The docs site SHALL expose `/guides/hybrid-search` documenting
`vdl-hybrid-search` indexing, presets, tuning, eval, and troubleshooting.

#### Scenario: reader learns indexing

- **GIVEN** `/guides/hybrid-search`
- **WHEN** the page is read
- **THEN** it describes corpus indexing / JSON assets and how maintainers
  regenerate them (`pnpm index` / `pnpm index:eval`)

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

`/guides/vd3-ecosystem` (`Vd3Ecosystem.vue`) SHALL describe the vd3 line
packages (docs, `@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`,
`@vanduo-oss/vd3-flowchart`) plus `@vanduo-oss/vdl-cbun` for the remaining
canvas widgets (documented on labs) and MAY carry a short note that vanduo v2
was retired and vd3 is the only maintained line. It MUST NOT use "maintenance
mode" / "critical fixes" wording, MUST NOT name individual retired package
slugs, and MUST NOT link to `/guides/migration`. The docs MUST NOT ship a
migration page (existing no-migration requirement remains).

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

`guides/Vd3Ecosystem.vue` SHALL describe the vd3 line — `vd3-docs` (the docs
site), `vd3` (the Vue 3 component library with tokens and CSS),
`vd3-charts` and `vd3-flowchart` (dedicated canvas widgets), and `vdl-cbun`
(the labs canvas bundle: code-editor / draw / hex-grid / music-player,
documented on labs). It MUST NOT present "pick an engine (Vanilla or Vue)"
framing, the old four-separate-add-on-package install grid, or vanduo v2 /
legacy-line migration teaching.

#### Scenario: the ecosystem guide names the vd3 line packages

- **GIVEN** `guides/Vd3Ecosystem.vue` after this change
- **WHEN** it is read
- **THEN** it names `vd3-docs`, `@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`,
  `@vanduo-oss/vd3-flowchart`, and `@vanduo-oss/vdl-cbun`, and contains no
  "when to use the Vanilla engine" / "when to use the Vue 3 engine" choice
  section and no vanduo v2 migration teaching
