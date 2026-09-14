## MODIFIED Requirements

### Requirement: package identity and dependency targets

The site's `package.json` SHALL be named `@vanduo-oss/vd3-docs` and remain
`private: true` (never published). Its runtime dependencies SHALL target the
vd3 line only: it MUST declare `@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`,
`@vanduo-oss/vd3-flowchart`, and `@vanduo-oss/vd3-cbun`, and MUST NOT declare
any of `@vanduo-oss/core`, `@vanduo-oss/framework`, `@vanduo-oss/vue`,
`@vanduo-oss/charts`, `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, or
`@vanduo-oss/music-player`. The four vd3 kit dependencies SHALL be the
PUBLISHED packages resolved from the npm registry — `@vanduo-oss/vd3` at
exact `1.7.2`, `@vanduo-oss/vd3-charts` at exact `1.1.0`,
`@vanduo-oss/vd3-flowchart` at exact `1.2.0`, and `@vanduo-oss/vd3-cbun` at
exact `1.4.2` (dogfooding). `.npmrc` SHALL set `save-exact=true` so newly
added deps do not reintroduce caret ranges. The committed
`pnpm-workspace.yaml` and `pnpm-lock.yaml` MUST NOT override those packages
with a `link:` specifier. A contributor MAY temporarily `pnpm link` (or
`link:../`) the sibling working trees to render unreleased library work
locally, but the committed manifest, workspace, and lockfile SHALL keep the
exact published versions.

#### Scenario: manifest names the vd3 line and drops the old line

- **GIVEN** the site's `package.json` after this change
- **WHEN** its `name`, `private`, and `dependencies` are inspected
- **THEN** `name` is `@vanduo-oss/vd3-docs`, `private` is `true`, the vd3 kit
  runtime deps required by this requirement are `@vanduo-oss/vd3` (`1.7.2`),
  `@vanduo-oss/vd3-charts` (`1.1.0`), `@vanduo-oss/vd3-flowchart` (`1.2.0`),
  and `@vanduo-oss/vd3-cbun` (`1.4.2`), and none of `core`, `framework`,
  `vue`, the retired `@vanduo-oss/charts`, `@vanduo-oss/flowchart`,
  `hex-grid`, or `music-player` appear as dependency names

#### Scenario: published vd3 packages resolve from the registry

- **GIVEN** the committed `package.json` pinning exact `1.7.2` / `1.1.0` /
  `1.2.0` / `1.4.2` vd3 kit deps and `save-exact=true`
- **WHEN** `pnpm install` runs from the docs repo
- **THEN** those packages resolve to the published registry versions with no
  `link:` entry for any of them in the lockfile, and the install succeeds with
  no old-line `@vanduo-oss` entries

#### Scenario: unpublished vd3 packages resolve via link

- **GIVEN** a contributor rendering unreleased library work locally
- **WHEN** they `pnpm link` (or temporarily `link:../`) the sibling `../vd3`
  / `../vd3-charts` / `../vd3-flowchart` / `../vd3-cbun` working trees
- **THEN** those linked builds resolve in place of the published versions for
  the local session, while the committed manifest still pins the exact
  published versions

### Requirement: single stylesheet and plugin entry with no vanilla runtime

`main.ts` SHALL source component styles from `@vanduo-oss/vd3/css`, chart
styles from `@vanduo-oss/vd3-charts/css`, flowchart styles from
`@vanduo-oss/vd3-flowchart/css`, and remaining canvas styles from
`@vanduo-oss/vd3-cbun/{code-editor,draw,music-player}/css`. It SHALL
install the `VanduoVue` plugin (imported from `@vanduo-oss/vd3`) with
`themeDefaults` whose `PRIMARY_LIGHT` is `"black"` and `PRIMARY_DARK` is
`"blue"`.
It MUST NOT import or call `loadVanduoRuntime` (which `@vanduo-oss/vd3` does
not export) and MUST NOT load any framework IIFE or otherwise bootstrap a
`window.Vanduo*` global runtime.

#### Scenario: entry installs the plugin without a runtime loader

- **GIVEN** `main.ts` after this change
- **WHEN** its imports and `createApp` setup are read
- **THEN** stylesheet imports come from `@vanduo-oss/vd3/css`,
  `@vanduo-oss/vd3-charts/css`, `@vanduo-oss/vd3-flowchart/css`, and
  `@vanduo-oss/vd3-cbun/{code-editor,draw,music-player}/css`,
  `themeDefaults.PRIMARY_LIGHT` is `"black"`, `themeDefaults.PRIMARY_DARK` is
  `"blue"`, and there is no `loadVanduoRuntime` import and no awaited
  client-only runtime-bootstrap block

#### Scenario: the built bundle ships no vanilla runtime

- **GIVEN** a completed `vite-ssg build` producing `dist/`
- **WHEN** the emitted bundle is grepped for `window.Vanduo`
- **THEN** there are zero matches — no framework global runtime is shipped

### Requirement: vite configuration supports dev-linked vd3 packages

`vite.config.ts` SHALL be configured so the symlinked, out-of-tree vd3
packages resolve without duplicating framework singletons or stale
pre-bundling. It MUST set `resolve.dedupe` to include `vue` and `pinia`, MUST
list `@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`,
`@vanduo-oss/vd3-flowchart`, and `@vanduo-oss/vd3-cbun` in
`optimizeDeps.exclude` and `ssr.noExternal`, MUST allow sibling
`../vd3-charts` and `../vd3-flowchart` in `server.fs.allow`, and MUST NOT
reference the removed `@vanduo-oss/framework` in `optimizeDeps` or
`ssr.noExternal`.

#### Scenario: linked packages share one Vue/Pinia and are served from source

- **GIVEN** `vite.config.ts` after this change
- **WHEN** `resolve.dedupe`, `optimizeDeps`, and `ssr.noExternal` are inspected
- **THEN** `resolve.dedupe` includes `"vue"` and `"pinia"`,
  `optimizeDeps.exclude` and `ssr.noExternal` include `"@vanduo-oss/vd3"`,
  `"@vanduo-oss/vd3-charts"`, `"@vanduo-oss/vd3-flowchart"`, and
  `"@vanduo-oss/vd3-cbun"`, and no `optimizeDeps` or `ssr.noExternal` entry
  names `@vanduo-oss/framework`

### Requirement: ecosystem pages import from the vd3 canvas bundle

The canvas/media pages SHALL import charts and flowchart from the dedicated
packages and the remaining canvas widgets from `@vanduo-oss/vd3-cbun`.
Specifically: `VdChart` from `@vanduo-oss/vd3-charts`, `VdFlowchart` from
`@vanduo-oss/vd3-flowchart`, `VdHexGrid` from `@vanduo-oss/vd3-cbun/hex-grid`
with hex maths from `@vanduo-oss/vd3-cbun/hex-grid/hex-math`, and
`VdMusicPlayer` from `@vanduo-oss/vd3-cbun/music-player`. No retired
`@vanduo-oss/{charts,flowchart,hex-grid,music-player}` specifier (including
the old `/vue` bindings) SHALL remain in `src/`.

#### Scenario: charts/flowchart/hex/music imports point at vd3-cbun

- **GIVEN** `canvas/Charts.vue`, `canvas/Flowchart.vue`, `canvas/Hex.vue`, and
  `media/MusicPlayer.vue` after this change
- **WHEN** their component and subexport imports are read
- **THEN** charts resolve through `@vanduo-oss/vd3-charts`, flowchart through
  `@vanduo-oss/vd3-flowchart`, hex and music through `@vanduo-oss/vd3-cbun/*`,
  and none import from `@vanduo-oss/charts`, `@vanduo-oss/flowchart`,
  `@vanduo-oss/hex-grid`, or `@vanduo-oss/music-player`

#### Scenario: charts and flowchart imports point at the standalone packages

- **GIVEN** `canvas/Charts.vue` and `canvas/Flowchart.vue` after this change
- **WHEN** their component imports are read
- **THEN** charts resolve through `@vanduo-oss/vd3-charts` and flowchart
  through `@vanduo-oss/vd3-flowchart`, and neither imports from
  `@vanduo-oss/vd3-cbun/{charts,flowchart}` or the retired
  `@vanduo-oss/charts` / `@vanduo-oss/flowchart` names

#### Scenario: hex and music stay on the cbun bundle

- **GIVEN** `canvas/Hex.vue` and `media/MusicPlayer.vue` after this change
- **WHEN** their component and subexport imports are read
- **THEN** each resolves through `@vanduo-oss/vd3-cbun/*`

#### Scenario: no old ecosystem specifier survives anywhere in src

- **GIVEN** the whole `src/` tree after this change
- **WHEN** it is grepped for `@vanduo-oss/charts`, `@vanduo-oss/flowchart`,
  `@vanduo-oss/hex-grid`, and `@vanduo-oss/music-player`
- **THEN** there are zero matches in code, snippet strings, or prose
