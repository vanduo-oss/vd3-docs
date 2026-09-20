## ADDED Requirements

### Requirement: Reviewed improvements preserve supported integrations

The package SHALL implement the accepted audit changes without silently discarding user state or breaking documented imports.

#### Scenario: Existing consumer updates

- **Given** a consumer using the documented package imports
- **When** the audited interactions and updates are exercised
- **Then** the behavior MUST meet the item-specific acceptance criteria in the audit backlog and have regression coverage

### Requirement: Search follows canonical current content

Site search SHALL be generated from canonical rendered routes and MUST wait for client hydration before treating the overlay input as live.

#### Scenario: Cmd+K finds a current page after hydrate

- **Given** a built DocSite preview
- **When** the app has hydrated and the user searches for a current page title
- **Then** the matching route MUST appear without relying on a timeout increase

### Requirement: Current copy has no Labs install path

Current installation guidance and search results SHALL NOT depend on a Labs sibling.

#### Scenario: Default build without Labs

- **Given** no Labs checkout
- **When** DocSite is built with committed registry pins
- **Then** the build MUST succeed and current pages MUST NOT instruct consumers to install Labs

### Requirement: CI stays a cheap smoke, full visual local

DocSite CI SHALL run unit, content, size, and a focused Chromium search smoke. Full visual-parity and the broader a11y matrix SHALL remain local required gates. Action-minute ceilings SHALL be documented in CONTRIBUTING.

#### Scenario: CI job timeouts are explicit

- **Given** the committed workflows
- **When** a contributor reads CONTRIBUTING
- **Then** they MUST see `timeout-minutes` for `ci.yml` (20) and `deploy.yml` (25) and that those jobs have not been treated as a remote result until run

### Requirement: Route splitting without gutting reference demos

A measured set of lightweight documentation routes MAY use eager imports to avoid first-click download waits. Other routes SHALL retain lazy imports with navigation feedback. Optional demo deferral SHALL be applied only when measurements justify it. The hybrid contract is specified by the `hybrid-docs-navigation` change.

#### Scenario: Homepage does not load canvas packages

- **Given** the current router and homepage
- **When** initial JS/CSS is measured
- **Then** charts and flowchart SHALL load with their own routes, and reference demos on those routes SHALL remain complete

### Requirement: Prose link styling preserves navigation appearance

DocSite prose-link defaults SHALL preserve component-specific link styling.

#### Scenario: Sidebar links remain visually distinct navigation

- **Given** the documentation sidebar in either theme
- **When** prose links are underlined for recognition
- **Then** sidebar links MUST retain their un-underlined rest, hover, and focus styling while ordinary prose links remain underlined
