# docs-content

## ADDED Requirements

### Requirement: the button page documents the ring modifier

`src/pages/components/Button.vue` SHALL live-render vd3's `.vd-btn-ring` modifier and document
it in both of the page's reference tables, so a reader can discover the modifier, see it
composed with the treatments it is meant to layer onto, and copy working markup.

#### Scenario: the page renders a live ring demo

- **GIVEN** the `/components/button` page after this change
- **WHEN** it is rendered
- **THEN** a demo card SHALL show real buttons carrying `.vd-btn-ring`, composed with solid
  variants, with a transparent-fill treatment, and across all three sizes
- **AND** the card SHALL follow the page's existing demo shape — a
  `.vd-card.vd-card-glow.demo-card` with a header and body, followed by a `DocCodeSnippet`
- **AND** the snippet SHALL reproduce the markup the card actually renders

#### Scenario: both reference tables list the modifier

- **GIVEN** the page's `classRef` and `vue3Api` tables
- **WHEN** they are rendered
- **THEN** `classRef` SHALL contain a `.vd-btn-ring` row typed as a modifier
- **AND** `vue3Api` SHALL contain a `:ring` row describing the `VdButton` prop
- **AND** the described surface SHALL match what `@vanduo-oss/vd3` actually ships — no invented
  props, and no `ring` variant, since the ring is a modifier rather than a variant

#### Scenario: the modifier is reachable from search

- **GIVEN** the button entry in `src/nav.ts`
- **WHEN** its `keywords` are inspected
- **THEN** they SHALL include `ring`, so docs search surfaces the button page for that term

#### Scenario: the changelog records the release, not the docs change

- **GIVEN** the `/changelog` page
- **WHEN** the `@vanduo-oss/vd3` column is rendered
- **THEN** a `v1.2.0` card SHALL describe the ring modifier and carry the "Latest" marker
- **AND** the previous `v1.1.0` card SHALL no longer carry it
- **AND** no card SHALL describe docs-site content, per the changelog policy
