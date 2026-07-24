## ADDED Requirements

### Requirement: component demo pages open with a one-line intro

Every component **demo** page under `src/pages/components/` that renders a
`demo-title` — plus the cbun demo pages `editors/CodeEditor.vue` and
`media/MusicPlayer.vue` — SHALL render exactly one one-line intro `<p>` directly
under its `demo-title` (or the `lcc-demo-head` block that wraps it), describing
the component in plain language with no invented component or composable API. The
intro `<p>` SHALL carry the spacing token `vd-mb-8` and SHALL NOT be muted
(`vd-text-muted`), matching the majority convention across the demo family. The
nine pages that previously lacked an intro — `Button`, `ButtonGroups`, `Chip`,
`Collection`, `Scrollspy`, `Table`, `Avatar`, `Flow`, `Toast` — SHALL each gain
one. This change SHALL NOT add or alter any heading, and the guide/effect prose
pages (their own `vd-mb-6` lead convention) are out of scope.

#### Scenario: every component demo page has a normalized intro

- **GIVEN** any page under `src/pages/components/` that renders a `demo-title`
- **WHEN** the first paragraph under the demo-title is read
- **THEN** there is exactly one intro `<p class="vd-mb-8">` (not muted)
  describing the component, and the nine previously-missing pages now include one

#### Scenario: the intro names only real APIs

- **GIVEN** the `Toast` and `Scrollspy` intros after this change
- **WHEN** their prose is read
- **THEN** `Toast` names the real `useToast` composable and `Scrollspy` names the
  real `useWaypoint` composable, with no invented component or composable

## MODIFIED Requirements

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

#### Scenario: the canvas pages are visual-baselined at their deterministic initial render

- **GIVEN** the Playwright visual-parity suite after this change
- **WHEN** its `ROUTES` list is enumerated
- **THEN** `/canvas/draw` is **present** (alongside `/canvas/{charts,flowchart,hex}`), so a `vd3-canvas-draw` baseline is committed — the earlier canvas-exclusion precedent is retired because the initial page-load render is deterministic (the non-deterministic behaviors — e.g. Hex's random terrain, MusicPlayer's wall-clock log — only fire on user interaction, which the suite does not perform)
