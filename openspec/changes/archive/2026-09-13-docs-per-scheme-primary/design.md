## Defaults

Light first-visit is Ink (`black`); dark first-visit is the published `blue`
token. `themeDefaults.PRIMARY_LIGHT` / `PRIMARY_DARK` stay in sync so first
paint matches the store before `init()`.

The package engine still stores one `vanduo-primary-color` and remaps the
`PRIMARY_LIGHT` / `PRIMARY_DARK` pair as “still on auto.” That is not enough:
an explicit violet in light must not become the dark primary. Docs therefore
owns two extra keys and applies the matching one on init, theme flip, and OS
scheme change. `persistPreference` still mirrors the active scheme onto
`vanduo-primary-color` for package demo pages.

## Storage

- `vanduo-primary-color-light`
- `vanduo-primary-color-dark`
- `vanduo-primary-color` — legacy read + current-scheme mirror

Prefix comes from `getStoragePrefix()` (`vanduo-` on this site).

## Migration

If either per-scheme key exists, those values win (missing side uses that
scheme's first-visit default).

If only the legacy key exists:

- `blue` (old shared docs default) → first-visit pair (`black` / `blue`)
- any other stored hue → current/last scheme keeps it; the other scheme
  gets its first-visit default

Dark+green logo-stop pins in `docs.css` are unchanged.
