## MODIFIED Requirements

### Requirement: package identity and dependency targets

The site's `package.json` SHALL be named `@vanduo-oss/vd3-docs` and remain
`private: true` (never published). Its runtime dependencies SHALL target the vd3
line only: it MUST declare `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` and MUST
NOT declare any of `@vanduo-oss/core`, `@vanduo-oss/framework`, `@vanduo-oss/vue`,
`@vanduo-oss/charts`, `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, or
`@vanduo-oss/music-player`. The two vd3 dependencies SHALL be the PUBLISHED
packages resolved from the npm registry — `@vanduo-oss/vd3` at `^1.0.0` and
`@vanduo-oss/vd3-cbun` at `^1.2.0` (dogfooding). A contributor MAY temporarily
`pnpm link` (or `link:../`) the sibling working trees to render unreleased library
work locally, but the committed manifest SHALL pin the published `^` ranges.

#### Scenario: manifest names the vd3 line and drops the old line

- **GIVEN** the site's `package.json` after this change
- **WHEN** its `name`, `private`, and `dependencies` are inspected
- **THEN** `name` is `@vanduo-oss/vd3-docs`, `private` is `true`, the only
  `@vanduo-oss/*` dependencies are `@vanduo-oss/vd3` (`^1.0.0`) and
  `@vanduo-oss/vd3-cbun` (`^1.2.0`), and none of `core`, `framework`, `vue`,
  `charts`, `flowchart`, `hex-grid`, or `music-player` appear

#### Scenario: published vd3 packages resolve from the registry

- **GIVEN** the committed `package.json` pinning `^1.0.0` / `^1.2.0` vd3 deps
- **WHEN** `pnpm install` runs from the docs repo
- **THEN** `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` resolve to their published
  registry versions with no `link:` entry for either in the lockfile, and the
  install succeeds with no old-line `@vanduo-oss` entries

#### Scenario: unpublished vd3 packages resolve via link

- **GIVEN** a contributor rendering unreleased library work locally
- **WHEN** they `pnpm link` (or temporarily `link:../`) the sibling `../vd3` /
  `../vd3-cbun` working trees
- **THEN** those linked builds resolve in place of the published versions for the
  local session, while the committed manifest still pins the published `^1.0.0` /
  `^1.2.0` ranges

### Requirement: the site builds and prerenders every route against the vd3 line

`vite-ssg build` SHALL complete successfully and statically prerender every route
registered in `src/nav.ts` (the route single source of truth), consuming the
published vd3 packages. No route is added or removed by this change, and the
requirement SHALL NOT hardcode a fixed route count.

#### Scenario: full static build is green

- **GIVEN** the published vd3 packages installed (or the sibling trees built and
  linked for local unreleased work)
- **WHEN** `pnpm build` runs (Node 24)
- **THEN** `vite-ssg build` prerenders every `src/nav.ts` route without error, the
  sitemap is generated, and `vue-tsc` typechecking reports no dangling imports to
  removed packages
