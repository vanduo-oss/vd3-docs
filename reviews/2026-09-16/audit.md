# VD3 audit — 16 September 2026

VD3 has a credible foundation: one visual language, broad Vue coverage, small dedicated chart and flowchart packages, and a documentation site that exercises shipped packages. Its biggest weakness is uneven reliability at the boundaries between components, imperative behavior, examples, and automated checks. The next investment should be correctness, accessibility, and a consistent route from example to working application.

This review targets developers who know Vue and the agents working with them. It delivers an assessment and backlog, not an implementation or release. Labs is outside the future DocSite scope; CBUN should introduce only charts and flowchart.

## What was examined

All four repositories were fetched from their existing remotes. Local audit branches were created directly from the fetched `origin/main`:

| Repository | Version audited | Baseline commit | Local branch |
| --- | --- | --- | --- |
| vd3 | 1.7.3 | `eb49f61af3521f6cd301ae9cdc86092efe17771d` | `dev-v174` |
| vd3-charts | 1.1.0 | `5a32e01fdb2cc84f160f661d8a5c1397efbd87fd` | `dev-v111` |
| vd3-flowchart | 1.2.0 | `c2c7b52af392b51783a9ee1d88d5b10a69683fe7` | `dev-v121` |
| vd3-docs | 1.7.5 | `66d277be41066bec6e1213cac33d43dfc863b053` | `dev-v176` |

The branch names reserve the next patch line; no package version was changed. No push, PR, deployment, or product change was made. The audit files live outside the published site content.

The review combines source and public API inspection, all existing unit suites, all builds, lint/format/style/type checks, chart and flowchart browser smoke tests, DocSite's Chromium desktop suite, targeted reproductions, and Chrome inspection of the published charts and flowchart pages. A generated inventory covers 95 static HTML outputs, including aliases; it is not a claim that every interaction on every page was manually tested. Close reading concentrated on entry guides, architecture, production, lazy loading, theming, component examples, charts, flowchart, CBUN, and the three package skills.

This is not an exhaustive security assessment, performance benchmark, screen-reader certification, or cross-browser certification. Installed dependencies were used with Node 24.17.0; build and check scripts used the repository's pinned pnpm 10.28.2. A clean dependency installation was not repeated.

## Strengths worth protecting

| Area | Strongest qualities | Main weakness |
| --- | --- | --- |
| Design system | Shared tokens, recognizable styling, 63 exported components, useful composables, live theme controls, TypeScript declarations | Some component contracts and accessibility behaviors are weaker than their documentation suggests |
| Charts | Six useful chart types, SVG output, keyboard-accessible marks and data tables, small runtime, framework-independent algorithms | Vue defaults, update behavior, and browser coverage need more attention |
| Flowchart | An actual editor with ports, routing, layout, history, JSON, programmatic graph construction, and a Vue adapter | State ownership is fragile; graph content has limited accessibility |
| Documentation | Real demos, copy controls, search, static output, visual tests, and compact sections already present | Mixed audiences, legacy claims, duplicate references, and inconsistent placement of the useful example |

**The design system's strongest differentiator is coherence.** Components, charts, and flowchart share `--vd-*` styling conventions. The theme customizer makes that coherence visible. The Fibonacci palette, proportions, glass surfaces, and Oola Dock give VD3 a recognizable identity. Keep that identity, but evaluate spacing, text contrast, density, and motion by usability; a mathematical proportion alone does not demonstrate usability.

The library offers practical product building blocks beyond buttons: forms, auth presentation, data tables, navigation, overlays, search adapters, and seven layout primitives. Named exports and Vue as the only runtime peer give consumers an understandable dependency boundary. Build checks verify package isolation, exported targets, token determinism, and CSS selector coverage. These are substantive engineering strengths.

**Charts are well scoped for embedded application charts.** Negative bars, multiple series, annotations, accessors, and data tables cover common dashboard work. Text is generally inserted with DOM text APIs. The core helpers can be tested separately from Vue. Keep the small, coherent surface before expanding into every possible chart type.

**Flowchart has the most substantial standalone interaction model.** Tree/radial/grid layouts, several node shapes, connection ports, editable edges, history, selection, JSON round trips, and relative node creation make it useful for workflow and diagram tools. Existing tests cover model normalization, older serialized data, layouts, and history. Those capabilities deserve clearer examples and stronger state preservation.

