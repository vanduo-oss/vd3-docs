<script setup lang="ts">
import { useRouter } from "vue-router";
import { VdGlobalSearch } from "@vanduo-oss/vd3";
import { useSearchStore } from "@/stores/search";

const search = useSearchStore();
const router = useRouter();

const onSelect = (hit: { route: string }): void => {
  void router.push(hit.route);
};
</script>

<template>
  <VdGlobalSearch
    :adapter="search.searchAdapter"
    :show-ai-toggle="false"
    @select="onSelect"
  />
</template>
