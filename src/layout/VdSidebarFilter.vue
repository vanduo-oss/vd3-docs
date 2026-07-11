<script setup lang="ts">
import { computed, ref } from "vue";
import { useNavStore } from "@/stores/nav";
import { nav } from "@/nav";

const store = useNavStore();
const query = ref(store.filter);

const onInput = (event: Event): void => {
  const value = (event.target as HTMLInputElement).value;
  query.value = value;
  store.setFilter(value);
};

const placeholder = computed(
  () => `Filter ${nav.tabs[0]?.title ?? "sections"}…`,
);
</script>

<template>
  <div class="vd-sidebar-filter">
    <label class="vd-sidebar-filter-label" for="vd-sidebar-filter-input">
      <span class="vd-visually-hidden">Filter sections</span>
    </label>
    <input
      id="vd-sidebar-filter-input"
      :value="query"
      type="search"
      class="vd-input"
      :placeholder="placeholder"
      autocomplete="off"
      data-sidebar-filter
      @input="onInput"
    />
  </div>
</template>
