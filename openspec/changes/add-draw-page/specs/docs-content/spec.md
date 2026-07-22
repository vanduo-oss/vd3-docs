## ADDED Requirements

### Requirement: Draw component page

The docs site SHALL provide a live Draw page at `/canvas/draw`, under the existing **Canvas** category in the Components tab, rendering the real `VdDraw` from `@vanduo-oss/vd3-cbun/draw` (importing `@vanduo-oss/vd3-cbun/draw/css`) with no invented API. The page MUST demonstrate the interactive editor (drawing shapes, freehand, selection / move, and pan / zoom) and MUST document the component's props, events, and exposed methods. The page MUST be registered in BOTH `src/nav.ts` (a Canvas-category `NavSection` with a unique `id`, `route`, and search `keywords`) and `src/router.ts` (`componentPages`), and MUST NOT introduce any vanilla-engine reference or component-specific rule in `app.css`.

#### Scenario: page renders the live editor

- **GIVEN** the docs site after this change
- **WHEN** a user navigates to `/canvas/draw`
- **THEN** the page renders a live `VdDraw` editor under the Canvas nav category, themed by the active `--vd-*` palette, without console errors

#### Scenario: page is registered, routed, and searchable

- **GIVEN** the built route table and the search index
- **WHEN** `buildRoutes()` runs and a user searches the page's keywords
- **THEN** `/canvas/draw` resolves to the `Draw.vue` component (its `nav.ts` `id` matches its `router.ts` `componentPages` key), the route count stays consistent (`nav.pages` + sections + 2), and the page surfaces in search results

#### Scenario: page documents the real published API

- **GIVEN** the Draw page's API-reference card
- **WHEN** its props / events / methods tables are read
- **THEN** every entry corresponds to an actual member of the published `@vanduo-oss/vd3-cbun/draw` surface (`VdDraw` props/emits and exposed `undo`/`redo`/`toSVG`/`toPNG`/`getInstance`), with no invented API

#### Scenario: non-deterministic canvas page is excluded from visual baselines

- **GIVEN** the Playwright visual-parity suite
- **WHEN** its curated `ROUTES` list is enumerated
- **THEN** `/canvas/draw` is absent (following the charts / flowchart / hex precedent for non-deterministic canvas pages), so no pixel baseline is committed for it
