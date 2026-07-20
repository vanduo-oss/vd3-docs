## ADDED Requirements

### Requirement: home hero random approved logo effect

On each full page load of `/`, the home hero mark SHALL display one effect chosen
uniformly at random from the approved set: `bloom-spin`, `spin`, `counter-spin`,
`pulse`, `breathe-spin`, `wobble`, `heartbeat`, `stagger-pulse`, `morph-scale-swap`,
`soft-glow`, `chromatic-soft`, `liquid-displace`, `stroke-draw`, `outline-only`,
`specular-sweep`, `cascade-in`.

#### Scenario: reload may change effect

- **GIVEN** the home page with motion allowed
- **WHEN** the user performs multiple hard reloads
- **THEN** the hero mark may show different effects from the approved set only

### Requirement: upright mark on hero and chrome

The vd3 mark on home (static frames), navbar, footer, and favicon SHALL show two
small circles above and one small circle below (upright pose). Group rotations
SHALL use the inner (big) circle center as the axis.

#### Scenario: navbar shows upright static mark

- **GIVEN** any page after this change
- **WHEN** the navbar brand logo is viewed
- **THEN** it shows the upright two-up / one-down pose with no animation

### Requirement: lighter mark fills for dark UI

Outer and inner fills SHALL be lightened versus the prior near-black palette so
the mark remains visible on dark theme backgrounds.

#### Scenario: mark visible on dark theme

- **GIVEN** dark theme active
- **WHEN** the user views the navbar or home hero mark
- **THEN** the green fills are clearly visible (not near-black)
