## MODIFIED Requirements

### Requirement: displayed package strings name the vd3 line

Every **displayed** package specifier in the docs — the string literals inside
`DocCodeSnippet` props and the `<code>` spans of prose, i.e. the text a reader
copies — SHALL name the vd3 line. `@vanduo-oss/vue` SHALL be shown as
`@vanduo-oss/vd3`. Charts and flowchart install/import strings SHALL name
`@vanduo-oss/vd3-charts` and `@vanduo-oss/vd3-flowchart` (plus `/css`).
Hex-grid, music-player, code-editor, and draw SHALL continue to show
`@vanduo-oss/vd3-cbun/{hex-grid,music-player,code-editor,draw}` (and
`.../css` / `.../hex-math`). Displayed strings MUST NOT name the retired
packages `@vanduo-oss/charts`, `@vanduo-oss/flowchart`,
`@vanduo-oss/hex-grid`, `@vanduo-oss/music-player`, or `@vanduo-oss/vue`.

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

#### Scenario: canvas install strings name the cbun bundle

- **GIVEN** `canvas/Hex.vue` and `media/MusicPlayer.vue` after this change
- **WHEN** each page's displayed `installShell` / usage snippet is read
- **THEN** it shows `@vanduo-oss/vd3-cbun/<name>` and no `@vanduo-oss/<name>/vue`
  or bare-old-package string

### Requirement: the integration guide covers vd3 installation

`guides/FrameworkIntegration.vue` SHALL be rewritten as **"Installation &
Integration"** and SHALL document installing `@vanduo-oss/vd3`, the dedicated
`@vanduo-oss/vd3-charts` and `@vanduo-oss/vd3-flowchart` packages when those
widgets are needed, and `@vanduo-oss/vd3-cbun` for the remaining canvas
widgets, importing `@vanduo-oss/vd3/css`, installing the `VanduoVue` plugin
(`app.use(VanduoVue, { themeDefaults })`), and vite-ssg / SSR usage. It MUST
NOT tell readers to run `Vanduo.init` after mount or load an IIFE bundle.

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
  separately from `@vanduo-oss/vd3-cbun`

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

### Requirement: the About page is a vd3 overview, not vd2 founder copy

The `/about` page ([src/pages/about.vue](../../../src/pages/about.vue)) SHALL present a
plain-language overview of the standalone vd3 line and MUST NOT carry the pre-strip
vd2 clone's founder's-message content (e.g. "The Shape of the Water") or any
dual-engine / vanilla-engine framing. Its prose SHALL describe only real facts about
`@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`, `@vanduo-oss/vd3-flowchart`, and
`@vanduo-oss/vd3-cbun` and MUST NOT invent component or composable APIs. All
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

### Requirement: ecosystem guide states legacy retirement without a migration page

`/guides/vd3-ecosystem` (`Vd3Ecosystem.vue`) SHALL describe the vd3 line
packages (docs, `@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`,
`@vanduo-oss/vd3-flowchart`, `@vanduo-oss/vd3-cbun`) and MAY carry a short
note that vanduo v2 was retired and vd3 is the only maintained line. It MUST
NOT use "maintenance mode" / "critical fixes" wording, MUST NOT name
individual retired package slugs, and MUST NOT link to `/guides/migration`.
The docs MUST NOT ship a migration page (existing no-migration requirement
remains).

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

## REMOVED Requirements

### Requirement: the ecosystem guide describes the three-repo vd3 line

**Reason:** The documented line now includes dedicated charts and flowchart
packages alongside vd3, vd3-cbun, and vd3-docs.

## ADDED Requirements

### Requirement: the ecosystem guide describes the vd3 line packages

`guides/Vd3Ecosystem.vue` SHALL describe the vd3 line — `vd3-docs` (the docs
site), `vd3` (the Vue 3 component library with tokens and CSS),
`vd3-charts` and `vd3-flowchart` (dedicated canvas widgets), and `vd3-cbun`
(the remaining canvas bundle: code-editor / draw / hex-grid / music-player,
which still also contains charts and flowchart). It MUST NOT present "pick an
engine (Vanilla or Vue)" framing, the old four-separate-add-on-package
install grid, or vanduo v2 / legacy-line migration teaching.

#### Scenario: the ecosystem guide names the vd3 line packages

- **GIVEN** `guides/Vd3Ecosystem.vue` after this change
- **WHEN** it is read
- **THEN** it names `vd3-docs`, `@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`,
  `@vanduo-oss/vd3-flowchart`, and `@vanduo-oss/vd3-cbun`, and contains no
  "when to use the Vanilla engine" / "when to use the Vue 3 engine" choice
  section and no vanduo v2 migration teaching
