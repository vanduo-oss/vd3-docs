## Why

The docs-site content is done (Phase 6: `docs-clone-and-strip` + `docs-content`
landed — the site is Vue3-only, dogfoods `@vanduo-oss/vd3` + `@vanduo-oss/vd3-cbun`,
and every route builds and prerenders clean). But the **test gates that guard
that content are stale** relative to the site they now protect:

- **Visual-parity baselines are from the pre-strip vd2 clone.** All 70 committed
  snapshots in `tests/e2e/visual-parity.spec.ts-snapshots/` are named
  `vd2-<label>-Chromium-Desktop-darwin.png` and were captured on **2026-06-23/27**
  — before the single-engine strip, the vd3 retarget, the DocSearch addition, and
  the rebrand. They no longer match the rendered site, so the suite is either
  red or asserting against a bygone UI. The spec file itself is vd2-flavored: its
  route model field is `vd2Path`, its snapshot names are `vd2-*`, and its test
  titles read `vd2 <path> baseline regression`.
- **The enumerated route list drifted.** The suite hardcodes a 70-route
  representative subset. Since it was written, the site **dropped two guides**
  (`/guides/esm-vs-iife`, `/guides/lifecycle-manager`) and **added**
  `/components/doc-search` (plus other net-new component pages). The subset never
  listed the two dropped guides, but it also never picked up DocSearch.
