# Validation — 2026-10-04

Built against the local vd3 1.7.5 release artifact using `local-vd3.mjs stage`.
The committed registry pin and lockfile remain at 1.7.4; staging is restored after
QA. The built preview at http://127.0.0.1:8787/ retains the fixed artifact.

- Lint, typecheck, formatting and Stylelint: passed.
- Unit suite: 58 files, 235 tests passed.
- Static build: passed; sitemap has 95 URLs, search has 92 canonical routes.
- Content check: passed; search corpus 286,117 bytes within 350,000-byte budget.
- Size check: homepage 368.1 KiB gzip; largest checked docs route 394.7 KiB.
  Both remain within their 375/400 KiB budgets.
- Affected light/dark homepage and changelog axe checks, plus both desktop
  visual baselines: six passed. No baseline updates were necessary.
- Rendered geometry checked at widths 320, 390, 514, 768 and 1440: no horizontal
  page overflow. Mobile title, tagline and hero mark centers match; desktop title
  and tagline left edges match. Mobile hero SVG is 182.89px versus desktop
  203.20px at the same font size, confirming the further 10% reduction.
- Mobile dock brand variable is 2.6rem; navigation glyphs 1.9rem, labels 0.55rem,
  and retained navigation targets at least 3.3rem tall. Home/Docs navigation
  was exercised at 390px. At 320px, tighter outer padding and gaps keep all three
  navigation items within the visible navigation area; a geometry assertion
  verifies none is clipped. Desktop dock sizing remains unchanged.
- OpenSpec strict validation and Git whitespace check: passed.

vd3 PR #22 merged as 11cadbf; both PR CI and merged main CI succeeded with the
user-approved CVE-2026-93687 exception documented in the library SECURITY-AUDIT.md.
Publication is reserved for the user. The docs candidate label and published
dependency pin must be updated after 1.7.5 is published, before docs release.

Manual review: check centered mobile hero text, logo proportions, smaller mobile
dock navigation and larger dock brand, desktop left-aligned tagline, removal of
the two promotions, and package-only candidate notes on /changelog.
