# Dogfood published vd3-cbun 1.4.1

## Why

`@vanduo-oss/vd3-cbun@1.4.1` is published. The docs site already pinned that
version in `package.json`, but the committed lockfile still overrode it to
`link:../vd3-cbun`. That is local sibling development, not published dogfood.
The 1.4.1 changelog card was also incomplete, and the hex demos patched
private `_getThemeColors` / `_render` instead of the public surface.

## What Changes

- Resolve `@vanduo-oss/vd3-cbun@1.4.1` from the npm registry. Remove the
  workspace/lockfile `link:` override. Keep Vite's optional-link support.
- Rewrite the `/changelog` 1.4.1 card to match the published package notes
  (hex, draw, charts, code-editor).
- Hex demos use only public APIs and remount on theme/primary so the
  constructor re-reads `--vd-*` tokens.
- Draw page types against published `VdDrawExposed` / event types and
  documents the 1.4.1 expose methods.
- Stale copy: docs-landing pins, flowchart unit-test describe, code-editor
  wrap-mode caret note.

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `docs-build`: committed lockfile / workspace must not override
  `@vanduo-oss/vd3-cbun` with `link:`; pin stays exact published `1.4.1`.
- `docs-content`: complete 1.4.1 changelog card; hex pages public-API only;
  Draw API table includes surgical setters / CRUD / `fitView`.

## Non-goals

- No cbun source changes (the package is already published).
- No new routes or nav hierarchy.
- No docs-site entries in package changelogs.
- No rewrite of flowchart / music-player demos (no 1.4.1 consumer API change).
