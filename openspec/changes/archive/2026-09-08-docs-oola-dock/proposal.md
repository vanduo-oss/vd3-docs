# Docs: Oola Dock (`VdDock`)

## Why

vd3 1.5.0 adds `VdDock`. The docs site has no dock page, and the home page
has no story for the morphing glass pill.

## What Changes

- Live `/components/dock` page dogfooding `VdDock` / `VdDockItem` /
  `useDockOrientation`, with a page-local live customizer (colors, dock
  radius, glass, brand/item icons, placement, orientation) and an in-page
  full-screen playground. Default brand is the ū
  mark on the left; prose documents swapping it.
- Home `#home-oola` above `#home-seemore`: scroll story (single horizontal
  dock → Open Color 8 fan around ū → vertical folded stack + copy).
- Changelog card for `@vanduo-oss/vd3` 1.5.0.
- Site version `1.4.0`. Depend on published `@vanduo-oss/vd3` `^1.5.0`
  (lockfile refresh after npm publish; Safe-Chain / age-gate exclude for
  `@vanduo-oss/*`).

## Capabilities

### Modified Capabilities

- `docs-content`: dock page, home oola section, changelog card
- `docs-build`: nav/router/keywords/ROUTES for `/components/dock`

## Semver

Docs-site content plus a minor site version bump to `1.4.0`. Package
changelog tracks vd3 1.5.0 only.

## Non-goals

- Publishing vd3. Sibling `link:../vd3` is not used once 1.5.0 is on npm.
- A package-level `VdDockCustomizer` or fan/stack SFC.
- Writing `useThemePreference()` / `<html data-*>` from the dock playground.
- Migrating oolasite.
