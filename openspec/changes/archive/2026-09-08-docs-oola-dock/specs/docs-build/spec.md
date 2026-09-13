# docs-build

## ADDED Requirements

### Requirement: dock-route-registration

`/components/dock` MUST be registered in `src/nav.ts` (beside Navbar, unique
`id` `dock`, keywords including dock / oola / navbar / morph / glass /
customizer), `src/router.ts` (`componentPages.dock`), and
`tests/e2e/routes.ts`.

#### Scenario: nav and routes agree

- **GIVEN** the docs nav tree and `ROUTES`
- **WHEN** they are compared
- **THEN** `/components/dock` is present in both
