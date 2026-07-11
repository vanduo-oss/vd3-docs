<script setup lang="ts">
import { useScrollspy } from "@vanduo-oss/vue";

interface Section {
  id: string;
  title: string;
}

const props = withDefaults(defineProps<{ sections: Section[] }>(), {
  sections: () => [],
});

const { activeId } = useScrollspy(props.sections.map((s) => s.id));
</script>

<template>
  <nav
    v-if="sections.length > 0"
    class="vd-section-nav"
    aria-label="On this page"
  >
    <h4 class="vd-section-nav-title">On this page</h4>
    <ul class="vd-section-nav-list">
      <li v-for="section in sections" :key="section.id">
        <a
          :href="`#${section.id}`"
          class="vd-section-nav-link"
          :class="{ 'is-active': activeId === section.id }"
        >
          {{ section.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>
