# docs-build delta: search pages

## Requirement: Route registration

New pages MUST appear in `nav.ts`, `router.ts` `componentPages`, and `tests/e2e/routes.ts`.

#### Scenario: Visual parity includes new routes

- **WHEN** `tests/unit/visual-parity-routes.spec.ts` compares ROUTES to nav
- **THEN** `/components/global-search` and `/guides/hybrid-search` MUST be listed

## Requirement: Search index includes new pages

After nav registration, `pnpm index` MUST emit documents for the new routes in
`public/search/search-index.json` and matching vectors.

#### Scenario: Eval covers new intent

- **WHEN** `pnpm index:eval` runs
- **THEN** queries targeting global/hybrid search documentation MUST pass top-3 gates

## Requirement: Visual baselines

Playwright visual baselines MUST be updated when new page markup is added.

#### Scenario: Baseline refresh

- **GIVEN** two new doc routes
- **WHEN** the visual test suite runs with `--update-snapshots`
- **THEN** committed baselines MUST include both routes
