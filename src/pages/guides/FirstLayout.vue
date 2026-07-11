<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

const relatedComponents = [
  {
    to: "/core/grid-system",
    icon: "ph-grid-four",
    title: "Grid system",
    desc: "The full column, offset, and gutter reference.",
    badge: "Core",
  },
  {
    to: "/components/navbar",
    icon: "ph-browser",
    title: "Navbar",
    desc: "A responsive top bar to anchor your layout.",
    badge: "Component",
  },
  {
    to: "/components/sidenav",
    icon: "ph-sidebar",
    title: "Sidenav",
    desc: "Collapsible side navigation for app shells.",
    badge: "Component",
  },
  {
    to: "/components/footer",
    icon: "ph-layout",
    title: "Footer",
    desc: "Multi-column footer that lands the page.",
    badge: "Component",
  },
];

const gridHtml = `<div class="vd-container-responsive">
  <div class="vd-row">
    <div class="vd-col-12 vd-col-md-6 vd-col-lg-4">Column A</div>
    <div class="vd-col-12 vd-col-md-6 vd-col-lg-4">Column B</div>
    <div class="vd-col-12 vd-col-md-12 vd-col-lg-4">Column C</div>
  </div>
</div>`;

const breakpoints: [string, string, string][] = [
  ["(base)", "< 576px", "vd-col-12 — stacks on phones"],
  ["sm", "≥ 576px", "vd-col-sm-*"],
  ["md", "≥ 768px", "vd-col-md-*"],
  ["lg", "≥ 992px", "vd-col-lg-*"],
  ["xl", "≥ 1200px", "vd-col-xl-*"],
  ["2xl", "≥ 1400px", "vd-col-2xl-*"],
];

const containers: [string, string][] = [
  [".vd-container", "Fixed max-width that steps down at each breakpoint"],
  [
    ".vd-container-responsive",
    "Fluid width with responsive gutters (used across these docs)",
  ],
  [".vd-container-fluid", "Full viewport width, edge to edge"],
];
</script>

<template>
  <section id="first-layout">
    <h5 class="demo-title">
      <i class="ph ph-layout"></i>Your First Layout
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Vanduo's layout system is plain CSS — a 12-column responsive grid inside a
      container, with mobile-first breakpoints. It works identically in static
      HTML and in vd2 templates, so everything here is engine-agnostic.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-columns"></i> A responsive 3-up grid</h6>
          </div>
          <div class="vd-card-body">
            <p>
              Columns stack on phones, go two-up on tablets, and three-up on
              desktops:
            </p>
            <DocCodeSnippet :html="gridHtml" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-devices"></i> Breakpoints</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Min width</th>
                    <th>Column class</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in breakpoints" :key="row[0]">
                    <td>
                      <strong>{{ row[0] }}</strong>
                    </td>
                    <td>{{ row[1] }}</td>
                    <td>
                      <code>{{ row[2] }}</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-frame-corners"></i> Containers</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Behaviour</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in containers" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-info"></i> Mobile-first by default</h6>
      </div>
      <div class="vd-card-body">
        <p>
          Start with a base <code>vd-col-12</code> (full width) and add larger
          breakpoints only where the layout should change. The grid gutters and
          column counts follow the same Fibonacci spacing as the rest of the
          system — see <a href="/guides/fibonacci">The Fibonacci scale</a>.
        </p>
      </div>
    </div>

    <GuideLinkCards
      class="vd-mt-6"
      icon="ph-stack"
      title="Build out the layout"
      :links="relatedComponents"
    />
  </section>
</template>
