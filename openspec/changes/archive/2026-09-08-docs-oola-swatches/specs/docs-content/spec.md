# docs-content

## ADDED Requirements

### Requirement: site-chrome-consumes-package-apis

The site chrome SHALL consume the vd3 1.7.0 APIs rather than local forks.
`VdSiteDock` MUST wire tooltips with the package `useTooltips` and a
`showDelay`, and MUST tint through `:tint` + `tint-mode="accent"` rather than
an inline `--vd-dock-tint` style. `src/overlays/VdThemeCustomizer.vue` MUST be
a wrapper over the package `variant="swatches"` fan. No local reimplementation
of dock tooltips, the swatches fan, or accent tinting may remain in
`src/composables/`, `src/overlays/`, or `src/styles/docs.css`.

#### Scenario: no forked chrome remains

- **GIVEN** the docs source tree
- **WHEN** it is searched for the retired forks
- **THEN** `useDocsDockTooltips.ts` is absent, `dockAccentStyle` is absent, and
  `docs.css` declares no `.tc-fan-*` or `.vd-tooltip-dock` rules

### Requirement: customizer-runs-controlled

The docs swatches fan SHALL run in controlled mode: `primary` bound to the
docs theme store and `update:primary` routed back to `theme.setPrimary`, so
every hue — including a hover preview — passes the store's
`coerceDocsPrimary()` clamp instead of writing `useThemePreference()`.

#### Scenario: a disallowed hue cannot reach the document

- **GIVEN** the site swatches fan
- **WHEN** a hue outside Ink plus the eight dock tints is applied
- **THEN** the store clamps it and `<html data-primary>` never carries it

### Requirement: vd3-170-api-documentation

`/components/dock` SHALL document `tintMode` in its API table and demonstrate
surface against accent. `/components/theme-customizer` SHALL document
`variant`, `swatches`, `direction`, `preview`, and `primary` as props, plus
`update:primary` as an emit, and SHALL show a live swatches fan and a
controlled-mode snippet. `/components/tooltip` SHALL document `showDelay`,
`data-tooltip-delay`, the `MutationObserver` rescan, `.vd-tooltip-dock`, and
the `--vd-tooltip-dock-*` custom properties.

#### Scenario: props tables match the package source

- **GIVEN** the three component pages
- **WHEN** their API tables are compared to `VdDock.vue`,
  `VdThemeCustomizer.vue`, and `useTooltips.ts`
- **THEN** every 1.7.0 prop, emit, and data attribute is present and no
  invented field appears

### Requirement: vd3-170-changelog-completeness

The v1.7.0 changelog card SHALL list the dock accent tint, the customizer
swatches variant with controlled primary, and the tooltip delay plus dock
variant, alongside the existing global-search item.

#### Scenario: all four feature groups are listed

- **GIVEN** `/changelog`
- **WHEN** the v1.7.0 card is rendered
- **THEN** it carries four change-items, each linking to its component page
