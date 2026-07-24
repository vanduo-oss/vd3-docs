## Why

The home hero mark should feel alive with a curated random effect on each load,
while chrome (navbar, footer, favicon) stays static. The mark must read clearly
on dark backgrounds and always present the upright pose (two small circles up,
one down) at animation cycle boundaries, spinning around the inner circle center.

## What Changes

- Upright geometry + lighter palette on [`public/images/vd3-logo.svg`](public/images/vd3-logo.svg), [`public/favicon.svg`](public/favicon.svg), [`src/components/Vd3Mark.vue`](src/components/Vd3Mark.vue).
- [`src/utils/logoFx.ts`](src/utils/logoFx.ts) — approved random pool (16 effects).
- [`src/pages/home.vue`](src/pages/home.vue) — `Vd3Mark` + random `data-fx` per load; bloom-spin timeline when selected.
- [`src/styles/logo-fx.css`](src/styles/logo-fx.css) — bloom offsets for upright pose; lighter glow/stroke colors.
- Remove hard-coded always-on hero spin from [`src/styles/docs.css`](src/styles/docs.css).

## Non-goals

- Random animation on navbar, footer, or favicon.
- Package publish or docs changelog entry.

## Impact

- Affected specs: **~`docs-content`** (home hero mark behavior).
- Navbar/footer/favicon pick up static upright SVG automatically.
