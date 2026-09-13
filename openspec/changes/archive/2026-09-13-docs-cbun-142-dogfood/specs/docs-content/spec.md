## MODIFIED Requirements

### Requirement: the changelog documents the vd3 line packages only

The changelog SHALL document **package** releases for the vd3 line only. Both the
inline release cards in `pages/changelog.vue` and the history partial
`pages/changelog-vue-content.html` SHALL name only `@vanduo-oss/vd3` and
`@vanduo-oss/vd3-cbun`; they MUST NOT name `@vanduo-oss/core`,
`@vanduo-oss/framework`, `@vanduo-oss/vue`, or any of the four old ecosystem
packages, and MUST NOT carry any `data-engine` attribute. The header copy SHALL
name the two vd3 packages. The latest inline cards SHALL identify
`@vanduo-oss/vd3` `1.7.2` and `@vanduo-oss/vd3-cbun` `1.4.2`; the latest cbun
card MUST summarize the published draw, charts, hex-grid, and regression fixes.
Per the changelog-content policy the page tracks package releases only, never
docs-site content.

#### Scenario: the changelog names the vd3 packages and drops the old line

- **GIVEN** `pages/changelog.vue` and `pages/changelog-vue-content.html` after
  this change
- **WHEN** they are read and grepped
- **THEN** every release card names `@vanduo-oss/vd3` or `@vanduo-oss/vd3-cbun`,
  there is no `data-engine` attribute, and there is no `@vanduo-oss/core`,
  `@vanduo-oss/framework`, `@vanduo-oss/vue`, `@vanduo-oss/charts`,
  `@vanduo-oss/flowchart`, `@vanduo-oss/hex-grid`, or `@vanduo-oss/music-player`
  reference

#### Scenario: the latest cbun card documents 1.4.2

- **GIVEN** the `@vanduo-oss/vd3-cbun` column on `/changelog`
- **WHEN** its latest release card is read
- **THEN** `v1.4.2` is marked Latest and documents draw paint-order / gesture
  fixes, charts responsive tables plus core `role` / Vue `svgRole`, and
  hex-grid fast-frame render stats

## ADDED Requirements

### Requirement: Charts component page documents SVG role overrides

The Charts page SHALL document the published `1.4.2` accessibility role API:
core factories accept `role`, while Vue accepts `svgRole` so normal `role`
continues to fall through to the wrapper root.

#### Scenario: Charts API distinguishes wrapper and SVG roles

- **GIVEN** the Charts Vue API table and WAI-ARIA explainer
- **WHEN** a reader looks for role overrides
- **THEN** the page names Vue `svgRole`, core `role`, and explains that standard
  Vue `role` remains on the wrapper root
