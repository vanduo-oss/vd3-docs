<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { VdOffcanvas, useFocusTrap } from "@vanduo-oss/vd3";
import { useCustomizerStore } from "@/stores/customizer";
import CustomizerStage from "@/components/customizer/CustomizerStage.vue";
import CustomizerControls from "@/components/customizer/CustomizerControls.vue";
import CustomizerCode from "@/components/customizer/CustomizerCode.vue";
import type { Placement } from "@/customizer/types";

const store = useCustomizerStore();

const PLACEMENTS: Placement[] = ["left", "right", "top", "bottom"];
const PLACEMENT_ICON: Record<Placement, string> = {
  left: "ph ph-arrow-line-left",
  right: "ph ph-arrow-line-right",
  top: "ph ph-arrow-line-up",
  bottom: "ph ph-arrow-line-down",
};

const panelRef = ref<HTMLElement | null>(null);
const { activate, deactivate } = useFocusTrap(panelRef);
// Element to restore focus to when the drawer closes.
let triggerEl: HTMLElement | null = null;

const onOpen = (e: Event): void => {
  const id = (e as CustomEvent).detail?.component as string | undefined;
  triggerEl = (document.activeElement as HTMLElement) ?? null;
  store.openFor(id ?? "button");
};

// Bridge VdOffcanvas' v-model to the store (backdrop / ESC close).
const onModelUpdate = (value: boolean): void => {
  if (!value) store.close();
};

watch(
  () => store.open,
  async (open) => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("lcc-open", open);
    }
    if (open) {
      await nextTick();
      activate();
    } else {
      deactivate();
      triggerEl?.focus?.();
      triggerEl = null;
    }
  },
);

onMounted(() => {
  window.addEventListener("vd:open-live-customizer", onOpen);
});
onUnmounted(() => {
  window.removeEventListener("vd:open-live-customizer", onOpen);
  if (typeof document !== "undefined")
    document.body.classList.remove("lcc-open");
});
</script>

<template>
  <VdOffcanvas
    :model-value="store.open"
    :placement="store.placement"
    :title="store.entry ? `Customize ${store.entry.label}` : 'Customizer'"
    @update:model-value="onModelUpdate"
    @close="store.close"
  >
    <div ref="panelRef" class="lcc-panel">
      <!-- Live preview -->
      <CustomizerStage
        v-if="store.entry"
        :entry="store.entry"
        :state="store.state"
      />

      <!-- Panel placement (persisted) -->
      <div class="lcc-section">
        <label class="lcc-label">Panel position</label>
        <div class="lcc-seg" role="group" aria-label="Panel position">
          <button
            v-for="p in PLACEMENTS"
            :key="p"
            type="button"
            class="lcc-seg-btn lcc-placement-btn"
            :class="{ active: store.placement === p }"
            :aria-pressed="store.placement === p"
            :title="p"
            :aria-label="`Dock ${p}`"
            @click="store.setPlacement(p)"
          >
            <i :class="PLACEMENT_ICON[p]" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <!-- Controls -->
      <CustomizerControls />

      <!-- Generated code -->
      <CustomizerCode />

      <!-- Reset -->
      <button
        type="button"
        class="lcc-reset vd-btn vd-btn-sm vd-btn-outline"
        @click="store.reset"
      >
        Reset to defaults
      </button>
    </div>
  </VdOffcanvas>
</template>
