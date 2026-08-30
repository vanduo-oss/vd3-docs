/**
 * Docs-site search tuning — HybridSearch constructor overrides only.
 * Presets, prefixes, and confidence defaults live in @vanduo-oss/vdl-hybrid-search.
 */

/** Fuse stays strict so character-soup matches stay rare. */
export const DOCS_FUSE_THRESHOLD = 0.3;

/** EmbeddingGemma cosines; library confidence cutoff trims the tail. */
export const DOCS_SEMANTIC_THRESHOLD = 0.28;

export const DOCS_FUZZY_MIN_SCORE = 0.55;
export const DOCS_TITLE_EXACT_BOOST = 0.1;

export const DOCS_SEARCH_STORAGE_KEY = "vd3-docs-search";
