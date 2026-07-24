## RENAMED Requirements

- FROM: `### Requirement: README states pre-scaffold status honestly`
- TO: `### Requirement: README states launched status honestly`

## MODIFIED Requirements

### Requirement: README states launched status honestly

The repository MUST contain a `README.md` that identifies the repo as the
documentation site for the vd3 line (`@vanduo-oss/vd3` + `@vanduo-oss/vd3-cbun`),
names it the Vue3-only successor of the vd2 docs site, and SHALL state the current
status honestly: the site is launched, dogfoods the published packages, and is
deployed to the GitHub Pages project page at `https://vanduo-oss.github.io/vd3-docs/`
(base `/vd3-docs/`) on push to `main`. The README MUST NOT describe the repo as
pre-scaffold, local-only, or deploys-disabled, and MUST NOT claim a `vanduo.dev`
CNAME (that apex belongs to the `home/` repo).

#### Scenario: a visitor learns the repo state from the README alone

- **GIVEN** a contributor who has never seen the vd3 program plan
- **WHEN** they read `README.md` at the repo root
- **THEN** they learn what the repo hosts (vd3-line docs, Vue3-only), that the
  site is live and dogfoods the published `@vanduo-oss/vd3` / `@vanduo-oss/vd3-cbun`
  packages, and that it deploys to the `/vd3-docs/` Pages project page on push to
  `main` — with no pre-scaffold, deploys-disabled, or `vanduo.dev`-CNAME claims
