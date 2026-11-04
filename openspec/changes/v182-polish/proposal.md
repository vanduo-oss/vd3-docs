# v1.8.2 docs polish

## Why

A pre-release review of the docs found broken or misleading demos (the
Fibonacci guide's layout classes stacked every column at full width; the Grid
System's whole-document switch reflowed the docs shell), inaccurate copy
(container widths, φ labels, token names, default values, accessibility claims),
an unhosted display font, and audit findings that fail the CI and deploy gates.

## What changes

Pages changed (no routes added or removed):

- `/guides/first-layout`: rewritten as a step-by-step guide with anatomy diagram,
  live breakpoint indicator, app shell, layout recipes, and pitfalls.
- `/guides/fibonacci`: layout demo styles an inner element instead of the column.
- `/core/grid-system`: 12-column basics card, live breakpoint badge, corrected
  container widths; whole-document switch removed.
- `/core/golden-ratio`: corrected 2xl/3xl φ labels, "no token" beyond 55,
  conceptual-bar caveat.
- `/components/scrollspy`, `/components/sidenav`, `/components/offcanvas`,
  `/components/datepicker`, `/effects/glass`, `/effects/surfaces`: demo and
  copy fixes matching vd3 1.8.2.
- Site: Zen Dots self-hosted; unused Roboto/Noto/Inter rules and files removed;
  prose underline no longer applies to `vd-*` component links.
- Tooling: `fast-uri`, `glob`, `minimatch` overrides; new docs-only
  `useActiveBreakpoint` composable.

## Non-goals

No new routes, no new runtime dependencies, no deploy or remote actions. The
committed vd3 pin stays at 1.8.1 until 1.8.2 is published.
