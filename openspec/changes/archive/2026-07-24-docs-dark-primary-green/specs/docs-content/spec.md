## ADDED Requirements

### Requirement: dark-mode default primary matches logo green

The docs site SHALL default dark-mode primary to the green hue
(`data-primary="green"`) via `themeDefaults.PRIMARY_DARK` at bootstrap. When dark
mode is active and primary is green, the docs shell CSS SHALL pin semantic primary
tokens to the logo stop (`--vd-green-8` = `#2f9e44`) and its ramp companions.
Light-mode primary SHALL remain package `PRIMARY_LIGHT` (`black`). The theme store
SHALL treat legacy stored `"blue"` as a docs auto-primary and migrate it to the
current default primary on init, theme change, and OS scheme flip (same pattern as
docs neutral auto-defaults).

#### Scenario: dark default primary is green with logo accent

- **GIVEN** a fresh visit with dark theme (explicit or system dark)
- **WHEN** the user views primary buttons, links, or nav accents
- **THEN** `data-primary` is `green` and `--vd-color-primary` resolves to the
  logo green stop (`--vd-green-8`)

#### Scenario: legacy blue primary migrates to green in dark

- **GIVEN** `localStorage` holds `vanduo-primary-color` = `blue` from a prior visit
- **WHEN** the theme store initializes in dark mode
- **THEN** primary becomes `green` and `data-primary` is `green`

#### Scenario: explicit non-default primary is preserved

- **GIVEN** the user picks violet (or any non-auto primary) in the customizer
- **WHEN** they switch between light and dark
- **THEN** the chosen primary hue persists

### Requirement: integration snippets show docs bootstrap primary

Pages that document site bootstrap with `themeDefaults` SHALL show the docs site's
real dark primary override as `PRIMARY_DARK: "green"` in
`guides/FrameworkIntegration.vue` and `components/ThemeSwitcher.vue`. Generic
teaching samples that demonstrate other hues (e.g. violet via `setThemeDefaults`)
SHALL remain unchanged.

#### Scenario: FrameworkIntegration mirrors site bootstrap

- **GIVEN** `guides/FrameworkIntegration.vue` after this change
- **WHEN** its bootstrap code snippets are read
- **THEN** `PRIMARY_DARK` is `"green"`, not `"blue"`
