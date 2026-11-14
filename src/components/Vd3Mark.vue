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
    ariaLabel: "VD3 UI mark",
    decorative: true,
    blooming: false,
    bloomActive: false,
    spinning: false,
  },
);

const uid = useId().replace(/:/g, "");

const markStyle = computed(() => ({
  width: props.size,
  height: props.size,
}));
</script>

<template>
  <svg
    class="vd3-mark"
    :style="markStyle"
    viewBox="0 0 204 204"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="decorative ? undefined : ariaLabel"
    role="img"
  >
    <defs>
      <filter
        :id="`filter0_${uid}`"
        x="71.7045"
        y="111.995"
        width="60.5872"
        height="60.588"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.50714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0470588 0 0 0 0 0.329412 0 0 0 0 0.376471 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.22857" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0901961 0 0 0 0 0.431373 0 0 0 0 0.411765 0 0 0 0.26 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.640714" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.95 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow"
          result="effect3_innerShadow"
        />
      </filter>

      <filter
        :id="`filter1_${uid}`"
        x="36.8138"
        y="51.561"
        width="60.5872"
        height="60.588"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.50714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0470588 0 0 0 0 0.329412 0 0 0 0 0.376471 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.22857" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0901961 0 0 0 0 0.431373 0 0 0 0 0.411765 0 0 0 0.26 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.640714" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.95 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow"
          result="effect3_innerShadow"
        />
      </filter>

      <filter
        :id="`filter2_${uid}`"
        x="106.597"
        y="51.561"
        width="60.5872"
        height="60.588"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.50714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0470588 0 0 0 0 0.329412 0 0 0 0 0.376471 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.22857" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0901961 0 0 0 0 0.431373 0 0 0 0 0.411765 0 0 0 0.26 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.640714" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.95 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow"
          result="effect3_innerShadow"
        />
      </filter>

      <filter
        :id="`filter3_${uid}`"
        x="62.7142"
        y="91.8508"
        width="41.6282"
        height="41.6282"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.50714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0470588 0 0 0 0 0.329412 0 0 0 0 0.376471 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.22857" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0901961 0 0 0 0 0.431373 0 0 0 0 0.411765 0 0 0 0.26 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.640714" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.95 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow"
          result="effect3_innerShadow"
        />
      </filter>

      <filter
        :id="`filter4_${uid}`"
        x="81.1849"
        y="59.8562"
        width="41.6282"
        height="41.6282"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.50714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0470588 0 0 0 0 0.329412 0 0 0 0 0.376471 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.22857" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0901961 0 0 0 0 0.431373 0 0 0 0 0.411765 0 0 0 0.26 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.640714" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.95 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow"
          result="effect3_innerShadow"
        />
      </filter>

      <filter
        :id="`filter5_${uid}`"
        x="99.6576"
        y="91.8508"
        width="41.6282"
        height="41.6282"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.50714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0470588 0 0 0 0 0.329412 0 0 0 0 0.376471 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.22857" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0901961 0 0 0 0 0.431373 0 0 0 0 0.411765 0 0 0 0.26 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.640714" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.95 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow"
          result="effect3_innerShadow"
        />
      </filter>

      <filter
        :id="`filter6_${uid}`"
        x="87.5052"
        y="108.835"
        width="28.9876"
        height="28.9884"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.50714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0470588 0 0 0 0 0.329412 0 0 0 0 0.376471 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.22857" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0901961 0 0 0 0 0.431373 0 0 0 0 0.411765 0 0 0 0.26 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.640714" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.95 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow"
          result="effect3_innerShadow"
        />
      </filter>

      <filter
        :id="`filter7_${uid}`"
        x="69.0326"
        y="76.8408"
        width="28.9876"
        height="28.9884"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.50714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0470588 0 0 0 0 0.329412 0 0 0 0 0.376471 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.22857" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0901961 0 0 0 0 0.431373 0 0 0 0 0.411765 0 0 0 0.26 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.640714" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.95 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow"
          result="effect3_innerShadow"
        />
      </filter>

      <filter
        :id="`filter8_${uid}`"
        x="105.978"
        y="76.8408"
        width="28.9876"
        height="28.9884"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.50714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0470588 0 0 0 0 0.329412 0 0 0 0 0.376471 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.22857" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0901961 0 0 0 0 0.431373 0 0 0 0 0.411765 0 0 0 0.26 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.640714" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.95 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow"
          result="effect3_innerShadow"
        />
      </filter>
    </defs>

    <g
      class="vd3-mark-spin"
      :class="{
        'is-blooming': blooming,
        'is-bloom-active': bloomActive,
        'is-spinning': spinning,
      }"
    >
      <g :filter="`url(#filter0_${uid})`">
        <circle
          cx="101.998"
          cy="142.289"
          r="24.444"
          fill="#BBFFF8"
          stroke-width="1.67143"
          stroke="#E9FFFC"
        />
      </g>
      <g :filter="`url(#filter1_${uid})`">
        <circle
          cx="67.1078"
          cy="81.855"
          r="24.444"
          fill="#BBFFF8"
          stroke-width="1.67143"
          stroke="#E9FFFC"
        />
      </g>
      <g :filter="`url(#filter2_${uid})`">
        <circle
          cx="136.891"
          cy="81.855"
          r="24.444"
          fill="#BBFFF8"
          stroke-width="1.67143"
          stroke="#E9FFFC"
        />
      </g>
      <g :filter="`url(#filter3_${uid})`">
        <circle
          cx="83.5283"
          cy="112.665"
          r="14.9641"
          fill="#56D4CA"
          stroke-width="1.67143"
          stroke="#E9FFFC"
        />
      </g>
      <g :filter="`url(#filter4_${uid})`">
        <circle
          cx="101.999"
          cy="80.6703"
          r="14.9641"
          fill="#56D4CA"
          stroke-width="1.67143"
          stroke="#E9FFFC"
        />
      </g>
      <g :filter="`url(#filter5_${uid})`">
        <circle
          cx="120.472"
          cy="112.665"
          r="14.9641"
          fill="#56D4CA"
          stroke-width="1.67143"
          stroke="#E9FFFC"
        />
      </g>
      <g :filter="`url(#filter6_${uid})`">
        <circle
          cx="101.999"
          cy="123.33"
          r="8.64418"
          fill="#176E69"
          stroke-width="1.67143"
          stroke="#E9FFFC"
        />
      </g>
      <g :filter="`url(#filter7_${uid})`">
        <circle
          cx="83.5268"
          cy="91.335"
          r="8.64418"
          fill="#176E69"
          stroke-width="1.67143"
          stroke="#E9FFFC"
        />
      </g>
      <g :filter="`url(#filter8_${uid})`">
        <circle
          cx="120.472"
          cy="91.335"
          r="8.64418"
          fill="#176E69"
          stroke-width="1.67143"
          stroke="#E9FFFC"
        />
      </g>
      <circle
        cx="102"
        cy="102"
        r="77.3314"
        stroke-width="1.33714"
        stroke="#8BCFCB"
      />
      <slot name="overlay" />
    </g>
  </svg>
</template>
