<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import {
  VdDocSearch,
  useDocSearch,
  type DocSearchDoc,
  type DocSearchResult,
} from "@vanduo-oss/vd3";

// A small documentation index that feeds every demo on this page. Each entry is
// a DocSearchDoc — the fields the ranker searches (title > category > keywords >
// content) and the metadata VdDocSearch renders for a result.
const docs: DocSearchDoc[] = [
  {
    title: "Button",
    category: "Components",
    href: "/components/button",
    icon: "ph-radio-button",
    content:
      "Buttons trigger actions and submit forms. Variants include primary, secondary, success and danger in three sizes.",
    keywords: ["button", "cta", "action", "submit"],
  },
  {
    title: "Switch",
    category: "Components",
    href: "/components/switch",
    icon: "ph-toggle-right",
    content:
      "An accessible on/off toggle built on a native checkbox with role switch. Binds with v-model in Vue 3.",
    keywords: ["switch", "toggle", "checkbox", "boolean"],
  },
  {
    title: "Slider",
    category: "Components",
    href: "/components/slider",
    icon: "ph-sliders-horizontal",
    content:
      "Styles a native range input with a themed track, fill and thumb, plus an optional label and live value read-out.",
    keywords: ["slider", "range", "input", "value"],
  },
  {
    title: "Modal",
    category: "Components",
    href: "/components/modal",
    icon: "ph-browser",
    content:
      "A focus-trapped dialog overlay for confirmations and forms, with a backdrop and escape-to-close.",
    keywords: ["modal", "dialog", "overlay", "popup"],
  },
  {
    title: "Tooltip",
    category: "Interactive",
    href: "/components/tooltip",
    icon: "ph-chat-circle-text",
    content:
      "A contextual hint shown on hover or focus, positioned around its trigger element.",
    keywords: ["tooltip", "hint", "hover", "popover"],
  },
  {
    title: "Dropdown",
    category: "Interactive",
    href: "/components/dropdown",
    icon: "ph-caret-circle-down",
    content:
      "A toggleable menu of actions anchored to a trigger, fully keyboard navigable.",
    keywords: ["dropdown", "menu", "select", "actions"],
  },
  {
    title: "Toast",
    category: "Feedback",
    href: "/components/toast",
    icon: "ph-bell-ringing",
    content:
      "Transient notifications that stack in a corner and auto-dismiss, with success, warning and danger variants.",
    keywords: ["toast", "notification", "snackbar", "alert"],
  },
  {
    title: "Progress",
    category: "Feedback",
    href: "/components/progress",
    icon: "ph-spinner-gap",
    content:
      "Determinate and indeterminate progress bars for long-running work.",
    keywords: ["progress", "bar", "loading", "percent"],
  },
  {
    title: "Table",
    category: "Data Display",
    href: "/components/table",
    icon: "ph-table",
    content:
      "Responsive data tables with striped rows, hover states, sorting hooks and sticky headers.",
    keywords: ["table", "grid", "data", "rows"],
  },
  {
    title: "Grid System",
    category: "Core",
    href: "/core/grid-system",
    icon: "ph-grid-four",
    content:
      "A twelve-column flexbox grid with responsive column classes and an optional Fibonacci spacing scale.",
    keywords: ["grid", "layout", "columns", "responsive"],
  },
  {
    title: "Installation",
    category: "Getting Started",
    href: "/guides/getting-started",
    icon: "ph-rocket-launch",
    content:
      "Install @vanduo-oss/vd3, import the CSS, and register the Vue plugin to start building.",
    keywords: ["install", "setup", "getting started", "npm"],
  },
  {
    title: "Doc Search",
    category: "Components",
    href: "/components/doc-search",
    icon: "ph-magnifying-glass",
    content:
      "A combobox search over your docs with weighted ranking, highlighted matches and a Cmd/Ctrl+K shortcut.",
    keywords: ["search", "docsearch", "command palette", "cmd k", "combobox"],
  },
];

// Demo 2 — surface the @search / @select emits in a live read-out.
const lastSelected = ref<DocSearchResult | null>(null);
const lastQuery = ref("");
const lastCount = ref(0);

const onSelect = (result: DocSearchResult): void => {
  lastSelected.value = result;
};
const onSearch = (query: string, results: DocSearchResult[]): void => {
  lastQuery.value = query;
  lastCount.value = results.length;
};

// Demo 4 — drive useDocSearch directly and paint a bespoke result list. The
// controller owns ranking, debounce and keyboard state; this markup is entirely
// our own. keyboardShortcut is off so it never fights the Cmd/Ctrl+K demo above.
const headlessInput = ref<HTMLInputElement | null>(null);
const {
  query: hlQuery,
  results: hlResults,
  isOpen: hlIsOpen,
  activeIndex: hlActive,
  select: hlSelect,
  handleKeydown: hlKeydown,
} = useDocSearch(() => docs, {
  maxResults: 5,
  debounceMs: 150,
  keyboardShortcut: false,
  input: headlessInput,
});

