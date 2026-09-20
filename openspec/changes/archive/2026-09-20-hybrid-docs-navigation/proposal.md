# Hybrid docs navigation

## Why

Docs 1.7.6 replaced every eager page import with a lazy import. This reduced
initial bytes but introduced first-click network waits without feedback. The
release checks measured payload size and settled pages, not click-to-content.

## What changes

- Prepare docs 1.7.7 on dev-v177 with 15 lightweight component pages eagerly
  available: Button, Badge, Alert, Card, Dropdown, Tabs, Accordion, Avatar,
  Tooltip, Breadcrumb, Chip, Progress, Spinner, Separator, and Switch.
- Keep other routes lazy, including Charts, Flowchart, CBUN, and changelog.
- Prefetch sidebar destinations on hover/focus; respect data saving/2G signals.
- Provide app-scoped navigation feedback, stale-navigation protection, and an
  actionable error state without replacing the current article.
- Compare baseline, all-eager rollback, and hybrid production builds; keep
  measurements and regression tests. Update the lazy-loading guide/search.
- Preserve the homepage 375 KiB gzip budget. Set docs-route budget to 390 KiB
  based on the measured eager-set cost, not the 592 KiB rollback footprint.

No routes or dependencies are added or removed. Shared docs shell and the
existing lazy-loading guide change; package changelog content is unchanged.

## Non-goals

Changing vd3 packages, deferring all demos, redesigning the sidebar, loading the
entire catalog in the background, service workers, or deploying/publishing.
