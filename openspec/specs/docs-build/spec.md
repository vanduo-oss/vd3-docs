# docs-build Specification

## Purpose
Keep the private vd3-docs site building, testing, and deploying against
exact published `@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`, and
`@vanduo-oss/vd3-flowchart` pins. `/cbun` previews those charts and flowchart
packages. Syntax highlighting comes from `@vanduo-oss/vd3/highlight`.

## Requirements

### Requirement: package identity and dependency targets

`package.json` SHALL name the private site `@vanduo-oss/vd3-docs` and SHALL
pin published `@vanduo-oss/vd3` `1.8.0`, charts `1.1.1`, and flowchart
`1.5.0` with `save-exact=true`. It MUST NOT declare retired, cbun, or labs
packages, and the flowchart pin MUST NOT be `link:` or `file:`.

#### Scenario: manifest names the vd3 line and drops the old line

- **GIVEN** the site's `package.json` after this change
- **WHEN** its `name`, `private`, and `dependencies` are inspected
- **THEN** `name` is `@vanduo-oss/vd3-docs`, `private` is `true`, runtime
  deps include `@vanduo-oss/vd3` (`1.8.0`), `@vanduo-oss/vd3-charts`
  (`1.1.1`), and `@vanduo-oss/vd3-flowchart` (`1.5.0`), there is no
  `@vanduo-oss/vd3-cbun`, `@vanduo-oss/vdl-cbun`, or
  `@vanduo-oss/vdl-hybrid-search`, and none of
  `core`, `framework`, `vue`, the retired `@vanduo-oss/charts`,
  `@vanduo-oss/flowchart`, `hex-grid`, or `music-player` appear as dependency
  names

#### Scenario: kit packages resolve for install

- **GIVEN** the committed `package.json` targeting exact vd3 `1.8.0`,
  exact `1.1.1` / `1.5.0` charts/flowchart, and `save-exact=true`
- **WHEN** `pnpm install` runs from the docs repo
- **THEN** those packages resolve from the registry
- **AND** the install succeeds with no `@vanduo-oss/vd3-cbun`,
  `@vanduo-oss/vdl-cbun`, or `@vanduo-oss/vdl-hybrid-search` entry

#### Scenario: unpublished library trees resolve via link

- **GIVEN** a contributor rendering unreleased library work locally
- **WHEN** they `pnpm link` (or `link:`) sibling `../vd3` / `../vd3-charts` /
  `../vd3-flowchart` working trees
- **THEN** those linked builds resolve for the local session
- **AND** the committed manifest still pins the registry packages

### Requirement: single stylesheet and plugin entry with no vanilla runtime

`main.ts` SHALL import the vd3, charts, and flowchart stylesheets and SHALL
install `VanduoVue` with `PRIMARY_LIGHT` `"black"` and `PRIMARY_DARK`
`"blue"`. It MUST NOT bootstrap a vanilla `window.Vanduo*` runtime or import
cbun or labs CSS.

#### Scenario: entry installs the plugin without a runtime loader

- **GIVEN** `main.ts` after this change
- **WHEN** its imports and `createApp` setup are read
- **THEN** stylesheet imports come from `@vanduo-oss/vd3/css`,
  `@vanduo-oss/vd3-charts/css`, and `@vanduo-oss/vd3-flowchart/css`,
  `themeDefaults.PRIMARY_LIGHT` is `"black"`, `themeDefaults.PRIMARY_DARK` is
  `"blue"`, and there is no `loadVanduoRuntime` import, no
  `@vanduo-oss/vdl-cbun` import, and no awaited client-only runtime-bootstrap
  block

#### Scenario: the built bundle ships no vanilla runtime

- **GIVEN** a completed `vite-ssg build` producing `dist/`
- **WHEN** the emitted bundle is grepped for `window.Vanduo`
- **THEN** there are zero matches — no framework global runtime is shipped

