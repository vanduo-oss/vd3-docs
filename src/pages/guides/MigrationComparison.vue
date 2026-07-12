<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

const nextLinks = [
  {
    to: "/guides/framework-integration",
    icon: "ph-download",
    title: "Installation & integration",
    desc: "Install vd3 and wire the VanduoVue plugin from scratch.",
    badge: "Guide",
  },
  {
    to: "/guides/runtime-architecture",
    icon: "ph-stack",
    title: "vd3 architecture",
    desc: "Tokens → generated CSS → typed components & composables.",
    badge: "Guide",
  },
  {
    to: "/guides/vanduo-ecosystem",
    icon: "ph-planet",
    title: "The vd3 line",
    desc: "The three repositories that make up vd3.",
    badge: "Guide",
  },
  {
    to: "/guides/css-variables",
    icon: "ph-sliders",
    title: "CSS variables & theming",
    desc: "The shared --vd-* token layer you keep overriding.",
    badge: "Guide",
  },
];

// Old @vanduo-oss line (vanduo v2) → the vd3 line. The reader copies the
// right-hand column; the left names what they had before.
const packageMap: [string, string][] = [
  ["@vanduo-oss/vue", "@vanduo-oss/vd3"],
  ["@vanduo-oss/framework/css", "@vanduo-oss/vd3/css"],
  ["@vanduo-oss/core (tokens)", "@vanduo-oss/vd3/css/core + /tokens.json"],
  ["@vanduo-oss/charts", "@vanduo-oss/vd3-cbun/charts"],
  ["@vanduo-oss/flowchart", "@vanduo-oss/vd3-cbun/flowchart"],
  ["@vanduo-oss/hex-grid", "@vanduo-oss/vd3-cbun/hex-grid"],
  ["@vanduo-oss/music-player", "@vanduo-oss/vd3-cbun/music-player"],
];

// The twelve delegating/DOM-scan composables that were restored in vd3.
const composables = [
  "useDropdown",
  "useDraggable",
  "useImageBox",
  "useRipple",
  "useSpotlight",
  "useTimeline",
  "useExpandingCards",
  "useFlow",
  "useTabs",
  "useValidate",
  "useSearch",
  "usePopover",
];

const mainBefore = `// main.ts — vanduo v2 (the @vanduo-oss/vue line)
import { createApp } from 'vue';
import { VanduoVue } from '@vanduo-oss/vue';
import '@vanduo-oss/vue/css';
import App from './App.vue';

createApp(App).use(VanduoVue, { themeDefaults }).mount('#app');`;

const mainAfter = `// main.ts — vd3 (only the two import sources change)
import { createApp } from 'vue';
import { VanduoVue } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';
import App from './App.vue';

createApp(App).use(VanduoVue, { themeDefaults }).mount('#app');`;

const composablesBefore = `// vanduo v2 — these composables were thin shims that delegated to the
// zero-build global runtime, which the app had to bootstrap once at startup.
import { useDropdown, useTabs } from '@vanduo-oss/vue';

const root = ref<HTMLElement | null>(null);
useDropdown(root);
useTabs(root);`;

const composablesAfter = `// vd3 — same call signature; only the import source changes. The composables
// are now self-contained Vue, so there is nothing to load or init after mount.
import { useDropdown, useTabs } from '@vanduo-oss/vd3';

const root = ref<HTMLElement | null>(null);
useDropdown(root); // still useX(rootRef) — existing call sites port unchanged
useTabs(root);     // several now also return an optional controller (a superset)`;
</script>

