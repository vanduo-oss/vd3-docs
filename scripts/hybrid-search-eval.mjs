#!/usr/bin/env node
/* eslint-disable no-console -- CLI eval report */
/**
 * Local semantic quality gate for docs hybrid search.
 *
 * Loads public/search assets, embeds labeled queries with EmbeddingGemma
 * (same query prefix as runtime), reports top-1 / top-3 / MRR.
 *
 * Usage:
 *   pnpm index:eval
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  ABS_DISPLAY_FLOOR,
  EMBEDDING_MODEL_ID,
  MIN_TOP_SCORE,
  RELATIVE_TOP_FRACTION,
  cosineSimilarity,
  prefixQuery,
} from './lib/embeddinggemma.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'public/search/search-index.json');
const VECTORS_PATH = path.join(ROOT, 'public/search/vectors.json');
const QUERIES_PATH = path.join(ROOT, 'scripts/search-eval-queries.json');

function adaptiveCutoff(topScore) {
  if (!(topScore > 0) || !Number.isFinite(topScore)) return ABS_DISPLAY_FLOOR;
  return Math.max(ABS_DISPLAY_FLOOR, topScore * RELATIVE_TOP_FRACTION);
}

async function main() {
  if (!fs.existsSync(INDEX_PATH) || !fs.existsSync(VECTORS_PATH)) {
    console.error('Missing public/search assets. Run pnpm index first.');
    process.exit(1);
  }

  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  const vectors = JSON.parse(fs.readFileSync(VECTORS_PATH, 'utf8'));
  const cases = JSON.parse(fs.readFileSync(QUERIES_PATH, 'utf8'));

  const docsById = new Map((index.documents || []).map((d) => [d.id, d]));
  const embById = new Map(
    (vectors.documents || []).map((d) => [d.id, Float32Array.from(d.embedding)]),
  );

  console.log(`Model (index): ${vectors.model || '(unknown)'}`);
  console.log(`Expected:      ${EMBEDDING_MODEL_ID}`);
  console.log(`Dims:          ${vectors.dimensions}`);
  console.log(`Docs:          ${docsById.size}`);
  console.log(`Queries:       ${cases.length}\n`);

  if (vectors.model && vectors.model !== EMBEDDING_MODEL_ID) {
    console.warn(
      `Warning: vectors.json model (${vectors.model}) != ${EMBEDDING_MODEL_ID}`,
    );
  }

  console.log('Loading EmbeddingGemma…');
  const { pipeline } = await import('@huggingface/transformers');
  const extractor = await pipeline('feature-extraction', EMBEDDING_MODEL_ID, {
    dtype: 'q8',
  });

  let hitsAt1 = 0;
  let hitsAt3 = 0;
  let mrrSum = 0;
  let emptyOk = 0;
  let emptyFail = 0;
  let intentCases = 0;

  for (const c of cases) {
    const q = String(c.query || '').trim();
    const out = await extractor(prefixQuery(q), {
      pooling: 'mean',
      normalize: true,
    });
    const qv = Float32Array.from(out.data);

    const scored = [];
    for (const [id, emb] of embById) {
      scored.push({ id, score: cosineSimilarity(qv, emb) });
    }
    scored.sort((a, b) => b.score - a.score);

    const top = scored[0]?.score ?? 0;
    const cutoff = adaptiveCutoff(top);
    const kept =
      top >= MIN_TOP_SCORE
        ? scored.filter((s) => s.score >= cutoff).slice(0, 10)
        : [];
    const titles = kept.map((s) => docsById.get(s.id)?.title || s.id);

    if (c.expectEmpty) {
      if (kept.length === 0) {
        emptyOk += 1;
        console.log(`✓ EMPTY  ${JSON.stringify(q)}`);
      } else {
        emptyFail += 1;
        console.log(
          `✗ EMPTY  ${JSON.stringify(q)} → ${titles.slice(0, 3).join(', ')} (top ${top.toFixed(3)})`,
        );
      }
      continue;
    }

    intentCases += 1;
    const expect = new Set((c.expectTitles || []).map(String));
    let rank = -1;
    for (let i = 0; i < kept.length; i++) {
      const title = docsById.get(kept[i].id)?.title;
      if (title && expect.has(title)) {
        rank = i + 1;
        break;
      }
    }

    if (rank === 1) hitsAt1 += 1;
    if (rank > 0 && rank <= 3) hitsAt3 += 1;
    if (rank > 0) mrrSum += 1 / rank;

    const mark = rank > 0 && rank <= 3 ? '✓' : '✗';
    console.log(
      `${mark} #${rank < 0 ? '-' : rank}  ${JSON.stringify(q)} → ${titles.slice(0, 3).join(', ') || '(none)'} (top ${top.toFixed(3)}, cut ${cutoff.toFixed(3)})`,
    );
  }

  const top1 = intentCases ? hitsAt1 / intentCases : 0;
  const top3 = intentCases ? hitsAt3 / intentCases : 0;
  const mrr = intentCases ? mrrSum / intentCases : 0;

  console.log('\n── Summary ──');
  console.log(
    `Intent top-1: ${(top1 * 100).toFixed(1)}%  top-3: ${(top3 * 100).toFixed(1)}%  MRR: ${mrr.toFixed(3)}  (n=${intentCases})`,
  );
  console.log(`Nonsense empty: ${emptyOk}/${emptyOk + emptyFail}`);

  // Soft gate: most intent queries in top-3; all nonsense empty.
  const ok = top3 >= 0.7 && emptyFail === 0;
  if (!ok) {
    console.error('\nEval below target (top-3 ≥ 70%, nonsense all empty).');
    process.exit(1);
  }
  console.log('\nEval passed.');
}

main().catch((err) => {
  console.error('Eval failed:', err);
  process.exit(1);
});
