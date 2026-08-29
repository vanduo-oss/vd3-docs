<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  VdDock,
  VdDockItem,
  dockOrientationOf,
  useTooltips,
  type DockItemLayout,
  type DockPlacement,
} from "@vanduo-oss/vd3";
import Vd3BrandMark from "@/components/Vd3BrandMark.vue";
import VdThemeCustomizer from "@/overlays/VdThemeCustomizer.vue";
import VdThemeSwitcher from "@/overlays/VdThemeSwitcher.vue";
import {
  DOCS_DOCK_RADIUS,
  useDocsColorScheme,
} from "@/composables/useDocsColorScheme";
import { useDocsDockNarrow } from "@/composables/useDocsDockNarrow";

const SITE_DOCK_STORAGE_KEY = "vd3-docs-site-dock";

type DockExposed = {
  $el?: unknown;
  snapToPlacement?: (target: DockPlacement) => void;
};

const route = useRoute();
const router = useRouter();
const { dockTint } = useDocsColorScheme();
const placement = ref<DockPlacement>("bottom");
const tooltipRoot = ref<HTMLElement | null>(null);
const dockEl = ref<HTMLElement | null>(null);
const dockInst = ref<DockExposed | null>(null);
const lastWidePlacement = ref<DockPlacement>("bottom");

const isNarrow = useDocsDockNarrow({
  onExitNarrow: () => {
    try {
      localStorage.setItem(SITE_DOCK_STORAGE_KEY, lastWidePlacement.value);
    } catch {
      /* ignore quota / private mode */
    }
  },
});

/** Horizontal edges: inline class for package; CSS centers icon-only items. */
const itemLayout = computed<DockItemLayout>(() =>
  dockOrientationOf(placement.value) === "horizontal" ? "inline" : "stack",
);

/** Tooltip opens away from the dock edge. */
const tooltipPlacement = computed(() => {
  switch (placement.value) {
    case "top":
      return "bottom";
    case "left":
      return "right";
    case "right":
      return "left";
    default:
      return "top";
  }
});

const links = [
  { id: "home", label: "Home", icon: "house", to: "/" },
  { id: "docs", label: "Docs", icon: "book-open-text", to: "/docs-landing" },
  { id: "cbun", label: "CBUN", icon: "package", to: "/cbun" },
  { id: "showcase", label: "Showcase", icon: "sparkle", to: "/showcase" },
] as const;

const isActive = (to: string): boolean => {
  if (to === "/") return route.path === "/";
  return route.path === to || route.path.startsWith(`${to}/`);
};

const activeId = computed(() => {
  const match = links.find((link) => isActive(link.to));
  return match?.id ?? "";
});

const go = (to: string): void => {
  if (route.path === to) return;
  void router.push(to);
};

/** Event delegation — VdDockItem does not declare a click emit. */
const onDockClick = (event: Event): void => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const item = target.closest(".vd-dock-item");
  if (!item || !(item instanceof HTMLElement)) return;
  const label = item.getAttribute("aria-label");
  const link = links.find((entry) => entry.label === label);
  if (link) go(link.to);
};

/**
 * Docs-side narrow brand toggle: package sets canToggle=false under 520px.
 * Removable once vd3 exposes a narrow-aware bottom↔top flip.
 */
const onBrandCapture = (event: Event): void => {
  if (!isNarrow.value) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (!target.closest(".vd-dock-brand")) return;

  event.stopPropagation();
  event.preventDefault();

  const next: DockPlacement = placement.value === "top" ? "bottom" : "top";
  dockInst.value?.snapToPlacement?.(next);
  try {
    localStorage.setItem(SITE_DOCK_STORAGE_KEY, lastWidePlacement.value);
  } catch {
    /* keep desktop edge out of mobile flip persistence */
  }
  void nextTick(() => patchBrandA11y());
};

const onSearchClick = (): void => {
  window.dispatchEvent(new CustomEvent("vd:open-search"));
};

