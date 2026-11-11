<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { VdModal } from "@vanduo-oss/vd3";
import {
  VD3_COMPONENT_EXPORTS,
  VD3_COMPOSABLE_MODULES,
} from "@/constants/vd3Catalog";
import { nav } from "@/nav";

// Injected at build time from package.json (see vite.config.ts).
const docsVersion = __APP_VERSION__;

const componentsTab = nav.tabs.find((t) => t.id === "components");
const guideCount =
  componentsTab?.categories.find((c) => c.id === "guides")?.sections.length ??
  0;
const componentReferenceCount =
  componentsTab?.categories
    .filter((c) => c.id !== "guides")
    .reduce((n, c) => n + c.sections.length, 0) ?? 0;

interface Highlight {
  icon: string;
  text: string;
}
interface MiniIcon {
  title: string;
  icon: string;
}
interface DocsCard {
  to: string;
  linkClass: string;
  cardClass: string;
  icon: string;
  title: string;
  desc: string;
  highlights: Highlight[];
  miniIcons: MiniIcon[];
  tags: string[];
  meta: { icon: string; text: string };
}

const cards: DocsCard[] = [
  {
    to: "/components/button",
    linkClass: "docs-landing-link-components",
    cardClass: "docs-card-components",
    icon: "ph-cube",
    title: "Components",
    desc: "Explore the building blocks of vd3 UI.",
    highlights: [
      { icon: "ph-check-circle", text: "Live demos with copy-paste snippets" },
      {
        icon: "ph-check-circle",
        text: "Props, tokens, and accessibility notes",
      },
    ],
    miniIcons: [
      { title: "Core", icon: "ph-palette" },
      { title: "Input", icon: "ph-cursor-click" },
      { title: "Effects", icon: "ph-sparkle" },
      { title: "Canvas", icon: "ph-chart-line" },
    ],
    tags: ["Core", "Input", "Effects"],
    meta: {
      icon: "ph-files",
      text: `${componentReferenceCount} reference pages`,
    },
  },
  {
    to: "/cbun",
    linkClass: "docs-landing-link-canvas",
    cardClass: "docs-card-canvas",
    icon: "ph-tree-structure",
    title: "Canvas",
    desc: "SVG data charts and interactive flowchart editor packages.",
    highlights: [
      {
        icon: "ph-chart-bar",
        text: "@vanduo-oss/vd3-charts — SVG chart components",
      },
      {
        icon: "ph-flow-arrow",
        text: "@vanduo-oss/vd3-flowchart — interactive diagram editor",
      },
    ],
    miniIcons: [
      { title: "Charts", icon: "ph-chart-bar" },
      { title: "Flowchart", icon: "ph-flow-arrow" },
      { title: "SVG", icon: "ph-bezier-curve" },
    ],
    tags: ["vd3-charts", "vd3-flowchart", "SVG"],
    meta: {
      icon: "ph-stack",
      text: "2 standalone canvas packages",
    },
  },
  {
    to: "/guides/getting-started",
    linkClass: "docs-landing-link-guides",
    cardClass: "docs-card-guides",
    icon: "ph-compass",
    title: "Guides",
    desc: "Step-by-step tutorials to master the vd3 ecosystem.",
    highlights: [
      { icon: "ph-rocket-launch", text: "Quick start & zero-to-ship setup" },
      { icon: "ph-shield-check", text: "Security, lifecycle, and production" },
    ],
    miniIcons: [
      { title: "Setup", icon: "ph-package" },
      { title: "Theming", icon: "ph-paint-brush" },
      { title: "Integrations", icon: "ph-plugs-connected" },
    ],
    tags: ["Setup", "Theming", "Integrations"],
    meta: {
      icon: "ph-book-bookmark",
      text: `${guideCount} guided walkthroughs`,
    },
  },
  {
    to: "/changelog",
    linkClass: "docs-landing-link-changelog",
    cardClass: "docs-card-changelog",
    icon: "ph-clock-counter-clockwise",
    title: "Changelog",
    desc: "See what's new across all 3 packages and track each release.",
    highlights: [
      {
        icon: "ph-sparkle",
        text: "vd3 1.9.0, charts 1.2.0, flowchart 1.6.0 — latest packages",
      },
      {
        icon: "ph-git-branch",
        text: "Release notes for vd3, charts & flowchart",
      },
    ],
    miniIcons: [
      { title: "Releases", icon: "ph-tag" },
      { title: "Breaking changes", icon: "ph-warning-circle" },
      { title: "Roadmap", icon: "ph-map-trifold" },
    ],
    tags: ["Releases", "Tokens", "Lifecycle"],
    meta: {
      icon: "ph-calendar-blank",
      text: "Latest: vd3 1.9.0 · charts 1.2.0 · flowchart 1.6.0",
    },
  },
];

