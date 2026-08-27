/**
 * Shared EmbeddingGemma constants for Node scripts (indexer / eval).
 * Keep in sync with src/search/embeddinggemma.ts
 */

export const EMBEDDING_MODEL_ID = "onnx-community/embeddinggemma-300m-ONNX";
export const QUERY_PREFIX = "task: search result | query: ";
export const EMBED_CHAR_CAP = 1600;
export const ABS_DISPLAY_FLOOR = 0.22;
export const MIN_TOP_SCORE = 0.53;
export const RELATIVE_TOP_FRACTION = 0.45;

export function prefixQuery(text) {
  return `${QUERY_PREFIX}${text}`;
}

export function prefixDocument(title, text) {
  const t = String(title || "none").replace(/\s+/g, " ").trim() || "none";
  return `title: ${t} | text: ${String(text || "").trim()}`;
}

export function documentEmbedText(doc) {
  const parts = [
    Array.isArray(doc.keywords) ? doc.keywords.join(". ") : "",
    Array.isArray(doc.headings) ? doc.headings.join(". ") : "",
    doc.category || "",
    doc.bodyText || "",
  ].filter(Boolean);
  return parts.join(". ").slice(0, EMBED_CHAR_CAP);
}

export function cosineSimilarity(a, b) {
  let dot = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) dot += a[i] * b[i];
  return dot;
}
