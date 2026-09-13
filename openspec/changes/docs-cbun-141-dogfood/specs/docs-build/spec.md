## MODIFIED Requirements

### Requirement: package identity and dependency targets

The site's `package.json` SHALL be named `@vanduo-oss/vd3-docs` and remain
`private: true` (never published). Its runtime dependencies SHALL target the
vd3 line only: it MUST declare `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun`
and MUST NOT declare any of `@vanduo-oss/core`, `@vanduo-oss/framework`,
`@vanduo-oss/vue`, `@vanduo-oss/charts`, `@vanduo-oss/flowchart`,
`@vanduo-oss/hex-grid`, or `@vanduo-oss/music-player`. The two vd3
dependencies SHALL be the PUBLISHED packages resolved from the npm registry —
`@vanduo-oss/vd3` at exact `1.7.2` and `@vanduo-oss/vd3-cbun` at exact
`1.4.1` (dogfooding). `.npmrc` SHALL set `save-exact=true` so newly added
deps do not reintroduce caret ranges. The committed `pnpm-workspace.yaml`
and `pnpm-lock.yaml` MUST NOT override `@vanduo-oss/vd3` or
`@vanduo-oss/vd3-cbun` with a `link:` specifier. A contributor MAY
temporarily `pnpm link` (or `link:../`) the sibling working trees to render
unreleased library work locally, but the committed manifest and lockfile
SHALL keep the exact published versions.

#### Scenario: manifest names the vd3 line and drops the old line

- **GIVEN** the site's `package.json` after this change
- **WHEN** its `name`, `private`, and `dependencies` are inspected
- **THEN** `name` is `@vanduo-oss/vd3-docs`, `private` is `true`, the only
  `@vanduo-oss/*` runtime kit deps required by this requirement are
  `@vanduo-oss/vd3` (`1.7.2`) and `@vanduo-oss/vd3-cbun` (`1.4.1`), and none
  of `core`, `framework`, `vue`, `charts`, `flowchart`, `hex-grid`, or
  `music-player` appear

#### Scenario: published vd3 packages resolve from the registry

- **GIVEN** the committed `package.json` pinning exact `1.7.2` / `1.4.1`
  vd3 deps and `save-exact=true`
- **WHEN** `pnpm install` runs from the docs repo
- **THEN** `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` resolve to those
  published registry versions with no `link:` entry for either in the
  lockfile or `pnpm-workspace.yaml` overrides, and the install succeeds
  with no old-line `@vanduo-oss` entries

#### Scenario: unpublished vd3 packages resolve via link

- **GIVEN** a contributor rendering unreleased library work locally
- **WHEN** they `pnpm link` (or temporarily `link:../`) the sibling `../vd3`
  / `../vd3-cbun` working trees
- **THEN** those linked builds resolve in place of the published versions for
  the local session, while the committed manifest still pins exact `1.7.2` /
  `1.4.1`
