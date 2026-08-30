# Design: search documentation pages

## Page anatomy

Both pages follow existing docs conventions: `<section id="…">`, `demo-title` with
Phosphor icon, `vd-card demo-card` blocks, `vd-table` from tuple arrays,
`DocCodeSnippet` for code, `GuideLinkCards` at the bottom.

## Global search page

Live in-memory `GlobalSearchAdapter` demo — no model download on the doc page itself.
Documents shortcut ownership vs `VdDocSearch` and links to hybrid guide + `useSearch`.

## Hybrid search guide

Imports `EMBEDDING_PRESETS` from `@vanduo-oss/vdl-hybrid-search` for the preset table
(rendered from source, not hand-maintained). Folds in prior
`docs/vdl-hybrid-search-findings.md` guidance now implemented in 0.2.0.

## Site adoption

- `GlobalSearchModal.vue` → thin `VdGlobalSearch` wrapper + store adapter.
- Modal styling from `@vanduo-oss/vd3/css` (`global-search.css`); docs.css keeps only
  `.global-search-trigger` for dock chrome and hero dropdown overrides using
  `.vd-global-search-*` selectors.

## Index + eval

`pnpm index` via `vdl-hybrid-index` (nav-driven crawl). New eval queries gate top-3
for intent strings targeting the new routes; nonsense queries stay empty.
