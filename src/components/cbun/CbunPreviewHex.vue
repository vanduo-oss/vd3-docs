<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { VdHexGrid, VdHexGridCore } from "@vanduo-oss/vd3-cbun/hex-grid";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const { theme, primary } = storeToRefs(themeStore);
const hexThemeKey = computed(
  () => `${theme.value}:${primary.value}:${themeStore.ready ? "1" : "0"}`,
);

const onReady = (instance: VdHexGridCore): void => {
  instance.generateRandomTerrain();
};
</script>

<template>
  <div class="cbun-hex-wrap" style="height: 420px">
    <VdHexGrid
      :key="hexThemeKey"
      :size="28"
      :width="10"
      :height="7"
      :pixel-ratio="'auto'"
      :cull="true"
      @ready="onReady"
    />
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
