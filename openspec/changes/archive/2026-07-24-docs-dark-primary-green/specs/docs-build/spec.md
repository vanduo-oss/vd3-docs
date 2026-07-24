## MODIFIED Requirements

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
