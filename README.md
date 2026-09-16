# vd3-docs — Vue 3 documentation site for the vd3 line

`vd3-docs` is the Vue 3 + Vite + `vite-ssg` documentation and demo site for the
**vd3 line** of Vanduo UI. It **dogfoods the published packages** — every page is
a live demo built from the real, typed `Vd*` components and composables of
[`@vanduo-oss/vd3`](https://www.npmjs.com/package/@vanduo-oss/vd3) (the standalone
Vue 3 design system),
[`@vanduo-oss/vd3-charts`](https://www.npmjs.com/package/@vanduo-oss/vd3-charts),
[`@vanduo-oss/vd3-flowchart`](https://www.npmjs.com/package/@vanduo-oss/vd3-flowchart).

The manifest pins published versions. For local QA, temporarily link sibling
package builds; restore registry pins before release.

The site is pre-rendered to static HTML with `vite-ssg` (one page per `nav.ts`
route) and is `private` — it is **not** published to npm.

## Stack

- Vue 3 (Composition API, `<script setup lang="ts">`)
- vue-router 5 (`createWebHistory`, clean URLs)
- Pinia 3 (setup-style stores)
- Vite 8 + `vite-ssg` 28 (pre-rendered static output)
- TypeScript 6 (strict) + `vue-tsc`
- Vitest 4 + `@vue/test-utils` for composables/logic
- Playwright 1.61 (+ `@axe-core/playwright`) for e2e, visual-parity, and a11y
- Fuse.js for Cmd+K / Doc Search over `public/search/search-index.json`
- `@vanduo-oss/vd3/highlight` for `DocCodeSnippet` / `VdCodeSnippet` tokens

## Requirements

- Node ≥ 24
- pnpm 10.28.2 (auto-provisioned via `corepack enable`)

## Install

```bash
corepack enable
pnpm install
```

> `.npmrc` mirrors the vd3 line's hardened install policy (`save-exact=true`,
> `ignore-scripts=true`, `minimum-release-age=1440`, `trust-policy=no-downgrade`,
> `block-exotic-subdeps=true`, `strict-peer-dependencies=true`). The
> `@vanduo-oss/*` scope is excluded from the 24-hour release-age gate, so the
> `@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`, and `@vanduo-oss/vd3-flowchart`
> publishes are consumed immediately.

## Scripts

```bash
pnpm run dev          # Vite dev server at http://localhost:5173
pnpm run build        # vite-ssg -> dist/ + sitemap.xml
pnpm run preview      # static preview at http://localhost:8787
pnpm run typecheck    # vue-tsc --noEmit
pnpm run lint         # ESLint (flat config)   (lint:fix to autofix)
pnpm run stylelint    # Stylelint
pnpm run format       # Prettier write         (format:check in CI)
pnpm test             # Vitest (unit / wrapper)
pnpm run test:size    # gzipped bundle-size budget
pnpm run test:e2e     # Playwright visual-parity, Chromium Desktop
pnpm run test:e2e:full# Playwright, all projects
pnpm run test:a11y    # axe accessibility smoke, Chromium Desktop
```

### Site search (Fuse)

Cmd+K uses Fuse.js over the committed corpus at
`public/search/search-index.json` (no semantic model, no `vectors.json`).
`GlobalSearchModal` mounts `VdGlobalSearch` with AI toggle off.

After changing `nav.ts` or page body copy that should be searchable, update
the search corpus by building and running `pnpm search:refresh`.

CI runs type, style, unit, content, size, and two browser smoke checks on Node 24.
The full visual and light/dark accessibility matrix runs locally before release.
The deployment workflow applies its own gates before publishing the static site.
Remote actions require explicit approval under the contributor policy.

## Layout

```text
src/
  main.ts             # vite-ssg app factory (VanduoVue plugin + router + pinia)
  App.vue             # app shell — site dock + <RouterView /> + overlays
  router.ts           # route table
  nav.ts              # navigation tree
  pages/              # one SFC per route (component demos, guides, core, effects)
  layout/             # VdSiteDock, sidenav, docs layout, etc.
  overlays/           # VdThemeCustomizer, VdThemeSwitcher, search modal
  customizer/         # theme-customizer pieces
  composables/        # reusable composition functions
  components/         # doc-site SFCs
  stores/             # Pinia setup stores (theme, search, nav, customizer)
  styles/             # docs.css + site styling
  utils/

public/
  search/             # Fuse search-index.json

tests/
  e2e/                # Playwright specs (visual-parity, a11y-smoke)
  scripts/size.mjs    # bundle-size budget reporter
                      # Vitest unit/wrapper specs live alongside src/

openspec/
  changes/archive/    # archived OpenSpec changes
  specs/              # promoted normative specs
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the OpenSpec change-folder
convention, branch/no-push policy, validation commands, and release process.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the release history.

## License

MIT — see [LICENSE](LICENSE).

## Local cross-package QA

Build sibling `vd3`, `vd3-charts`, and `vd3-flowchart` repositories, then run
`VD3_LOCAL_PACKAGES=1 pnpm build` to check their unreleased output in this site.
The default build still uses the committed registry pins. After a content change,
run `pnpm search:refresh` against the new build; `pnpm test:content` checks the
committed search corpus. Production search is generated from that build's HTML.

The implementation and outstanding manual checks are tracked in
[the local QA record](reviews/2026-09-16/implementation.md).
