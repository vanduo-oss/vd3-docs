## MODIFIED Requirements

### Requirement: package.json is private and scoped to the vd3 line

The site's `package.json` SHALL be named `@vanduo-oss/vd3-docs` and remain
`private: true`. Its `@vanduo-oss/*` dependencies SHALL be the published vd3
line only: it MUST declare `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` and MUST
NOT declare `@vanduo-oss/core`, `@vanduo-oss/framework`, `@vanduo-oss/vue`, or
`@vanduo-oss/cbun`. The committed `package.json` MUST pin the published
packages resolved from the npm registry — `@vanduo-oss/vd3` at `^1.2.3` and
`@vanduo-oss/vd3-cbun` at `^1.3.1` (dogfooding). A contributor MAY temporarily
replace either with a `link:…` path for local package development; that MUST
not be committed.

#### Scenario: package.json names the docs site and lists only vd3-line deps

- **GIVEN** the committed `package.json`
- **WHEN** its `name`, `private`, and `@vanduo-oss/*` dependency keys are read
- **THEN** `name` is `@vanduo-oss/vd3-docs`, `private` is `true`, the only
  `@vanduo-oss/*` dependencies are `@vanduo-oss/vd3` (`^1.2.3`) and
  `@vanduo-oss/vd3-cbun` (`^1.3.1`), and none of `core`, `framework`, `vue`,
  or `cbun` appear

#### Scenario: registry-resolved packages install cleanly

- **GIVEN** the committed `package.json` pinning `^1.2.3` / `^1.3.1` vd3 deps
- **WHEN** `pnpm install` runs with a clean store
- **THEN** `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` resolve to their published
  registry versions matching those ranges and the install exits 0
