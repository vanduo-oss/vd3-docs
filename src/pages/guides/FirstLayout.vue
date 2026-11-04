<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";
import { useActiveBreakpoint } from "@/composables/useActiveBreakpoint";
import { VdFooter, VdNavbar } from "@vanduo-oss/vd3";
import { RouterLink } from "vue-router";

const breakpoint = useActiveBreakpoint();

const relatedComponents = [
  {
    to: "/core/grid-system",
    icon: "ph-grid-four",
    title: "Grid system",
    desc: "The full column, offset, and gutter reference.",
    badge: "Core",
  },
  {
    to: "/components/navbar",
    icon: "ph-browser",
    title: "Navbar",
    desc: "A responsive top bar to anchor your layout.",
    badge: "Component",
  },
  {
    to: "/components/sidenav",
    icon: "ph-sidebar",
    title: "Sidenav",
    desc: "Collapsible side navigation for app shells.",
    badge: "Component",
  },
  {
    to: "/components/footer",
    icon: "ph-layout",
    title: "Footer",
    desc: "Multi-column footer that lands the page.",
    badge: "Component",
  },
];

const anatomy = [
  {
    cls: ".vd-container-*",
    role: "Centers the page and caps its width; adds side padding.",
  },
  {
    cls: ".vd-row",
    role: "A flex line that cancels the outer column gutters.",
  },
  {
    cls: ".vd-col-*",
    role: "Takes 1–12 of the row's 12 tracks; padding is the gutter.",
  },
  {
    cls: "Your content",
    role: "Cards, text, media — styled freely inside the column.",
  },
];

const containerHtml = `<!-- Centered, capped page width with side padding -->
<div class="vd-container-responsive">
  …your rows go here…
</div>`;

const gridHtml = `<div class="vd-container-responsive">
  <div class="vd-row">
    <div class="vd-col-12 vd-col-md-6 vd-col-lg-4">Column A</div>
    <div class="vd-col-12 vd-col-md-6 vd-col-lg-4">Column B</div>
    <div class="vd-col-12 vd-col-md-12 vd-col-lg-4">Column C</div>
  </div>
</div>`;

const shellJs = `<script setup lang="ts">
import { VdNavbar, VdFooter } from '@vanduo-oss/vd3';
<\/script>

<template>
  <VdNavbar>
    <template #brand><a href="/">Acme</a></template>
    <ul class="vd-navbar-nav">
      <li><a class="vd-nav-link active" href="/">Dashboard</a></li>
      <li><a class="vd-nav-link" href="/reports">Reports</a></li>
    </ul>
  </VdNavbar>

  <main class="vd-container-responsive vd-p-6">
    <div class="vd-row">
      <!-- Sidebar: full width on phones, 3/12 from lg -->
      <aside class="vd-col-12 vd-col-lg-3">
        <ul class="vd-sidenav-nav">
          <li class="vd-sidenav-item active">
            <a class="vd-sidenav-link" href="#">Overview</a>
          </li>
          <li class="vd-sidenav-item">
            <a class="vd-sidenav-link" href="#">Customers</a>
          </li>
        </ul>
      </aside>

      <!-- Main: 9/12 from lg, with its own nested row -->
      <section class="vd-col-12 vd-col-lg-9">
        <div class="vd-row">
          <div class="vd-col-12 vd-col-md-4">
            <div class="vd-card"><div class="vd-card-body">Revenue</div></div>
          </div>
          <div class="vd-col-12 vd-col-md-4">…</div>
          <div class="vd-col-12 vd-col-md-4">…</div>
        </div>
        <div class="vd-card"><div class="vd-card-body">Recent activity</div></div>
      </section>
    </div>
  </main>

  <VdFooter :columns="3" size="sm">
    <div class="vd-footer-section">
      <h4 class="vd-footer-heading">Product</h4>
      <ul class="vd-footer-list">
        <li class="vd-footer-list-item"><a class="vd-footer-link" href="/pricing">Pricing</a></li>
      </ul>
    </div>
    <!-- …more sections… -->
    <template #copyright>© 2026 Acme</template>
  </VdFooter>
</template>`;

const footerSections = [
  { title: "Product", links: ["Pricing", "Changelog"] },
  { title: "Company", links: ["About", "Careers"] },
  { title: "Help", links: ["Docs", "Contact"] },
];