const vue3Usage = `<script setup lang="ts">
import { VdDocSearch, type DocSearchDoc } from "@vanduo-oss/vd3";
import { useRouter } from "vue-router";

const router = useRouter();

const docs: DocSearchDoc[] = [
  {
    title: "Button",
    category: "Components",
    href: "/components/button",
    content: "Buttons trigger actions and submit forms.",
    keywords: ["button", "cta", "action"],
  },
  { title: "Switch", category: "Components", href: "/components/switch" },
  // …more docs
];

function onSelect(result: DocSearchResult) {
  router.push(result.href); // result.href defaults to #<id>
}
<\/script>

<template>
  <VdDocSearch
    :data="docs"
    placeholder="Search the docs… (⌘K)"
    @select="onSelect"
  />
</template>`;

const headlessUsage = `<script setup lang="ts">
import { ref } from "vue";
import { useDocSearch, type DocSearchDoc } from "@vanduo-oss/vd3";

const docs: DocSearchDoc[] = [/* … */];
const input = ref<HTMLInputElement | null>(null);

// Reactive source (ref / getter) is re-indexed automatically when it changes.
const { query, results, isOpen, activeIndex, select, handleKeydown } =
  useDocSearch(() => docs, {
    input,          // ⌘K / Ctrl+K focuses this element
    maxResults: 5,
    debounceMs: 150,
    onSelect: (r) => console.log("chose", r.href),
  });
<\/script>

<template>
  <input ref="input" v-model="query" @keydown="handleKeydown" />
  <ul v-if="isOpen">
    <li
      v-for="(r, i) in results"
      :key="r.id"
      :class="{ active: i === activeIndex }"
      @click="select(i)"
    >
      <!-- titleHtml is HTML-escaped by the composable; only the
           highlight tag is injected, so v-html is safe here. -->
      <span v-html="r.titleHtml" />
    </li>
  </ul>
</template>`;

const props: [string, string][] = [
  [":data", "DocSearchDoc[] — the searchable documents (required)."],
  [":min-query-length", "Queries shorter than this never search (default 2)."],
  [":max-results", "Maximum results shown (default 10)."],
  [":debounce-ms", "Debounce applied to typing, in ms (default 150)."],
  [
    ":highlight-tag",
    "Wrapper tag for matched terms; whitelist mark | span | strong | em (default 'mark').",
  ],
  [
    ":keyboard-shortcut",
    "Enable the ⌘K / Ctrl+K shortcut and its badge (default true).",
  ],
  [":placeholder", "Input placeholder (default 'Search...')."],
  [":empty-title", "Empty-state heading (default 'No results found')."],
  [
    ":empty-text",
    "Empty-state body (default 'Try different keywords or check spelling').",
  ],
  [":aria-label", "Listbox accessible name (default 'Search results')."],
];

const events: [string, string][] = [
  [
    "@select",
    "(result: DocSearchResult) — a result was chosen by click or Enter.",
  ],
  ["@search", "(query, results) — fired after a debounced search settles."],
  ["@open", "The results panel opened."],
  ["@close", "The results panel closed."],
];

const docFields: [string, string][] = [
  [
    "title",
    "string — primary label and the highest-weighted match field (required).",
  ],
  ["id?", "string — stable identifier; falls back to a slug of title."],
  [
    "content?",
    "string — body text; the lowest-weighted matches and the source of the excerpt.",
  ],
  [
    "category?",
    "string — grouping label; its slug also picks the result's category icon.",
  ],
  [
    "keywords?",
    "string[] — extra match terms; derived from title + content when omitted.",
  ],
  ["href?", "string — result destination (defaults to #<id>)."],
  [
    "icon?",
    "string — explicit Phosphor icon class; falls back to the category icon.",
  ],
];

const options: [string, string][] = [
  ["minQueryLength", "number — gate below which no search runs (default 2)."],
  ["maxResults", "number — cap on returned results (default 10)."],
  ["debounceMs", "number — debounce before a settled search (default 150)."],
  [
    "highlightTag",
    "string — safe wrapper tag for matches, mark | span | strong | em (default 'mark').",
  ],
  [
    "keyboardShortcut",
    "boolean — enable the ⌘K / Ctrl+K focus shortcut (default true).",
  ],
  ["input", "Ref — the element ⌘K / Ctrl+K focuses (and selects)."],
  [
    "categoryIcons",
    "Record<string, string> — category-slug → Phosphor icon overrides for results without an icon.",
  ],
  [
    "onSelect / onSearch / onOpen / onClose",
    "Lifecycle hooks. VdDocSearch forwards these as its four emits.",
  ],
];

