<script setup lang="ts">
import { computed } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useEngineStore } from "@/stores/engine";
import { useCustomizerStore } from "@/stores/customizer";
import { toVanilla, toVueSfc } from "@/customizer/codegen";

const store = useCustomizerStore();
const engine = useEngineStore();

const vanilla = computed(() =>
  store.entry
    ? toVanilla(store.entry, store.state, store.scopeClass)
    : { html: "", css: "" },
);
const vueSfc = computed(() =>
  store.entry ? toVueSfc(store.entry, store.state, store.scopeClass) : "",
);
</script>

<template>
  <div class="lcc-code">
    <label class="lcc-label">Generated code</label>
    <DocCodeSnippet
      v-if="engine.engine === 'vanilla'"
      :key="'vanilla'"
      :html="vanilla.html"
      :css="vanilla.css"
      :default-open="true"
    />
    <DocCodeSnippet v-else :key="'vue'" :html="vueSfc" :default-open="true" />
  </div>
</template>
