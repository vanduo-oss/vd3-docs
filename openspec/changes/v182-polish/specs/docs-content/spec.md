## ADDED Requirements

### Requirement: v182-docs-accuracy
Layout and component pages SHALL render the documented proportions and state only claims the shipped vd3 code satisfies.

#### Scenario: Fibonacci layout classes render their ratios
- **GIVEN** the Fibonacci guide at a desktop viewport
- **WHEN** the `.vd-row-fib-4` and `.vd-row-fib-3-alt` demos render
- **THEN** their columns MUST measure about 9/18/27/45% and 19/31/50% on one line

#### Scenario: Grid System page leaves the docs shell intact
- **GIVEN** the Grid System page
- **WHEN** a visitor uses every interactive control on it
- **THEN** no control MUST set `data-grid` on the document element

#### Scenario: Documented values match the CSS
- **GIVEN** the Grid System, First Layout, Golden Ratio, and Scrollspy pages
- **WHEN** they state container widths, φ type steps, spacing token names, or default offsets
- **THEN** each value MUST match the shipped vd3 CSS or composable default
