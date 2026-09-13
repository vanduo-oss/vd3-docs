# docs-content

## ADDED Requirements

### Requirement: site shell uses VdSiteDock chrome

The docs site shell SHALL render a fixed `VdDock` via `VdSiteDock` on every
route (`App.vue`) instead of a top site `VdNavbar` or site `VdFooter`. The
dock MUST use `cycle="edges"`, a docs-owned persist storage key, and
`Vd3BrandMark` in `#brand`. Nav items SHALL include Home (`/`), Docs
(`/docs-landing`), CBUN (`/cbun`), and Showcase (`/showcase`). The `#actions`
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

`/guides/vd3-ecosystem` (`Vd3Ecosystem.vue`) SHALL describe the three-repo
vd3 line and MAY carry a short note that vanduo v2 was retired and vd3 is the
only maintained line. It MUST NOT use "maintenance mode" / "critical fixes"
wording, MUST NOT name individual retired package slugs, and MUST NOT link to
`/guides/migration`. The docs MUST NOT ship a migration page (existing
no-migration requirement remains).

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
