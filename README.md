# vd3-docs — Vue 3 documentation site for the vd3 line

`vd3-docs` is the Vue 3 + Vite + `vite-ssg` documentation and demo site for the
**vd3 line** of Vanduo UI. It **dogfoods the published packages** — every page is
a live demo built from the real, typed `Vd*` components and composables of
[`@vanduo-oss/vd3`](https://www.npmjs.com/package/@vanduo-oss/vd3) (the standalone
Vue 3 design system),
[`@vanduo-oss/vd3-charts`](https://www.npmjs.com/package/@vanduo-oss/vd3-charts),
[`@vanduo-oss/vd3-flowchart`](https://www.npmjs.com/package/@vanduo-oss/vd3-flowchart),
and `/cbun` previews of the remaining canvas widgets from
[`@vanduo-oss/vdl-cbun`](https://github.com/vanduo-oss/vdl-cbun) (Labs sibling via
`link:../../vdl/vdl-cbun`; full widget docs live on
[labs.vanduo.dev](https://labs.vanduo.dev/)), consumed alongside published npm pins
(`@vanduo-oss/vd3@1.7.3`, `@vanduo-oss/vd3-charts@1.1.0`,
`@vanduo-oss/vd3-flowchart@1.2.0`), not vendored source.
Local worktrees may temporarily `link:` the sibling `../vd3` /
`../vd3-charts` / `../vd3-flowchart` checkouts for unreleased library work; the
committed manifest may keep a `link:../vd3` dogfood while 1.7.3 is unreleased,
plus a permanent `link:` for Labs sibling `vdl-cbun`.
Unlike the previous docs site (which
consumed `@vanduo-oss/framework` CSS classes only), vd3-docs renders the
actual Vue 3 components a consumer installs.

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
> publishes are consumed immediately. Labs sibling `vdl-cbun` resolves via
> `link:` and is not published to npm.

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
`public/search/search-index.json` to match (keep document `id` / `route` /
`title` / optional keywords, headings, and bodyText).

CI (`.github/workflows/ci.yml`) runs typecheck, lint, stylelint, format:check,
and build on Node 24. The unit/e2e/size suites are run locally (they are omitted
from CI to conserve Actions minutes). `deploy.yml` builds and publishes `dist/`
to GitHub Pages at [https://vd3.vanduo.dev/](https://vd3.vanduo.dev/)
(`public/CNAME`, Vite base `/`).

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
