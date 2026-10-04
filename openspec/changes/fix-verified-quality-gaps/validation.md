# Local validation — 2026-10-04

Branch `dev-v179`, base `45ef97b5b53188a67050134b884bfc508bd16940`.
Validated with the built library from sibling `vd3` branch `dev-v175` (base `c4722f67e2da17f518390b8c53589a538b915284`) staged using `scripts/local-vd3.mjs`. The installed registry link was restored after QA. Registry pins remain unchanged. Accepted work was subsequently checkpointed as `df7b275`; the manual-review follow-up is committed separately. Nothing was pushed or deployed.

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

## Accepted brand-preserving demo fixes — 2026-10-04

Only the actual site dock saves mode and per-scheme primary choices. The package's
automatic persistence is disabled at bootstrap. Saved dock choices and active
previews have separate owners; saving from the dock uses a fresh brand preference
snapshot, never the current preview font, palette, radius or neutral scale.
Reload restores Nunito, Open Color, radius 0.5 and scheme-appropriate neutral
styling, plus those dock choices. Component Reset and hover do not change storage.

Removed forced font CSS while retaining initialization defaults. The customizer
and switcher explain temporary changes; the customizer hides palette selection and
the redundant external toggle button. Library Fibonacci support, API docs and
programmatic toggle remain. Corrected dock tint/follow-theme snippets, froze ten
miniature previews, repaired footer examples and padding, and allowed the mobile
Navbar to sit above its backdrop inside demo cards. About reuses the new compact
gradient separator. Popover examples use actual keyboard-accessible buttons and
explain click/tap, Enter/Space, Escape, outside dismissal and tooltip use.

Final checks:

- 58 unit files / 235 tests; lint, typecheck, format and stylelint pass.
- SSG build: 95 URLs; search: 92 routes / 286,888 bytes; content gate passes.
- Gzip budgets pass: homepage 371.6 KiB, largest checked docs page 394.7 KiB.
- Theme/demo matrix: 38 pass / 1 touch-only hover skip across Chromium desktop,
  Chromium mobile and WebKit. Final demo cases rechecked after the footer fix;
  responsive footer spacing verified again in all three projects.
- 18 affected light/dark accessibility checks pass without exclusions.
- Ten affected visual routes pass; four baselines refreshed and visually reviewed.
  Final customizer/separator edits checked again. Desktop/mobile footer screenshots
  and the live gradient were inspected.
- Strict OpenSpec validation: 9 pass. Firefox remains unverified for the previously
  recorded local launch failure.

To reproduce source checks before the library release: build sibling vd3, run
`node scripts/local-vd3.mjs stage`, then run the docs checks/build. Finish with
`node scripts/local-vd3.mjs restore`. No dependency pin or lockfile is changed.
The running production preview serves the fixed build after restoration.

### Manual QA

1. [Customizer](http://127.0.0.1:8787/components/theme-customizer): use its own trigger
   or open control; preview visibly different fonts, radius and neutral scale.
   Confirm the notice and hidden palette selector. Close with its X/Escape;
   verify programmatic close on desktop. Reset must leave saved dock choices intact.
2. [Theme switcher](http://127.0.0.1:8787/components/theme-switcher): menu and cycle
   controls must visibly change the page. While demo styles are active, select mode
   and color in the top site dock, then make further demo changes and reload:
   only dock mode/per-scheme colors survive; Nunito and the other brand defaults return.
3. [Oola Dock](http://127.0.0.1:8787/components/dock): select Accent and change colors.
   Brand and active glyph must respond; labels and inactive glyphs stay neutral.
   Follow theme must track the site primary; copied code includes tint-mode.
   All ten small tint previews keep their orientation; the main playground still works.
4. [Footer](http://127.0.0.1:8787/components/footer): desktop columns align, copyright
   spans them with bottom breathing room, and mobile stacks without overflow.
   Check both footer variants under both page themes.
5. [Navbar](http://127.0.0.1:8787/components/navbar): at phone width, closed menus
   must not cause sideways scrolling or accept focus. Open, dismiss with Escape
   (focus returns to toggle), reopen and select a link. Check desktop links.
6. [Separator](http://127.0.0.1:8787/components/separator#demo-separator-gradient)
   and [About](http://127.0.0.1:8787/about): inspect compact, labeled and vertical
   gradients; change primary and theme to check their colors.
7. [Popover](http://127.0.0.1:8787/components/popover): click/tap and Enter/Space
   activation; Escape and outside dismissal; reopen immediately after Escape.
   Check the nested-scroll auto-flip/no-flip examples.
8. [Unreleased changelog](http://127.0.0.1:8787/changelog#vd3-unreleased): confirm
   these changes appear as an unpublished development preview.

Audit policy is unchanged; no exception added. A14 and broad B1–B6 remain deferred.
The fixed library must still be released and adopted by the docs before merge/deploy.
