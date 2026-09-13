## 1. Showcase Seed Document (`src/constants/drawSeed.ts`)

- [x] 1.1 Create `src/constants/drawSeed.ts` defining `drawSeedDoc` with architecture diagram box, multi-line sticky note, colored connector arrow, status ellipse, and five distinct brush stroke samples
- [x] 1.2 Update `src/components/cbun/CbunPreviewDraw.vue` to dogfood `drawSeedDoc` for consistent visual presentation

## 2. Interactive Stage & Controls (`src/pages/canvas/Draw.vue`)

- [x] 2.1 Bind `drawSeedDoc` as the initial document for `<VdDraw :data="drawSeedDoc" />`
- [x] 2.2 Add stage action buttons in the canvas header: Reset Demo, Clear, Toggle Grid, Fullscreen
- [x] 2.3 Implement live event and viewport ribbon displaying reactive badges for tool, selection count, last event reason, and viewport coordinates (`x`, `y`, `scale`)

## 3. Multi-Brush Showcase & Export Studio (`src/pages/canvas/Draw.vue`)

- [x] 3.1 Build interactive Multi-Brush Showcase grid displaying specs for `pen`, `pencil`, `marker`, `highlighter`, and `calligraphy` with one-click "Select Brush" action buttons
- [x] 3.2 Build Export Studio card with "Export SVG" and "Export PNG" action buttons, live in-browser preview, byte size display, "Copy SVG" clipboard button, and file download actions

## 4. Gates & Verification

- [x] 4.1 Run `pnpm build` in `vd3-docs` and verify all 101/101 routes prerender cleanly via `vite-ssg`
- [x] 4.2 Run `pnpm test` in `vd3-docs` (nav, router, and draw unit tests passing)
- [x] 4.3 Validate OpenSpec change with `npx openspec validate docs-draw-showcase --strict`
