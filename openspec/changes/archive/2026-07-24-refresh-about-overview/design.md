## Context

The `/about` page was inherited verbatim from the vd2 docs clone: a long "The Shape of the Water" founder's message framed around the dual-engine (vanilla + Vue) product story. On the standalone vd3 site that framing is off-message and partly inaccurate. The route already exists and is prerendered by vite-ssg; only its content, scoped styles, and search keywords change.

## Goals / Non-Goals

**Goals:**
- Replace the founder copy with a short, accurate vd3 overview that a first-time reader can skim.
- Keep all facts verifiable against the packages (single package, Vue-3-only peer, tokens + CSS + `Vd*` + `useX`, `data-*` theming, SSR-safety, cbun canvas bundle).
- Keep styling self-contained in `about.vue`.

**Non-Goals:**
- No route/nav-structure change, no `app.css` edits, no other pages.
- No package/API change; docs-content only.

## Decisions

- **Static markup, no components/composables on the page.** About is prose; it documents APIs but does not need to instantiate them, so it stays a zero-import `<script setup>`. Keeps prerender trivial and avoids the "render real APIs" burden being anything more than accurate wording.
  - *Alternative — dogfood live `Vd*` cards/callouts:* rejected as unnecessary complexity for a copy page; the six component pages already carry the dogfooding requirement.
- **Scoped `.about-intro*` styles replace `.founders-message*`.** Self-contained, theme-token-driven (`--vd-*`), responsive breakpoint retained; nothing leaks to the shell.
- **Refresh the committed `vd3-about-*` Playwright baseline** rather than loosen tolerance — the markup genuinely changed, so the baseline should reflect the new page.

## Risks / Trade-offs

- **Content drift vs. reality** (e.g. component/composable counts) → mitigated by using soft, durable phrasing ("more than 50", "around 35") rather than exact numbers that rot.
- **Stale visual baseline breaks local `test:e2e`** → mitigated by regenerating the `/about` snapshot in the same change. CI does not run visual tests, so the deploy is unaffected either way.

## Migration Plan

Edit `about.vue` + `nav.ts`, regenerate the `/about` baseline, verify build/typecheck/lint/stylelint. Rollback = revert the two source files and restore the prior baseline PNG.

## Open Questions

None.
