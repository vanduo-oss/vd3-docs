import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  define: {
    __APP_VERSION__: JSON.stringify("0.0.0-test"),
  },
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
    // Node 26 exposes an experimental localStorage that stays undefined unless
    // --localstorage-file is set, and that getter blocks jsdom's storage.
    execArgv: ["--no-experimental-webstorage"],
    globals: true,
    include: ["tests/unit/**/*.spec.ts"],
    setupFiles: ["./tests/unit/setup.ts"],
  },
});