const controller: [string, string][] = [
  [
    "query",
    "Ref<string> — live input value; mutate it (v-model) to drive a debounced search.",
  ],
  ["results", "Ref<DocSearchResult[]> — the current ranked results."],
  ["isOpen", "Ref<boolean> — whether the results panel is open."],
  [
    "activeIndex",
    "Ref<number> — highlighted result index for keyboard nav, or -1.",
  ],
  [
    "search(query?)",
    "Run the ranking synchronously (no debounce); resets activeIndex and returns the results.",
  ],
  ["open() / close()", "Open or close the results panel."],
  [
    "navigate(direction)",
    "Move activeIndex by direction, wrapping at the ends.",
  ],
  [
    "select(index?)",
    "Select a result (defaults to the active one): closes, clears the query, fires onSelect.",
  ],
  [
    "handleKeydown(event)",
    "Combobox key handler for the input (Arrow / Enter / Escape / Tab).",
  ],
  [
    "highlight(text, query?)",
    "HTML-escape text and wrap matches in the highlight tag.",
  ],
];

const resultFields: [string, string][] = [
  [
    "score",
    "number — relevance; results sort by it, descending, then keep document order.",
  ],
  [
    "titleHtml / excerptHtml",
    "HTML-escaped title / excerpt with matched terms wrapped in the highlight tag (safe for v-html).",
  ],
  ["excerpt", "Plain-text window around the first content match."],
  [
    "categorySlug",
    "Slug of category; drives the category-icon colour via data-category.",
  ],
  [
    "id / title / category / content / href / icon",
    "Carried through from the matching DocSearchDoc (resolved to defaults).",
  ],
];
</script>

