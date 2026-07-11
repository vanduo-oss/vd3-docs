<template>
  <section
    id="not-found"
    class="vd-stack vd-stack-xl vd-center vd-pad-2xl"
    style="min-height: 50vh; text-align: center"
  >
    <p
      class="vd-text-muted"
      style="font-size: 5rem; font-weight: 700; line-height: 1; margin: 0"
      aria-hidden="true"
    >
      404
    </p>
    <h1 class="vd-h2" style="margin: 0">Page not found</h1>
    <p class="vd-muted" style="max-width: 32rem">
      That URL doesn't exist on vanduo.dev. Try the docs, search, or head back
      home.
    </p>
    <div
      class="vd-d-flex vd-gap-3 vd-flex-wrap vd-justify-content-center vd-mt-4"
    >
      <RouterLink to="/" class="vd-btn vd-btn-primary">
        <i class="ph ph-house" aria-hidden="true"></i> Home
      </RouterLink>
      <RouterLink to="/guides/getting-started" class="vd-btn vd-btn-outline">
        <i class="ph ph-rocket" aria-hidden="true"></i> Getting Started
      </RouterLink>
      <RouterLink to="/docs-landing" class="vd-btn vd-btn-outline">
        <i class="ph ph-book" aria-hidden="true"></i> Documentation
      </RouterLink>
    </div>
    <p class="vd-text-sm vd-text-muted vd-mt-6">
      Use the search icon in the navbar to find a page.
    </p>
  </section>
</template>
