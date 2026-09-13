# Docs: per-scheme primary persistence

## Why

First-visit docs primaries are both `blue`, and a single `vanduo-primary-color`
follows the user across theme flips. Light looks best in Ink; dark looks best
in blue. Picking a hue in one scheme should not overwrite the other.

## What Changes

**Pages / Routes:**
- **Modified:** `components/ThemeSwitcher.vue` (bootstrap snippet).
- No routes added or removed.

**Details:**
- First-visit defaults: light `black`, dark `blue` (`DOCS_DEFAULT_PRIMARY_*`
  and `themeDefaults.PRIMARY_LIGHT` / `PRIMARY_DARK`).
- Persist separate `vanduo-primary-color-light` and
  `vanduo-primary-color-dark`. A user change updates only the current scheme.
- Theme flips and reloads restore that scheme's stored primary (or its
  first-visit default).
- Legacy single `vanduo-primary-color`: explicit hues stay on the
  current/last scheme; leftover shared `blue` remaps like a first visit.
- FrameworkIntegration snippets still show `PRIMARY_DARK: "blue"`.

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `docs-build`: bootstrap `themeDefaults` primary is `black` / `blue`.
- `docs-content`: first-visit and persistence are per scheme; ThemeSwitcher
  snippet matches the real bootstrap.

## Non-goals

- No `@vanduo-oss/vd3` or `@vanduo-oss/vd3-cbun` version bumps.
- No docs-site changelog entries.
- No changes to neutral / radius / font / palette locks.
- No CBUN 1.4.2 dogfood work.
