## MODIFIED Requirements

### Requirement: README states launched status honestly

The repository MUST contain a `README.md` that identifies the repo as the
documentation site for the vd3 line (`@vanduo-oss/vd3` + `@vanduo-oss/vd3-cbun`),
names it the Vue3-only successor of the vd2 docs site, and SHALL state the current
status honestly: the site is launched, dogfoods the published packages, and is
deployed to GitHub Pages at `https://vd3.vanduo.dev/` (Vite base `/`, via
`public/CNAME`) after changes merge to `main`. The README MUST NOT describe the
repo as pre-scaffold, local-only, or deploys-disabled, and MUST NOT claim the
`vanduo.dev` apex CNAME (that apex belongs to the `home/` repo; the docs site
uses the `vd3.vanduo.dev` subdomain).

#### Scenario: a visitor learns the repo state from the README alone

- **GIVEN** a contributor who has never seen the vd3 program plan
- **WHEN** they read `README.md` at the repo root
- **THEN** they learn what the repo hosts (vd3-line docs, Vue3-only), that the
  site is live and dogfoods the published `@vanduo-oss/vd3` / `@vanduo-oss/vd3-cbun`
  packages, and that it deploys to `https://vd3.vanduo.dev/` after merges to
  `main` — with no pre-scaffold, deploys-disabled, or `vanduo.dev`-apex-CNAME claims

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