const recipes = [
  {
    title: "Sidebar + content",
    desc: "A 3/9 split that stacks on phones.",
    cols: [
      { cls: "vd-col-3", label: "3" },
      { cls: "vd-col-9", label: "9" },
    ],
    html: `<div class="vd-row">
  <aside class="vd-col-12 vd-col-lg-3">Sidebar</aside>
  <main class="vd-col-12 vd-col-lg-9">Content</main>
</div>`,
  },
  {
    title: "Centered reading column",
    desc: "8 columns, offset by 2 — comfortable line length.",
    cols: [{ cls: "vd-col-8 vd-offset-2", label: "8 · offset 2" }],
    html: `<div class="vd-row">
  <article class="vd-col-12 vd-col-lg-8 vd-offset-lg-2">
    Long-form text
  </article>
</div>`,
  },
  {
    title: "Responsive card grid",
    desc: "1 → 2 → 3 → 4 cards per row as the screen widens.",
    cols: [
      { cls: "vd-col-3", label: "card" },
      { cls: "vd-col-3", label: "card" },
      { cls: "vd-col-3", label: "card" },
      { cls: "vd-col-3", label: "card" },
    ],
    html: `<div class="vd-row">
  <div class="vd-col-12 vd-col-sm-6 vd-col-lg-4 vd-col-xl-3">
    <div class="vd-card">…</div>
  </div>
  <!-- repeat per card -->
</div>`,
  },
  {
    title: "Golden split",
    desc: "38.2% / 61.8% — content and aside at a natural ratio.",
    golden: true,
    cols: [],
    html: `<div class="vd-row-golden">
  <aside class="vd-col-golden-minor">Aside</aside>
  <main class="vd-col-golden-major">Content</main>
</div>`,
  },
];

const breakpoints: [string, string, string][] = [
  ["base", "< 576px", "vd-col-* — stacks on phones"],
  ["sm", "≥ 576px", "vd-col-sm-*"],
  ["md", "≥ 768px", "vd-col-md-*"],
  ["lg", "≥ 992px", "vd-col-lg-*"],
  ["xl", "≥ 1200px", "vd-col-xl-*"],
  ["2xl", "≥ 1400px", "vd-col-2xl-*"],
];

const containers: [string, string][] = [
  [".vd-container", "Fixed 987px max-width, centered (does not step down)"],
  [
    ".vd-container-responsive",
    "987px, widening to 1364px at xl and 1597px at 2xl (used across these docs)",
  ],
  [".vd-container-fluid", "Full width, edge to edge, with side padding"],
  [
    ".vd-container-sm … -2xl",
    "Fluid below their breakpoint, capped above it — see Grid system",
  ],
];

const pitfalls = [
  {
    title: "Columns go directly inside a row",
    body: "Columns line up side by side only when their direct parent is a .vd-row. A wrapper div in between stacks them instead.",
  },
  {
    title: "Rows go inside a container",
    body: "Rows use negative side margins to cancel the column gutters; the container's padding is what absorbs them.",
  },
  {
    title: "Style an inner element, not the column",
    body: "vd3's CSS ships in @layer vd3, so a width or padding you set on a column in your own CSS silently wins over the grid. Wrap content in a card or div and style that instead.",
  },
  {
    title: "Start mobile-first",
    body: "Write vd-col-12 first, then add vd-col-md-* / vd-col-lg-* only where the layout should change.",
  },
];
</script>