**DocSite already has the right ingredients.** A user can inspect a real component, adjust its appearance, and copy source. Static rendering exposes reference text without waiting for client-side navigation. The good sections should be edited lightly: the First Layout introduction, short field descriptions, and simple API tables demonstrate the right tone. Short sections can still be inaccurate: Spinner is a useful example of why word count cannot be the quality metric.

## Most important weaknesses, with evidence

### 1. The shared HTML sanitizer does not filter anchor attributes

**Confirmed; high priority.** The anchor branch validates `href` and removes `target`/`rel`, but skips the attribute whitelist used for other elements. A link retains `onclick` and `style="position:fixed;inset:0"` under default options. The sanitizer is exported and used by rich tooltips, popovers, and lazy HTML loading. Applications passing untrusted HTML through those paths can retain executable handler attributes and unwanted styling. The reproduction checks attribute retention; it does not execute a payload against the live site.

Evidence: [anchor handling](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3/src/utils/sanitizeHtml.ts:131), its call sites, and the saved reproduction. Existing sanitizer tests check event removal on a span, not an anchor. Fix the whitelist for every allowed element and add adversarial anchor tests before promoting security claims.

### 2. Flowchart's Vue adapter can lose work and create update feedback

**Confirmed; high priority.** Add a node inside the editor, then change `readonly`: the wrapper destroys the editor and recreates it from the original `data` prop. The new node disappears. The same reconstruction path covers other construction options; history is also recreated.

A natural controlled integration, `@change="data = $event.document"`, also feeds back into the deep watcher. `load()` emits another `change`; the reproduction observes `node:add → load → load → load` and deliberately stops after four events. The adapter needs an explicit, loop-safe ownership contract and preservation of the live document during option changes.

Evidence: [Vue data/option watchers](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3-flowchart/src/vue.js:60), [load behavior](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3-flowchart/src/core.js:3756), and the saved reproduction. The current wrapper test expects reconstruction but does not check preservation of edits.

### 3. `VdTooltip` is an incomplete component

**Confirmed with source, DOM, and CSS checks; high priority.** The component puts the `.vd-tooltip` class on the wrapper containing its trigger. That CSS makes the wrapper transparent and disables pointer events. It does not invoke the tooltip composable. It also writes `data-tooltip-position`, while the composable reads `data-tooltip-placement`.

The standalone component reproduction has opacity `0`, pointer events `none`, and no visible tooltip after hover. The existing tests assert attributes rather than the promised interaction. See the [component](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3/src/components/VdTooltip.vue:14) and [tooltip CSS](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3/css/components/tooltips.css:70). Separately, the composable lacks the role/description connection and Escape behavior expected by the [W3C tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/). Fix the component and composable as one behavior contract.

### 4. The Vue pie defaults and chart updates are inconsistent

**Confirmed.** Both `VdChart type="pie"` and `VdPieChart` produce slices with inner arcs unless `innerRadiusRatio` is explicitly zero. The wrapper passes `undefined` over the core factory's zero default. The documentation describes the generic workaround, but a named pie component should be correct by default. Existing browser tests instantiate core factories, which explains why they pass.

Two further reproductions show that changing `responsive` from false to true does not attach an observer, and updating data removes the focused SVG mark and leaves focus on `BODY`. Theme values are resolved into attributes during rendering; live theme-only updates also need a defined refresh contract rather than an assumption that every mark will update with CSS.

Evidence: [Vue options](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3-charts/src/vue.js:64), [redraw behavior](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3-charts/src/core.js:603), [observer lifecycle](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3-charts/src/core.js:1946), browser fixtures, and the saved reproduction. Add browser cases for Vue wrappers, reactive options, keyboard focus, and theme transitions.

### 5. Accessibility claims exceed the current evidence

**Confirmed test findings and browser observations.** DocSite's accessibility gate globally excludes `color-contrast`, `link-in-text-block`, and `nested-interactive` from failures. The dedicated run reports serious contrast findings on Buttons (27 nodes), Forms (43), Charts (13), Theme Customizer (19), Theme Switcher (10), Color Palette (71), Tree (47), and Getting Started (12). Home has nine nested-interactive findings. These are per-route scanner findings, not a count of unique design-system bugs.

