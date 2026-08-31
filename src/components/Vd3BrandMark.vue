<script setup lang="ts">
import Vd3Mark from "@/components/Vd3Mark.vue";

withDefaults(
  defineProps<{
    size?: string;
  }>(),
  {
    size: "3.25rem",
  },
);
</script>

<template>
  <span class="vd-brand-mark">
    <Vd3Mark decorative :size="size" />
  </span>
</template>
