<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  VdDock,
  VdDockItem,
  dockOrientationOf,
  useTooltips,
  type DockItemLayout,
  type DockOrientation,
  type DockPlacement,
  type DockVisualPhase,
} from "@vanduo-oss/vd3";
import Vd3BrandMark from "@/components/Vd3BrandMark.vue";
import VdThemeCustomizer from "@/overlays/VdThemeCustomizer.vue";
import VdThemeSwitcher from "@/overlays/VdThemeSwitcher.vue";
import {
  DOCS_DOCK_RADIUS,
  DOCS_DOCK_TOOLTIP_DELAY_MS,
  useDocsColorScheme,
} from "@/composables/useDocsColorScheme";
import { playSiteDockNarrowBrandMorph } from "@/composables/siteDockNarrowBrandMorph";
import { useDocsDockNarrow } from "@/composables/useDocsDockNarrow";
import { useSiteDockBrandSpin } from "@/composables/useSiteDockBrandSpin";

const SITE_DOCK_STORAGE_KEY = "vd3-docs-site-dock";

const BRAND_EDGE_TIP: Record<DockPlacement, string> = {
  bottom: "Move dock to left",
  left: "Move dock to top",
  top: "Move dock to right",
  right: "Move dock to bottom",
};

type DockExposed = {
  $el?: unknown;
  snapToPlacement?: (target: DockPlacement) => void;
  isMorphing?: { value: boolean };
  visualPhase?: { value: DockVisualPhase };
  placement?: { value: DockPlacement };
  orientation?: { value: DockOrientation };
};

const route = useRoute();
const router = useRouter();
const { dockAccent } = useDocsColorScheme();
const placement = ref<DockPlacement>("left");
const tooltipRoot = ref<HTMLElement | null>(null);
const dockEl = ref<HTMLElement | null>(null);
const dockInst = ref<DockExposed | null>(null);
const lastWidePlacement = ref<DockPlacement>("left");

const isNarrow = useDocsDockNarrow({
  onExitNarrow: () => {
    try {
      localStorage.setItem(SITE_DOCK_STORAGE_KEY, lastWidePlacement.value);
    } catch {
      /* ignore quota / private mode */
    }
  },
});

/** Horizontal edges: inline layout + visible labels; vertical stays icon-only. */
const isHorizontalEdge = computed(
  () => dockOrientationOf(placement.value) === "horizontal",
);

const itemLayout = computed<DockItemLayout>(() =>
  isHorizontalEdge.value && !isNarrow.value ? "inline" : "stack",
);

/** Tooltips only on vertical desktop; horizontal uses inline labels instead. */
const showDockTooltips = computed(
  () => !isNarrow.value && !isHorizontalEdge.value,
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

const brandTooltip = computed(() => BRAND_EDGE_TIP[placement.value]);

const dockTooltipBind = computed(() =>
  showDockTooltips.value
    ? {
        "data-tooltip-placement": tooltipPlacement.value,
        "data-tooltip-variant": "dock",
      }
    : {},
);

const themeTooltipPlacement = computed(() =>
  showDockTooltips.value ? tooltipPlacement.value : undefined,
);

const hideVisibleDockTooltips = (): void => {
  if (typeof document === "undefined") return;
  document
    .querySelectorAll(".vd-tooltip.vd-tooltip-dock")
    .forEach((tip) => tip.remove());
};

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
 * playSiteDockNarrowBrandMorph mirrors desktop shrink→relocate timing.
 */
const onBrandCapture = (event: Event): void => {
  if (!isNarrow.value) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (!target.closest(".vd-dock-brand")) return;

  event.stopPropagation();
  event.preventDefault();

  const next: DockPlacement = placement.value === "top" ? "bottom" : "top";
  playSiteDockNarrowBrandMorph(dockInst.value, next, {
    onApplied: () => {
      try {
        localStorage.setItem(SITE_DOCK_STORAGE_KEY, lastWidePlacement.value);
      } catch {
        /* keep desktop edge out of mobile flip persistence */
      }
      void nextTick(() => {
        patchBrandA11y();
        syncDockTooltips();
      });
    },
  });
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

const syncDockTooltips = (): void => {
  const el = dockEl.value;
  if (!el) return;

  const brand = el.querySelector(".vd-dock-brand");
  if (!(brand instanceof HTMLElement)) return;

  if (isNarrow.value || isHorizontalEdge.value) {
    brand.removeAttribute("data-tooltip");
    brand.removeAttribute("data-tooltip-placement");
    brand.removeAttribute("data-tooltip-variant");
    hideVisibleDockTooltips();
    return;
  }

  brand.setAttribute("data-tooltip", brandTooltip.value);
  for (const [key, value] of Object.entries(dockTooltipBind.value)) {
    brand.setAttribute(key, value);
  }
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

useTooltips(tooltipRoot, { showDelay: DOCS_DOCK_TOOLTIP_DELAY_MS });
useSiteDockBrandSpin(dockEl);

watch(
  placement,
  (edge) => {
    if (!isNarrow.value) {
      lastWidePlacement.value = edge;
    }
    syncDockAttr(edge);
    void nextTick(() => {
      patchBrandA11y();
      syncDockTooltips();
    });
  },
  { immediate: true },
);

watch(isNarrow, (narrow) => {
  if (narrow) {
    try {
      localStorage.setItem(SITE_DOCK_STORAGE_KEY, lastWidePlacement.value);
    } catch {
      /* ignore quota / private mode */
    }
    hideVisibleDockTooltips();
  }
  void nextTick(() => {
    patchBrandA11y();
    syncDockTooltips();
  });
});

watch(brandTooltip, () => {
  void nextTick(() => syncDockTooltips());
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

  void nextTick(() => {
    patchBrandA11y();
    syncDockTooltips();
  });
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
    :tint="dockAccent"
    tint-mode="accent"
    label="Site"
  >
    <template #brand>
      <Vd3BrandMark
        size="var(--vd-dock-brand-size)"
        class="vd-site-dock-brand-mark"
      />
    </template>

    <VdDockItem
      v-for="link in links"
      :key="link.id"
      :icon="link.icon"
      :label="link.label"
      :active="activeId === link.id"
      :data-tooltip="showDockTooltips ? link.label : undefined"
      v-bind="dockTooltipBind"
    />

    <template v-if="isNarrow">
      <span class="vd-site-dock-strip-divider" aria-hidden="true"></span>
      <VdThemeSwitcher :tooltip-placement="themeTooltipPlacement" />
      <VdThemeCustomizer :tooltip-placement="themeTooltipPlacement" />
    </template>

    <template #actions>
      <button
        type="button"
        class="global-search-trigger vd-site-dock-search"
        aria-label="Open global search"
        :data-tooltip="showDockTooltips ? 'Search' : undefined"
        v-bind="dockTooltipBind"
        @click="onSearchClick"
      >
        <i class="ph-bold ph-magnifying-glass" aria-hidden="true"></i>
      </button>
      <template v-if="!isNarrow">
        <VdThemeSwitcher :tooltip-placement="themeTooltipPlacement" />
        <VdThemeCustomizer :tooltip-placement="themeTooltipPlacement" />
      </template>
    </template>
  </VdDock>
</template>
