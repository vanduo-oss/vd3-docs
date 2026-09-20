# Docs 1.7.7 navigation: RCA, decision, and local evidence

20 September 2026. Local branch `dev-v177`; no push, PR, merge to main, or deployment.

## Decision

Use 15 eager lightweight component pages and retain lazy loading for the rest.
This removes the first-click network dependency from ordinary reference browsing
without paying the all-eager startup cost. Remaining lazy destinations have
hover/focus prefetch, pending sidebar feedback, a delayed progress bar, and an
accessible error/reload action. Tests cover keyboard and touch as well as mouse.

Eager pages: Button, Badge, Alert, Card, Dropdown, Tabs, Accordion, Avatar,
Tooltip, Breadcrumb, Chip, Progress, Spinner, Separator, and Switch. This is a
measured starting set, not an analytics-derived popularity ranking. Charts,
Flowchart, CBUN, changelog, and all other routes remain lazy.

## Root cause

Commit `dc9115f` in the docs 1.7.6 work changed every page from static imports to
route-level dynamic imports. Vue Router waits for route modules before committing
the destination. The old article and selected link therefore stayed unchanged
while new files downloaded. No loading state or prefetching accompanied that
change. The release gates measured initial bytes and already-settled pages,
leaving click-to-content behavior uncovered. The problem is in docs routing;
there is no evidence of a general navigation delay introduced by vd3 1.7.4.

Fetched `origin/main` at `7c6e304`, created the requested branch, and fast-forwarded
the existing local published-package update `473c204`. All compared builds use
vd3 1.7.4, charts 1.1.1, and flowchart 1.3.0. The baseline is the 473c204 router;
the all-eager trial replaces all dynamic page imports with static imports; the
hybrid keeps the explicit 15-page set. Only the hybrid is retained in source.

## Measured trade-off

Gzip JS + CSS reachable at initial load, including static imports and modulepreloads:

| Initial route | Baseline, all lazy | Final hybrid | All eager |
| --- | ---: | ---: | ---: |
| Home | 342.4 KiB | 374.4 KiB | 592.1 KiB |
| Button | 336.4 KiB | 363.4 KiB | 592.1 KiB |
| Charts | 347.3 KiB | 379.3 KiB | 592.1 KiB |
| Flowchart | 355.7 KiB | 387.7 KiB | 592.1 KiB |

The home budget remains 375 KiB. The docs budget increases from 375 to 390 KiB
for this explicit trade-off: about 27–32 KiB more compressed initial payload,
substantially faster lightweight navigation, and no material initial readiness
regression in this sample. The all-eager candidate fails these limits.
Fonts, images and remote resources are outside the byte budget; these totals
are not whole-page transfer sizes. Search is 281,656 bytes uncompressed.

Under the constrained profile, initial Button-page readiness medians were
**3,765 ms baseline, 3,782 ms hybrid, and 5,085 ms all eager**.
The roughly 17 ms baseline/hybrid difference is too small to treat as a reliable
speed difference in three samples. The all-eager candidate was about 1.3 seconds
slower. This measured startup timing is for direct entry to Button, not Home.

First-click-to-content median milliseconds, same constrained profile:

| Destination | Baseline | Hybrid | All eager |
| --- | ---: | ---: | ---: |
| /components/badge | 179 | 62 | 72 |
| /components/alert | 155 | 37 | 37 |
| /components/card | 174 | 42 | 42 |
| /components/dropdown | 175 | 33 | 34 |
| /components/tabs | 194 | 51 | 52 |
| /components/accordion | 187 | 63 | 64 |
| /components/avatar | 158 | 28 | 26 |
| /components/modal | 225 | 222 | 38 |
| /components/tooltip | 163 | 41 | 34 |
| /core/color-palette | 211 | 268 | 51 |
| /canvas/charts | 308 | 400 | 124 |
| /components/button | 32 | 39 | 33 |
| /components/badge | 24 | 27 | 26 |

The last two rows are cached revisits. For the eight first-visited eager pages
in this sequence, hybrid medians are 28–63 ms versus 155–194 ms baseline.
Unthrottled navigation is generally around one frame faster; network-sensitive
first visits show the meaningful improvement.

