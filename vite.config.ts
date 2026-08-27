import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "node:fs";

const APP_VERSION = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("./package.json", import.meta.url)),
    "utf8",
  ),
).version as string;

export default defineConfig({
  // Base path. Defaults to "/" so local dev, `pnpm run preview`, Playwright,
  // and the GitHub Pages deploy at https://vd3.vanduo.dev/ all serve from the
  // root. Override with `VITE_BASE` only when deliberately testing a non-root
  // project-page layout. vite-ssg feeds this to the router history base via
  // `import.meta.env.BASE_URL`.
  base: process.env.VITE_BASE ?? "/",
  plugins: [vue()],
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
  },
  resolve: {
    alias: [
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
    // Keep the published packages out of the pre-bundle so a contributor can
    // still `pnpm link` sibling trees without a stale dep optimizer cache.
    exclude: ["@vanduo-oss/vd3", "@vanduo-oss/vd3-cbun"],
    include: ["fuse.js", "@huggingface/transformers"],
  },
  server: {
    fs: {
      // Default allow is the project root (where published packages live under
      // node_modules). The sibling entries are no-ops for registry installs
      // and let a temporary `pnpm link` serve out-of-tree CSS url() assets.
      allow: [
        fileURLToPath(new URL(".", import.meta.url)),
        fileURLToPath(new URL("../vd3", import.meta.url)),
        fileURLToPath(new URL("../vd3-cbun", import.meta.url)),
      ],
    },
  },
  ssr: {
    // SSG must transform the packages' .vue components (not require them as
    // CJS) during prerender. Hybrid search peers stay client-only via dynamic
    // import from the search store (not imported at SSG entry).
    noExternal: ["@vanduo-oss/vd3", "@vanduo-oss/vd3-cbun"],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
  },
});
