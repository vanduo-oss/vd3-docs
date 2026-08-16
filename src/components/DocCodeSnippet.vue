<script setup lang="ts">
import { VdCodeSnippet } from "@vanduo-oss/vd3";
import { highlightCode } from "@/utils/highlight";

interface Props {
  /** The demo markup shown in the HTML tab (mirrors the Vanilla data-extract). */
  html?: string;
  /** Optional CSS shown in a second tab. */
  css?: string;
  /** Optional JavaScript shown in a tab. */
  js?: string;
  /** Optional shell / command-line snippet shown in a tab. */
  shell?: string;
  /** Optional Vue SFC shown in a tab (after JavaScript). */
  vue?: string;
  /** Start expanded (mirrors the Vanilla `data-expanded="true"`). */
  defaultOpen?: boolean;
  /** Collapsed toggle label (default "View Code"). */
  toggleLabel?: string;
}
const props = withDefaults(defineProps<Props>(), {
  toggleLabel: "View Code",
});
</script>

<template>
  <VdCodeSnippet v-bind="props" :highlight="highlightCode" />
</template>
