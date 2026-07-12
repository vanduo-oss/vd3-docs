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
