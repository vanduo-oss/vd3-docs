<script setup lang="ts">
import { RouterLink } from "vue-router";
import Vd3BrandMark from "@/components/Vd3BrandMark.vue";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Docs", to: "/docs-landing" },
  { label: "Showcase", to: "/showcase" },
  { label: "Changelog", to: "/changelog" },
  { label: "About", to: "/about" },
];

const resources = [
  {
    label: "GitHub",
    href: "https://github.com/vanduo-oss/vd3",
  },
  {
    label: "NPM",
    href: "https://www.npmjs.com/package/@vanduo-oss/vd3",
  },
  {
    label: "License",
    href: "https://github.com/vanduo-oss/vd3/blob/main/LICENSE",
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
              <Vd3BrandMark size="3.25rem" class="vd-brand-mark-lg" />
              <h4 class="vd-footer-brand-title">
                <span class="hero-title-text">
                  <span class="hero-title-brand">vd3</span>
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
                <a :href="link.href" target="_blank" rel="noopener">{{
                  link.label
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vd-footer-bottom">
        <p class="vd-text-center vd-text-muted">
          2026,
          <a href="https://github.com/vanduo-oss" target="_blank" rel="noopener"
            >vanduo-oss</a
          >. MIT License.
        </p>
      </div>
    </div>
  </footer>
</template>
