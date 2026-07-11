<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useTimeline } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useTimeline(root);

interface Item {
  date?: string;
  title: string;
  text: string;
  marker?: "" | "success" | "warning" | "danger";
  icon?: string;
}

const basicItems: Item[] = [
  {
    date: "March 2026",
    title: "Project Launched",
    text: "Initial release with core components, grid system, and theme engine.",
    marker: "success",
  },
  {
    date: "February 2026",
    title: "Beta Testing",
    text: "Community feedback collected, accessibility audit completed, benchmarks run.",
  },
  {
    date: "January 2026",
    title: "Design Phase",
    text: "Design tokens defined, Figma components created, docs site scaffolded.",
  },
  {
    date: "December 2025",
    title: "Concept & Planning",
    text: "Requirements gathered, architecture decided, technology stack finalized.",
  },
];

const colorItems: Item[] = [
  {
    title: "Build Passed",
    text: "All 142 tests passed. Bundle size within budget.",
    marker: "success",
    icon: "check",
  },
  {
    title: "Deprecation Notice",
    text: "The .vd-card-flat class will be removed in v3.0. Migrate to .vd-card-outlined.",
    marker: "warning",
    icon: "warning",
  },
  {
    title: "Deploy Failed",
    text: "CDN purge timed out. Rollback initiated automatically.",
    marker: "danger",
    icon: "x",
  },
];

const altItems: Item[] = [
  {
    date: "09:00",
    title: "Morning Standup",
    text: "Team synced on sprint goals and blockers for the day.",
    marker: "success",
  },
  {
    date: "11:30",
    title: "Code Review",
    text: "Reviewed pull requests for the new grid system and utilities.",
  },
  {
    date: "14:00",
    title: "Design Sync",
    text: "Discussed token naming conventions and dark-mode adjustments.",
    marker: "warning",
  },
  {
    date: "16:30",
    title: "Ship It",
    text: "Merged, tagged, and deployed the release to production.",
    marker: "success",
  },
];

const playbackItems: Item[] = [
  {
    date: "Step 1",
    title: "Clone & install",
    text: "Pull the repo and install dependencies with pnpm.",
    marker: "success",
  },
  {
    date: "Step 2",
    title: "Run the dev server",
    text: "Start Vite and open the docs locally.",
    marker: "",
  },
  {
    date: "Step 3",
    title: "Make a change",
    text: "Edit a component and watch HMR update instantly.",
    marker: "",
  },
  {
    date: "Step 4",
    title: "Run the gates",
    text: "Typecheck, lint, unit, and e2e all green.",
    marker: "warning",
  },
  {
    date: "Step 5",
    title: "Open a PR",
    text: "Push the branch and let the review bot do its pass.",
    marker: "success",
  },
];

// Color classes (vd-timeline-success/-warning/-danger) go on the ITEM; the CSS
// rule is `.vd-timeline-item.vd-timeline-success .vd-timeline-marker { … }`.
const colorCls = (m?: string): string => (m ? `vd-timeline-${m}` : "");

const vanillaWiring = `// Auto-wired on init for every .vd-timeline-animated.
VanduoTimeline.init();

// After replacing a timeline subtree:
Vanduo.reinit('timeline', root);`;

const vue3Wiring = `import { ref } from 'vue';
import { useTimeline } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useTimeline(root);   // wires every .vd-timeline-animated inside root`;

const basicHtml = `<div class="vd-timeline vd-timeline-animated">
  <!-- Color goes on the item: vd-timeline-success / -warning / -danger -->
  <div class="vd-timeline-item vd-timeline-success">
    <div class="vd-timeline-marker"></div>
    <div class="vd-timeline-content">
      <span class="vd-timeline-date">March 2026</span>
      <h4 class="vd-timeline-title">Project Launched</h4>
      <p class="vd-timeline-text">Initial release of the framework.</p>
    </div>
  </div>
  <!-- …more .vd-timeline-item children… -->
</div>`;

const playbackHtml = `<!-- Toolbar + list share the same direct parent -->
<div class="vd-btn-group" role="toolbar" aria-label="Timeline playback">
  <button class="vd-btn vd-btn-outline-secondary vd-btn-sm" data-vd-timeline-prev>Back</button>
  <button class="vd-btn vd-btn-outline-secondary vd-btn-sm" data-vd-timeline-next>Next</button>
  <button class="vd-btn vd-btn-outline-secondary vd-btn-sm" data-vd-timeline-play>Play</button>
  <button class="vd-btn vd-btn-outline-secondary vd-btn-sm" data-vd-timeline-pause disabled>Pause</button>
</div>
<div class="vd-timeline vd-timeline-animated vd-timeline-playback">
  …items…
</div>`;

