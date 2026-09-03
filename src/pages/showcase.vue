<script setup lang="ts">
import ShowcaseProjectRow from "@/components/showcase/ShowcaseProjectRow.vue";

const base = import.meta.env.BASE_URL;

interface ShowcaseProject {
  id: string;
  title: string;
  icon?: string;
  /** Local brand SVG; theme-recolored via CSS mask in ShowcaseProjectRow. */
  iconSrc?: string;
  blurb: string;
  image: string;
  imageDark: string;
  imageAlt: string;
  demoUrl: string;
  repoUrl: string;
  urlChip: string;
  tags: string[];
}

/** Newest at bottom: Spindrift Chess → Ikigai → Scriptman Fighters. */
const projects: ShowcaseProject[] = [
  {
    id: "spindrift-chess",
    title: "Spindrift Chess",
    iconSrc: `${base}images/showcase/spindrift-rook.svg`,
    blurb:
      "Browser chess on vd3 — human vs the Spindrift Engine in a Web Worker, with themes, strength levels, and move history. Fully static-hosted; no server required.",
    image: `${base}images/showcase/spindrift-chess.png`,
    imageDark: `${base}images/showcase/spindrift-chess-dark.png`,
    imageAlt:
      "Spindrift Chess — browser chess board and controls built with vd3",
    demoUrl: "https://spindriftchess.online",
    repoUrl: "https://github.com/Nostromo-618/spindrift-chess",
    urlChip: "spindriftchess.online",
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
  {
    id: "scriptman-fighters",
    title: "Scriptman Fighters",
    icon: "code",
    blurb:
      "A fighting game where you write JavaScript to control AI fighters — vd3 UI plus the vd3-cbun code editor for custom scripts. Fully static-hosted.",
    image: `${base}images/showcase/scriptman-fighters.png`,
    imageDark: `${base}images/showcase/scriptman-fighters-dark.png`,
    imageAlt: "Scriptman Fighters — arena and match controls built with vd3",
    demoUrl: "https://nostromo-618.github.io/scriptman-fighters/",
    repoUrl: "https://github.com/Nostromo-618/scriptman-fighters",
    urlChip: "nostromo-618.github.io/scriptman-fighters",
    tags: ["vd3", "vd3-cbun/code-editor"],
  },
];
</script>

<template>
  <section id="showcase">
    <div class="about-header">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-projector-screen"></i> Showcase
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Real apps built with <code>@vanduo-oss/vd3</code> — live demos, source
          on GitHub.
        </p>
      </div>
    </div>

    <div class="vd-container-responsive showcase-intro">
      <p>
        These projects dogfood the design system in the wild: chess runs on core
        vd3 alone; Ikigai and Scriptman Fighters also pull in optional CBUN
        packages (flowchart and code editor). Open a live demo or jump straight
        to the repo.
      </p>
    </div>

    <div class="vd-container-responsive showcase-list">
      <ShowcaseProjectRow
        v-for="(project, index) in projects"
        :key="project.id"
        :title="project.title"
        :icon="project.icon"
        :icon-src="project.iconSrc"
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
  padding-block: 3.5rem 1rem;
  max-width: 48rem;
  margin-inline: auto;
}

.showcase-intro p {
  margin: 0;
  line-height: 1.65;
}

.showcase-list {
  padding-bottom: 4rem;
}
</style>
