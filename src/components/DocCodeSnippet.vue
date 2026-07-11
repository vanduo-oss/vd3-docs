<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { ENGINE_SNIPPET_GROUP } from "@/components/engineSnippetGroup";
import { highlightCode } from "@/utils/highlight";

interface Props {
  /** The demo markup shown in the HTML tab (mirrors the Vanilla data-extract). */
  html?: string;
  /** Optional CSS shown in a second tab. */
  css?: string;
  /** Optional JavaScript shown in a tab. */
  js?: string;
  /** Optional shell / command-line snippet shown in a tab. */
  shell?: string;
  /** Start expanded (mirrors the Vanilla `data-expanded="true"`). */
  defaultOpen?: boolean;
}
const props = defineProps<Props>();

interface Lang {
  key: string;
  label: string;
  code: string;
}

const langs = computed<Lang[]>(() => {
  const list: Lang[] = [];
  if (props.html) list.push({ key: "html", label: "HTML", code: props.html });
  if (props.shell)
    list.push({ key: "shell", label: "Shell", code: props.shell });
  if (props.css) list.push({ key: "css", label: "CSS", code: props.css });
  if (props.js) list.push({ key: "js", label: "JavaScript", code: props.js });
  return list;
});

// Pre-highlight each tab once (syntax tokens themed via Vanduo tokens in CSS).
const highlightedLangs = computed(() =>
  langs.value.map((l) => ({ ...l, highlighted: highlightCode(l.code, l.key) })),
);

// Inside an EngineSwitch, expand-state is shared by ordinal position so the
// snippet stays open when the reader flips engines; standalone it's local.
const group = inject(ENGINE_SNIPPET_GROUP, null);
const localExpanded = ref(props.defaultOpen ?? false);
const sharedExpanded = group
  ? group.register(props.defaultOpen ?? false)
  : null;
const expanded = computed<boolean>({
  get: () => (sharedExpanded ? sharedExpanded.value : localExpanded.value),
  set: (value) => {
    if (sharedExpanded) sharedExpanded.value = value;
    else localExpanded.value = value;
  },
});
const active = ref(langs.value[0]?.key ?? "html");
const copied = ref(false);

const toggle = (): void => {
  expanded.value = !expanded.value;
};

const activeCode = computed(
  () => langs.value.find((l) => l.key === active.value)?.code ?? "",
);

const copy = async (): Promise<void> => {
  if (typeof navigator === "undefined" || !navigator.clipboard) return;
  try {
    await navigator.clipboard.writeText(activeCode.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {
    /* clipboard may be blocked */
  }
};
</script>

<template>
  <div
    class="vd-code-snippet"
    data-collapsible
    :data-expanded="expanded ? 'true' : 'false'"
  >
    <button
      class="vd-code-snippet-toggle"
      :aria-expanded="expanded"
      @click="toggle"
    >
      <span class="vd-code-snippet-toggle-icon"></span>
      <span>View Code</span>
    </button>
    <div
      class="vd-code-snippet-content"
      :data-visible="expanded ? 'true' : 'false'"
    >
      <div class="vd-code-snippet-header">
        <div class="vd-code-snippet-tabs" role="tablist">
          <button
            v-for="l in langs"
            :key="l.key"
            class="vd-code-snippet-tab"
            :class="{ 'is-active': active === l.key }"
            :data-lang="l.key"
            @click="active = l.key"
          >
            {{ l.label }}
          </button>
        </div>
        <button
          class="vd-code-snippet-copy"
          aria-label="Copy code"
          @click="copy"
        >
          <span class="vd-code-snippet-copy-icon"></span>
          <span class="vd-code-snippet-copy-text">{{
            copied ? "Copied" : "Copy"
          }}</span>
        </button>
      </div>
      <div class="vd-code-snippet-body">
        <pre
          v-for="l in highlightedLangs"
          :key="l.key"
          class="vd-code-snippet-pane"
          :class="{ 'is-active': active === l.key }"
          :data-lang="l.key"
        ><code class="hljs" v-html="l.highlighted"></code></pre>
      </div>
    </div>
  </div>
</template>
