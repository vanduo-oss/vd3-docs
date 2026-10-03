<script setup lang="ts">
import { RouterLink } from "vue-router";
import { VD3_COMPONENT_EXPORTS } from "@/constants/vd3Catalog";
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
    to: "/guides/getting-started",
    linkClass: "docs-landing-link-guides",
    cardClass: "docs-card-guides",
    icon: "ph-compass",
    title: "Guides",
    desc: "Step-by-step tutorials to master vd3.",
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
    desc: "See what's new in vd3 and track each release update.",
    highlights: [
      {
        icon: "ph-sparkle",
        text: "vd3 1.7.4, charts 1.1.1, flowchart 1.4.0 — latest packages",
      },
      { icon: "ph-git-branch", text: "Release notes for @vanduo-oss/vd3" },
    ],
    miniIcons: [
      { title: "Releases", icon: "ph-tag" },
      { title: "Breaking changes", icon: "ph-warning-circle" },
      { title: "Roadmap", icon: "ph-map-trifold" },
    ],
    tags: ["Releases", "Tokens", "Lifecycle"],
    meta: {
      icon: "ph-calendar-blank",
      text: "Latest: vd3 1.7.4 · charts 1.1.1 · flowchart 1.4.0",
    },
  },
];

interface ResourceCard {
  label: string;
  to?: string;
  href?: string;
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
    desc: "The project and how vd3 is organized.",
    highlights: [
      { icon: "ph-users", text: "Who builds the framework" },
      { icon: "ph-tree-structure", text: "How the project is organized" },
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
    href: "https://github.com/vanduo-oss/vd3",
    linkClass: "docs-landing-link-github",
    cardClass: "docs-card-github",
    icon: "ph-github-logo",
    desc: "Source, issues, and releases.",
    highlights: [
      { icon: "ph-code", text: "vanduo-oss/vd3 repository" },
      { icon: "ph-git-pull-request", text: "Issues and pull requests" },
    ],
    miniIcons: [
      { title: "Source", icon: "ph-code" },
      { title: "Issues", icon: "ph-bug" },
      { title: "Releases", icon: "ph-tag" },
    ],
    tags: ["Source", "Issues", "Releases"],
    meta: { icon: "ph-arrow-square-out", text: "Opens GitHub" },
  },
  {
    label: "NPM",
    href: "https://www.npmjs.com/package/@vanduo-oss/vd3",
    linkClass: "docs-landing-link-npm",
    cardClass: "docs-card-npm",
    icon: "ph-package",
    desc: "The published @vanduo-oss/vd3 package.",
    highlights: [
      { icon: "ph-download-simple", text: "Install from the npm registry" },
      { icon: "ph-package", text: "Charts and flowchart ship separately" },
    ],
    miniIcons: [
      { title: "vd3", icon: "ph-cube" },
      { title: "Charts", icon: "ph-chart-bar" },
      { title: "Flowchart", icon: "ph-flow-arrow" },
    ],
    tags: ["vd3", "Charts", "Flowchart"],
    meta: { icon: "ph-arrow-square-out", text: "Opens npm" },
  },
  {
    label: "License",
    href: "https://github.com/vanduo-oss/vd3/blob/main/LICENSE",
    linkClass: "docs-landing-link-license",
    cardClass: "docs-card-license",
    icon: "ph-scales",
    desc: "MIT license for the framework.",
    highlights: [
      { icon: "ph-check-circle", text: "Use, modify, and distribute" },
      { icon: "ph-file-text", text: "Keep the license notice" },
    ],
    miniIcons: [
      { title: "MIT", icon: "ph-scales" },
      { title: "Notice", icon: "ph-file-text" },
    ],
    tags: ["MIT", "Open source"],
    meta: { icon: "ph-arrow-square-out", text: "Opens the license file" },
  },
];
</script>

<template>
  <section id="docs-landing" class="about-section" style="padding-bottom: 6rem">
    <!-- Page Header -->
    <div class="about-header">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-book-open-text"></i> Documentation
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Explore vd3 Documentation, Guides and Changelog
        </p>
      </div>
    </div>

    <div class="vd-container-responsive docs-landing-meta">
      <span
        id="docs-component-count"
        class="vd-badge vd-badge-outlined docs-landing-meta-badge"
      >
        <i class="ph ph-cube"></i> <span>{{ VD3_COMPONENT_EXPORTS }}</span>
        components
      </span>
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
                : { href: card.href, target: '_blank', rel: 'noopener' }
            "
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
</template>
