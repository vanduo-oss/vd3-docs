<script setup lang="ts">
import { VdChart } from "@vanduo-oss/vd3-charts";

const donutData = [
  { channel: "Direct", revenue: 4200 },
  { channel: "Referral", revenue: 3100 },
  { channel: "Social", revenue: 2400 },
  { channel: "Email", revenue: 1800 },
];
</script>

<template>
  <div class="cbun-charts-wrap">
    <VdChart
      type="donut"
      :data="donutData"
      label="channel"
      value="revenue"
      title="Revenue mix"
      :height="380"
    />
  </div>
</template>

<style scoped>
.cbun-charts-wrap {
  border: 1px solid var(--vd-border-color);
  border-radius: 8px;
}
</style>
