# Sync shipped docs specs — Tasks

- [x] 1. Author this change (proposal / design / tasks / spec deltas).
- [x] 2. Apply `.gitignore` Mobile-darwin ignore + `openspec/config.yaml` pin
      `1.7.2` + site version `1.7.3` Unreleased metadata.
- [x] 3. `openspec validate sync-shipped-docs-specs --strict`.
- [x] 4. `openspec archive sync-shipped-docs-specs --yes`.
- [x] 5. Fill Purpose lines on all five canonical specs.
- [x] 6. Folder-move the ten stale active changes into
      `openspec/changes/archive/2026-09-08-*` without `openspec archive`.
