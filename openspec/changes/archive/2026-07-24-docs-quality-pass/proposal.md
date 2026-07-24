## Why

A quality pass over the docs site's test coverage, CI, and UI consistency —
gaps the 3-repo audit flagged that don't fit the "reality-fixes" content work:

- **Visual-parity coverage was full of holes.** `tests/e2e/visual-parity.spec.ts`
  screenshotted 70 routes but omitted **every** cbun-rendering route
  (`/canvas/{charts,flowchart,hex,draw}`, `/editors/code-editor`,
  `/media/{music-player,image-box}`) and ~16 first-party component pages, and
  nothing stopped the list from drifting further out of sync with `src/nav.ts`.
- **The a11y smoke covered no rich-ARIA widget** — ten flat/content archetypes,
  but no composite `role=tree`/`role=grid` page, so the composite-widget axe
  rules were never exercised.
- **Two logic-heavy in-app surfaces were under-tested.** Only the search *store*
  was unit-tested (not the `GlobalSearchModal` interaction), and the customizer
  code generator only had per-component class-emission coverage (not
  `toVueSfc`/`stageStyle`/`styleToCss`).
- **The Pages deploy ran build-only with no gates** and fires on push to `main`
  independently of `ci.yml`, so a type/a11y/size regression could auto-publish.
- **Three pnpm `overrides` were bare/undocumented**, and one (`picomatch 2.3.2`)
  was force-*downgrading* modern tooling.
- **`DocSectionNav.vue` was dead code** (imported by nothing).
- **Component-demo intros were inconsistent** — nine pages (incl. Button) had no
  one-line intro under the demo-title, and spacing was split across
  `vd-mb-8`/`-6`/`-5`/`-4`.

## What Changes

- **visual-parity:** extract `ROUTES` to a Playwright-free `tests/e2e/routes.ts`
  and grow it to a representative **superset** of all 93 `src/nav.ts` content
  routes (adds the 7 cbun routes + 16 first-party pages). Add a Vitest **drift
  guard** (`tests/unit/visual-parity-routes.spec.ts`) that fails when a nav route
  is neither in `ROUTES` nor in an explicit exclusions set. The cbun pages are
  safe to baseline: their only non-determinism (Hex random terrain, MusicPlayer
  wall-clock log) fires on user interaction, so the captured initial render is
  stable.
- **a11y:** add `/components/tree` (the `VdTree` `role=tree` widget) to the
  a11y-smoke route set.
- **tests:** add a `GlobalSearchModal` interaction test (cmd+k → type → arrow →
  listbox/option ARIA), and extend `customizer-codegen.spec.ts` to cover
  `toVueSfc` / `stageStyle` / `styleToCss` / the overrides engine.
- **deploy.yml:** run `typecheck` + `test:a11y` + `test:size` before the Pages
  artifact upload (a11y/size against a base-`/` build; artifact still rebuilt
  with the `/vd3-docs/` base).
- **pnpm-workspace.yaml:** document each override in vd3-cbun's style; bump
  `brace-expansion` to `5.0.7` (cbun's floor); **drop** the `picomatch 2.3.2`
  pin (it downgraded vite/tinyglobby's picomatch 4; the remaining 2.3.2 is a
  correct natural micromatch dep).
- **cleanup:** delete `src/layout/DocSectionNav.vue`.
- **UI uniformity:** add a one-line intro `<p>` under the demo-title on
  `Button`, `ButtonGroups`, `Chip`, `Collection`, `Scrollspy`, `Table`,
  `Avatar`, `Flow`, `Toast`; normalize the component-demo intro `<p>` spacing to
  `vd-mb-8` (non-muted) across `src/pages/components/` + `CodeEditor` +
  `MusicPlayer`.

Routes: **none added, changed, or removed** — `src/nav.ts` is untouched. Pages
changed: the 9 intro additions + 19 intro-spacing normalizations. Because that
page markup changes and 23 previously-unscreenshotted routes are added, the
Playwright visual baselines for the affected + new routes are regenerated.

## Non-goals

- No routes/pages/nav entries added, changed, or removed (`nav.ts` untouched).
- **No heading-level restructuring** (the `h5`→`h1` demo-title question is
  deferred to a separate change); only the intro `<p>` class is normalized.
- The **guide/effect prose pages keep their own `vd-mb-6` lead convention** — the
  normalization is scoped to the component-demo family.
- No change to any published package (`@vanduo-oss/vd3` / `@vanduo-oss/vd3-cbun`);
  this dogfoods the installed `^1.0.0` / `^1.2.0` packages.
- No new component-specific rules in `app.css` (stays shell/layout-only).
- No changelog entry — the changelog tracks package releases only.

## Capabilities

### New Capabilities
- _None._

### Modified Capabilities
- `docs-build`: visual-parity `ROUTES` becomes a nav-superset with a drift
  guard; the a11y smoke gains a rich-ARIA widget route; the Pages deploy gates on
  type/a11y/size; the search modal and customizer generator gain regression
  tests.
- `docs-content`: adds the component-demo one-line-intro convention; the
  `/canvas/draw` (and sibling canvas) pages are now visual-baselined at their
  deterministic initial render.

## Impact

- Tests: `tests/e2e/routes.ts` (new), `tests/e2e/visual-parity.spec.ts`,
  `tests/e2e/a11y-smoke.spec.ts`, `tests/unit/visual-parity-routes.spec.ts`
  (new), `tests/unit/global-search-modal.spec.ts` (new),
  `tests/unit/customizer-codegen.spec.ts`.
- CI: `.github/workflows/deploy.yml`.
- Config: `pnpm-workspace.yaml`, `pnpm-lock.yaml`.
- Removed: `src/layout/DocSectionNav.vue`.
- Pages: `src/pages/components/{Button,ButtonGroups,Chip,Collection,Scrollspy,
  Table,Avatar,Flow,Toast}.vue` (intro added); intro-spacing normalized across
  the `src/pages/components/` demo pages plus `editors/CodeEditor.vue` and
  `media/MusicPlayer.vue`.
- Visual baselines: regenerated for changed + newly-added routes.
