## 1. Site version and first-visit primary

- [x] 1.1 Bump `@vanduo-oss/vd3-docs` to `1.7.4`; keep vd3 `1.7.2` / cbun `1.4.1`
- [x] 1.2 Set `themeDefaults` + `docsPrimary` first-visit primary to `blue` / `blue`
- [x] 1.3 Update ThemeSwitcher / FrameworkIntegration bootstrap snippets
- [x] 1.4 Keep persisted primaries; do not migrate stored `blue`

## 2. Catalog copy

- [x] 2.1 Align landing / home / about component and composable counts with the vd3 barrel
- [x] 2.2 Label landing page-count meta from `nav.ts` (not as “components”)

## 3. Gates

- [x] 3.1 Update unit tests for theme defaults and catalog copy
- [x] 3.2 `pnpm typecheck` and `pnpm test`
- [x] 3.3 Browser-verify landing version/badge, home teaser, first-visit vs persisted primary
