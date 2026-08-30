<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { VdGlobalSearch } from "@vanduo-oss/vd3";
import { useSearchStore } from "@/stores/search";

const search = useSearchStore();
const router = useRouter();
const { progressMessage, aiEnabled } = storeToRefs(search);

const onSelect = (hit: { route: string }): void => {
  void router.push(hit.route);
};
</script>

<template>
  <VdGlobalSearch
    :adapter="search.searchAdapter"
    :progress-message="progressMessage"
    :ai="{
      enabled: aiEnabled,
      persistKey: 'vd3-docs-search',
      defaultEnabled: false,
    }"
    @select="onSelect"
    @update:ai-enabled="search.setAiEnabled"
  >
    <template #ai-notice>
      <strong>AI-assisted search</strong> runs a local embedding model
      (EmbeddingGemma) in your browser. Your queries are processed on-device and
      are not sent to Vanduo servers for AI ranking. Under the EU AI Act, this
      is an AI feature you can turn off at any time.
      <strong>Note:</strong> first use downloads ~300MB and may use significant
      CPU/GPU on some devices.
    </template>
  </VdGlobalSearch>
</template>