### Requirement: vite configuration supports dev-linked vd3 packages

`vite.config.ts` SHALL dedupe `vue` and `pinia`, exclude the three published
vd3 packages from pre-bundling and SSR externalization, and allow the sibling
package directories. It MUST NOT reference cbun, labs, or
`@vanduo-oss/framework` there.

#### Scenario: linked packages share one Vue/Pinia and are served from source

- **GIVEN** `vite.config.ts` after this change
- **WHEN** `resolve.dedupe`, `optimizeDeps`, and `ssr.noExternal` are inspected
- **THEN** `resolve.dedupe` includes `"vue"` and `"pinia"`,
  `optimizeDeps.exclude` and `ssr.noExternal` include `"@vanduo-oss/vd3"`,
  `"@vanduo-oss/vd3-charts"`, and `"@vanduo-oss/vd3-flowchart"`, and no
  `optimizeDeps` or `ssr.noExternal` entry names `@vanduo-oss/vd3-cbun`,
  `@vanduo-oss/vdl-cbun`, or `@vanduo-oss/framework`

### Requirement: canvas pages import the dedicated packages

Charts and flowchart pages SHALL import the dedicated packages, and
highlighting SHALL come from `@vanduo-oss/vd3/highlight`. Runtime `src/`
MUST NOT import cbun or labs packages. Historical changelog prose MAY still
name `@vanduo-oss/vd3-cbun`.

#### Scenario: charts and flowchart imports point at the standalone packages

- **GIVEN** `canvas/Charts.vue` and `canvas/Flowchart.vue` after this change
- **WHEN** their component imports are read
- **THEN** charts resolve through `@vanduo-oss/vd3-charts` and flowchart
  through `@vanduo-oss/vd3-flowchart`

#### Scenario: highlight comes from the design system

- **GIVEN** `src/utils/highlight.ts`
- **WHEN** its imports are read
- **THEN** highlighting resolves through `@vanduo-oss/vd3/highlight`
- **AND** it does not import `@vanduo-oss/vdl-cbun` or `@vanduo-oss/vd3-cbun`

#### Scenario: no old ecosystem specifier survives in install/runtime paths

- **GIVEN** the whole `src/` tree after this change
- **WHEN** it is grepped for `@vanduo-oss/charts`, `@vanduo-oss/flowchart`,
  `@vanduo-oss/hex-grid`, and `@vanduo-oss/music-player` (excluding historical
  changelog package strings that intentionally document past releases)
- **THEN** there are zero matches in code, snippet strings, or guide prose

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

Visual parity SHALL screenshot the shipped vd3 site. The spec MUST NOT use
`vd2` tokens. `ROUTES` SHALL live in Playwright-free `tests/e2e/routes.ts`
and match `src/nav.ts` except named exclusions. Committed snapshots SHALL be
Chromium Desktop darwin PNGs at the docs rem-root scale.

#### Scenario: the spec carries no vd2 branding

- **GIVEN** `tests/e2e/visual-parity.spec.ts` after this change
- **WHEN** it is grepped for `vd2`
- **THEN** there are zero matches — the route field is `path`, the snapshot
  name template is `vd3-${…}.png`, and the test title is `vd3 <path> baseline`

#### Scenario: the route list is reconciled with the current nav

- **GIVEN** the `ROUTES` array after this change and `src/nav.ts`
- **WHEN** each enumerated `path` is checked against the site's registered
  routes
- **THEN** every `path` resolves to a real page (none hits the 404 page),
  `/components/doc-search` is present, and neither `/guides/esm-vs-iife` nor
  `/guides/lifecycle-manager` is listed

#### Scenario: ROUTES covers every cbun-rendering and first-party route

- **GIVEN** `tests/e2e/routes.ts` after this change and `src/nav.ts`
- **WHEN** the two route sets are compared
- **THEN** every cbun canvas/media/editor route and every first-party
  section/page that nav registers appears in `ROUTES`, except routes named
  in `VISUAL_PARITY_EXCLUSIONS`

