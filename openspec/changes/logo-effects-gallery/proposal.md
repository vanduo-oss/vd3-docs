## Why

The vd3 mark has a square centered SVG and a slow hero spin, but there is no
place to compare animation / filter / intro treatments side-by-side. Designers
and contributors need a dense gallery to pick a direction before changing the
home hero.

## What Changes

**Routes:** **+1** `/effects/logo` under the Effects tab.

- Add [`src/components/Vd3Mark.vue`](src/components/Vd3Mark.vue) — inline SVG
  with separable inner + three outer circles and unique defs ids per instance.
- Add [`src/styles/logo-fx.css`](src/styles/logo-fx.css) — ~30 `data-fx` variants
  plus the featured **bloom-spin** intro (center only → outers pop one-by-one →
  spin) and `prefers-reduced-motion` fallbacks.
- Add [`src/pages/effects/Logo.vue`](src/pages/effects/Logo.vue) — featured
  bloom-spin tile with Replay + grid of variant tiles.
- Register route in [`src/router.ts`](src/router.ts) and nav in [`src/nav.ts`](src/nav.ts).

## Non-goals

- Changing the home hero logo or its spin behavior.
- Publishing `@vanduo-oss/vd3` mark APIs from this experiment.
- Docs-site changelog entry (packages-only policy).
- Playwright baseline re-capture in this change (listed as follow-up if CI fails).

## Impact

- Affected specs: **~`docs-content`** (new page requirement).
- Affected code: new component, page, CSS, nav/router wiring only.
