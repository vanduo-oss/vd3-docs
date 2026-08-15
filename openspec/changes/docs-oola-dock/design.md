# Docs Oola Dock — design

The `/components/dock` customizer is page-local refs bound to a contained
`VdDock`. It MUST NOT call `useThemePreference` setters. Radius uses the
dock-own scale (0.5 … 2 + pill), never `theme.setRadius()`.

ū is a docs-local SVG in `#brand` (left axis) on both the dock page and the
home story. The package does not ship that mark.

Home `#home-oola` is sticky scrollytelling. Scroll 0 / SSR / Playwright is
phase 1 (single horizontal dock) so the home baseline stays deterministic.
Reduced motion and narrow viewports skip the fan.

API tables are transcribed from `VdDock.vue` / `VdDockItem.vue`. Invented
props are forbidden.

Demos use `position="contained"` inside a framed stage so nothing overlays
the docs navbar.
