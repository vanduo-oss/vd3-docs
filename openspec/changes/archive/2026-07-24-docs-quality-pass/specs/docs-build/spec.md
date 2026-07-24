## MODIFIED Requirements

### Requirement: the visual-parity suite baselines the vd3 site

`tests/e2e/visual-parity.spec.ts` and its committed baselines SHALL screenshot
the shipped **vd3** site, not the pre-strip vd2 clone. The spec MUST NOT contain
any `vd2` token: the route field SHALL be `path` (not `vd2Path`), each snapshot
name SHALL be `vd3-<label>.png` (not `vd2-<label>.png`), and each test title
SHALL read `vd3 <path> baseline` (not `vd2 … baseline regression`). The
enumerated `ROUTES` list SHALL live in a **Playwright-free module**
(`tests/e2e/routes.ts`, importing no `@playwright/test`) so a Vitest unit test
can import it, and SHALL be reconciled against `src/nav.ts` (the route SSOT): no
listed `path` resolves to the 404 page, `/components/doc-search` (added since the
clone) SHALL be present, and the two dropped guides (`/guides/esm-vs-iife`,
`/guides/lifecycle-manager`) SHALL NOT appear. `ROUTES` SHALL be a
representative **superset** covering every content route `src/nav.ts` registers —
every top-level page, every component/foundation/guide/effect section, AND every
cbun-rendering canvas/media/editor route (`/canvas/{charts,flowchart,hex,draw}`,
`/editors/code-editor`, `/media/{music-player,image-box}`) — except routes named
in an explicit `VISUAL_PARITY_EXCLUSIONS` set. The cbun canvas/media pages are
safe to baseline because their only non-deterministic behavior (Hex's random
terrain fill, MusicPlayer's wall-clock event log) fires on user interaction, so
the initial page-load render the suite captures is stable. All committed
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

#### Scenario: ROUTES covers every cbun-rendering and first-party route

- **GIVEN** `tests/e2e/routes.ts` after this change and `src/nav.ts`
- **WHEN** the two route sets are compared
- **THEN** every cbun canvas/media/editor route and every first-party
  section/page that nav registers appears in `ROUTES`, except routes named in
  `VISUAL_PARITY_EXCLUSIONS`

#### Scenario: a nav route missing from ROUTES fails a unit test

- **GIVEN** the Vitest drift guard `tests/unit/visual-parity-routes.spec.ts`
  importing `ROUTES` and `src/nav.ts`
- **WHEN** a page is registered in `nav.ts` but not added to `ROUTES` (and not
  excluded)
- **THEN** the test fails, naming the uncovered route, so visual coverage cannot
  silently drift the way it had

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

### Requirement: an accessibility smoke suite gates representative routes

The site SHALL include a `@axe-core/playwright` accessibility smoke,
`tests/e2e/a11y-smoke.spec.ts`, that runs `AxeBuilder` over a curated set of
representative routes spanning every page archetype — at minimum the home page, a
component page, a form-heavy component page, a guide, a canvas/ecosystem page, a
media page, the changelog, the two theme/customizer pages, a foundations page,
AND at least one **rich-ARIA composite-widget** page (a `role=tree` / `role=grid`
or comparable widget) so the composite-widget axe rules (e.g.
`aria-required-children`, role nesting, `aria-selected`) are exercised rather than
only flat content. For each route the suite SHALL assert **zero** axe violations
of `impact` `serious` or `critical` (`minor`/`moderate` MAY be reported but MUST
NOT fail the test), except a small, documented allow-list of tracked
design-system / global-theme findings. `@axe-core/playwright` SHALL be declared
as a devDependency and a `test:a11y` npm script SHALL run the smoke in isolation.

#### Scenario: the a11y smoke exists and covers the archetypes

- **GIVEN** the repository after this change
- **WHEN** `tests/e2e/a11y-smoke.spec.ts`, `package.json`, and the spec's route
  list are read
- **THEN** the spec imports `AxeBuilder` from `@axe-core/playwright`,
  `@axe-core/playwright` is in `devDependencies`, `package.json` has a `test:a11y`
  script, and the covered routes include the home page, a `/components/*` page, a
  form-heavy page, a `/guides/*` page, a `/canvas/*` page, a `/media/*` page,
  `/changelog`, `/components/theme-customizer`, `/components/theme-switcher`, a
  `/core/*` page, and a rich-ARIA widget page (`/components/tree`)

#### Scenario: no serious or critical violation passes the gate

- **GIVEN** any route the smoke covers
- **WHEN** `AxeBuilder({ page }).analyze()` runs and its violations are filtered
  to `impact` in {`serious`, `critical`}
- **THEN** the test asserts that filtered list (minus the documented allow-list)
  is empty, so a serious/critical regression fails `test:a11y`, while
  `minor`/`moderate` findings do not

#### Scenario: the rich-ARIA widget exercises composite-widget rules

- **GIVEN** the `/components/tree` route in the smoke
- **WHEN** axe analyzes its `VdTree` `role=tree` / `role=treeitem` hierarchy
- **THEN** the composite-widget rules run and any serious/critical finding
  outside the allow-list fails the gate

## ADDED Requirements

### Requirement: the Pages deploy workflow gates on type, a11y, and size

`.github/workflows/deploy.yml` SHALL run the typecheck, accessibility-smoke, and
gzip-size gates **before** uploading the Pages artifact, so a type / a11y /
bundle-size regression cannot auto-publish. Because `deploy.yml` runs on push to
`main` independently of `ci.yml` (which does not run those suites), the gates
SHALL live in the deploy job itself. The a11y and size suites SHALL run against a
base-`/` build (the test suites assume base `/`); the uploaded artifact SHALL
still be rebuilt with the `/vd3-docs/` project-page base (`VITE_BASE=/vd3-docs/`).

#### Scenario: a failing gate blocks the deploy

- **GIVEN** `deploy.yml` after this change
- **WHEN** the build job runs on a push to `main`
- **THEN** `pnpm run typecheck`, `pnpm run test:a11y`, and `pnpm run test:size`
  all run before `upload-pages-artifact`, any non-zero exit fails the job so
  nothing is published, and the uploaded artifact is the `VITE_BASE=/vd3-docs/`
  build

### Requirement: the docs-app interactive surfaces carry regression tests

The docs site's two most logic-heavy in-app surfaces SHALL have automated tests
beyond their stores. The global command-palette search modal
(`src/overlays/GlobalSearchModal.vue`) SHALL have a component interaction test —
distinct from the search-store unit test — that opens the modal via the global
cmd+k shortcut, filters by typing, navigates with the arrow keys, and asserts the
results render as an ARIA `role=listbox` with `role=option` children. The theme
customizer's code generator (`src/customizer/codegen.ts` + `overrides.ts`) SHALL
have unit coverage of `toVueSfc`, `stageStyle`, and `styleToCss` — asserting the
emitted `import … from "@vanduo-oss/vd3"` line, the scoped `--vd-*` override
block, and a coherent script/template/style SFC shape — beyond the per-component
class-emission test.

#### Scenario: the search modal is interaction-tested

- **GIVEN** `tests/unit/global-search-modal.spec.ts`
- **WHEN** it mounts `GlobalSearchModal` and dispatches cmd+k, then a query, then
  ArrowDown
- **THEN** the modal opens, the results render as a `role=listbox` with
  `role=option` children, and the active option carries `aria-selected`

#### Scenario: the customizer generator is unit-tested end to end

- **GIVEN** `tests/unit/customizer-codegen.spec.ts`
- **WHEN** it drives a known `CustomizerState` through `toVueSfc` / `stageStyle` /
  `styleToCss`
- **THEN** it asserts the `import … from "@vanduo-oss/vd3"` line, the scoped
  `--vd-*` override declaration block, and the script→template→style ordering of
  the emitted SFC
