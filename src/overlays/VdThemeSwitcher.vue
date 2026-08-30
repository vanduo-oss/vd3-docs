<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ThemeMode } from "@vanduo-oss/vd3";

const props = withDefaults(
  defineProps<{
    /** When set, wires a site-dock tooltip on the cycle button. */
    tooltipPlacement?: string;
  }>(),
  {},
);

const theme = useThemeStore();

const MODES: ThemeMode[] = ["system", "light", "dark"];

const options: Record<ThemeMode, { icon: string; label: string }> = {
  system: { icon: "ph-desktop", label: "System" },
  light: { icon: "ph-sun", label: "Light" },
  dark: { icon: "ph-moon", label: "Dark" },
};

const current = computed(() => options[theme.theme] ?? options.system);

const nextLabel = computed(() => {
  const i = MODES.indexOf(theme.theme);
  const next = MODES[(i + 1) % MODES.length] ?? "system";
  return options[next].label;
});

const cycle = (): void => {
  const i = MODES.indexOf(theme.theme);
  const next = MODES[(i + 1) % MODES.length] ?? "system";
  theme.setTheme(next);
};

const dockTooltipBind = computed(() =>
  props.tooltipPlacement
    ? {
        "data-tooltip": `Theme: ${current.value.label}`,
        "data-tooltip-placement": props.tooltipPlacement,
        "data-tooltip-variant": "dock",
      }
    : {},
);
</script>

<template>
  <div class="vd-theme-switcher" data-theme-ui="cycle">
    <button
      type="button"
      class="vd-theme-switcher-toggle"
      :aria-label="`Theme: ${current.label}. Click for ${nextLabel}`"
      v-bind="dockTooltipBind"
      @click="cycle"
    >
      <i
        class="ph-bold"
        :class="current.icon"
        data-theme-icon
        aria-hidden="true"
      ></i>
    </button>
  </div>
</template>
