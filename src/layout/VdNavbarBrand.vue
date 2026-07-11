<script setup lang="ts">
interface Props {
  brand?: string;
  href?: string;
}

withDefaults(defineProps<Props>(), {
  brand: "Vanduo",
  href: "/",
});
</script>

<template>
  <a class="vd-navbar-brand" :href="href">
    <span class="vd-navbar-brand-mark" aria-hidden="true">V</span>
    <span class="vd-navbar-brand-name">{{ brand }}</span>
  </a>
</template>
