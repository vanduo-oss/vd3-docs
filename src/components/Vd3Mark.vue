<script setup lang="ts">
import { computed, useId } from "vue";

const props = withDefaults(
  defineProps<{
    size?: string;
    ariaLabel?: string;
    decorative?: boolean;
    blooming?: boolean;
    bloomActive?: boolean;
    spinning?: boolean;
  }>(),
  {
    size: "2.5em",
    ariaLabel: "vd3 mark",
    decorative: true,
    blooming: false,
    bloomActive: false,
    spinning: false,
  },
);

const uid = useId().replace(/:/g, "");
const shadowId = computed(() => `vd3-mark-shadow-${uid}`);
const innerGradId = computed(() => `vd3-mark-inner-${uid}`);

const markStyle = computed(() => ({
  width: props.size,
  height: props.size,
}));
</script>

<template>
  <svg
    class="vd3-mark"
    :style="markStyle"
    viewBox="-100 -100 922 1100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="decorative ? undefined : ariaLabel"
    role="img"
  >
    <defs>
      <filter
        :id="shadowId"
        filterUnits="userSpaceOnUse"
        x="-100"
        y="-100"
        width="922"
        height="1100"
        color-interpolation-filters="sRGB"
      >
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="7"
          flood-color="#000000"
          flood-opacity="0.22"
        />
      </filter>
      <radialGradient
        :id="innerGradId"
        cx="361"
        cy="361"
        r="215.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="var(--vd3-mark-inner-light, #2f9e44)" />
        <stop
          offset="0.841428"
          stop-color="var(--vd3-mark-inner-dark, #163d1c)"
        />
      </radialGradient>
    </defs>

    <g
      class="vd3-mark-spin"
      :class="{
        'is-blooming': blooming,
        'is-bloom-active': bloomActive,
        'is-spinning': spinning,
      }"
      :filter="`url(#${shadowId})`"
    >
      <circle
        class="vd3-mark-outer"
        data-i="0"
        cx="361"
        cy="609.838"
        r="100"
        fill="var(--vd3-mark-outer-fill, #3d7a4a)"
      />
      <circle
        class="vd3-mark-outer"
        data-i="1"
        cx="145.5"
        cy="236.581"
        r="100"
        fill="var(--vd3-mark-outer-fill, #3d7a4a)"
      />
      <circle
        class="vd3-mark-outer"
        data-i="2"
        cx="576.5"
        cy="236.581"
        r="100"
        fill="var(--vd3-mark-outer-fill, #3d7a4a)"
      />
      <path
        class="vd3-mark-inner"
        d="M145.5 361C145.5 241.983 241.983 145.5 361 145.5C480.017 145.5 576.5 241.983 576.5 361C576.5 480.017 480.017 576.5 361 576.5C241.983 576.5 145.5 480.017 145.5 361Z"
        :fill="`url(#${innerGradId})`"
      />
      <slot name="overlay" />
    </g>
  </svg>
</template>
