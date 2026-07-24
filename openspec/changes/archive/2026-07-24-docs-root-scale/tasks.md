## 1. OpenSpec

- [x] 1.1 Add change artifacts under `openspec/changes/docs-root-scale/`
- [x] 1.2 Run `openspec validate docs-root-scale --strict`

## 2. Root scale + chrome vars

- [x] 2.1 Set `html { font-size: 90% }` and docs chrome offset vars in `docs.css`
- [x] 2.2 Replace px shell hardcodes (sidebar sticky, scroll-margin, scroll-loader,
      mobile hero) with the shared vars
- [x] 2.3 Move `#main-content` offsets from `App.vue` inline styles to `app.css`
- [x] 2.4 Use `--docs-main-offset` for home anchor scroll-margin in `home.vue`

## 3. Validate

- [x] 3.1 `mise exec node@24 -- pnpm build` in `vd3-docs`
- [x] 3.2 `mise exec node@24 -- pnpm test` (unit + e2e)
- [x] 3.3 Refresh Playwright visual baselines (`--update-snapshots`) for global
      appearance change
