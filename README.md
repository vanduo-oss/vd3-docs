# vd2 — Vue 3 docs for `@vanduo-oss/framework`

`vd2` is a Vue 3 + Vite + `vite-ssg` recreation of the Vanduo docs
site. It consumes `@vanduo-oss/framework` for CSS tokens and component
classes only — no JavaScript coupling to the framework runtime.

## Stack

- Vue 3 (Composition API, `<script setup lang="ts">`)
- vue-router 4 (`createWebHistory`, clean URLs)
- Pinia 2 (setup-style stores)
- Vite 5 + `vite-ssg` 0.24 (pre-rendered static output)
- TypeScript 5 (strict) + `vue-tsc`
- Vitest 2 + `@vue/test-utils` for composables/logic
- Playwright 1.60 for e2e

## Requirements

- Node ≥ 20
- pnpm 10.28.2 (auto-provisioned via `corepack enable`)

## Install

```bash
corepack enable
pnpm install
```

> Note: `.npmrc` mirrors the framework repo's hardened install policy
> (`save-exact=true`, `ignore-scripts=true`, `minimum-release-age=1440`,
> `trust-policy=no-downgrade`, `block-exotic-subdeps=true`,
> `strict-peer-dependencies=true`). The `@vanduo-oss/*` scope is
> excluded from the 24-hour release-age gate so internal publishes are
> consumed immediately.

## Scripts

```bash
pnpm run dev          # Vite dev server at http://localhost:5173
pnpm run build        # vite-ssg -> dist/
pnpm run preview      # static preview at http://localhost:8787
pnpm run typecheck    # vue-tsc --noEmit
pnpm run lint         # ESLint (flat config)
pnpm run stylelint    # Stylelint
pnpm run format       # Prettier write
pnpm run format:check # Prettier check (CI)
pnpm test             # Vitest (unit)
pnpm run test:size    # gzipped bundle-size reporter
pnpm run test:e2e     # Playwright Chromium Desktop smoke
```

## Layout

```text
src/
  main.ts             # vite-ssg app factory
  App.vue             # <RouterView /> shell
  router.ts           # route table
  nav.ts              # navigation tree
  components/         # Vd* SFCs (primitives, layout, overlays, etc.)
  components/primitives/
  composables/        # reusable composition functions
  layout/             # navbar, footer, sidenav, sticky, waypoint
  overlays/           # offcanvas, search modal
  pages/              # one SFC per route
  stores/             # Pinia setup-style stores
  styles/             # CSS (app.css shell only)

tests/
  unit/               # Vitest specs
  e2e/                # Playwright specs
  scripts/size.mjs    # bundle-size reporter

openspec/
  changes/            # OpenSpec change proposals
  specs/              # normative specs
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the OpenSpec change-folder
convention, branch/no-push policy, validation commands, and release
process.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the release history.

## License

MIT — see [LICENSE](LICENSE).
