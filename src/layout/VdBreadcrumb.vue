<script setup lang="ts">
interface Crumb {
  label: string;
  href?: string;
}

withDefaults(defineProps<{ items: Crumb[] }>(), {
  items: () => [],
});
</script>

<template>
  <nav class="vd-breadcrumb" aria-label="Breadcrumb">
    <ol class="vd-breadcrumb-list">
      <li v-for="(item, idx) in items" :key="idx" class="vd-breadcrumb-item">
        <a v-if="item.href" :href="item.href" class="vd-breadcrumb-link">{{
          item.label
        }}</a>
        <span v-else aria-current="page">{{ item.label }}</span>
        <span
          v-if="idx < items.length - 1"
          class="vd-breadcrumb-sep"
          aria-hidden="true"
          >/</span
        >
      </li>
    </ol>
  </nav>
</template>
