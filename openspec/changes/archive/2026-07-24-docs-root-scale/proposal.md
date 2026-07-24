## Why

At 100% browser zoom the docs site feels slightly oversized; zooming the browser
to 90% improves type rhythm and spacing density. Browser zoom is not a production
setting — the site needs a rem-root scale so vd3 tokens shrink consistently.

## What Changes

**Routes:** none added or removed — global docs shell styling only.

- Set `html { font-size: 90% }` in [`src/styles/docs.css`](src/styles/docs.css)
  so rem-based vd3 tokens and component chrome densify site-wide.
- Introduce docs-local chrome offset CSS variables (`--docs-main-offset`,
  `--docs-sticky-offset`, etc.) in rem and replace px hardcodes in the shell
  (main padding, sticky sidebar, scroll-margin, scroll-loader, mobile hero).
- Move `#main-content` shell offsets from inline styles in
  [`src/App.vue`](src/App.vue) into [`src/styles/app.css`](src/styles/app.css).

## Non-goals

- No `@vanduo-oss/vd3` density / scale API or package release.
- No `zoom` or `transform: scale()` hacks.
- No docs-site changelog entry (packages-only policy).
- No per-demo px cleanup (borders, card demo heights, glass blur profile).

## Impact

- Affected specs: **`docs-build`** (visual-parity baselines shift globally).
- Affected code: `docs.css`, `app.css`, `App.vue`, `home.vue` shell offsets only.
