<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
  title: string;
  icon: string;
  blurb: string;
  strengths: string[];
  docsTo: string;
  /** When true: context left, demo right. Default (false): demo left, context right. */
  reversed?: boolean;
}>();

const isExternalDocs = computed(() => /^https?:\/\//i.test(props.docsTo));
</script>

<template>
  <section class="cbun-row" :class="{ 'is-reversed': reversed }">
    <div class="cbun-row-demo">
      <slot />
    </div>

    <div class="cbun-row-context">
      <h3 class="cbun-row-title">
        <i :class="`ph ph-${icon}`"></i>
        {{ title }}
      </h3>
      <p class="cbun-row-blurb vd-text-muted">{{ blurb }}</p>
      <ul class="cbun-row-strengths">
        <li v-for="item in strengths" :key="item">{{ item }}</li>
      </ul>
      <div class="cbun-row-actions">
        <a
          v-if="isExternalDocs"
          :href="docsTo"
          class="vd-btn vd-btn-primary"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i class="ph ph-book-open-text"></i>
          Component Documentation
        </a>
        <RouterLink v-else :to="docsTo" class="vd-btn vd-btn-primary">
          <i class="ph ph-book-open-text"></i>
          Component Documentation
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cbun-row {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 0.55fr);
  gap: 2rem;
  align-items: center;
  padding: 2.5rem 0;
}

.cbun-row.is-reversed {
  grid-template-columns: minmax(0, 0.55fr) minmax(0, 1.7fr);
}

.cbun-row.is-reversed .cbun-row-demo {
  order: 2;
}

.cbun-row.is-reversed .cbun-row-context {
  order: 1;
}

.cbun-row-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.75rem;
  color: var(--vd-color-primary);
  font-size: 1.5rem;
}

.cbun-row-blurb {
  margin: 0 0 1rem;
  line-height: 1.6;
}

.cbun-row-strengths {
  margin: 0 0 1.25rem;
  padding-left: 1.15rem;
  line-height: 1.55;
  color: var(--vd-text-secondary);
}

.cbun-row-strengths li + li {
  margin-top: 0.35rem;
}

.cbun-row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.cbun-row-demo {
  min-width: 0;
  max-width: 100%;
}

@media (max-width: 900px) {
  .cbun-row,
  .cbun-row.is-reversed {
    grid-template-columns: 1fr;
  }

  .cbun-row.is-reversed .cbun-row-demo,
  .cbun-row.is-reversed .cbun-row-context,
  .cbun-row .cbun-row-demo,
  .cbun-row .cbun-row-context {
    order: initial;
  }

  .cbun-row-context {
    order: 1;
  }

  .cbun-row-demo {
    order: 2;
  }

  .cbun-row-context {
    min-width: 0;
  }
}
</style>
