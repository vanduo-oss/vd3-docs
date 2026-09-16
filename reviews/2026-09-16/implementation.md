# Implementation and local QA

Work stays on dev-v174 (core), dev-v111 (charts), dev-v121 (flowchart), and dev-v176 (docs). No push, PR, merge, publish or deploy is authorized. The audited baseline and its known failures are retained in verification.md.

## Sequence

1. A01–A04: confirmed sanitizer, editor state, tooltip and pie defects.
2. A07, A10–A11: remove Labs; correct installation/search and simplify current copy.
3. A05–A06, A08–A09: interaction/accessibility repairs and visual QA.
4. A12–A15: package recipes, CI, route loading, state/format contracts.
5. A16: measured limits and export decisions; final cross-package QA.

## Decisions

- Flowchart Vue `data` is an external replacement when it changes; local edits emit `change`. Feeding an emitted document back is safe and does not emit again. Core `load()` retains its explicit change notification by default.
- Update editor options in place. History is retained for ordinary options. Disabling history clears it; reenabling seeds the current document, so edits made while disabled cannot produce stale undo results.
- Charts retain per-factory defaults when an option is undefined, including after a Vue prop is removed. Theme-only changes can explicitly request a redraw; responsive observation follows the current option.
- New public APIs, format handling and export choices need focused design and compatibility tests before their item is complete.

## Progress

User requested a local WIP checkpoint on 16 September as usage approached its limit. The authoritative done-versus-left report is saved outside the repositories at `../../../VD3_BACKLOG_CHECKPOINT.md` (relative to this file).

A01–A04, A07–A08, and the implementation portions of A05/A09/A12/A14/A15 are substantially implemented. A06 visual triage, A10 search accuracy, A11 editorial review, A13 CI readiness, and A16 performance/export decisions remain unfinished. No item should be treated as release-ready before final integration review.

Latest evidence: DocSite 235 unit tests pass; 24 light/dark accessibility cases and 11 contrast cases pass; six package browser cases and five installed recipes pass. The full DocSite run is 129 passed / 18 failed (17 screenshots and one search interaction). No visual baseline was updated. Core's full checkpoint run found token-source drift; that was corrected and all four token-sync tests pass, with a final full rerun still due. Charts last full suite: 165 pass. Flowchart after the latest source changes: 85 pass.

A drag optimization was added after the recorded performance baseline: preserve unrelated node SVG and rebuild only incident edges during pointer moves. It is a WIP change requiring a post-change benchmark and broader regression review. Screen-reader validation is also incomplete. `createVanduoContext()` is a proposal only, not a shipped API.

OpenSpec files are initial umbrella drafts; detailed scenarios, validation, final task status, release notes, and cross-package version coordination remain. Local commits are checkpoints only. No remote action is authorized.
