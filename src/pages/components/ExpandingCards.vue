<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useExpandingCards } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useExpandingCards(root);

interface Card {
  title: string;
  subtitle: string;
  icon: string;
}
interface PhotoCard extends Card {
  img: string;
}
interface ColorCard extends Card {
  color: string;
}

const photoCards: PhotoCard[] = [
  {
    img: "/images/expanding/0.jpg",
    icon: "waves",
    title: "Quiet cove",
    subtitle: "Dock and lily pads",
  },
  {
    img: "/images/expanding/1.jpg",
    icon: "sun-horizon",
    title: "Lakeside glow",
    subtitle: "Sun through the trees",
  },
  {
    img: "/images/expanding/2.jpg",
    icon: "tree-evergreen",
    title: "Sunlit forest",
    subtitle: "Rays through the canopy",
  },
  {
    img: "/images/expanding/3.jpg",
    icon: "leaf",
    title: "Forest floor",
    subtitle: "Moss and wild strawberry",
  },
  {
    img: "/images/expanding/4.jpg",
    icon: "plant",
    title: "Reindeer lichen",
    subtitle: "Pale coral on pine needles",
  },
];

const colorCards: ColorCard[] = [
  {
    color: "primary",
    icon: "paint-brush",
    title: "Design",
    subtitle: "Tokens & themes",
  },
  {
    color: "success",
    icon: "shield-check",
    title: "Quality",
    subtitle: "A11y & tests",
  },
  {
    color: "warning",
    icon: "rocket-launch",
    title: "Ship",
    subtitle: "Release cadence",
  },
  {
    color: "info",
    icon: "book-open-text",
    title: "Docs",
    subtitle: "Guides & API",
  },
  { color: "error", icon: "bug", title: "Issues", subtitle: "Triage & fixes" },
];

const vanillaWiring = `// Auto-wired on init for every [data-vd-expanding-cards].
VanduoExpandingCards.init();`;

const vue3Wiring = `import { ref } from 'vue';
import { useExpandingCards } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useExpandingCards(root);   // wires every [data-vd-expanding-cards] inside root`;

const basicHtml = `<div class="vd-expanding-cards" data-vd-expanding-cards>
  <div class="vd-expanding-card is-active"
       style="--vd-expanding-card-bg: url(/images/expanding/0.jpg);">
    <div class="vd-expanding-card-shadow"></div>
    <div class="vd-expanding-card-label">
      <div class="vd-expanding-card-icon"><i class="ph ph-waves"></i></div>
      <div class="vd-expanding-card-info">
        <div class="vd-expanding-card-title">Quiet cove</div>
        <div class="vd-expanding-card-subtitle">Dock and lily pads</div>
      </div>
    </div>
  </div>
  <!-- …more .vd-expanding-card children… -->
</div>`;

const apiRows: [string, string][] = [
  [
    ".vd-expanding-cards",
    "Container. Add data-vd-expanding-cards to enable it.",
  ],
  [".vd-expanding-card", "A panel. The active one expands; others slim down."],
  [".vd-expanding-card.is-active", "Sets the initially expanded card."],
  ["--vd-expanding-card-bg", "Per-card background (url(...) or a color)."],
  [
    "--vd-expanding-card-bg-default",
    "Icon-circle background for solid-color cards.",
  ],
  [".vd-expanding-card-label", "Overlay holding the icon + title + subtitle."],
];
</script>

<template>
  <section id="expanding-cards" ref="root">
    <h5 class="demo-title"><i class="ph ph-cards-three"></i>Expanding Cards</h5>
    <p class="vd-mb-8">
      A horizontal strip of panels that expand on click/focus — one stays wide
      while the others stay slim. Use <kbd>←</kbd> <kbd>→</kbd> when a panel is
      focused. Great for featured galleries and showcases where you want one
      focal item at a time.
    </p>

    <!-- Photo strip -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Photo strip</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Uses a background image on each
              <code>.vd-expanding-card</code> via
              <code>--vd-expanding-card-bg</code>.
            </p>
            <div class="expanding-cards-wrap">
              <div class="vd-expanding-cards" data-vd-expanding-cards>
                <div
                  v-for="(c, i) in photoCards"
                  :key="c.title"
                  class="vd-expanding-card"
                  :class="{ 'is-active': i === 0 }"
                  :style="{ '--vd-expanding-card-bg': `url(${c.img})` }"
                >
                  <div class="vd-expanding-card-shadow"></div>
                  <div class="vd-expanding-card-label">
                    <div class="vd-expanding-card-icon">
                      <i class="ph" :class="`ph-${c.icon}`"></i>
                    </div>
                    <div class="vd-expanding-card-info">
                      <div class="vd-expanding-card-title">{{ c.title }}</div>
                      <div class="vd-expanding-card-subtitle">
                        {{ c.subtitle }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="basicHtml" />
      </div>
    </div>

    <!-- Solid brand colors -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Solid brand colors</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Set <code>--vd-expanding-card-bg</code> to a flat color (and
              <code>--vd-expanding-card-bg-default</code> so the icon circle
              matches).
            </p>
            <div class="expanding-cards-wrap">
              <div class="vd-expanding-cards" data-vd-expanding-cards>
                <div
                  v-for="(c, i) in colorCards"
                  :key="c.title"
                  class="vd-expanding-card"
                  :class="{ 'is-active': i === 0 }"
                  :style="{
                    '--vd-expanding-card-bg': `var(--vd-color-${c.color})`,
                    '--vd-expanding-card-bg-default': `var(--vd-color-${c.color})`,
                  }"
                >
                  <div class="vd-expanding-card-shadow"></div>
                  <div class="vd-expanding-card-label">
                    <div class="vd-expanding-card-icon">
                      <i class="ph" :class="`ph-${c.icon}`"></i>
                    </div>
                    <div class="vd-expanding-card-info">
                      <div class="vd-expanding-card-title">{{ c.title }}</div>
                      <div class="vd-expanding-card-subtitle">
                        {{ c.subtitle }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Attribution -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-alert vd-alert-info">
          <i class="ph ph-info"></i>
          <div>
            <strong>Attribution</strong>
            <p class="vd-mb-0 vd-mt-1">
              Interaction and layout are adapted from the MIT-licensed CodePen
              <a
                href="https://codepen.io/z-/pen/OBPJKK"
                target="_blank"
                rel="noopener noreferrer"
                >“Expanding flex cards”</a
              >
              by Zed Dash. Vanduo adds prefixed class names, documentation,
              optional keyboard navigation, and reduced-motion handling. Photo
              strip images are Vanduo demo assets.
            </p>
          </div>
        </div>
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
                    <th>Class / Variable</th>
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
                Each card is focusable; arrow keys move between cards and
                <kbd>Enter</kbd>/<kbd>Space</kbd> expand the focused card.
              </li>
              <li>
                The active card carries <code>aria-pressed="true"</code>; the
                others <code>aria-pressed="false"</code>.
              </li>
              <li>
                Background photos are decorative — the title/subtitle provide
                the accessible label.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expanding-cards-wrap {
  overflow-x: auto;
  padding-bottom: 0.5rem;
}
.expanding-cards-wrap .vd-expanding-cards {
  margin-inline: auto;
}
</style>
