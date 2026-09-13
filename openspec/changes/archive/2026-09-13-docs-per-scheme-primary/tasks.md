## 1. Defaults and persistence

- [x] 1.1 Set `DOCS_DEFAULT_PRIMARY_*` and `themeDefaults` to light `black` / dark `blue`
- [x] 1.2 Persist `vanduo-primary-color-light` and `vanduo-primary-color-dark` in the docs theme store
- [x] 1.3 First visit writes both defaults and applies the resolved scheme
- [x] 1.4 User primary changes update only the current scheme; theme flips restore the other
- [x] 1.5 Migrate a legacy `vanduo-primary-color` without wiping explicit picks

## 2. Docs copy

- [x] 2.1 Update ThemeSwitcher bootstrap snippet to `PRIMARY_LIGHT: "black"` / `PRIMARY_DARK: "blue"`

## 3. Gates

- [x] 3.1 Update unit tests for first-visit defaults, per-scheme isolation, reload, and legacy migration
- [x] 3.2 Focused `pnpm test` for the touched theme files
- [x] 3.3 `openspec validate docs-per-scheme-primary --strict`
- [x] 3.4 Browser-verify first-visit light/dark and independent scheme prefs
