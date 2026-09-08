# Docs Content

## MODIFIED Requirements

### Requirement: the ecosystem guide describes the three-repo vd3 line

`guides/VanduoEcosystem.vue` SHALL be rewritten to describe the three-repo vd3
line — `vd3-docs` (the docs site), `vd3` (the Vue 3 component library with tokens
and CSS), and `vd3-cbun` (the canvas bundle: charts / flowchart / hex-grid /
music-player) — plus a short note that the old vanduo v2 line was retired on
2026-07-25 and vd3 is the only maintained line. It MUST NOT present "pick an
engine (Vanilla or Vue)" framing or the old four-separate-add-on-package install
grid. It MUST NOT use "maintenance mode" or "critical fixes" wording for the
old line.

#### Scenario: the ecosystem guide names the three vd3 repos

- **GIVEN** `guides/VanduoEcosystem.vue` after this change
- **WHEN** it is read
- **THEN** it names `vd3-docs`, `@vanduo-oss/vd3`, and `@vanduo-oss/vd3-cbun`,
  carries the old-line retirement note, and contains no "when to use the Vanilla
  engine" / "when to use the Vue 3 engine" choice section

#### Scenario: the ecosystem guide confines retired package names to migration

- **GIVEN** `guides/VanduoEcosystem.vue` after this change
- **WHEN** the retirement card is read
- **THEN** it SHALL NOT name individual retired package slugs (`core`, `framework`,
  `vue`, etc.)
- **AND** it SHALL link to `/guides/migration` for the package map
