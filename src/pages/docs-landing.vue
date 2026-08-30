<script setup lang="ts">
import { RouterLink } from "vue-router";

// Injected at build time from package.json (see vite.config.ts).
const docsVersion = __APP_VERSION__;

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
    desc: "Explore the building blocks of Vanduo UI.",
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
    meta: { icon: "ph-files", text: "47+ reference pages" },
  },
  {
    to: "/guides/getting-started",
    linkClass: "docs-landing-link-guides",
    cardClass: "docs-card-guides",
    icon: "ph-compass",
    title: "Guides",
    desc: "Step-by-step tutorials to master Vanduo.",
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
    meta: { icon: "ph-book-bookmark", text: "14 guided walkthroughs" },
  },
  {
    to: "/changelog",
    linkClass: "docs-landing-link-changelog",
    cardClass: "docs-card-changelog",
    icon: "ph-clock-counter-clockwise",
    title: "Changelog",
    desc: "See what's new in Vanduo and track each release update.",
    highlights: [
      {
        icon: "ph-sparkle",
        text: "vd3 1.7.0 — Global search palette & Oola dock",
      },
      { icon: "ph-git-branch", text: "Release notes for @vanduo-oss/vd3" },
    ],
    miniIcons: [
      { title: "Releases", icon: "ph-tag" },
      { title: "Breaking changes", icon: "ph-warning-circle" },
      { title: "Roadmap", icon: "ph-map-trifold" },
    ],
    tags: ["Releases", "Tokens", "Lifecycle"],
    meta: { icon: "ph-calendar-blank", text: "Latest: vd3 1.7.0" },
  },
];

const resources = [
  { label: "About", to: "/about" as const },
  {
    label: "GitHub",
    href: "https://github.com/vanduo-oss/vd3",
  },
  {
    label: "NPM",
    href: "https://www.npmjs.com/package/@vanduo-oss/vd3",
  },
  {
    label: "License",
    href: "https://github.com/vanduo-oss/vd3/blob/main/LICENSE",
  },
] as const;
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
          Explore Vanduo Documentation, Guides and Changelog
        </p>
      </div>
    </div>

    <div class="vd-container-responsive docs-landing-meta">
      <span
        id="docs-component-count"
        class="vd-badge vd-badge-outlined docs-landing-meta-badge"
      >
        <i class="ph ph-cube"></i> <span>47+</span> components
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
        <ul class="docs-landing-resources-list">
          <li v-for="item in resources" :key="item.label">
            <RouterLink v-if="'to' in item" :to="item.to">{{
              item.label
            }}</RouterLink>
            <a v-else :href="item.href" target="_blank" rel="noopener">{{
              item.label
            }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>
