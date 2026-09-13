# Dogfood published vd3-cbun 1.4.2

## Why

`@vanduo-oss/vd3-cbun@1.4.2` is published with the `latest` npm tag. The docs
currently resolve `1.4.1`, label it latest, and omit the new core `role` / Vue
`svgRole` distinction that preserves wrapper attribute fallthrough.

## What Changes

**Pages / Routes:**
- **Modified:** `/changelog`, `/docs-landing`, `/canvas/charts`,
  `/editors/code-editor`, and `/guides/production-best-practices`.
- No routes or nav hierarchy added or removed.

**Details:**
- Pin exact registry `@vanduo-oss/vd3-cbun@1.4.2` in the manifest and lockfile;
  keep sibling `link:` overrides absent.
- Add the published 1.4.2 package card and move the Latest badge from 1.4.1.
- Update displayed latest/install/sample versions to 1.4.2.
- Document core `role` and Vue `svgRole`, and integration-test that Vue retains
  the standard root `role` attribute while overriding the inner SVG role.

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `docs-build`: exact published CBUN dogfood pin is `1.4.2`.
- `docs-content`: latest CBUN release copy is 1.4.2 and Charts documents
  `svgRole` accurately.

## Non-goals

- No npm publish or deployment from this repository (`private: true`).
- No docs package version bump beyond the existing 1.7.4 work.
- No CBUN source changes and no component-version claims.
- No route, navigation, or search-index structure changes.
