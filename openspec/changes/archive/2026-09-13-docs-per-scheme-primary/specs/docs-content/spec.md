## MODIFIED Requirements

### Requirement: first-visit default primary is blue

The docs site SHALL default first-visit (unset) primary to Ink (`black`) in
light and the published vd3 primary token `blue` in dark via
`themeDefaults.PRIMARY_LIGHT` / `PRIMARY_DARK` at bootstrap and the matching
`DOCS_DEFAULT_PRIMARY_*` constants. First visit SHALL persist both scheme
defaults to `vanduo-primary-color-light` and `vanduo-primary-color-dark`, then
apply the value for the resolved scheme.

A lone legacy `vanduo-primary-color` SHALL be migrated: stored `blue` (the
former shared docs default) remaps like a first visit; any other stored hue
SHALL be kept as the current/last scheme's preference, and the other scheme
SHALL receive its first-visit default. Per-scheme keys, once present, SHALL
win over the legacy key.

When dark mode is active and primary is `green` (an explicit user choice), the
docs shell CSS SHALL still pin semantic primary tokens to the logo stop
(`--vd-green-8` = `#2f9e44`) and its ramp companions.

#### Scenario: fresh light visit uses black and persists both scheme defaults

- **GIVEN** a fresh visit with empty theme localStorage
- **WHEN** the theme store initializes in light
- **THEN** `data-primary` is `black` and both per-scheme keys are written
  (`light` = `black`, `dark` = `blue`)

#### Scenario: fresh dark visit uses blue and persists both scheme defaults

- **GIVEN** a fresh visit with empty theme localStorage
- **WHEN** the theme store initializes in dark
- **THEN** `data-primary` is `blue` and both per-scheme keys are written
  (`light` = `black`, `dark` = `blue`)

#### Scenario: legacy explicit primary stays on the current scheme

- **GIVEN** `localStorage` holds only `vanduo-primary-color` = `green` or
  `black` and a current scheme
- **WHEN** the theme store initializes
- **THEN** that stored primary remains on the current scheme and the other
  scheme uses its first-visit default

#### Scenario: primaries are independent per scheme

- **GIVEN** the user picks violet in light, then switches to dark
- **WHEN** they view dark, optionally pick green, then switch back
- **THEN** dark uses its stored primary (`blue` until they pick otherwise)
  and light remains violet

### Requirement: integration snippets show docs bootstrap primary

Pages that document site bootstrap with `themeDefaults` SHALL show the docs
site's real primary override: `PRIMARY_DARK` `"blue"` in
`guides/FrameworkIntegration.vue`, and `PRIMARY_LIGHT` `"black"` /
`PRIMARY_DARK` `"blue"` in `components/ThemeSwitcher.vue`. Generic teaching
samples that demonstrate other hues (e.g. violet via `setThemeDefaults`)
SHALL remain unchanged.

#### Scenario: FrameworkIntegration mirrors site bootstrap

- **GIVEN** `guides/FrameworkIntegration.vue` after this change
- **WHEN** its bootstrap code snippets are read
- **THEN** `PRIMARY_DARK` is `"blue"`, not `"green"`

#### Scenario: ThemeSwitcher mirrors site bootstrap

- **GIVEN** `components/ThemeSwitcher.vue` after this change
- **WHEN** its bootstrap code snippet is read
- **THEN** `PRIMARY_LIGHT` is `"black"` and `PRIMARY_DARK` is `"blue"`
