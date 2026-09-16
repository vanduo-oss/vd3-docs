// Canonical search content comes from the same HTML users read, not a second copy.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import { nav } from '../src/nav.ts';

const clean = (text) => (text ?? '').replace(/\s+/g, ' ').trim();
const entries = nav.pages.map((page) => ({ ...page, category: 'Overview', tab: 'pages', tabTitle: 'Overview' }));
for (const tab of nav.tabs) {
  for (const category of tab.categories) {
    for (const section of category.sections) {
      entries.push({ ...section, category: category.title, tab: tab.id, tabTitle: tab.title });
    }
  }
}
const documents = entries.map((entry) => {
  const path = entry.route === '/' ? 'dist/index.html' : `dist${entry.route}.html`;
  const dom = new JSDOM(readFileSync(path, 'utf8'));
  const root = dom.window.document.querySelector('.doc-content') ?? dom.window.document.querySelector('main');
  if (!root) throw new Error(`No canonical content for ${entry.route}`);
  root.querySelectorAll('script, style, svg, nav, aside, button, .vd-code-snippet, .doc-code-snippet').forEach((el) => el.remove());
  const headings = [...root.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((el) => clean(el.textContent)).filter(Boolean);
  const bodyText = entry.route === '/changelog' ? 'Package release history for the design system, charts, and flowchart.' : clean(root.textContent);
  const result = { ...entry, headings: entry.route === '/changelog' ? ['Package release history'] : headings, bodyText };
  dom.window.close();
  return result;
}).sort((a, b) => a.id.localeCompare(b.id, 'en'));
const output = `${JSON.stringify({ documents }, null, 2)}\n`;
const publicPath = resolve('public/search/search-index.json');
if (process.argv.includes('--check')) {
  if (readFileSync(publicPath, 'utf8') !== output) throw new Error('Search source is stale. Build, then run pnpm search:refresh.');
} else {
  mkdirSync('dist/search', { recursive: true });
  writeFileSync('dist/search/search-index.json', output);
  if (process.argv.includes('--refresh')) writeFileSync(publicPath, output);
}
// eslint-disable-next-line no-console -- build output
console.log(`Search: ${documents.length} canonical routes, ${Buffer.byteLength(output)} bytes.`);
