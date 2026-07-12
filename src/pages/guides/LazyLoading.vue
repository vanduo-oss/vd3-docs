<script setup lang="ts">
import { onMounted, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useLazyLoad } from "@vanduo-oss/vd3";

// Live reveal-on-scroll demo. `useLazyLoad().observe()` runs the callback once
// when the target first intersects the viewport, then auto-unobserves — a
// low-cost way to defer effects/work until something is actually seen.
const lazyBox = ref<HTMLElement | null>(null);
const lazyTarget = ref<HTMLElement | null>(null);
const revealed = ref(false);
const { observe } = useLazyLoad();

const watchTarget = (): void => {
  const el = lazyTarget.value;
  if (!el) return;
  observe(
    el,
    () => {
      revealed.value = true;
    },
    { threshold: 0.25, rootMargin: "0px" },
  );
};

onMounted(watchTarget);

// Re-arm the demo: hide the target, scroll the box back to the top so the
// target is clipped (out of view) again, then observe once more.
const resetReveal = (): void => {
  revealed.value = false;
  if (lazyBox.value) lazyBox.value.scrollTop = 0;
  watchTarget();
};

const observeSnippet = `<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useLazyLoad } from "@vanduo-oss/vd3";

const target = ref<HTMLElement | null>(null);
const revealed = ref(false);
const { observe } = useLazyLoad();

onMounted(() => {
  if (!target.value) return;
  // Fires once when the element first scrolls into view, then auto-unobserves.
  observe(
    target.value,
    () => {
      revealed.value = true;
    },
    { threshold: 0.25, rootMargin: "0px" },
  );
});
<\/script>

<template>
  <div ref="target" :class="{ 'is-loaded': revealed }">
    Deferred content — revealed on first intersection.
  </div>
</template>`;

const loadSectionSnippet = `<script setup lang="ts">
import { ref } from "vue";
import { useLazyLoad } from "@vanduo-oss/vd3";

const panel = ref<HTMLElement | null>(null);
const { loadSection } = useLazyLoad();

function deferPanel() {
  if (!panel.value) return;
  // Shows a skeleton, then fetches + injects the (sanitized) HTML the first
  // time the panel scrolls into view. 10s abort timeout; https/same-origin only.
  loadSection("/partials/pricing.html", panel.value, {
    placeholder: "skeleton", // or "spinner", or a custom HTML string
    onLoaded: (el) => console.log("injected into", el),
    onError: (err) => console.warn("lazy fetch failed", err),
  });
}
<\/script>`;

const wireSnippet = `<script setup lang="ts">
import { ref } from "vue";
import { useLazyLoad } from "@vanduo-oss/vd3";

// Pass a root ref and every [data-vd-lazy] descendant is auto-wired on mount.
const root = ref<HTMLElement | null>(null);
useLazyLoad(root);
<\/script>

<template>
  <div ref="root">
    <section data-vd-lazy="/partials/reviews.html"
             data-vd-lazy-placeholder="spinner"></section>
  </div>
</template>`;

const routeJs = `// Vite splits each route into its own chunk — loaded on demand.
const routes = [
  { path: '/components/datepicker',
    component: () => import('@/pages/components/Datepicker.vue') },
  { path: '/changelog',
    component: () => import('@/pages/changelog.vue') }, // heavy → its own chunk
];`;

const componentJs = `// Defer a heavy widget until it is actually rendered.
import { defineAsyncComponent } from 'vue';
const VdChart = defineAsyncComponent(
  () => import('@/components/VdChart.vue'),
);`;

const imgHtml = `<!-- Native lazy images need no JS at all -->
<img src="hero.jpg" loading="lazy" decoding="async" alt="…">`;

const api: [string, string][] = [
  [
    "observe(el, cb, options?)",
    "Observe an element; the callback fires once when it first intersects the viewport, then it auto-unobserves. Without IntersectionObserver (SSR / old browsers) the callback runs immediately.",
  ],
  ["unobserve(el)", "Cancel a still-pending observation for an element."],
  [
    "loadSection(url, container, options?)",
    "Render a placeholder, then on first intersection fetch a same-origin / https URL (10s timeout), inject the sanitized HTML, and dispatch lifecycle events.",
  ],
  [
    "useLazyLoad(root?)",
    "Pass a root element ref to auto-wire every [data-vd-lazy] descendant on mount (URL from data-vd-lazy, placeholder from data-vd-lazy-placeholder, state stamped on data-vd-lazy-state).",
  ],
];

const observeOpts: [string, string][] = [
  [":threshold", "IntersectionObserver threshold (default 0)."],
  [":rootMargin", 'IntersectionObserver rootMargin (default "0px").'],
];

const sectionOpts: [string, string][] = [
  [
    ":placeholder",
    '"skeleton" (default) or "spinner" render the shipped loader markup; any other string is treated as custom HTML and sanitized before injection.',
  ],
  [
    ":threshold / :rootMargin",
    "IntersectionObserver tuning for the deferred fetch.",
  ],
  [
    "onLoaded(container)",
    "Called with the container after the response is injected.",
  ],
  [
    "onError(error)",
    "Called with the error when the fetch or URL guard fails.",
  ],
];

const events: [string, string][] = [
  [
    "lazysection:loading",
    "Fired immediately (with the placeholder in place). detail: { url }.",
  ],
  [
    "lazysection:loaded",
    "Fired after the sanitized HTML is injected. detail: { url }.",
  ],
  [
    "lazysection:error",
    "Fired on a failed fetch or a blocked URL (an inline .vd-alert-error is also rendered). detail: { url, error }.",
  ],
];

