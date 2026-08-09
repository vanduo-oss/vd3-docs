<script setup lang="ts">
import { ref } from "vue";
import { VdCodeEditor } from "@vanduo-oss/vd3-cbun/code-editor";

defineProps<{ fullscreen?: boolean }>();

const code = ref(`// Fibonacci with memoization
function fib(n) {
  const memo = [0, 1];
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
}

console.log(fib(10)); // 55
`);
</script>

<template>
  <VdCodeEditor
    v-model="code"
    language="javascript"
    :style="{ height: fullscreen ? '100%' : '280px', minHeight: '220px' }"
  />
</template>
