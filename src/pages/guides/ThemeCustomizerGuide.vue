<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

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
    desc: "Browse the hues and neutrals the store chooses from.",
    badge: "Core",
  },
];

const storeJs = `// vd2 theming is a Pinia store, not global JS calls
import { useThemeStore } from '@/stores/theme';

const theme = useThemeStore();
theme.setTheme('dark');       // 'system' | 'light' | 'dark'
theme.setPrimary('violet');   // brand hue
theme.setNeutral('slate');    // neutral ramp
theme.setRadius('0.5');       // corner radius scale
theme.setFont('lato');        // base font family
theme.reset();                // back to defaults`;

const attrsHtml = `<!-- The framework CSS reads these attributes on <html> -->
<html
  data-theme="dark"
  data-primary="violet"
  data-neutral="slate"
  data-radius="0.5"
  data-font="lato">`;

const persistJs = `// Preferences persist in localStorage and re-apply on init()
// keys: vanduo-theme, vanduo-primary, vanduo-neutral, vanduo-radius, vanduo-font
theme.init();   // called once in App.vue onMounted`;

const attrs: [string, string, string][] = [
  [
    "data-theme",
    "system · light · dark",
    "Colour mode (system defers to prefers-color-scheme)",
  ],
  ["data-primary", "18 hues (e.g. violet, teal)", "Brand colour ramp"],
  ["data-neutral", "6 ramps (e.g. slate, gray)", "Neutral / surface colours"],
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
      <i class="ph ph-palette"></i>Theme Customizer
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Both engines theme the same way: the CSS reads
      <code>data-*</code> attributes on <code>&lt;html&gt;</code>. The Vanilla
      engine sets them with imperative JS; vd2 drives them through a Pinia store
      (<code>useThemeStore</code>) that also persists the choice to
      <code>localStorage</code> and re-applies it on load.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-database"></i> Driving the store</h6>
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
              The store writes these attributes; the framework CSS does the
              rest:
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
              <code>@vanduo-oss/core</code> so they match the Vanilla customizer
              exactly — see
              <a href="/guides/vanduo-ecosystem">The Vanduo Ecosystem</a>.
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