type ResourceModalId = "github" | "npm" | "license";

interface EcosystemPackage {
  name: string;
  version: string;
  icon: string;
  accent: string;
  summary: string;
  install: string;
  npmHref: string;
  githubHref: string;
  issuesHref: string;
  releasesHref: string;
  licenseHref: string;
  docsRoute: string;
  docsLabel: string;
}

const ecosystemPackages: EcosystemPackage[] = [
  {
    name: "@vanduo-oss/vd3",
    version: "1.9.0",
    icon: "ph-cube",
    accent: "#eab308",
    summary: `${VD3_COMPONENT_EXPORTS} Vue 3 components, ${VD3_COMPOSABLE_MODULES} composables, and Fibonacci token CSS.`,
    install: "pnpm add @vanduo-oss/vd3",
    npmHref: "https://www.npmjs.com/package/@vanduo-oss/vd3",
    githubHref: "https://github.com/vanduo-oss/vd3",
    issuesHref: "https://github.com/vanduo-oss/vd3/issues",
    releasesHref: "https://github.com/vanduo-oss/vd3/releases",
    licenseHref: "https://github.com/vanduo-oss/vd3/blob/main/LICENSE",
    docsRoute: "/components/button",
    docsLabel: "Component docs",
  },
  {
    name: "@vanduo-oss/vd3-charts",
    version: "1.2.0",
    icon: "ph-chart-bar",
    accent: "#10b981",
    summary:
      "Dependency-free SVG charts (bar, line, area, pie, donut, scatter) with Vue 3 wrappers.",
    install: "pnpm add @vanduo-oss/vd3-charts",
    npmHref: "https://www.npmjs.com/package/@vanduo-oss/vd3-charts",
    githubHref: "https://github.com/vanduo-oss/vd3-charts",
    issuesHref: "https://github.com/vanduo-oss/vd3-charts/issues",
    releasesHref: "https://github.com/vanduo-oss/vd3-charts/releases",
    licenseHref: "https://github.com/vanduo-oss/vd3-charts/blob/main/LICENSE",
    docsRoute: "/canvas/charts",
    docsLabel: "Charts docs",
  },
  {
    name: "@vanduo-oss/vd3-flowchart",
    version: "1.6.0",
    icon: "ph-flow-arrow",
    accent: "#06b6d4",
    summary:
      "Interactive node-and-edge flowchart editor with tree, radial, and grid layouts, minimap, and undo/redo.",
    install: "pnpm add @vanduo-oss/vd3-flowchart",
    npmHref: "https://www.npmjs.com/package/@vanduo-oss/vd3-flowchart",
    githubHref: "https://github.com/vanduo-oss/vd3-flowchart",
    issuesHref: "https://github.com/vanduo-oss/vd3-flowchart/issues",
    releasesHref: "https://github.com/vanduo-oss/vd3-flowchart/releases",
    licenseHref:
      "https://github.com/vanduo-oss/vd3-flowchart/blob/main/LICENSE",
    docsRoute: "/canvas/flowchart",
    docsLabel: "Flowchart docs",
  },
];

interface ResourceCard {
  label: string;
  to?: string;
  href?: string;
  modal?: ResourceModalId;
  linkClass: string;
  cardClass: string;
  icon: string;
  desc: string;
  highlights: Highlight[];
  miniIcons: MiniIcon[];
  tags: string[];
  meta: { icon: string; text: string };
}

