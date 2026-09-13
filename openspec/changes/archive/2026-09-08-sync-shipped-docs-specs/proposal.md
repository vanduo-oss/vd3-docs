# Sync shipped docs specs

## Why

Canonical OpenSpec capabilities still describe an older ship state (`^1.2.3` /
`^1.3.1` ranges, navbar-era chrome gaps, missing search/indexer/Seemore/auth
deltas, TBD Purposes). Several completed product changes landed on the site
without being archived into `openspec/specs/`. This change reconciles the
canonical specs to current shipped truth so future work diffs against reality.

## What Changes

Spec deltas only (product tree already shipped):

- **docs-build**: pin `@vanduo-oss/vd3` `1.7.2` and `@vanduo-oss/vd3-cbun`
  `1.4.0` exact (`.npmrc` `save-exact`); require hybrid-search indexer /
  eval scripts; committed visual baselines are Chromium Desktop darwin only.
- **docs-content**: record shipped shell and pages — `VdSiteDock` (no site
  navbar/footer), docs-landing resource strip, global-search + hybrid-search
  guide, Oola swatches/tint/tooltip-delay dogfood, Seemore glass + surfaces,
  login/table auth demos, button ring, ecosystem retirement **without**
  `/guides/migration`.
- **repo-scaffold**: `.gitignore` ignores `*-Chromium-Mobile-darwin.png` under
  visual-parity snapshots. Feature-branch PR-to-main already exists — do not
  re-add.

### Routes / pages

- Spec coverage for already-shipped:
  `/docs-landing`, `/components/global-search`, `/guides/hybrid-search`,
  `/effects/glass`, `/effects/surfaces`, `/components/login`,
  `/components/dock` (shell), `/components/button` ring, `/components/table`,
  `/guides/vd3-ecosystem` retirement.
- Do **not** re-introduce navbar frost or a `/guides/migration` page.

## Capabilities

### New Capabilities

- _None._

### Modified Capabilities

- `docs-build`
- `docs-content`
- `repo-scaffold`

## Non-goals

- No navbar frost requirement.
- No `/guides/migration` page or link.
- No changelog cards for docs-site hygiene (changelog tracks packages only).
- Blind `openspec archive` of the ten stale active folders (folder-move after
  this sync instead).