const tactics: [string, string][] = [
  [
    "useLazyLoad().observe",
    "Activate effects (glass, parallax, counters) only when scrolled into view.",
  ],
  [
    "useLazyLoad().loadSection",
    "Defer a fetch-and-inject content section until the container is seen.",
  ],
  [
    "Route-level splitting",
    "Dynamic import() in the router — each page is its own chunk.",
  ],
  [
    "Async components",
    "defineAsyncComponent for heavy below-the-fold widgets.",
  ],
  ["Native lazy images", 'loading="lazy" — zero JavaScript, browser-driven.'],
];
</script>

<template>
  <section id="lazy-loading">
    <h5 class="demo-title">
      <i class="ph ph-spinner-gap"></i>Lazy Loading
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      vd3 ships <strong>useLazyLoad</strong>, an IntersectionObserver composable
      that defers work until an element scrolls into view — either firing a
      callback (<code>observe</code>) or fetching-and-injecting a content
      section (<code>loadSection</code>). Pair it with the bundler tactics below
      — route-level code splitting, async components, and native lazy images —
      so you ship only what a route needs and reveal the rest on demand.
    </p>

    <!-- Live composable demo -->
    <div class="vd-card vd-card-glow demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-eye"></i> Reveal on scroll (useLazyLoad)</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-4 vd-text-sm vd-text-muted">
          Scroll <strong>inside</strong> the box below. The target starts hidden
          and clipped out of view; the moment 25% of it intersects the viewport,
          <code>observe()</code> runs its callback exactly once and reveals the
          content — then unobserves itself.
        </p>

        <div ref="lazyBox" class="lazy-scroll">
          <p class="vd-text-sm vd-mb-0">
            <i class="ph ph-arrow-down"></i> Keep scrolling down inside this
            box…
          </p>
          <div class="lazy-spacer">
            <span class="vd-text-sm vd-text-muted"
              >…the target is further below…</span
            >
          </div>
          <div
            ref="lazyTarget"
            class="lazy-target"
            :class="{ 'is-loaded': revealed }"
          >
            <i class="ph ph-check-circle"></i>
            <div>
              <strong>Revealed!</strong>
              <p class="vd-text-sm vd-mb-0">
                observe() fired its callback on first intersection.
              </p>
            </div>
          </div>
        </div>

        <div
          class="vd-d-flex vd-gap-4 vd-mt-4"
          style="align-items: center; flex-wrap: wrap"
        >
          <button
            class="vd-btn vd-btn-secondary vd-btn-sm"
            @click="resetReveal"
          >
            <i class="ph ph-arrow-counter-clockwise"></i> Reset demo
          </button>
          <span class="vd-text-sm">
            Status:
            <span
              class="vd-badge"
              :class="revealed ? 'vd-badge-success' : 'vd-badge-secondary'"
            >
              {{ revealed ? "loaded" : "pending" }}
            </span>
          </span>
        </div>

        <DocCodeSnippet class="vd-mt-5" :html="observeSnippet" />
      </div>
    </div>

    <!-- loadSection + wiring -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-download-simple"></i> Fetch a section on demand
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              <code>loadSection</code> shows a skeleton, then fetches and
              injects the (sanitized) HTML the first time the container is seen.
            </p>
            <DocCodeSnippet :html="loadSectionSnippet" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-brackets-angle"></i> Declarative wiring</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Pass a root ref and every <code>[data-vd-lazy]</code> descendant
              is auto-wired on mount.
            </p>
            <DocCodeSnippet :html="wireSnippet" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <!-- Bundler tactics -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-signpost"></i> Route-level code splitting</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="routeJs" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              The ~4,000-line changelog, for example, lives in its own chunk and
              never loads on other pages.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-cube"></i> Async components</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="componentJs" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-image"></i> Native lazy assets</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="imgHtml" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-card vd-card-glow demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-list-dashes mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >useLazyLoad API
        </h6>
      </div>
      <div class="vd-card-body">
        <h4>Returned methods</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in api" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">observe() options</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Option</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in observeOpts" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">loadSection() options</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Option</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in sectionOpts" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Events (loadSection)</h4>
        <p class="vd-text-sm vd-text-muted vd-mb-3">
          Dispatched on the container as bubbling <code>CustomEvent</code>s.
        </p>
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
      </div>
    </div>

    <!-- Tactics table -->
    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-list-checks"></i> Tactics at a glance</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Tactic</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tactics" :key="row[0]">
                <td>
                  <strong>{{ row[0] }}</strong>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Demo-only presentation for the reveal-on-scroll card (not composable logic). */
.lazy-scroll {
  max-height: 220px;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid var(--vd-color-border, rgba(128, 128, 128, 0.25));
  border-radius: var(--vd-radius-md, 0.5rem);
  background: var(--vd-color-surface-2, rgba(128, 128, 128, 0.06));
}
.lazy-spacer {
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--vd-color-border, rgba(128, 128, 128, 0.35));
  border-radius: var(--vd-radius-md, 0.5rem);
  margin: 1rem 0;
}
.lazy-target {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 1.25rem;
  border-radius: var(--vd-radius-md, 0.5rem);
  background: var(--vd-color-success, #16a34a);
  color: #fff;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.lazy-target.is-loaded {
  opacity: 1;
  transform: none;
}
.lazy-target .ph {
  font-size: 1.75rem;
  flex: none;
}
</style>
