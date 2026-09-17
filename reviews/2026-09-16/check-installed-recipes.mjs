import { execFileSync } from "node:child_process";
import {
  readFileSync,
  writeFileSync,
  mkdtempSync,
  mkdirSync,
  copyFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
const here = fileURLToPath(new URL(".", import.meta.url));
const root = fileURLToPath(new URL("../../../", import.meta.url));
const temp = mkdtempSync(join(tmpdir(), "vd3-consumer-qa-"));
const packs = join(temp, "packs");
mkdirSync(packs);
const manifests = ["vd3", "vd3-charts", "vd3-flowchart"].map((name) => ({
  name,
  ...JSON.parse(readFileSync(join(root, name, "package.json"), "utf8")),
}));
const dependencies = { vue: "3.5.42" };
const archives = [];
for (const [i, name] of ["vd3", "vd3-charts", "vd3-flowchart"].entries()) {
  const result = JSON.parse(
    execFileSync(
      "npm",
      ["pack", "--ignore-scripts", "--json", "--pack-destination", packs],
      {
        cwd: join(root, name),
        env: { ...process.env, NPM_CONFIG_CACHE: join(temp, "npm-cache") },
        encoding: "utf8",
        stdio: ["ignore", "pipe", "inherit"],
      },
    ),
  )[0];
  dependencies[manifests[i].name] = `file:packs/${result.filename}`;
  archives.push({
    package: manifests[i].name,
    version: manifests[i].version,
    sha256: createHash("sha256")
      .update(readFileSync(join(packs, result.filename)))
      .digest("hex"),
  });
}
writeFileSync(
  join(temp, "package.json"),
  JSON.stringify(
    {
      name: "vd3-consumer-qa",
      private: true,
      type: "module",
      dependencies,
      devDependencies: {
        vite: "8.2.2",
        "@vitejs/plugin-vue": "6.0.8",
        "vue-tsc": "3.3.11",
        typescript: "6.0.3",
        "@playwright/test": "1.63.0",
        "@types/node": "26.4.1",
      },
    },
    null,
    2,
  ),
);
const run = (command, args) =>
  execFileSync(command, args, { cwd: temp, stdio: "inherit" });
const pnpm = (args) =>
  process.env.VD3_QA_PNPM_CLI
    ? run(process.execPath, [process.env.VD3_QA_PNPM_CLI, ...args])
    : run("pnpm", args);
pnpm([
  "install",
  "--offline",
  "--ignore-scripts",
  ...(process.env.VD3_QA_STORE
    ? ["--store-dir", process.env.VD3_QA_STORE]
    : []),
]);
copyFileSync(join(here, "prepare-recipes.mjs"), join(temp, "prepare.mjs"));
copyFileSync(
  join(here, "installed-recipes.spec.ts"),
  join(temp, "recipes.spec.ts"),
);
writeFileSync(
  join(temp, "playwright.config.ts"),
  `import {defineConfig} from '@playwright/test';export default defineConfig({testMatch:'recipes.spec.ts',use:{baseURL:'http://127.0.0.1:5188',browserName:'chromium'},webServer:{command:'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5188 --strictPort',url:'http://127.0.0.1:5188'},reporter:'list'});`,
);
run("node", ["prepare.mjs"]);
pnpm(["exec", "vue-tsc", "--noEmit"]);
pnpm(["exec", "vite", "build"]);
pnpm(["exec", "playwright", "test"]);
writeFileSync(
  join(here, "installed-recipes-results.json"),
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      tasks: 5,
      typecheck: "passed",
      build: "passed",
      browser: "5 passed",
      archives,
    },
    null,
    2,
  ) + "\n",
);
process.stdout.write(`Consumer QA passed. Isolated app: ${temp}\n`);
