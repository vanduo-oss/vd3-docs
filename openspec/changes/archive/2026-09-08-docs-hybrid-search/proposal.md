# Docs: hybrid fuzzy + semantic search

## Why

Site Cmd+K search is fast and precise for short titles, but only substring-matches
`nav.ts` titles/keywords/routes. Ambiguous, intent-style questions need full-corpus
fuzzy + semantic retrieval over docs, components, and guides.

## What Changes

- Depend on `@vanduo-oss/vdl-hybrid-search` (plus host `fuse.js` and
  `@huggingface/transformers`) and wire `HybridSearch` into the Pinia search
  store behind the existing `GlobalSearchModal` chrome.
- Commit pre-built corpus assets under `public/search/` (`search-index.json`,
  `vectors.json`); add `pnpm index` to regenerate from `nav.ts` + crawled HTML
  (default site `https://vd3.vanduo.dev`).
- Semantic model: **EmbeddingGemma-300M** (`onnx-community/embeddinggemma-300m-ONNX`)
  with required task prefixes (query / document), 768-dim vectors, adaptive
  display cutoffs, and a local labeled-query eval harness.
- Progressive hybrid: fuzzy-first on open, background semantic warm-up, debounced
  hybrid queries with fuzzy-only fallback.
- Raise `.global-search-modal` glass opacity and blur so result text stays
  readable over busy page backgrounds.

## Capabilities

### New Capabilities

- _None._

### Modified Capabilities

- `docs-content`: global search uses hybrid over full corpus; EmbeddingGemma
  semantic quality for intent queries; search modal glass; `/search/` assets;
  re-index + eval guidance
- `docs-build`: search store/tests expect hybrid (mocked in unit); optional e2e
  fuzzy smoke without model download in CI

## Non-goals

- Generating vectors inside every `vite-ssg` / CI deploy.
- Replacing Labs’ `VdlHybridSearchUI` or the `VdDocSearch` component demo page.
- Same-origin ORT WASM / CSP hardening (reserved for a later change).
- Dropping `nav.ts` keyword maintenance (still useful; hybrid also uses body).
- RRF / cross-encoder reranker; fine-tuning MiniLM on this corpus.
