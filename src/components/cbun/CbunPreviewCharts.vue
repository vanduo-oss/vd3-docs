<script setup lang="ts">
import { VdChart } from "@vanduo-oss/vd3-cbun/charts";

const donutData = [
  { channel: "Direct", revenue: 4200 },
  { channel: "Referral", revenue: 3100 },
  { channel: "Social", revenue: 2400 },
  { channel: "Email", revenue: 1800 },
];
</script>

<template>
  <VdChart
    type="donut"
    :data="donutData"
    label="channel"
    value="revenue"
    title="Revenue mix"
    :height="380"
  />
</template>
