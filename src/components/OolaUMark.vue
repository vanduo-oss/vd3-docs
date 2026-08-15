<script setup lang="ts">
interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), {
  size: 28,
});
</script>

<template>
  <svg
    class="oola-u-mark"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path
      d="M7 9.5 V14.5 C7 17.5 9.2 19.5 12 19.5 C14.8 19.5 17 17.5 17 14.5 V9.5"
    />
    <path d="M8.2 5.5 H15.8" />
  </svg>
</template>
