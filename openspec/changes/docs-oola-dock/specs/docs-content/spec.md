# docs-content

## ADDED Requirements

### Requirement: dock-component-page

The site SHALL provide a live Dock page at `/components/dock` that imports
`VdDock` and `VdDockItem` from `@vanduo-oss/vd3`. The default brand SHALL be
the docs-local ū mark on the left. The page MUST document that consumers
replace that icon via `#brand`, and MUST document `radius`, `glass`, `tint`,
and `itemLayout`. A page-local live customizer SHALL drive those real props
(plus orientation) without writing `useThemePreference()` or `<html data-*>`.
Reset SHALL restore ū, glass 34, radius 1.5, stack, and the
theme-aware tint (ink / no tint in light, Open Color green in dark).

#### Scenario: live dock

- **GIVEN** `/components/dock`
- **WHEN** the page renders
- **THEN** a `VdDock` is present with the ū brand and an API table whose
  fields match the package source

### Requirement: home-oola-section

The home page SHALL include `#home-oola` between the hero and
`#home-seemore`. At scroll 0 it MUST show a single horizontal contained
`VdDock` with ū on the left, radius 1.5, and a theme-aware tint
(ink / no tint in light, Open Color green in dark). Further scroll MAY fan
eight Open Color tinted docks around that mark, then assemble a vertical
stack with copy on the right and a CTA to `/components/dock`.

#### Scenario: first paint is a single dock

- **GIVEN** `/` at scroll 0
- **WHEN** the home section is inspected
- **THEN** `#home-oola` is present and the fan/stack is not the first-paint
  layout

### Requirement: vd3-150-changelog

The changelog `@vanduo-oss/vd3` column SHALL add a `v1.5.0` card marked
Latest. The previous `v1.4.0` card MUST drop Latest.

#### Scenario: 1.5.0 is latest

- **GIVEN** `/changelog`
- **WHEN** the vd3 column is rendered
- **THEN** a v1.5.0 card is present and carries the Latest badge
