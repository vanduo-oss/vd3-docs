# Dogfood published vd3-charts 1.1.0 and vd3-flowchart 1.2.0

## Why

`@vanduo-oss/vd3-charts@1.1.0` and `@vanduo-oss/vd3-flowchart@1.2.0` are
published. The docs still import those widgets from
`@vanduo-oss/vd3-cbun/{charts,flowchart}`. New consumers should copy the
dedicated packages these docs now dogfood.

## What Changes

**Pages / Routes:**
- **Modified:** `/changelog`, `/docs-landing`, `/canvas/charts`,
  `/canvas/flowchart`, `/cbun`, `/components/table`, `/`, `/about`, and the
  ecosystem, installation, lazy-loading, production, getting-started, and
  architecture guides.
- No routes or nav hierarchy added or removed.

**Details:**
- Pin exact registry `@vanduo-oss/vd3-charts@1.1.0` and
  `@vanduo-oss/vd3-flowchart@1.2.0`; keep `@vanduo-oss/vd3-cbun@1.4.2` for
  code-editor, draw, hex-grid, and music-player.
- Live imports and CSS for charts/flowchart come from the dedicated packages.
- Changelog adds Latest cards for charts 1.1.0 and flowchart 1.2.0; historical
  cbun cards stay as published.

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `docs-build`: published kit pins include charts 1.1.0 and flowchart 1.2.0;
  canvas pages import those widgets from the standalone packages.
- `docs-content`: displayed install/import strings and changelog/ecosystem copy
  name the dedicated packages; old-line `@vanduo-oss/charts` /
  `@vanduo-oss/flowchart` remain forbidden.
- `repo-scaffold`: README dogfood list includes the standalone widgets.

## Non-goals

- No npm publish or deployment from this repository (`private: true`).
- No docs package version bump.
- No vd3-cbun source changes and no draw / hex-grid / code-editor /
  music-player import retarget.
- No push to remote.
