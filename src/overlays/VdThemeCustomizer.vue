<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import { useClickOutside } from "@/composables/useClickOutside";
import { PRIMARY_COLORS } from "@vanduo-oss/vd3";

const theme = useThemeStore();
const isOpen = ref(false);
const panelRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);

const PANEL_WIDTH = 320;
const MOBILE_BREAKPOINT = 768;

const resetPanelPosition = (): void => {
  const panel = panelRef.value;
  if (!panel) return;
  panel.style.top = "";
  panel.style.right = "";
  panel.style.left = "";
  panel.style.height = "";
  panel.style.maxHeight = "";
};

/** Align teleported panel under the navbar trigger (framework customizer parity). */
const positionPanel = (): void => {
  const panel = panelRef.value;
  const trigger = triggerRef.value;
  if (!panel || !trigger) return;

  if (window.innerWidth < MOBILE_BREAKPOINT) {
    resetPanelPosition();
    return;
  }

  const triggerRect = trigger.getBoundingClientRect();
  const panelTop = triggerRect.bottom + 8;
  const viewportWidth = window.innerWidth;
  let panelRight = viewportWidth - triggerRect.right;

  const panelLeft = viewportWidth - panelRight - PANEL_WIDTH;
  if (panelLeft < 8) {
    panelRight = viewportWidth - PANEL_WIDTH - 8;
  }

  panel.style.top = `${panelTop}px`;
  panel.style.right = `${panelRight}px`;
  panel.style.left = "";
  panel.style.height = "auto";
  panel.style.maxHeight = `calc(100vh - ${panelTop}px)`;
};

const open = (): void => {
  isOpen.value = true;
};
const close = (): void => {
  isOpen.value = false;
};
const toggle = (): void => {
  isOpen.value ? close() : open();
};

// Close when a click lands outside the panel (and isn't the trigger). The
// teleported panel + corner trigger made the backdrop unreliable, so this is
// the authoritative outside-click close.
useClickOutside([panelRef, triggerRef], close, isOpen);

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === "Escape" && isOpen.value) close();
};

const onReposition = (): void => {
  positionPanel();
};

watch(isOpen, async (open) => {
  if (open) {
    await nextTick();
    positionPanel();
  }
});

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("vd:open-customizer", open);
  window.addEventListener("resize", onReposition);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("vd:open-customizer", open);
  window.removeEventListener("resize", onReposition);
});

defineExpose({ open, close, toggle });
</script>

<template>
  <div class="vd-theme-customizer" :class="{ 'is-open': isOpen }">
    <button
      ref="triggerRef"
      type="button"
      class="vd-theme-customizer-trigger"
      data-theme-customizer-trigger
      aria-label="Open theme customizer"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <i class="ph-bold ph-paint-roller" aria-hidden="true"></i>
    </button>

    <Teleport to="body">
      <div
        class="vd-theme-customizer-overlay"
        :class="{ 'is-active': isOpen }"
        @click="close"
      ></div>

      <aside
        ref="panelRef"
        class="vd-theme-customizer-panel"
        :class="{ 'is-open': isOpen }"
        role="dialog"
        aria-label="Theme customizer"
      >
        <div class="vd-theme-customizer-panel-inner">
          <div class="tc-header">
            <h3 class="tc-title">Customize Theme</h3>
            <button
              type="button"
              class="customizer-mobile-close"
              aria-label="Close"
              @click="close"
            >
              <i class="ph-bold ph-x"></i>
            </button>
          </div>
          <div class="tc-body">
            <!--
              Docs-site lock-in: only Primary Color is user-editable here.
              Palette / Neutral / Radius / Font stay forced to docs defaults
              (see theme store applyDocsLockedPrefs). The framework
              VdThemeCustomizer still ships the full control set for consumers.
            -->
            <div class="tc-section">
              <label class="tc-label">Primary Color</label>
              <div class="tc-color-grid">
                <button
                  v-for="c in PRIMARY_COLORS"
                  :key="c.key"
                  type="button"
                  class="tc-color-swatch"
                  :class="{ 'is-active': theme.primary === c.key }"
                  :data-color="c.key"
                  :style="{ '--vd-swatch-color': c.color }"
                  :title="c.name"
                  :aria-label="c.name"
                  @click="theme.setPrimary(c.key)"
                ></button>
              </div>
            </div>
          </div>
          <div class="tc-footer">
            <button
              type="button"
              class="customizer-reset btn btn-sm btn-outline"
              @click="theme.reset"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </aside>
    </Teleport>
  </div>
</template>
