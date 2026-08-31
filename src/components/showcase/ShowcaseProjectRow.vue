<script setup lang="ts">
import { computed, ref } from "vue";
import { VdSpinner } from "@vanduo-oss/vd3";

defineProps<{
  title: string;
  /** Phosphor icon name (without `ph-` prefix). Ignored when `iconSrc` is set. */
  icon?: string;
  /**
   * Optional brand SVG URL. Rendered as a CSS mask so color follows theme:
   * black in light mode, Spindrift amber (`#f59f00`) in dark.
   */
  iconSrc?: string;
  blurb: string;
  imageSrc: string;
  imageSrcDark: string;
  imageAlt: string;
  demoUrl: string;
  repoUrl: string;
  urlChip: string;
  tags: string[];
  /** When true: context left, media right. Default: media left, context right. */
  reversed?: boolean;
}>();

const lightLoaded = ref(false);
const darkLoaded = ref(false);
const lightError = ref(false);
const darkError = ref(false);

/** Both sides finished (load success or error) — stop the spinner. */
const imagesSettled = computed(
  () =>
    (lightLoaded.value || lightError.value) &&
    (darkLoaded.value || darkError.value),
);

/** Both sides loaded successfully — fade in the theme-swapped pair. */
const imagesReady = computed(() => lightLoaded.value && darkLoaded.value);

/** Settled with at least one failure — keep skeleton / broken placeholder. */
const imagesFailed = computed(
  () => imagesSettled.value && (lightError.value || darkError.value),
);

function onLightReady() {
  lightLoaded.value = true;
}

function onDarkReady() {
  darkLoaded.value = true;
}

function onLightError() {
  lightError.value = true;
}

function onDarkError() {
  darkError.value = true;
}
</script>

