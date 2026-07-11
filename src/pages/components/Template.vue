<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const pageHtml = `<!-- Page skeleton: navbar + main + footer -->
<header class="vd-navbar">
  <div class="vd-navbar-container">
    <a href="/" class="vd-navbar-brand">Brand</a>
    <nav class="vd-navbar-nav">
      <a href="/docs" class="vd-nav-link">Docs</a>
      <a href="/about" class="vd-nav-link">About</a>
    </nav>
  </div>
</header>

<main class="vd-container vd-py-8">
  <h1>Page title</h1>
  <p>Page content goes here.</p>
</main>

<footer class="vd-footer">
  <div class="vd-footer-container">
    <p>&copy; 2026 Brand</p>
  </div>
</footer>`;

const cardGridHtml = `<!-- Card grid using grid primitives -->
<div class="vd-grid vd-grid-cols-3 vd-gap-5">
  <div class="vd-card"><div class="vd-card-body">One</div></div>
  <div class="vd-card"><div class="vd-card-body">Two</div></div>
  <div class="vd-card"><div class="vd-card-body">Three</div></div>
</div>`;

const stackHtml = `<!-- Vertical stack with consistent spacing -->
<div class="vd-stack vd-stack-4">
  <h2>Section heading</h2>
  <p>First paragraph.</p>
  <p>Second paragraph.</p>
</div>

<!-- Horizontal inline row -->
<div class="vd-inline vd-gap-3">
  <span class="vd-badge">New</span>
  <span class="vd-badge">v1.6</span>
</div>`;

const heroHtml = `<!-- Hero: glass panel with a heading + CTA -->
<section class="vd-hero vd-glass">
  <div class="vd-hero-content">
    <h1>Vanduo Framework</h1>
    <p>Essential just like water is.</p>
    <a href="/docs" class="vd-btn vd-btn-primary vd-btn-lg">Get started</a>
  </div>
</section>`;

const splitLayoutHtml = `<!-- Two-column split: sidebar + content -->
<div class="vd-row vd-gap-6">
  <aside class="vd-col-12 vd-col-md-3">
    <nav>…sidebar…</nav>
  </aside>
  <section class="vd-col-12 vd-col-md-9">
    …main content…
  </section>
</div>`;
</script>

<template>
  <section id="template">
    <h5 class="demo-title"><i class="ph ph-layout"></i>Template</h5>
    <p class="vd-mb-8">
      Common layout templates built from Vanduo primitives. These are pure
      markup patterns — no JavaScript, no special build step. Copy and adapt
      them as starting points for your own pages.
    </p>

    <!-- Page skeleton -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Page skeleton (navbar + main + footer)</h6>
          </div>
          <div class="vd-card-body">
            <header class="vd-navbar vd-glass">
              <div class="vd-navbar-container">
                <a href="#" class="vd-navbar-brand">Brand</a>
                <nav class="vd-navbar-nav">
                  <a href="#" class="vd-nav-link">Docs</a>
                  <a href="#" class="vd-nav-link">About</a>
                </nav>
              </div>
            </header>
            <main class="vd-container" style="padding: 2rem 1rem">
              <h1>Page title</h1>
              <p>Page content goes here.</p>
            </main>
            <footer class="vd-footer vd-mt-5">
              <div class="vd-footer-container">
                <p>&copy; 2026 Brand</p>
              </div>
            </footer>
          </div>
        </div>
        <DocCodeSnippet :html="pageHtml" />
      </div>
    </div>

    <!-- Hero -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Hero</h6></div>
          <div class="vd-card-body">
            <section
              class="vd-glass"
              style="
                padding: 3rem 2rem;
                border-radius: 1rem;
                text-align: center;
              "
            >
              <h1 style="margin-bottom: 0.5rem">Vanduo Framework</h1>
              <p style="margin-bottom: 1.5rem; color: var(--vd-text-muted)">
                Essential just like water is.
              </p>
              <a href="#" class="vd-btn vd-btn-primary vd-btn-lg"
                >Get started</a
              >
            </section>
          </div>
        </div>
        <DocCodeSnippet :html="heroHtml" />
      </div>
    </div>

    <!-- Split layout -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Two-column split (sidebar + content)</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-row vd-gap-6">
              <aside class="vd-col-12 vd-col-md-3">
                <div class="vd-card">
                  <div class="vd-card-body">Sidebar</div>
                </div>
              </aside>
              <section class="vd-col-12 vd-col-md-9">
                <div class="vd-card">
                  <div class="vd-card-body">Main content</div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="splitLayoutHtml" />
      </div>
    </div>

    <!-- Card grid + stack -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Card grid</h6></div>
          <div class="vd-card-body">
            <div class="vd-grid vd-grid-cols-3 vd-gap-3">
              <div class="vd-card"><div class="vd-card-body">One</div></div>
              <div class="vd-card"><div class="vd-card-body">Two</div></div>
              <div class="vd-card"><div class="vd-card-body">Three</div></div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="cardGridHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Stack &amp; inline</h6></div>
          <div class="vd-card-body">
            <div class="vd-stack vd-stack-4">
              <h2>Section heading</h2>
              <p>First paragraph.</p>
              <p>Second paragraph.</p>
            </div>
            <div class="vd-inline vd-gap-3 vd-mt-4">
              <span class="vd-badge">New</span>
              <span class="vd-badge">v1.6</span>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="stackHtml" />
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-info"></i> Notes</h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>
                All templates use existing tokens (<code>--vd-color-*</code>,
                <code>--vd-scale-*</code>) — no new tokens required.
              </li>
              <li>
                Layout primitives (<code>.vd-grid</code>,
                <code>.vd-stack</code>, <code>.vd-inline</code>) come from
                <code>css/primitives/primitives.css</code>.
              </li>
              <li>
                Replace the placeholder content; the layout shells are
                framework-agnostic.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
