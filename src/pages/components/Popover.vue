<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { usePopover } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
usePopover(root);

const basicHtml = `<!-- Basic popover via data attribute -->
<button class="vd-btn vd-btn-primary"
        data-vd-bubble="This is a simple popover message.">
  Show Popover
</button>

<!-- Alias: data-vd-popover also works -->
<button class="vd-btn vd-btn-outline"
        data-vd-popover="Same behaviour.">
  Alias
</button>`;

const placementHtml = `<button data-vd-bubble="Top"
        data-vd-bubble-placement="top">Top</button>

<button data-vd-bubble="Right"
        data-vd-bubble-placement="right">Right</button>

<button data-vd-bubble="Bottom"
        data-vd-bubble-placement="bottom">Bottom</button>

<button data-vd-bubble="Left"
        data-vd-bubble-placement="left">Left</button>`;

const titledHtml = `<button class="vd-btn vd-btn-primary"
        data-vd-bubble="Body text for the popover."
        data-vd-bubble-title="Popover Title"
        data-vd-bubble-placement="bottom">
  Titled Popover
</button>`;

const bodyOnlyHtml = `<!-- Works on any element, not just buttons -->
<span class="vd-btn vd-btn-outline-secondary"
      data-vd-bubble="A compact bubble with no header — just content."
      data-vd-bubble-placement="top">
  No Title
</span>`;

const vanillaWiring = `// Auto-initialised on DOMContentLoaded. To (re)scan a subtree:
VanduoBubble.init(document);

// Programmatic control
VanduoBubble.show(trigger);
VanduoBubble.hide(trigger);
VanduoBubble.hideAll();`;

const vue3Wiring = `import { ref } from 'vue';
import { usePopover } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
usePopover(root);   // wires every [data-vd-bubble] inside root; cleanup on unmount`;

const classRows: [string, string][] = [
  [".vd-bubble-content", "Generated popover container."],
  [".vd-popover-content", "Alias for .vd-bubble-content."],
  [".vd-bubble-header", "Header bar (present only with a title)."],
  [".vd-bubble-title", "Title text inside the header."],
  [".vd-bubble-close", "Close button rendered in the header."],
  [".vd-bubble-body", "Body content area."],
];

const attrRows: [string, string][] = [
  ["data-vd-bubble", "Popover text. Required. (alias: data-vd-popover)"],
  [
    "data-vd-bubble-placement",
    "top | right | bottom | left. Default: bottom. (alias: data-vd-popover-placement)",
  ],
  [
    "data-vd-bubble-title",
    "Adds a header with the given title + a close button.",
  ],
  ["data-vd-bubble-html", "Render trusted HTML content (sanitised)."],
];

const jsRows: [string, string][] = [
  ["VanduoBubble.init(root?)", "Wire every [data-vd-bubble] within root."],
  ["VanduoBubble.show(trigger)", "Open the popover for a trigger element."],
  ["VanduoBubble.hide(trigger)", "Close the popover for a trigger element."],
  ["VanduoBubble.hideAll()", "Close every open popover."],
  ["VanduoBubble.destroy(trigger)", "Remove listeners + generated panel."],
];

const eventRows: [string, string][] = [
  ["bubble:show", "Fired on the trigger when its popover opens."],
  ["bubble:hide", "Fired on the trigger when its popover closes."],
];
</script>

<template>
  <section id="popover" ref="root">
    <h5 class="demo-title">
      <i class="ph ph-chat-circle-dots"></i>Popover / Bubble
    </h5>
    <p class="vd-mb-8">
      Attribute-driven popover bubbles. Drop <code>data-vd-bubble="…"</code> on
      any element and the framework builds, positions, and wires the panel for
      you — with auto-placement flip on viewport overflow, outside-click and
      <kbd>Escape</kbd> dismissal. <code>data-vd-popover</code> is a drop-in
      alias.
    </p>

    <!-- Basic -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic Popover</h6></div>
          <div
            class="vd-card-body"
            style="display: flex; gap: 1rem; flex-wrap: wrap; min-height: 6rem"
          >
            <button
              class="vd-btn vd-btn-primary"
              data-vd-bubble="This is a simple popover message."
            >
              Show Popover
            </button>
            <button
              class="vd-btn vd-btn-outline"
              data-vd-popover="Same behaviour via the data-vd-popover alias."
            >
              Alias
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="basicHtml" />
      </div>
    </div>

    <!-- Placement -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Placement Variants</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              min-height: 9rem;
            "
          >
            <button
              class="vd-btn vd-btn-outline-primary"
              data-vd-bubble="Appears on top"
              data-vd-bubble-placement="top"
            >
              Top
            </button>
            <button
              class="vd-btn vd-btn-outline-primary"
              data-vd-bubble="Appears on the right"
              data-vd-bubble-placement="right"
            >
              Right
            </button>
            <button
              class="vd-btn vd-btn-outline-primary"
              data-vd-bubble="Appears on the bottom"
              data-vd-bubble-placement="bottom"
            >
              Bottom
            </button>
            <button
              class="vd-btn vd-btn-outline-primary"
              data-vd-bubble="Appears on the left"
              data-vd-bubble-placement="left"
            >
              Left
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="placementHtml" />
      </div>
    </div>

    <!-- Title + close / Body-only -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>With Title &amp; Close Button</h6>
          </div>
          <div class="vd-card-body" style="min-height: 6rem">
            <button
              class="vd-btn vd-btn-primary"
              data-vd-bubble="This popover has a title header and a close button for click-triggered popovers."
              data-vd-bubble-title="Popover Title"
              data-vd-bubble-placement="bottom"
            >
              Titled Popover
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="titledHtml" />
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Body-only (No Title)</h6></div>
          <div
            class="vd-card-body"
            style="display: flex; gap: 1rem; flex-wrap: wrap; min-height: 6rem"
          >
            <span
              class="vd-btn vd-btn-outline-secondary"
              data-vd-bubble="A compact bubble with no header — just content."
              data-vd-bubble-placement="top"
            >
              No Title
            </span>
            <span
              class="vd-btn vd-btn-outline-secondary"
              data-vd-bubble="Works on any element, not just buttons."
              data-vd-bubble-placement="right"
            >
              Any Element
            </span>
          </div>
        </div>
        <DocCodeSnippet :html="bodyOnlyHtml" />
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
                  <tr v-for="row in eventRows" :key="row[0]">
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
                Trigger carries <code>aria-haspopup="dialog"</code> + toggled
                <code>aria-expanded</code> + <code>aria-controls</code> pointing
                at the generated panel.
              </li>
              <li>
                <kbd>Escape</kbd> closes the most recently opened popover.
              </li>
              <li>
                Click triggers close on outside click; resize / scroll
                recomputes placement and flips on overflow.
              </li>
              <li>
                Content is sanitised; inline styles are stripped (v1.4.1+).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
