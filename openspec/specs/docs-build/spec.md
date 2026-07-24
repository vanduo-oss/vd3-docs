# docs-build Specification

## Purpose
TBD - created by archiving change docs-clone-and-strip. Update Purpose after archive.
## Requirements
### Requirement: package identity and dependency targets

The site's `package.json` SHALL be named `@vanduo-oss/vd3-docs` and remain
`private: true` (never published). Its runtime dependencies SHALL target the vd3
line only: it MUST declare `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` and MUST
NOT declare any of `@vanduo-oss/core`, `@vanduo-oss/framework`, `@vanduo-oss/vue`,
`@vanduo-oss/charts`, `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, or
`@vanduo-oss/music-player`. The two vd3 dependencies SHALL be the PUBLISHED
packages resolved from the npm registry — `@vanduo-oss/vd3` at `^1.0.0` and
`@vanduo-oss/vd3-cbun` at `^1.2.0` (dogfooding). A contributor MAY temporarily
`pnpm link` (or `link:../`) the sibling working trees to render unreleased library
work locally, but the committed manifest SHALL pin the published `^` ranges.

#### Scenario: manifest names the vd3 line and drops the old line

- **GIVEN** the site's `package.json` after this change
- **WHEN** its `name`, `private`, and `dependencies` are inspected
- **THEN** `name` is `@vanduo-oss/vd3-docs`, `private` is `true`, the only
  `@vanduo-oss/*` dependencies are `@vanduo-oss/vd3` (`^1.0.0`) and
  `@vanduo-oss/vd3-cbun` (`^1.2.0`), and none of `core`, `framework`, `vue`,
  `charts`, `flowchart`, `hex-grid`, or `music-player` appear

#### Scenario: published vd3 packages resolve from the registry

- **GIVEN** the committed `package.json` pinning `^1.0.0` / `^1.2.0` vd3 deps
- **WHEN** `pnpm install` runs from the docs repo
- **THEN** `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` resolve to their published
  registry versions with no `link:` entry for either in the lockfile, and the
  install succeeds with no old-line `@vanduo-oss` entries

#### Scenario: unpublished vd3 packages resolve via link

- **GIVEN** a contributor rendering unreleased library work locally
- **WHEN** they `pnpm link` (or temporarily `link:../`) the sibling `../vd3` /
  `../vd3-cbun` working trees
- **THEN** those linked builds resolve in place of the published versions for the
  local session, while the committed manifest still pins the published `^1.0.0` /
  `^1.2.0` ranges

### Requirement: single stylesheet and plugin entry with no vanilla runtime

`main.ts` SHALL source component styles from `@vanduo-oss/vd3/css` and the canvas
styles from `@vanduo-oss/vd3-cbun/{charts,flowchart,music-player}/css`. It SHALL
install the `VanduoVue` plugin (imported from `@vanduo-oss/vd3`, the same
identifier the old `@vanduo-oss/vue` exported) with
`themeDefaults: { PRIMARY_DARK: "green" }`. It MUST NOT import or call
`loadVanduoRuntime` (which `@vanduo-oss/vd3` does not export) and MUST NOT load
any framework IIFE or otherwise bootstrap a `window.Vanduo*` global runtime.

#### Scenario: entry installs the plugin without a runtime loader

- **GIVEN** `main.ts` after this change
- **WHEN** its imports and `createApp` setup are read
- **THEN** stylesheet imports come from `@vanduo-oss/vd3/css` and
  `@vanduo-oss/vd3-cbun/*/css`, `app.use(VanduoVue, { themeDefaults: { PRIMARY_DARK: "green" } })`
  is present, and there is no `loadVanduoRuntime` import and no awaited
  client-only runtime-bootstrap block

#### Scenario: the built bundle ships no vanilla runtime

- **GIVEN** a completed `vite-ssg build` producing `dist/`
- **WHEN** the emitted bundle is grepped for `window.Vanduo`
- **THEN** there are zero matches — no framework global runtime is shipped

### Requirement: vite configuration supports dev-linked vd3 packages

`vite.config.ts` SHALL be configured so the symlinked, out-of-tree vd3 packages
resolve without duplicating framework singletons or stale pre-bundling. It MUST
set `resolve.dedupe` to include `vue` and `pinia`, MUST list both
`@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` in `optimizeDeps.exclude`, and MUST
NOT reference the removed `@vanduo-oss/framework` in `optimizeDeps` or
`ssr.noExternal` (SSR inlining of the linked Vue SFCs targets the vd3 packages
instead).

#### Scenario: linked packages share one Vue/Pinia and are served from source

- **GIVEN** `vite.config.ts` after this change
- **WHEN** `resolve.dedupe`, `optimizeDeps`, and `ssr.noExternal` are inspected
- **THEN** `resolve.dedupe` includes `"vue"` and `"pinia"`,
  `optimizeDeps.exclude` includes `"@vanduo-oss/vd3"` and
  `"@vanduo-oss/vd3-cbun"`, and no `optimizeDeps` or `ssr.noExternal` entry names
  `@vanduo-oss/framework`

### Requirement: ecosystem pages import from the vd3 canvas bundle

The canvas/media pages SHALL import their components and subexports from
`@vanduo-oss/vd3-cbun` rather than the four old ecosystem packages. Specifically:
`VdChart` from `@vanduo-oss/vd3-cbun/charts`, `VdFlowchart` from
`@vanduo-oss/vd3-cbun/flowchart`, `VdHexGrid` from `@vanduo-oss/vd3-cbun/hex-grid`
with hex maths from `@vanduo-oss/vd3-cbun/hex-grid/hex-math`, and `VdMusicPlayer`
from `@vanduo-oss/vd3-cbun/music-player`. No `@vanduo-oss/{charts,flowchart,
hex-grid,music-player}` specifier (including the old `/vue` bindings) SHALL remain
in `src/`.

#### Scenario: charts/flowchart/hex/music imports point at vd3-cbun

- **GIVEN** `canvas/Charts.vue`, `canvas/Flowchart.vue`, `canvas/Hex.vue`, and
  `media/MusicPlayer.vue` after this change
- **WHEN** their component and subexport imports are read
- **THEN** each resolves through `@vanduo-oss/vd3-cbun/*` and none imports from
  `@vanduo-oss/charts`, `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, or
  `@vanduo-oss/music-player`

#### Scenario: no old ecosystem specifier survives anywhere in src

- **GIVEN** the whole `src/` tree after this change
- **WHEN** it is grepped for `@vanduo-oss/charts`, `@vanduo-oss/flowchart`,
  `@vanduo-oss/hex-grid`, and `@vanduo-oss/music-player`
- **THEN** there are zero matches in code, snippet strings, or prose

### Requirement: the site builds and prerenders every route against the vd3 line

`vite-ssg build` SHALL complete successfully and statically prerender every route
registered in `src/nav.ts` (the route single source of truth), consuming the
published vd3 packages. No route is added or removed by this change, and the
requirement SHALL NOT hardcode a fixed route count.

#### Scenario: full static build is green

- **GIVEN** the published vd3 packages installed (or the sibling trees built and
  linked for local unreleased work)
- **WHEN** `pnpm build` runs (Node 24)
- **THEN** `vite-ssg build` prerenders every `src/nav.ts` route without error, the
  sitemap is generated, and `vue-tsc` typechecking reports no dangling imports to
  removed packages

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

