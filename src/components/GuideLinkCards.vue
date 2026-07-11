<script setup lang="ts">
import { RouterLink } from "vue-router";

interface GuideLink {
  /** Internal route (e.g. "/components/modal") or absolute URL when `external`. */
  to: string;
  /** Phosphor icon class fragment, e.g. "ph-cube". */
  icon: string;
  title: string;
  desc: string;
  /** Small pill shown next to the title, e.g. "Component", "Core". */
  badge?: string;
  external?: boolean;
}

withDefaults(
  defineProps<{
    links: GuideLink[];
    /** Optional section heading; omit to render a bare grid. */
    title?: string;
    /** Phosphor icon for the heading. */
    icon?: string;
  }>(),
  { title: "", icon: "ph-compass" },
);
</script>

<template>
  <div class="vd-card demo-card guide-links">
    <div v-if="title" class="vd-card-header">
      <h6><i :class="`ph ${icon}`"></i> {{ title }}</h6>
    </div>
    <div class="vd-card-body">
      <div class="guide-links-grid">
        <component
          :is="link.external ? 'a' : RouterLink"
          v-for="link in links"
          :key="link.to"
          v-bind="
            link.external
              ? { href: link.to, target: '_blank', rel: 'noopener' }
              : { to: link.to }
          "
          class="vd-card vd-glass vd-card-interactive guide-link"
        >
          <span class="guide-link-icon">
            <i :class="`ph ${link.icon}`" aria-hidden="true"></i>
          </span>
          <span class="guide-link-body">
            <span class="guide-link-title">
              {{ link.title }}
              <span v-if="link.badge" class="guide-link-badge">{{
                link.badge
              }}</span>
            </span>
            <span class="guide-link-desc">{{ link.desc }}</span>
          </span>
          <i
            :class="`ph ${link.external ? 'ph-arrow-up-right' : 'ph-arrow-right'} guide-link-arrow`"
            aria-hidden="true"
          ></i>
        </component>
      </div>
    </div>
  </div>
</template>

<style scoped>
.guide-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1rem;
}

.guide-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1.125rem;
  text-decoration: none;
  color: inherit;
  border-radius: var(--vd-radius-fib-5, 0.5rem);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.guide-link:hover,
.guide-link:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(var(--vd-color-primary-rgb), 0.45);
}

.guide-link-icon {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: rgba(var(--vd-color-primary-rgb), 0.12);
  color: var(--vd-color-primary);
  font-size: 1.4rem;
  transition: background 0.18s ease;
}

.guide-link:hover .guide-link-icon,
.guide-link:focus-visible .guide-link-icon {
  background: rgba(var(--vd-color-primary-rgb), 0.22);
}

.guide-link-body {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.guide-link-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--vd-text-primary);
  line-height: 1.25;
}

.guide-link-badge {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  color: var(--vd-color-primary);
  background: rgba(var(--vd-color-primary-rgb), 0.12);
}

.guide-link-desc {
  font-size: 0.82rem;
  line-height: 1.4;
  color: var(--vd-text-secondary);
}

.guide-link-arrow {
  flex: 0 0 auto;
  font-size: 1.05rem;
  color: var(--vd-text-secondary);
  opacity: 0.6;
  transition:
    transform 0.18s ease,
    opacity 0.18s ease,
    color 0.18s ease;
}

.guide-link:hover .guide-link-arrow,
.guide-link:focus-visible .guide-link-arrow {
  color: var(--vd-color-primary);
  opacity: 1;
  transform: translateX(3px);
}

@media (prefers-reduced-motion: reduce) {
  .guide-link,
  .guide-link-arrow,
  .guide-link-icon {
    transition: none;
  }

  .guide-link:hover,
  .guide-link:focus-visible {
    transform: none;
  }

  .guide-link:hover .guide-link-arrow,
  .guide-link:focus-visible .guide-link-arrow {
    transform: none;
  }
}
</style>
