# Visual baseline triage — 16 September 2026

Chromium Desktop visual-parity, `maxDiffPixelRatio: 0.03`, no threshold change.
Inspected actuals after the local-packages DocSite rebuild. All 17 mismatches
are intended product/copy from A05/A07/A11; none were layout defects.

| Route | Ratio | Classification |
| --- | --- | --- |
| `/cbun` | 0.06 | A07 Labs removal; charts/flowchart-only heading and copy |
| `/changelog` | 0.05 | Package-line copy; no Labs install path |
| `/components/theme-switcher` | 0.04 | A11 editorial shortening |
| `/components/theme-customizer` | 0.06 | A11 editorial shortening |
| `/components/doc-search` | 0.04 | A11 editorial shortening |
| `/components/expanding-cards` | 0.06 | A11 / contrast on demo surfaces |
| `/canvas/charts` | 0.08 | A11 charts intro and keyboard helper |
| `/canvas/flowchart` | 0.04 | A11 usage + outline/keyboard copy |
| `/guides/runtime-architecture` | 0.07 | A11 architecture copy |
| `/guides/fibonacci` | 0.04 | A11 / token contrast |
| `/guides/troubleshooting` | 0.05 | A11 current-install wording |
| `/guides/vd3-ecosystem` | 0.05 | A11 ecosystem copy |
| `/effects/glass` | 0.04 | A05 contrast / editorial |
| `/effects/surfaces` | 0.04 | A05 contrast / editorial |
| `/effects/parallax` | 0.04 | A05 contrast / editorial |
| `/components/navbar` | 0.05 | A11 navbar copy |
| `/components/dock` | 0.12 | A11 Dock rewrite; playground still a real VdDock |

Baselines for these 17 Chromium Desktop darwin snapshots were updated after
this review. Home, buttons, color palette, and global-search pages already
matched.
