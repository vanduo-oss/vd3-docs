## MODIFIED Requirements

### Requirement: Draw component page

The docs site SHALL provide a live Draw page at `/canvas/draw`, under the existing **Canvas** category in the Components tab, rendering the real `VdDraw` from `@vanduo-oss/vd3-cbun/draw` (importing `@vanduo-oss/vd3-cbun/draw/css`) with no invented API. The page MUST demonstrate the interactive editor seeded with a rich vector illustration (`drawSeedDoc`), stage action controls (Reset Demo, Clear, Toggle Grid, Fullscreen), a live event/state inspector ribbon, an interactive multi-brush showcase grid, and an SVG/PNG Export Studio. It MUST document the component's props, events, and exposed methods. The page MUST be registered in BOTH `src/nav.ts` (a Canvas-category `NavSection` with a unique `id`, `route`, and search `keywords`) and `src/router.ts` (`componentPages`), and MUST NOT introduce any vanilla-engine reference or component-specific rule in `app.css`.

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

#### Scenario: the canvas pages are visual-baselined at their deterministic initial render

- **GIVEN** the Playwright visual-parity suite after this change
- **WHEN** its `ROUTES` list is enumerated
- **THEN** `/canvas/draw` is **present** (alongside `/canvas/{charts,flowchart,hex}`), so a `vd3-canvas-draw` baseline is committed — the earlier canvas-exclusion precedent is retired because the initial page-load render is deterministic (the non-deterministic behaviors — e.g. Hex's random terrain, MusicPlayer's wall-clock log — only fire on user interaction, which the suite does not perform)

#### Scenario: page loads with rich seed document and stage controls

- **GIVEN** the Draw page mounted in a browser
- **WHEN** the editor initializes
- **THEN** it renders the shared `drawSeedDoc` containing diagrams, sticky notes, colored arrows, and brush samples, and provides functional stage buttons for Reset Demo, Clear, Toggle Grid, and Fullscreen

#### Scenario: live state ribbon reflects tool, selection, and viewport events

- **GIVEN** the Draw page editor
- **WHEN** the user selects shapes, changes tools, or pans the canvas
- **THEN** the ribbon updates reactive badges showing the active tool, selected shape count, last event reason, and current viewport coordinates

#### Scenario: brush showcase cards allow one-click preset activation

- **GIVEN** the Multi-Brush Showcase section on the Draw page
- **WHEN** the user clicks "Select Brush" on any of the five preset cards
- **THEN** the editor's active tool switches to `draw` and the respective brush preset is activated on the core instance

#### Scenario: export studio produces SVG and PNG previews with download actions

- **GIVEN** the Export Studio section on the Draw page
- **WHEN** the user clicks "Export SVG" or "Export PNG"
- **THEN** a preview modal/card displays the generated asset, shows byte size and dimensions, and enables Copy SVG and file download
