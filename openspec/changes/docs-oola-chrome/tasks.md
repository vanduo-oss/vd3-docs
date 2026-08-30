# Docs Oola Chrome — Tasks

- [x] 1. Author this change (proposal / design / tasks / spec deltas); run
      `openspec validate docs-oola-chrome --strict`.
- [x] 2. Add `VdSiteDock` and wire it in `App.vue`; remove site navbar + footer.
- [x] 3. Retire navbar chrome offsets; dock-edge safe padding; re-anchor
      theme customizer panel; update `Dock.vue` navOffset measurement.
- [x] 4. Limit docs primaries to `DOCK_TINTS`; coerce legacy; sync dark dock
      tint to primary via `useDocsColorScheme` + theme store.
- [x] 5. Move About / GitHub / NPM / License onto `docs-landing.vue`.
- [x] 6. Unit tests: `site-dock`, `useDocsColorScheme`, `useTheme`,
      `docs-landing`; e2e `site-dock` smoke; a11y smoke still green.
- [x] 7. `pnpm typecheck`, lint, stylelint, format:check, test in `vd3-docs`.
