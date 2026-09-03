<script setup lang="ts">
import { nextTick, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { VdGlobalSearch } from "@vanduo-oss/vd3";
import { useAiSearchDisclaimerAck } from "@/composables/useAiSearchDisclaimerAck";
import { useSearchStore } from "@/stores/search";

const search = useSearchStore();
const router = useRouter();
const { progressMessage, aiEnabled } = storeToRefs(search);
const { isAcknowledged, acknowledge } = useAiSearchDisclaimerAck();

const onSelect = (hit: { route: string }): void => {
  void router.push(hit.route);
};

/** VdGlobalSearch teleports the notice to `body`; hide the wrapper once dismissed. */
const hideDismissedNotice = (): void => {
  void nextTick(() => {
    void nextTick(() => {
      document
        .querySelectorAll(".vd-global-search-ai-notice")
        .forEach((node) => {
          (node as HTMLElement).style.display = "none";
        });
    });
  });
};

const onAcknowledge = (): void => {
  acknowledge();
  hideDismissedNotice();
};

watch(
  [isAcknowledged, aiEnabled],
  ([acknowledged, aiOn]) => {
    if (acknowledged && aiOn) hideDismissedNotice();
  },
  { flush: "post" },
);
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
      <span
        v-if="isAcknowledged"
        class="global-search-ai-notice-dismissed"
        aria-hidden="true"
      />
      <template v-else>
        <strong>AI-assisted search</strong> runs a local embedding model
        (EmbeddingGemma) in your browser. Your queries are processed on-device
        and are processed locally in your browser for AI ranking. Under the EU
        AI Act, this is an AI feature you can turn off at any time.
        <strong>Note:</strong> first use downloads ~300MB and may use
        significant CPU/GPU on some devices.
        <button
          type="button"
          class="vd-btn vd-btn-ink vd-btn-sm global-search-ai-notice-ack"
          @click="onAcknowledge"
        >
          Got it
        </button>
      </template>
    </template>
  </VdGlobalSearch>
</template>

<style>
.global-search-ai-notice-ack {
  display: block;
  width: fit-content;
  margin-top: 0.45rem;
}
</style>
