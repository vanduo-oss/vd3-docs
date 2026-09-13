## MODIFIED Requirements

### Requirement: first-visit default primary is blue

The docs site SHALL default first-visit (unset) primary to the published vd3
primary token `blue` (theme customizer “Blue”) in both light and dark via
`themeDefaults.PRIMARY_LIGHT` / `PRIMARY_DARK` at bootstrap and the matching
`DOCS_DEFAULT_PRIMARY_*` constants. A persisted `vanduo-primary-color` SHALL
be kept, including former auto-defaults `black` and `green`. Stored `blue`
MUST NOT be migrated to another hue.

When dark mode is active and primary is `green` (an explicit user choice), the
docs shell CSS SHALL still pin semantic primary tokens to the logo stop
(`--vd-green-8` = `#2f9e44`) and its ramp companions.

#### Scenario: fresh visit uses blue in both schemes

- **GIVEN** a fresh visit with empty theme localStorage
- **WHEN** the theme store initializes in light or dark
- **THEN** `data-primary` is `blue`

#### Scenario: persisted non-blue primary is kept

- **GIVEN** `localStorage` holds `vanduo-primary-color` = `green` or `black`
- **WHEN** the theme store initializes
- **THEN** that stored primary remains and is not replaced with `blue`

#### Scenario: explicit non-default primary is preserved

- **GIVEN** the user picks violet (or any non-auto primary) in the customizer
- **WHEN** they switch between light and dark
- **THEN** the chosen primary hue persists

### Requirement: integration snippets show docs bootstrap primary

Pages that document site bootstrap with `themeDefaults` SHALL show the docs
site's real primary override as `"blue"` in
`guides/FrameworkIntegration.vue` and `components/ThemeSwitcher.vue`. Generic
teaching samples that demonstrate other hues (e.g. violet via
`setThemeDefaults`) SHALL remain unchanged.

#### Scenario: FrameworkIntegration mirrors site bootstrap

- **GIVEN** `guides/FrameworkIntegration.vue` after this change
- **WHEN** its bootstrap code snippets are read
- **THEN** `PRIMARY_DARK` is `"blue"`, not `"green"`

### Requirement: marketing catalog counts match the published barrel

Landing `#docs-component-count`, the home “One Complete System” teaser, and
about “What you get” SHALL use one definition of “components”: the count of
`Vd*` component exports from `@vanduo-oss/vd3`. Composable copy on those
surfaces SHALL use the count of composable modules in that barrel. Landing
meta that counts docs pages SHALL be labeled as reference pages or guided
walkthroughs (not as “components”) and SHALL match `src/nav.ts`.

#### Scenario: marketing surfaces agree on package export counts

- **GIVEN** `/docs-landing`, `/`, and `/about` after this change
- **WHEN** their catalog copy is read
- **THEN** each names 63 components and (where composables are stated) 39
  composables, and `#docs-component-count` does not say “47+”