- **There is no accessibility gate.** The config context promises a
  `@axe-core/playwright` a11y smoke, but no such spec exists in `tests/e2e/` and
  `@axe-core/playwright` is not a dependency. Phase 6 deferred the a11y audit to
  this phase (see the `docs-content` proposal Non-goals: "the a11y audit and
  baseline sign-off are Phase 7").
- **The gzip size budget is only a printout.** `tests/scripts/size.mjs` prints
  the raw+gzip size of the `app-*` bundle but asserts **no budget** — it exits `0`
  regardless of size (it only fails when no `app-*` asset exists). A bundle
  regression cannot fail CI. The current build is `app-*.js` **342.5 KB gz** +
  `app-*.css` **103.8 KB gz** (≈ **446 KB gz** total); that measured floor is the
  baseline a real budget should defend.

This change **re-baselines and completes the docs-site test harness** so the
gates track the shipped vd3 site: it regenerates the visual-parity baselines
against vd3 (rebranding the spec and reconciling its route list), adds the
`@axe-core/playwright` accessibility smoke over ~10 representative routes, and
turns the size script into an asserting gzip budget baselined to the current
dist. It touches **test infrastructure only** — no page, component, or `src/`
runtime code changes.

## What Changes

**Routes:** none added, changed, or removed. This change edits `tests/` and one
size script; `src/`, `nav.ts`, and `router.ts` are untouched.

### Visual-parity re-baseline (capability `docs-build`)

- Rebrand `tests/e2e/visual-parity.spec.ts` off the vd2 clone: the route field
  `vd2Path` → `path`, the snapshot name template `vd2-<label>.png` →
  `vd3-<label>.png`, and the test title `vd2 <path> baseline regression` →
  `vd3 <path> baseline`. No `vd2` token survives in the spec.
- Reconcile the enumerated route list against `src/nav.ts` (the route SSOT): add
  `{ path: '/components/doc-search', label: 'components-doc-search' }`, and verify
  no listed path resolves to the 404 page (the two dropped guides
  `/guides/esm-vs-iife` and `/guides/lifecycle-manager` are absent — they never
  appeared in this subset, but the reconcile asserts it). The suite stays a
  curated representative parity set (see Non-goals), now **71** routes.
- Delete all **70** stale `vd2-*-Chromium-Desktop-darwin.png` snapshots and
  capture fresh `vd3-*` baselines from the built vd3 site (`--update-snapshots`),
  reviewing each captured image as intended vd3 output rather than blind.

### Accessibility smoke (capability `docs-build`)

- Add `@axe-core/playwright` (+ its `axe-core` peer) as a devDependency.
- Add `tests/e2e/a11y-smoke.spec.ts`: run `AxeBuilder` against **~10
  representative routes** covering every page archetype — home (`/`), a component
  page (`/components/button`), a form-heavy component page (`/components/forms`),
  a guide (`/guides/getting-started`), a canvas/ecosystem page (`/canvas/charts`),
  a media page (`/media/music-player`), the changelog (`/changelog`), the two
  theme/customizer pages (`/components/theme-customizer`,
  `/components/theme-switcher`), and a foundations page (`/core/color-palette`).
- Each route SHALL assert **zero `serious` or `critical`** axe violations
  (`minor`/`moderate` are reported but do not fail). Add a `test:a11y` npm script
  for running the smoke in isolation.

### Gzip size budget (capability `docs-build`)

- Turn `tests/scripts/size.mjs` into an asserting gate: keep the per-asset
  raw/gzip printout, sum the gzipped `app-*` assets, compare against a committed
  `MAX_GZIP_KB` budget, and **exit non-zero** when the total exceeds it.
- Baseline `MAX_GZIP_KB` to the **current dist** (≈ 446 KB gz measured) plus
  modest headroom (~10–15% → ≈ 500–515 KB), so today's build passes and a real
  regression fails. `test:size` stays the entry point.

## Non-goals

- **No page, component, or `src/` runtime changes.** Phase 6 content is done.
  This change edits `tests/e2e/visual-parity.spec.ts`, adds
  `tests/e2e/a11y-smoke.spec.ts`, edits `tests/scripts/size.mjs`, replaces the
  snapshot PNGs, and bumps `package.json` dev-deps/scripts only. No `.vue` page,
  no `nav.ts`, no `router.ts`, no `styles/*.css` is touched.
- **No new features.** No new site capability, route, or component — the harness
  is re-baselined against the site as it already ships.
- **No exhaustive per-route baseline expansion.** The visual-parity suite stays
  a curated **representative** subset reconciled to the current nav (71 of the
  site's routes), not a snapshot of every route. Growing it to one baseline per
  route is a separate, larger effort and is out of scope here.
- **No a11y content remediation in this change.** The smoke is added as a *gate*.
  It is expected to pass on the vd3 site (real components with built-in a11y). If
  a genuine `serious`/`critical` content-level violation surfaces, it is reported
  upward as a finding (per the "no page content changes" rule) — only
  test-scoping/config-level fixes (e.g. excluding a known third-party canvas
  node) are made here.
- **No CI-workflow authoring.** Wiring `test:a11y` / the asserting `test:size`
  into the deploy/CI workflow is not part of this change; the scripts are added
  and run locally (the deploy workflow stays disabled until launch).
- **No publish, deploy, or CNAME.** `@vanduo-oss/vd3-docs` stays `private`.
- **No edits to any old-line repo** (`core`, `framework`, `vue`, `vd2`, `charts`,
  `flowchart`, `hex-grid`, `music-player`) or to the `link:` targets `../vd3` /
  `../vd3-cbun` — strictly read-only reference material.
- **No `app.css` component styling.** `styles/app.css` stays shell/layout-only.

## Impact

- Affected specs: **~`docs-build`** (three ADDED requirements — visual-parity
  re-baseline, a11y smoke, asserting gzip budget). No requirement is modified or
  removed; existing `docs-build`, `single-engine-docs`, `docs-content`, and
  `repo-scaffold` requirements are unchanged.
- Affected code (implemented by a follow-up, not in this artifacts-only change):
  `tests/e2e/visual-parity.spec.ts` (rebrand + route reconcile),
  `tests/e2e/visual-parity.spec.ts-snapshots/*.png` (delete 70 `vd2-*`, add ~71
  `vd3-*`), `tests/e2e/a11y-smoke.spec.ts` (new), `tests/scripts/size.mjs`
  (asserting budget), and `package.json` (`@axe-core/playwright` devDependency,
  `test:a11y` script). No `src/` file changes.
- Re-baselining against the real, shipped vd3 build keeps the gates honest: the
  visual suite now diffs the actual UI, a11y regressions can fail, and a bundle
  regression can fail — all before launch, with nothing published or deployed.
