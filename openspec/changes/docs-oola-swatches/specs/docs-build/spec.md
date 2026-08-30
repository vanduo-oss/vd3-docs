# docs-build

## ADDED Requirements

### Requirement: oola-api-search-keywords

`src/nav.ts` SHALL carry search keywords for the 1.7.0 props so the new
documentation is reachable from the palette: dock gains tint mode / accent /
surface, theme-customizer gains swatches / fan / variant / controlled, and
tooltip gains delay / dock.

#### Scenario: searching a new prop finds its page

- **GIVEN** the docs search index built from the nav tree
- **WHEN** a reader searches for "tint mode", "swatches", or "tooltip delay"
- **THEN** `/components/dock`, `/components/theme-customizer`, and
  `/components/tooltip` respectively rank in the results
