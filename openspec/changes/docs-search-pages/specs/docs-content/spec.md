# docs-content

## ADDED Requirements

### Requirement: Global search component page

The docs site SHALL expose `/components/global-search` documenting `VdGlobalSearch`
and `useGlobalSearch` with a live in-memory adapter demo.

#### Scenario: Reader finds palette API

- **WHEN** a reader opens `/components/global-search`
- **THEN** the page MUST show shortcut table, props/emits, composable options, CSS
  variables, accessibility notes, and links to Doc Search and hybrid search guide

### Requirement: Hybrid search guide

The docs site SHALL expose `/guides/hybrid-search` documenting vdl-hybrid-search 0.2.0
indexing, presets, tuning, eval, and troubleshooting.

#### Scenario: Reader learns indexing

- **WHEN** a reader opens `/guides/hybrid-search`
- **THEN** the page MUST describe `vdl-hybrid-index`, JSON schemas, and preset table
  sourced from `EMBEDDING_PRESETS`

### Requirement: Changelog 1.7.0

The vd3 package changelog section MUST include a v1.7.0 card with the Latest badge
and MUST document `VdGlobalSearch` as the headline feature.

#### Scenario: Reader sees the palette called out

- **WHEN** a reader opens `/changelog`
- **THEN** the v1.7.0 card carries the Latest badge and names `VdGlobalSearch`,
  linking to `/components/global-search`
