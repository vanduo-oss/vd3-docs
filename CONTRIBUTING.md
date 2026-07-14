# Contributing

Thanks for your interest in `vd3-docs`.

## Current Status

`vd3-docs` is the documentation and demo site for the **vd3 line** of Vanduo UI
(`v1.0.1`, `private: true`). It dogfoods the published `@vanduo-oss/vd3` and
`@vanduo-oss/vd3-cbun` packages. Work happens directly on `main`; CI and the
GitHub Pages deploy run on every push to `main`.

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
pnpm run build           # Verifies the static build works (92 routes)
pnpm test                # Vitest unit/wrapper suite (143 specs)
pnpm run test:e2e        # Playwright visual-parity, Chromium Desktop (85 specs)
pnpm run test:a11y       # axe accessibility smoke (10 routes)
```

### Useful Checks

```sh
pnpm run lint
pnpm run stylelint
pnpm run format:check
pnpm run typecheck
pnpm test
pnpm run build
pnpm run test:size       # Reports gzipped dist/assets/app-* sizes vs budget
```

### Security Rules

The `.npmrc` mirrors the vd3 line's hardened install policy. Honor it:

1. **Always use `pnpm`** — never `npm install` or `yarn`.
2. **Pin exact versions** — `save-exact=true` is enforced by `.npmrc`.
3. **Keep `ignore-scripts=true`** — allow-list build scripts via
   `onlyBuiltDependencies` in `pnpm-workspace.yaml`, not a global override.
4. **Review `pnpm audit` output** before merging changes that touch
   dependencies.
5. **Adding new dependencies requires a justification** in the OpenSpec
   proposal's change rationale.

## OpenSpec Change Folders

Every meaningful change ships as an OpenSpec folder under
`openspec/changes/`. A change folder contains:

- `proposal.md` — the _why_ and the _what_.
- `design.md` — design notes and trade-offs (optional).
- `tasks.md` — a numbered checklist of work.
- `specs/<capability>/spec.md` — normative acceptance criteria (delta format).

Validate with `openspec validate <change> --strict`, implement the tasks, then
`openspec archive <change>` to promote the spec deltas and move the change under
`openspec/changes/archive/`.

Archived changes in the tree:

- `init-docs-scaffold` — repo scaffold and tooling.
- `docs-clone-and-strip` — cloned the prior docs site and stripped it to a
  Vue3-only surface for the vd3 line.
- `docs-content` — Vue3-only content that dogfoods the real `@vanduo-oss/vd3` /
  `@vanduo-oss/vd3-cbun` components.
- `docs-hardening` — visual-parity baselines, axe a11y smoke, and the size
  budget.

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

The Playwright visual-parity suite at `tests/e2e/visual-parity.spec.ts` uses
checked-in baselines under `tests/e2e/visual-parity.spec.ts-snapshots/`. To
refresh them after an intentional visual change:

```sh
pnpm exec playwright test visual-parity --project='Chromium Desktop' --update-snapshots
```

Inspect the diff carefully before committing — visual changes can hide
regressions. (Note: the suite allows `maxDiffPixelRatio: 0.03`, so sub-threshold
changes may not force a baseline rewrite.)

## Coding Standards

- **TypeScript** strict. `pnpm run typecheck` must pass.
- **ESLint** flat config. `pnpm run lint` must pass.
- **Stylelint** for `src/**/*.css`. `pnpm run stylelint` must pass.
- **Prettier** formatting. `pnpm run format:check` must pass; run
  `pnpm run format` to fix locally.
- **Dogfood the published packages** — render the real `Vd*` components,
  composables, and theme layer from `@vanduo-oss/vd3` (and the component bundle
  from `@vanduo-oss/vd3-cbun`) rather than reimplementing them. The site
  registers the `VanduoVue` plugin and imports `@vanduo-oss/vd3/css`.
- **Component naming** — doc-site SFCs are PascalCase files under `src/`
  (`layout/`, `overlays/`, `pages/`, …); the `Vd*` component names come from the
  upstream packages.

## Release Process

`vd3-docs` is `private: true` and is **not** published as an npm package — it
deploys as a static site to GitHub Pages. There is no `npm publish` step. Treat
`main` as the source of truth and the OpenSpec change folder as the spec record.

## Communication

Internal coordination happens in OpenSpec change folders and in
`openspec/specs/`. For the packages this site consumes, see
[`@vanduo-oss/vd3`](https://github.com/vanduo-oss/vd3) and
[`@vanduo-oss/vd3-cbun`](https://github.com/vanduo-oss/vd3-cbun).
