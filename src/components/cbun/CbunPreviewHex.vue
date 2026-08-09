<script setup lang="ts">
import { nextTick, watch } from "vue";
import { storeToRefs } from "pinia";
import { VdHexGrid } from "@vanduo-oss/vd3-cbun/hex-grid";
import { useThemeStore } from "@/stores/theme";

defineProps<{ fullscreen?: boolean }>();

interface HexCell {
  q: number;
  r: number;
  fill: string;
  stroke?: string;
  terrain?: string | null;
}

interface GridInstance {
  getAllHexes: () => HexCell[];
  generateRandomTerrain: () => void;
  _getThemeColors?: () => Record<string, string>;
  _render?: () => void;
  themeColors?: Record<string, string>;
}

let gridInstance: GridInstance | null = null;

const themeStore = useThemeStore();
const { theme, primary } = storeToRefs(themeStore);

const readToken = (token: string, fallback: string): string => {
  if (typeof document === "undefined") return fallback;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(token).trim() ||
    fallback
  );
};

const isDarkTheme = (): boolean => {
  if (typeof document === "undefined") return false;
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark") return true;
  if (attr === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const hexPalette = () => {
  const dark = isDarkTheme();
  const outline = readToken("--vd-color-primary", dark ? "#3bc9db" : "#000000");
  return {
    outline,
    canvasBg: readToken("--vd-bg-primary", dark ? "#111418" : "#ffffff"),
    hexFill: "transparent",
    textColor: readToken("--vd-text-primary", dark ? "#e9ecef" : "#1f2937"),
    textMuted: readToken("--vd-text-muted", "#868e96"),
  };
};

const applyHexTheme = (): void => {
  if (!gridInstance?._getThemeColors || !gridInstance._render) return;
  const p = hexPalette();
  gridInstance._getThemeColors = () => ({
    bgPrimary: p.canvasBg,
    bgSecondary: p.hexFill,
    borderColor: p.outline,
    colorPrimary: p.outline,
    textColor: p.textColor,
    textMuted: p.textMuted,
  });
  const colors = gridInstance._getThemeColors();
  gridInstance.themeColors = colors;
  gridInstance.getAllHexes().forEach((h) => {
    if (!h.terrain) {
      h.fill = colors.bgSecondary;
      if (h.stroke !== undefined) h.stroke = colors.borderColor;
    }
  });
  gridInstance._render();
};

const onReady = (instance: GridInstance): void => {
  gridInstance = instance;
  applyHexTheme();
  instance.generateRandomTerrain();
  // App.vue applies theme/primary in onMounted after this child mounts —
  // re-read tokens once that settles so outlines track the global primary.
  nextTick(() => applyHexTheme());
};

watch([theme, primary, () => themeStore.ready], () => applyHexTheme());
</script>

<template>
  <div
    class="cbun-hex-wrap"
    :style="fullscreen ? { height: '100%' } : { height: '280px' }"
  >
    <VdHexGrid :size="28" :width="10" :height="7" @ready="onReady" />
  </div>
</template>

<style scoped>
.cbun-hex-wrap {
  position: relative;
  width: 100%;
  min-height: 240px;
  overflow: hidden;
  background: var(--vd-bg-primary);
  border-radius: var(--vd-radius-md, 0.5rem);
}
</style>
