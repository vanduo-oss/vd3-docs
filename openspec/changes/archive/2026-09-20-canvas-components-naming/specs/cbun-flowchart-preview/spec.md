## ADDED Requirements

### Requirement: Canvas showcase has an expanded public name
The /cbun page title, home feature tile, and navigation/search entry SHALL use
Canvas Components Bundle. The page title, home feature tile, and dock item
SHALL use the tree-structure icon. The dock label, tooltip, and accessible
name SHALL use Canvas Components. The /cbun route and CBUN search keyword
SHALL remain available.

#### Scenario: Find the canvas showcase
- **WHEN** the user views its home feature tile or page heading
- **THEN** Canvas Components Bundle SHALL appear with the tree-structure icon
- **WHEN** the user hovers its dock item in a tooltip-enabled dock placement
- **THEN** the tooltip SHALL read Canvas Components
- **WHEN** the user activates the dock item
- **THEN** it SHALL navigate to /cbun
