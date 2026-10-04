<script setup lang="ts">
import { ref } from "vue";
import { VdAccordion } from "@vanduo-oss/vd3";

const open = ref<string[]>([]);
const exclusiveOpen = ref("exclusive-tokens");
const items = [
  {
    id: "basic-tokens",
    title: "Design tokens",
    content: "Shared colors and spacing follow the theme.",
  },
  {
    id: "basic-keyboard",
    title: "Keyboard access",
    content: "Tab to a header; Enter or Space toggles its panel.",
  },
];
const exclusiveItems = items.map((item) => ({
  ...item,
  id: item.id.replace("basic-", "exclusive-"),
}));
</script>

<template>
  <div class="vd-row">
    <div class="vd-col-12 vd-col-md-6">
      <h6>Multiple open panels</h6>
      <VdAccordion v-model="open" :items="items" />
    </div>
    <div class="vd-col-12 vd-col-md-6">
      <h6>One open panel</h6>
      <VdAccordion v-model="exclusiveOpen" :items="exclusiveItems" exclusive />
    </div>
  </div>
</template>
