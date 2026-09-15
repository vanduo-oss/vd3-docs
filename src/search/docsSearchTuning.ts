/**
 * Docs-site Fuse search tuning.
 */

/** Fuse stays strict so character-soup matches stay rare. */
export const DOCS_FUSE_THRESHOLD = 0.3;

/** Drop Fuse hits weaker than this similarity (`1 - fuseScore`). */
export const DOCS_FUZZY_MIN_SCORE = 0.55;

/** Extra score when the query equals the title (case-insensitive). */
export const DOCS_TITLE_EXACT_BOOST = 0.1;
