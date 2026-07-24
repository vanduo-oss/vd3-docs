## MODIFIED Requirements

### Requirement: the visual-parity suite baselines the vd3 site

`tests/e2e/visual-parity.spec.ts` and its committed baselines SHALL screenshot
the shipped **vd3** site, not the pre-strip vd2 clone. The spec MUST NOT contain
any `vd2` token: the route field SHALL be `path` (not `vd2Path`), each snapshot
name SHALL be `vd3-<label>.png` (not `vd2-<label>.png`), and each test title
SHALL read `vd3 <path> baseline` (not `vd2 … baseline regression`). The
enumerated `ROUTES` list SHALL be reconciled against `src/nav.ts` (the route
SSOT): no listed `path` resolves to the 404 page, `/components/doc-search` (added
since the clone) SHALL be present, and the two dropped guides
(`/guides/esm-vs-iife`, `/guides/lifecycle-manager`) SHALL NOT appear. The list
MAY remain a curated representative subset rather than every route. All committed
snapshots SHALL be freshly captured from the built vd3 site: the stale `vd2-*`
PNGs SHALL be deleted and replaced with `vd3-*` PNGs, one per enumerated route.
The committed snapshot PNGs SHALL additionally reflect the docs site's rem-root
scale (`html { font-size: 90% }`) so CI compares against the production density,
not the pre-scale 16px-default appearance.

#### Scenario: the spec carries no vd2 branding

- **GIVEN** `tests/e2e/visual-parity.spec.ts` after this change
- **WHEN** it is grepped for `vd2`
- **THEN** there are zero matches — the route field is `path`, the snapshot name
  template is `vd3-${…}.png`, and the test title is `vd3 <path> baseline`

#### Scenario: the route list is reconciled with the current nav

- **GIVEN** the `ROUTES` array after this change and `src/nav.ts`
- **WHEN** each enumerated `path` is checked against the site's registered routes
- **THEN** every `path` resolves to a real page (none hits the 404 page),
  `/components/doc-search` is present, and neither `/guides/esm-vs-iife` nor
  `/guides/lifecycle-manager` is listed

#### Scenario: only fresh vd3 baselines are committed

- **GIVEN** `tests/e2e/visual-parity.spec.ts-snapshots/` after this change
- **WHEN** its PNG files are listed and the suite is re-run without
  `--update-snapshots` against the built vd3 site
- **THEN** every file is named `vd3-*-Chromium-Desktop-darwin.png`, there is one
  per enumerated route, no `vd2-*` file remains, and the run passes

#### Scenario: baselines match the scaled docs site

- **GIVEN** the docs site built with `html { font-size: 90% }`
- **WHEN** visual-parity snapshots are captured with `--update-snapshots`
- **THEN** every committed `vd3-*.png` baseline reflects the denser rem-root
  appearance at 100% browser zoom
