## Why

Six completed changes were just archived, promoting most of the post-launch deltas — but two normative specs still describe the pre-launch world (pnpm `link:` sibling deps, a hardcoded "93 routes", and a "pre-scaffold / deploys-disabled / no-CNAME" README). Several meta-docs also drifted: `CHANGELOG.md` is still a verbatim `vd2` copy (violating the existing single-engine-docs changelog requirement), `CONTRIBUTING.md` prescribes a `dev-vXXX → main` PR flow this repo does not use, and the deploy comment / `package.json` `homepage` point at `vanduo.dev` instead of the real project page. This closes the reality gap so the specs and repo docs match the shipped, published-deps, launched site.

## What Changes

- **docs-build**: the dependency requirement no longer mandates `link:../vd3` / `link:../vd3-cbun`; it requires the published `@vanduo-oss/vd3` `^1.0.0` and `@vanduo-oss/vd3-cbun` `^1.2.0` deps to resolve from the npm registry. The static-build requirement drops the "via `link:`" framing and stops pinning an exact route count (it verifies every `nav.ts` route prerenders, rather than asserting "93").
- **repo-scaffold**: "README states pre-scaffold status honestly" becomes "README states launched status honestly" — the README identifies the live vd3-line docs site (dogfooding published packages, deployed to the `/vd3-docs/` Pages project page), not a pre-scaffold placeholder.
- **Compliance / meta-doc fixes** (no spec change):
  - Rewrite `CHANGELOG.md` to satisfy the existing single-engine-docs "changelog is single-engine and packages-only" requirement (drop the `vd2` header, `EngineBadge`, `@vanduo-oss/framework 1.6.0`, `vue 0.2.0`, and per-engine references).
  - Fix `CONTRIBUTING.md` to the repo's actual main-only flow (push to `main`; no `dev-vXXX` branch, no `dev→main` PR) and correct its stale version string.
  - Repoint the deploy/canonical base off the vd2-inherited `vanduo.dev` apex (which the site cannot serve — `home/` owns it, `VITE_BASE=/vd3-docs/`, no CNAME) to the real `https://vanduo-oss.github.io/vd3-docs/` project page: the `deploy.yml` top comment, `package.json` `homepage`, the `App.vue` SEO `BASE_URL` (per-page `<link rel=canonical>` + `og:url`), and the `generate-sitemap.mjs` `BASE_URL`.
  - Correct stale route/spec counts in `README.md` + `CONTRIBUTING.md` and add `code-editor` + `draw` to the README's cbun component list.

No routes or pages are added, changed, or removed; the only `src/` edit is the SEO `BASE_URL` constant (invisible `<head>` metadata), not visible page content.

## Capabilities

### New Capabilities
- _None._

### Modified Capabilities
- `docs-build`: dependency-resolution requirement (published `^` deps, not `link:`) and the static-build requirement (route-count no longer hardcoded; no `link:` framing).
- `repo-scaffold`: the README-status requirement now describes the launched, deployed site rather than a pre-scaffold placeholder.

## Impact

- Specs: `openspec/specs/docs-build/spec.md`, `openspec/specs/repo-scaffold/spec.md`.
- Meta-docs (no runtime impact): `CHANGELOG.md`, `CONTRIBUTING.md`, `README.md`, `.github/workflows/deploy.yml`, `package.json` (`homepage` only).
- SEO base only (no visible content): `src/App.vue` `BASE_URL` (canonical + og:url) and `scripts/generate-sitemap.mjs` `BASE_URL`.
- No route, dependency, or visual-baseline changes. `CHANGELOG.md` is brought into compliance with an already-shipped requirement, not given a new one.
