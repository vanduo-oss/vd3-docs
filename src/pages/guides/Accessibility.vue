<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

const relatedComponents = [
  {
    to: "/components/modal",
    icon: "ph-rectangle",
    title: "Modal",
    desc: "Focus trap, Esc to close, and aria-modal handled for you.",
    badge: "Component",
  },
  {
    to: "/components/toast",
    icon: "ph-bell",
    title: "Toast",
    desc: "aria-live regions announce updates to screen readers.",
    badge: "Component",
  },
  {
    to: "/components/tabs",
    icon: "ph-tabs",
    title: "Tabs",
    desc: "Roving arrow-key navigation with the correct ARIA roles.",
    badge: "Component",
  },
  {
    to: "/components/tooltip",
    icon: "ph-chat-text",
    title: "Tooltip",
    desc: "Keyboard- and focus-reachable, never hover-only.",
    badge: "Component",
  },
  {
    to: "/components/pagination",
    icon: "ph-dots-three",
    title: "Pagination",
    desc: "Labelled nav landmark with aria-current on the active page.",
    badge: "Component",
  },
];

const focusCss = `/* Vanduo ships visible focus rings — never remove them outright */
.vd-btn:focus-visible {
  outline: 2px solid var(--vd-color-primary);
  outline-offset: 2px;
}`;

const ariaHtml = `<!-- Components expose the right roles/labels; keep them when you compose -->
<button class="vd-btn" aria-label="Close dialog">
  <i class="ph ph-x" aria-hidden="true"></i>
</button>

<nav class="vd-pagination" aria-label="Pagination">…</nav>`;

const motionCss = `/* Effects (parallax, morph, glass) respect reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .vd-parallax-layer { transform: none !important; }
}`;

const checklist: [string, string][] = [
  [
    "Keyboard reachable",
    "Every interactive control is focusable and operable with Tab/Enter/Space/arrows.",
  ],
  [
    "Visible focus",
    "Keep the focus ring; use :focus-visible to scope it to keyboard users.",
  ],
  [
    "Semantic roles",
    "Use real <button>/<a>/<nav>; components set role / aria-* for you.",
  ],
  ["Labels & names", "Icon-only controls need aria-label; images need alt."],
  [
    "Colour contrast",
    "Semantic tokens meet WCAG AA in both light and dark themes.",
  ],
  ["Reduced motion", "Animated effects honour prefers-reduced-motion."],
  [
    "Live regions",
    "Toasts and count changes use aria-live to announce updates.",
  ],
];
</script>

<template>
  <section id="accessibility">
    <h5 class="demo-title">
      <i class="ph ph-wheelchair"></i>Accessibility Essentials
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Vanduo's components ship with sensible roles, labels, focus styles, and
      motion guards. Accessibility is mostly about <em>not undoing</em> those
      defaults as you compose — and filling the gaps only you can: meaningful
      labels, alt text, and logical structure.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-cursor"></i> Keep focus visible</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :css="focusCss" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-tag"></i> Name every control</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="ariaHtml" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-person-simple-walk"></i> Respect reduced motion
            </h6>
          </div>
          <div class="vd-card-body">
            <p>
              The effects composables already guard this; do the same in custom
              CSS:
            </p>
            <DocCodeSnippet :css="motionCss" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-list-checks"></i> Accessibility checklist</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Check</th>
                <th>What it means</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in checklist" :key="row[0]">
                <td>
                  <strong>{{ row[0] }}</strong>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          Every component page includes an Accessibility card documenting its
          specific roles and keyboard support.
        </p>
      </div>
    </div>

    <GuideLinkCards
      class="vd-mt-6"
      icon="ph-list-checks"
      title="Accessibility built into these components"
      :links="relatedComponents"
    />
  </section>
</template>
