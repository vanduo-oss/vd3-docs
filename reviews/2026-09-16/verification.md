# Audit verification record

Date: 2026-09-16. Baselines and local branches are recorded in `audit.md`.

## Existing checks

| Repository | Unit files | Unit tests | Build | Lint / format / style / types |
| --- | ---: | ---: | --- | --- |
| vd3 | 121 | 1,400 | Pass, including CSS selector coverage | Pass |
| vd3-charts | 8 | 159 | Pass, isolation/export checks included | Pass; two lint warnings |
| vd3-flowchart | 5 | 70 | Pass, isolation/export checks included | Pass; two lint warnings |
| vd3-docs | 59 | 232 | Pass, 95 static HTML outputs | Pass |

Total: 1,861 unit tests. VD3's integrated type tests also report no type errors. The chart/flowchart lint warnings concern assignments of an empty string to `innerHTML`; these particular warnings are not evidence of HTML injection. jsdom also reports unimplemented media/canvas methods in existing tests, so those passes do not validate actual canvas/media rendering.

| Browser/size check | Result |
| --- | --- |
| Charts Chromium packaging smoke | 7 passed |
| Flowchart Chromium packaging smoke | 3 passed |
| DocSite dedicated accessibility smoke | 12 passed under the existing rule exclusions; serious findings logged |
| DocSite full Chromium desktop suite | 116 passed, 13 failed, 53 seconds |
| DocSite size budget | 511.6 KiB gzip app JS + CSS; budget 600 KiB |

The desktop suite includes some explicitly resized mobile-layout cases; Firefox, WebKit, and the separate Chromium Mobile project were not run. Chart/flowchart browser smoke fixtures exercise the core factories, not the complete Vue wrapper lifecycle.

## Desktop failures

The dock's right-edge inset was 23.75px; the failing assertion permits at most 14.75px. The twelve visual mismatch routes were:

`/cbun`, `/changelog`, `/components/theme-switcher`, `/components/theme-customizer`, `/components/doc-search`, `/components/expanding-cards`, `/guides/troubleshooting`, `/guides/vd3-ecosystem`, `/effects/glass`, `/effects/surfaces`, `/effects/parallax`, `/components/navbar`.

The suite ran with `--update-snapshots=none`. Failure artifacts remain under the local `vd3-docs/test-results` and report output; those generated directories may be replaced by a later test run. The durable audit records the failing checks rather than accepting new baselines. Inspected CBUN and Theme Switcher comparison images show visible content/styling differences; their intendedness needs separate review.

## Targeted reproductions

Run `node reviews/2026-09-16/reproduce.mjs` from vd3-docs, using Node 24 and existing sibling installs. Build vd3 first so the tooltip export is available. The script does not modify package source, use network services, or run the retained HTML handler. It deliberately caps the controlled-flowchart feedback demonstration after four events.

Observed:

```text
Anchor sanitizer: onclick retained; style retained under default options.
Flowchart readonly toggle: node IDs [a,b] become [a].
Generic Vue pie: two arcs per slice (inner hole).
Named VdPieChart: two arcs per slice (inner hole).
Responsive false→true: zero ResizeObserver observe calls.
Chart update: previously focused mark disconnected; focus becomes BODY.
VdTooltip with shipped base CSS: opacity 0; pointer-events none; zero visible tooltips.
Controlled flowchart: node:add, load, load, load (harness stops at four).
```

The harness is diagnostic evidence, not a new package regression suite or a complete browser substitute. Its observations should become narrowly targeted regression tests alongside each fix.

## Inventory and measurement limits

`page-inventory.json` was extracted from the freshly built HTML with scripts disabled. Counts include text in paragraph elements under the main content, excluding navigation/aside/footer/code blocks. API table text, headings, and dynamic-only content are not included. Counts prioritize reading; they must not be used as automated deletion rules. The 95 outputs include aliases and exceed the 92 search documents for reasons that require route-aware comparison, not a simple count assertion.

Gzip measurements are reproducible local compression of built files. They exclude Vue, fonts, images, and browser caching and do not measure user-perceived loading performance. The existing DocSite size budget measures only app-prefixed JS/CSS files.

## Tooling notes

The default system Git and one Python resolution encountered an Xcode license prompt. The audit used the already installed GitHub Desktop Git and an installed Python 3.11 runtime instead. Local test servers required the granted sandbox exception. No license acceptance, software installation, security-setting change, push, or publication was performed.

The worktree was clean in every repository after all product checks and before adding the audit records. This establishes that the failures preceded any audit-document changes.
