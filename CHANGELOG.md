# Changelog

`@vanduo-oss/vd3-docs` is the **private** documentation site for the vd3 line.
It is not published to npm and keeps no package release history of its own.

## [1.8.0] - 2026-11-09

### Added

- **Motion Foundation Page** (`/core/motion`): Interactive Fibonacci duration ladder (`55ms` to `987ms`), golden easing curves comparison (`--vd-ease-out`, `--vd-ease-in`, `--vd-ease-in-out`, `--vd-ease-linear`), `<VdExpandTransition>` live adaptive sizing demo, `<VdTransition>` presets sandbox, and live Motion mode selector (`auto`, `full`, `reduce`, `off`).
- E2E Playwright test suite (`tests/e2e/motion.spec.ts`) validating motion mode switching, attribute state, duration ladders, and expand/collapse transitions.

### Changed

- Adopt `@vanduo-oss/vd3@1.9.0` with the built-in Fibonacci motion system: unfoldable components (`VdAccordion`, `VdCodeSnippet`, `VdTree`, `VdNavbar`, `VdModal`, `VdOffcanvas`, `VdSidenav`, `VdTabs`, `VdAlert`, `VdChip`) now transition smoothly by default.
- Document `:animated` prop across Accordion, Alert, Chip, Modal, Offcanvas, Sidenav, Tabs, Tree, and CodeSnippet reference pages.
- Add Fibonacci motion sections and token reference tables to `Fibonacci.vue`, `CssVariables.vue`, and `Accessibility.vue`.
- Updated catalog constants (`66` component exports, `41` composable modules).
- Refreshed canonical search index with the new `/core/motion` route.
- Removed unused `animejs` dependency from `package.json`.
- **Dock 4-corner waypoint morph.** The dock demo and playground morph through a square waypoint at 377ms shrink and 610ms grow, anchored on the shared corner of the two edges.
- **Motion page layout repair.** The Motion foundation page uses real vd3 layout classes, a query container for the easing demo, and a neutral surface for the live motion controls so the duration ladder, easing tracks, and mode switcher stay readable.

## Unreleased

### Changed

- Note on the typography page that text fonts leave the package in v1.8.2, and
  document that release on the changelog page.
- Remove docs-only surface motion toggles and autoplay from the Glass and
  Surfaces pages so demos show the static surfaces shipped in `@vanduo-oss/vd3`.
- Rework the Scrollspy sidebar demo geometry and active-link styling so all
  four sections can be scrolled and highlighted inside the demo container.
- Self-host the Zen Dots display face used by the dock, home, and About
  wordmarks, and drop the unused Roboto, Noto Sans, and Inter font rules.
- Stop underlining `vd-*` component links under the prose-link rule, and make
  the Sidenav demo's active item interactive.
- Rewrite the First Layout guide as a step-by-step walkthrough with an app
  shell, layout recipes, and common pitfalls. Fix the Fibonacci guide's layout
  demo, which stacked every column at full width.
- Grid System: add a 12-column basics card and a live breakpoint badge, correct
  the container widths, and remove the whole-document Fibonacci switch, which
  reflowed the docs shell. Golden Ratio: correct the φ type-scale labels and
  the spacing-token names.
- Correct accessibility and default-value claims on the Scrollspy, Datepicker,
  Offcanvas, and Sidenav pages, and clear the moderate audit findings with
  `fast-uri`, `glob`, and `minimatch` overrides.
- Dogfood `@vanduo-oss/vd3@1.8.1` with `VdImageBox` gallery layouts (`grid`, `masonry`,
  `bento`, `filmstrip`), `useImageBox` lightbox navigation, OolaDock parity (`brandSpin`,
  `itemLayout="auto"`), `@layer vd3` Tailwind CSS / Nuxt UI coexistence guide, expanded
  Security guide, completed component API/accessibility references, and refreshed search index.
- Dogfood `@vanduo-oss/vd3@1.8.0` with atomic layer parity, live Vue atom showcases,
  corrected snippet tabs (`:vue`), updated guides, and refreshed search index.

The user-facing release history of the packages this site documents —
[`@vanduo-oss/vd3`](https://www.npmjs.com/package/@vanduo-oss/vd3),
[`@vanduo-oss/vd3-charts`](https://www.npmjs.com/package/@vanduo-oss/vd3-charts),
and
[`@vanduo-oss/vd3-flowchart`](https://www.npmjs.com/package/@vanduo-oss/vd3-flowchart)
— is rendered on the site's [`/changelog`](src/pages/changelog.vue) page.
Canvas widgets come from the published charts and flowchart packages, not a
Labs sibling. Each package's authoritative changelog lives in its own
repository.