<template>
  <section class="showcase-row" :class="{ 'is-reversed': reversed }">
    <div class="showcase-row-media">
      <a
        class="showcase-frame"
        :href="demoUrl"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Open live demo: ${title}`"
      >
        <div class="showcase-frame-chrome" aria-hidden="true">
          <span class="showcase-frame-dots"> <i></i><i></i><i></i> </span>
          <span class="showcase-frame-url">{{ urlChip }}</span>
        </div>
        <div class="showcase-frame-body">
          <div
            v-if="!imagesReady"
            class="showcase-frame-placeholder"
            :class="{ 'is-failed': imagesFailed }"
            aria-hidden="true"
          >
            <div
              class="vd-skeleton vd-skeleton-rect showcase-frame-skeleton"
            ></div>
            <div v-if="!imagesSettled" class="showcase-frame-spinner">
              <VdSpinner size="lg" label="Loading…" />
            </div>
            <div v-else-if="imagesFailed" class="showcase-frame-broken">
              <i class="ph ph-image-broken" aria-hidden="true"></i>
            </div>
          </div>
          <img
            class="showcase-img showcase-img-light"
            :class="{ 'is-ready': imagesReady }"
            :src="imageSrc"
            :alt="imageAlt"
            loading="lazy"
            decoding="async"
            width="1280"
            height="800"
            @load="onLightReady"
            @error="onLightError"
          />
          <img
            class="showcase-img showcase-img-dark"
            :class="{ 'is-ready': imagesReady }"
            :src="imageSrcDark"
            :alt="imageAlt"
            loading="lazy"
            decoding="async"
            width="1280"
            height="800"
            @load="onDarkReady"
            @error="onDarkError"
          />
        </div>
      </a>
    </div>

    <div class="showcase-row-context">
      <h3 class="showcase-row-title">
        <span
          v-if="iconSrc"
          class="showcase-brand-icon"
          :style="{ '--showcase-brand-icon': `url(${iconSrc})` }"
          aria-hidden="true"
        ></span>
        <i v-else-if="icon" :class="`ph ph-${icon}`"></i>
        {{ title }}
      </h3>
      <p class="showcase-row-blurb vd-text-muted">{{ blurb }}</p>
      <ul v-if="tags.length" class="showcase-tags" aria-label="Stack">
        <li v-for="tag in tags" :key="tag">
          <code>{{ tag }}</code>
        </li>
      </ul>
      <div class="showcase-row-actions">
        <a
          class="vd-btn vd-btn-primary"
          :href="demoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="ph ph-arrow-square-out"></i>
          Live demo
        </a>
        <a
          class="vd-btn vd-btn-outline"
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="ph ph-github-logo"></i>
          GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase-row {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 2.25rem;
  align-items: center;
  padding: 2.75rem 0;
}

.showcase-row.is-reversed {
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
}

.showcase-row.is-reversed .showcase-row-media {
  order: 2;
}

.showcase-row.is-reversed .showcase-row-context {
  order: 1;
}

.showcase-row-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.75rem;
  color: var(--vd-color-primary);
  font-size: 1.5rem;
}

/* Brand mark via CSS mask — recolors the opaque SVG silhouette. */
.showcase-brand-icon {
  display: inline-block;
  width: 1.15em;
  height: 1.15em;
  flex-shrink: 0;
  background-color: #000;
  -webkit-mask: var(--showcase-brand-icon) center / contain no-repeat;
  mask: var(--showcase-brand-icon) center / contain no-repeat;
}

/* Spindrift amber from brand SVG fill (#f59f00). */
:global([data-theme="dark"] .showcase-brand-icon) {
  background-color: #f59f00;
}

@media (prefers-color-scheme: dark) {
  :global(:root:not([data-theme]) .showcase-brand-icon) {
    background-color: #f59f00;
  }
}

.showcase-row-blurb {
  margin: 0 0 1rem;
  line-height: 1.65;
}

.showcase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0 0 1.25rem;
  padding: 0;
}

.showcase-tags code {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  border-radius: var(--vd-radius-sm, 0.35rem);
  background: color-mix(in srgb, var(--vd-color-primary) 12%, transparent);
  color: var(--vd-color-primary);
  font-size: 0.85rem;
}

.showcase-row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.showcase-frame {
  display: block;
  overflow: hidden;
  border-radius: var(--vd-radius-lg, 0.75rem);
  border: 1px solid var(--vd-border-color);
  background: var(--vd-bg-secondary, var(--vd-bg-primary));
  box-shadow: var(--vd-shadow-sm, 0 1px 2px rgb(0 0 0 / 8%));
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.showcase-frame:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: var(--vd-shadow-md, 0 8px 24px rgb(0 0 0 / 12%));
}

.showcase-frame:focus-visible {
  outline: 2px solid var(--vd-color-primary);
  outline-offset: 3px;
}

.showcase-frame-chrome {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid var(--vd-border-color);
  background: color-mix(
    in srgb,
    var(--vd-bg-primary) 88%,
    var(--vd-color-primary)
  );
}

.showcase-frame-dots {
  display: flex;
  gap: 0.35rem;
  flex-shrink: 0;
}

.showcase-frame-dots i {
  display: block;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--vd-border-color);
}

.showcase-frame-url {
  flex: 1;
  min-width: 0;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: var(--vd-bg-primary);
  border: 1px solid var(--vd-border-color);
  color: var(--vd-text-muted, var(--vd-text-secondary));
  font-size: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.showcase-frame-body {
  position: relative;
  aspect-ratio: 16 / 10;
  background: var(--vd-bg-primary);
}

.showcase-frame-placeholder {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.showcase-frame-skeleton {
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 0;
}

.showcase-frame-spinner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.showcase-frame-broken {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: var(--vd-text-muted, var(--vd-text-secondary));
  font-size: 2rem;
  opacity: 0.55;
}

.showcase-frame-placeholder.is-failed .showcase-frame-skeleton {
  opacity: 0.65;
}

.showcase-frame-body .showcase-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.showcase-frame-body .showcase-img.is-ready.showcase-img-light {
  opacity: 1;
}

.showcase-frame-body .showcase-img.is-ready.showcase-img-dark {
  opacity: 0;
}

/* Full selector inside :global() — Vue scoped otherwise drops the descendants. */
:global(
  [data-theme="dark"]
    .showcase-frame-body
    .showcase-img.is-ready.showcase-img-light
) {
  opacity: 0;
}

:global(
  [data-theme="dark"]
    .showcase-frame-body
    .showcase-img.is-ready.showcase-img-dark
) {
  opacity: 1;
}

@media (prefers-color-scheme: dark) {
  :global(
    :root:not([data-theme])
      .showcase-frame-body
      .showcase-img.is-ready.showcase-img-light
  ) {
    opacity: 0;
  }

  :global(
    :root:not([data-theme])
      .showcase-frame-body
      .showcase-img.is-ready.showcase-img-dark
  ) {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .showcase-frame,
  .showcase-frame:hover {
    transition: none;
    transform: none;
  }

  .showcase-frame-body .showcase-img {
    transition: none;
  }
}

@media (max-width: 900px) {
  .showcase-row,
  .showcase-row.is-reversed {
    grid-template-columns: 1fr;
  }

  .showcase-row.is-reversed .showcase-row-media,
  .showcase-row.is-reversed .showcase-row-context,
  .showcase-row .showcase-row-media,
  .showcase-row .showcase-row-context {
    order: initial;
  }

  .showcase-row-context {
    order: 1;
  }

  .showcase-row-media {
    order: 2;
    min-width: 0;
    max-width: 100%;
  }

  .showcase-frame {
    max-width: 100%;
  }
}
</style>
