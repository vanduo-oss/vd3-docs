## 1. Published pin and content

- [x] 1.1 Pin registry `@vanduo-oss/vd3-cbun@1.4.2` with no `link:` override
- [x] 1.2 Add the `/changelog` 1.4.2 card and move the Latest marker
- [x] 1.3 Update latest/install/sample version copy to 1.4.2
- [x] 1.4 Document and integration-test core `role` / Vue `svgRole`

## 2. Quality gates

- [x] 2.1 Frozen install; raw moderate audit captured the unfixable transitive
      `CVE-2026-76845` / `GHSA-vwc7-r8mq-g2x9`, and `--ignore-unfixable` passes
      without suppressing fixable advisories
- [x] 2.2 Strict OpenSpec validation, typecheck, lint, stylelint, format check
- [x] 2.3 Unit tests, vite-ssg build, gzip size budget, search index, and eval
- [x] 2.4 Chromium Playwright, Firefox/WebKit/mobile smoke, and axe smoke
- [x] 2.5 Refresh and inspect only intentional visual baseline changes

## 3. Land

- [x] 3.1 Review the final diff and create one local commit; do not push or publish