const apiRows: [string, string][] = [
  [".vd-timeline", "Container. Vertical spine of dated entries."],
  [".vd-timeline-animated", "Opt into staggered scroll-reveal (auto-init)."],
  [".vd-timeline-alternating", "Items alternate left/right on desktop."],
  [".vd-timeline-playback", "Step reveals from buttons instead of scroll."],
  [".vd-timeline-item", "A single entry (marker + content)."],
  [
    ".vd-timeline-marker",
    "The dot on the spine. +-lg, +-success/-warning/-danger.",
  ],
  [".vd-timeline-content", "Card body: date + title + text."],
  [
    "data-vd-timeline-prev / -next / -play / -pause",
    "Playback controls (in the timeline's direct parent).",
  ],
];
</script>

<template>
  <section id="timeline" ref="root">
    <h5 class="demo-title"><i class="ph ph-clock-countdown"></i>Timeline</h5>
    <p class="vd-mb-8">
      A vertical (or alternating) spine of dated entries. Markers, icons, and
      entry cards are independently styleable. Add
      <code>.vd-timeline-animated</code> for staggered scroll-reveal, or
      <code>.vd-timeline-playback</code> to drive reveals from buttons.
    </p>

    <!-- Basic + Color -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-list-numbers"></i> Basic Timeline</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-timeline vd-timeline-animated">
              <div
                v-for="item in basicItems"
                :key="item.title"
                class="vd-timeline-item"
                :class="colorCls(item.marker)"
              >
                <div class="vd-timeline-marker"></div>
                <div class="vd-timeline-content">
                  <span class="vd-timeline-date">{{ item.date }}</span>
                  <h4 class="vd-timeline-title">{{ item.title }}</h4>
                  <p class="vd-timeline-text">{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="basicHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-palette"></i> Color Variants</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-timeline vd-timeline-animated">
              <div
                v-for="item in colorItems"
                :key="item.title"
                class="vd-timeline-item"
                :class="colorCls(item.marker)"
              >
                <div class="vd-timeline-marker vd-timeline-marker-lg">
                  <i class="ph" :class="`ph-${item.icon}`"></i>
                </div>
                <div class="vd-timeline-content">
                  <h4 class="vd-timeline-title">{{ item.title }}</h4>
                  <p class="vd-timeline-text">{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alternating -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-arrows-left-right"></i> Alternating Timeline
            </h6>
          </div>
          <div class="vd-card-body">
            <div
              class="vd-timeline vd-timeline-alternating vd-timeline-animated"
            >
              <div
                v-for="item in altItems"
                :key="item.title"
                class="vd-timeline-item"
                :class="colorCls(item.marker)"
              >
                <div class="vd-timeline-marker"></div>
                <div class="vd-timeline-content">
                  <span class="vd-timeline-date">{{ item.date }}</span>
                  <h4 class="vd-timeline-title">{{ item.title }}</h4>
                  <p class="vd-timeline-text">{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Playback -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-play-circle"></i> Playback Timeline</h6>
          </div>
          <!-- Toolbar + list MUST share this direct parent (.vd-card-body) -->
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Step through reveals with the controls — no scrolling required.
            </p>
            <div
              class="vd-btn-group vd-mb-4"
              role="toolbar"
              aria-label="Timeline playback"
            >
              <button
                type="button"
                class="vd-btn vd-btn-outline-secondary vd-btn-sm"
                data-vd-timeline-prev
                aria-label="Previous event"
              >
                <i class="ph ph-skip-back" aria-hidden="true"></i> Back
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline-secondary vd-btn-sm"
                data-vd-timeline-next
                aria-label="Next event"
              >
                Next <i class="ph ph-skip-forward" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline-secondary vd-btn-sm"
                data-vd-timeline-play
                aria-label="Play timeline"
              >
                <i class="ph ph-play" aria-hidden="true"></i> Play
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline-secondary vd-btn-sm"
                data-vd-timeline-pause
                aria-label="Pause timeline"
                disabled
              >
                <i class="ph ph-pause" aria-hidden="true"></i> Pause
              </button>
            </div>
            <div
              class="vd-timeline vd-timeline-alternating vd-timeline-animated vd-timeline-playback"
            >
              <div
                v-for="item in playbackItems"
                :key="item.title"
                class="vd-timeline-item"
                :class="colorCls(item.marker)"
              >
                <div class="vd-timeline-marker"></div>
                <div class="vd-timeline-content">
                  <span class="vd-timeline-date">{{ item.date }}</span>
                  <h4 class="vd-timeline-title">{{ item.title }}</h4>
                  <p class="vd-timeline-text">{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="playbackHtml" />
      </div>
    </div>

    <!-- Engine wiring -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-code"></i> Engine wiring</h6>
          </div>
          <div class="vd-card-body">
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :js="vue3Wiring" /></template>
              <template #vanilla
                ><DocCodeSnippet :js="vanillaWiring"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-list-dashes"></i> API Reference</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class / Attribute</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in apiRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-wheelchair"></i> Accessibility</h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>
                Static timelines need no JS; animation is purely additive and
                respects <code>prefers-reduced-motion</code>.
              </li>
              <li>
                Playback controls are real <code>&lt;button&gt;</code> elements
                with <code>aria-label</code>s and a
                <code>role="toolbar"</code> wrapper.
              </li>
              <li>
                Markers are decorative; the date/title/text carry the meaning.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
