# VD3 improvement backlog

P1 means address before the next release or stronger product claims. P2 means the next focused improvement cycle. P3 means evaluate after the foundations are reliable. These are priorities, not deadlines or numeric quality scores.

All implementation starts on `dev-vXXX` branches from freshly fetched `origin/main`, stays local, and uses focused commits. No push, PR, merge, publish, or deployment until the user and agent are satisfied with local QA and explicitly authorize the remote action. Apply this to all four repositories and correct conflicting contributor instructions.

| ID | Priority | Area | Change and acceptance |
| --- | --- | --- | --- |
| A01 | P1 | VD3 safety | Whitelist anchor attributes as well as other allowed elements. Default output contains no event attributes or style attributes. Test anchors with safe/unsafe hrefs, event handlers, disallowed attributes, default style denial, and SSR fallback; exercise a rich-content consumer. |
| A02 | P1 | Flowchart state | Define controlled updates and internal editor state explicitly. Echoing emitted documents must not loop. Toggling read-only or grid options preserves current nodes, edges, viewport, selection where valid, and history where applicable. Add real Vue integration tests, not only core tests. |
| A03 | P1 | Tooltips | Render the trigger normally and render a separate tooltip surface. Use one placement contract. Hover and keyboard focus show it; blur and Escape dismiss it; connect trigger/tooltip semantics; verify dynamic triggers and unmount cleanup. Test with the shipped CSS in a browser. |
| A04 | P1 | Charts defaults | Preserve factory defaults when wrapper props are absent. Both Vue pie entry points render one outer arc per ordinary slice without an explicit radius; donut retains its hole. Test imports from built package output. |
| A05 | P1 | Accessibility | Fix reported contrast, inline-link distinction, and nested controls. Replace global rule exclusions with narrowly scoped, documented temporary exceptions that do not hide new occurrences. Verify default light/dark themes and supported bright primary fills; do not promise blanket WCAG conformance. |
| A06 | P1 | Local QA | Triage the dock inset failure and all twelve screenshot differences on the audited baseline. Fix real defects; update a baseline only after inspecting an intentional change. Preserve evidence and never raise thresholds simply to turn the suite green. |
| A07 | P1 | Labs removal | Make CBUN exclusively charts/flowchart. Remove current Labs copy/links, nav keywords, search entries, metadata, unused previews/assets, CSS imports, linked dependency, lockfile references, Vite aliases, and CI/deploy sibling checkout/build. A fresh DocSite build must work without a Labs sibling. Retain historical repository records, but keep retired features out of current installation guidance and search results. |
| A08 | P2 | Chart updates | Reconcile responsive observer lifecycle when options change; preserve logical keyboard focus during data/size updates; establish theme-only refresh behavior. Add browser tests for Vue wrappers, responsive false→true→false, active-mark updates/removal, resize, theme changes, and touch-accessible details. |
| A09 | P2 | Flowchart access | Add keyboard selection/navigation and an accessible graph representation with node labels and relationships. Verify add/select/edit/connect/delete/undo without a pointing device. Keep toolbar and canvas focus predictable; manually test at least one screen-reader/browser combination. |
| A10 | P2 | DocSite accuracy | Correct `/css/core`, old asset paths, and eager-route claims. Prefer Vue examples first and clearly label CSS-only/composable capabilities. Derive search from canonical current content and validate routes, package names, and copied imports. Historical names may appear only in clearly identified release history. |
| A11 | P2 | Editorial consistency | Apply purpose→demo→complete example→API→specific caveats. Begin with Dock, Doc Search, Theme Customizer, Flowchart, Charts, Architecture, Ecosystem, and entry guides. Use the sample tone in the audit; retain necessary constraints and leave already concise sections alone. |
| A12 | P2 | Agent skills | Give each package a complete task recipe with data, CSS choice, events, and verification. Link to canonical public declarations/reference. Separate maintainer workflow from consumer usage; ensure any referenced recipe files are published. Validate five representative integration tasks from installed packages. |
| A13 | P2 | CI trust | Add a fast DocSite unit/content-contract gate and a focused browser smoke check; run the broader suite locally before release. Validate skill links/examples when Markdown changes—current library CI ignores Markdown-only changes. Keep action-minute costs explicit and the local QA record available. |
| A14 | P2 | Loading | Split DocSite routes and defer optional heavy demos while retaining SSG output, navigation, search, and code copying. Measure initial-route assets before/after; the current single app JS is about 385.5 KiB gzip. Do not remove useful reference content solely to satisfy a byte budget. |
| A15 | P2 | State and formats | Document current module-wide theme/toast scope; design per-app/request isolation if supporting multiple app instances or personalized SSR. Separate flowchart package release version from document-format version, preserve old fixtures, and reject or explicitly handle unsupported future formats. |
| A16 | P3 | Performance and exports | Benchmark real chart updates and graph drag/layout/history at increasing sizes on named devices. Publish tested envelopes and optimize measured bottlenecks. Evaluate a true tokens-only CSS export and optional core-only JS entry points; do not silently redefine existing `/css/core`. |

## Validation beyond the current suite

- Security checks exercise the actual sanitizer branch for each allowed element type and relevant consumers.
- Component browser tests mount Vue exports with shipped CSS; core-factory tests remain separate.
- Flowchart tests cover prop changes after edits, controlled state echo, undo after updates, older JSON, and invalid/future documents.
- Charts cover negative/empty/non-finite data, pie defaults, focus after redraw, resize, labels at narrow widths, themes, and click/keyboard parity.
- Documentation checks ensure examples compile, search matches canonical pages, no Labs build dependency remains, and headings/links remain usable.
- Visual review uses desktop and narrow widths in light/dark themes. A full accessibility assessment must include manual keyboard and screen-reader work; automated scanners alone are insufficient.

## Decisions intentionally left for implementation design

The audit does not authorize a redesign of every component, a new documentation framework, new widget families, or replacing the chart/flowchart engines. Exact APIs for state isolation, controlled flowchart updates, format versioning, and a new tokens-only entry need focused designs before implementation. Preserve existing public behavior where possible and document any migration. The established tasks, confirmed defects, and editorial direction are ready to prioritize without those broader redesigns.
