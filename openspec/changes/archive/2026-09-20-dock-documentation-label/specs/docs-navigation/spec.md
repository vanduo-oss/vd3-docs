## ADDED Requirements

### Requirement: Documentation dock entry uses its full name
The site dock SHALL label its documentation destination Documentation,
including its accessible name and tooltip where shown. It SHALL retain the
book icon and navigate to /docs-landing.

#### Scenario: Horizontal dock
- **WHEN** the user views a horizontal dock on desktop or phone
- **THEN** the visible documentation label SHALL read Documentation
- **WHEN** the user activates it
- **THEN** the documentation landing page SHALL open

#### Scenario: Longer names on a phone
- **WHEN** the viewport is 390px wide
- **THEN** all three primary navigation labels SHALL fit in the visible strip
- **AND** multiword labels MAY wrap with icons aligned above them