#### Scenario: a nav route missing from ROUTES fails a unit test

- **GIVEN** the Vitest drift guard `tests/unit/visual-parity-routes.spec.ts`
  importing `ROUTES` and `src/nav.ts`
- **WHEN** a page is registered in `nav.ts` but not added to `ROUTES` (and
  not excluded)
- **THEN** the test fails, naming the uncovered route, so visual coverage
  cannot silently drift

#### Scenario: only fresh vd3 baselines are committed

- **GIVEN** `tests/e2e/visual-parity.spec.ts-snapshots/` after this change
- **WHEN** its tracked PNG files are listed and `pnpm test:e2e` (Chromium
  Desktop) is re-run without `--update-snapshots` against the built vd3 site
- **THEN** every committed file is named
  `vd3-*-Chromium-Desktop-darwin.png`, there is one per enumerated route, no
  `vd2-*` or `*-Chromium-Mobile-darwin.png` file is tracked, and the run
  passes

#### Scenario: baselines match the scaled docs site

- **GIVEN** the docs site built with `html { font-size: 95.625% }`
- **WHEN** visual-parity snapshots are captured with `--update-snapshots` on
  Chromium Desktop
- **THEN** every committed `vd3-*-Chromium-Desktop-darwin.png` baseline
  reflects the denser rem-root appearance at 100% browser zoom

### Requirement: an accessibility smoke suite gates representative routes

The site SHALL run an `@axe-core/playwright` smoke, `test:a11y`, over
representative routes including one rich-ARIA widget. Serious and critical
violations SHALL fail the gate, aside from a documented allow-list.

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

`tests/scripts/size.mjs` SHALL assert committed gzip budgets, print the
measured totals, and exit non-zero when a budget is exceeded. `test:size`
SHALL remain the entry point.

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

`deploy.yml` SHALL run typecheck, `test:a11y`, and `test:size` on the
base-`/` build before `upload-pages-artifact`. A failing gate MUST stop the
publish.

#### Scenario: a failing gate blocks the deploy

- **GIVEN** `deploy.yml` after this change
- **WHEN** the build job runs on a push to `main`
- **THEN** `pnpm run typecheck`, `pnpm run test:a11y`, and `pnpm run test:size`
  all run before `upload-pages-artifact`, any non-zero exit fails the job so
  nothing is published, and the uploaded artifact is the base-`/` build

### Requirement: the docs-app interactive surfaces carry regression tests

The docs site's global command-palette search modal
(`src/overlays/GlobalSearchModal.vue`) SHALL have a component interaction test —
distinct from the search-store unit test — that opens the modal via the global
cmd+k shortcut, filters by typing, navigates with the arrow keys, and asserts the
results render as an ARIA `role=listbox` with `role=option` children.

#### Scenario: the search modal is interaction-tested

- **GIVEN** `tests/unit/global-search-modal.spec.ts`
- **WHEN** it mounts `GlobalSearchModal` and dispatches cmd+k, then a query, then
  ArrowDown
- **THEN** the modal opens, the results render as a `role=listbox` with
  `role=option` children, and the active option carries `aria-selected`

### Requirement: Fuse-only search corpus

The repository SHALL commit `public/search/search-index.json` as the Fuse.js
corpus for Cmd+K / Doc Search. It MUST NOT depend on
`@vanduo-oss/vdl-hybrid-search`, `@huggingface/transformers`,
`public/search/vectors.json`, or `pnpm index` / `pnpm index:eval` hybrid
scripts.

#### Scenario: Fuse corpus without hybrid tooling

- **GIVEN** the committed `package.json`, `scripts/`, and `public/search/`
- **WHEN** search tooling is inspected
- **THEN** Fuse.js is a runtime dependency, `search-index.json` is present,
  and hybrid indexer/eval scripts plus `vectors.json` are absent
