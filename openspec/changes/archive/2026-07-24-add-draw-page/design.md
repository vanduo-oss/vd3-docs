## Context

Adding one docs page for the new `@vanduo-oss/vd3-cbun/draw` component. The docs site is a vite-ssg SPA where `src/nav.ts` is the route source of truth and `src/router.ts` binds each section id to a page component. The canvas trio (`Charts.vue`, `Flowchart.vue`, `Hex.vue`) already establishes the exact page pattern; `Draw.vue` follows it. The only friction is that the docs consume the **published** cbun, and `draw` ships in the unreleased `1.2.0`.

## Goals / Non-Goals

**Goals:**
- A live `/canvas/draw` page that dogfoods the real `VdDraw` API and themes with the active palette.
- Land with green `nav`/`router` unit tests and no new flaky visual baseline.

**Non-Goals:**
- No new nav category, no `app.css` component styling, no invented API, no changes to other pages or the baseline set.

## Decisions

### D1 — Reuse the Flowchart page template
`Draw.vue` mirrors `src/pages/canvas/Flowchart.vue`: a single `<section :id>` with a live `vd-card demo-card` wrapping `<VdDraw>`, then a `vd-card-glow` API-reference card using `DocCodeSnippet` (install + usage) and `vd-table-striped` tables driven by `[string,string][]` arrays. Interactive controls (tool switch, undo/redo, export) bind reactive refs and the component's exposed methods via an `@ready`/template ref — all real APIs.

### D2 — Register in both nav.ts and router.ts
A Canvas-category `NavSection` (`id: "draw"`, `route: "/canvas/draw"`, icon, keywords) plus a `componentPages.draw` import+entry keyed by the same id. Both are mandatory: `router.spec.ts` asserts route count = `nav.pages` + `flattenNav` + 2, so a nav entry without a router binding fails the suite.

### D3 — Dogfood the unreleased component via a local link
`draw` is not in published cbun yet, so during development `@vanduo-oss/vd3-cbun` is temporarily set to `link:../vd3-cbun` (with the existing `resolve.dedupe`/`optimizeDeps.exclude` for `vue`). The published `^` range is restored before landing; the page is only fully resolvable in CI/prod once cbun `1.2.0` publishes. Preserve the `vite-ssg` patch and pnpm `overrides` across any lockfile change.

### D4 — Exclude from visual-parity baselines
`VdDraw` renders non-deterministically (freehand, transient handles), so — like charts/flowchart/hex — the page is left out of the curated `visual-parity.spec.ts` `ROUTES`. No committed PNG baseline, no `maxDiffPixelRatio` flake. A11y-smoke inclusion is optional.

## Risks / Trade-offs

- **[Page can't fully build against published deps until cbun 1.2.0 ships]** → develop against `link:../vd3-cbun`; sequence the docs PR merge after the cbun publish, and keep the restored `^1.2.0` range pending until then.
- **[nav.ts/router.ts textual overlap with active `logo-effects-gallery`]** → edits target the Canvas category (not Effects); resolve any adjacent-line merge textually, no logical conflict.
