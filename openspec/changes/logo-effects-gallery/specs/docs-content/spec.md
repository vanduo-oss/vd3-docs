## ADDED Requirements

### Requirement: logo effects gallery route exists

The docs site SHALL expose `/effects/logo` as an Effects page that renders a
grid of live vd3-mark animation variants using inline SVG (not a static `<img>`).

#### Scenario: route is registered and reachable

- **GIVEN** the docs site after this change
- **WHEN** a user navigates to `/effects/logo`
- **THEN** the page renders without error and appears under the Effects nav category

### Requirement: bloom-spin featured sequence

The page SHALL include a featured tile that initially shows only the inner
circle, animates the three outer circles popping from the center one-by-one, and
then starts a continuous clockwise spin of the full composition. A Replay control
SHALL restart the sequence.

#### Scenario: bloom-spin runs then spins

- **GIVEN** the featured tile with motion allowed
- **WHEN** the page loads
- **THEN** outers appear sequentially from the center and the mark begins spinning
  after the last outer settles

#### Scenario: reduced motion shows static final pose

- **GIVEN** `prefers-reduced-motion: reduce`
- **WHEN** the featured tile renders
- **THEN** all four circles are visible in their final positions and no spin loop runs

### Requirement: variant grid density

The page SHALL render at least **28** distinct labeled variant tiles in addition
to the featured bloom-spin tile, each demonstrating a named effect via `data-fx`.

#### Scenario: grid lists many variants

- **GIVEN** `/effects/logo` after this change
- **WHEN** the variant grid is counted
- **THEN** there are at least 29 labeled tiles total including the featured tile
