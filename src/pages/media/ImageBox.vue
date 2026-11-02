<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdImageBox, useImageBox, type VdImageItem } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
const box = useImageBox(root);

// Vite rebases <img src> in templates, not strings passed into VdImageBox.
// BASE_URL is always trailing-slashed (`/` locally, `/vd3-docs/` on project pages).
const base = import.meta.env.BASE_URL;

const items: VdImageItem[] = [
  {
    src: `${base}images/forest-boardwalk.jpg`,
    alt: "Wooden boardwalk trail through a sunlit pine forest",
    caption: "Pine forest boardwalk",
    orientation: "landscape",
  },
  {
    src: `${base}images/mountains-and-fog.jpg`,
    alt: "Mountains above a fog bank",
    caption: "Mountain peaks above fog",
  },
  {
    src: `${base}images/expanding/0.jpg`,
    alt: "Quiet cove with a wooden dock and lily pads",
    caption: "Quiet cove",
    orientation: "portrait",
  },
  {
    src: `${base}images/expanding/1.jpg`,
    alt: "Low sun glowing across a forest lake through pine trees",
    caption: "Lakeside glow",
  },
  {
    src: `${base}images/expanding/2.jpg`,
    alt: "Sunlit forest trees with warm lens flare",
    caption: "Sunlit forest flare",
  },
  {
    src: `${base}images/expanding/3.jpg`,
    alt: "Yellow autumn leaf on a pine-needle forest floor",
    caption: "Autumn leaf on forest floor",
  },
];

const componentSnippet = `<script setup lang="ts">
import { VdImageBox, type VdImageItem } from '@vanduo-oss/vd3';

const items: VdImageItem[] = [
  { src: '/photos/ridge.jpg', alt: 'Ridge', caption: 'Ridge light' },
  { src: '/photos/cliff.jpg', alt: 'Cliff', caption: 'Cliff path', orientation: 'portrait' },
];
<\/script>

<template>
  <VdImageBox :items="items" layout="masonry" :columns="3" ratio="4-3" caption-display="overlay" />
</template>`;

const composableSnippet = `import { ref } from 'vue';
import { useImageBox } from '@vanduo-oss/vd3';

const root = ref<HTMLElement | null>(null);
const box = useImageBox(root);

// box.open(), box.next(), box.prev(), box.close(), box.refresh()
root.value?.addEventListener('imageBox:change', (event) => {
  console.log(event.detail.index, event.detail.total);
});`;
</script>

