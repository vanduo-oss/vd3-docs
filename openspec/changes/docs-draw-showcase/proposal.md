## Why

The `/canvas/draw` page was previously rendering a minimal, uncurated demo (a simple hardcoded sine-wave stroke and blank canvas), failing to showcase `VdDraw`'s vector brush engine, typography, arrow connectors, and export capabilities.

To provide a superior developer demonstration and dogfood the full capabilities of `@vanduo-oss/vd3-cbun/draw`, the Draw documentation page and preview components need a comprehensive showcase upgrade:
1. A rich initial vector document demonstrating diagrams, multi-line sticky notes, dynamic color-matched arrows, and all five brush presets (`pen`, `pencil`, `marker`, `highlighter`, `calligraphy`).
2. Interactive stage controls (Reset Demo, Clear Canvas, Toggle Grid, Fullscreen).
3. A live event and state inspector ribbon tracking `@change`, `@select`, and `@viewport` in real time.
4. An interactive brush showcase grid explaining brush characteristics and enabling one-click brush selection.
5. An interactive SVG and PNG Export Studio with live in-browser preview, instant clipboard copying, and download triggers.

## What Changes

**Pages / Routes:**
- **Modified:** `src/pages/canvas/Draw.vue` (route `/canvas/draw`), `src/components/cbun/CbunPreviewDraw.vue`.
- **Added:** `src/constants/drawSeed.ts` (shared rich showcase document fixture).
- None added, renamed, or removed from `src/nav.ts` or `src/router.ts`.

**Details:**
- **Shared Seed Document (`src/constants/drawSeed.ts`):** Defines `drawSeedDoc` containing a diagram card, multi-line sticky note with `<tspan>` layout, color-matched connector arrow, badge ellipse, and distinct stroke samples for all 5 brushes with descriptive labels.
- **Stage Action Ribbon:** Adds stage controls to the primary editor card: `Reset Demo`, `Clear`, `Toggle Grid`, and `Fullscreen`.
- **Live Event & Viewport Ribbon:** Displays reactive badges for active tool, selection count, last event reason, and current viewport coordinates (`x`, `y`, `scale`).
- **Interactive Multi-Brush Showcase:** Renders a dedicated playground grid detailing each brush preset (`pen`, `pencil`, `marker`, `highlighter`, `calligraphy`), their stroke characteristics, and quick-select buttons that update the editor.
- **Vector & Raster Export Studio:** Integrates an export playground that calls `ref.toSVG()` and `ref.toPNG()`, previews output in a side-by-side card, and supports Copy SVG to clipboard and Download SVG/PNG.
- **Component Preview Dogfooding (`src/components/cbun/CbunPreviewDraw.vue`):** Uses the shared `drawSeedDoc` to present an eye-catching vector diagram in component preview cards.

## Non-goals

- No new routes or nav hierarchy changes (`/canvas/draw` remains under Canvas category).
- No changes to `app.css` (stays shell/layout-only).
- No invented `VdDraw` APIs or wrapper properties — calls only public methods documented in `@vanduo-oss/vd3-cbun/draw`.
- No docs-site entries in package changelogs.

## Capabilities

### New Capabilities
- (none)

### Modified Capabilities
- `docs-content`: expands the `Draw component page` requirement to specify the rich showcase stage controls, live event inspector ribbon, multi-brush playground, and SVG/PNG export studio.

## Impact

- **Source:** `src/pages/canvas/Draw.vue`, `src/components/cbun/CbunPreviewDraw.vue`, `src/constants/drawSeed.ts`.
- **Build:** `vite-ssg` pre-renders all routes clean (101/101).
- **Tests:** `pnpm test` (unit tests for nav/routing stay green).
