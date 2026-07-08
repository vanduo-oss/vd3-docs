# Tasks

## 1. Repository hygiene files

- [ ] 1.1 Create `.gitignore` adapted from `vd2/.gitignore`: keep
      `node_modules`, `dist`, `.DS_Store`, `*.log`, `.vite`,
      `playwright-report`, `test-results`, `tsconfig.tsbuildinfo`; drop
      the vd2-specific demo-audio allowlist block.
- [ ] 1.2 Copy `vd2/LICENSE` (MIT) verbatim to `LICENSE`.
- [ ] 1.3 Create `README.md` stub: purpose (docs site for the vd3 line,
      `@vanduo-oss/vd3` + `@vanduo-oss/vd3-cbun`, Vue3-only successor of
      the vd2 docs site) and status (pre-scaffold — site lands via the
      `docs-clone-and-strip` openspec change; local-only until launch;
      deploys disabled; no CNAME).

## 2. Openspec bootstrap

- [ ] 2.1 Author this change (`init-docs-scaffold`): `proposal.md`
      (with Non-goals), `tasks.md`, `specs/repo-scaffold/spec.md`
      (Given/When/Then scenarios, SHALL/MUST requirements).
- [ ] 2.2 Do not modify `openspec/config.yaml`.

## 3. Verification

- [ ] 3.1 `openspec validate init-docs-scaffold` passes from the repo
      root.
- [ ] 3.2 Repo root contains exactly `.gitignore`, `LICENSE`,
      `README.md` (plus the pre-existing `openspec/` and `.claude/`
      directories) — no `package.json`, no `src/`, no site code.
- [ ] 3.3 All added files are byte-clean: LF line endings, trailing
      newline, no `.DS_Store` copied anywhere.
- [ ] 3.4 No pnpm/vite-ssg/Playwright/search-index steps — no
      `package.json` exists yet and no pages or nav change in this
      change; those verification steps start with `docs-clone-and-strip`.