**Limit:** this is not a universal speed improvement. Lazy pages still wait when
clicked before prefetch completes. The settled-start run measured Color palette
at 211→268 ms and Charts at 308→400 ms. Waiting for startup network activity to
settle did not remove that difference. Its precise browser scheduling/transfer
cause is not established, so no claim is made that hybrid improves cold canvas
navigation. Those routes receive loading feedback and can be cached by prior
hover/focus. The all-eager approach avoids their downloads but has the larger
startup cost above. No download delay remains on the 15 eager destinations.

## Method and limits

- Installed Chromium 153.0.8010.12, darwin arm64, Apple M4; Node 24.17.0.
- Three fresh browser contexts per strategy/profile, serial runs. Production
  SSG output served by the same local HTTP server with gzip and asset caching.
- Constrained profile: 100 ms configured latency, 1.6 Mbps download,
  0.75 Mbps upload, 4× CPU slowdown; also ran unthrottled local Chromium.
- Initial readiness: the app hydration marker plus two animation frames.
- Navigation: capture the real click event; observe changed article DOM and the
  committed destination; stop after two animation frames. This is a paint
  opportunity proxy, not a compositor trace, field INP, or exact display time.
- `baseline-settled.json` and `hybrid-settled.json` wait for initial network idle
  before starting the click sequence and move the pointer off the sidebar before
  scrolling. This prevents incidental hover prefetches of unrelated links.
- Earlier immediate-start runs remain in `baseline.json`, `hybrid-imports.json`,
  `hybrid-final.json`. `eager.json` is the all-eager immediate-start comparison.
  Initial readiness remains measured before the settled-start wait. Resource
  arrays record requests starting after the click; prefetches begun before the
  click may therefore be absent from those arrays despite still being in flight.
- External resources, including Google Fonts, are blocked consistently in the
  benchmark. This is controlled local evidence, not live CDN/mobile-device data.
- Small sample size: medians support this local choice but not p95 claims or
  guaranteed milliseconds on another device/network.

Reproduce the final hybrid (Node 24+):

```sh
pnpm build
pnpm test:size
node reviews/2026-09-20-navigation/benchmark.mjs dist /tmp/vd3-hybrid.json --settled
```

Rebuild the comparison candidates from the router strategies above with the
same package pins. Temporary comparison builds used in this session are outside
the repository; raw results and the benchmark are retained here.

## Verification

- Production SSG build: 95 HTML outputs / 92 canonical search documents.
- Unit suite: 237 tests pass, including 7 new navigation lifecycle tests.
- Typecheck, lint, stylelint, formatting, canonical search, and size gates pass.
- All 149 pre-existing Chromium Desktop cases pass, including 26 light/dark
  accessibility cases and the existing visual baselines. No baselines changed.
- Five new navigation cases pass on desktop and Pixel 7 touch emulation (10).
  They cover no-download eager browsing, held downloads, failed downloads,
  keyboard prefetch, and overlapping navigation. Pending/error UI also passes
  targeted axe checks; reduced-motion animations are disabled.
- The first full run was 153 passed / 1 failed: the new no-download test
  incidentally hovered Charts while scrolling. Moving the pointer away before
  automatic scrolling isolated the intended behavior; all 10 new desktop/mobile
  cases then passed. No production behavior or assertion was weakened to fix it.
- Inspected pending/error screenshots for desktop and mobile; copies are kept
  alongside this report. The old article remains visible and the error action
  fits within the narrow viewport.
- CI smoke now includes docs-navigation as well as global-search (7 cases
  pass), so the navigation contract runs in the existing CI job.

## Implementation details

Navigation state is app-scoped; its hooks/timers are disabled during SSG and
removed on app unmount. Feedback starts in beforeEach, before async route
resolution. A normalized-route identity check prevents old completion/failure
callbacks from clearing a newer pending destination. Success, abort, duplicate
navigation, cancellation, and errors clear pending feedback appropriately.

The shell shows a pending VdSpinner immediately when navigation actually waits;
the indeterminate bar and polite announcement appear after 150 ms. Main is
marked busy. Failed chunk loads keep the article and provide a full-page reload
link (useful after an asset deployment as well as connection errors). No forced
minimum spinner time or full-article skeleton is used.

Sidebar hover/focus calls Vue Router's public loadRouteLocation; concurrent
prefetches for the same route are coalesced. Prefetch is skipped when saveData,
slow-2g, or 2g is reported. Speculative errors stay silent. Browser support for
connection hints varies; no universal data-saving detection is claimed.

References: [Vue performance](https://vuejs.org/guide/best-practices/performance),
[Vue Router lazy loading](https://router.vuejs.org/guide/advanced/lazy-loading).
