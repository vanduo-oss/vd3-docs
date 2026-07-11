<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const usageHtml = `<!-- Breadcrumb navigation -->
<nav class="vd-breadcrumbs" aria-label="Breadcrumb">
  <ol class="vd-breadcrumb">
    <li class="vd-breadcrumb-item"><a href="#">Home</a></li>
    <li class="vd-breadcrumb-item"><a href="#">Library</a></li>
    <li class="vd-breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>`;

const apiRows: [string, string, string][] = [
  [".vd-breadcrumbs", "Wrapper for breadcrumb navigation.", "Layout"],
  [
    ".vd-breadcrumb-item",
    "Individual breadcrumb list item. Add .active for the current page.",
    "Component",
  ],
];
</script>

<template>
  <section id="breadcrumbs">
    <h5 class="demo-title"><i class="ph ph-caret-right"></i>Breadcrumbs</h5>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Breadcrumbs</h6></div>
          <div class="vd-card-body">
            <nav class="vd-breadcrumbs" aria-label="Breadcrumb">
              <ol class="vd-breadcrumb">
                <li class="vd-breadcrumb-item">
                  <a href="#" @click.prevent>Home</a>
                </li>
                <li class="vd-breadcrumb-item">
                  <a href="#" @click.prevent>Library</a>
                </li>
                <li class="vd-breadcrumb-item active" aria-current="page">
                  Data
                </li>
              </ol>
            </nav>
            <DocCodeSnippet :html="usageHtml" />
          </div>
        </div>
      </div>
    </div>

    <h4 id="api" class="docs-heading">API Reference</h4>
    <div class="vd-table-responsive" style="margin-bottom: 3rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 25%">Class Name</th>
            <th style="width: 55%">Description</th>
            <th style="width: 20%">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in apiRows" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
            <td>{{ row[2] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
