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
    desc: "Explore the building blocks of Vanduo Framework.",
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
    meta: { icon: "ph-book-bookmark", text: "18 guided walkthroughs" },
  },
  {
    to: "/changelog",
    linkClass: "docs-landing-link-changelog",
    cardClass: "docs-card-changelog",
    icon: "ph-clock-counter-clockwise",
    title: "Changelog",
    desc: "See what's new in Vanduo and track each release update.",
    highlights: [
      { icon: "ph-sparkle", text: "v1.4.4 theme switcher menu UX" },
      { icon: "ph-git-branch", text: "Migration notes for each major release" },
    ],
    miniIcons: [
      { title: "Releases", icon: "ph-tag" },
      { title: "Breaking changes", icon: "ph-warning-circle" },
      { title: "Roadmap", icon: "ph-map-trifold" },
    ],
    tags: ["Releases", "Tokens", "Lifecycle"],
    meta: { icon: "ph-calendar-blank", text: "Latest: v1.4.4" },
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
          Explore Vanduo Documentation, Guides and Changelog
        </p>
        <span
          id="docs-component-count"
          class="vd-badge vd-badge-outlined"
          style="
            margin-top: 0.75rem;
            font-size: 0.85rem;
            padding: 0.4rem 0.8rem;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            color: var(--vd-color-primary);
            background-color: rgba(var(--vd-color-primary-rgb), 0.1);
            border-color: rgba(var(--vd-color-primary-rgb), 0.3);
          "
        >
          <i class="ph ph-cube"></i> <span>47+</span> components
        </span>
        <p
          class="docs-landing-version"
          style="
            margin-top: 0.85rem;
            font-size: 0.75rem;
            letter-spacing: 0.03em;
            color: var(--vd-text-muted);
          "
        >
          Documentation v{{ docsVersion }}
        </p>
      </div>
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
    </div>
  </section>
</template>
