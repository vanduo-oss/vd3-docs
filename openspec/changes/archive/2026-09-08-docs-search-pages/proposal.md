# Docs: global search component page + hybrid search guide

## Why

vd3 1.7.0 ships `VdGlobalSearch` and vdl-hybrid-search 0.2.0 upstreams the docs
site's EmbeddingGemma polish. Neither the palette nor the hybrid engine was
documented on the site.

## What Changes

- `/components/global-search` — live demo, shortcuts, AI opt-in, API tables.
- `/guides/hybrid-search` — pipeline, indexing, presets, tuning, eval, CSP.
- Refactor site modal onto `VdGlobalSearch`; retire `.global-search-*` modal CSS.
- Nav/router/ROUTES registration; cross-links from Doc Search and ecosystem guide.
- Changelog card for `@vanduo-oss/vd3` 1.7.0 (Global search only on card).
- Search index refresh + eval queries for new pages.

## Capabilities

### Modified Capabilities

- `docs-content`: two new pages, Doc Search related links, changelog 1.7.0
- `docs-build`: nav/router/keywords/ROUTES, visual baselines, search index

## Semver

Docs-site content plus search index assets. Package changelog tracks vd3 1.7.0.

## Non-goals

- Publishing vd3 or vdl-hybrid-search from this change.
- Replacing the site Cmd+K engine with a remote API.
- Documenting vd3 1.7.0 theme-customizer / dock changes on the changelog card
  (those ship in the package; separate doc passes may cover them).
