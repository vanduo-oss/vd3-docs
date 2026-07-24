## Why

`@vanduo-oss/vd3-cbun@1.2.0` introduces `VdDraw` — an infinite-canvas drawing / whiteboard component. The docs site dogfoods every published cbun component, but has no page for `draw`, so the new surface is undocumented and unshown. This adds a live `/canvas/draw` demo under the existing **Canvas** category.

## What Changes

**Routes:** `+1 /canvas/draw` (Canvas category, Components tab). None changed or removed.

- Add `src/pages/canvas/Draw.vue` rendering the real `VdDraw` from `@vanduo-oss/vd3-cbun/draw` (importing its `/css`), with a live interactive editor, tool/interaction walkthrough, and an API-reference card (props / events / exposed methods) using `DocCodeSnippet` + `vd-table` tables — the same structure as the Flowchart / Charts / Hex pages.
- Register the page in `src/nav.ts` (a new `NavSection` in the Canvas category: `id: "draw"`, `route: "/canvas/draw"`, icon, keywords) **and** bind it in `src/router.ts` `componentPages` (import + `draw:` entry) — both are required or the router unit test fails.
- Because the page renders a non-deterministic SVG editor, it follows the charts / flowchart / hex precedent and is **excluded** from the Playwright visual-parity baseline set (no new snapshot, no flaky diff).
- Local dogfooding: temporarily point `@vanduo-oss/vd3-cbun` at `link:../vd3-cbun` to render the unpublished `./draw` subpath during development; restore the published `^` range before landing (the page only fully resolves once cbun `1.2.0` publishes).

## Non-goals

- No new nav category — reuse the existing **Canvas** category.
- No changes to other pages, to `app.css` (stays shell / layout-only), or to the visual-parity baseline set.
- No invented `VdDraw` API — the page renders only the real published surface (verified against the cbun `./draw` spec / declarations).
- No docs-site content in the package changelog; the cbun `1.2.0` release card on the changelog **page** is a separate publish-time follow-up, not part of this page change.
- No push or Pages deploy in this change (both defer to the new dev-branch → PR flow; today is local commits only).

## Capabilities

### New Capabilities
- (none)

### Modified Capabilities
- `docs-content`: adds a **Draw component page** requirement — a live `/canvas/draw` page under the Canvas category that renders the real `VdDraw` from `@vanduo-oss/vd3-cbun/draw` and documents its props, events, and exposed methods.

## Impact

- **Pages / routes:** new `src/pages/canvas/Draw.vue`; `+1` route `/canvas/draw`.
- **Routing / nav:** `src/nav.ts` (Canvas category section) + `src/router.ts` (`componentPages.draw` import + entry). **Collision note:** `logo-effects-gallery` (active, 0/8 tasks) also edits `nav.ts` / `router.ts` (Effects category) — different sections, so expect textual proximity but no logical conflict; the two changes can land in either order.
- **Search:** keywords on the nav entry are auto-indexed by the search store (no separate index to touch).
- **Tests:** `tests/unit/nav.spec.ts` (unique `id` / `route`) and `tests/unit/router.spec.ts` (route count = `nav.pages` + sections + 2) must stay green; the page is left out of `tests/e2e/visual-parity.spec.ts` `ROUTES`; optionally add `/canvas/draw` to `tests/e2e/a11y-smoke.spec.ts`.
- **Deps:** temporary `link:../vd3-cbun` during development, restored to the published range (`^1.1.0` → `^1.2.0`) before landing; preserve the `vite-ssg` patch + pnpm `overrides`.
- **Branch / flow:** authored on `dev-v1.1.0`; lands via a PR to `main` under the newly-adopted docs dev-branch + PR flow — not today (local commits only, no push / PR yet).
