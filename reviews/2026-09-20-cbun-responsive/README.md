# CBUN flowchart tablet repair — 2026-09-20

Branch: `dev-v177`. Production build served locally at `http://127.0.0.1:8787/cbun`.
Published flowchart dependency remains `@vanduo-oss/vd3-flowchart@1.3.0`.

## Root cause

The CBUN preview hides the full editor's inspector and keeps an 88px side
palette. It overrode the editor's grid columns, but only reset its rows at the
phone breakpoint (768px). The editor's own tablet rules reserve inspector rows
below 1180px and switch to a horizontal palette below 840px. Those rules still
applied to the compact preview, leaving its canvas only 33–38px high between
769 and 1180px. Below 769px the existing phone override masked the problem;
above 1180px the editor did not reserve the extra rows.

The existing desktop screenshot and 390px phone gutter check did not cover the
broken range. This is a responsive layout conflict; the navigation loader is
not involved. The reproduction does not establish which historical release
first introduced the conflict.

## Repair

`CbunPreviewFlowchart.vue` now explicitly sets a single body row at every
width. Its retained side palette stays vertical, with a side border instead
of the full editor's tablet bottom border. These rules are scoped to the CBUN
preview.

A ResizeObserver watches the actual canvas and schedules fitting on the next
animation frame. This also handles parent-column changes and toolbar wrapping
without requiring a window resize. The existing phone fitting and manual Fit
control remain active. The observer and pending frame are cleaned up when the
preview unmounts. Resizing this showcase intentionally resets its pan/zoom to
fit; ordinary editing and zooming do not resize the canvas and are unaffected.

## Before and after

Fresh Chromium pages, viewport height 1000px, production assets, no network or
CPU throttling. Each preview wrapper is 420px high; toolbar/status occupy the
remaining space outside the canvas. Measurements are CSS pixels, rounded.

| Viewport width | Canvas height before | Canvas height after |
| --- | ---: | ---: |
| 390, 768 | 332 | 332 |
| 769, 800, 840 | 33 | 310 |
| 841, 900, 901, 1024, 1180 | 38 | 310 |
| 1181, 1440 | 310 | 310 |

Raw measurements: [before](before.json), [after](after.json).
Screenshots: [800px before](before-800.png), [800px after](after-800.png),
[1024px before](before-1024.png), [1024px after](after-1024.png).
Phone and desktop screenshots are retained alongside these files.

Reproduce the measurements against an already built/served revision:

```sh
node reviews/2026-09-20-cbun-responsive/inspect.mjs after
```

## Verification

- 13 new Chromium tests pass: 12 widths straddling all relevant breakpoints,
  plus viewport/container resizing, centered and contained nodes, toolbar and
  palette overflow, manual zoom/Fit, and navigation away without page errors.
- Existing CBUN desktop visual baseline and phone gutter test pass unchanged:
  15 targeted browser checks total.
- The new breakpoint suite is included in `test:smoke` for future CI runs.
- Production SSG build, typecheck, ESLint, Stylelint, source formatting, search
  content check, bundle-size check, and diff whitespace check pass.
- No dependency or published package changes. Existing navigation changes and
  their byte budgets remain intact.

Validation in this follow-up used Chromium. Firefox and WebKit were not run.
