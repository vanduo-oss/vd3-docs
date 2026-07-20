## Why

Dark-mode UI accents should match the vd3 logo green (`#2f9e44`, Open Color
`--vd-green-8`), not the prior docs default blue. The hue comes from
`themeDefaults.PRIMARY_DARK`; a docs-only CSS pin keeps the exact logo stop
across vd3 package updates.

## What Changes

**Routes:** none added or removed — global theme defaults and shell styling only.

- [`src/main.ts`](src/main.ts): `themeDefaults.PRIMARY_DARK` `"blue"` → `"green"`.
- [`src/stores/theme.ts`](src/stores/theme.ts): treat legacy stored `"blue"` as a
  docs auto-primary (mirror `DOCS_NEUTRAL`) so visitors migrate to green.
- [`src/styles/docs.css`](src/styles/docs.css): dark + `data-primary="green"` pin
  of `--vd-color-primary*` to the `--vd-green-*` ramp; brand wordmark uses
  `var(--vd-green-8)`.
- [`src/pages/guides/FrameworkIntegration.vue`](src/pages/guides/FrameworkIntegration.vue)
  and [`src/pages/components/ThemeSwitcher.vue`](src/pages/components/ThemeSwitcher.vue):
  bootstrap snippets show `PRIMARY_DARK: "green"`.

## Non-goals

- No `@vanduo-oss/vd3` package change or package changelog entry.
- Light-mode primary stays package `PRIMARY_LIGHT` (`black`).
- Generic teaching samples that use violet or other hues stay unchanged.

## Impact

- Affected specs: **`docs-build`** (main.ts bootstrap), **`docs-content`**
  (integration snippets, dark accent appearance).
- Visual-parity baselines may shift on dark-themed routes if primary accents
  change in screenshots.
