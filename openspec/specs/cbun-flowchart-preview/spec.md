# cbun-flowchart-preview Specification

## Purpose
Keep the compact CBUN flowchart preview usable across phone, tablet, and
desktop layouts, including container resizing and manual diagram fitting.

## Requirements

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

### Requirement: Showcase chrome leaves room for canvas components
CBUN SHALL render its Charts and Flowchart previews directly in their columns
without an additional outer card or repeated heading. Their adjacent text
columns SHALL retain the component headings. The flowchart preview SHALL hide
Graph outline and reserve only toolbar and body rows in its shell. Its canvas
accessible label MUST NOT refer to the hidden outline.

#### Scenario: Compact showcase
- **WHEN** the user views CBUN on phone, tablet, or desktop
- **THEN** each component SHALL have one heading in its text column
- **AND** both previews SHALL use the available column width without outer card padding
- **AND** the flowchart canvas SHALL receive the space released by Graph outline
- **AND** the editing toolbar and responsive diagram fitting SHALL remain usable

### Requirement: Chart preview has a subtle boundary
The CBUN chart preview SHALL have a 1px theme-aware border with rounded
corners, without restoring an outer card heading or padding.

#### Scenario: Recognize the chart boundary
- **WHEN** the user views the CBUN chart preview
- **THEN** a simple rounded outline SHALL mark its edge
- **AND** the chart SHALL continue to fill the available preview width

### Requirement: Canvas showcase has an expanded public name
The /cbun page title, home feature tile, and navigation/search entry SHALL use
Canvas Components Bundle. The page title, home feature tile, and dock item
SHALL use the tree-structure icon. On wide viewports the dock label, tooltip,
and accessible name SHALL use Canvas Components; on narrow viewports the
visible dock label and accessible name SHALL use Canvas. The /cbun route and
CBUN search keyword SHALL remain available.

#### Scenario: Find the canvas showcase
- **WHEN** the user views its home feature tile or page heading
- **THEN** Canvas Components Bundle SHALL appear with the tree-structure icon
- **WHEN** the user hovers its dock item in a tooltip-enabled dock placement
- **THEN** the tooltip SHALL read Canvas Components
- **WHEN** the user activates the dock item
- **THEN** it SHALL navigate to /cbun