<template>
  <section id="image-box">
    <h5 class="demo-title">
      <i class="ph ph-image-square"></i>Image galleries
    </h5>
    <p class="vd-mb-8">
      <code>VdImageBox</code> lays thumbnails out as a grid, masonry, bento, or
      filmstrip and opens a shared lightbox. Arrow keys, on-screen controls, and
      the <code>useImageBox</code> controller move through images that share a
      group. Escape or a backdrop click closes it and returns focus to the
      thumbnail.
    </p>

    <div class="vd-card vd-card-glow demo-card vd-mb-6">
      <div class="vd-card-header"><h6>Grid</h6></div>
      <div class="vd-card-body">
        <VdImageBox
          :items="items"
          layout="grid"
          :columns="3"
          ratio="4-3"
          caption-display="below"
          group="grid"
        />
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mb-6">
      <div class="vd-card-header"><h6>Masonry</h6></div>
      <div class="vd-card-body">
        <VdImageBox
          :items="items"
          layout="masonry"
          :columns="3"
          ratio="auto"
          caption-display="overlay"
          group="masonry"
        />
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mb-6">
      <div class="vd-card-header"><h6>Bento</h6></div>
      <div class="vd-card-body">
        <VdImageBox
          :items="items.slice(0, 5)"
          layout="bento"
          ratio="4-3"
          group="bento"
        />
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mb-6">
      <div class="vd-card-header"><h6>Filmstrip</h6></div>
      <div class="vd-card-body">
        <VdImageBox
          :items="items"
          layout="filmstrip"
          ratio="16-9"
          group="filmstrip"
        />
      </div>
    </div>
    <DocCodeSnippet :vue="componentSnippet" />

    <div class="vd-card vd-card-glow demo-card vd-mt-6" ref="root">
      <div class="vd-card-header"><h6>Composable triggers</h6></div>
      <div class="vd-card-body">
        <p class="vd-mb-4">
          Any element with <code>data-image-box</code> inside the root opens the
          same viewer. You can also launch the viewer programmatically with
          <code>box.open(index)</code>, call <code>refresh()</code> after adding
          images dynamically, or step an open viewer with <code>next()</code> /
          <code>prev()</code>.
        </p>
        <div class="vd-inline" data-gap="fib-8">
          <img
            src="/images/forest-boardwalk.jpg"
            alt="Wooden boardwalk trail through a sunlit pine forest"
            class="vd-rounded-md"
            data-image-box
            data-image-box-group="manual"
            data-image-box-caption="Pine forest boardwalk"
            style="width: 160px; height: 110px; object-fit: cover"
          />
          <img
            src="/images/expanding/4.jpg"
            alt="White reindeer moss and lichen on a forest floor"
            class="vd-rounded-md"
            data-image-box
            data-image-box-group="manual"
            data-image-box-caption="White reindeer moss"
            aria-label="View the reindeer moss"
            style="width: 160px; height: 110px; object-fit: cover"
          />
        </div>
        <div class="vd-inline vd-mt-4" data-gap="fib-8">
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            @click="box.open(0)"
          >
            <i class="ph ph-arrows-out-simple"></i> Open first image
          </button>
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            @click="box.open(1)"
          >
            <i class="ph ph-arrows-out-simple"></i> Open second image
          </button>
        </div>
      </div>
    </div>
    <DocCodeSnippet :js="composableSnippet" />

    <div class="vd-card vd-card-glow demo-card vd-mt-6">
      <div class="vd-card-header"><h6>VdImageBox Props</h6></div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>src</code></td>
                <td><code>string</code></td>
                <td><code>""</code></td>
                <td>
                  Single-image thumbnail source when <code>items</code> is
                  omitted.
                </td>
              </tr>
              <tr>
                <td><code>fullSrc</code></td>
                <td><code>string</code></td>
                <td><code>""</code></td>
                <td>
                  High-resolution lightbox image URL for single-image mode
                  (falls back to <code>src</code>).
                </td>
              </tr>
              <tr>
                <td><code>alt</code></td>
                <td><code>string</code></td>
                <td><code>""</code></td>
                <td>Accessible text description for single-image mode.</td>
              </tr>
              <tr>
                <td><code>caption</code></td>
                <td><code>string</code></td>
                <td><code>""</code></td>
                <td>Caption text for single-image mode.</td>
              </tr>
              <tr>
                <td><code>items</code></td>
                <td><code>VdImageItem[]</code></td>
                <td><code>[]</code></td>
                <td>
                  Array of gallery image descriptors. Overrides single-image
                  props when non-empty.
                </td>
              </tr>
              <tr>
                <td><code>layout</code></td>
                <td>
                  <code
                    >"grid" | "masonry" | "bento" | "filmstrip" | "single"</code
                  >
                </td>
                <td>
                  <code>"grid"</code> (or <code>"single"</code> for 1 item)
                </td>
                <td>Gallery arrangement layout.</td>
              </tr>
              <tr>
                <td><code>columns</code></td>
                <td><code>2 | 3 | 4</code></td>
                <td><code>3</code></td>
                <td>
                  Column count for <code>grid</code> and
                  <code>masonry</code> layouts (sets
                  <code>--vd-image-box-columns</code>).
                </td>
              </tr>
              <tr>
                <td><code>gap</code></td>
                <td><code>"fib-5" | "fib-8" | "fib-13" | "fib-21"</code></td>
                <td><code>"fib-13"</code></td>
                <td>
                  Fibonacci spacing token applied via <code>data-gap</code>.
                </td>
              </tr>
              <tr>
                <td><code>ratio</code></td>
                <td>
                  <code
                    >"auto" | "1-1" | "4-3" | "16-9" | "3-4" | "golden"</code
                  >
                </td>
                <td><code>"auto"</code></td>
                <td>
                  Thumbnail aspect ratio applied via <code>data-ratio</code>.
                </td>
              </tr>
              <tr>
                <td><code>captionDisplay</code></td>
                <td><code>"lightbox" | "overlay" | "below"</code></td>
                <td><code>"lightbox"</code></td>
                <td>
                  Where captions appear: only inside the lightbox, as a
                  thumbnail hover overlay, or below each thumbnail.
                </td>
              </tr>
              <tr>
                <td><code>group</code></td>
                <td><code>string</code></td>
                <td><code>""</code></td>
                <td>
                  Lightbox group name stamped on
                  <code>data-image-box-group</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mt-6">
      <div class="vd-card-header"><h6>VdImageItem Interface</h6></div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>src</code></td>
                <td><code>string</code></td>
                <td>Yes</td>
                <td>Thumbnail image URL.</td>
              </tr>
              <tr>
                <td><code>fullSrc</code></td>
                <td><code>string</code></td>
                <td>No</td>
                <td>
                  Optional full-size image URL loaded when the lightbox opens
                  (defaults to <code>src</code>).
                </td>
              </tr>
              <tr>
                <td><code>alt</code></td>
                <td><code>string</code></td>
                <td>No</td>
                <td>
                  Accessible alt text copied to both the thumbnail and lightbox
                  <code>&lt;img&gt;</code>.
                </td>
              </tr>
              <tr>
                <td><code>caption</code></td>
                <td><code>string</code></td>
                <td>No</td>
                <td>
                  Caption shown in the lightbox and optionally in
                  <code>overlay</code> or <code>below</code> mode.
                </td>
              </tr>
              <tr>
                <td><code>orientation</code></td>
                <td><code>"landscape" | "portrait" | "square"</code></td>
                <td>No</td>
                <td>
                  Stamps <code>data-orientation</code> on the thumbnail for
                  layout hints.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mt-6">
      <div class="vd-card-header">
        <h6>useImageBox(root, options) Composable &amp; Controller</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table">
            <thead>
              <tr>
                <th>Member / Attribute / Event</th>
                <th>Signature / Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>options.scrollThreshold</code></td>
                <td><code>number</code> (default <code>50</code>)</td>
                <td>
                  Window scroll distance in pixels before an open lightbox
                  automatically closes.
                </td>
              </tr>
              <tr>
                <td><code>open(target?)</code></td>
                <td><code>(target?: HTMLElement | number) =&gt; void</code></td>
                <td>
                  Opens the lightbox for the given trigger element or zero-based
                  index (defaults to <code>0</code>).
                </td>
              </tr>
              <tr>
                <td><code>close()</code></td>
                <td><code>() =&gt; void</code></td>
                <td>
                  Closes the active lightbox and restores focus to the trigger.
                </td>
              </tr>
              <tr>
                <td><code>next()</code> / <code>prev()</code></td>
                <td><code>() =&gt; void</code></td>
                <td>
                  Steps forward or backward within the active image group (wraps
                  around).
                </td>
              </tr>
              <tr>
                <td><code>refresh()</code></td>
                <td><code>() =&gt; void</code></td>
                <td>
                  Re-scans <code>root</code> for newly inserted
                  <code>[data-image-box]</code> triggers.
                </td>
              </tr>
              <tr>
                <td><code>data-image-box</code></td>
                <td>Trigger attribute</td>
                <td>
                  Marks an element inside <code>root</code> as a lightbox
                  trigger.
                </td>
              </tr>
              <tr>
                <td><code>data-image-box-full-src</code></td>
                <td><code>string</code></td>
                <td>
                  Optional high-resolution image URL for the lightbox viewer.
                </td>
              </tr>
              <tr>
                <td><code>data-image-box-caption</code></td>
                <td><code>string</code></td>
                <td>
                  Caption text shown in the lightbox (falls back to
                  <code>alt</code>).
                </td>
              </tr>
              <tr>
                <td><code>data-image-box-group</code></td>
                <td><code>string</code></td>
                <td>
                  Groups triggers inside the same root so arrow keys and
                  next/prev step through them together.
                </td>
              </tr>
              <tr>
                <td><code>data-orientation</code></td>
                <td><code>"landscape" | "portrait" | "square"</code></td>
                <td>
                  Optional aspect-orientation hint on the trigger element.
                </td>
              </tr>
              <tr>
                <td><code>imageBox:open</code></td>
                <td><code>CustomEvent&lt;{ src: string }&gt;</code></td>
                <td>
                  Bubbles from the trigger element when the lightbox opens.
                </td>
              </tr>
              <tr>
                <td><code>imageBox:close</code></td>
                <td><code>CustomEvent</code></td>
                <td>
                  Bubbles from the trigger element when the lightbox closes.
                </td>
              </tr>
              <tr>
                <td><code>imageBox:change</code></td>
                <td>
                  <code
                    >CustomEvent&lt;{ index: number, total: number, src: string,
                    trigger: HTMLElement }&gt;</code
                  >
                </td>
                <td>
                  Bubbles from the active trigger when opening or stepping
                  through a group.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mt-6">
      <div class="vd-card-header"><h6>CSS Classes &amp; Variables</h6></div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table">
            <thead>
              <tr>
                <th>Selector / Variable</th>
                <th>Default / Scope</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>.vd-image-gallery</code></td>
                <td>Gallery container</td>
                <td>Base wrapper rendered by <code>VdImageBox</code>.</td>
              </tr>
              <tr>
                <td>
                  <code
                    >.vd-image-gallery-{grid|masonry|bento|filmstrip|single}</code
                  >
                </td>
                <td>Layout modifier</td>
                <td>
                  Selects the grid, CSS column masonry, 5-tile bento, horizontal
                  filmstrip, or single-image layout.
                </td>
              </tr>
              <tr>
                <td><code>.vd-image-box-trigger</code></td>
                <td>Trigger element</td>
                <td>
                  Added automatically to initialized
                  <code>[data-image-box]</code> elements; receives
                  <code>.is-active</code> while selected and
                  <code>.is-broken</code> if image loading fails.
                </td>
              </tr>
              <tr>
                <td><code>.vd-image-box-backdrop</code></td>
                <td>Shared dialog overlay</td>
                <td>
                  Ref-counted modal backdrop appended to
                  <code>document.body</code>; toggled with
                  <code>.is-visible</code>.
                </td>
              </tr>
              <tr>
                <td><code>--vd-image-box-max-width</code></td>
                <td><code>85vw</code></td>
                <td>
                  Maximum width of the enlarged image inside the lightbox.
                </td>
              </tr>
              <tr>
                <td><code>--vd-image-box-max-height</code></td>
                <td><code>85vh</code></td>
                <td>
                  Maximum height of the enlarged image inside the lightbox.
                </td>
              </tr>
              <tr>
                <td><code>--vd-image-box-columns</code></td>
                <td><code>3</code></td>
                <td>
                  Number of columns in <code>grid</code> and
                  <code>masonry</code> galleries.
                </td>
              </tr>
              <tr>
                <td><code>--vd-image-box-gap</code></td>
                <td><code>var(--vd-space-fib-13)</code></td>
                <td>
                  Grid and filmstrip gap token controlled by
                  <code>data-gap</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mt-6">
      <div class="vd-card-header"><h6>Accessibility</h6></div>
      <div class="vd-card-body">
        <ul>
          <li>
            The shared lightbox backdrop renders with
            <code>role="dialog"</code>, <code>aria-modal="true"</code>, and
            <code>aria-label="Image viewer"</code>.
          </li>
          <li>
            <code>useFocusTrap</code> traps <code>Tab</code> and
            <code>Shift+Tab</code> within the open viewer, and pressing
            <code>Escape</code> (or clicking the close button / backdrop) closes
            the dialog and restores focus to the trigger that opened it.
          </li>
          <li>
            <code>ArrowLeft</code> and <code>ArrowRight</code> step backward and
            forward through triggers sharing the same
            <code>data-image-box-group</code>, updating the
            <code>aria-live="polite"</code> counter
            (<code>.vd-image-box-counter</code>) and setting
            <code>aria-current="true"</code> on the active thumbnail.
          </li>
          <li>
            Non-interactive triggers (such as <code>&lt;img&gt;</code>) receive
            <code>role="button"</code>, <code>tabindex="0"</code>, keyboard
            activation on <code>Enter</code> / <code>Space</code>, and a default
            <code>aria-label="View enlarged image"</code> while preserving any
            custom <code>aria-label</code> already provided on the element.
          </li>
          <li>
            Broken thumbnail images automatically receive the
            <code>.is-broken</code>
            fallback class on load error so failed assets stay visually
            identifiable.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Keep gallery thumbnails in a single block flex column so below-captions
   never overlap the next grid row, and scale column count on narrow screens. */
:deep(.vd-image-box-figure) {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

:deep(.vd-image-box-thumb) {
  height: auto;
  border-radius: var(--vd-radius-md);
}

:deep(
  .vd-image-gallery-bento .vd-image-box-figure:first-child .vd-image-box-thumb
) {
  flex: 1 1 auto;
  height: 100%;
}

:deep(.vd-image-box-caption-below) {
  line-height: 1.35;
  overflow-wrap: anywhere;
}

@media (max-width: 767.98px) {
  :deep(.vd-image-gallery-grid),
  :deep(.vd-image-gallery-bento) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  :deep(.vd-image-gallery-masonry) {
    columns: 2;
  }

  :deep(.vd-image-gallery-filmstrip .vd-image-box-figure) {
    flex: 0 0 72%;
  }
}

@media (max-width: 479.98px) {
  :deep(.vd-image-gallery-grid) {
    grid-template-columns: minmax(0, 1fr);
  }

  :deep(.vd-image-gallery-masonry) {
    columns: 1;
  }
}
</style>
