/**
 * EmbeddingGemma helpers shared by the docs search store.
 * Model: onnx-community/embeddinggemma-300m-ONNX (Transformers.js).
 *
 * Task prefixes are required for retrieval quality — see
 * https://huggingface.co/onnx-community/embeddinggemma-300m-ONNX
 */

export const EMBEDDING_MODEL_ID = "onnx-community/embeddinggemma-300m-ONNX";

export const QUERY_PREFIX = "task: search result | query: ";
export const DOCUMENT_PREFIX = "title: none | text: ";

/** Absolute floor so pure junk never shows even if it is the only hit. */
export const ABS_DISPLAY_FLOOR = 0.22;
/**
 * If the best hit is weaker than this, treat the whole list as no confident
 * match (EmbeddingGemma still assigns ~0.4–0.52 to nonsense on this corpus).
 */
export const MIN_TOP_SCORE = 0.53;
/** Keep hits at least this fraction of the top score. */
export const RELATIVE_TOP_FRACTION = 0.45;
/** Weak body-only fuzzy near-misses must be close to the top score. */
export const WEAK_BODY_RELATIVE = 0.85;

export function prefixQuery(text: string): string {
  return `${QUERY_PREFIX}${text}`;
}

export function prefixDocument(title: string, text: string): string {
  const t =
    String(title || "none")
      .replace(/\s+/g, " ")
      .trim() || "none";
  return `title: ${t} | text: ${String(text || "").trim()}`;
}

/**
 * Adaptive display cutoff from the current hit list's top score.
 * Strong EmbeddingGemma hits stay; weak tails and nonsense drop.
 */
export function adaptiveCutoff(topScore: number): number {
  if (!(topScore > 0) || !Number.isFinite(topScore)) return ABS_DISPLAY_FLOOR;
  return Math.max(ABS_DISPLAY_FLOOR, topScore * RELATIVE_TOP_FRACTION);
}

export type ConfidenceHit = {
  score: number;
  source?: "fuzzy" | "semantic";
  weakMatch?: boolean;
  titleMatch?: "exact" | "partial" | "none";
};

export function filterConfidentHits<T extends ConfidenceHit>(hits: T[]): T[] {
  if (!hits.length) return [];
  const ranked = [...hits].sort((a, b) => b.score - a.score);
  const top = ranked[0]?.score ?? 0;
  if (!(top >= MIN_TOP_SCORE)) return [];
  const cutoff = adaptiveCutoff(top);
  const weakFloor = Math.max(cutoff, top * WEAK_BODY_RELATIVE);
  return ranked.filter((hit) => {
    if (!(hit.score >= cutoff)) return false;
    if (hit.source === "fuzzy" && hit.weakMatch && hit.titleMatch === "none") {
      return hit.score >= weakFloor;
    }
    return true;
  });
}

/**
 * Transformers.js v4 dropped `quantized`; HybridSearch may still pass it.
 * Wrap pipeline so query embeddings get the EmbeddingGemma search prefix.
 */
export async function loadEmbeddingGemmaTransformers(): Promise<unknown> {
  const mod = (await import("@huggingface/transformers")) as Record<
    string,
    unknown
  > & { pipeline?: (...args: unknown[]) => unknown };
  const originalPipeline = mod.pipeline;
  if (typeof originalPipeline !== "function") return mod;

  const pipeline = async (
    task: unknown,
    model: unknown,
    options: unknown = {},
  ) => {
    const next = { ...(options as Record<string, unknown>) };
    if (next.dtype == null && typeof next.quantized === "boolean") {
      next.dtype = next.quantized ? "q8" : "fp32";
    }
    delete next.quantized;
    if (next.dtype == null) next.dtype = "q8";

    const extractor = (await originalPipeline(task, model, next)) as (
      text: string | string[],
      opts?: Record<string, unknown>,
    ) => Promise<{ data: ArrayLike<number> }>;

    const prefixed = async (
      text: string | string[],
      opts?: Record<string, unknown>,
    ) => {
      if (Array.isArray(text)) {
        return extractor(
          text.map((t) =>
            String(t).startsWith(QUERY_PREFIX) || String(t).startsWith("title:")
              ? t
              : prefixQuery(String(t)),
          ),
          opts,
        );
      }
      const raw = String(text);
      const input =
        raw.startsWith(QUERY_PREFIX) || raw.startsWith("title:")
          ? raw
          : prefixQuery(raw);
      return extractor(input, opts);
    };

    return prefixed;
  };

  return { ...mod, pipeline };
}
