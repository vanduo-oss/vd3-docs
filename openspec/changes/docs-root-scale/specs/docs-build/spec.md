## MODIFIED Requirements

### Requirement: the visual-parity suite baselines the vd3 site

`tests/e2e/visual-parity.spec.ts` and its committed baselines SHALL screenshot
every route in the spec's route list at 1440×900. The spec MUST NOT contain
any `vd2` token: the route field SHALL be `path` (not `vd2Path`), each snapshot
name SHALL follow `vd3-${route.label}.png`, and each test title
SHALL read `vd3 <path> baseline` (not `vd2 … baseline regression`). The
committed snapshot PNGs SHALL reflect the docs site's rem-root scale
(`html { font-size: 90% }`) so CI compares against the production density, not
the pre-scale 16px-default appearance.

#### Scenario: spec tokens are vd3-only

- **GIVEN** `tests/e2e/visual-parity.spec.ts` after this change
- **WHEN** the file is grepped for `vd2`
- **THEN** there are zero matches — the route field is `path`, the snapshot name
  template is `vd3-${…}.png`, and the test title is `vd3 <path> baseline`

#### Scenario: baselines match the scaled docs site

- **GIVEN** the docs site built with `html { font-size: 90% }`
- **WHEN** visual-parity snapshots are captured with `--update-snapshots`
- **THEN** every committed `vd3-*.png` baseline reflects the denser rem-root
  appearance at 100% browser zoom
