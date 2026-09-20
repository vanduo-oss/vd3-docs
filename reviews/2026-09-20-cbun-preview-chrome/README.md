# CBUN preview simplification — 2026-09-20

Implemented on `dev-v177` after the tablet layout repair.

- Both previews now render directly inside their showcase columns. The outer
  card, duplicate component title, and card padding are removed.
- The adjacent Charts and Flowchart headings remain.
- Graph outline is hidden in the CBUN flowchart only. The shell now has two
  rows (toolbar and body), so the diagram receives the released height.
- The canvas accessible label no longer refers to the hidden outline.
- Search content was refreshed to remove the duplicate headings.

Production-build Chromium measurements at a viewport height of 1000px:

| Viewport width | Flowchart canvas height before | After |
| --- | ---: | ---: |
| 390 | 332px | 373px |
| 800 | 310px | 350px |
| 1024 | 310px | 350px |
| 1440 | 310px | 350px |

The before values come from the preceding responsive-repair review. Current
measurements, heading counts, outline visibility, and horizontal overflow
checks are in [measurements.json](measurements.json). Screenshots at each
listed width are retained alongside this report. Element screenshots include
the fixed site dock where the capture scrolls the showcase beneath it.

Validation:

- Existing 13 flowchart breakpoint/resize/interaction checks pass.
- Existing CBUN phone gutter check passes.
- CBUN desktop visual baseline refreshed for the requested layout change;
  phone, tablet, and desktop renders visually inspected.
- Confirmed Graph outline remains visible on `/canvas/flowchart`.
- Build, typecheck, lint, formatting, Stylelint, search-content validation,
  and diff whitespace checks pass. Lint was rerun after the build finished
  because its initial parallel run picked up temporary generated SSG files.
- OpenSpec change validated and archived. No dependency changes.

## Follow-up: chart outline

Added a simple 1px theme-aware border with 8px corners directly around the
chart, with no card padding or repeated heading. Phone and desktop captures
are `chart-outline-390.png` and `chart-outline-1440.png`; both were visually
inspected. Build, typecheck, component lint/formatting, search check, and the
existing CBUN phone gutter check pass. The CBUN visual baseline was refreshed
to include this subtle border explicitly, even below the pixel-diff tolerance.
