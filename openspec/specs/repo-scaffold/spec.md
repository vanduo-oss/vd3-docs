# repo-scaffold Specification

## Purpose
TBD - created by archiving change init-docs-scaffold. Update Purpose after archive.
## Requirements
### Requirement: ignore rules for build and OS artifacts
The repository MUST provide a `.gitignore` covering dependency and build
output (`node_modules`, `dist`, `.vite`, `tsconfig.tsbuildinfo`), test
artifacts (`playwright-report`, `test-results`), logs (`*.log`), and OS
noise (`.DS_Store`).

#### Scenario: build and test artifacts are never tracked
- **GIVEN** a clone of vd3-docs after the site lands and a full
  build + test run has produced `node_modules/`, `dist/`, `.vite/`,
  `playwright-report/`, and `test-results/`
- **WHEN** a contributor runs `git status`
- **THEN** none of those directories, no `*.log` file, no
  `tsconfig.tsbuildinfo`, and no `.DS_Store` appear as untracked changes

### Requirement: MIT license
The repository MUST contain a `LICENSE` file with the MIT license text
copied verbatim from `vd2/LICENSE` (copyright "2024-2026 Vanduo
Framework"), so the vd3 docs line ships under the same terms as the rest
of the Vanduo ecosystem.

#### Scenario: license matches the vd2 source of truth
- **GIVEN** the read-only reference file `vd2/LICENSE`
- **WHEN** `LICENSE` in vd3-docs is compared byte-for-byte against it
- **THEN** the files are identical

### Requirement: README states pre-scaffold status honestly
The repository MUST contain a `README.md` that identifies the repo as the
documentation site for the vd3 line (`@vanduo-oss/vd3` +
`@vanduo-oss/vd3-cbun`), names it the Vue3-only successor of the vd2 docs
site, and SHALL state the current status: pre-scaffold, site arrives via
the `docs-clone-and-strip` openspec change, local-only until launch,
deploys disabled, no CNAME.

#### Scenario: a visitor learns the repo state from the README alone
- **GIVEN** a contributor who has never seen the vd3 program plan
- **WHEN** they read `README.md` at the repo root
- **THEN** they learn what the repo will host (vd3-line docs,
  Vue3-only), that no site code exists yet, which openspec change brings
  the site (`docs-clone-and-strip`), and that deploys are disabled with
  no CNAME until launch

### Requirement: no premature package or site code
At the end of this change the repository SHALL NOT contain a
`package.json`, lockfile, `.npmrc`, `pnpm-workspace.yaml`, `src/`
directory, build config, or CI/deploy workflow — the vd2 clone brings its
own adapted manifests and code in `docs-clone-and-strip`.

#### Scenario: repo root holds hygiene files only
- **GIVEN** the repo immediately after this change is applied
- **WHEN** the repo root is listed (excluding `.git/`, `openspec/`, and
  `.claude/`)
- **THEN** exactly `.gitignore`, `LICENSE`, and `README.md` are present
  and no `package.json`, `src/`, or workflow files exist

