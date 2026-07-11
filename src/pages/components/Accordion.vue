<script setup lang="ts">
import { reactive } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const basic = reactive([false, false, false]);
const flush = reactive([false, true]);

const basicItems = [
  {
    title: "Accordion Item 1",
    body: "This is the content of the first accordion item.",
  },
  {
    title: "Accordion Item 2",
    body: "This is the content of the second accordion item.",
  },
  {
    title: "Accordion Item 3",
    body: "This is the content of the third accordion item.",
  },
];
const flushItems = [
  {
    title: "Design Tokens",
    body: "Theme-aware colors, spacing, and typography are inherited from global tokens.",
  },
  {
    title: "Accessibility",
    body: "Keyboard and focus interactions are handled by the framework component runtime.",
  },
];

const basicHtml = `<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header">
      <span>Item Title</span>
      <span class="accordion-icon"></span>
    </button>
    <div class="accordion-body">
      <div class="accordion-content">Item content goes here</div>
    </div>
  </div>
</div>`;

const flushHtml = `<div class="accordion accordion-flush">
  <div class="accordion-item">
    <button class="accordion-header">
      <span>Section Title</span>
      <span class="accordion-icon"></span>
    </button>
    <div class="accordion-body">
      <div class="accordion-content">Flush content goes here</div>
    </div>
  </div>
</div>`;

// Engine-specific wiring (the markup and classes are identical).
const vue3Wiring = `<!-- Toggle .is-open from component state -->
<div class="accordion-item" :class="{ 'is-open': open[i] }">
  <button class="accordion-header" @click="open[i] = !open[i]">…</button>
  <div class="accordion-body"><div class="accordion-content">…</div></div>
</div>`;

const vanillaWiring = `// The framework auto-wires .accordion-header clicks (toggling .is-open)
VanduoCollapsible.init();`;

const apiRows: [string, string][] = [
  [".accordion", "Base container for a group of collapsible items."],
  [".accordion-item", "Wrapper for one header/body pair."],
  [
    ".accordion-header",
    "Clickable trigger that expands or collapses item content.",
  ],
  [".accordion-icon", "Chevron indicator that rotates with state changes."],
  [".accordion-body", "Expandable content panel."],
  [".accordion-content", "Inner content wrapper with readable spacing."],
  [
    ".accordion-flush",
    "Variant that removes per-item outer borders and spacing so rows stack with divider lines instead of separate cards.",
  ],
  [".is-open", "Runtime class applied to an item when expanded."],
];
</script>

<template>
  <section id="accordion">
    <h5 class="demo-title">
      <i class="ph ph-list-plus"></i>Accordion / Collapsible
    </h5>
    <p class="vd-mb-8">
      Expandable content sections for FAQs, settings panels, and progressive
      disclosure. Use accordions to keep dense content scannable while revealing
      details on demand.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic Accordion</h6></div>
          <div class="vd-card-body">
            <div class="accordion">
              <div
                v-for="(item, i) in basicItems"
                :key="item.title"
                class="accordion-item"
                :class="{ 'is-open': basic[i] }"
              >
                <button class="accordion-header" @click="basic[i] = !basic[i]">
                  <span>{{ item.title }}</span>
                  <span class="accordion-icon"></span>
                </button>
                <div class="accordion-body">
                  <div class="accordion-content">{{ item.body }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="basicHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Flush Variant</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-4">
              Flush removes the per-item box treatment and stacks rows
              edge-to-edge, using dividers instead of separate bordered cards.
            </p>
            <div class="accordion accordion-flush">
              <div
                v-for="(item, i) in flushItems"
                :key="item.title"
                class="accordion-item"
                :class="{ 'is-open': flush[i] }"
              >
                <button class="accordion-header" @click="flush[i] = !flush[i]">
                  <span>{{ item.title }}</span>
                  <span class="accordion-icon"></span>
                </button>
                <div class="accordion-body">
                  <div class="accordion-content">{{ item.body }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="flushHtml" />
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
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
            <h4>Wiring</h4>
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :html="vue3Wiring" :default-open="true"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :html="vanillaWiring" :default-open="true"
              /></template>
            </EngineSwitch>

            <h4 class="vd-mt-6">CSS Classes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class Name</th>
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
  </section>
</template>
