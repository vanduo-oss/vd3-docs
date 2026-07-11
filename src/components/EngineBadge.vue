<script setup lang="ts">
/**
 * Engine-scope chip for an engine-specific section header (the per-item engine
 * labels were removed from the sidebar — scope is communicated here, where the
 * content actually differs by engine). Only render this on sections that are
 * genuinely one-engine; universal ("both") sections get no badge.
 */
defineProps<{ engine: "vanilla" | "vue3" }>();

const meta = {
  vanilla: { icon: "ph-file-html", label: "Vanilla" },
  vue3: { icon: "ph-atom", label: "Vue 3" },
} as const;
</script>

<template>
  <span
    class="vd-badge engine-badge"
    :class="`engine-badge-${engine}`"
    :title="`This applies to the ${meta[engine].label} engine`"
  >
    <i :class="`ph ${meta[engine].icon}`" aria-hidden="true"></i>
    {{ meta[engine].label }}
  </span>
</template>

<style scoped>
.engine-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  font-weight: var(--vd-font-weight-medium);
  vertical-align: middle;
}

.engine-badge i {
  font-size: 0.9em;
}

.engine-badge-vanilla {
  color: var(--vd-text-secondary);
  background: var(--vd-color-secondary-alpha-10);
}

.engine-badge-vue3 {
  color: var(--vd-color-primary);
  background: rgba(var(--vd-color-primary-rgb), 0.12);
}
</style>
