import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
import { nav, flattenNav } from '@/nav';
const require = createRequire(import.meta.url);
function files(dir: string): string[] {
  return readdirSync(dir, {withFileTypes:true}).flatMap(entry => entry.isDirectory() ? files(join(dir,entry.name)) : [join(dir,entry.name)]);
}
const pages = files('src/pages').filter(path=>path.endsWith('.vue') && !path.endsWith('/changelog.vue'));

describe('current documentation contract', () => {
  it('has exactly one search entry for every canonical route and no retired package guidance', () => {
    const index = JSON.parse(readFileSync('public/search/search-index.json','utf8'));
    const routes = [...nav.pages, ...flattenNav(nav)].map(page=>page.route).sort();
    expect(index.documents.map((doc: {route:string})=>doc.route).sort()).toEqual(routes);
    expect(new Set(index.documents.map((doc: {id:string})=>doc.id)).size).toBe(routes.length);
    expect(JSON.stringify(index)).not.toMatch(/@vanduo-oss\/(?:vdl-cbun|vd3-cbun)|labs\.vanduo\.dev/);
  });

  it('keeps retired packages out of current installation and runtime files', () => {
    for (const path of [...pages,'src/main.ts','src/nav.ts','package.json','pnpm-lock.yaml','vite.config.ts']) {
      expect(readFileSync(path,'utf8'),path).not.toMatch(/@vanduo-oss\/(?:vdl-cbun|vd3-cbun)|labs\.vanduo\.dev/);
    }
  });

  it('resolves copied package imports and named exports against public declarations', () => {
    const failures: string[]=[];
    const exported = new Map<string, Set<string>>();
    for (const path of pages) {
      const source=readFileSync(path,'utf8');
      for (const match of source.matchAll(/(?:from\s+|import\s*)['"](@vanduo-oss\/[^'"]+)['"]/g)) {
        try { require.resolve(match[1]); } catch { failures.push(`${path}: missing import ${match[1]}`); }
      }
      for (const match of source.matchAll(/import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"](@vanduo-oss\/vd3(?:-charts|-flowchart)?)['"]/g)) {
        const name=match[2];
        if (!exported.has(name)) {
          const manifestPath=require.resolve(`${name}/package.json`);
          const manifest=JSON.parse(readFileSync(manifestPath,'utf8'));
          const entry=join(manifestPath,'..',manifest.types);
          const program=ts.createProgram([entry],{module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,skipLibCheck:true});
          const checker=program.getTypeChecker();
          const file=program.getSourceFile(entry)!;
          const symbol=checker.getSymbolAtLocation(file)!;
          exported.set(name,new Set(checker.getExportsOfModule(symbol).map(symbol=>symbol.name)));
        }
        for (const item of match[1].replace(/\/\/[^\n]*/g,'').split(',')) {
          const imported=item.trim().replace(/^type\s+/,'').split(/\s+as\s+/)[0];
          if (imported && !exported.get(name)!.has(imported)) failures.push(`${path}: ${name} has no ${imported}`);
        }
      }
    }
    expect(failures).toEqual([]);
  });
});
