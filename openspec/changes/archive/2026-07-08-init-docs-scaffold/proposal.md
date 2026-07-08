## Why

The vd3 line (`@vanduo-oss/vd3` + `@vanduo-oss/vd3-cbun`) needs its own
documentation repo: a Vue3-only successor of the vd2 docs site with all
vanilla-engine machinery removed. The actual site is a clone of vd2 and can
only land once `@vanduo-oss/vd3` builds, so that clone is deferred to the
later `docs-clone-and-strip` change. Before that, the repo needs a clean,
reviewable baseline: repository hygiene files and the openspec bootstrap,
so every subsequent change (including the clone itself) is spec-driven from
day one. vd2 and the other old-line repos are read-only reference material;
this repo must be able to copy from them without ever depending on writing
to them.

## What Changes

- Add `.gitignore` adapted from `vd2/.gitignore`: `node_modules`, `dist`,
  `.DS_Store`, `*.log`, `.vite`, `playwright-report`, `test-results`,
  `tsconfig.tsbuildinfo`. The vd2-specific demo-audio allowlist block is
  dropped (no such assets in this repo).
- Add `LICENSE` (MIT), copied verbatim from `vd2/LICENSE`.
- Add `README.md` stub declaring the repo's purpose and pre-scaffold
  status: site lands via the `docs-clone-and-strip` openspec change;
  local-only until launch; deploys disabled; no CNAME.
- Bootstrap the openspec change flow with this change
  (`init-docs-scaffold`) as the first entry under `openspec/changes/`.

Pages/routes: none are added, changed, or removed — no site code exists
yet, and none is created by this change.

## Non-goals

- **NO `package.json`**, `pnpm-workspace.yaml`, `.npmrc`, lockfile, or any
  other package manifest in this change — the vd2 clone brings its own
  adapted manifests in `docs-clone-and-strip`.
- **NO site code**: no `src/`, no `vite.config.ts`, no `tsconfig.json`, no
  lint/test configs, no pages, routes, or components.
- No CI or deploy workflows; deploys stay disabled and no CNAME is added.
- No edits to `openspec/config.yaml` or to any old-line repo (core,
  framework, vue, vd2, charts, flowchart, hex-grid, music-player) — those
  are strictly read-only reference material.
- No npm publish activity of any kind (`@vanduo-oss/vd3-docs` is private
  and never published).

## Capabilities

### New Capabilities

- `repo-scaffold`: repository hygiene baseline for vd3-docs — ignore
  rules, license, and a README stub that accurately states pre-scaffold
  status until `docs-clone-and-strip` lands the site.

### Modified Capabilities

_None — no specs exist before this change._

## Impact

- New local-only repo `vd3-docs`; nothing is published or deployed.
- Three tracked files added at the repo root (`.gitignore`, `LICENSE`,
  `README.md`) plus this openspec change's artifacts.
- No dependencies are introduced, so no `pnpm install` (there is no
  `package.json` to install against).
- Later changes (`docs-clone-and-strip` and onward) build on this
  baseline; the ignore rules already cover the build/test artifacts that
  the cloned site will produce.
