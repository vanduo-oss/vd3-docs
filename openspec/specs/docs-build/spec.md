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
`@vanduo-oss/music-player`. While the vd3 packages are unpublished, the two vd3
dependencies SHALL be linked to the sibling working trees via the pnpm `link:`
protocol (`link:../vd3`, `link:../vd3-cbun`).

#### Scenario: manifest names the vd3 line and drops the old line

- **GIVEN** the site's `package.json` after this change
- **WHEN** its `name`, `private`, and `dependencies` are inspected
- **THEN** `name` is `@vanduo-oss/vd3-docs`, `private` is `true`, the only
  `@vanduo-oss/*` dependencies are `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun`,
  and none of `core`, `framework`, `vue`, `charts`, `flowchart`, `hex-grid`, or
  `music-player` appear

#### Scenario: unpublished vd3 packages resolve via link

- **GIVEN** the sibling working trees `../vd3` and `../vd3-cbun` exist and are
  unpublished
- **WHEN** `pnpm install` runs from the docs repo
- **THEN** `@vanduo-oss/vd3` resolves to `link:../vd3` and `@vanduo-oss/vd3-cbun`
  resolves to `link:../vd3-cbun`, and the install succeeds with no old-line
  `@vanduo-oss` entries left in the lockfile

### Requirement: single stylesheet and plugin entry with no vanilla runtime

`main.ts` SHALL source component styles from `@vanduo-oss/vd3/css` and the canvas
styles from `@vanduo-oss/vd3-cbun/{charts,flowchart,music-player}/css`. It SHALL
install the `VanduoVue` plugin (imported from `@vanduo-oss/vd3`, the same
identifier the old `@vanduo-oss/vue` exported) with
`themeDefaults: { PRIMARY_DARK: "blue" }`. It MUST NOT import or call
`loadVanduoRuntime` (which `@vanduo-oss/vd3` does not export) and MUST NOT load
any framework IIFE or otherwise bootstrap a `window.Vanduo*` global runtime.

#### Scenario: entry installs the plugin without a runtime loader

- **GIVEN** `main.ts` after this change
- **WHEN** its imports and `createApp` setup are read
- **THEN** stylesheet imports come from `@vanduo-oss/vd3/css` and
  `@vanduo-oss/vd3-cbun/*/css`, `app.use(VanduoVue, { themeDefaults: { PRIMARY_DARK: "blue" } })`
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

`vite-ssg build` SHALL complete successfully and statically prerender all 93
existing routes while the vd3 packages are consumed via `link:`. No route is
added or removed by this change.

#### Scenario: full static build is green

- **GIVEN** `../vd3` and `../vd3-cbun` are built and linked
- **WHEN** `pnpm build` runs (Node 24)
- **THEN** `vite-ssg build` prerenders all 93 routes without error, the sitemap
  is generated, and `vue-tsc` typechecking reports no dangling imports to removed
  packages

