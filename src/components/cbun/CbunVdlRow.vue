<script setup lang="ts">
import CbunThemeImage from "@/components/cbun/CbunThemeImage.vue";

defineProps<{
  title: string;
  icon: string;
  blurb: string;
  lightSrc: string;
  darkSrc: string;
}>();
</script>

<template>
  <section class="cbun-vdl-row">
    <div class="cbun-vdl-row-media">
      <CbunThemeImage :light-src="lightSrc" :dark-src="darkSrc" :alt="title" />
    </div>
    <div class="cbun-vdl-row-copy">
      <h3 class="cbun-vdl-row-title">
        <i :class="`ph ph-${icon}`"></i>
        {{ title }}
      </h3>
      <p class="cbun-vdl-row-blurb vd-text-muted">{{ blurb }}</p>
    </div>
  </section>
</template>

<style scoped>
.cbun-vdl-row {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 1.5rem;
  align-items: center;
  padding: 1.25rem 0;
}

.cbun-vdl-row-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0 0 0.5rem;
  color: var(--vd-color-primary);
  font-size: 1.15rem;
}

.cbun-vdl-row-blurb {
  margin: 0;
  line-height: 1.55;
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .cbun-vdl-row {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }

  .cbun-vdl-row-copy {
    order: 1;
  }

  .cbun-vdl-row-media {
    order: 2;
  }
}
</style>
