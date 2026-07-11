// Post-build: generate dist/sitemap.xml from the prerendered HTML files.
// Runs after `vite-ssg build`, so it reflects exactly the routes that shipped.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = "https://vanduo.dev";
const distDir = fileURLToPath(new URL("../dist", import.meta.url));

/** Recursively collect every .html file under dist/. */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

/** dist/foo/index.html -> /foo/ ; dist/bar.html -> /bar ; dist/index.html -> / */
function toRoute(file) {
  let p = "/" + relative(distDir, file).split(sep).join("/");
  if (p.endsWith("/index.html")) p = p.slice(0, -"index.html".length);
  else if (p.endsWith(".html")) p = p.slice(0, -".html".length);
  return p === "" ? "/" : p;
}

const files = walk(distDir);
const routes = [...new Set(files.map(toRoute))]
  // Drop the SPA fallback / catch-all artifacts if present.
  .filter((r) => !r.includes("[") && r !== "/404")
  .sort();

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .map((r) => {
    const loc = `${BASE_URL}${r}`;
    const priority = r === "/" ? "1.0" : "0.7";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

writeFileSync(join(distDir, "sitemap.xml"), xml);
// eslint-disable-next-line no-console -- build script status output
console.log(`✓ sitemap.xml written with ${routes.length} URLs`);