The chart data table and roving navigation are real strengths, but they do not establish full WCAG compliance. W3C guidance also discusses meaningful text alternatives, relationships, and trends for [complex charts](https://www.w3.org/WAI/tutorials/images/complex/).

Flowchart presents its canvas as a single image in Chrome's accessibility tree. The source renders graph nodes without a keyboard/semantic node navigation model. Toolbar labels help, but they do not make the graph itself independently usable without pointing. Add an accessible graph outline and keyboard selection/editing path; test the complete workflow with assistive technology.

### 6. DocSite's quality gate is not currently green

The full Chromium desktop run reports **116 passed, 13 failed**. One dock geometry assertion observes a 23.75px right inset where the test accepts at most 14.75px. Twelve visual comparisons differ beyond the existing threshold: CBUN, Changelog, Theme Switcher, Theme Customizer, Doc Search, Expanding Cards, Troubleshooting, Ecosystem, Glass, Surfaces, Parallax, and Navbar.

These are baseline failures before product edits. They require distinguishing intended changes and stale baselines from defects; twelve mismatches are not automatically twelve product bugs. Screenshot baselines were not rewritten. DocSite CI currently omits unit, browser, and size suites to save minutes. Keep a small reliable CI gate and a fuller local pre-release check rather than treating a successful build as complete QA.

### 7. Documentation drift affects both humans and agents

- Ten of the 92 search documents still contain the retired `vd3-cbun` name, including charts, flowchart, installation, home, and production. Historical changelog references need different handling from current integration instructions.
- The library README and skill label `/css/core` as tokens-only. The build actually removes icon CSS while retaining component styling; the Production guide already describes this correctly.
- Lazy Loading says DocSite uses route-level dynamic imports, but the router eagerly imports its pages. The built site has a single approximately 385.5 KiB gzip application JS asset.
- Spinner and related pages still reference earlier framework asset paths. Several package descriptions and guides explain extraction history instead of the current integration.
- Component pages often lead with class-based demos and place the Vue usage farther down. This obscures whether a capability is a component prop, a composable, or CSS only. Badge explicitly distinguishes these surfaces; apply that clarity consistently.

The Labs removal should cover copy, search, metadata, unused preview components/assets, stylesheet imports, the linked dependency, Vite aliases, and CI/deployment sibling setup. Removing only the visible CBUN rows would leave unnecessary coupling behind. Preserve historical source changelogs and archived specifications as history; remove Labs promotion from current published documentation.

### 8. Costs and limits need clearer boundaries

Measured gzip sizes of the built entry files, before application-specific tree shaking, excluding Vue and font assets:

| Package | ESM JS | Main CSS |
| --- | ---: | ---: |
| vd3 | 74.4 KiB | 93.5 KiB |
| vd3-charts | 13.5 KiB | 1.1 KiB |
| vd3-flowchart | 28.2 KiB | 4.0 KiB |

The no-icons core CSS is still 69.6 KiB gzip. DocSite's app JS plus CSS is 511.6 KiB gzip against its 600 KiB budget; this excludes its 659,265-byte uncompressed search corpus and other assets. These are asset measurements, not page-load timings.

Chart redraws rebuild SVG content. Flowchart clears and reconstructs its scene during interaction, and history stores document snapshots. These are reasonable starting implementations but deserve measured data/node envelopes before claims about large or frequently updated datasets. No device performance limit is established by this review.

The theme defaults, storage prefix, theme state, and toast queue are module-level state. Browser guards make import/rendering safe in common SSR cases; they do not make state isolated across multiple apps or server requests. Clarify that distinction and evaluate per-app state for those consumers. The flowchart package version is also coupled to its serialized document version, which makes ordinary patch releases awkward; separate release identity from format compatibility deliberately.

## Documentation voice and structure

Adopt one voice: direct, neutral, specific, written for someone already building with Vue. Prefer “Renders six SVG chart types” over “SVG-first data visualization widget.” Replace architectural vocabulary with the action the user needs. Keep exact names, defaults, limitations, and accessibility instructions.

The default component page should contain a one- or two-sentence purpose, a representative live demo, one complete Vue example, a compact props/events/slots table, and only the component-specific caveats. Show the first working example without requiring a long scroll. Group secondary examples and CSS-only capabilities below it. Keep deeper material reachable and searchable; do not hide necessary instructions solely to reduce visible length.

Use 20–40 words for an introduction and roughly 150–250 words of explanatory prose as editing targets for an ordinary component page, excluding code and API tables. These are prompts to edit, not automatic deletion thresholds. Complex editor workflows can need more. Do not turn every page into a tutorial, repeat Vue setup everywhere, or explain the same theme architecture in multiple places.

The inventory finds a 139-word Dock opening, a 93-word Doc Search opening, an 85-word Theme Customizer opening, and a 90-word Flowchart opening. These combine product purpose, demo configuration, implementation details, and exceptions in one paragraph. Split out the few details users need at the point of use. Modal's long source file does not itself prove verbose prose: it has about 112 words in paragraph elements, with much of its size coming from examples and reference material.

Suggested openings:

| Page | Proposed copy |
| --- | --- |
| Charts | Six SVG chart types for Vue 3. Supports multiple series, annotations, keyboard navigation, and an accessible data table. |
| Flowchart | Build and edit node-based diagrams. Connect nodes, arrange layouts, undo changes, and save or load JSON. |
| Theme Customizer | Let users change the palette, accent, neutral colors, radius, and font. Choose the full panel or compact color swatches. |
| Oola Dock | A responsive navigation dock with four placements, theme controls, and animated orientation changes. Use the brand slot for your logo. |
| CBUN | Charts and flowchart for Vue 3, using the same design tokens as VD3. Explore the demos and add the packages you need. |

Keep the CBUN route; its page heading can say “Charts & flowchart” while navigation retains CBUN if desired. Avoid making users understand repository lineage before installing a package. Default flowchart demos should use a small readable diagram; the current radial example opened at 37% zoom in the inspected desktop view, making its labels hard to read while the surrounding editor occupied substantial space.

## Skills for agent-assisted development

The main skill is approximately 1,272 whitespace-delimited words; charts is 231 and flowchart 198. Their problem is usefulness and maintenance, not uniform excess length. The smaller two describe imports and exports but omit a complete working component with data. The main skill mixes inventory with isolated implementation caveats. Both widget skills show full and core CSS imports together without an explicit choice.

Use `SKILL.md` for consumer tasks: when to use the package, choose the right entry point, a minimal working example, data/event shapes, high-impact constraints, and verification. Put repository branch rules, build commands, and release workflow in maintainer instructions such as `AGENTS.md`/`CONTRIBUTING.md`. Keep public declarations and canonical examples as the API source; link to them instead of copying giant inventories.

Keep a short entry skill and load deeper recipes only when needed. If recipes become separate files, include them in the published package's `files` list and verify that installed packages can resolve every reference. Distinguish a consumer with only `node_modules` from a maintainer with the full repository. Do not assume source tests or sibling checkouts exist in a consuming app.

Use practical agent acceptance tasks: create a form and modal; produce a themed bar chart with negative values and click handling; render an actual pie; save and restore a flowchart without losing changes; integrate in SSR with client-only interaction. The skill succeeds when an agent can complete and verify those tasks without guessing an API or copying old package names. Shortness alone is not success.

## Recommended order

1. Fix sanitizer filtering, tooltip behavior, flowchart state ownership, and pie defaults with targeted regression cases.
2. Resolve accessibility findings and the failing baseline checks; describe supported behavior precisely.
3. Complete the Labs removal and align current page copy, imports, search, and contributor workflow.
4. Apply the shared page pattern and task-oriented skills, beginning with the longest and most consequential introductions.
5. Reduce loading and maintenance costs: route splitting, explicit CSS choices, reference generation, and measured performance envelopes.

The [backlog](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3-docs/reviews/2026-09-16/backlog.md) gives acceptance criteria. The [verification record](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3-docs/reviews/2026-09-16/verification.md) records what passed and failed; the [page inventory](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3-docs/reviews/2026-09-16/page-inventory.json) supports editorial triage; the [reproduction](/Users/misteruser/Documents/GitHub/0_vanduo/vd3/vd3-docs/reviews/2026-09-16/reproduce.mjs) preserves the targeted findings. None of the backlog is claimed as implemented.
