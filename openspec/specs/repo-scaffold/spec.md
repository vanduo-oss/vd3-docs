# repo-scaffold Specification

## Purpose
Maintain ignore rules, MIT license, honest README, and feature-branch
PR-to-main publish policy for vd3-docs.

## Requirements

### Requirement: ignore rules for build and OS artifacts

The repository MUST provide a `.gitignore` covering dependency and build
output (`node_modules`, `dist`, `.vite`, `tsconfig.tsbuildinfo`), test
artifacts (`playwright-report`, `test-results`), logs (`*.log`), and OS
noise (`.DS_Store`). It MUST also ignore Playwright visual-parity Mobile
darwin snapshots matching `*-Chromium-Mobile-darwin.png` under
`tests/e2e/visual-parity.spec.ts-snapshots/` so only Chromium Desktop
darwin baselines remain trackable.

#### Scenario: build and test artifacts are never tracked

- **GIVEN** a clone of vd3-docs after a full build + test run has produced
  `node_modules/`, `dist/`, `.vite/`, `playwright-report/`, and
  `test-results/`
- **WHEN** a contributor runs `git status`
- **THEN** none of those directories, no `*.log` file, no
  `tsconfig.tsbuildinfo`, and no `.DS_Store` appear as untracked changes

#### Scenario: Mobile darwin visual snapshots stay untracked

- **GIVEN** a local `test:e2e:full` run that writes
  `*-Chromium-Mobile-darwin.png` under
  `tests/e2e/visual-parity.spec.ts-snapshots/`
- **WHEN** a contributor runs `git status`
- **THEN** those Mobile darwin PNGs do not appear as untracked files to
  commit

### Requirement: MIT license
The repository MUST contain a `LICENSE` file with the MIT license text
copied verbatim from `vd2/LICENSE` (copyright "2024-2026 Vanduo
Framework"), so the vd3 docs line ships under the same terms as the rest
of the Vanduo ecosystem.

#### Scenario: license matches the vd2 source of truth
- **GIVEN** the read-only reference file `vd2/LICENSE`
- **WHEN** `LICENSE` in vd3-docs is compared byte-for-byte against it
- **THEN** the files are identical

### Requirement: README states launched status honestly

The README SHALL identify this Vue 3 docs site, name `@vanduo-oss/vd3`,
charts, and flowchart, and state that published packages are dogfooded and
deployed at `https://vd3.vanduo.dev/`. It MUST NOT treat
`@vanduo-oss/vdl-cbun` as a dependency or claim the `vanduo.dev` apex.

#### Scenario: a visitor learns the repo state from the README alone

- **GIVEN** a contributor who has never seen the vd3 program plan
- **WHEN** they read `README.md` at the repo root
- **THEN** they learn what the repo hosts (vd3-line docs), that the site
  dogfoods the published `@vanduo-oss/vd3`, `@vanduo-oss/vd3-charts`, and
  `@vanduo-oss/vd3-flowchart` packages, and that it deploys to
  `https://vd3.vanduo.dev/` after merges to `main` — with no
  `@vanduo-oss/vdl-cbun` dependency, pre-scaffold, deploys-disabled, or
  `vanduo.dev`-apex-CNAME claims

### Requirement: feature-branch PR publish policy

`CONTRIBUTING.md` MUST require short-lived feature branches and a pull request
into `main` for shipping work. Contributors MUST NOT push commits directly to
`main`. Branch names MAY use a `docs/…` (or similar) prefix; package-style
`dev-vXXX` names are NOT required. CI MUST run on the PR; GitHub Pages MUST
continue to deploy from `main` after merge.

#### Scenario: contributor learns the publish path

- **GIVEN** a contributor reading `CONTRIBUTING.md`
- **WHEN** they check Branch and Push Policy
- **THEN** they are instructed to open a feature-branch PR to `main`, not to
  push commits straight to `main`, and they learn Pages still deploys from
  `main` after merge