const resources: ResourceCard[] = [
  {
    label: "About",
    to: "/about",
    linkClass: "docs-landing-link-about",
    cardClass: "docs-card-about",
    icon: "ph-info",
    desc: "The project and how the vd3 ecosystem is organized.",
    highlights: [
      { icon: "ph-users", text: "Who builds the framework" },
      { icon: "ph-tree-structure", text: "How the 3 packages fit together" },
    ],
    miniIcons: [
      { title: "Project", icon: "ph-folder" },
      { title: "Team", icon: "ph-users" },
      { title: "Principles", icon: "ph-compass" },
    ],
    tags: ["Project", "Team", "Principles"],
    meta: { icon: "ph-arrow-right", text: "About page" },
  },
  {
    label: "GitHub",
    href: "https://github.com/vanduo-oss",
    modal: "github",
    linkClass: "docs-landing-link-github",
    cardClass: "docs-card-github",
    icon: "ph-github-logo",
    desc: "Source repositories, issues, and releases for all 3 packages.",
    highlights: [
      { icon: "ph-code", text: "vanduo-oss/vd3, vd3-charts & vd3-flowchart" },
      { icon: "ph-git-pull-request", text: "Issues, pull requests & releases" },
    ],
    miniIcons: [
      { title: "Source", icon: "ph-code" },
      { title: "Issues", icon: "ph-bug" },
      { title: "Releases", icon: "ph-tag" },
    ],
    tags: ["vd3", "vd3-charts", "vd3-flowchart"],
    meta: { icon: "ph-squares-four", text: "Explore 3 GitHub repositories" },
  },
  {
    label: "NPM",
    href: "https://www.npmjs.com/org/vanduo-oss",
    modal: "npm",
    linkClass: "docs-landing-link-npm",
    cardClass: "docs-card-npm",
    icon: "ph-package",
    desc: "Published @vanduo-oss packages on the npm registry.",
    highlights: [
      {
        icon: "ph-download-simple",
        text: "@vanduo-oss/vd3, vd3-charts & vd3-flowchart",
      },
      {
        icon: "ph-package",
        text: "ESM bundles with full TypeScript declarations",
      },
    ],
    miniIcons: [
      { title: "vd3", icon: "ph-cube" },
      { title: "Charts", icon: "ph-chart-bar" },
      { title: "Flowchart", icon: "ph-flow-arrow" },
    ],
    tags: ["vd3", "Charts", "Flowchart"],
    meta: { icon: "ph-squares-four", text: "Explore 3 npm packages" },
  },
  {
    label: "License",
    href: "https://github.com/vanduo-oss/vd3/blob/main/LICENSE",
    modal: "license",
    linkClass: "docs-landing-link-license",
    cardClass: "docs-card-license",
    icon: "ph-scales",
    desc: "Permissive MIT license across the entire vd3 ecosystem.",
    highlights: [
      { icon: "ph-check-circle", text: "Use, modify, and distribute freely" },
      {
        icon: "ph-file-text",
        text: "Covers vd3, vd3-charts & vd3-flowchart",
      },
    ],
    miniIcons: [
      { title: "MIT", icon: "ph-scales" },
      { title: "Notice", icon: "ph-file-text" },
    ],
    tags: ["MIT", "Open source"],
    meta: { icon: "ph-squares-four", text: "View MIT license & notices" },
  },
];

const activeModal = ref<ResourceModalId | null>(null);

function openResourceModal(modal: ResourceModalId): void {
  activeModal.value = modal;
}

function closeResourceModal(): void {
  activeModal.value = null;
}

function onResourceCardClick(event: MouseEvent, card: ResourceCard): void {
  if (!card.modal) return;
  // Modified and non-primary clicks keep the anchor's open-in-new-tab behavior.
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0)
    return;
  event.preventDefault();
  openResourceModal(card.modal);
}
</script>

