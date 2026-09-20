<script setup lang="ts">
import { useNavigation } from "@/navigation";

const { pending, slow, failure } = useNavigation();
</script>

<template>
  <div
    v-if="slow"
    class="doc-navigation-progress"
    role="progressbar"
    aria-label="Loading page"
  ></div>
  <span class="vd-visually-hidden" role="status" aria-live="polite">
    {{ slow && pending ? `Loading ${pending.meta.title ?? "page"}…` : "" }}
  </span>
  <div v-if="failure" class="doc-navigation-error" role="alert">
    Couldn’t load {{ failure.title }}. Check your connection and
    <a :href="failure.href">reload the page</a>.
  </div>
</template>
