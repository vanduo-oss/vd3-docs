<script setup lang="ts">
import { computed } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useCustomizerStore } from "@/stores/customizer";
import { toVueSfc } from "@/customizer/codegen";

const store = useCustomizerStore();

const vueSfc = computed(() =>
  store.entry ? toVueSfc(store.entry, store.state, store.scopeClass) : "",
);
</script>

<template>
  <div class="lcc-code">
    <label class="lcc-label">Generated code</label>
    <DocCodeSnippet :html="vueSfc" :default-open="true" />
  </div>
</template>
