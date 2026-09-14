import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import path from "node:path";

const APP_VERSION = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("./package.json", import.meta.url)),
    "utf8",
  ),
).version as string;

// Until @vanduo-oss/vdl-cbun is on the registry, package.json uses link: and
// Vite needs explicit subpath aliases (exports alone fail for linked CSS/JS).
const vdlCbunRoot = fileURLToPath(new URL("../../vdl-cbun", import.meta.url));
const vdlCbunDist = path.join(vdlCbunRoot, "dist");
const useLocalVdlCbun = existsSync(path.join(vdlCbunDist, "index.js"));
const vdlCbunAlias = useLocalVdlCbun
  ? [
      {
        find: "@vanduo-oss/vdl-cbun/code-editor/css",
        replacement: path.join(vdlCbunDist, "code-editor/vd3-code-editor.css"),
      },
      {
        find: "@vanduo-oss/vdl-cbun/code-editor/highlight",
        replacement: path.join(vdlCbunDist, "code-editor/highlight.js"),
      },
      {
        find: "@vanduo-oss/vdl-cbun/code-editor",
        replacement: path.join(vdlCbunDist, "code-editor"),
      },
      {
        find: "@vanduo-oss/vdl-cbun/draw/css",
        replacement: path.join(vdlCbunDist, "draw/vd3-draw.css"),
      },
      {
        find: "@vanduo-oss/vdl-cbun/draw",
        replacement: path.join(vdlCbunDist, "draw"),
      },
      {
        find: "@vanduo-oss/vdl-cbun/hex-grid/hex-math",
        replacement: path.join(vdlCbunDist, "hex-grid/hex-math.js"),
      },
      {
        find: "@vanduo-oss/vdl-cbun/hex-grid",
        replacement: path.join(vdlCbunDist, "hex-grid"),
      },
      {
        find: "@vanduo-oss/vdl-cbun/music-player/css",
        replacement: path.join(
          vdlCbunDist,
          "music-player/vd3-music-player.css",
        ),
      },
      {
        find: "@vanduo-oss/vdl-cbun/music-player",
        replacement: path.join(vdlCbunDist, "music-player"),
      },
      {
        find: "@vanduo-oss/vdl-cbun",
        replacement: vdlCbunDist,
      },
    ]
  : [];

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
      ...vdlCbunAlias,
    ],
    // One Vue/Pinia/@vanduo-oss/vd3 copy so a nested cbun install cannot
    // shadow the published kit (and so a temporary `pnpm link` still shares
    // framework singletons). vdl-hybrid-search caches the loaded index and
    // embedding pipeline at module scope, so a second copy would re-download
    // the model.
    dedupe: ["vue", "pinia", "@vanduo-oss/vd3", "@vanduo-oss/vdl-hybrid-search"],
  },
  optimizeDeps: {
    // Keep the published packages out of the pre-bundle so a contributor can
    // still `pnpm link` sibling trees without a stale dep optimizer cache.
    exclude: [
      "@vanduo-oss/vd3",
      "@vanduo-oss/vd3-charts",
      "@vanduo-oss/vd3-flowchart",
      "@vanduo-oss/vdl-cbun",
    ],
    include: [
      "fuse.js",
      "@huggingface/transformers",
      "@vanduo-oss/vdl-hybrid-search",
    ],
  },
  server: {
    fs: {
      // Default allow is the project root (where published packages live under
      // node_modules). Sibling entries let a temporary `pnpm link` / `link:`
      // serve out-of-tree CSS url() assets (vdl-cbun lives outside perspective/).
      allow: [
        fileURLToPath(new URL(".", import.meta.url)),
        fileURLToPath(new URL("../vd3", import.meta.url)),
        fileURLToPath(new URL("../vd3-charts", import.meta.url)),
        fileURLToPath(new URL("../vd3-flowchart", import.meta.url)),
        fileURLToPath(new URL("../../vdl-cbun", import.meta.url)),
      ],
    },
  },
  ssr: {
    // SSG must transform the packages' .vue components (not require them as
    // CJS) during prerender. Hybrid search peers stay client-only via dynamic
    // import from the search store (not imported at SSG entry).
    noExternal: [
      "@vanduo-oss/vd3",
      "@vanduo-oss/vd3-charts",
      "@vanduo-oss/vd3-flowchart",
      "@vanduo-oss/vdl-cbun",
    ],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
  },
});
