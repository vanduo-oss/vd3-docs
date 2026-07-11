<script setup lang="ts">
import { computed } from "vue";
import { renderDemo } from "@/customizer/registry";
import { stageStyle } from "@/customizer/overrides";
import type { CustomizerEntry, CustomizerState } from "@/customizer/types";

const props = defineProps<{
  entry: CustomizerEntry;
  state: CustomizerState;
}>();

/** Stable scope for the injected `extraCss` rules (matches the surface class). */
const SURFACE = ".lcc-stage-surface";

const demoHtml = computed(() => renderDemo(props.entry, props.state));
const surfaceStyle = computed(() => stageStyle(props.state));
// Rules the CSS-variable engine can't express (bold-outline / shadow on
// Button/Badge). Rendered into a real <style> element so they reach the
// v-html'd demo. Only ever rendered client-side inside the open drawer.
const extraCss = computed(() => props.entry.extraCss(props.state, SURFACE));
</script>

<template>
  <div class="lcc-stage">
    <div
      class="lcc-stage-surface"
      :style="surfaceStyle"
      v-html="demoHtml"
    ></div>
    <component :is="'style'" v-if="extraCss">{{ extraCss }}</component>
  </div>
</template>