<template>
  <section id="doc-search">
    <h5 class="demo-title"><i class="ph ph-magnifying-glass"></i>Doc Search</h5>
    <p class="vd-mb-5">
      <strong>VdDocSearch</strong> is a combobox/listbox search over a
      collection of documents you supply. Feed it a
      <code>DocSearchDoc[]</code> and the <code>useDocSearch</code> composable
      ranks matches (title &gt; category &gt; keywords &gt; content), debounces
      typing, highlights the matched terms, and wires full keyboard navigation
      plus a global <kbd>⌘</kbd><kbd>K</kbd> / <kbd>Ctrl</kbd
      ><kbd>K</kbd> shortcut. The component is a thin, accessible shell — reach
      for the composable directly when you want to render results your own way.
    </p>

    <!-- Basic live search -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-doc-search-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Live Search (press ⌘K / Ctrl+K)</h6>
          </div>
          <div class="vd-card-body" style="min-height: 24rem">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Try typing <code>switch</code>, <code>toast</code>,
              <code>menu</code> or <code>install</code> — matched terms are
              highlighted and results are grouped by category.
            </p>
            <VdDocSearch :data="docs" placeholder="Search the docs… (⌘K)" />
            <DocCodeSnippet :html="vue3Usage" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <!-- Emits read-out -->
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-doc-search-events" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Selection &amp; Search Events</h6>
          </div>
          <div class="vd-card-body" style="min-height: 22rem">
            <VdDocSearch
              :data="docs"
              :keyboard-shortcut="false"
              placeholder="Search, then pick a result…"
              @select="onSelect"
              @search="onSearch"
            />
            <div class="vd-mt-4 vd-text-sm">
              <p class="vd-text-muted vd-mb-1">
                Last <code>@search</code>:
                <strong v-if="lastQuery">
                  “{{ lastQuery }}” → {{ lastCount }} result(s)
                </strong>
                <em v-else>waiting for input…</em>
              </p>
              <p class="vd-text-muted vd-mb-0">
                Last <code>@select</code>:
                <strong v-if="lastSelected">
                  {{ lastSelected.title }} ({{ lastSelected.category }}) →
                  <code>{{ lastSelected.href }}</code>
                </strong>
                <em v-else>nothing chosen yet</em>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Config knobs -->
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-doc-search-config" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Tuned: top 3, min 1, bold</h6></div>
          <div class="vd-card-body" style="min-height: 22rem">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              <code>:max-results="3"</code>,
              <code>:min-query-length="1"</code> and
              <code>highlight-tag="strong"</code> — searches on a single
              character and caps the list at three.
            </p>
            <VdDocSearch
              :data="docs"
              :max-results="3"
              :min-query-length="1"
              :keyboard-shortcut="false"
              highlight-tag="strong"
              placeholder="One letter is enough…"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Headless composable demo -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div
          id="demo-doc-search-headless"
          class="vd-card vd-card-glow demo-card"
        >
          <div class="vd-card-header">
            <h6>Headless — <code>useDocSearch</code> with custom markup</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Same ranking, debounce and keyboard state, but the result list
              below is hand-rolled from the controller's reactive
              <code>results</code> — no <code>VdDocSearch</code> shell.
            </p>
            <input
              ref="headlessInput"
              v-model="hlQuery"
              type="search"
              class="vd-input"
              placeholder="Type to search (headless)…"
              aria-label="Headless doc search"
              @keydown="hlKeydown"
            />
            <ul
              v-if="hlIsOpen && hlResults.length"
              class="vd-mt-3"
              style="list-style: none; margin: 0; padding: 0"
            >
              <li
                v-for="(r, i) in hlResults"
                :key="r.id"
                class="vd-card demo-card"
                style="
                  display: flex;
                  gap: 0.75rem;
                  align-items: center;
                  padding: 0.6rem 0.9rem;
                  margin-bottom: 0.5rem;
                  cursor: pointer;
                "
                :style="
                  i === hlActive
                    ? 'outline: 2px solid var(--vd-color-primary)'
                    : ''
                "
                @click="hlSelect(i)"
                @mousemove="hlActive = i"
              >
                <i class="ph" :class="r.icon" aria-hidden="true"></i>
                <span class="vd-flex-1">
                  <!-- titleHtml is escaped + highlighted by the composable. -->
                  <span v-html="r.titleHtml"></span>
                  <span class="vd-text-xs vd-text-muted vd-ms-2"
                    >· {{ r.category }}</span
                  >
                </span>
                <code class="vd-text-xs vd-text-muted">{{ r.href }}</code>
              </li>
            </ul>
            <p
              v-else-if="hlIsOpen"
              class="vd-text-sm vd-text-muted vd-mt-3 vd-mb-0"
            >
              No matches — try a different term.
            </p>
            <DocCodeSnippet :html="headlessUsage" />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-list-dashes mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >API Reference
        </h6>
      </div>
      <div class="vd-card-body">
        <h4>Usage</h4>
        <DocCodeSnippet :html="vue3Usage" :default-open="true" />

        <h4 class="vd-mt-6">Component API — props</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in props" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in events" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">The <code>DocSearchDoc</code> shape</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Field</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in docFields" :key="row[0]">
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

    <!-- useDocSearch composable -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-brackets-curly mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >The <code>useDocSearch</code> composable
        </h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-4">
          <code
            >useDocSearch(docs: MaybeRefOrGetter&lt;DocSearchDoc[]&gt;,
            options?)</code
          >
          is the headless engine behind the component. The index is rebuilt
          whenever the reactive <code>docs</code> source changes, so a live
          array (ref or getter) stays in sync. Ranking weights a title match at
          <code>+100</code> (with <code>+50</code> for an exact title and
          <code>+25</code> for a prefix), a category match at <code>+50</code>,
          a keyword match at <code>+30</code>, and a content match at
          <code>+10</code>; results are sorted by score and sliced to
          <code>maxResults</code>. It is SSR-safe — the only browser access (the
          global <kbd>⌘</kbd><kbd>K</kbd> listener) is registered on mount and
          released on unmount.
        </p>

        <h4>Headless usage</h4>
        <DocCodeSnippet :html="headlessUsage" />

        <h4 class="vd-mt-6">Options</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Option</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in options" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Controller (return value)</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Member</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in controller" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">
          The <code>DocSearchResult</code> shape (passed to
          <code>@select</code>)
        </h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Field</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in resultFields" :key="row[0]">
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

    <!-- Accessibility -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-wheelchair mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >Accessibility
        </h6>
      </div>
      <div class="vd-card-body">
        <ul>
          <li>
            The input is a <code>role="combobox"</code> with
            <code>aria-autocomplete="list"</code>,
            <code>aria-controls</code> pointing at the listbox, and
            <code>aria-expanded</code> mirroring the open state.
          </li>
          <li>
            The results panel is a <code>role="listbox"</code> (named by
            <code>:aria-label</code>) and each result is a
            <code>role="option"</code> with <code>aria-selected</code>;
            <code>aria-activedescendant</code> tracks the highlighted option.
          </li>
          <li>
            Fully keyboard operable: <kbd>↓</kbd> opens/advances,
            <kbd>↑</kbd> moves back (both wrap), <kbd>Enter</kbd> selects,
            <kbd>Esc</kbd> and <kbd>Tab</kbd> close.
          </li>
          <li>
            <kbd>⌘</kbd><kbd>K</kbd> / <kbd>Ctrl</kbd><kbd>K</kbd> focuses and
            selects the input from anywhere on the page (disable via
            <code>:keyboard-shortcut="false"</code>).
          </li>
          <li>
            Highlighted matches are HTML-escaped before the safe highlight tag
            is injected, so untrusted document text can be indexed without XSS
            risk.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
