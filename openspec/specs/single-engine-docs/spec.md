# single-engine-docs Specification

## Purpose
TBD - created by archiving change docs-clone-and-strip. Update Purpose after archive.
## Requirements
### Requirement: no dual-engine machinery in the codebase

The site SHALL document a single engine (Vue 3). The dual-engine machinery MUST
be deleted: `src/stores/engine.ts`, `src/components/EngineSwitch.vue`,
`src/components/EngineBadge.vue`, and `src/components/engineSnippetGroup.ts` SHALL
NOT exist, and no module under `src/` SHALL import `useEngineStore`,
`EngineSwitch`, `EngineBadge`, `engineSnippetGroup`, or `ENGINE_SNIPPET_GROUP`.
Any test that exercised the removed store/component (e.g.
`tests/unit/engine.spec.ts`) SHALL be removed rather than left importing deleted
modules.

#### Scenario: engine modules and their references are gone

- **GIVEN** the repository after this change
- **WHEN** `src/` is searched for `EngineSwitch`, `EngineBadge`, `useEngineStore`,
  `stores/engine`, `engineSnippetGroup`, and `ENGINE_SNIPPET_GROUP`
- **THEN** there are zero matches, and the four engine module files do not exist

#### Scenario: the test suite has no dangling engine imports

- **GIVEN** the `tests/` tree after this change
- **WHEN** `pnpm test` runs
- **THEN** it passes with no import of a removed engine module (the engine spec
  is deleted, not left broken)

### Requirement: every EngineSwitch usage is flattened to its Vue 3 content

Each `<EngineSwitch>` block SHALL be replaced by the inner content of its `#vue3`
template; the `#vanilla` branch and the wrapper element SHALL be removed. No Vue 3
documentation content is lost, and no Vanilla branch survives.

#### Scenario: a page renders only its Vue 3 branch

- **GIVEN** a page that previously wrapped its usage in `<EngineSwitch>` with
  `#vue3` and `#vanilla` templates
- **WHEN** the page source is read after this change
- **THEN** the former `#vue3` content is rendered inline, there is no
  `<EngineSwitch>` element, no `#vanilla` template, and no `import EngineSwitch`

#### Scenario: the customizer code snippet keeps working standalone

- **GIVEN** a `DocCodeSnippet` that previously shared expand-state through an
  enclosing `EngineSwitch`
- **WHEN** it is rendered after the flatten
- **THEN** it uses its own local expand state, its `html/css/js/shell/defaultOpen`
  props and rendered markup are unchanged, and it no longer injects
  `ENGINE_SNIPPET_GROUP`

### Requirement: engine-store consumers are de-wired and single-engine

The consumers of the engine store SHALL no longer reference it or render an
engine toggle. `App.vue`, `overlays/LiveCustomizer.vue`, `layout/VdSidebar.vue`,
`components/DocCodeSnippet.vue`, and `components/customizer/CustomizerCode.vue`
MUST NOT import `useEngineStore`. The in-sidebar `.doc-engine-toggle` and the
in-customizer `.lcc-engine` toggles SHALL be removed, and the now-orphaned
engine-toggle / `data-engine` CSS in `styles/docs.css` SHALL be removed.
`styles/app.css` SHALL remain shell/layout-only.

#### Scenario: no consumer imports the engine store

- **GIVEN** `App.vue`, `overlays/LiveCustomizer.vue`, `layout/VdSidebar.vue`,
  `components/DocCodeSnippet.vue`, and `components/customizer/CustomizerCode.vue`
- **WHEN** their imports are inspected after this change
- **THEN** none imports `useEngineStore` or `@/stores/engine`, and neither the
  sidebar nor the customizer renders an engine toggle

#### Scenario: orphaned engine CSS is removed

- **GIVEN** `styles/docs.css` after this change
- **WHEN** it is searched for `.doc-engine-toggle`, `.doc-engine-option`,
  `.changelog-engine-toggle`, `.lcc-engine`, and `data-engine`
- **THEN** there are zero matches

### Requirement: the nav model carries no engine scope

`src/nav.ts` SHALL NOT define an `EngineScope` type or an `engine?` field on
`NavSection`. The type and field were dead (no nav section ever set an engine
scope), and removing them keeps the single-engine nav model honest.

#### Scenario: nav has no engine typing

- **GIVEN** `src/nav.ts` after this change
- **WHEN** it is read
- **THEN** there is no `EngineScope` type and `NavSection` has no `engine` field

### Requirement: the changelog is single-engine and packages-only

The changelog SHALL render only the Vue package history plus the shared inline
release cards; it MUST NOT import or render the Vanilla framework-history partial
and MUST NOT run any `data-engine` filtering. The Vanilla partial file
(`src/pages/changelog-content.html`) SHALL be deleted; the Vue partial
(`src/pages/changelog-vue-content.html`) SHALL be kept. The header engine toggle
SHALL be removed. Per the changelog-content policy the page tracks package
releases only, never docs-site content.

#### Scenario: changelog drops the vanilla partial and filter

- **GIVEN** `src/pages/changelog.vue` after this change
- **WHEN** its script and template are read
- **THEN** it does not import `changelog-content.html`, does not render a
  `data-engine="vanilla"` block, contains no `applyEngineFilter` routine and no
  `useEngineStore` import, has no header engine toggle, and still renders the
  `changelog-vue-content.html` partial

#### Scenario: the vanilla history partial is gone

- **GIVEN** the repository after this change
- **WHEN** `src/pages/` is listed
- **THEN** `changelog-content.html` does not exist and
  `changelog-vue-content.html` does

### Requirement: customizer codegen emits Vue only

The Live Customizer's code generation SHALL produce a Vue SFC only.
`customizer/codegen.ts` MUST NOT export `toVanilla`; it MUST keep `toVueSfc`.
`components/customizer/CustomizerCode.vue` SHALL always render the `toVueSfc`
output in a single `DocCodeSnippet` with no engine branch.

#### Scenario: only the Vue SFC generator remains

- **GIVEN** `customizer/codegen.ts` and `components/customizer/CustomizerCode.vue`
  after this change
- **WHEN** their exports and template are read
- **THEN** `codegen.ts` exports `toVueSfc` and does not export `toVanilla`, and
  `CustomizerCode.vue` renders the generated Vue SFC without branching on an
  engine

### Requirement: site chrome no longer frames the site as dual-engine

The runtime site chrome / SEO metadata SHALL present the site as Vue3-only. The
`App.vue` brand title and default description, and the changelog header copy,
MUST NOT describe the site as "two-engine" / "dual-engine" or reference a
"Vanilla" engine. (Guide-body prose is explicitly out of scope for this change —
see the proposal Non-goals — and is rewritten in the later `docs-content`
change.)

#### Scenario: brand and header copy drop the dual-engine framing

- **GIVEN** `App.vue` (its `BRAND_TITLE` / description strings) and the changelog
  header copy after this change
- **WHEN** they are read
- **THEN** none of them contains "two-engine", "dual-engine", or a "Vanilla"
  engine reference in the rendered site chrome

