<script setup lang="ts">
import { VdChart } from "@vanduo-oss/vd3-cbun/charts";

defineProps<{ fullscreen?: boolean }>();

const barData = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 180 },
  { month: "Mar", sales: 150 },
  { month: "Apr", sales: 220 },
];

const lineData = [
  { month: "Jan", visits: 3200 },
  { month: "Feb", visits: 4100 },
  { month: "Mar", visits: 3700 },
  { month: "Apr", visits: 5200 },
];

const donutData = [
  { channel: "Direct", revenue: 4200 },
  { channel: "Referral", revenue: 3100 },
  { channel: "Social", revenue: 2400 },
  { channel: "Email", revenue: 1800 },
];
</script>

<template>
  <div v-if="fullscreen" class="cbun-charts-grid">
    <VdChart
      type="bar"
      :data="barData"
      x="month"
      y="sales"
      title="Monthly sales"
      :height="280"
    />
    <VdChart
      type="line"
      :data="lineData"
      x="month"
      y="visits"
      title="Site visits"
      :height="280"
    />
    <VdChart
      type="donut"
      :data="donutData"
      label="channel"
      value="revenue"
      title="Revenue mix"
      :height="280"
    />
  </div>
  <VdChart
    v-else
    type="donut"
    :data="donutData"
    label="channel"
    value="revenue"
    title="Revenue mix"
    :height="260"
  />
</template>

<style scoped>
.cbun-charts-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  align-items: start;
  height: 100%;
  overflow: auto;
  padding: 0.25rem;
}

@media (max-width: 900px) {
  .cbun-charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
