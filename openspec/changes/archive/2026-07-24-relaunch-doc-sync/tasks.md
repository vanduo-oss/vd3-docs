# Tasks

## 1. Spec realignment (no code — specs match shipped reality)

- [x] 1.1 Confirm `package.json` already pins `@vanduo-oss/vd3` `^1.0.0` and `@vanduo-oss/vd3-cbun` `^1.2.0` with no `link:` entries in `pnpm-lock.yaml`; the `docs-build` deltas realign the spec, no manifest edit expected.

## 2. repo-scaffold: README launched status

- [x] 2.1 README already describes the launched state (dogfoods published packages, deploys to Pages); confirmed no pre-scaffold / local-only / deploys-disabled / CNAME language remains. The `repo-scaffold` delta reconciles the spec to it.
- [x] 2.2 De-hardcode the route count in `README.md` ("92 routes" → "one page per `nav.ts` route").
- [x] 2.3 Add `code-editor` and `draw` to the README's cbun component list so all six components are named.

## 3. CHANGELOG compliance with single-engine-docs

- [x] 3.1 Rewrite `CHANGELOG.md`: drop the `vd2` header and every vanilla/dual-engine reference (`EngineBadge`, `@vanduo-oss/framework 1.6.0`, `vue 0.2.0`, per-engine filtering); make it a concise pointer to the rendered `/changelog` (packages-only) and to each package's own changelog.
- [x] 3.2 Grep-verify `CHANGELOG.md` for `vd2` / `EngineBadge` / `framework` / `per-engine` → zero matches.

## 4. CONTRIBUTING branch flow

- [x] 4.1 Rewrite the Branch and Push Policy + Current Status to the repo's real flow: work directly on `main`, push when ready, Pages deploys on push — no `dev-vXXX` branch, no `dev→main` PR.
- [x] 4.2 Drop the stale hardcoded version string and the `92 routes` / `143 specs` / `85 specs` / `10 routes` counts.

## 5. Deploy + canonical base URL (off the unreachable vanduo.dev apex)

- [x] 5.1 Repoint the `deploy.yml` top comment to `https://vanduo-oss.github.io/vd3-docs/`.
- [x] 5.2 Set `package.json` `homepage` to `https://vanduo-oss.github.io/vd3-docs/`. Did NOT add a `vanduo.dev` CNAME.
- [x] 5.3 Set `src/App.vue` `BASE_URL` (per-page `<link rel=canonical>` + `og:url`) to `https://vanduo-oss.github.io/vd3-docs`.
- [x] 5.4 Set `scripts/generate-sitemap.mjs` `BASE_URL` to the same; `dist/sitemap.xml` now lists 94 real URLs (0 `vanduo.dev`).
- [x] 5.5 Left the 404-page prose (`not-found.vue`) and demo strings (`Modal.vue`) as-is — visible copy, out of scope.

## 6. Verify

- [x] 6.1 `pnpm typecheck` && `pnpm lint` && `pnpm stylelint` && `pnpm test` (144) all green.
- [x] 6.2 `mise exec node@24 -- pnpm build` prerendered all 94 routes; sitemap written with 94 project-page URLs; home canonical = `https://vanduo-oss.github.io/vd3-docs/`.
- [x] 6.3 `openspec validate relaunch-doc-sync` passes; `openspec validate --all` 6/6.
- [x] 6.4 Repo-wide grep: no stray `vanduo.dev` in specs/config/CHANGELOG/CONTRIBUTING/README/deploy/App/sitemap (only the 404 prose + a Modal demo string remain, intentionally).
