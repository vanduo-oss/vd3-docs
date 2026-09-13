# docs-build

## ADDED Requirements

### Requirement: shell content offsets track dock edges

Docs shell CSS SHALL expose content/sticky offset variables that clear the
fixed site dock for every placement (bottom, left, top, right). Those
variables MUST NOT depend on `--vd-navbar-height` or `--vd-navbar-float-inset`
for the site shell. A data attribute (or equivalent) reflecting the active
dock placement MAY drive the padding.

#### Scenario: main content clears the dock

- **GIVEN** the site dock at any of the four edges
- **WHEN** the main content layout is inspected
- **THEN** content and docs sticky chrome are inset so the dock does not
  cover interactive page content
