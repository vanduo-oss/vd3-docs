<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import AccordionExample from "@/examples/AccordionExample.vue";
import example from "@/examples/AccordionExample.vue?raw";

const apiRows = [
  [
    ":items",
    "Array of { id, title, content? }. Keep item IDs unique across the document.",
  ],
  ["v-model", "An array of open item IDs, or one ID when exclusive is true."],
  [":exclusive", "Allow one open panel at a time. Default false."],
  [
    "@update:modelValue",
    "Emits the new array or single ID; closing the exclusive panel emits an empty string.",
  ],
  [
    "Named slots",
    "A slot named after an item ID replaces its content and receives { item }.",
  ],
];
</script>

<template>
  <section id="accordion">
    <h5 class="demo-title">
      <i class="ph ph-list-plus"></i>Accordion / Collapsible
    </h5>
    <p class="vd-mb-8">
      Expandable sections for FAQs and settings. These examples use the shipped
      VdAccordion component.
    </p>
    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-body"><AccordionExample /></div>
    </div>
    <DocCodeSnippet :html="example" :default-open="true" />
    <div class="vd-card demo-card vd-mt-6">
      <div class="vd-card-header"><h6>Component API</h6></div>
      <div class="vd-card-body">
        <table class="vd-table vd-table-striped">
          <thead>
            <tr>
              <th>Prop, event or slot</th>
              <th>Behavior</th>
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
    <div class="vd-card demo-card vd-mt-6">
      <div class="vd-card-header"><h6>Accessibility</h6></div>
      <div class="vd-card-body">
        Headers are native buttons with aria-expanded and aria-controls. Tab
        moves between headers; Enter or Space toggles a panel. Collapsed content
        is hidden. Use unique item IDs so controls reference the correct panel.
      </div>
    </div>
  </section>
</template>
