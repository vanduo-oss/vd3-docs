# Docs: Oola dock site chrome

## Why

The docs shell still uses a top navbar and footer. Oola Dock is the product
chrome for edge navigation; the docs site should dogfood it as the primary
shell, align the theme customizer primary set with dock tints, and relocate
footer-only links onto the docs landing page.

## What Changes

- Replace site `VdNavbar` + `VdFooter` with a fixed site-wide `VdDock`
  (`VdSiteDock`): nav items Home / Docs / CBUN / Showcase; `#actions` hosts
  Search → ThemeSwitcher → ThemeCustomizer; brand is `Vd3BrandMark`; brand
  click uses `cycle="edges"` (bottom → left → top → right → bottom).
- Limit docs theme customizer primary swatches to the eight `DOCK_TINTS`
  hues; coerce out-of-set stored primaries; sync dark-mode dock tint to the
  selected primary (light stays untinted).
- Drop the site footer; put About, GitHub, NPM, and License on `/docs-landing`.
- Retire navbar-based chrome offsets; pad content for dock edges; re-anchor
  the customizer panel to the dock trigger.
- Unit + e2e coverage for the new shell, colors, and landing links.

## Capabilities

### New Capabilities

- _None._

### Modified Capabilities

- `docs-content`: site dock chrome; primary/tint alignment; docs-landing
  resource links; mark-on-chrome scenarios; retire navbar frost shell rules
- `docs-build`: shell offset variables / wiring no longer assume a top navbar

## Non-goals

- Changing package `PRIMARY_COLORS` or the framework `VdThemeCustomizer` for
  all consumers.
- Removing `/components/navbar` or `/components/footer` API demo pages.
- Reworking the home `#home-oola` scrollytelling beyond shared tint helpers.
