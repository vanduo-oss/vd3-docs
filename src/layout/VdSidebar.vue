<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { nav, type NavSection } from "@/nav";
import { useEngineStore } from "@/stores/engine";

const route = useRoute();

const engineStore = useEngineStore();
const { engine } = storeToRefs(engineStore);

interface Group {
  title: string;
  sections: NavSection[];
}

const allGroups = computed<Group[]>(() => {
  const groups: Group[] = [];
  for (const tab of nav.tabs) {
    for (const category of tab.categories) {
      groups.push({ title: category.title, sections: category.sections });
    }
  }
  return groups;
});

const componentGroups = computed(() =>
  allGroups.value.filter((g) => g.title !== "Guides"),
);
const guideGroups = computed(() =>
  allGroups.value.filter((g) => g.title === "Guides"),
);

const isGuideRoute = (path: string): boolean => path.startsWith("/guides/");
const mode = ref<"components" | "guides">(
  isGuideRoute(route.path) ? "guides" : "components",
);
watch(
  () => route.path,
  (path) => {
    mode.value = isGuideRoute(path) ? "guides" : "components";
  },
);
const toggleMode = (): void => {
  mode.value = mode.value === "components" ? "guides" : "components";
};

const current = computed(() =>
  mode.value === "components"
    ? { icon: "ph-cube", label: "Components" }
    : { icon: "ph-compass", label: "Guides" },
);
const next = computed(() =>
  mode.value === "components"
    ? { icon: "ph-compass", label: "Guides" }
    : { icon: "ph-cube", label: "Components" },
);

const groups = computed(() =>
  mode.value === "guides" ? guideGroups.value : componentGroups.value,
);

const filter = ref("");
const matches = (s: NavSection): boolean => {
  const q = filter.value.trim().toLowerCase();
  if (q.length === 0) return true;
  return (
    s.title.toLowerCase().includes(q) ||
    s.keywords.some((k) => k.toLowerCase().includes(q))
  );
};
const visibleGroups = computed(() =>
  groups.value
    .map((g) => ({ title: g.title, sections: g.sections.filter(matches) }))
    .filter((g) => g.sections.length > 0),
);

const tocOpen = ref(false);
</script>

<template>
  <div class="doc-water-toggle-wrapper" aria-label="Docs mode switch">
    <button
      type="button"
      class="vd-morph doc-water-toggle"
      :aria-pressed="mode === 'guides'"
      :aria-label="`Switch to ${next.label}`"
      @click="toggleMode"
    >
      <span class="vd-morph-content vd-morph-current" aria-hidden="true">
        <i class="doc-water-icon ph" :class="current.icon"></i>
        <span class="doc-water-label">{{ current.label }}</span>
      </span>
      <span class="vd-morph-content vd-morph-next" aria-hidden="true">
        <i class="doc-water-icon ph" :class="next.icon"></i>
        <span class="doc-water-label">{{ next.label }}</span>
      </span>
    </button>
  </div>

  <div class="doc-engine-toggle" role="group" aria-label="Documentation engine">
    <button
      type="button"
      class="doc-engine-option"
      :class="{ active: engine === 'vue3' }"
      :aria-pressed="engine === 'vue3'"
      @click="engineStore.setEngine('vue3')"
    >
      <i class="ph ph-atom" aria-hidden="true"></i> Vue 3
    </button>
    <button
      type="button"
      class="doc-engine-option"
      :class="{ active: engine === 'vanilla' }"
      :aria-pressed="engine === 'vanilla'"
      @click="engineStore.setEngine('vanilla')"
    >
      <i class="ph ph-file-html" aria-hidden="true"></i> Vanilla
    </button>
  </div>

  <div class="doc-sidebar-filter">
    <i
      class="ph ph-funnel-simple doc-sidebar-filter-icon"
      aria-hidden="true"
    ></i>
    <input
      v-model="filter"
      type="search"
      class="doc-sidebar-filter-input"
      placeholder="Filter…"
      autocomplete="off"
      aria-label="Filter navigation items"
    />
  </div>

  <button
    class="doc-sidebar-toggle"
    aria-label="Toggle navigation"
    :aria-expanded="tocOpen"
    @click="tocOpen = !tocOpen"
  >
    Table of Contents
  </button>

  <nav
    class="doc-nav"
    aria-label="Docs sections"
    :class="{ 'is-open': tocOpen }"
  >
    <ul class="doc-nav-list">
      <template v-for="group in visibleGroups" :key="group.title">
        <li class="doc-nav-section">{{ group.title }}</li>
        <li v-for="section in group.sections" :key="section.id">
          <RouterLink
            :to="section.route"
            class="doc-nav-link"
            :class="{ active: route.path === section.route }"
            :data-section="section.id"
            @click="tocOpen = false"
          >
            <i :class="`ph ph-${section.icon ?? 'circle'} mr-2`"></i>
            <span class="doc-nav-link-text">{{ section.title }}</span>
          </RouterLink>
        </li>
      </template>
    </ul>
  </nav>
</template>
