<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { RouterLink } from "vue-router";

defineProps<{
  title: string;
  icon: string;
  blurb: string;
  docsTo: string;
  /** When true: context left, demo right. Default (false): demo left, context right. */
  reversed?: boolean;
}>();

const fullscreen = ref(false);
const navOffset = ref(64);

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") exitFullscreen();
}

function enterFullscreen() {
  const nav = document.querySelector(".vd-navbar");
  navOffset.value = nav ? Math.round(nav.getBoundingClientRect().height) : 64;
  fullscreen.value = true;
  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", onKeydown);
}

function exitFullscreen() {
  if (!fullscreen.value) return;
  fullscreen.value = false;
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeydown);
}

function toggleFullscreen() {
  if (fullscreen.value) exitFullscreen();
  else enterFullscreen();
}

onBeforeUnmount(exitFullscreen);
</script>

<template>
  <section
    class="cbun-row"
    :class="{ 'is-reversed': reversed, 'is-fullscreen-active': fullscreen }"
  >
    <div class="cbun-row-demo">
      <div
        class="vd-card demo-card cbun-stage"
        :class="{ 'is-fullscreen': fullscreen }"
        :style="fullscreen ? { top: `${navOffset}px` } : undefined"
      >
        <div class="vd-card-header cbun-stage-header">
          <h6>
            <i :class="`ph ph-${icon}`"></i>
            {{ title }}
          </h6>
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            :aria-pressed="fullscreen"
            @click="toggleFullscreen"
          >
            <i :class="fullscreen ? 'ph ph-arrows-in' : 'ph ph-arrows-out'"></i>
            {{ fullscreen ? "Exit full screen" : "Full screen" }}
          </button>
        </div>
        <div class="vd-card-body cbun-stage-body">
          <slot :fullscreen="fullscreen" />
        </div>
      </div>
    </div>

    <div class="cbun-row-context">
      <h3 class="cbun-row-title">
        <i :class="`ph ph-${icon}`"></i>
        {{ title }}
      </h3>
      <p class="cbun-row-blurb vd-text-muted">{{ blurb }}</p>
      <div class="cbun-row-actions">
        <RouterLink :to="docsTo" class="vd-btn vd-btn-primary">
          <i class="ph ph-book-open-text"></i>
          Docs demo
        </RouterLink>
        <button
          type="button"
          class="vd-btn vd-btn-outline"
          :aria-pressed="fullscreen"
          @click="toggleFullscreen"
        >
          <i :class="fullscreen ? 'ph ph-arrows-in' : 'ph ph-arrows-out'"></i>
          {{ fullscreen ? "Exit full screen" : "Full screen" }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cbun-row {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 2rem;
  align-items: center;
  padding: 2.5rem 0;
}

.cbun-row.is-reversed {
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
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
  margin: 0 0 1.25rem;
  line-height: 1.6;
}

.cbun-row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.cbun-stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.cbun-stage-body {
  display: flex;
  flex-direction: column;
  min-height: 280px;
  overflow: hidden;
}

.cbun-stage.is-fullscreen {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  border-radius: 0;
  z-index: 900;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--vd-bg-primary);
}

.cbun-stage.is-fullscreen .cbun-stage-body {
  flex: 1;
  min-height: 0;
  padding: 0.5rem;
  overflow: hidden;
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
}
</style>