const syncDockAttr = (edge: DockPlacement): void => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-docs-dock", edge);
};

/** Re-enable brand on narrow; package sets aria-disabled when canToggle is false. */
const patchBrandA11y = (): void => {
  const el = dockEl.value;
  if (!el || !isNarrow.value) return;
  const brand = el.querySelector(".vd-dock-brand");
  if (!(brand instanceof HTMLButtonElement)) return;
  brand.removeAttribute("aria-disabled");
  brand.setAttribute(
    "aria-label",
    placement.value === "top" ? "Move dock to bottom" : "Move dock to top",
  );
};

/** Function ref so $el is set before useTooltips' onMounted scan. */
const setDockRef = (inst: unknown): void => {
  const exposed = inst as DockExposed | null;
  dockInst.value = exposed;
  const el = exposed?.$el;
  const node = el instanceof HTMLElement ? el : null;
  dockEl.value = node;
  tooltipRoot.value = node;
};

useTooltips(tooltipRoot);

watch(placement, (edge) => {
  if (!isNarrow.value) {
    lastWidePlacement.value = edge;
  }
  syncDockAttr(edge);
  void nextTick(() => patchBrandA11y());
}, { immediate: true });

watch(isNarrow, (narrow) => {
  if (narrow) {
    try {
      localStorage.setItem(SITE_DOCK_STORAGE_KEY, lastWidePlacement.value);
    } catch {
      /* ignore quota / private mode */
    }
  }
  void nextTick(() => patchBrandA11y());
});

onMounted(() => {
  if (!isNarrow.value) {
    lastWidePlacement.value = placement.value;
  } else {
    try {
      const stored = localStorage.getItem(SITE_DOCK_STORAGE_KEY);
      if (
        stored === "left" ||
        stored === "right" ||
        stored === "top" ||
        stored === "bottom"
      ) {
        lastWidePlacement.value = stored;
      }
    } catch {
      /* ignore quota / private mode */
    }
  }

  const el = dockEl.value;
  if (el instanceof HTMLElement) {
    el.addEventListener("click", onDockClick);
    el.addEventListener("click", onBrandCapture, true);
  }

  void nextTick(() => patchBrandA11y());
});

onUnmounted(() => {
  const el = dockEl.value;
  if (el instanceof HTMLElement) {
    el.removeEventListener("click", onDockClick);
    el.removeEventListener("click", onBrandCapture, true);
  }
  if (typeof document === "undefined") return;
  document.documentElement.removeAttribute("data-docs-dock");
});
</script>

<template>
  <VdDock
    :ref="setDockRef"
    class="vd-site-dock"
    v-model:placement="placement"
    position="fixed"
    cycle="edges"
    persist
    :storage-key="SITE_DOCK_STORAGE_KEY"
    :radius="DOCS_DOCK_RADIUS"
    :item-layout="itemLayout"
    :tint="dockTint"
    label="Site"
  >
    <template #brand>
      <Vd3BrandMark size="3.375rem" class="vd-site-dock-brand-mark" />
    </template>

    <VdDockItem
      v-for="link in links"
      :key="link.id"
      :icon="link.icon"
      :label="link.label"
      :active="activeId === link.id"
      :data-tooltip="link.label"
      :data-tooltip-placement="tooltipPlacement"
      data-tooltip-variant="dock"
    />

    <template v-if="isNarrow">
      <span class="vd-site-dock-strip-divider" aria-hidden="true"></span>
      <VdThemeSwitcher />
      <VdThemeCustomizer />
    </template>

    <template #actions>
      <button
        type="button"
        class="global-search-trigger vd-site-dock-search"
        aria-label="Open global search"
        @click="onSearchClick"
      >
        <i class="ph-bold ph-magnifying-glass" aria-hidden="true"></i>
      </button>
      <template v-if="!isNarrow">
        <VdThemeSwitcher />
        <VdThemeCustomizer />
      </template>
    </template>
  </VdDock>
</template>
