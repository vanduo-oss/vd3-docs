# Design: standalone charts/flowchart dogfood

## Registry pins

The manifest stays exact and resolves `@vanduo-oss/vd3-charts@1.1.0` and
`@vanduo-oss/vd3-flowchart@1.2.0` from npm, alongside the existing
`@vanduo-oss/vd3@1.7.2` and `@vanduo-oss/vd3-cbun@1.4.2` pins. The lockfile
MUST contain registry integrity entries and no sibling `link:` override.

`.npmrc` already excludes `@vanduo-oss/*` from `minimum-release-age`, so the
same-day publishes install.

## CSS and Vite

`main.ts` loads `@vanduo-oss/vd3-charts/css` and
`@vanduo-oss/vd3-flowchart/css` instead of the cbun charts/flowchart sheets.
Code-editor, draw, and music-player CSS stay on cbun. Vite
`optimizeDeps.exclude`, `ssr.noExternal`, and `server.fs.allow` add the new
packages so a temporary sibling `pnpm link` still works.

## Changelog layout

Keep a two-column grid. Four `.changelog-col` children wrap to:

```
vd3            | vd3-cbun
vd3-charts     | vd3-flowchart
```

Historical cbun 1.4.2 (and older) cards are left unchanged, including
`@vanduo-oss/vd3-cbun/charts` strings that were true for those releases.

## Copy

Steer new installs to `@vanduo-oss/vd3-charts` and `@vanduo-oss/vd3-flowchart`.
Do not claim the widgets were removed from the bundle. Do not revive the
retired npm names `@vanduo-oss/charts` and `@vanduo-oss/flowchart`.

## Verification

Use Node 24 through mise. Run frozen install, raw moderate audit (retain
unfixable `CVE-2026-76845` / `GHSA-vwc7-r8mq-g2x9`; gate with
`--ignore-unfixable`), OpenSpec validation, static checks, unit tests, SSG
build, size, search index, Chromium Playwright, and axe smoke. Refresh visual
baselines only where markup actually shifts pixels.
