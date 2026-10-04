/** Stage only published library files so Vite, vue-tsc and Node share one API. */
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readlinkSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = resolve(root, process.env.VD3_SOURCE ?? "../vd3");
const stage = join(root, ".local-packages/vd3");
const saved = join(root, ".local-packages/vd3-link.json");
const link = join(root, "node_modules/@vanduo-oss/vd3");
const action = process.argv[2];
if (action === "restore") {
  if (!existsSync(saved)) throw new Error("No staged vd3 link to restore");
  if (!lstatSync(link).isSymbolicLink() || readlinkSync(link) !== stage) throw new Error("vd3 link changed; refusing to overwrite it");
  const original = JSON.parse(readFileSync(saved, "utf8"));
  rmSync(link);
  symlinkSync(original, link, "dir");
  rmSync(saved);
  process.stdout.write("Restored installed vd3 package link\n");
} else if (action === "stage") {
  if (existsSync(saved)) throw new Error("Restore the previous stage before staging again");
  if (!lstatSync(link).isSymbolicLink()) throw new Error("Expected pnpm's package symlink; refusing to replace a directory");
  if (!existsSync(join(source, "dist/index.d.ts"))) throw new Error("Build vd3 before staging");
  const manifest = JSON.parse(readFileSync(join(source, "package.json"), "utf8"));
  mkdirSync(join(root, ".local-packages"), { recursive: true });
  rmSync(stage, { recursive: true, force: true });
  mkdirSync(stage);
  for (const file of ["package.json", ...manifest.files]) {
    cpSync(join(source, file), join(stage, file), { recursive: true });
  }
  writeFileSync(saved, JSON.stringify(readlinkSync(link)));
  rmSync(link);
  symlinkSync(stage, link, "dir");
  process.stdout.write(`Staged ${manifest.name}@${manifest.version} from ${source}\n`);
} else {
  throw new Error("Usage: node scripts/local-vd3.mjs stage|restore");
}
