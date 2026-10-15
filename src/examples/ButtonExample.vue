<script setup lang="ts">
import { ref } from "vue";
import { VdButton } from "@vanduo-oss/vd3";

const saves = ref(0);
function save() {
  saves.value++;
}
</script>

<template>
  <div class="vd-d-flex vd-flex-wrap vd-gap-3 items-center">
    <VdButton variant="primary" @click="save">Save</VdButton>
    <VdButton variant="ink" ring @click="save">Save with ring</VdButton>
    <span role="status">Saved {{ saves }} times</span>
  </div>
</template>
