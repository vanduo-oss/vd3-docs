## Context

The `/canvas/draw` page was established when `VdDraw` was introduced. While functionally displaying the component, it lacked a showcase demonstrating the full breadth of the component's capabilities: vector brush presets, sticky notes, dynamic connector arrows, state reflection, and export formats.

This change transforms the Draw page into a showcase and interactive playground adhering strictly to `vd3-docs` standards (dogfooding real package APIs, zero invented properties, no component-specific CSS in `app.css`, and 100% SSR-safe prerendering).

## Goals / Non-Goals

**Goals:**
- Provide an impressive vector illustration and diagram on page load using a deterministic seed document.
- Give developers stage action buttons to quickly reset, clear, toggle the grid, or enter fullscreen.
- Render a live state ribbon displaying active tool, selection count, latest event reason, and real-time viewport coordinates.
- Include a dedicated brush showcase section comparing the 5 brush presets and allowing immediate tool/brush switching.
- Provide an Export Studio allowing users to export SVG or PNG, preview the generated asset in-page, copy SVG markup, and download image files.
- Ensure 100% clean SSG prerendering across all routes.

**Non-Goals:**
- No invented or unreleased API methods on `VdDraw`.
- No modification of `app.css`.
- No new route or nav sections.

## Decisions

### D1 — Shared Deterministic Seed Document (`src/constants/drawSeed.ts`)
- To prevent duplication between `CbunPreviewDraw.vue` (component preview card) and `Draw.vue` (the documentation page), `drawSeedDoc` is extracted to `src/constants/drawSeed.ts`.
- The document defines a complete, visually balanced scene:
  - Architecture diagram box (`rectangle`) with title text.
  - Multi-line sticky note (`sticky`) demonstrating typography and layout.
  - Color-matched connector arrow (`line` with `arrow: true`).
  - Status indicator (`ellipse`).
  - Five calibrated stroke samples for `pen`, `pencil`, `marker`, `highlighter`, and `calligraphy` with descriptive text labels.
- The document is deterministic, ensuring reproducible SSG output without hydration mismatches.

### D2 — Stage Action Ribbon
- Placed in the header of the primary canvas card.
- Buttons provide direct access to core methods via the template ref:
  - **Reset Demo:** Re-loads `drawSeedDoc` via `drawRef.value?.load(drawSeedDoc)`.
  - **Clear:** Empties all shapes via `drawRef.value?.clear()`.
  - **Toggle Grid:** Toggles reactive `showGrid` boolean bound to `:grid-size="showGrid ? 24 : 0"`.
  - **Fullscreen:** Toggles native `requestFullscreen()` on the stage container element.

### D3 — Live Event & Viewport Ribbon
- Listens to public events: `@change`, `@select`, and `@viewport`.
- Displays real-time metrics in badge pills:
  - Active tool (`tool`).
  - Selection count (`selectedCount`).
  - Last change event reason (`lastEventReason`).
  - Viewport coordinates (`x`, `y`, `scale` formatted to 2 decimals).

### D4 — Multi-Brush Showcase Grid
- Displays 5 cards for the frozen brush presets (`pen`, `pencil`, `marker`, `highlighter`, `calligraphy`).
- Each card documents its size, thinning, smoothing, and blend characteristics.
- Clicking a card's "Select Brush" button sets `currentTool = 'draw'` and calls `drawRef.value?.getInstance()?.setBrush(preset.id)`.

### D5 — Export Studio
- Provides "Export SVG" and "Export PNG" action buttons.
- Captures exported content:
  - SVG via `drawRef.value?.toSVG()`, rendered in an inline `<pre>` code block and live preview.
  - PNG via `drawRef.value?.toPNG()`, rendered as an `<img>` tag with byte size calculation.
- Supports "Copy SVG" to clipboard with brief visual confirmation toast and direct file download via dynamic `<a>` download anchor.

## Risks / Trade-offs

- **[SSG Safety with Export & Fullscreen]** Browser APIs (`document.fullscreenElement`, `navigator.clipboard`, `URL.createObjectURL`) are only accessible client-side.
  *Mitigation:* All browser DOM calls are encapsulated within user-interaction click handlers or guarded by `typeof window !== 'undefined'`.
- **[Export Latency with High Shape Counts]** `toPNG()` uses an offscreen canvas.
  *Mitigation:* Execution is asynchronous and displays loading states during rasterization.
