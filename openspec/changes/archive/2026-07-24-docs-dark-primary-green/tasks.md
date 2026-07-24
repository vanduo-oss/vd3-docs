## 1. Theme defaults

- [x] 1.1 Set `PRIMARY_DARK: "green"` in `src/main.ts` with updated comment
- [x] 1.2 Add docs auto-primary migration (`blue` → green) in `src/stores/theme.ts`

## 2. CSS pin

- [x] 2.1 Pin dark + green `--vd-color-primary*` tokens in `src/styles/docs.css`
- [x] 2.2 Switch brand wordmark `#2f9e44` to `var(--vd-green-8)`

## 3. Docs snippets

- [x] 3.1 Update `FrameworkIntegration.vue` bootstrap examples to green
- [x] 3.2 Update `ThemeSwitcher.vue` Option A example to green

## 4. Validate

- [x] 4.1 `openspec validate docs-dark-primary-green --strict`
- [x] 4.2 `mise exec node@24 -- pnpm build` in vd3-docs
- [x] 4.3 Run unit tests; refresh Playwright baselines only if visual diffs warrant
