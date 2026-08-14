# docs-content

## ADDED Requirements

### Requirement: login-page

The docs site MUST register `/components/login` (nav id `login`) with search
keywords covering login, auth, sign-in, OTP, and checkbox, and the page MUST
live-render `VdLogin`, `VdSignUp`, `VdForgotPassword`, `VdOtpInput`, and
`VdCheckbox` from `@vanduo-oss/vd3` with `framed` false. API tables MUST match
package source.

#### Scenario: login demo is live Vue

- **GIVEN** the login page
- **WHEN** it is rendered
- **THEN** a `VdLogin` instance SHALL be in the document (not CSS-only markup)

## MODIFIED Requirements

### Requirement: table-page-data-table

`/components/table` MUST live-render `VdDataTable` (sort, search, selection,
and a cell slot using `VdAvatar`) and MUST document `columns.variant` as
applying `vd-table-{variant}` on `VdDataTable` headers, not on `VdTable`.

#### Scenario: data table is live

- **GIVEN** the table page
- **WHEN** it is rendered
- **THEN** a `.vd-data-table` SHALL be present
