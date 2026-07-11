<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useSpotlight } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useSpotlight(root);

const tourSteps = JSON.stringify([
  {
    target: "#spot-target-search",
    title: "Quick Search",
    description:
      "Find anything in your workspace instantly. Supports fuzzy matching and keyboard shortcuts.",
  },
  {
    target: "#spot-target-notifications",
    title: "Notifications",
    description: "Stay informed about mentions, updates, and system alerts.",
  },
  {
    target: "#spot-target-profile",
    title: "Your Profile",
    description:
      "Manage account settings, theme preferences, and sign-out from here.",
  },
]);

const declarativeHtml = `<button class="vd-btn vd-btn-primary" data-vd-spotlight='[
  {"target":"#search","title":"Quick Search","description":"Find anything instantly."},
  {"target":"#bell","title":"Notifications","description":"Mentions and updates."},
  {"target":"#me","title":"Your Profile","description":"Account and theme settings."}
]'>
  Start Tour
</button>

<!-- Targets referenced by the steps above -->
<div id="search">…</div>
<div id="bell">…</div>
<div id="me">…</div>`;

const vanillaWiring = `// Auto-wired on init for any [data-vd-spotlight] trigger.
VanduoSpotlight.init();

// Or start a tour imperatively:
VanduoSpotlight.start([
  { target: '#search', title: 'Quick Search', description: 'Find anything.' },
  { target: '#bell',   title: 'Notifications', description: 'Stay informed.' }
]);
VanduoSpotlight.stop();`;

const vue3Wiring = `import { ref } from 'vue';
import { useSpotlight } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useSpotlight(root);   // wires every [data-vd-spotlight] inside root`;

const classRows: [string, string][] = [
  [
    ".vd-spotlight-overlay",
    "Full-screen dimmer with a cut-out around the target.",
  ],
  [
    ".vd-spotlight-tooltip",
    "Floating step tooltip positioned beside the target.",
  ],
  [".vd-spotlight-title", "Tooltip heading (the step's title)."],
  [".vd-spotlight-description", "Tooltip body copy (the step's description)."],
  [".vd-spotlight-counter", "“2 / 3” progress indicator."],
  [".vd-spotlight-footer", "Footer row holding the navigation buttons."],
  [".vd-spotlight-btn", "Secondary navigation button (Back / Skip)."],
  [".vd-spotlight-btn-primary", "Primary navigation button (Next / Done)."],
  [
    ".vd-spotlight-target",
    "Class applied to the highlighted element while active.",
  ],
];

const attrRows: [string, string][] = [
  [
    "data-vd-spotlight",
    "JSON array of steps on the trigger. Each step: { target, title, description }.",
  ],
];

const jsRows: [string, string][] = [
  [
    "VanduoSpotlight.init(root?)",
    "Wire every [data-vd-spotlight] trigger within root.",
  ],
  [
    "VanduoSpotlight.start(steps, opts?)",
    "Start a tour from an array of step objects.",
  ],
  ["VanduoSpotlight.stop()", "End the active tour and remove the overlay."],
];
</script>

<template>
  <section id="spotlight" ref="root">
    <h5 class="demo-title">
      <i class="ph ph-flashlight"></i>Spotlight / Feature Discovery
    </h5>
    <p class="vd-mb-8">
      Guide users through your interface with step-by-step tours. An overlay
      highlights target elements while a tooltip provides context and navigation
      controls. Add a JSON array of steps to any trigger via
      <code>data-vd-spotlight</code> and it starts on click.
    </p>

    <!-- Interactive Tour -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-map-trifold"></i> Interactive Tour</h6>
          </div>
          <div class="vd-card-body">
            <p>
              Click the button below to start a 3-step feature discovery tour
              that highlights the elements in this card.
            </p>
            <div class="vd-mb-6">
              <button
                class="vd-btn vd-btn-primary"
                :data-vd-spotlight="tourSteps"
              >
                <i class="ph ph-play mr-1"></i> Start Tour
              </button>
            </div>
            <div
              style="
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <div
                id="spot-target-search"
                class="vd-card"
                style="flex: 1; min-width: 150px; text-align: center"
              >
                <div class="vd-card-body">
                  <i
                    class="ph ph-magnifying-glass"
                    style="font-size: 1.75rem; color: var(--vd-color-primary)"
                  ></i>
                  <p class="vd-mb-0 vd-mt-2"><strong>Search Bar</strong></p>
                </div>
              </div>
              <div
                id="spot-target-notifications"
                class="vd-card"
                style="flex: 1; min-width: 150px; text-align: center"
              >
                <div class="vd-card-body">
                  <i
                    class="ph ph-bell"
                    style="font-size: 1.75rem; color: var(--vd-color-warning)"
                  ></i>
                  <p class="vd-mb-0 vd-mt-2"><strong>Notifications</strong></p>
                </div>
              </div>
              <div
                id="spot-target-profile"
                class="vd-card"
                style="flex: 1; min-width: 150px; text-align: center"
              >
                <div class="vd-card-body">
                  <i
                    class="ph ph-user-circle"
                    style="font-size: 1.75rem; color: var(--vd-color-success)"
                  ></i>
                  <p class="vd-mb-0 vd-mt-2"><strong>Profile Menu</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="declarativeHtml" />
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
            <h4>CSS Classes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in classRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="vd-mt-6">Data Attributes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in attrRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="vd-mt-6">JavaScript Methods</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in jsRows" :key="row[0]">
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
                The overlay traps focus on the active step's controls;
                <kbd>Tab</kbd> cycles Back / Skip / Next.
              </li>
              <li>
                <kbd>Escape</kbd> ends the tour; <kbd>←</kbd> / <kbd>→</kbd>
                step between targets.
              </li>
              <li>
                The highlighted target is scrolled into view and announced via
                the tooltip's <code>role="dialog"</code>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
