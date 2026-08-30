# Docs Oola Swatches — Tasks

- [x] 1. Replace `useDocsDockTooltips` with
      `useTooltips(root, { showDelay: DOCS_DOCK_TOOLTIP_DELAY_MS })` in
      `VdSiteDock.vue`; delete the composable and the `docs.css` dock-tooltip
      block.
- [x] 2. Swap `:style="dockAccentStyle"` for `:tint` + `tint-mode="accent"` in
      `VdSiteDock.vue` and `HomeOolaSection.vue`; drop `dockAccentStyle` and
      `docsDockAccentCss` from `useDocsColorScheme.ts`; delete the `docs.css`
      dock background override.
- [x] 3. Collapse `overlays/VdThemeCustomizer.vue` to a controlled wrapper over
      the package `variant="swatches"` fan; add `DOCS_PRIMARY_SWATCH_KEYS`;
      delete the `docs.css` fan block.
- [x] 4. Changelog: three change-items on the v1.7.0 card (dock accent tint,
      customizer swatches + controlled primary, tooltip delay / dock variant).
- [x] 5. Document the new APIs on `/components/dock` (`tintMode` row, tint-mode
      playground control, surface-vs-accent demo),
      `/components/theme-customizer` (`variant` / `swatches` / `direction` /
      `preview` / `primary`, an emits table, fan CSS API, live swatches demo,
      controlled-mode snippet), and `/components/tooltip` (`showDelay`,
      `data-tooltip-delay`, MutationObserver, `.vd-tooltip-dock`,
      `--vd-tooltip-dock-*`, live delay demo).
- [x] 6. Search keywords in `nav.ts` for dock tint mode, customizer swatches,
      and tooltip delay.
- [x] 7. Update the unit and e2e specs the migration moves
      (`--fan-z` instead of inline `z-index`; `Black` instead of `Ink`).
- [x] 8. `pnpm typecheck`, format, lint, stylelint, test, build.
- [x] 9. Playwright visual baselines (`--update-snapshots`), then regenerate the
      search index against a local preview and run `index:eval`.
- [ ] 10. Pin `@vanduo-oss/vd3` to the published `1.7.0` and re-verify.
