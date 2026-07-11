<script setup lang="ts">
import { computed, provide, reactive, watch } from "vue";
import { useEngineStore } from "@/stores/engine";
import { storeToRefs } from "pinia";
import {
  ENGINE_SNIPPET_GROUP,
  type EngineSnippetGroup,
} from "@/components/engineSnippetGroup";

/**
 * Renders the documentation block for the currently selected engine. Wrap any
 * engine-specific content (a wiring code snippet, a JS-methods table body, …) in
 * the matching named slot — only one is rendered at a time.
 *
 *   <EngineSwitch>
 *     <template #vue3> …Vue 3 usage… </template>
 *     <template #vanilla> …Vanilla (zero-build) usage… </template>
 *   </EngineSwitch>
 *
 * v-if (not CSS hide) is used for simplicity: SSG pre-renders the default `vue3`
 * slot and a stored `vanilla` preference swaps in after hydration — a negligible
 * flash for static code blocks.
 *
 * Because the slot is swapped with v-if, a `DocCodeSnippet` the reader expanded
 * would be destroyed and re-mounted at its default state when they flip engines.
 * To keep code visible while inspecting it, we share each snippet's expanded
 * state by its ordinal position within this switch: the Nth snippet in the
 * `vue3` slot and the Nth snippet in the `vanilla` slot read the same state, so
 * "expanded" carries across the toggle. The map lives on this (never-destroyed)
 * component, so it survives every swap.
 */
const engineStore = useEngineStore();
const { engine } = storeToRefs(engineStore);

const expandedByOrdinal = reactive<Record<number, boolean>>({});
// A render epoch that ticks whenever the rendered engine changes, so the ordinal
// cursor resets once per slot render (before the new slot's snippets register).
let epoch = 0;
let lastEpoch = -1;
let cursor = 0;
watch(engine, () => {
  epoch++;
});

const group: EngineSnippetGroup = {
  register(defaultOpen: boolean) {
    if (epoch !== lastEpoch) {
      lastEpoch = epoch;
      cursor = 0;
    }
    const ordinal = cursor++;
    if (!(ordinal in expandedByOrdinal)) {
      expandedByOrdinal[ordinal] = defaultOpen;
    }
    return computed({
      get: () => expandedByOrdinal[ordinal] ?? defaultOpen,
      set: (value: boolean) => {
        expandedByOrdinal[ordinal] = value;
      },
    });
  },
};
provide(ENGINE_SNIPPET_GROUP, group);
</script>

<template>
  <slot v-if="engine === 'vue3'" name="vue3" />
  <slot v-else name="vanilla" />
</template>
