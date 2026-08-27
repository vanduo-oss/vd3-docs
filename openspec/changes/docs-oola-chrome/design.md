# Docs Oola Chrome — design

## Site dock vs demos

`VdSiteDock` is the only fixed shell dock (`position="fixed"`, persist with a
docs-owned storage key). Home `#home-oola` and `/components/dock` keep using
contained / story-local docks and MUST NOT share that storage key.

Brand on the site dock is `Vd3BrandMark` (vd3 icon). Demo pages may keep ū.

## Placement cycle

`cycle="edges"` walks bottom → left → top → right → bottom on brand click.
Default placement is bottom. Narrow lock behavior stays package-owned.

## Colors

Docs customizer primary swatches are `PRIMARY_COLORS` filtered to
`DOCK_TINTS` (red, orange, yellow, green, teal, blue, violet, pink). Theme
store coerces any other stored primary (including package light default
`black`) to the docs default `green` on init / setPrimary / reset.

`useDocsColorScheme` / `docsDockTint`: light → `""`; dark → selected
`data-primary` when it is a dock tint, else `"green"`. Observe both
`data-theme` and `data-primary`.

## Customizer panel

The docs `VdThemeCustomizer` overlay previously positioned under a top
navbar trigger. It MUST anchor to the dock action trigger and stay in
viewport for all four dock edges.

## Content offsets

`--docs-main-offset` / sticky offsets MUST stop assuming `--vd-navbar-*`.
Shell padding tracks dock placement (data attribute or equivalent) so the
fixed dock never covers main content or the docs sidebar sticky header.

## Footer retirement

Site footer is removed. About / GitHub / NPM / License live on
`/docs-landing` (externals with `rel=noopener`). Changelog remains a
landing card.
