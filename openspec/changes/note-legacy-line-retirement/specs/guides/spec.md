# Guides

## ADDED Requirements

### Requirement: The migration guide SHALL state that the legacy line is retired

`/guides/migration` SHALL tell a reader arriving from the legacy line that the line is
retired, not merely older. The notice SHALL appear above the package map, so it is read
before any migration mechanics.

#### Scenario: A reader opens the migration guide
- **GIVEN** a reader on `/guides/migration`
- **WHEN** the page renders
- **THEN** an informational alert SHALL appear between the intro paragraph and the package map
- **AND** it SHALL state that the legacy line was retired on 2026-07-25
- **AND** it SHALL state that vd3 is the only maintained line

#### Scenario: A reader wants to know whether their app is about to break
- **GIVEN** a reader still depending on a v2 package
- **WHEN** they read the notice
- **THEN** it SHALL state that the v2 packages stay published and keep working
- **AND** it SHALL NOT imply that the packages were unpublished or removed

#### Scenario: A reader checks whether they are on the final version
- **WHEN** the notice is read
- **THEN** it SHALL name the final frozen version of each retired package
- **AND** it SHALL mention that installing one now surfaces a deprecation notice

#### Scenario: A reader needs the old documentation
- **WHEN** the notice is read
- **THEN** it SHALL link the frozen legacy documentation site at `https://vanduo-oss.github.io/vd2/`

### Requirement: The notice SHALL be rendered by a real vd3 component

The notice SHALL dogfood a published vd3 component rather than hand-rolled `.vd-alert`
markup, and the component SHALL be imported explicitly.

#### Scenario: The alert is authored
- **WHEN** the notice markup is written
- **THEN** it SHALL use `VdAlert` from `@vanduo-oss/vd3`
- **AND** `VdAlert` SHALL be imported in the page's `<script setup>`, because the
  `VanduoVue` plugin applies `themeDefaults` only and registers no global components

#### Scenario: The page is styled
- **WHEN** the alert renders
- **THEN** all of its styling SHALL come from the vd3 package
- **AND** `app.css` SHALL NOT gain any rule for it

### Requirement: The legacy reference SHALL stay confined and retrospective

A vanilla-engine package name SHALL appear only on `/guides/migration`, and only as a
record of what a reader is leaving behind.

#### Scenario: Another page is written
- **WHEN** any page other than `/guides/migration` is authored
- **THEN** it SHALL NOT reference the vanilla engine

#### Scenario: The migration guide names a vanilla package
- **WHEN** `@vanduo-oss/framework` appears in the notice
- **THEN** it SHALL appear only as a frozen version number a reader is migrating away from
- **AND** the page SHALL NOT document vanilla usage, APIs, snippets, or runtime behaviour
