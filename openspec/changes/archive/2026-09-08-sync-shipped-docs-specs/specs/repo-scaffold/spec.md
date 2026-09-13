# repo-scaffold

## MODIFIED Requirements

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
