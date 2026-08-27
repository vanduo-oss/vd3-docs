<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import { useClickOutside } from "@/composables/useClickOutside";
import { useDocsColorScheme } from "@/composables/useDocsColorScheme";
import { docsPrimarySwatches } from "@/constants/docsPrimary";

const theme = useThemeStore();
const { scheme } = useDocsColorScheme();
const primarySwatches = computed(() => docsPrimarySwatches(scheme.value));
const isOpen = ref(false);
const panelRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);

const PANEL_WIDTH = 320;
const MOBILE_BREAKPOINT = 768;
const GAP = 8;

const resetPanelPosition = (): void => {
  const panel = panelRef.value;
  if (!panel) return;
  panel.style.top = "";
  panel.style.right = "";
  panel.style.left = "";
  panel.style.bottom = "";
  panel.style.height = "";
  panel.style.maxHeight = "";
};

const clampRight = (preferredRight: number, viewportWidth: number): number => {
  const panelLeft = viewportWidth - preferredRight - PANEL_WIDTH;
  if (panelLeft < GAP) return viewportWidth - PANEL_WIDTH - GAP;
  return preferredRight;
};

/** Anchor teleported panel near the dock action trigger for any edge. */
const positionPanel = (): void => {
  const panel = panelRef.value;
  const trigger = triggerRef.value;
  if (!panel || !trigger) return;

  if (window.innerWidth < MOBILE_BREAKPOINT) {
    resetPanelPosition();
    return;
  }

  const triggerRect = trigger.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const edge =
    document.documentElement.getAttribute("data-docs-dock") || "bottom";

  panel.style.height = "auto";
  panel.style.left = "";
  panel.style.right = "";
  panel.style.top = "";
  panel.style.bottom = "";

  if (edge === "top") {
    const panelTop = triggerRect.bottom + GAP;
    const panelRight = clampRight(
      viewportWidth - triggerRect.right,
      viewportWidth,
    );
    panel.style.top = `${panelTop}px`;
    panel.style.right = `${panelRight}px`;
    panel.style.maxHeight = `${Math.max(160, viewportHeight - panelTop - GAP)}px`;
    return;
  }

  if (edge === "left") {
    const panelLeft = triggerRect.right + GAP;
    panel.style.left = `${panelLeft}px`;
    panel.style.top = `${Math.max(GAP, triggerRect.top)}px`;
    panel.style.maxHeight = `${Math.max(160, viewportHeight - triggerRect.top - GAP)}px`;
    return;
  }

  if (edge === "right") {
    const panelRight = viewportWidth - triggerRect.left + GAP;
    panel.style.right = `${panelRight}px`;
    panel.style.top = `${Math.max(GAP, triggerRect.top)}px`;
    panel.style.maxHeight = `${Math.max(160, viewportHeight - triggerRect.top - GAP)}px`;
    return;
  }

  // bottom (default): float the panel above the dock trigger
  const panelRight = clampRight(
    viewportWidth - triggerRect.right,
    viewportWidth,
  );
  panel.style.right = `${panelRight}px`;
  panel.style.bottom = `${viewportHeight - triggerRect.top + GAP}px`;
  panel.style.top = "auto";
  panel.style.maxHeight = `${Math.max(160, triggerRect.top - GAP * 2)}px`;
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
  if (isOpen.value) positionPanel();
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
  window.addEventListener("scroll", onReposition, true);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("vd:open-customizer", open);
  window.removeEventListener("resize", onReposition);
  window.removeEventListener("scroll", onReposition, true);
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
          <div class="tc-body">
            <!--
              Docs-site lock-in: only Primary Color is user-editable here.
              Palette / Neutral / Radius / Font stay forced to docs defaults
              (see theme store applyDocsLockedPrefs). Both schemes offer Ink
              (black) + eight DOCK_TINTS; default primary for new visitors is blue.
            -->
            <div class="tc-section">
              <div class="tc-color-grid">
                <button
                  v-for="c in primarySwatches"
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
        </div>
      </aside>
    </Teleport>
  </div>
</template>
