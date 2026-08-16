import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

const vd3Root = fileURLToPath(new URL("../vd3", import.meta.url));

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@vanduo-oss/vd3/css/core",
        replacement: `${vd3Root}/dist/vd3-core.min.css`,
      },
      {
        find: "@vanduo-oss/vd3/css",
        replacement: `${vd3Root}/dist/vd3.min.css`,
      },
      {
        find: "@vanduo-oss/vd3/tokens.json",
        replacement: `${vd3Root}/dist/tokens.json`,
      },
      { find: "@vanduo-oss/vd3", replacement: `${vd3Root}/src/index.ts` },
    ],
    dedupe: ["vue", "pinia", "@vanduo-oss/vd3"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/unit/**/*.spec.ts"],
    setupFiles: ["./tests/unit/setup.ts"],
  },
});
