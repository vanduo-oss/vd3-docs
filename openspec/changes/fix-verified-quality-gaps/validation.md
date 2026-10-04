# Local validation — 2026-10-04

Branch `dev-v179`, base `45ef97b5b53188a67050134b884bfc508bd16940`.
Validated with the built library from sibling `vd3` branch `dev-v175` (base `c4722f67e2da17f518390b8c53589a538b915284`) staged using `scripts/local-vd3.mjs`. The installed registry link was restored after QA. Registry pins remain unchanged; nothing was committed, pushed or deployed.

## Changes

- Button and Accordion snippets import the same real Vue SFCs rendered on the page. Both typecheck and have browser interaction checks; Accordion documents the actual v-model, items, exclusive behavior and slots.
- Fix invalid comma-RGB/slash-alpha CSS and remove docs-only primary overrides that conflict with the library's semantic colors.
- Clarify shared SSR/module state, storage-prefix limits, exported token format, highlighter import, browser/RTL scope and upgrade checks.
- Include TypeScript in ESLint and exercise the configuration with regression tests.
- Add rendered theme/contrast checks to CI, including the copied examples; extend accessibility smoke to Accordion.
- Refresh searchable content and three affected visual baselines. Keep existing routes and docs architecture.

## Results

| Check | Result |
| --- | --- |
| Unit tests | 57 files / 233 tests pass |
| Typecheck, lint, formatting, stylelint | Pass |
| Full SSG build | Pass; 95 URLs |
| Search corpus | 92 routes; 284,982 bytes; content check passes |
| Gzip budgets | Pass; homepage 370.8 KiB, largest checked docs page 393.8 KiB |
| Chromium theme and copied-example suite | 17 pass |
| Theme/example matrix across desktop Chromium, mobile Chromium, WebKit | 18 pass |
| Final mobile/WebKit examples after wrapping adjustment | 4 pass |
| Search/navigation/responsive smoke | 20 pass |
| Affected accessibility and visual checks | 16 pass |
| OpenSpec strict validation | 9 pass |

Theme checks cover 18 primary hues, two palettes, explicit light/dark and system modes under both OS schemes, primary/status RGB helpers, alpha and actual foreground/fill contrast. Low-alpha colors are compared after opaque compositing to avoid engine-specific premultiplication rounding. Desktop/mobile Button and Accordion rendering was inspected. Updated Button, Accordion and Troubleshooting screenshots are committed-source candidates, not a remote release.

Firefox was attempted after installing its Playwright binary. It could not open its temporary profile using either the default temporary directory or /private/tmp; no Firefox verification is claimed.

## Before merge/deploy

The exact library pin is still published `1.7.4`. New theme regressions pass against the staged fixed library and will expose defects in the old registry artifact. Release the library through a separately authorized release, then update the exact docs dependency and lockfile and rerun these checks. Do not merge the new docs CI gate while it still consumes the unfixed library.

The library also retains one unresolved development-tool advisory (`stylelint > micromatch > braces`, GHSA-vfj7-8cjw-p6xm; no patched version reported). Its audit gate was not bypassed. See the sibling library change's validation notes for the full implementation and audit results.

No A14 format migration or broad B1–B6 architecture work is included.

## Manual-review follow-up — 2026-10-04

Added a clearly marked Unreleased package card to /changelog and a target-panel
scrolling example to /components/popover (Auto flip and No flip). The bubble
intro now distinguishes target-panel flipping from bubble behavior. The library
Markdown changelog also explicitly lists the Fibonacci hover correction.

Rebuilt all 95 URLs against the staged fixed library, refreshed search (285,294
bytes), and restored the installed registry link. Typecheck, lint, the changelog
unit contract and content check pass. Two visual baselines refreshed and reviewed.
A Chromium check confirmed both panels follow a 40px nested scroll and close on
Escape; mobile rendering was inspected. The production preview is left running
at http://127.0.0.1:8787/ for the user's manual review; it serves the fixed build
without requiring a published package or changing committed dependency pins.
