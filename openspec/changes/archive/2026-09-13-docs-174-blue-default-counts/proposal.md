# Docs 1.7.4: blue first-visit primary and catalog counts

## Why

The docs site version should track `@vanduo-oss/vd3-docs` **1.7.4**. First-time
visitors still get the old Ink/green split. Marketing copy disagrees with
itself: landing says “47+ components” while home says “63 components, 39
composables.”

## What Changes

**Pages / Routes:**
- **Modified:** `src/pages/docs-landing.vue`, `src/pages/home.vue`,
  `src/pages/about.vue`, `src/pages/guides/FrameworkIntegration.vue`,
  `src/pages/guides/ProductionBestPractices.vue`,
  `src/pages/components/ThemeSwitcher.vue`.
- No routes added or removed.

**Details:**
- Bump `package.json` to `1.7.4`. Landing `Documentation v{{ docsVersion }}`
  already reads `__APP_VERSION__` from that field. Keep vd3 `1.7.2` / cbun
  `1.4.1` pins and the changelog card’s “Latest: vd3 1.7.2 · cbun 1.4.1”.
- First-visit / unset primary is the published `blue` token in both schemes
  (`themeDefaults.PRIMARY_LIGHT` / `PRIMARY_DARK`, `docsPrimary` defaults).
  Persisted `vanduo-primary-color` is kept; stored `blue` is not migrated.
- Marketing “components” / “composables” use the published vd3 barrel counts
  (63 `Vd*` exports, 39 composable modules). Landing page-count meta is
  labeled as pages/walkthroughs and derived from `src/nav.ts`.

## Non-goals

- No `@vanduo-oss/vd3` or `@vanduo-oss/vd3-cbun` version bumps.
- No docs-site entries in package changelogs.
- No force-reset of existing localStorage primaries.
- No new routes or nav hierarchy.

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `docs-build`: bootstrap `themeDefaults` primary is `blue` / `blue`.
- `docs-content`: first-visit primary is `blue`; marketing counts match the
  published barrel; integration snippets show the real bootstrap primary.
