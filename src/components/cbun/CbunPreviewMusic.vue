<script setup lang="ts">
import { VdMusicPlayer } from "@vanduo-oss/vd3-cbun/music-player";

defineProps<{ fullscreen?: boolean }>();

const base = import.meta.env.BASE_URL;

const tracks = [
  {
    name: "Pale Blue Dot",
    url: `${base}music/Stellardrone/Invent the Universe/06 - Pale Blue Dot.mp3`,
  },
  {
    name: "Maia Nebula",
    url: `${base}music/Stellardrone/Invent the Universe/03 - Maia Nebula.mp3`,
  },
  {
    name: "Approaching the Heliopause",
    url: `${base}music/Stellardrone/Invent the Universe/04 - Approaching the Heliopause.mp3`,
  },
];
</script>

<template>
  <div class="cbun-music-wrap" :class="{ 'is-fullscreen': fullscreen }">
    <VdMusicPlayer
      :tracks="tracks"
      :options="{ showProgress: true, showPlaylist: true }"
    />
  </div>
</template>

<style scoped>
.cbun-music-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: 0.5rem;
}

.cbun-music-wrap.is-fullscreen {
  min-height: 100%;
  height: 100%;
}
</style>
