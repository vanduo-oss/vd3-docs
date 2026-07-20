<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useImageBox } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useImageBox(root);

// `data-image-box-full-src` is read verbatim by the runtime lightbox, so Vite
// cannot rebase it the way it does `<img src>`. Prefix the deploy base (`/`
// locally, `/vd3-docs/` on GitHub Pages) so click-to-zoom loads the full image.
const base = import.meta.env.BASE_URL;

const vue3Wiring = `import { ref } from 'vue';
import { useImageBox } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useImageBox(root);   // wires every [data-image-box] inside root`;

const apiRows: [string, string][] = [
  [
    ".vd-image-box-trigger",
    "Class on the thumbnail <img>. Adds a zoom-in cursor and hover scale.",
  ],
  ["data-image-box", "Marks the element as a lightbox trigger (required)."],
  [
    "data-image-box-full-src",
    "URL of the full-resolution image shown in the overlay.",
  ],
  ["data-image-box-caption", "Caption text rendered beneath the full image."],
  [".vd-image-box-caption", "Generated caption element inside the overlay."],
];

const basicHtml = `<!-- The thumbnail <img> is the trigger -->
<img src="/images/thumb.jpg" alt="Sunset over the lake"
     class="vd-image-box-trigger vd-rounded-md vd-shadow"
     data-image-box
     data-image-box-full-src="/images/full.jpg"
     data-image-box-caption="Sunset over the lake"
     tabindex="0" role="button"
     aria-label="View full image" />`;
</script>

<template>
  <section id="image-box" ref="root">
    <h5 class="demo-title"><i class="ph ph-image-square"></i>Image Box</h5>
    <p class="vd-mb-8">
      Click-to-zoom lightbox for images. Add <code>data-image-box</code> to any
      thumbnail <code>&lt;img&gt;</code> and the framework opens a focus-trapped
      overlay showing <code>data-image-box-full-src</code> with an optional
      caption. <kbd>Escape</kbd> or a backdrop click closes it.
    </p>

    <!-- Lightbox gallery -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Lightbox Gallery</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-muted vd-mb-4">
              Click (or focus + <kbd>Enter</kbd>) any thumbnail to open it.
            </p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap">
              <img
                src="/images/vilnius-balloons_small.jpg"
                alt="Hot air balloons over Vilnius at sunset"
                class="vd-image-box-trigger vd-rounded-md vd-shadow"
                data-image-box
                :data-image-box-full-src="`${base}images/vilnius-balloons.jpg`"
                data-image-box-caption="Hot Air Balloons at Sunset — Vilnius"
                style="width: 220px; height: 150px; object-fit: cover"
                tabindex="0"
                role="button"
                aria-label="View hot air balloons over Vilnius full image"
              />
              <img
                src="/images/french-bulldog.jpg"
                alt="French Bulldog portrait"
                class="vd-image-box-trigger vd-rounded-md vd-shadow"
                data-image-box
                :data-image-box-full-src="`${base}images/french-bulldog.jpg`"
                data-image-box-caption="French Bulldog — Pet Photography"
                style="width: 150px; height: 150px; object-fit: cover"
                tabindex="0"
                role="button"
                aria-label="View French Bulldog full image"
              />
              <img
                src="/images/mountains-and-fog.jpg"
                alt="Mountains shrouded in fog"
                class="vd-image-box-trigger vd-rounded-md vd-shadow"
                data-image-box
                :data-image-box-full-src="`${base}images/mountains-and-fog.jpg`"
                data-image-box-caption="Mountains and Fog — Landscape Photography"
                style="width: 220px; height: 150px; object-fit: cover"
                tabindex="0"
                role="button"
                aria-label="View Mountains and Fog full image"
              />
              <img
                src="/images/portrait-orientation_small.JPG"
                alt="Portrait-orientation photo"
                class="vd-image-box-trigger vd-rounded-md vd-shadow"
                data-image-box
                :data-image-box-full-src="`${base}images/portrait-orientation_small.JPG`"
                data-image-box-caption="Portrait Orientation — Mobile Photo"
                style="width: 120px; height: 150px; object-fit: cover"
                tabindex="0"
                role="button"
                aria-label="View portrait-orientation full image"
              />
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="basicHtml" />
      </div>
    </div>

    <!-- Engine wiring -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-code"></i> Engine wiring</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="vue3Wiring" />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-list-dashes"></i> API Reference</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class / Attribute</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in apiRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-wheelchair"></i> Accessibility</h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>
                Triggers get <code>role="button"</code> +
                <code>tabindex="0"</code>; <kbd>Enter</kbd> / <kbd>Space</kbd>
                open the overlay.
              </li>
              <li>
                The overlay traps focus and returns it to the thumbnail on
                close.
              </li>
              <li>
                Always provide a meaningful <code>alt</code> on the underlying
                <code>&lt;img&gt;</code>.
              </li>
              <li>
                A broken image URL falls back to a placeholder
                (<code>.is-broken</code>) instead of an empty box.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
