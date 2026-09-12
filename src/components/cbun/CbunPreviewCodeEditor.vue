<script setup lang="ts">
import { ref } from "vue";
import { VdCodeEditor } from "@vanduo-oss/vd3-cbun/code-editor";

defineProps<{ fullscreen?: boolean }>();

const code = ref(`<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
const increment = (): void => {
  count.value++;
};
<\/script>

<template>
  <button type="button" @click="increment">
    Count is: {{ count }}
  </button>
</template>
`);
</script>

<template>
  <VdCodeEditor
    v-model="code"
    language="vue"
    :auto-close="true"
    :highlight-active-line="true"
    :style="{ height: fullscreen ? '100%' : '280px', minHeight: '220px' }"
  />
</template>