<template>
  <section id="docs-landing" class="about-section" style="padding-bottom: 6rem">
    <!-- Page Header -->
    <div class="about-header vd-surface vd-surface-noise">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-book-open-text"></i> Documentation
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Explore the vd3 Ecosystem — UI Components, SVG Charts, Interactive
          Flowchart, Guides, and Changelog
        </p>
      </div>
    </div>

    <div class="vd-container-responsive docs-landing-meta">
      <span
        id="docs-component-count"
        class="vd-badge vd-badge-outlined docs-landing-meta-badge"
      >
        <i class="ph ph-cube"></i>
        <span
          >@vanduo-oss/vd3 · {{ VD3_COMPONENT_EXPORTS }} components ·
          {{ VD3_COMPOSABLE_MODULES }} composables</span
        >
      </span>
      <RouterLink
        to="/canvas/charts"
        class="vd-badge vd-badge-outlined docs-landing-meta-badge docs-landing-meta-link"
      >
        <i class="ph ph-chart-bar"></i>
        <span>@vanduo-oss/vd3-charts · SVG Charts</span>
      </RouterLink>
      <RouterLink
        to="/canvas/flowchart"
        class="vd-badge vd-badge-outlined docs-landing-meta-badge docs-landing-meta-link"
      >
        <i class="ph ph-flow-arrow"></i>
        <span>@vanduo-oss/vd3-flowchart · Interactive Flowchart</span>
      </RouterLink>
      <span class="docs-landing-version">Documentation v{{ docsVersion }}</span>
    </div>

    <!-- Main Content -->
    <div class="vd-container-responsive docs-landing-main">
      <div class="docs-landing-grid">
        <RouterLink
          v-for="card in cards"
          :key="card.title"
          :to="card.to"
          class="docs-landing-link"
          :class="card.linkClass"
        >
          <div
            class="vd-card vd-card-glow vd-card-interactive vd-glass about-card docs-landing-card"
            :class="card.cardClass"
          >
            <div class="vd-card-body docs-landing-card-body">
              <i
                :class="`ph ${card.icon} docs-landing-card-icon`"
                aria-hidden="true"
              ></i>
              <div class="docs-landing-card-copy">
                <h4>{{ card.title }}</h4>
                <p>{{ card.desc }}</p>
                <ul
                  class="docs-landing-card-highlights"
                  :aria-label="`${card.title} highlights`"
                >
                  <li v-for="h in card.highlights" :key="h.text">
                    <i :class="`ph ${h.icon}`" aria-hidden="true"></i>
                    {{ h.text }}
                  </li>
                </ul>
                <div class="docs-landing-card-icons" aria-hidden="true">
                  <span
                    v-for="mi in card.miniIcons"
                    :key="mi.title"
                    :title="mi.title"
                  >
                    <i :class="`ph ${mi.icon}`"></i>
                  </span>
                </div>
                <div class="docs-landing-card-tags">
                  <span
                    v-for="tag in card.tags"
                    :key="tag"
                    class="vd-badge vd-badge-outlined docs-landing-tag"
                    >{{ tag }}</span
                  >
                </div>
                <div class="docs-landing-card-meta vd-text-muted">
                  <span>
                    <i :class="`ph ${card.meta.icon}`" aria-hidden="true"></i>
                    {{ card.meta.text }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>

      <nav class="docs-landing-resources" aria-label="Resources">
        <h3 class="docs-landing-resources-title">Resources</h3>
        <div class="docs-landing-resources-grid">
          <component
            :is="card.to ? RouterLink : 'a'"
            v-for="card in resources"
            :key="card.label"
            class="docs-landing-link"
            :class="card.linkClass"
            v-bind="
              card.to
                ? { to: card.to }
                : {
                    href: card.href,
                    target: '_blank',
                    rel: 'noopener',
                    'aria-haspopup': card.modal ? 'dialog' : undefined,
                    'data-resource-modal': card.modal,
                  }
            "
            @click="onResourceCardClick($event, card)"
          >
            <div
              class="vd-card vd-card-glow vd-card-interactive vd-glass about-card docs-landing-card"
              :class="card.cardClass"
            >
              <div class="vd-card-body docs-landing-card-body">
                <i
                  :class="`ph ${card.icon} docs-landing-card-icon`"
                  aria-hidden="true"
                ></i>
                <div class="docs-landing-card-copy">
                  <h4>{{ card.label }}</h4>
                  <p>{{ card.desc }}</p>
                  <ul
                    class="docs-landing-card-highlights"
                    :aria-label="`${card.label} highlights`"
                  >
                    <li v-for="h in card.highlights" :key="h.text">
                      <i :class="`ph ${h.icon}`" aria-hidden="true"></i>
                      {{ h.text }}
                    </li>
                  </ul>
                  <div class="docs-landing-card-icons" aria-hidden="true">
                    <span
                      v-for="mi in card.miniIcons"
                      :key="mi.title"
                      :title="mi.title"
                    >
                      <i :class="`ph ${mi.icon}`"></i>
                    </span>
                  </div>
                  <div class="docs-landing-card-tags">
                    <span
                      v-for="tag in card.tags"
                      :key="tag"
                      class="vd-badge vd-badge-outlined docs-landing-tag"
                      >{{ tag }}</span
                    >
                  </div>
                  <div class="docs-landing-card-meta vd-text-muted">
                    <span>
                      <i :class="`ph ${card.meta.icon}`" aria-hidden="true"></i>
                      {{ card.meta.text }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </component>
        </div>
      </nav>
    </div>
  </section>

  <!-- GitHub Repositories Modal -->
  <VdModal
    :open="activeModal === 'github'"
    title="GitHub Repositories — vanduo-oss"
    size="lg"
    @update:open="closeResourceModal"
    @close="closeResourceModal"
  >
    <p class="vd-text-sm vd-text-muted vd-mb-4">
      The vd3 ecosystem is developed across three focused open-source
      repositories under the <strong>vanduo-oss</strong> GitHub organization.
    </p>
    <div class="docs-resource-modal-list">
      <div
        v-for="pkg in ecosystemPackages"
        :key="pkg.name"
        class="docs-resource-pkg-card docs-landing-modal-pkg"
      >
        <div class="docs-resource-pkg-header">
          <span
            class="docs-resource-pkg-icon"
            :style="{ color: pkg.accent }"
            aria-hidden="true"
          >
            <i :class="`ph ${pkg.icon}`"></i>
          </span>
          <div class="docs-resource-pkg-title">
            <code>{{ pkg.name }}</code>
            <span class="vd-badge vd-badge-outlined">v{{ pkg.version }}</span>
          </div>
        </div>
        <p class="docs-resource-pkg-desc">{{ pkg.summary }}</p>
        <div class="docs-resource-pkg-actions">
          <a
            :href="pkg.githubHref"
            target="_blank"
            rel="noopener"
            class="vd-btn vd-btn-primary vd-btn-sm"
          >
            <i class="ph ph-github-logo" aria-hidden="true"></i> Repository
          </a>
          <a
            :href="pkg.issuesHref"
            target="_blank"
            rel="noopener"
            class="vd-btn vd-btn-outline vd-btn-sm"
          >
            <i class="ph ph-bug" aria-hidden="true"></i> Issues
          </a>
          <a
            :href="pkg.releasesHref"
            target="_blank"
            rel="noopener"
            class="vd-btn vd-btn-outline vd-btn-sm"
          >
            <i class="ph ph-tag" aria-hidden="true"></i> Releases
          </a>
          <RouterLink
            :to="pkg.docsRoute"
            class="vd-btn vd-btn-ghost vd-btn-sm"
            @click="closeResourceModal"
          >
            {{ pkg.docsLabel }}
          </RouterLink>
        </div>
      </div>
    </div>
    <template #footer>
      <button
        type="button"
        class="vd-btn vd-btn-outline"
        @click="closeResourceModal"
      >
        Close
      </button>
      <a
        href="https://github.com/vanduo-oss"
        target="_blank"
        rel="noopener"
        class="vd-btn vd-btn-primary"
      >
        <i class="ph ph-github-logo" aria-hidden="true"></i>
        github.com/vanduo-oss
      </a>
    </template>
  </VdModal>

  <!-- NPM Packages Modal -->
  <VdModal
    :open="activeModal === 'npm'"
    title="NPM Packages — @vanduo-oss"
    size="lg"
    @update:open="closeResourceModal"
    @close="closeResourceModal"
  >
    <p class="vd-text-sm vd-text-muted vd-mb-4">
      Install only the packages your application needs from the
      <strong>@vanduo-oss</strong> scope on npm. Every package ships ESM bundles
      and strict TypeScript declarations.
    </p>
    <div class="docs-resource-modal-list">
      <div
        v-for="pkg in ecosystemPackages"
        :key="pkg.name"
        class="docs-resource-pkg-card docs-landing-modal-pkg"
      >
        <div class="docs-resource-pkg-header">
          <span
            class="docs-resource-pkg-icon"
            :style="{ color: pkg.accent }"
            aria-hidden="true"
          >
            <i :class="`ph ${pkg.icon}`"></i>
          </span>
          <div class="docs-resource-pkg-title">
            <code>{{ pkg.name }}</code>
            <span class="vd-badge vd-badge-outlined">v{{ pkg.version }}</span>
          </div>
        </div>
        <p class="docs-resource-pkg-desc">{{ pkg.summary }}</p>
        <div class="docs-resource-pkg-install">
          <code>{{ pkg.install }}</code>
        </div>
        <div class="docs-resource-pkg-actions">
          <a
            :href="pkg.npmHref"
            target="_blank"
            rel="noopener"
            class="vd-btn vd-btn-primary vd-btn-sm"
          >
            <i class="ph ph-package" aria-hidden="true"></i> View on npm
          </a>
          <RouterLink
            :to="pkg.docsRoute"
            class="vd-btn vd-btn-outline vd-btn-sm"
            @click="closeResourceModal"
          >
            {{ pkg.docsLabel }}
          </RouterLink>
        </div>
      </div>
    </div>
    <template #footer>
      <button
        type="button"
        class="vd-btn vd-btn-outline"
        @click="closeResourceModal"
      >
        Close
      </button>
      <a
        href="https://www.npmjs.com/org/vanduo-oss"
        target="_blank"
        rel="noopener"
        class="vd-btn vd-btn-primary"
      >
        <i class="ph ph-arrow-square-out" aria-hidden="true"></i>
        npmjs.com/org/vanduo-oss
      </a>
    </template>
  </VdModal>

  <!-- License Modal -->
  <VdModal
    :open="activeModal === 'license'"
    title="MIT License — @vanduo-oss"
    size="lg"
    @update:open="closeResourceModal"
    @close="closeResourceModal"
  >
    <p class="vd-text-sm vd-text-muted vd-mb-4">
      All three packages in the vd3 ecosystem are released under the permissive
      <strong>MIT License</strong>. You are free to use, copy, modify, merge,
      publish, and distribute them in personal and commercial projects, provided
      the copyright and license notice are preserved.
    </p>
    <div class="docs-resource-modal-list">
      <div
        v-for="pkg in ecosystemPackages"
        :key="pkg.name"
        class="docs-resource-pkg-card docs-landing-modal-pkg"
      >
        <div class="docs-resource-pkg-header">
          <span
            class="docs-resource-pkg-icon"
            :style="{ color: pkg.accent }"
            aria-hidden="true"
          >
            <i :class="`ph ${pkg.icon}`"></i>
          </span>
          <div class="docs-resource-pkg-title">
            <code>{{ pkg.name }}</code>
            <span class="vd-badge vd-badge-success">MIT</span>
          </div>
        </div>
        <p class="docs-resource-pkg-desc">{{ pkg.summary }}</p>
        <div class="docs-resource-pkg-actions">
          <a
            :href="pkg.licenseHref"
            target="_blank"
            rel="noopener"
            class="vd-btn vd-btn-primary vd-btn-sm"
          >
            <i class="ph ph-scales" aria-hidden="true"></i> Read LICENSE
          </a>
          <a
            :href="pkg.githubHref"
            target="_blank"
            rel="noopener"
            class="vd-btn vd-btn-outline vd-btn-sm"
          >
            <i class="ph ph-github-logo" aria-hidden="true"></i> Repository
          </a>
        </div>
      </div>
    </div>
    <template #footer>
      <button
        type="button"
        class="vd-btn vd-btn-outline"
        @click="closeResourceModal"
      >
        Close
      </button>
      <a
        href="https://github.com/vanduo-oss"
        target="_blank"
        rel="noopener"
        class="vd-btn vd-btn-primary"
      >
        <i class="ph ph-github-logo" aria-hidden="true"></i>
        vanduo-oss Organization
      </a>
    </template>
  </VdModal>
</template>
