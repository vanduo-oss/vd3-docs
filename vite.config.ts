import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

const APP_VERSION = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("./package.json", import.meta.url)),
    "utf8",
  ),
).version as string;

const docsAppVue = fileURLToPath(new URL("./src/App.vue", import.meta.url));

// Local cross-package QA only. Committed dependencies remain registry pins.
const localPackageAliases =
  process.env.VD3_LOCAL_PACKAGES === "1"
    ? ["vd3", "vd3-charts", "vd3-flowchart"].flatMap((name) => {
        const root = new URL(`../${name}/`, import.meta.url);
        const manifest = JSON.parse(
          readFileSync(new URL("package.json", root), "utf8"),
        );
        return Object.entries(manifest.exports).map(([subpath, entry]) => ({
          find: new RegExp(
            `^${manifest.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${subpath === "." ? "" : subpath.slice(1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
          ),
          replacement: fileURLToPath(
            new URL(
              typeof entry === "string"
                ? entry
                : ((entry as { import?: string; default?: string }).import ??
                  (entry as { default: string }).default),
              root,
            ),
          ),
        }));
      })
    : [];

/**
 * Vite's dep scanner (`extractImportPaths`) regex-lifts `import '…'` lines
 * out of `<script lang="ts">`, including ones that only live inside
 * template-literal guide snippets. Relative `.vue` paths then hit
 * `htmlTypesRE`, fail next to the guide SFC, and abort the scan with
 * UNRESOLVED_IMPORT. During `options.scan` only, map the known
 * `./App.vue` snippet false-positive to the real app shell.
 */
function stubSnippetAppVueDuringDepScan(): Plugin {
  return {
    name: "vd3-docs:stub-snippet-app-vue-during-dep-scan",
    enforce: "pre",
    resolveId(id, _importer, options) {
      if (!options?.scan) return;
      if (id === "./App.vue") return docsAppVue;
    },
  };
}

export default defineConfig({
  // Base path. Defaults to "/" so local dev, `pnpm run preview`, Playwright,
  // and the GitHub Pages deploy at https://vd3.vanduo.dev/ all serve from the
  // root. Override with `VITE_BASE` only when deliberately testing a non-root
  // project-page layout. vite-ssg feeds this to the router history base via
  // `import.meta.env.BASE_URL`.
  base: process.env.VITE_BASE ?? "/",
  plugins: [stubSnippetAppVueDuringDepScan(), vue()],
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
  },
  resolve: {
    alias: [
      ...localPackageAliases,
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    // One Vue/Pinia/@vanduo-oss/vd3 copy so a nested cbun install cannot
    // shadow the published kit (and so a temporary `pnpm link` still shares
    // framework singletons).
    dedupe: ["vue", "pinia", "@vanduo-oss/vd3"],
  },
  optimizeDeps: {
    // Default crawl is `**/*.html`, which also picks up Playwright HTML
    // reports (and similar) under the project root. Pin the SPA entry.
    entries: ["index.html"],
    // Keep the published packages out of the pre-bundle so a contributor can
    // still `pnpm link` sibling trees without a stale dep optimizer cache.
    // `@nuxtjs/color-mode` is snippet-only (CssVariables guide) — exclude so
    // extractImportPaths false positives do not abort the dep scan.
    exclude: [
      "@vanduo-oss/vd3",
      "@vanduo-oss/vd3-charts",
      "@vanduo-oss/vd3-flowchart",
      "@nuxtjs/color-mode",
    ],
    include: ["fuse.js"],
  },
  server: {
    fs: {
      // Default allow is the project root (where published packages live under
      // node_modules). Sibling entries let a temporary `pnpm link` / `link:`
      // serve assets from local package builds.
      allow: [
        fileURLToPath(new URL(".", import.meta.url)),
        fileURLToPath(new URL("../vd3", import.meta.url)),
        fileURLToPath(new URL("../vd3-charts", import.meta.url)),
        fileURLToPath(new URL("../vd3-flowchart", import.meta.url)),
      ],
    },
  },
  ssr: {
    // SSG must transform the packages' .vue components (not require them as
    // CJS) during prerender.
    noExternal: [
      "@vanduo-oss/vd3",
      "@vanduo-oss/vd3-charts",
      "@vanduo-oss/vd3-flowchart",
    ],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
  },
});
