## ADDED Requirements

### Requirement: docs shell navbar always-on frost

The docs site shell navbar (`.vd-navbar.vd-navbar-glass`) MUST use always-on
frost tokens stronger than stock vd3 defaults and slightly more transparent
than Spindrift Chess (`0.88`): `--vd-glass-bg-opacity` of `0.78`, blur of
`32px` at rest and `40px` when `.vd-navbar-scrolled`, with backdrop-filter
active even when not scrolled.

#### Scenario: navbar is frosted before scroll

- **GIVEN** the docs shell navbar with `vd-navbar-glass`
- **WHEN** the page is at scroll top (not scrolled)
- **THEN** the navbar still shows a frosted background and backdrop blur
  (not fully transparent)

### Requirement: docs chrome uses Phosphor Bold icons

Docs shell chrome (navbar, sidebar section icons, search/theme triggers) MUST
use Phosphor Bold (`ph-bold`) for icon glyphs. The Icons documentation weight
demo MAY continue to show regular / fill / light / thin / duotone variants.
vd3-emitted theme-switcher icons inside navbar actions MUST be remapped to
Phosphor Bold.

#### Scenario: navbar search icon is Bold

- **GIVEN** the docs shell navbar
- **WHEN** the global search trigger is inspected
- **THEN** its icon uses the `ph-bold` weight class

### Requirement: changelog documents vd3 1.2.3

The vd3 column of `/changelog` MUST lead with a `v1.2.3` release card marked
`Latest` that documents optional `storagePrefix` / `setStoragePrefix` /
`getStoragePrefix`, with default `vanduo-*` keys preserved for back-compat.
The previous `v1.2.2` card MUST NOT carry the `Latest` badge.

#### Scenario: Latest badge sits on 1.2.3

- **GIVEN** the `/changelog` page after this change
- **WHEN** the vd3 column headers are read
- **THEN** `v1.2.3` has the `Latest` badge and `v1.2.2` does not
