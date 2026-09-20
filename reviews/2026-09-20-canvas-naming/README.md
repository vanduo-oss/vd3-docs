# Canvas Components naming — 2026-09-20

- Page heading, home feature tile/link, navigation metadata, and search title:
  **Canvas Components Bundle**.
- Title, home feature tile, and dock icon: **tree-structure**.
- Dock label, accessible name, and vertical-dock tooltip: **Canvas Components**.
- `/cbun` route and CBUN search alias retained. Package installation copy still
  explains that charts and flowchart install separately.

Production build, typecheck, ESLint, changed-file formatting, and refreshed
search corpus validation pass. Existing dock unit tests: 11 passed. Existing
dock and mobile marketing browser tests: 14 passed. Home and CBUN visual
baselines refreshed for the new labels/icons.

Direct Chromium checks verified the page heading and icon, actual hovered
vertical-dock tooltip, dock navigation, and the CBUN search alias returning
the expanded name. Screenshots retained here cover the page at 390 and 1440px,
the home feature tile, and the dock tooltip. Phone page and home tile captures
were visually inspected; the longer label fits the narrow dock.

## Follow-up: Documentation dock label

Expanded Docs to Documentation for the dock label, accessible name, and
tooltip. On phones, multiword labels wrap with a two-line label area to keep
icons aligned. This prevents the longer name from clipping Canvas Components
at 390px; the existing scrollable strip remains available on smaller screens.

Build, typecheck, component lint, formatting, Stylelint, and search validation
pass. Dock unit tests: 11 passed. Targeted browser navigation and narrow-dock
checks: 3 passed, including an added check that label bounds fit the visible
390px strip. Home, docs landing, and CBUN desktop visual baselines refreshed.
The final phone dock screenshot is `documentation-dock-390.png` and was
visually inspected.
