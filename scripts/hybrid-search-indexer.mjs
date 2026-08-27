#!/usr/bin/env node
/* eslint-disable no-console -- CLI progress output for maintainers */
/**
 * Hybrid search indexer for vd3-docs — Fuse corpus + EmbeddingGemma vectors.
 *
 * Writes:
 *   public/search/search-index.json
 *   public/search/vectors.json
 *
 * Usage:
 *   pnpm index
 *   VD3_DOCS_SITE=http://127.0.0.1:8787 pnpm index
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  EMBEDDING_MODEL_ID,
  documentEmbedText,
  prefixDocument,
} from './lib/embeddinggemma.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.resolve(PROJECT_ROOT, 'public/search');

const DOCS_SITE = process.env.VD3_DOCS_SITE || 'https://vd3.vanduo.dev';
const NAV_RAW_URL =
  process.env.VD3_DOCS_NAV_URL ||
  'https://raw.githubusercontent.com/vanduo-oss/vd3-docs/main/src/nav.ts';
const FETCH_CONCURRENCY = Number(process.env.VD3_DOCS_FETCH_CONCURRENCY || 6);
const USER_AGENT = 'vd3-docs-hybrid-search-indexer/0.1.0';

// ── Text helpers ───────────────────────────────────────────────────────

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(html) {
  return decodeEntities(
    html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function extractRegion(html, className) {
  const re = new RegExp(
    `<div[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>([\\s\\S]*)$`,
    'i',
  );
  const m = html.match(re);
  if (!m) return '';
  let depth = 1;
  const body = m[1];
  for (let i = 0; i < body.length; i++) {
    if (body.startsWith('<div', i)) {
      const end = body.indexOf('>', i);
      if (end === -1) break;
      if (!body.startsWith('<div/', i)) depth++;
      i = end;
    } else if (body.startsWith('</div>', i)) {
      depth--;
      if (depth === 0) return body.slice(0, i);
      i += 5;
    }
  }
  return body;
}

function extractMainContent(html) {
  const docContent = extractRegion(html, 'doc-content');
  if (docContent) return docContent;

  const mainMatch = html.match(
    /<main[^>]*id="main-content"[^>]*>([\s\S]*?)<\/main>/i,
  );
  if (!mainMatch) return '';
  return mainMatch[1].replace(
    /<aside[^>]*class="[^"]*\bdoc-sidebar\b[^"]*"[\s\S]*?<\/aside>/gi,
    ' ',
  );
}

function cleanDocHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(
      /<div[^>]*class="[^"]*\bvd-code-snippet\b[^"]*"[\s\S]*?<\/div>/gi,
      ' ',
    )
    .replace(/<pre[^>]*>[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<button[^>]*>[\s\S]*?<\/button>/gi, ' ')
    .replace(/\b(View Code|Customize live|Copy|HTML|CSS|Vue)\b/gi, ' ');
}

function extractHeadings(html) {
  const headings = [];
  const re = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = stripTags(m[2]).trim();
    if (text && text.length < 160) headings.push(text);
  }
  return [...new Set(headings)];
}

function extractParagraphs(html) {
  const texts = [];
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = stripTags(m[1]).trim();
    if (text && text.length > 15) texts.push(text);
  }
  return texts;
}

function extractClasses(html) {
  const classes = [];
  const re = /<td>\s*<code>([\s\S]*?)<\/code>\s*<\/td>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = stripTags(m[1]).trim();
    if (text && (text.startsWith('.vd-') || text.startsWith(':')))
      classes.push(text);
  }
  return [...new Set(classes)];
}

function extractChunks(html) {
  const chunks = [];
  let currentHeading = '';
  const blocks = html.split(/(?=<h[1-6][^>]*>)/i);

  for (const block of blocks) {
    const headingMatch = block.match(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/i);
    if (headingMatch) currentHeading = stripTags(headingMatch[2]).trim();

    const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let pm;
    while ((pm = pRe.exec(block)) !== null) {
      const text = stripTags(pm[1]).trim();
      if (text && text.length > 10) {
        chunks.push({ type: 'paragraph', text, heading: currentHeading });
      }
    }

    const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let tm;
    while ((tm = trRe.exec(block)) !== null) {
      const cells = [];
      const tdRe = /<td[^>]*>([\s\S]*?)<\/td>/gi;
      let dm;
      while ((dm = tdRe.exec(tm[1])) !== null)
        cells.push(stripTags(dm[1]).trim());
      if (cells.length >= 2 && cells[0] && cells[1]) {
        chunks.push({
          type: 'class',
          text: `${cells[0]} — ${cells[1]}`,
          heading: currentHeading,
        });
      }
    }
  }

  return chunks.slice(0, 80);
}

function pageUrl(route) {
  if (!route || route === '/') return `${DOCS_SITE.replace(/\/$/, '')}/`;
  return `${DOCS_SITE.replace(/\/$/, '')}${route.startsWith('/') ? route : `/${route}`}`;
}

function normalizeIcon(icon) {
  const value = String(icon || 'file-text')
    .trim()
    .replace(/^ph-/, '');
  return value || 'file-text';
}

// ── Nav loading ───────────────────────────────────────────────────────

function parseNavObject(src) {
  const marker = src.indexOf('export const nav');
  if (marker < 0) throw new Error('Could not find export const nav in nav.ts');
  const eq = src.indexOf('=', marker);
  const objStart = src.indexOf('{', eq);
  if (objStart < 0) throw new Error('Could not find nav object literal');

  let depth = 0;
  let end = -1;
  for (let i = objStart; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end < 0) throw new Error('Unbalanced nav object literal');
  // Object literal in nav.ts is valid JS (no type annotations inside).
  return new Function(`return (${src.slice(objStart, end)});`)();
}

async function loadNav() {
  const envPath = process.env.VD3_DOCS_PATH
    ? path.resolve(process.env.VD3_DOCS_PATH, 'src/nav.ts')
    : path.resolve(PROJECT_ROOT, 'src/nav.ts');

  if (fs.existsSync(envPath)) {
    console.log(`Reading nav from ${envPath}`);
    return parseNavObject(fs.readFileSync(envPath, 'utf-8'));
  }

  console.log(`Fetching nav from ${NAV_RAW_URL}`);
  const res = await fetch(NAV_RAW_URL, {
    headers: { 'user-agent': USER_AGENT },
  });
  if (!res.ok) throw new Error(`Failed to fetch nav.ts (${res.status})`);
  return parseNavObject(await res.text());
}

function flattenNavEntries(nav) {
  const entries = [];

  for (const page of nav.pages || []) {
    entries.push({
      id: page.id,
      title: page.title,
      route: page.route || '/',
      icon: normalizeIcon(page.icon),
      keywords: page.keywords || [],
      category: 'Page',
      tab: 'pages',
      tabTitle: 'Pages',
    });
  }

  for (const tab of nav.tabs || []) {
    for (const category of tab.categories || []) {
      for (const section of category.sections || []) {
        entries.push({
          id: section.id,
          title: section.title,
          route: section.route,
          icon: normalizeIcon(section.icon || category.icon || tab.icon),
          keywords: section.keywords || [],
          category: category.title || category.id,
          tab: tab.id,
          tabTitle: tab.title || tab.id,
        });
      }
    }
  }

  const seen = new Set();
  return entries.filter((entry) => {
    if (seen.has(entry.id)) return false;
    seen.add(entry.id);
    return true;
  });
}

// ── HTML fetch + document build ───────────────────────────────────────

async function mapPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const i = next++;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => run()),
  );
  return results;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': USER_AGENT, accept: 'text/html' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function buildDocument(entry, html) {
  const region = cleanDocHtml(extractMainContent(html));
  const headings = extractHeadings(region);
  const paragraphs = extractParagraphs(region);
  const classes = extractClasses(region);
  const chunks = extractChunks(region);
  const classTexts = chunks
    .filter((c) => c.type === 'class')
    .map((c) => c.text);

  const bodyText = [...paragraphs, ...classTexts.slice(0, 40)]
    .join('. ')
    .slice(0, 8000);

  return {
    id: entry.id,
    title: entry.title,
    category: entry.category,
    tab: entry.tab,
    tabTitle: entry.tabTitle,
    route: entry.route,
    icon: entry.icon,
    keywords: entry.keywords,
    headings,
    bodyText,
    classes,
    chunks,
  };
}

// ── Main ──────────────────────────────────────────────────────────────

async function main() {
  console.log('vd3-docs hybrid search indexer starting...\n');
  console.log(`Docs site: ${DOCS_SITE}`);

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const nav = await loadNav();
  const entries = flattenNavEntries(nav);
  console.log(`Found ${entries.length} nav entries\n`);

  const documents = [];
  const failed = [];

  await mapPool(entries, FETCH_CONCURRENCY, async (entry) => {
    const url = pageUrl(entry.route);
    try {
      const html = await fetchHtml(url);
      const doc = buildDocument(entry, html);
      if (!doc.bodyText && !doc.headings.length && !doc.chunks.length) {
        doc.bodyText = `${doc.title}. ${doc.category}. ${(doc.keywords || []).join('. ')}`;
      }
      documents.push(doc);
      process.stdout.write(`  ✓ ${entry.id}\n`);
    } catch (err) {
      failed.push({ id: entry.id, url, error: err.message });
      process.stdout.write(`  ✗ ${entry.id} (${err.message})\n`);
    }
  });

  documents.sort((a, b) => {
    const tabCmp = String(a.tab).localeCompare(String(b.tab));
    if (tabCmp) return tabCmp;
    return String(a.title).localeCompare(String(b.title));
  });

  if (failed.length) {
    console.warn(`\nFailed ${failed.length} pages:`, failed.slice(0, 8));
  }

  console.log(`\nBuilt ${documents.length} documents`);

  const indexPath = path.join(DATA_DIR, 'search-index.json');
  fs.writeFileSync(indexPath, JSON.stringify({ documents }, null, 2));
  console.log(
    `search-index.json written (${(fs.statSync(indexPath).size / 1024).toFixed(1)} KB)`,
  );

  console.log('\nLoading EmbeddingGemma model...');
  const { pipeline } = await import('@huggingface/transformers');
  const extractor = await pipeline('feature-extraction', EMBEDDING_MODEL_ID, {
    dtype: 'q8',
  });

  console.log('Generating embeddings (document task prefixes)...');
  const vectors = [];
  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];
    const text = prefixDocument(doc.title, documentEmbedText(doc));
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    vectors.push({ id: doc.id, embedding: Array.from(output.data) });
    if ((i + 1) % 10 === 0 || i === documents.length - 1) {
      console.log(`  ${i + 1}/${documents.length} done`);
    }
  }

  const vectorsPath = path.join(DATA_DIR, 'vectors.json');
  fs.writeFileSync(
    vectorsPath,
    JSON.stringify(
      {
        model: EMBEDDING_MODEL_ID,
        source: DOCS_SITE,
        generatedAt: new Date().toISOString(),
        dimensions: vectors[0]?.embedding.length || 768,
        documents: vectors,
      },
      null,
      2,
    ),
  );
  console.log(
    `vectors.json written (${(fs.statSync(vectorsPath).size / 1024).toFixed(1)} KB)`,
  );

  const indexIds = new Set(documents.map((d) => d.id));
  const vectorIds = new Set(vectors.map((v) => v.id));
  const missingFromVectors = [...indexIds].filter((id) => !vectorIds.has(id));
  const orphanVectors = [...vectorIds].filter((id) => !indexIds.has(id));
  if (missingFromVectors.length || orphanVectors.length) {
    console.error('Index/vector id mismatch', {
      missingFromVectors,
      orphanVectors,
    });
    process.exit(1);
  }

  console.log('\nIndexing complete!');
}

main().catch((err) => {
  console.error('Indexer failed:', err);
  process.exit(1);
});
