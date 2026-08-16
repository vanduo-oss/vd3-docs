import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
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
