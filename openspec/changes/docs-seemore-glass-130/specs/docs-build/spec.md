## MODIFIED Requirements

### Requirement: package identity and dependency posture

The site's `package.json` SHALL be named `@vanduo-oss/vd3-docs` and remain
`private: true`. It MUST depend on the vd3 line only: it MUST declare
`@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` and MUST NOT declare the retired
`@vanduo-oss/{core,framework,vue,canvas}` packages. For the Seemore Glass
release train the site version MUST be `1.2.0` and `@vanduo-oss/vd3` MUST
target `^1.3.0` once published. A contributor MAY temporarily `pnpm link`
(or `link:../`) the sibling working tree to render unreleased library CSS
during local development.

#### Scenario: site version and vd3 range

- **GIVEN** `package.json` after this change
- **WHEN** `version` and `@vanduo-oss/vd3` are read
- **THEN** `version` is `1.2.0` and the vd3 dependency is on the `1.3.x` line
  (registry `^1.3.0` or a temporary sibling link to local 1.3.0)
