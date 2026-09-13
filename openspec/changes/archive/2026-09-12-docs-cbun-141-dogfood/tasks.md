## 1. Published pin

- [x] 1.1 Remove `@vanduo-oss/vd3-cbun: link:../vd3-cbun` from `pnpm-workspace.yaml`
- [x] 1.2 `pnpm install` so the lockfile resolves registry `1.4.1` with no `link:`

## 2. Changelog and demos

- [x] 2.1 Rewrite the `/changelog` 1.4.1 card (hex, draw, charts, code-editor)
- [x] 2.2 Hex page + preview: published types, public APIs, remount-on-theme
- [x] 2.3 Type Draw against published wrapper types; document 1.4.1 expose methods
- [x] 2.4 Docs-landing pins, flowchart test describe, code-editor wrap caret note

## 3. Gates

- [x] 3.1 `openspec validate docs-cbun-141-dogfood --strict`
- [x] 3.2 `pnpm typecheck` and `pnpm test`
- [x] 3.3 `pnpm build` and `pnpm index`
- [x] 3.4 Browser-verify cbun routes; refresh visual baselines only if pixels change
