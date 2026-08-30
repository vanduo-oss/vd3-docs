# Docs Oola Swatches — design

## Controlled, not uncontrolled

`stores/theme.ts` clamps primary through `coerceDocsPrimary()` and forces
palette / font / radius / neutral in `applyDocsLockedPrefs()`. An uncontrolled
`VdThemeCustomizer` writes `useThemePreference()` directly and would bypass
both. The wrapper therefore binds `:primary="theme.primary"` and routes
`@update:primary` to `theme.setPrimary`, so every hover preview and every
commit passes through the store's clamp.

## Explicit fan direction

The package `direction="auto"` aims the fan away from the nearest viewport
edge. That agrees with the dock only while the dock is pinned to that edge, so
the wrapper keeps the fork's `data-docs-dock` observer and maps the edge to a
direction (bottom→up, top→down, left→right, right→left). Behaviour is
unchanged from the fork; the geometry is now the package's.

## Accent tint replaces an inline style

The fork set `--vd-dock-tint` through `:style` and then forced the pill back
to ink with a `docs.css` override. `tint-mode="accent"` does both in the
package: `.vd-dock-tint-<hue>` publishes the variable and
`.vd-dock-tint-accent` restores the ink background with one extra class of
specificity. `DOCK_ACCENT_VARS` in the fork mapped each hue to
`var(--vd-oc-<hue>-6)`, which is exactly what the package's tint classes set,
so the rendered color is identical.

The accent class only applies when `:tint` resolves to a real `DOCK_TINTS`
key. With primary `black`, `docsDockAccent()` returns `""` and no tint class
is emitted — the plain `.vd-dock-dark.vd-glass*` rule already paints the same
`color-mix(in srgb, #0a0a0a 90%, transparent)`, so the ink dock survives the
override deletion.

## CSS deletions are safe because the package is a superset

Each deleted `docs.css` block was diffed against its package counterpart
before removal. The package versions tokenize the hard-coded values (with
matching defaults) and add a `prefers-reduced-motion` branch the fork lacked.

## Known cosmetic change

The fan labels the black hue "Black" — the `PRIMARY_COLORS` name — where the
fork branded it "Ink". The e2e assertion moves with it. Restoring "Ink" would
need a per-key label prop on the package component; that is a separate change.
