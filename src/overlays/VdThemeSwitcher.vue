<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ThemeMode } from "@vanduo-oss/vd3";

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
</script>

<template>
  <div class="vd-theme-switcher" data-theme-ui="cycle">
    <button
      type="button"
      class="vd-theme-switcher-toggle dark-mode-toggle"
      :aria-label="`Theme: ${current.label}. Click for ${nextLabel}`"
      @click="cycle"
    >
      <i
        class="ph"
        :class="current.icon"
        data-theme-icon
        aria-hidden="true"
      ></i>
    </button>
  </div>
</template>
