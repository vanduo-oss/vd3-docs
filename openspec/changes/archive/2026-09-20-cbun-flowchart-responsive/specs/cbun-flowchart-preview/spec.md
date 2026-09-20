## ADDED Requirements

### Requirement: Preview canvas fills the available body
The CBUN flowchart preview SHALL use a single body row at every supported
viewport width. Hiding the inspector MUST NOT leave reserved inspector rows.
The visible side palette SHALL remain vertical and fit its column.

#### Scenario: Tablet viewport
- **WHEN** CBUN loads at widths 769, 800, 840, 841, 900, 901, 1024, or 1180px
- **THEN** the canvas SHALL fill the body height and exceed 280px
- **AND** all three initial nodes SHALL fit within the canvas
- **AND** the toolbar and palette SHALL avoid horizontal overflow

#### Scenario: Phone and desktop boundaries
- **WHEN** CBUN loads at widths 390, 768, 1181, or 1440px
- **THEN** the initial nodes SHALL remain visible and centered
- **AND** the canvas SHALL fill the body height

### Requirement: Preview fitting follows canvas size
The preview SHALL refit its diagram when the canvas changes size, including
changes without a window resize event. Fitting SHALL remain manually usable.
Observers and pending animation frames SHALL be cleaned up on unmount.

#### Scenario: Resize the showcase
- **WHEN** the viewport crosses the phone, tablet, and showcase stacking breakpoints
- **THEN** all initial nodes SHALL remain centered and inside the canvas

#### Scenario: Change only the container
- **WHEN** the preview container narrows and expands without a window resize
- **THEN** the diagram SHALL refit and remain centered inside the canvas

#### Scenario: Manual fit and leaving the page
- **WHEN** the user zooms and then selects Fit
- **THEN** the diagram SHALL fit inside the canvas again
- **WHEN** the user leaves CBUN and resizes the viewport
- **THEN** no page error SHALL occur from the removed preview
