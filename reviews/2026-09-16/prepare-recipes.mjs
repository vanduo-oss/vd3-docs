import {
  mkdirSync,
  copyFileSync,
  writeFileSync,
  readFileSync,
  readdirSync,
} from "node:fs";
const cases = [
  ["modal-toast", "vd3"],
  ["tooltip", "vd3"],
  ["bar", "vd3-charts"],
  ["pie", "vd3-charts"],
  ["editor", "vd3-flowchart"],
];
mkdirSync("src", { recursive: true });
for (const [name, pkg] of cases)
  copyFileSync(
    `node_modules/@vanduo-oss/${pkg}/recipes/${name}.vue`,
    `src/${name}.vue`,
  );
writeFileSync(
  "src/main.ts",
  `import {createApp} from 'vue';\n${cases.map(([n], i) => `import Recipe${i} from './${n}.vue';`).join("\n")}\nconst recipes = {${cases.map(([n], i) => `'${n}':Recipe${i}`).join(",")}};\nconst key = new URL(location.href).searchParams.get('recipe') as keyof typeof recipes;\ncreateApp(recipes[key] ?? Recipe0).mount('#app');\n`,
);
writeFileSync(
  "index.html",
  '<!doctype html><html lang="en"><meta charset="utf-8"><title>Installed recipe QA</title><div id="app"></div><script type="module" src="/src/main.ts"></script></html>',
);
writeFileSync(
  "vite.config.ts",
  `import {defineConfig} from 'vite';import vue from '@vitejs/plugin-vue';export default defineConfig({plugins:[vue()],server:{host:'127.0.0.1',port:5188,strictPort:true}});`,
);
writeFileSync(
  "tsconfig.json",
  JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      strict: true,
      skipLibCheck: true,
      types: ["vite/client"],
    },
    include: ["src/**/*.ts", "src/**/*.vue"],
  }),
);
process.stdout.write("Copied all five recipes from installed archives.\n");
