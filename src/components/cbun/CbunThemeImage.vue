<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  lightSrc: string;
  darkSrc: string;
  alt: string;
}>();

const base = import.meta.env.BASE_URL;

const lightHref = computed(() =>
  props.lightSrc.startsWith("http")
    ? props.lightSrc
    : `${base}${props.lightSrc.replace(/^\//, "")}`,
);
const darkHref = computed(() =>
  props.darkSrc.startsWith("http")
    ? props.darkSrc
    : `${base}${props.darkSrc.replace(/^\//, "")}`,
);
</script>

<template>
  <!--
    Swap via html[data-theme] (theme toggle) with prefers-color-scheme when
    preference is system (attribute removed) — same contract as docs.css.
  -->
  <div class="cbun-theme-image">
    <img
      class="cbun-theme-image-light"
      :src="lightHref"
      :alt="alt"
      loading="lazy"
      decoding="async"
    />
    <img
      class="cbun-theme-image-dark"
      :src="darkHref"
      :alt="alt"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>

<style scoped>
.cbun-theme-image {
  display: block;
  width: 100%;
  line-height: 0;
}

.cbun-theme-image img {
  width: 100%;
  height: auto;
  border-radius: var(--vd-radius-md, 0.5rem);
  border: 1px solid var(--vd-border-color);
}
</style>

<!--
  Theme swap must key off html[data-theme] / prefers-color-scheme — keep
  unscoped so ancestor attribute selectors are not rewritten away. Also keep
  display rules here so they are not overridden by scoped img[data-v-*].
-->
<style>
.cbun-theme-image .cbun-theme-image-light {
  display: block;
}

.cbun-theme-image .cbun-theme-image-dark {
  display: none;
}

html[data-theme="dark"] .cbun-theme-image .cbun-theme-image-light {
  display: none;
}

html[data-theme="dark"] .cbun-theme-image .cbun-theme-image-dark {
  display: block;
}

html[data-theme="light"] .cbun-theme-image .cbun-theme-image-light {
  display: block;
}

html[data-theme="light"] .cbun-theme-image .cbun-theme-image-dark {
  display: none;
}

@media (prefers-color-scheme: dark) {
  html:not([data-theme]) .cbun-theme-image .cbun-theme-image-light {
    display: none;
  }

  html:not([data-theme]) .cbun-theme-image .cbun-theme-image-dark {
    display: block;
  }
}
</style>
