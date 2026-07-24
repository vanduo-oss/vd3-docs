## ADDED Requirements

### Requirement: the About page is a vd3 overview, not vd2 founder copy

The `/about` page ([src/pages/about.vue](../../../src/pages/about.vue)) SHALL present a
plain-language overview of the standalone vd3 line and MUST NOT carry the pre-strip
vd2 clone's founder's-message content (e.g. "The Shape of the Water") or any
dual-engine / vanilla-engine framing. Its prose SHALL describe only real facts about
`@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` and MUST NOT invent component or
composable APIs. All page styling SHALL remain scoped to `about.vue`; the change MUST
NOT modify `app.css` or other shell/layout stylesheets.

#### Scenario: the page describes the vd3 package, not a founder's message
- **WHEN** a reader opens `/about`
- **THEN** the page presents the vd3 overview sections (what it is, how it's built, what you get, open source)
- **AND** it contains no "Shape of the Water" founder's-message block and no vanilla-engine or dual-line references

#### Scenario: About is discoverable by vd3/overview keywords
- **WHEN** the site search index is built from `src/nav.ts`
- **THEN** the `/about` entry's keywords include `vd3` and `overview`

#### Scenario: the About visual baseline reflects the rewritten page
- **WHEN** the Playwright visual-parity suite runs the `/about` route
- **THEN** it matches a committed `vd3-about-*` baseline captured from the rewritten page (within tolerance)
