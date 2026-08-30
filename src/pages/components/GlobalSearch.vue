<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";
import {
  VdGlobalSearch,
  type GlobalSearchAdapter,
  type GlobalSearchHit,
} from "@vanduo-oss/vd3";

const demoHits: GlobalSearchHit[] = [
  {
    id: "button",
    title: "Button",
    route: "/components/button",
    icon: "cursor-click",
    category: "Core",
    categoryPath: "Components › Core",
  },
  {
    id: "modal",
    title: "Modal",
    route: "/components/modal",
    icon: "browser",
    category: "Overlay",
    categoryPath: "Components › Overlay",
  },
  {
    id: "toast",
    title: "Toast",
    route: "/components/toast",
    icon: "bell-ringing",
    category: "Feedback",
    categoryPath: "Components › Feedback",
  },
];

const adapter: GlobalSearchAdapter = {
  search: async (query) => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return demoHits.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q),
    );
  },
};

const lastSelect = ref("");

const propsApi: [string, string][] = [
  ["adapter", "Required GlobalSearchAdapter — async search(query, { ai })."],
  ["shortcut", "true | { key, slash } — Cmd/Ctrl+K and / (default both on)."],
  ["showAiToggle", "Show AI opt-in switch + disclaimer slot (default true)."],
  ["ai", "{ enabled?, defaultEnabled?, persistKey? } — AI preference."],
  ["progressMessage", "Footer status while semantic model loads."],
  ["placeholder / dialogLabel / inputLabel", "Copy and ARIA labels."],
  ["openEventName", "CustomEvent name to open (default vd:open-search)."],
];

const emitsApi: [string, string][] = [
  ["select", "User chose a hit (click or Enter)."],
  ["search", "Debounced search settled with query + hits."],
  ["update:aiEnabled", "AI toggle changed."],
  ["open / close", "Modal visibility."],
];

const composableApi: [string, string][] = [
  ["adapter", "Same GlobalSearchAdapter as the component."],
  ["minQueryLength / debounceMs", "Defaults 2 and 350."],
  ["shortcut", "Global keydown registration (onMounted)."],
  ["ai.persistKey", "localStorage key for { aiEnabled }."],
  ["groupBy", "Optional (hit) => categoryPath string."],
  ["open / close / move / setAiEnabled", "Modal control."],
  ["highlight(text)", "Returns safe HTML with <mark> for query."],
];

const cssVars: [string, string, string][] = [
  ["--vd-global-search-modal-max-width", "640px", "Palette width cap."],
  ["--vd-global-search-modal-top", "15vh", "Vertical offset on desktop."],
  ["--vd-global-search-glass-opacity", "0.9", "Modal glass fill."],
  ["--vd-global-search-glass-blur", "20px", "Backdrop blur strength."],
];

const guideLinks = [
  {
    to: "/components/doc-search",
    icon: "ph-magnifying-glass",
    title: "Doc Search",
    desc: "Inline combobox over caller-supplied docs — not site-wide.",
  },
  {
    to: "/guides/hybrid-search",
    icon: "ph-brain",
    title: "Hybrid search",
    desc: "Build the index and wire EmbeddingGemma with vdl-hybrid-search.",
  },
  {
    to: "/interactive/search",
    icon: "ph-plugs",
    title: "useSearch registry",
    desc: "Headless async source registry without UI.",
  },
];
</script>

<template>
  <section id="global-search">
    <h5 class="demo-title">
      <i class="ph ph-magnifying-glass"></i>Global search
    </h5>
    <p class="vd-mb-8">
      <strong>VdGlobalSearch</strong> is a site-wide command palette: glass
      overlay, grouped results, keyboard navigation, and an optional
      <strong>AI search</strong> toggle (off by default) with an informational
      disclaimer. Pass a <code>GlobalSearchAdapter</code> — the component stays
      engine-agnostic (HybridSearch, REST, or in-memory).
    </p>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h4>Live demo</h4></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Press <kbd>⌘K</kbd> or <kbd>/</kbd> (when focus is not in an
              input). AI toggle uses a demo adapter — no model download.
            </p>
            <VdGlobalSearch
              :adapter="adapter"
              :ai="{ defaultEnabled: false }"
              :show-ai-toggle="true"
              @select="(h) => (lastSelect = h.route)"
            />
            <p v-if="lastSelect" class="vd-mt-4 vd-text-sm">
              Last selection: <code>{{ lastSelect }}</code>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>Mechanics</h4></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Shortcut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd></td>
                  <td>Open palette</td>
                </tr>
                <tr>
                  <td><kbd>/</kbd></td>
                  <td>Open (when not typing in a field)</td>
                </tr>
                <tr>
                  <td><kbd>↑</kbd> <kbd>↓</kbd></td>
                  <td>Move selection (wraps)</td>
                </tr>
                <tr>
                  <td><kbd>↵</kbd></td>
                  <td>Select highlighted hit</td>
                </tr>
                <tr>
                  <td><kbd>esc</kbd></td>
                  <td>Close and clear query</td>
                </tr>
                <tr>
                  <td><code>vd:open-search</code></td>
                  <td>CustomEvent — e.g. dock brand</td>
                </tr>
              </tbody>
            </table>
            <p class="vd-mt-4 vd-text-sm">
              When co-mounting
              <RouterLink to="/components/doc-search">VdDocSearch</RouterLink>,
              set <code>:keyboard-shortcut="false"</code> on the inline combobox
              so only the global palette owns Cmd/Ctrl+K.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12 vd-col-lg-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>Props</h4></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in propsApi" :key="row[0]">
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
      <div class="vd-col-12 vd-col-lg-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>Emits &amp; slots</h4></div>
          <div class="vd-card-body">
            <table class="vd-table vd-mb-4">
              <thead>
                <tr>
                  <th>Emit</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in emitsApi" :key="row[0]">
                  <td>
                    <code>{{ row[0] }}</code>
                  </td>
                  <td>{{ row[1] }}</td>
                </tr>
              </tbody>
            </table>
            <p class="vd-text-sm">
              <code>#ai-notice</code> — override EU AI Act disclaimer copy.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>useGlobalSearch</h4></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Option / return</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in composableApi" :key="row[0]">
                  <td>
                    <code>{{ row[0] }}</code>
                  </td>
                  <td>{{ row[1] }}</td>
                </tr>
              </tbody>
            </table>
            <DocCodeSnippet
              class="vd-mt-4"
              :vue="`import { useGlobalSearch } from '@vanduo-oss/vd3';

const search = useGlobalSearch({
  adapter: myAdapter,
  ai: { persistKey: 'my-app-search', defaultEnabled: false },
  onSelect: (hit) => router.push(hit.route),
});`"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>CSS custom properties</h4></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Default</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in cssVars" :key="row[0]">
                  <td>
                    <code>{{ row[0] }}</code>
                  </td>
                  <td>
                    <code>{{ row[1] }}</code>
                  </td>
                  <td>{{ row[2] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>Accessibility</h4></div>
          <div class="vd-card-body">
            <ul>
              <li>
                Dialog: <code>role="dialog"</code>,
                <code>aria-modal="true"</code>.
              </li>
              <li>
                Listbox renders only when results exist — avoids empty listbox
                axe violations.
              </li>
              <li>
                Options use <code>role="option"</code> +
                <code>aria-selected</code>.
              </li>
              <li>
                AI toggle links to disclaimer via
                <code>aria-describedby</code> when enabled.
              </li>
              <li>
                Model progress uses <code>aria-live="polite"</code> in the
                footer.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <GuideLinkCards :links="guideLinks" />
  </section>
</template>
