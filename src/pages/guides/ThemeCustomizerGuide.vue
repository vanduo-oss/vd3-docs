<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";
import { RouterLink } from "vue-router";

const relatedComponents = [
  {
    to: "/components/theme-customizer",
    icon: "ph-sliders",
    title: "Theme customizer",
    desc: "The full live editor — drive every data-* attribute by hand.",
    badge: "Component",
  },
  {
    to: "/components/theme-switcher",
    icon: "ph-palette",
    title: "Theme switcher",
    desc: "The compact light / dark / system control.",
    badge: "Component",
  },
  {
    to: "/core/color-palette",
    icon: "ph-swatches",
    title: "Color palette",
    desc: "Browse the hues and neutrals the theme chooses from.",
    badge: "Core",
  },
];

const storeJs = `// vd3 theming is a reactive singleton, not global JS calls
import { useThemePreference } from '@vanduo-oss/vd3';

const theme = useThemePreference();
theme.setTheme('dark');       // 'system' | 'light' | 'dark'
theme.setPalette('fibonacci'); // 'open-color' | 'fibonacci'
theme.setPrimary('violet');   // brand hue
theme.setNeutral('slate');    // neutral ramp
theme.setRadius('0.5');       // corner radius scale
theme.setFont('lato');        // base font family
theme.reset();                // back to defaults`;

const attrsHtml = `<!-- Explicit dark example. For theme === 'system', data-theme is removed
     (not set to "system") so prefers-color-scheme can apply. -->
<html
  data-theme="dark"
  data-palette="open-color"
  data-primary="violet"
  data-neutral="slate"
  data-radius="0.5"
  data-font="lato">`;

const persistJs = `// Preferences persist in localStorage and re-hydrate automatically.
// Keys follow storagePrefix (default "vanduo-"):
//   {prefix}palette, {prefix}primary-color, {prefix}neutral-color,
//   {prefix}radius, {prefix}font-preference, {prefix}theme-preference
// Example with the default prefix: vanduo-theme-preference
// Pass storagePrefix to VanduoVue when two apps share an origin.
// useThemePreference() reads them on first client access — there is no init().`;

const attrs: [string, string, string][] = [
  [
    "data-theme",
    "system · light · dark",
    "Color mode. system removes the attribute so prefers-color-scheme applies.",
  ],
  [
    "data-palette",
    "open-color · fibonacci",
    "Active color palette (Open Color is the default).",
  ],
  ["data-primary", "18 hues (e.g. violet, teal)", "Brand color ramp"],
  ["data-neutral", "6 ramps (e.g. slate, gray)", "Neutral / surface colors"],
  [
    "data-radius",
    "0 · 0.125 · 0.25 · 0.375 · 0.5",
    "Corner-radius scale (rem)",
  ],
  ["data-font", "ubuntu, lato, …", "Base font family"],
];
</script>

<template>
  <section id="theme-customizer-guide">
    <h5 class="demo-title">
      <i class="ph ph-palette"></i>Theme customizer
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      vd3 themes by writing <code>data-*</code> attributes on
      <code>&lt;html&gt;</code> — the CSS reads them. In Vue&nbsp;3 the
      <code>useThemePreference()</code> singleton sets those attributes,
      persists the choice to <code>localStorage</code>, and re-applies it on
      load.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-database"></i> Setting the theme</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="storeJs" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-brackets-angle"></i> What it sets</h6>
          </div>
          <div class="vd-card-body">
            <p>
              <code>useThemePreference()</code> writes these attributes; the
              framework CSS does the rest:
            </p>
            <DocCodeSnippet :html="attrsHtml" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-sliders"></i> Customization attributes</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Values</th>
                    <th>Controls</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in attrs" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              The option lists (hue names, neutrals, radii, fonts) come from
              <code>@vanduo-oss/vd3</code> so they match its token catalog
              exactly — see
              <RouterLink to="/guides/vd3-ecosystem"
                >vd3 ecosystem</RouterLink
              >.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-floppy-disk"></i> Persistence</h6>
      </div>
      <div class="vd-card-body">
        <DocCodeSnippet :js="persistJs" :default-open="true" />
      </div>
    </div>

    <GuideLinkCards
      class="vd-mt-6"
      icon="ph-palette"
      title="Try it live"
      :links="relatedComponents"
    />
  </section>
</template>
