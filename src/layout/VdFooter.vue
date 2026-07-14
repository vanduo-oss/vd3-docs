<script setup lang="ts">
import { RouterLink } from "vue-router";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Docs", to: "/docs-landing" },
  { label: "Changelog", to: "/changelog" },
  { label: "About", to: "/about" },
];

const resources = [
  {
    label: "GitHub",
    href: "https://github.com/vanduo-oss/vd3",
    external: true,
  },
  {
    label: "NPM",
    href: "https://www.npmjs.com/package/@vanduo-oss/vd3",
    external: true,
  },
  { label: "Kilo OSS", to: "/kilo-oss" },
  {
    label: "License",
    href: "https://github.com/vanduo-oss/vd3/blob/main/LICENSE",
    external: true,
  },
];
</script>

<template>
  <footer class="vd-footer vd-glass">
    <div class="vd-footer-container">
      <div class="vd-row">
        <div class="vd-col-12 vd-col-md-4">
          <div class="vd-footer-section">
            <div class="vd-footer-brand">
              <img
                src="/images/vd3-logo.svg"
                class="vd-footer-brand-logo"
                alt=""
                aria-hidden="true"
                width="659"
                height="594"
                decoding="async"
              />
              <h4 class="vd-footer-brand-title">
                <span class="hero-title-text">
                  <span class="hero-title-brand">vd3</span>
                  <span class="hero-title-word">ui</span>
                </span>
              </h4>
            </div>
          </div>
        </div>
        <div class="vd-col-12 vd-col-md-4">
          <div class="vd-footer-section">
            <h4>Quick Links</h4>
            <ul class="vd-footer-links">
              <li v-for="link in quickLinks" :key="link.to">
                <RouterLink :to="link.to">{{ link.label }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="vd-col-12 vd-col-md-4">
          <div class="vd-footer-section">
            <h4>Resources</h4>
            <ul class="vd-footer-links">
              <li v-for="link in resources" :key="link.label">
                <a
                  v-if="link.external"
                  :href="link.href"
                  target="_blank"
                  rel="noopener"
                  >{{ link.label }}</a
                >
                <RouterLink v-else :to="link.to!">{{ link.label }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vd-footer-bottom">
        <p class="vd-text-center vd-text-muted">
          2026, Vanduo UI. MIT License.
        </p>
      </div>
    </div>
  </footer>
</template>
