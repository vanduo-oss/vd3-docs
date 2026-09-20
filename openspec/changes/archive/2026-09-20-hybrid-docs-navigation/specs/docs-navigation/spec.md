## ADDED Requirements

### Requirement: Lightweight reference navigation avoids new page downloads
The 15 measured lightweight reference routes SHALL be available without new
JavaScript or CSS downloads after initial application readiness. Other routes
MAY remain lazy, including canvas and changelog pages. SSG SHALL preserve all
canonical routes and readable reference content.

#### Scenario: Browse component references
- **GIVEN** a hydrated Button page and new asset requests blocked
- **WHEN** the user visits Badge, Alert, Card, Dropdown, Tabs, Accordion, Avatar,
  Tooltip, Breadcrumb, Chip, Progress, Spinner, Separator, Switch, and Button
- **THEN** every requested page SHALL display without requesting new JS or CSS

### Requirement: Pending navigation remains understandable and recoverable
Navigation SHALL expose a pending destination before resolving lazy imports,
retain the old article until success, and clear feedback on success, abort,
cancellation, or error. Failed downloads SHALL offer a reload destination.
Stale completion/errors MUST NOT overwrite newer pending navigation.

#### Scenario: Slow route download
- **GIVEN** a lazy page download is held
- **WHEN** the user navigates there
- **THEN** the sidebar SHALL identify the pending destination, main SHALL be
  marked busy, and after 150 ms a progress bar/polite status SHALL appear
- **AND** the current article SHALL remain visible until the route resolves

#### Scenario: Rapid navigation
- **GIVEN** two sequential lazy navigations are pending
- **WHEN** the older navigation resolves or fails
- **THEN** feedback SHALL remain attached to the newer destination

#### Scenario: Download failure
- **GIVEN** a requested page chunk cannot load
- **WHEN** navigation fails
- **THEN** progress SHALL stop, the old article SHALL remain, and an accessible
  error SHALL offer a full-page reload of the requested destination

### Requirement: Prefetch respects intent and resource constraints
Sidebar hover and keyboard focus SHALL be allowed to prepare lazy destinations
without navigating. Concurrent prefetches SHALL be coalesced and speculative
errors SHALL stay silent. Prefetch MUST be disabled for server rendering and
for reported saveData, slow-2g, or 2g connections.

#### Scenario: Keyboard intent
- **GIVEN** a lazy destination has not loaded
- **WHEN** its sidebar link receives keyboard focus
- **THEN** its route module SHALL load without changing the current page or
  announcing pending navigation

### Requirement: Loading decisions use startup and navigation evidence
Production build comparison SHALL record initial compressed asset size and
click-to-content behavior under named browser/network/CPU conditions. Homepage
initial JS/CSS SHALL remain below 375 KiB gzip and sampled docs routes below
390 KiB. These limits exclude fonts, images and third-party resources.

#### Scenario: Compare strategies
- **GIVEN** baseline lazy, all-eager, and hybrid production builds
- **WHEN** the same repeatable navigation benchmark runs
- **THEN** the evidence SHALL include initial readiness, first visits, cached
  visits, and the measurement limitations
