# Docs: adopt the vd3 1.7.0 Oola chrome APIs

## Why

The site had been running local forks of three things vd3 1.7.0 now ships:
dock tooltips with a show delay, the primary-only swatches fan, and accent
dock tinting. Publishing an API the site does not consume means shipping it
undogfooded — and the forks had already drifted from the package (the fan
tokenizes its geometry and honours `prefers-reduced-motion`; the local copy
did neither).

## What Changes

- Retire `src/composables/useDocsDockTooltips.ts` for
  `useTooltips(root, { showDelay: DOCS_DOCK_TOOLTIP_DELAY_MS })`.
- Retire the `:style="dockAccentStyle"` inline override on the site dock and
  the home story dock for `:tint` + `tint-mode="accent"`, and drop
  `dockAccentStyle` / `docsDockAccentCss` from `useDocsColorScheme`.
- Collapse `src/overlays/VdThemeCustomizer.vue` from a 308-line fork to a
  wrapper over the package `variant="swatches"` fan, running **controlled**
  so the docs theme store stays the authority on primary.
- Delete the three now-dead `docs.css` blocks (dock tooltip chrome, the dock
  background override, the fan) — roughly 250 lines the package now owns.
- Document the new APIs on `/components/dock`, `/components/theme-customizer`,
  and `/components/tooltip`, and add three change-items to the v1.7.0
  changelog card.

## Capabilities

### Modified Capabilities

- `docs-content`: dock / customizer / tooltip pages, changelog card, and the
  site chrome that consumes the package APIs
- `docs-build`: search keywords for the new props

## Semver

Docs-site content only. No site version bump — the site changelog tracks
package releases, and this change tracks vd3 1.7.0.

## Non-goals

- Adding package API. The fan labels black "Black" (the `PRIMARY_COLORS`
  name) where the retired fork branded it "Ink"; a `swatchLabels` prop is out
  of scope for this change.
- Removing the `.vd-tooltip:not(.is-visible)` hidden-measurement workaround in
  `docs.css`. It predates the package port and is not addressed by it.
