## ADDED Requirements

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

### Requirement: an accessibility smoke suite gates representative routes

The site SHALL include a `@axe-core/playwright` accessibility smoke,
`tests/e2e/a11y-smoke.spec.ts`, that runs `AxeBuilder` over roughly ten
representative routes spanning every page archetype — at minimum the home page, a
component page, a form-heavy component page, a guide, a canvas/ecosystem page, a
media page, the changelog, the two theme/customizer pages, and a foundations
page. For each route the suite SHALL assert **zero** axe violations of `impact`
`serious` or `critical` (`minor`/`moderate` MAY be reported but MUST NOT fail the
test). `@axe-core/playwright` SHALL be declared as a devDependency and a
`test:a11y` npm script SHALL run the smoke in isolation.

#### Scenario: the a11y smoke exists and covers the archetypes

- **GIVEN** the repository after this change
- **WHEN** `tests/e2e/a11y-smoke.spec.ts`, `package.json`, and the spec's route
  list are read
- **THEN** the spec imports `AxeBuilder` from `@axe-core/playwright`,
  `@axe-core/playwright` is in `devDependencies`, `package.json` has a `test:a11y`
  script, and the covered routes include the home page, a `/components/*` page, a
  form-heavy page, a `/guides/*` page, a `/canvas/*` page, a `/media/*` page,
  `/changelog`, `/components/theme-customizer`, `/components/theme-switcher`, and
  a `/core/*` page

#### Scenario: no serious or critical violation passes the gate

- **GIVEN** any route the smoke covers
- **WHEN** `AxeBuilder({ page }).analyze()` runs and its violations are filtered
  to `impact` in {`serious`, `critical`}
- **THEN** the test asserts that filtered list is empty, so a serious/critical
  regression fails `test:a11y`, while `minor`/`moderate` findings do not

### Requirement: the gzip size budget tracks the current dist

`tests/scripts/size.mjs` SHALL be an **asserting** gzip budget, not a bare
printout. It SHALL keep reporting each `app-*` asset's raw and gzip size, sum the
gzipped `app-*` bytes, compare the total against a committed `MAX_GZIP_KB`
budget, and exit non-zero (with a message naming the total and the budget) when
the total exceeds it. `MAX_GZIP_KB` SHALL be baselined to the **current** dist —
the measured gzipped `app-*` total (≈ 446 KB gz at authoring) plus modest
headroom (~10–15%) — so the present build passes and a real bundle regression
fails. `test:size` SHALL remain the entry point.

#### Scenario: the current build passes the budget

- **GIVEN** a completed `pnpm build` producing `dist/assets/app-*`
- **WHEN** `pnpm test:size` runs
- **THEN** it prints each asset's raw/gz size and the summed gzip total, the
  total is at or below `MAX_GZIP_KB`, and the script exits `0`

#### Scenario: a bundle regression fails the gate

- **GIVEN** a hypothetical build whose summed `app-*` gzip size exceeds
  `MAX_GZIP_KB`
- **WHEN** `pnpm test:size` runs
- **THEN** the script writes a message naming the total and the budget and exits
  non-zero, so the regression can fail CI (rather than the pre-change behavior of
  always exiting `0`)
