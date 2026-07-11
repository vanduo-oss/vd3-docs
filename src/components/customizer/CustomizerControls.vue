<script setup lang="ts">
import { computed } from "vue";
import {
  FONT_OPTIONS,
  PRIMARY_COLORS,
  RADIUS_OPTIONS,
  VdCustomSelect,
  VdSlider,
  type RadiusOption,
} from "@vanduo-oss/vue";
import { useCustomizerStore } from "@/stores/customizer";
import type { GlassMode, KnobId, ShadowLevel } from "@/customizer/types";

const store = useCustomizerStore();

const knobs = computed<KnobId[]>(() => store.entry?.knobs ?? []);
const has = (k: KnobId): boolean => knobs.value.includes(k);

const fontOptions = computed(() =>
  FONT_OPTIONS.map((f) => ({ value: f.key, label: f.name })),
);

const SHADOWS: ShadowLevel[] = ["none", "sm", "md", "lg", "xl"];

const GLASS_MODES: { value: GlassMode; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "frosted", label: "Frosted" },
  { value: "tinted", label: "Tinted" },
];

// Radius is a 0..4 index over RADIUS_OPTIONS for the slider.
const radiusIndex = computed<number>({
  get: () => {
    const i = RADIUS_OPTIONS.indexOf(store.state.radius);
    return i < 0 ? RADIUS_OPTIONS.length - 1 : i;
  },
  set: (i) => store.setKnob("radius", RADIUS_OPTIONS[i] as RadiusOption),
});
const radiusLabel = computed(() => RADIUS_OPTIONS[radiusIndex.value]);

// Font size is a multiplier (0.8×–1.4×), shown as a percentage.
const FONT_MIN = 0.8;
const FONT_MAX = 1.4;
const fontPct = computed(() => `${Math.round(store.state.fontScale * 100)}%`);

// Outline weight in px (0 = none).
const OUTLINE_MAX = 6;
const outlineLabel = computed(() =>
  store.state.outline ? `${store.state.outline}px` : "off",
);

const onColor = (role: "primary" | "secondary", e: Event): void => {
  store.setKnob(role, (e.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="lcc-controls">
    <!-- Variant -->
    <div
      v-if="has('variant') && store.entry?.variants.length"
      class="lcc-section"
    >
      <label class="lcc-label">Variant</label>
      <div class="lcc-seg" role="group" aria-label="Variant">
        <button
          v-for="v in store.entry.variants"
          :key="v.value"
          type="button"
          class="lcc-seg-btn"
          :class="{ active: store.state.variant === v.value }"
          :aria-pressed="store.state.variant === v.value"
          @click="store.setKnob('variant', v.value)"
        >
          {{ v.label }}
        </button>
      </div>
    </div>

    <!-- Size -->
    <div v-if="has('size') && store.entry?.sizes.length" class="lcc-section">
      <label class="lcc-label">Size</label>
      <div class="lcc-seg" role="group" aria-label="Size">
        <button
          v-for="s in store.entry.sizes"
          :key="s.value || 'md'"
          type="button"
          class="lcc-seg-btn"
          :class="{ active: store.state.size === s.value }"
          :aria-pressed="store.state.size === s.value"
          @click="store.setKnob('size', s.value)"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <!-- Primary color -->
    <div v-if="has('primary')" class="lcc-section">
      <label class="lcc-label">
        Primary color
        <input
          type="color"
          class="lcc-color-input"
          aria-label="Custom primary color"
          :value="store.state.primary"
          @input="onColor('primary', $event)"
        />
      </label>
      <div
        class="lcc-color-grid"
        role="group"
        aria-label="Primary color presets"
      >
        <button
          v-for="c in PRIMARY_COLORS"
          :key="c.key"
          type="button"
          class="lcc-color-swatch"
          :class="{ active: store.state.primary === c.color }"
          :style="{ '--lcc-swatch': c.color }"
          :title="c.name"
          :aria-label="c.name"
          @click="store.setKnob('primary', c.color)"
        ></button>
      </div>
    </div>

    <!-- Secondary color -->
    <div v-if="has('secondary')" class="lcc-section">
      <label class="lcc-label">
        Secondary color
        <input
          type="color"
          class="lcc-color-input"
          aria-label="Custom secondary color"
          :value="store.state.secondary"
          @input="onColor('secondary', $event)"
        />
      </label>
      <div
        class="lcc-color-grid"
        role="group"
        aria-label="Secondary color presets"
      >
        <button
          v-for="c in PRIMARY_COLORS"
          :key="c.key"
          type="button"
          class="lcc-color-swatch"
          :class="{ active: store.state.secondary === c.color }"
          :style="{ '--lcc-swatch': c.color }"
          :title="c.name"
          :aria-label="c.name"
          @click="store.setKnob('secondary', c.color)"
        ></button>
      </div>
    </div>

    <!-- Border radius -->
    <div v-if="has('radius')" class="lcc-section">
      <label class="lcc-label"
        >Border radius <span class="lcc-value">{{ radiusLabel }}</span></label
      >
      <VdSlider
        v-model="radiusIndex"
        :min="0"
        :max="RADIUS_OPTIONS.length - 1"
        :step="1"
        label="Border radius"
      />
    </div>

    <!-- Shadow -->
    <div v-if="has('shadow')" class="lcc-section">
      <label class="lcc-label">Shadow</label>
      <div class="lcc-seg" role="group" aria-label="Shadow">
        <button
          v-for="lvl in SHADOWS"
          :key="lvl"
          type="button"
          class="lcc-seg-btn"
          :class="{ active: store.state.shadow === lvl }"
          :aria-pressed="store.state.shadow === lvl"
          @click="store.setKnob('shadow', lvl)"
        >
          {{ lvl }}
        </button>
      </div>
    </div>

    <!-- Font -->
    <div v-if="has('font')" class="lcc-section">
      <label class="lcc-label">Font family</label>
      <VdCustomSelect
        :model-value="store.state.font"
        :options="fontOptions"
        @update:model-value="store.setKnob('font', $event)"
      />
    </div>

    <!-- Font size -->
    <div v-if="has('fontSize')" class="lcc-section">
      <label class="lcc-label"
        >Font size <span class="lcc-value">{{ fontPct }}</span></label
      >
      <VdSlider
        :model-value="store.state.fontScale"
        :min="FONT_MIN"
        :max="FONT_MAX"
        :step="0.05"
        label="Font size"
        @update:model-value="store.setKnob('fontScale', $event)"
      />
    </div>

    <!-- Outline weight -->
    <div v-if="has('outline')" class="lcc-section">
      <label class="lcc-label"
        >Outline weight <span class="lcc-value">{{ outlineLabel }}</span></label
      >
      <VdSlider
        :model-value="store.state.outline"
        :min="0"
        :max="OUTLINE_MAX"
        :step="1"
        label="Outline weight"
        @update:model-value="store.setKnob('outline', $event)"
      />
    </div>

    <!-- Glass -->
    <div v-if="has('glass')" class="lcc-section lcc-section-divide">
      <label class="lcc-label">Glass effect</label>
      <div class="lcc-seg" role="group" aria-label="Glass effect">
        <button
          v-for="g in GLASS_MODES"
          :key="g.value"
          type="button"
          class="lcc-seg-btn"
          :class="{ active: store.state.glass === g.value }"
          :aria-pressed="store.state.glass === g.value"
          @click="store.setKnob('glass', g.value)"
        >
          {{ g.label }}
        </button>
      </div>
    </div>
  </div>
</template>
