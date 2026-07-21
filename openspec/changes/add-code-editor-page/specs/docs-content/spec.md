## ADDED Requirements

### Requirement: Code Editor component page

The docs site SHALL provide a live Code Editor page at `/editors/code-editor`,
under a new **Editors** category in the Components tab, rendering the real
`VdCodeEditor` from `@vanduo-oss/vd3-cbun/code-editor` (no invented API). The
page MUST demonstrate `v-model` editing, language selection across the supported
languages, and the read-only, wrap, line-number-gutter, placeholder, and copy
features, and MUST document the component's props, events, and exposed methods.

#### Scenario: page renders the live editor

- **GIVEN** the docs site after this change
- **WHEN** a user navigates to `/editors/code-editor`
- **THEN** the page renders a live `VdCodeEditor` with syntax-highlighted content
  under the Editors nav category, without console errors

#### Scenario: typing updates the bound value

- **GIVEN** the `v-model` demo on the page
- **WHEN** the user types in the editor
- **THEN** the bound value displayed on the page updates to match the editor
  contents

#### Scenario: read-only demo blocks input

- **GIVEN** the read-only demo on the page
- **WHEN** the user attempts to type into it
- **THEN** the editor contents do not change

#### Scenario: page is registered in nav, router, and search

- **GIVEN** `src/nav.ts` and `src/router.ts`
- **WHEN** the app builds routes
- **THEN** `/editors/code-editor` resolves to the CodeEditor page under the
  Editors category, the section appears in the sidebar, and its `keywords` feed
  the search index
