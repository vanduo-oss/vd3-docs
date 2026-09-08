## ADDED Requirements

### Requirement: seemore-glass-effects-page

`/effects/glass` MUST document Seemore Glass: Fibonacci strength steps
`.vd-glass-{1,2,3,5,8,13,21}`, the four primitives (blur, tint, edge,
elevation), accessibility fallbacks, component integration, and demos staged
on package `.vd-surface-*` backdrops (not one-off private mesh/stripe/noise
CSS for those three patterns).

#### Scenario: fib steps are demonstrated

- **GIVEN** the Glass effects page
- **WHEN** a reader inspects the strength-step explorer
- **THEN** each Fibonacci step class is shown with live glass samples

### Requirement: surfaces-effects-page

The Effects nav MUST include a Surfaces section at `/effects/surfaces`
documenting `.vd-surface` and variants mesh, stripe, noise, aurora, dots,
grid, plus intensity modifiers 3/5/8 and pairing recipes with Seemore Glass.

#### Scenario: surfaces route is registered

- **GIVEN** `src/nav.ts`
- **WHEN** Effects sections are listed
- **THEN** a Surfaces entry routes to `/effects/surfaces`

### Requirement: homepage-seemore-glass-story

The homepage MUST include a post-hero section whose opening title line is
“See more glass.” describing Seemore Glass as Fibonacci-stepped
material unique to vd3, with a live surface + glass demonstration and a CTA
to `/effects/glass`.

#### Scenario: title line present

- **GIVEN** the homepage after this change
- **WHEN** the Seemore section heading is read
- **THEN** it equals “See more glass.”

### Requirement: changelog documents vd3 1.3.0

The vd3 column of `/changelog` MUST lead with a `v1.3.0` release card marked
`Latest` that documents Seemore Glass Fibonacci steps and decorative Surfaces.

#### Scenario: Latest badge sits on 1.3.0

- **GIVEN** the `/changelog` page after this change
- **WHEN** the vd3 column headers are read
- **THEN** `v1.3.0` has the `Latest` badge