<template>
  <section id="first-layout">
    <h5 class="demo-title">
      <i class="ph ph-layout"></i>Your first layout
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      vd3's layout system is plain CSS — a 12-column responsive grid inside a
      container, with mobile-first breakpoints and a constant 13px gutter. This
      guide builds a real page step by step: container, rows and columns,
      breakpoints, then a full app shell with <code>VdNavbar</code> and
      <code>VdFooter</code>.
    </p>

    <!-- Anatomy -->
    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-tree-structure"></i> Anatomy of a layout</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-row">
          <div class="vd-col-12 vd-col-lg-6 vd-mb-4">
            <div class="fl-anatomy" aria-hidden="true">
              <span class="fl-anatomy-label">container</span>
              <div class="fl-anatomy-row">
                <span class="fl-anatomy-label">row</span>
                <div class="fl-anatomy-cols">
                  <div class="fl-anatomy-col">
                    <span class="fl-anatomy-label">col-4</span>
                    <div class="fl-anatomy-content">content</div>
                  </div>
                  <div class="fl-anatomy-col fl-anatomy-col-wide">
                    <span class="fl-anatomy-label">col-8</span>
                    <div class="fl-anatomy-content">content</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="vd-col-12 vd-col-lg-6">
            <ol class="fl-anatomy-list">
              <li v-for="item in anatomy" :key="item.cls">
                <code>{{ item.cls }}</code> — {{ item.role }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1: container -->
    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><span class="fl-step">1</span> Pick a container</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-4">
          Every page starts with a container. It centers your content, caps the
          line length on big screens, and adds side padding so text never
          touches the viewport edge.
        </p>
        <div class="vd-table-responsive vd-mb-4">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Class</th>
                <th>Behaviour</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in containers" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <DocCodeSnippet :html="containerHtml" />
      </div>
    </div>

    <!-- Step 2 + 3: rows, columns, breakpoints -->
    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><span class="fl-step">2</span> Add rows and responsive columns</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-3">
          Columns stack on phones, go two-up on tablets, and three-up on
          desktops. Resize the window to watch them reflow.
        </p>
        <p class="vd-mb-4 vd-text-sm">
          You're viewing at
          <span class="vd-badge vd-badge-primary">{{ breakpoint }}</span>
        </p>
        <div class="vd-row vd-mb-4">
          <div class="vd-col-12 vd-col-md-6 vd-col-lg-4">
            <div class="first-layout-cell">Column A</div>
          </div>
          <div class="vd-col-12 vd-col-md-6 vd-col-lg-4">
            <div class="first-layout-cell">Column B</div>
          </div>
          <div class="vd-col-12 vd-col-md-12 vd-col-lg-4">
            <div class="first-layout-cell">Column C</div>
          </div>
        </div>
        <DocCodeSnippet :html="gridHtml" :default-open="true" />

        <h6 class="vd-mt-6 vd-mb-3">
          <span class="fl-step">3</span> Know your breakpoints
        </h6>
        <p class="vd-mb-4 vd-text-sm vd-text-muted">
          Breakpoints are mobile-first minimum widths: a
          <code>vd-col-md-6</code> applies from 768px up until a larger class
          overrides it. The current one is highlighted.
        </p>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Min width</th>
                <th>Column class</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in breakpoints"
                :key="row[0]"
                :class="{ 'fl-bp-active': row[0] === breakpoint }"
              >
                <td>
                  <strong>{{ row[0] }}</strong>
                </td>
                <td>{{ row[1] }}</td>
                <td>
                  <code>{{ row[2] }}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Step 4: app shell -->
    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><span class="fl-step">4</span> Compose a real page</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-4">
          Navbar, a sidebar column, a main column with its own nested row of
          cards, and a footer. Nested rows work exactly like top-level ones.
        </p>
        <div class="first-layout-shell vd-mb-4">
          <VdNavbar>
            <template #brand><span>Acme</span></template>
            <ul class="vd-navbar-nav">
              <li><a class="vd-nav-link active" href="#">Dashboard</a></li>
              <li><a class="vd-nav-link" href="#">Reports</a></li>
            </ul>
          </VdNavbar>
          <div class="vd-container-responsive vd-p-6">
            <div class="vd-row">
              <aside class="vd-col-12 vd-col-lg-3 vd-mb-4">
                <ul class="vd-sidenav-nav">
                  <li class="vd-sidenav-item active">
                    <a class="vd-sidenav-link" href="#" @click.prevent
                      ><i class="ph ph-squares-four"></i> Overview</a
                    >
                  </li>
                  <li class="vd-sidenav-item">
                    <a class="vd-sidenav-link" href="#" @click.prevent
                      ><i class="ph ph-users"></i> Customers</a
                    >
                  </li>
                  <li class="vd-sidenav-item">
                    <a class="vd-sidenav-link" href="#" @click.prevent
                      ><i class="ph ph-gear"></i> Settings</a
                    >
                  </li>
                </ul>
              </aside>
              <section class="vd-col-12 vd-col-lg-9">
                <div class="vd-row">
                  <div
                    v-for="stat in [
                      { label: 'Revenue', value: '$48.2k' },
                      { label: 'Customers', value: '1,284' },
                      { label: 'Churn', value: '2.1%' },
                    ]"
                    :key="stat.label"
                    class="vd-col-12 vd-col-md-4 vd-mb-4"
                  >
                    <div class="vd-card">
                      <div class="vd-card-body">
                        <div class="vd-text-sm vd-text-muted">
                          {{ stat.label }}
                        </div>
                        <div class="vd-text-2xl vd-font-semibold">
                          {{ stat.value }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="vd-card">
                  <div class="vd-card-body">
                    <strong>Recent activity</strong>
                    <p class="vd-text-sm vd-text-muted vd-mb-0 vd-mt-2">
                      Main content lives here — it takes 9 of 12 columns from
                      <code>lg</code> up and the full width below.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <VdFooter :columns="3" size="sm">
            <div
              v-for="section in footerSections"
              :key="section.title"
              class="vd-footer-section"
            >
              <h4 class="vd-footer-heading">{{ section.title }}</h4>
              <ul class="vd-footer-list">
                <li
                  v-for="link in section.links"
                  :key="link"
                  class="vd-footer-list-item"
                >
                  <a class="vd-footer-link" href="#" @click.prevent>{{
                    link
                  }}</a>
                </li>
              </ul>
            </div>
            <template #copyright>© 2026 Acme</template>
          </VdFooter>
        </div>
        <DocCodeSnippet :js="shellJs" />
      </div>
    </div>

    <!-- Recipes -->
    <h4 class="vd-mb-4">Common layout recipes</h4>
    <div class="vd-row vd-mb-6">
      <div
        v-for="recipe in recipes"
        :key="recipe.title"
        class="vd-col-12 vd-col-lg-6 vd-mb-4"
      >
        <div class="vd-card demo-card fl-fill">
          <div class="vd-card-header">
            <h6>{{ recipe.title }}</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">{{ recipe.desc }}</p>
            <div v-if="recipe.golden" class="vd-row-golden vd-mb-3">
              <div class="vd-col-golden-minor">
                <div class="first-layout-cell fl-mini">38.2%</div>
              </div>
              <div class="vd-col-golden-major">
                <div class="first-layout-cell fl-mini">61.8%</div>
              </div>
            </div>
            <div v-else class="vd-row vd-mb-3">
              <div v-for="(col, i) in recipe.cols" :key="i" :class="col.cls">
                <div class="first-layout-cell fl-mini">{{ col.label }}</div>
              </div>
            </div>
            <DocCodeSnippet :html="recipe.html" />
          </div>
        </div>
      </div>
    </div>

    <!-- Pitfalls -->
    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-warning-circle"></i> Common pitfalls</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-row">
          <div
            v-for="tip in pitfalls"
            :key="tip.title"
            class="vd-col-12 vd-col-md-6 vd-mb-4"
          >
            <strong class="vd-d-block vd-mb-2">{{ tip.title }}</strong>
            <p class="vd-text-sm vd-text-muted vd-mb-0">{{ tip.body }}</p>
          </div>
        </div>
        <p class="vd-text-sm vd-mb-0">
          The gutters and container widths follow the same Fibonacci spacing as
          the rest of the system — see
          <RouterLink to="/guides/fibonacci">Fibonacci scale</RouterLink>.
        </p>
      </div>
    </div>

    <GuideLinkCards
      class="vd-mt-6"
      icon="ph-stack"
      title="Build out the layout"
      :links="relatedComponents"
    />
  </section>
</template>

<style scoped>
.first-layout-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72px;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  color: var(--vd-text-on-primary, #fff);
  font-weight: 600;
  background: var(--vd-color-primary);
  border-radius: var(--vd-radius-fib-5, 0.3125rem);
  opacity: 0.85;
}

.first-layout-cell.fl-mini {
  min-height: 44px;
  margin-bottom: 0;
  font-size: 0.8rem;
}

.first-layout-shell {
  overflow: hidden;
  border: 1px solid var(--vd-border-color);
  border-radius: var(--vd-radius-fib-5, 0.3125rem);
}

.fl-fill {
  height: 100%;
}

.fl-step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  border-radius: 999px;
  background: var(--vd-color-primary);
  color: var(--vd-text-on-primary, #fff);
  font-size: 0.8rem;
  font-weight: 700;
}

.fl-bp-active td {
  background: color-mix(in srgb, var(--vd-color-primary) 14%, transparent);
}

/* Anatomy diagram */
.fl-anatomy,
.fl-anatomy-row,
.fl-anatomy-col {
  position: relative;
  border: 1px dashed var(--vd-border-color);
  border-radius: var(--vd-radius-fib-5, 0.3125rem);
}

.fl-anatomy {
  padding: 1.75rem 1rem 1rem;
  background: var(--vd-bg-secondary);
}

.fl-anatomy-row {
  padding: 1.75rem 0.5rem 0.5rem;
  border-color: var(--vd-color-info);
}

.fl-anatomy-cols {
  display: flex;
  gap: 0.5rem;
}

.fl-anatomy-col {
  flex: 1;
  padding: 1.75rem 0.5rem 0.5rem;
  border-color: var(--vd-color-success);
}

.fl-anatomy-col-wide {
  flex: 2;
}

.fl-anatomy-content {
  padding: 0.75rem;
  border-radius: var(--vd-radius-fib-3, 0.1875rem);
  background: var(--vd-color-primary);
  color: var(--vd-text-on-primary, #fff);
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}

.fl-anatomy-label {
  position: absolute;
  top: 0.35rem;
  left: 0.6rem;
  font-family: var(--vd-font-family-mono);
  font-size: 0.7rem;
  color: var(--vd-text-muted);
}

.fl-anatomy-list {
  margin: 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.75rem;
}
</style>
