## ADDED Requirements

### Requirement: Accurate package release status
The changelog SHALL describe library changes in the vd3 column and distinguish
an unpublished release candidate from the published latest version.

#### Scenario: Preparation before npm publication
- **GIVEN** vd3 1.7.5 has merged but is not published
- **WHEN** the changelog is displayed
- **THEN** it SHALL show 1.7.5 as a release candidate and 1.7.4 as Latest
- **AND** the vd3 column SHALL exclude documentation-only changes

### Requirement: Responsive homepage branding
The homepage SHALL present the vd3 UI wordmark with its tagline immediately below,
without Seemore Glass or Oola Dock promotions. Desktop text SHALL share a left
edge; mobile text SHALL be centered beneath the logo.

#### Scenario: Desktop and mobile presentation
- **GIVEN** a desktop or mobile viewport
- **WHEN** the homepage renders
- **THEN** the hero logo SHALL be 5% smaller than its previous size
- **AND** the tagline SHALL remain below the wordmark with matching left edges
  on desktop, and both text lines SHALL be centered below the logo on mobile
- **AND** the mobile hero logo SHALL be a further 10% smaller
- **AND** mobile primary navigation glyphs and labels SHALL be slightly smaller,
  the dock brand larger, and navigation hit targets retained
