# Design: published cbun 1.4.1 dogfood

## Dependency resolution

`package.json` already declared `"@vanduo-oss/vd3-cbun": "1.4.1"`. The
committed `pnpm-workspace.yaml` override `link:../vd3-cbun` forced the
sibling tree into the lockfile. Removing that override and reinstalling
makes the importer `specifier: 1.4.1` / registry `1.4.1`. Vite
`optimizeDeps.exclude`, `resolve.dedupe`, and `server.fs.allow` stay so a
contributor can still `pnpm link` unreleased work locally without committing
it.

## Hex theming without private APIs

The published hex-grid core reads `--vd-*` in the constructor and observes
`data-theme` / `prefers-color-scheme`. It does not observe CSS-variable
mutations from the theme customizer. Docs previously patched
`_getThemeColors` and called `_render`.

The consumer-legal replacement is remounting `<VdHexGrid>` with a `:key`
derived from the theme store (`theme`, `primary`, `ready`) so the
constructor re-reads tokens. Demo fills, terrain, and overlays go through
`fillRandom`, `setHexFill`, `generateRandomTerrain`, and `setCustomRender`.
`setCustomRender` is also the public way to request a redraw (it re-renders).

Empty hexes now use the package's `--vd-bg-secondary` / `--vd-border-color`
mapping instead of the docs-only transparent + primary-outline hack.

## Draw types

`VdDrawExposed`, `VdDrawCore`, `DrawChangeEvent`, `DrawSelectEvent`, and
`DrawViewportEvent` are exported from `@vanduo-oss/vd3-cbun/draw`. The page
already bound `:readonly` / `:snap`; those props now update through the
1.4.1 surgical setters without remounting.
