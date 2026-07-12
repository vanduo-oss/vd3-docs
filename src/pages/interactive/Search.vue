<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useSearch } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useSearch(root);

const vue3Wiring = `import { ref, onMounted } from 'vue';
import { useSearch } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useSearch(root);

// Sources are registered app-wide (see src/stores/search.ts). The composable
// just touches the global so it warms up alongside an overlay component.`;

// `const registry = useSearch()` returns the process-wide registry below.
const apiRows: [string, string][] = [
  [
    "registry.register(source)",
    "Add a source. Throws on duplicate name, missing name, or missing fetch.",
  ],
  ["registry.unregister(name)", "Remove a source by name. Returns boolean."],
  ["registry.list()", "Returns a frozen array of registered sources."],
  [
    "registry.query(text, options?)",
    "Runs every source in parallel and resolves to { text, sources[] }.",
  ],
];

const sourceShape = `interface Source {
  name: string;          // unique key (e.g. 'sections')
  label?: string;        // display name in result groups
  icon?: string;         // optional Phosphor class for the group header
  limit?: number;        // max results per source (default 10)
  fetch: (query, opts) => Promise<Result[]>;
}

interface Result {
  title: string;
  subtitle?: string;
  href: string;
  group?: string;
  icon?: string;
}`;

const registerHtml = `// One-time registration (e.g. in a Pinia store or app setup)
import { useSearch } from "@vanduo-oss/vd3";

const registry = useSearch();  // the process-wide search registry

registry.register({
  name: 'sections',
  label: 'Documentation Sections',
  icon: 'ph-book-open',
  limit: 8,
  fetch: async (query) => {
    const all = await fetch('/data/sections.json').then(r => r.json());
    return all
      .filter(s => s.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8)
      .map(s => ({ title: s.title, subtitle: s.section, href: '/docs/' + s.slug }));
  }
});

registry.register({
  name: 'guides',
  label: 'Guides',
  fetch: async (query) => { /* … */ }
});`;
</script>

<template>
  <section id="search">
    <h5 class="demo-title"><i class="ph ph-magnifying-glass"></i>Search</h5>
    <p class="vd-mb-8">
      The framework ships a small registry for plugging named data sources into
      a search overlay. The package does NOT ship a UI — overlays (e.g. a
      global search modal) consume the registry. Sources can be local
      arrays, fetched JSON, or any async provider.
    </p>

    <div class="vd-row vd-mb-6" ref="root">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Result shape</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="sourceShape" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Registering sources</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="registerHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-code"></i> Engine wiring</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="vue3Wiring" />
          </div>
        </div>
      </div>
    </div>

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
                    <th>Method</th>
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

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-wheelchair"></i> Accessibility</h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>
                The registry is purely data — accessibility lives in the overlay
                that consumes it.
              </li>
              <li>
                Result lists SHOULD expose <code>role="listbox"</code> with
                <code>aria-label</code>; items get <code>role="option"</code>.
              </li>
              <li>
                Use <kbd>↑</kbd>/<kbd>↓</kbd> for navigation,
                <kbd>Enter</kbd> for selection, <kbd>Esc</kbd> to close —
                consistent with a typical command-palette pattern.
              </li>
              <li>
                Abort in-flight queries on input change so stale results don't
                race.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
