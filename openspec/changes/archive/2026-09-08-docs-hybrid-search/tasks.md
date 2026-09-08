# Docs hybrid search — Tasks

- [x] 1. Author this change (proposal / design / tasks / spec deltas); run
      `openspec validate docs-hybrid-search --strict` when available.
- [x] 2. Add `@vanduo-oss/vdl-hybrid-search`, `fuse.js`, `@huggingface/transformers`;
      add `scripts/hybrid-search-indexer.mjs` + `pnpm index`; commit
      `public/search/` assets.
- [x] 3. Rewrite `useSearchStore` around `HybridSearch` (fuzzy-first, hybrid
      debounce, entry mapping, semantic progress flags).
- [x] 4. Wire `GlobalSearchModal` to async store; raise `.global-search-modal`
      glass opacity/blur in `docs.css`.
- [x] 5. Update unit (+ optional e2e) mocks; README re-index notes; Vite tweaks
      if needed; `pnpm typecheck` / test.
- [x] 6. Upgrade semantic path to EmbeddingGemma-300M with task prefixes,
      adaptive cutoffs, richer index text, and `pnpm index:eval` harness.
