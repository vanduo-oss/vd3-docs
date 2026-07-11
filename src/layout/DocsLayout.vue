<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import VdSidebar from "./VdSidebar.vue";

const route = useRoute();
// The original SPA toggles this view via JS; in vd2 routing controls it, so the
// docs view is always active when rendered. data-doc-tab drives card styling.
const docTab = computed(() =>
  route.path.startsWith("/guides/") ? "guides" : "components",
);
</script>

<template>
  <div id="docs-view" class="is-active" :data-doc-tab="docTab">
    <div class="vd-container-responsive">
      <div class="vd-row">
        <aside
          class="vd-col-12 vd-col-lg-2 doc-sidebar"
          aria-label="Docs navigation"
        >
          <VdSidebar />
        </aside>
        <div class="vd-col-12 vd-col-lg-10 doc-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
