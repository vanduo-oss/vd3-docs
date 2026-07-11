# Contributing

Thanks for your interest in `vd2`.

## Current Status

`vd2` is the public documentation site at [vanduo.dev](https://vanduo.dev)
(`v0.3.0`, `private: true`). Work happens directly on `main`; CI and GitHub
Pages deploy run on every push to `main`.

## Development Setup

### Prerequisites

- **Node.js ≥ 24** (matches `engines.node` in `package.json`).
- **Corepack enabled** (ships with Node.js, activates pnpm):
  ```sh
  corepack enable
  ```

### First-time Setup

```sh
corepack enable
pnpm install
pnpm run build           # Verifies the static build works
pnpm test                # Vitest unit suite (105 specs)
pnpm run test:e2e        # Playwright Chromium Desktop smoke (77 specs)
```

### Useful Release Checks

```sh
pnpm run lint
pnpm run stylelint
pnpm run format:check
pnpm run typecheck
pnpm test
pnpm run build
pnpm run test:size       # Reports gzipped dist/assets/app-* sizes
pnpm pack --dry-run      # Verifies the package tarball contents
```

### Security Rules

The `.npmrc` mirrors the framework repo's hardened install policy.
Honor it:

1. **Always use `pnpm`** — never `npm install` or `yarn`.
2. **Pin exact versions** — `save-exact=true` is enforced by `.npmrc`.
3. **Never run `--ignore-scripts` globally** — use `pnpm.allowedBuilds`
   in `package.json` instead.
4. **Review `pnpm audit` output** before merging changes that touch
   dependencies.
5. **Adding new dependencies requires a justification** in the OpenSpec
   proposal's `### Out of Scope` or change rationale.

## OpenSpec Change Folders

Every meaningful change ships as an OpenSpec folder under
`openspec/changes/`. A change folder contains:

- `proposal.md` — the _why_ and the _what_.
- `design.md` — design notes and trade-offs (optional).
- `tasks.md` — a numbered checklist of work.
- `specs/<change-name>/spec.md` — normative acceptance criteria.

Branch name convention: `<topic-kebab-case>` for the OpenSpec change folder.
Match the folder name when naming commits or PRs for traceability.

Examples already in the tree:

- `app-shell/`, `core-components/`, `docs-routing-and-content/`
  (foundation changes shipped in `0.1.0`).
- `vd-layout-navigation/`, `vd-data-display/`, `vd-feedback/`,
  `vd-interactive-forms/`, `vd-core-foundation/`, `vd-effects/`,
  `vd-theme-customizer/`, `vd-guides/` (capability-transfer changes
  shipped in `0.2.0`).
- `promote-layout-to-framework/` (next plan, not yet implemented).

Historical change folders (e.g. `release-0.2-pre-release-polish/`) remain
for reference; the current workflow is main-only.

## Branch and Push Policy

- All work happens on **`main`**. This is a docs site — no release-prep or
  long-lived feature branches.
- Push to `origin/main` when changes are ready; CI runs on push and pull
  requests, and GitHub Pages deploys automatically on `main`.
- For larger changes, still add an OpenSpec folder under `openspec/changes/`
  to record the spec, but keep the git workflow on `main`.

> **CI note:** the workflow pins Node 24 to match `engines.node` in
> `package.json`.

## Updating Visual Baselines

The Playwright visual-parity suite at
`tests/e2e/visual-parity.spec.ts` uses checked-in baselines under
`tests/e2e/visual-parity.spec.ts-snapshots/`. To refresh them after an
intentional visual change:

```sh
pnpm exec playwright test --update-snapshots
```

Inspect the diff carefully before committing — visual changes can hide
regressions.

## Coding Standards

- **TypeScript** strict. `pnpm run typecheck` must pass.
- **ESLint** flat config. `pnpm run lint` must pass.
- **Stylelint** for `src/**/*.css`. `pnpm run stylelint` must pass.
- **Prettier** formatting. `pnpm run format:check` must pass; run
  `pnpm run format` to fix locally.
- **No JS coupling** to `@vanduo-oss/framework` runtime — vd2 consumes
  only the CSS bundle (`@vanduo-oss/framework/css`) and class names.
- **Component naming** — all Vd\* components are PascalCase SFCs under
  `src/components/`. Filenames are kebab-case.

## Release Process (Future)

`vd2` is currently `private: true` and not published as an npm package.
When the maintainer is ready to publish:

1. Remove `"private": true` from `package.json`.
2. Update `engines.node` if the consumer target changes.
3. Verify `pnpm pack --dry-run` lists the expected files
   (`dist/`, `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE`, `README.md`,
   `package.json`).
4. Tag the release commit (`vX.Y.Z`) on `main`.
5. Run `pnpm publish --dry-run` first; review the registry payload.
6. Coordinate the publish with any sibling framework/docs releases.

Until then, treat `main` as the source of truth and the OpenSpec change
folder as the spec record.

## Communication

Internal coordination happens in OpenSpec change folders and in
`openspec/specs/`. For questions about the framework itself, see the
upstream [`@vanduo-oss/framework`](https://github.com/vanduo-oss/framework)
repo.

---

Thanks for your patience while the architecture and roadmap settle.