<template>
  <section id="migration-comparison">
    <h5 class="demo-title">
      <i class="ph ph-arrows-down-up"></i>Migrating from vanduo v2 to vd3
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      <strong>vd3</strong> is the Vue-3-only successor to the earlier
      <strong>vanduo v2</strong> line — the three-package split of
      <code>@vanduo-oss/core</code> (tokens) +
      <code>@vanduo-oss/framework</code> (CSS/JS) +
      <code>@vanduo-oss/vue</code> (components). The migration is mostly
      mechanical: the <code>vd-*</code> classes, the <code>Vd*</code> component
      names, and the composable call signatures all carry over. What changes is
      <em>where you import from</em>.
    </p>

    <!-- Package map -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-arrows-left-right"></i> Package map</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-4">
              The Vue components, composables, tokens, and CSS all collapse into
              a single <code>@vanduo-oss/vd3</code> package; the four canvas
              add-ons move into the <code>@vanduo-oss/vd3-cbun</code> bundle,
              each on its own subpath.
            </p>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>vanduo v2 (old)</th>
                    <th>vd3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in packageMap" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>
                      <code>{{ row[1] }}</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              The old <code>/vue</code> subpath drops away — where you wrote
              <code>@vanduo-oss/charts/vue</code> you now import from
              <code>@vanduo-oss/vd3-cbun/charts</code>. Secondary subpaths
              follow the same rule (<code>.../hex-grid/hex-math</code>,
              <code>.../charts/css</code>).
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- One line per app: the plugin import swap -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-plug"></i> One line per app: the plugin swap
            </h6>
          </div>
          <div class="vd-card-body">
            <p>
              The <code>VanduoVue</code> plugin identifier and its
              <code>themeDefaults</code> option are unchanged — only the import
              source moves. In your entry file, retarget the plugin import and
              the stylesheet to <code>@vanduo-oss/vd3</code>:
            </p>
            <div class="vd-row vd-mt-4">
              <div class="vd-col-12 vd-col-md-6">
                <p class="vd-text-sm vd-text-muted vd-mb-2">Before (v2)</p>
                <DocCodeSnippet :js="mainBefore" :default-open="true" />
              </div>
              <div class="vd-col-12 vd-col-md-6">
                <p class="vd-text-sm vd-text-muted vd-mb-2">After (vd3)</p>
                <DocCodeSnippet :js="mainAfter" :default-open="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Composable API notes -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-function"></i> Composable API</h6>
          </div>
          <div class="vd-card-body">
            <p>
              vd3 restores the twelve delegating / DOM-scan composables as
              first-class Vue composables. Their <code>useX(rootRef)</code> call
              signature is unchanged, so existing call sites port over untouched
              — swap the import from the old package to
              <code>@vanduo-oss/vd3</code> and you are done:
            </p>
            <p class="composable-list vd-mt-3 vd-mb-4">
              <code v-for="name in composables" :key="name">{{ name }}</code>
            </p>
            <div class="vd-row">
              <div class="vd-col-12 vd-col-md-6">
                <p class="vd-text-sm vd-text-muted vd-mb-2">Before (v2)</p>
                <DocCodeSnippet :js="composablesBefore" :default-open="true" />
              </div>
              <div class="vd-col-12 vd-col-md-6">
                <p class="vd-text-sm vd-text-muted vd-mb-2">After (vd3)</p>
                <DocCodeSnippet :js="composablesAfter" :default-open="true" />
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-4">
              The big change is under the hood: in v2 these composables
              delegated to the framework's zero-build global runtime, which an
              app bootstrapped once at startup. vd3 rewrites them as
              self-contained Vue — that runtime, and the startup call it needed,
              are gone, so there is nothing to load or initialise after mount.
              Several composables now also return an optional controller, which
              is a backward-compatible superset: call sites that ignored the old
              <code>void</code> result are unaffected.
            </p>
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              vd3 also drops <strong>Pinia</strong> — its sole peer dependency
              is <code>vue&nbsp;&gt;=3.3</code>. The v2 theme store is now the
              reactive <code>useThemePreference()</code> singleton, and
              <code>useToast()</code> / <code>useToastStore()</code> stay
              available as plain reactive singletons rather than a
              <code>defineStore</code>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Namespace warning -->
    <div class="vd-card demo-card migration-warn vd-mb-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-warning"></i> Keep exactly one line per app</h6>
      </div>
      <div class="vd-card-body">
        <p>
          vd3 and the old <code>@vanduo-oss</code> line render the same
          <code>vd-*</code> classes and read the same <code>--vd-*</code> CSS
          variables. <strong>Do not install both in one app.</strong> If both
          are present their stylesheets double-define the same tokens and
          selectors, and the two will clash unpredictably.
        </p>
        <p class="vd-mb-0">
          Migrate the whole app in a single pass — remove the old packages as
          you add <code>@vanduo-oss/vd3</code> — rather than mixing v2 and vd3
          imports side by side.
        </p>
      </div>
    </div>

    <GuideLinkCards
      icon="ph-compass"
      title="Where to go next"
      :links="nextLinks"
    />
  </section>
</template>

<style scoped>
.composable-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.migration-warn {
  border-color: rgba(var(--vd-color-warning-rgb), 0.45);
  box-shadow: 0 0 0 1px rgba(var(--vd-color-warning-rgb), 0.15);
}
</style>
