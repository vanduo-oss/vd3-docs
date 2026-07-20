<script setup lang="ts">
// Static content page — a plain-language overview of the vd3 line of Vanduo UI.
</script>

<template>
  <section id="about">
    <!-- Page Header -->
    <div class="about-header">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-compass"></i> About
        </h2>
        <p class="vd-text-lg vd-text-muted">
          What vd3 UI is, and the ideas behind it
        </p>
      </div>
    </div>

    <!-- Overview -->
    <div class="about-intro">
      <div class="about-intro-inner">
        <h3 class="about-intro-title">vd3 UI</h3>
        <p class="about-intro-subtitle">
          A Vue 3 design system and component library
        </p>

        <hr class="about-divider" />

        <div class="about-intro-body">
          <h3>What it is</h3>
          <p>
            vd3 UI is the standalone Vue&nbsp;3 design system and component
            library of Vanduo. It ships everything in a single package — design
            tokens, a full CSS layer, and typed
            <code>&lt;Vd*&gt;</code> components with matching
            <code>useX</code> composables. Its only dependency is Vue itself.
          </p>
          <p>
            You install one package, register a plugin, import the stylesheet,
            and start using components. There is no separate state library, no
            build-time runtime, and no global setup to wire up first.
          </p>

          <hr class="about-divider" />

          <h3>How it's built</h3>
          <ul>
            <li>
              <strong>One package, one dependency.</strong>
              <code>@vanduo-oss/vd3</code> needs only Vue&nbsp;3 (>=&nbsp;3.3) —
              no Pinia and no extra runtime.
            </li>
            <li>
              <strong>One source of truth for design.</strong> Colour, spacing,
              radius, and type all come from a single set of tokens, so the look
              stays consistent across every component. The scales are based on
              Fibonacci / golden-ratio proportions.
            </li>
            <li>
              <strong>Theming is built in.</strong> A few <code>data-*</code>
              attributes switch palette, primary colour, radius, font, and light
              or dark mode, and the choice persists between visits.
            </li>
            <li>
              <strong>Works with server-side rendering.</strong> Browser access
              is guarded throughout, so components render cleanly under SSR —
              the site you're reading is built that way.
            </li>
          </ul>

          <hr class="about-divider" />

          <h3>What you get</h3>
          <ul>
            <li>
              More than 50 <code>&lt;Vd*&gt;</code> components — forms, data
              display, navigation, feedback, layout primitives, and theme
              controls.
            </li>
            <li>
              Around 35 composables for things like dropdowns, toasts,
              validation, scrolling, and drag-and-drop.
            </li>
            <li>
              A separate <code>@vanduo-oss/vd3-cbun</code> bundle adding charts,
              a flowchart editor, hex grids, and a music player.
            </li>
          </ul>

          <hr class="about-divider" />

          <h3>Open source</h3>
          <p>
            vd3 is MIT-licensed and free to use. The source is public on
            <a
              href="https://github.com/vanduo-oss"
              target="_blank"
              rel="noopener noreferrer"
              >GitHub</a
            >, and these docs are themselves built with the real components.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-intro {
  padding: 4rem 0 3rem;
  background: linear-gradient(
    180deg,
    var(--vd-bg-primary) 0%,
    var(--vd-bg-secondary) 100%
  );
}

.about-intro-inner {
  max-width: 820px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.about-intro-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vd-color-primary);
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.about-intro-subtitle {
  font-size: 1.1rem;
  color: var(--vd-text-muted);
  text-align: center;
  font-style: italic;
  margin-bottom: 2.5rem;
}

.about-divider {
  width: 80px;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--vd-color-primary),
    var(--vd-color-info)
  );
  border: none;
  margin: 2.5rem auto;
  border-radius: 2px;
}

.about-intro-body p {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--vd-text-secondary);
  margin-bottom: 1.25rem;
}

.about-intro-body h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vd-color-primary);
  margin-top: 0;
  margin-bottom: 1rem;
}

.about-intro-body strong {
  color: var(--vd-text-primary);
}

.about-intro-body em {
  color: var(--vd-text-primary);
  font-style: italic;
}

.about-intro-body a {
  color: var(--vd-color-primary);
  text-decoration: underline;
}

.about-intro-body ul {
  list-style: none;
  padding: 0;
  margin: 1.25rem 0;
}

.about-intro-body ul li {
  position: relative;
  padding-left: 1.75rem;
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--vd-text-secondary);
}

.about-intro-body ul li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--vd-color-primary),
    var(--vd-color-info)
  );
}

@media (max-width: 767.98px) {
  .about-intro-title {
    font-size: 1.75rem;
  }

  .about-intro-subtitle {
    font-size: 0.95rem;
  }

  .about-intro-body p,
  .about-intro-body ul li {
    font-size: 0.95rem;
  }

  .about-intro-body h3 {
    font-size: 1.2rem;
  }
}
</style>
