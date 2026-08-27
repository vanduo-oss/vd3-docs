# docs-content

## ADDED Requirements

### Requirement: site shell uses Oola dock chrome

The docs site shell SHALL render a fixed `VdDock` via `VdSiteDock` on every
route instead of a top `VdNavbar` or site `VdFooter`. The dock MUST use
`cycle="edges"` (bottom → left → top → right → bottom), default placement
`bottom`, and a docs-owned persist storage key. The `#brand` slot SHALL show
`Vd3BrandMark`. Nav items SHALL be Home (`/`), Docs (`/docs-landing`), CBUN
(`/cbun`), and Showcase (`/showcase`). The `#actions` slot SHALL host Search
(opens global search), ThemeSwitcher, then ThemeCustomizer in that order.

#### Scenario: site dock replaces navbar and footer

- **GIVEN** any docs route after this change
- **WHEN** the shell is inspected
- **THEN** a fixed site `VdDock` is present, and neither the former site
  navbar nor site footer chrome is mounted

#### Scenario: brand click cycles four edges

- **GIVEN** the site dock at default bottom placement
- **WHEN** the brand is activated three more times
- **THEN** placement walks left → top → right (then bottom again)

### Requirement: docs landing hosts former footer links

`/docs-landing` SHALL expose About (`/about`), GitHub, NPM, and License
links. External resource links MUST use `target="_blank"` and `rel="noopener"`.

#### Scenario: resource strip is present

- **GIVEN** `/docs-landing`
- **WHEN** the page is rendered
- **THEN** About, GitHub, NPM, and License are reachable and externals carry
  `rel=noopener`

### Requirement: docs primary swatches match dock tints

The docs theme customizer overlay SHALL offer only primary hues that exist in
both `PRIMARY_COLORS` and `DOCK_TINTS` (eight Open Color hues). The theme store
MUST coerce any stored primary outside that set to the docs default `green`
on init, `setPrimary`, and reset. Light-mode package default `black` MUST be
coerced into the allowed set.

#### Scenario: customizer shows eight dock-aligned primaries

- **GIVEN** the docs theme customizer panel is open
- **WHEN** primary swatches are counted
- **THEN** there are exactly eight swatches and each key is in `DOCK_TINTS`

#### Scenario: out-of-set primary is coerced

- **GIVEN** `localStorage` holds `vanduo-primary-color` = `black` or `amber`
- **WHEN** the theme store initializes
- **THEN** primary becomes `green` and `data-primary` is `green`

### Requirement: dark dock tint follows selected primary

Docs dock tint helpers SHALL return no tint (`""`) in light scheme. In dark
scheme they SHALL return the active `data-primary` when it is a `DockTint`,
otherwise `"green"`. Helpers MUST react to `data-theme` and `data-primary`
changes.

#### Scenario: dark tint tracks primary

- **GIVEN** dark theme and `data-primary="violet"`
- **WHEN** `docsDockTint` / site dock tint is read
- **THEN** the tint is `violet`

#### Scenario: light stays untinted

- **GIVEN** light theme and any allowed primary
- **WHEN** dock tint is read
- **THEN** the tint is empty (untinted ink frost)

## MODIFIED Requirements

### Requirement: upright mark on hero and chrome

The vd3 mark on home (static frames), the site dock brand, and favicon SHALL
show two small circles above and one small circle below (upright pose). Group
rotations SHALL use the inner (big) circle center as the axis.

#### Scenario: navbar shows upright static mark

- **GIVEN** any page after this change
- **WHEN** the site dock brand logo is viewed (site chrome brand; former navbar)
- **THEN** it shows the upright two-up / one-down pose with no animation

### Requirement: lighter mark fills for dark UI

Outer and inner fills SHALL be lightened versus the prior near-black palette so
the mark remains visible on dark theme backgrounds.

#### Scenario: mark visible on dark theme

- **GIVEN** dark theme active
- **WHEN** the user views the site dock brand or home hero mark
- **THEN** the green fills are clearly visible (not near-black)

### Requirement: dark-mode default primary matches logo green

The docs site SHALL default dark-mode primary to the green hue
(`data-primary="green"`) via `themeDefaults.PRIMARY_DARK` at bootstrap. When dark
mode is active and primary is green, the docs shell CSS SHALL pin semantic primary
tokens to the logo stop (`--vd-green-8` = `#2f9e44`) and its ramp companions.
Light-mode primary MUST also land in the eight `DOCK_TINTS` set (coerce package
`PRIMARY_LIGHT` `black` to docs default `green`). The theme store SHALL treat
legacy stored `"blue"` and any other non-`DOCK_TINTS` primary as a docs
auto-primary and migrate it to the current default primary on init, theme
change, and OS scheme flip (same pattern as docs neutral auto-defaults).

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

- **GIVEN** the user picks violet (or any non-auto primary in `DOCK_TINTS`) in
  the customizer
- **WHEN** they switch between light and dark
- **THEN** the chosen primary hue persists

## REMOVED Requirements

### Requirement: docs shell navbar scroll-activated frost

The docs site shell no longer mounts a top `.vd-navbar.vd-navbar-glass`;
scroll-activated navbar frost requirements are retired for site chrome.
Library demo pages for `VdNavbar` remain unchanged.
