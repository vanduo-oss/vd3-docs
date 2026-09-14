## 1. Published pins and content

- [x] 1.1 Pin registry `@vanduo-oss/vd3-charts@1.1.0` and
      `@vanduo-oss/vd3-flowchart@1.2.0` with no `link:` override
- [x] 1.2 Switch live imports and CSS from cbun charts/flowchart to the
      dedicated packages; keep remaining widgets on cbun
- [x] 1.3 Add `/changelog` Latest cards and update landing/guide/install copy
- [x] 1.4 Update OpenSpec canonical specs and config for the new pins

## 2. Quality gates

- [x] 2.1 Frozen install; raw moderate audit captured; `--ignore-unfixable`
      passes without suppressing fixable advisories
- [x] 2.2 Strict OpenSpec validation, typecheck, lint, stylelint, format check
- [x] 2.3 Unit tests, vite-ssg build, gzip size budget, search index
- [x] 2.4 Chromium Playwright and axe smoke; refresh only intentional visual
      baselines

## 3. Land

- [x] 3.1 Review the final diff and create one local commit; do not push or
      publish
