<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ThemeMode } from "@vanduo-oss/vue";

const theme = useThemeStore();
const root = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const options: { value: ThemeMode; icon: string; label: string }[] = [
  { value: "system", icon: "ph-desktop", label: "System" },
  { value: "light", icon: "ph-sun", label: "Light" },
  { value: "dark", icon: "ph-moon", label: "Dark" },
];

const current = computed(
  () => options.find((o) => o.value === theme.theme) ?? options[0],
);

const toggle = (): void => {
  isOpen.value = !isOpen.value;
};
const choose = (mode: ThemeMode): void => {
  theme.setTheme(mode);
  isOpen.value = false;
};

const onDocClick = (event: MouseEvent): void => {
  if (root.value && !root.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};
const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === "Escape") isOpen.value = false;
};

onMounted(() => {
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  document.removeEventListener("click", onDocClick);
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div
    ref="root"
    class="vd-theme-switcher vd-theme-switcher-menu-end"
    :class="{ 'is-open': isOpen }"
    data-theme-ui="menu"
  >
    <button
      type="button"
      class="vd-theme-switcher-toggle dark-mode-toggle"
      :aria-label="`Theme: ${current.label}`"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <i
        class="ph"
        :class="current.icon"
        data-theme-icon
        aria-hidden="true"
      ></i>
    </button>
    <div class="vd-theme-switcher-menu" role="menu">
      <button
        v-for="opt in options"
        :key="opt.value"
        type="button"
        role="menuitemradio"
        class="vd-theme-switcher-option"
        :class="{ 'is-active': theme.theme === opt.value }"
        :data-theme-value="opt.value"
        :aria-checked="theme.theme === opt.value"
        :aria-label="opt.label"
        @click="choose(opt.value)"
      >
        <i class="ph" :class="opt.icon" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>
