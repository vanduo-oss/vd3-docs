## ADDED Requirements

### Requirement: Chart preview has a subtle boundary
The CBUN chart preview SHALL have a 1px theme-aware border with rounded
corners, without restoring an outer card heading or padding.

#### Scenario: Recognize the chart boundary
- **WHEN** the user views the CBUN chart preview
- **THEN** a simple rounded outline SHALL mark its edge
- **AND** the chart SHALL continue to fill the available preview width
