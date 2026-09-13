# docs-build

## ADDED Requirements

### Requirement: hybrid search indexer and eval scripts

The repository SHALL provide `scripts/hybrid-search-indexer.mjs` and
`scripts/hybrid-search-eval.mjs`, exposed as `package.json` scripts
`index` and `index:eval`. Maintainers MUST be able to regenerate committed
`public/search/search-index.json` and `public/search/vectors.json` without
embedding that work in every deploy build.

#### Scenario: scripts are wired

- **GIVEN** the committed `package.json` and `scripts/` tree
- **WHEN** the hybrid-search tooling is inspected
- **THEN** `index` runs `node scripts/hybrid-search-indexer.mjs` and
  `index:eval` runs `node scripts/hybrid-search-eval.mjs`

## MODIFIED Requirements

### Requirement: package identity and dependency targets

The site's `package.json` SHALL be named `@vanduo-oss/vd3-docs` and remain
`private: true` (never published). Its runtime dependencies SHALL target the
vd3 line only: it MUST declare `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun`
and MUST NOT declare any of `@vanduo-oss/core`, `@vanduo-oss/framework`,
`@vanduo-oss/vue`, `@vanduo-oss/charts`, `@vanduo-oss/flowchart`,
`@vanduo-oss/hex-grid`, or `@vanduo-oss/music-player`. The two vd3
dependencies SHALL be the PUBLISHED packages resolved from the npm registry —
`@vanduo-oss/vd3` at exact `1.7.2` and `@vanduo-oss/vd3-cbun` at exact
`1.4.0` (dogfooding). `.npmrc` SHALL set `save-exact=true` so newly added
deps do not reintroduce caret ranges. A contributor MAY temporarily
`pnpm link` (or `link:../`) the sibling working trees to render unreleased
library work locally, but the committed manifest SHALL keep the exact
published versions.

#### Scenario: manifest names the vd3 line and drops the old line

- **GIVEN** the site's `package.json` after this change
- **WHEN** its `name`, `private`, and `dependencies` are inspected
- **THEN** `name` is `@vanduo-oss/vd3-docs`, `private` is `true`, the only
  `@vanduo-oss/*` runtime kit deps required by this requirement are
  `@vanduo-oss/vd3` (`1.7.2`) and `@vanduo-oss/vd3-cbun` (`1.4.0`), and none
  of `core`, `framework`, `vue`, `charts`, `flowchart`, `hex-grid`, or
  `music-player` appear

#### Scenario: published vd3 packages resolve from the registry

- **GIVEN** the committed `package.json` pinning exact `1.7.2` / `1.4.0`
  vd3 deps and `save-exact=true`
- **WHEN** `pnpm install` runs from the docs repo
- **THEN** `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` resolve to those
  published registry versions with no `link:` entry for either in the
  lockfile, and the install succeeds with no old-line `@vanduo-oss` entries

#### Scenario: unpublished vd3 packages resolve via link

- **GIVEN** a contributor rendering unreleased library work locally
- **WHEN** they `pnpm link` (or temporarily `link:../`) the sibling `../vd3`
  / `../vd3-cbun` working trees
- **THEN** those linked builds resolve in place of the published versions for
  the local session, while the committed manifest still pins exact `1.7.2` /
  `1.4.0`

### Requirement: the visual-parity suite baselines the vd3 site

`tests/e2e/visual-parity.spec.ts` and its committed baselines SHALL screenshot
the shipped **vd3** site, not the pre-strip vd2 clone. The spec MUST NOT
contain any `vd2` token: the route field SHALL be `path` (not `vd2Path`), each
snapshot name SHALL be `vd3-<label>.png` (not `vd2-<label>.png`), and each
test title SHALL read `vd3 <path> baseline` (not `vd2 … baseline regression`).
The enumerated `ROUTES` list SHALL live in a **Playwright-free module**
(`tests/e2e/routes.ts`, importing no `@playwright/test`) so a Vitest unit
test can import it, and SHALL be reconciled against `src/nav.ts` (the route
SSOT): no listed `path` resolves to the 404 page, `/components/doc-search`
SHALL be present, and the two dropped guides (`/guides/esm-vs-iife`,
`/guides/lifecycle-manager`) SHALL NOT appear. `ROUTES` SHALL be a
representative **superset** covering every content route `src/nav.ts`
registers — every top-level page, every component/foundation/guide/effect
section, AND every cbun-rendering canvas/media/editor route
(`/canvas/{charts,flowchart,hex,draw}`, `/editors/code-editor`,
`/media/{music-player,image-box}`) — except routes named in an explicit
`VISUAL_PARITY_EXCLUSIONS` set. The default `test:e2e` project SHALL be
Chromium Desktop. **Committed** snapshot PNGs SHALL be Chromium Desktop
darwin only (`vd3-*-Chromium-Desktop-darwin.png`); Chromium Mobile darwin
PNGs MUST NOT be committed (see repo-scaffold ignore rule). All committed
snapshots SHALL reflect the docs site's rem-root scale
(`html { font-size: 90% }`).

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

- **GIVEN** the docs site built with `html { font-size: 90% }`
- **WHEN** visual-parity snapshots are captured with `--update-snapshots` on
  Chromium Desktop
- **THEN** every committed `vd3-*-Chromium-Desktop-darwin.png` baseline
  reflects the denser rem-root appearance at 100% browser zoom
