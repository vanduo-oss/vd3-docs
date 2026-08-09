<script setup lang="ts">
import ShowcaseProjectRow from "@/components/showcase/ShowcaseProjectRow.vue";

const base = import.meta.env.BASE_URL;

interface ShowcaseProject {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  image: string;
  imageDark: string;
  imageAlt: string;
  demoUrl: string;
  repoUrl: string;
  urlChip: string;
  tags: string[];
}

/** Alphabetical order: Aurora Polaris Chess → Ikigai. */
const projects: ShowcaseProject[] = [
  {
    id: "aurora-polaris-chess",
    title: "Aurora Polaris Chess",
    icon: "strategy",
    blurb:
      "A casual FOSS browser chess app on vd3 — play Aurora Polaris or TomitankChess in a Web Worker, with themes, move history, and engine-match mode. Fully static-hosted; no server required.",
    image: `${base}images/showcase/aurora-polaris-chess.png`,
    imageDark: `${base}images/showcase/aurora-polaris-chess-dark.png`,
    imageAlt:
      "Aurora Polaris Chess — browser chess board and controls built with vd3",
    demoUrl: "https://nostromo-618.github.io/aurora-polaris-chess/",
    repoUrl: "https://github.com/Nostromo-618/aurora-polaris-chess",
    urlChip: "nostromo-618.github.io/aurora-polaris-chess",
    tags: ["vd3"],
  },
  {
    id: "ikigai",
    title: "Ikigai",
    icon: "circles-three",
    blurb:
      "An interactive Ikigai purpose map using vd3 plus the CBUN flowchart canvas — rearrange tiles, export PNG/SVG/HTML, read the philosophy, and take the Ikigai-9 quiz. Map data stays in this browser only.",
    image: `${base}images/showcase/ikigai.png`,
    imageDark: `${base}images/showcase/ikigai-dark.png`,
    imageAlt:
      "Ikigai — interactive purpose map powered by vd3 and vd3-cbun flowchart",
    demoUrl: "https://nostromo-618.github.io/ikigai/",
    repoUrl: "https://github.com/Nostromo-618/ikigai",
    urlChip: "nostromo-618.github.io/ikigai",
    tags: ["vd3", "vd3-cbun/flowchart"],
  },
];
</script>

<template>
  <section id="showcase">
    <div class="about-header">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-images"></i> Showcase
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Real apps built with <code>@vanduo-oss/vd3</code> — live demos on
          GitHub Pages, source on GitHub.
        </p>
      </div>
    </div>

    <div class="vd-container-responsive showcase-intro">
      <p>
        These projects dogfood the design system in the wild: chess runs on core
        vd3 alone; Ikigai also pulls in the optional CBUN flowchart. Open a live
        demo or jump straight to the repo.
      </p>
    </div>

    <div class="vd-container-responsive showcase-list">
      <ShowcaseProjectRow
        v-for="(project, index) in projects"
        :key="project.id"
        :title="project.title"
        :icon="project.icon"
        :blurb="project.blurb"
        :image-src="project.image"
        :image-src-dark="project.imageDark"
        :image-alt="project.imageAlt"
        :demo-url="project.demoUrl"
        :repo-url="project.repoUrl"
        :url-chip="project.urlChip"
        :tags="project.tags"
        :reversed="index % 2 === 1"
      />
    </div>
  </section>
</template>

<style scoped>
.showcase-intro {
  padding: 3.5rem 0 1rem;
  max-width: 48rem;
}

.showcase-intro p {
  margin: 0;
  line-height: 1.65;
}

.showcase-list {
  padding-bottom: 4rem;
}
</style>
