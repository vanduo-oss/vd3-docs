## Context

The docs site launched: `package.json` now dogfoods the published `@vanduo-oss/vd3` `^1.0.0` and `@vanduo-oss/vd3-cbun` `^1.2.0`, and `deploy.yml` deploys to the `/vd3-docs/` GitHub Pages project page on push to `main`. Archiving the six completed changes promoted most post-launch deltas, but two `docs-build` requirements and the `repo-scaffold` README requirement still describe the pre-launch world, and several meta-docs (`CHANGELOG.md`, `CONTRIBUTING.md`, `deploy.yml`, `package.json` `homepage`, `README.md`) drifted with them.

Note: `vite.config.ts` intentionally retains its `dedupe` / `optimizeDeps.exclude` / `ssr.noExternal` / `server.fs.allow` settings so a contributor can still `pnpm link` the sibling trees to render unreleased library work locally. The "vite configuration supports dev-linked vd3 packages" requirement therefore remains accurate and is **not** modified.

## Goals / Non-Goals

**Goals:**
- Make `docs-build` describe published-`^` dependency resolution (link as an optional local override) and drop the hardcoded route count.
- Make `repo-scaffold` describe the launched, deployed README rather than a pre-scaffold placeholder.
- Bring the drifted meta-docs into line (compliance with already-shipped requirements, no new requirements for them).

**Non-Goals:**
- No _visible_ route/page content changes; no `nav.ts` edits; no visual-baseline updates. (The SEO `BASE_URL` — invisible `<head>` canonical/og + the generated sitemap — is corrected, since it is the same "where does this site live" concern and was vd2-clone drift.)
- No library (`vd3` / `vd3-cbun`) changes.
- No `vanduo.dev` CNAME (the `home/` repo owns that apex).
- No change to `vite.config.ts` behavior.

## Decisions

- **Deps requirement is a superset, not a swap.** The MODIFIED "package identity and dependency targets" keeps its `manifest names the vd3 line` scenario (updated to `^` ranges), adds a `published vd3 packages resolve from the registry` scenario, and **retains** the existing `unpublished vd3 packages resolve via link` scenario reworded to the optional local-`pnpm link` dev path. Keeping every original scenario header avoids the archive drop-guard while staying honest (published is the default; link is the local override).
- **De-hardcode the route count.** The build requirement asserts "every route registered in `src/nav.ts`" instead of "93 routes", so it can't rot on page add/remove. Same principle applied to the `README.md` / `CONTRIBUTING.md` count strings (replace exact numbers with "every route" / drop the parenthetical counts).
- **Rename the README-status requirement.** `repo-scaffold` uses `## RENAMED Requirements` (FROM `README states pre-scaffold status honestly` TO `README states launched status honestly`) plus a MODIFIED body; the single scenario header (`a visitor learns the repo state from the README alone`) is preserved and reworded.
- **CHANGELOG is compliance, not a new requirement.** `single-engine-docs` already requires the changelog be single-engine and packages-only; the vd2-copy `CHANGELOG.md` simply violates it, so the fix is a task, not a spec delta.

## Risks / Trade-offs

- [Rewriting `CHANGELOG.md` could lose real release history] → Preserve the genuine `@vanduo-oss/vd3` / `vd3-cbun` package release entries; only strip the vd2/vanilla-engine framing, wrong header, and mis-versioned lines.
- [Renaming a requirement could confuse a later archive] → Use the explicit `RENAMED` FROM/TO block and keep the scenario header stable so the delta stays archive-clean.

## Migration Plan

Pure docs/spec change: implement the tasks, run `pnpm build` + `pnpm test` + `pnpm typecheck` to confirm nothing regressed, then archive the change so the two spec deltas promote. No rollback concerns beyond `git revert`.
