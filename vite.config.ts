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
  // Base path. Defaults to "/" so local dev, `pnpm run preview`, and the
  // Playwright suites all serve from the root (route paths like `/about` work
  // unchanged). The GitHub Pages deploy builds a project-page site under
  // `/vd3-docs/`, so `deploy.yml` sets `VITE_BASE=/vd3-docs/`. vite-ssg feeds
  // this to the router history base via `import.meta.env.BASE_URL`.
  base: process.env.VITE_BASE ?? "/",
  plugins: [vue()],
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // The vd3 packages are consumed via pnpm `link:` to sibling working trees,
    // each with its own node_modules; dedupe so the app and the linked libs
    // share one Vue/Pinia copy (avoids the "different pinia instance" error).
    dedupe: ["vue", "pinia"],
  },
  optimizeDeps: {
    // Never pre-bundle the symlinked source packages — serve them as source so
    // edits to the sibling builds are always reflected in dev and SSG.
    exclude: ["@vanduo-oss/vd3", "@vanduo-oss/vd3-cbun"],
  },
  server: {
    fs: {
      // @vanduo-oss/vd3 + vd3-cbun are consumed via pnpm `link:` to sibling
      // working trees OUTSIDE this project root, and their bundled CSS references
      // fonts/icons with relative url()s that resolve into ../vd3/dist and
      // ../vd3-cbun/dist. The dev server's default fs.allow only covers the
      // project root, so those @fs requests 403 without these entries. Harmless
      // once the deps flip to published versions (assets then live in
      // node_modules under the project root) — the entries just no-op.
      allow: [
        fileURLToPath(new URL(".", import.meta.url)),
        fileURLToPath(new URL("../vd3", import.meta.url)),
        fileURLToPath(new URL("../vd3-cbun", import.meta.url)),
      ],
    },
  },
  ssr: {
    // SSG must transform the linked packages' .vue components (not require them
    // as CJS) during prerender.
    noExternal: ["@vanduo-oss/vd3", "@vanduo-oss/vd3-cbun"],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
  },
});
