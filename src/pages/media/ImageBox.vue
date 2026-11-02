<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdImageBox, useImageBox, type VdImageItem } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
const box = useImageBox(root);

const items: VdImageItem[] = [
  {
    src: "/images/mountains-and-fog.jpg",
    alt: "Mountains above a fog bank",
    caption: "Ridge light",
  },
  {
    src: "/images/expanding/0.jpg",
    alt: "Coastal cliffs",
    caption: "Cliff path",
    orientation: "portrait",
  },
  {
    src: "/images/expanding/1.jpg",
    alt: "Forest canopy",
    caption: "Canopy",
  },
  {
    src: "/images/expanding/2.jpg",
    alt: "Desert dunes",
    caption: "Dunes",
  },
  {
    src: "/images/expanding/3.jpg",
    alt: "Lake reflection",
    caption: "Still water",
  },
  {
    src: "/images/expanding/4.jpg",
    alt: "Night city",
    caption: "Night city",
    orientation: "landscape",
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
          same viewer. Call <code>refresh()</code> after adding images, and
          <code>next()</code> / <code>prev()</code> to step the open group.
        </p>
        <div class="vd-inline" data-gap="fib-8">
          <img
            src="/images/expanding/1.jpg"
            alt="Forest canopy"
            data-image-box
            data-image-box-group="manual"
            data-image-box-caption="Canopy"
            style="width: 160px; height: 110px; object-fit: cover"
          />
          <img
            src="/images/expanding/2.jpg"
            alt="Desert dunes"
            data-image-box
            data-image-box-group="manual"
            data-image-box-caption="Dunes"
            aria-label="View the dunes"
            style="width: 160px; height: 110px; object-fit: cover"
          />
        </div>
        <div class="vd-mt-4">
          <button
            type="button"
            class="vd-btn vd-btn-outline"
            @click="box.next()"
          >
            Next open image
          </button>
        </div>
      </div>
    </div>
    <DocCodeSnippet :js="composableSnippet" />

    <div class="vd-card demo-card vd-mt-6">
      <div class="vd-card-header"><h6>Layouts and lightbox</h6></div>
      <div class="vd-card-body">
        <ul>
          <li>
            <code>layout</code>: <code>grid</code>, <code>masonry</code>,
            <code>bento</code>, <code>filmstrip</code>, or <code>single</code>.
          </li>
          <li>
            <code>columns</code> is 2, 3, or 4. <code>ratio</code> is
            <code>auto</code>, <code>1-1</code>, <code>4-3</code>,
            <code>16-9</code>, <code>3-4</code>, or <code>golden</code>.
          </li>
          <li>
            <code>caption-display</code>: <code>lightbox</code>,
            <code>overlay</code>, or <code>below</code>.
          </li>
          <li>
            The viewer caps images at
            <code>--vd-image-box-max-width: 85vw</code> and <code>85vh</code>.
            Tab stays inside the dialog. Arrow keys move within the group and
            dispatch <code>imageBox:change</code> with
            <code>{ index, total, src, trigger }</code>.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
