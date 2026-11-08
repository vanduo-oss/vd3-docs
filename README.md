# vd3-docs

<a href="https://snyk.io/?utm_source=open-source&utm_medium=pg-ptr&utm_campaign=ref-2501-osp&utm_content=pg-cta"><img src="https://raw.githubusercontent.com/vanduo-oss/vd3-docs/main/assets/scanned-by-snyk.png" alt="Scanned by Snyk" width="206" height="141"></a>

Documentation and live demos for the vd3 line, published at [vd3.vanduo.dev](https://vd3.vanduo.dev/). The site dogfoods the published packages [`@vanduo-oss/vd3`](https://www.npmjs.com/package/@vanduo-oss/vd3), [`@vanduo-oss/vd3-charts`](https://www.npmjs.com/package/@vanduo-oss/vd3-charts), and [`@vanduo-oss/vd3-flowchart`](https://www.npmjs.com/package/@vanduo-oss/vd3-flowchart). It is `private` and is not published to npm.

Agents integrating a package should read that package's `SKILL.md`, not this README. Component guides are the site.

## Security

This repo is monitored with [Snyk](https://snyk.io/?utm_source=open-source&utm_medium=pg-ptr&utm_campaign=ref-2501-osp&utm_content=pg-cta).

## Requirements

Node 26 LTS. `nvm use` reads `.nvmrc`; `mise.toml` is the same pin. pnpm 10.28.2 via `corepack enable`.

## Install

```bash
corepack enable
pnpm install
```

`.npmrc` follows the vd3 hardened install policy. The `@vanduo-oss/*` scope is excluded from the release-age gate so new publishes install immediately.

## Scripts

```bash
pnpm run dev       # http://localhost:5173
pnpm run build     # vite-ssg to dist/
pnpm test          # unit tests
pnpm run test:e2e  # Playwright, Chromium Desktop
```

After `nav.ts` or searchable page copy changes, `pnpm run build` then `pnpm search:refresh`. `pnpm test:content` checks the committed search corpus. The rest of the gates are in [CONTRIBUTING.md](./CONTRIBUTING.md).

`VD3_LOCAL_PACKAGES=1 pnpm build` checks unreleased sibling builds. The default build uses the committed registry pins. Restore those pins before release.

## License

[MIT](./LICENSE).
