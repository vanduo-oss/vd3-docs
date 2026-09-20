## ADDED Requirements

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
