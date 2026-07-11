# Changelog

All notable changes to `vd2` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.3.0] - 2026-06-29

### Added

- **Foundations polish** — a deep Fibonacci guide (colored sequence,
  Standard-vs-Fibonacci comparison, proportional spacing bars, layout-class
  demos), an interactive Typography type-scale playground, and live WCAG
  contrast badges on the Colors palette.
- **Home "Cool Breeze I" what's-new section** linking to the changelog.
- **Code-snippet syntax highlighting** — `DocCodeSnippet` now highlights HTML /
  CSS / JS / TS / shell via highlight.js, themed with Vanduo tokens (light/dark
  aware).
- **`EngineBadge`** component for engine-specific section headers and a
  reusable **`useClickOutside`** composable.

### Changed

- **Vanduo Ecosystem guide** rewritten to cover the whole `@vanduo-oss` family
  (core, framework, vue + standalone charts / hex-grid / music-player /
  flowchart); the docs site itself is intentionally excluded.
- **Sidebar** — removed the per-item engine labels in guides; engine scope now
  lives on the relevant section headers.
- **Changelog** — strict per-engine filtering, and it now documents package
  releases ONLY (never docs-site content — see the `changelog-content-policy`
  OpenSpec change). The latest entry is the engine-tagged "Cool Breeze I" card.

### Fixed

- **Theme customizer** now closes on an outside click.
- **Component-docs correctness pass** — fixed invented classes and wrong
  event/API payloads and defaults across Fab, Flow, Stepper, Scrollspy,
  FormValidation, Tabs, Transfer, Tree, and Sidenav (verified against the
  installed framework 1.6.0 / vue 0.2.0).

## [0.2.0] - 2026-06-23

### Added

- **Capability-transfer OpenSpec change folders.** Eight change folders ship
  the full feature surface of the framework in Vue 3 form:
  `vd-layout-navigation` (VdSidenav, VdSticky, VdWaypoint, VdOffcanvas plus
  V2 upgrades to VdNavbar and VdFooter), `vd-data-display` (VdAvatar,
  VdTable, VdCollection), `vd-feedback` (VdChip, VdSkeleton, VdPreloader),
  `vd-interactive-forms` (VdInput, VdSelect, VdCheckboxGroup, VdRadioGroup,
  VdButtonGroup, VdPagination, VdRating, VdStepper, VdDatepicker,
  VdTimepicker, VdAutocomplete, VdTransfer, VdTree; ~1500 LOC of framework
  JS reimplemented in Vue 3 for datepicker, timepicker, autocomplete,
  transfer, tree, and rating), `vd-core-foundation` (six explanation
  pages: color palette, typography, icons, golden ratio, grid system,
  shadows and glow), `vd-effects` (glass, morph, parallax),
  `vd-theme-customizer` (two pages), and `vd-guides` (seventeen long-form
  guide pages).
- **~60 new pages** bringing the site to 67 routes served at clean URLs
  (`/`, `/about`, `/docs-landing`, `/quick-start`, `/changelog`,
  `/kilo-oss`, `/components/<name>`, `/core/<topic>`, `/effects/<topic>`,
  `/guides/<slug>`).
- **Visual-parity regression suite.** 77 Playwright baselines cover 72
  visual-parity routes plus 5 interaction tests in
  `tests/e2e/visual-parity.spec.ts`, run on Chromium Desktop at
  1440×900 with `maxDiffPixelRatio: 0.03`.
- **Release-readiness artifacts** — `CHANGELOG.md` (this file),
  `CONTRIBUTING.md`, `.github/workflows/ci.yml`, `LICENSE`, the
  `tests/scripts/size.mjs` bundle-size reporter, and the
  `openspec/changes/release-0.2-pre-release-polish/` OpenSpec change folder.

### Changed

- **`README.md` `## Layout` section** now reflects the current source tree
  (`components/`, `composables/`, `layout/`, `overlays/`, `pages/`,
  `stores/`, `styles/`, `tests/`, `openspec/`) and links to
  `CONTRIBUTING.md` and `CHANGELOG.md`.
- **`package.json`** — `engines.node` raised from `>=20` to `>=24` to match
  the local development environment; `scripts.stylelint`,
  `scripts.format:check`, and `scripts.test:size` added.

### Removed

- **One-off baseline-capture script** `tests/e2e/visual-parity.baseline.mjs`
  and its associated `test:e2e:update-snapshots` npm script were removed in
  an earlier commit. The canonical baseline-refresh flow is now
  `pnpm exec playwright test --update-snapshots`.

### Fixed

- **Theme-customizer section id collision** between the components page
  and the guide page (renamed the guide's id to `theme-customizer-guide`
  to keep the route path unchanged at `/guides/theme-customizer`).

## [0.1.0] - earlier

Initial release: scaffold, app shell, core components, and docs routing
(`init-vd2-scaffold`, `app-shell`, `core-components`,
`docs-routing-and-content`).
