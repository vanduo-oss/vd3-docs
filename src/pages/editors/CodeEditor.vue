<script setup lang="ts">
import { computed, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdCodeEditor } from "@vanduo-oss/vd3-cbun/code-editor";

// Sample source per language for the interactive playground + showcase.
const SAMPLES: Record<string, string> = {
  javascript: `// Fibonacci with memoization
function fib(n) {
  const memo = [0, 1];
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
}

console.log(fib(10)); // 55
`,
  typescript: `interface User {
  id: number;
  name: string;
  roles?: readonly string[];
}

const greet = (u: User): string => \`Hi \${u.name}\`;
type Id = User["id"];
`,
  html: `<!DOCTYPE html>
<main class="app" data-ready>
  <!-- greeting -->
  <h1 id="title">Hello &amp; welcome</h1>
  <a href="/x?a=1&b=2">link</a>
</main>
`,
  css: `.card {
  display: grid;
  gap: 0.5rem;
  color: var(--vd-text-primary, #111);
}
.card:hover {
  box-shadow: 0 2px 8px rgb(0 0 0 / 12%) !important;
}
@media (min-width: 40rem) {
  .card { gap: 1rem; }
}
`,
  json: `{
  "name": "vd3-cbun",
  "version": "1.1.0",
  "private": false,
  "keywords": ["vue", "code-editor"],
  "nested": { "ok": true, "n": -3.14e2 }
}
`,
  markdown: `# Title

Some **bold** and _italic_ and \`inline\` code.

- one
- two

> a blockquote

\`\`\`js
const x = 1;
\`\`\`

[link](https://example.com)
`,
  shell: `#!/usr/bin/env bash
set -euo pipefail

for f in *.log; do
  echo "processing \${f}"
  grep -i error "$f" | wc -l
done
`,
  python: `import math


class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x = x
        self.y = y

    def dist(self, other: "Point") -> float:
        return math.hypot(self.x - other.x, self.y - other.y)


print(Point(0, 0).dist(Point(3, 4)))  # 5.0
`,
  plaintext: `Plain text — no highlighting.
Typing, indentation, and the gutter still work.
`,
};

const languageOptions = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "json", label: "JSON" },
  { id: "markdown", label: "Markdown" },
  { id: "shell", label: "Shell" },
  { id: "python", label: "Python" },
  { id: "plaintext", label: "Plain text" },
];

// Interactive playground state (dogfoods v-model + reactive props).
const language = ref("javascript");
const code = ref(SAMPLES.javascript);
const readOnly = ref(false);
const lineNumbers = ref(true);
const wrap = ref(false);

const onLanguageChange = (): void => {
  code.value = SAMPLES[language.value] ?? "";
};

const charCount = computed(() => code.value.length);
const lineCount = computed(() => code.value.split("\n").length);

// Standalone demos.
const emptyCode = ref("");
const readonlyCode = ref(SAMPLES.typescript);
const wrapCode = ref(
  "This editor soft-wraps very long lines instead of scrolling horizontally — useful for prose, logs, or wide config values that you would rather keep fully visible without a horizontal scrollbar. The gutter and active-line highlight are disabled while wrapping.\n",
);

// Snippets.
const installShell = `pnpm add @vanduo-oss/vd3-cbun`;

const vue3Usage = `<script setup lang="ts">
import { ref } from 'vue';
import { VdCodeEditor } from '@vanduo-oss/vd3-cbun/code-editor';
import '@vanduo-oss/vd3-cbun/code-editor/css';

const code = ref('const hello = "world";');
<\/script>

<template>
  <VdCodeEditor v-model="code" language="javascript" />
</template>`;

const languagesSnippet = `<VdCodeEditor v-model="code" language="python" />
<VdCodeEditor v-model="code" language="json" />
<VdCodeEditor v-model="code" language="markdown" />
<!-- aliases work too: js, ts, py, sh, md -->`;

const readonlySnippet = `<VdCodeEditor :model-value="source" language="typescript" read-only />`;

const wrapSnippet = `<VdCodeEditor v-model="text" wrap :line-numbers="false" />`;

const helpersSnippet = `import { tokenize, highlight, LANGUAGES } from '@vanduo-oss/vd3-cbun/code-editor';

// Pure, framework-agnostic helpers (no DOM):
const tokens = tokenize('const x = 1;', 'javascript'); // [{ type, value }, …]
const html = highlight('const x = 1;', 'javascript');  // escaped HTML string
LANGUAGES; // ['plaintext','javascript','typescript','html','css','json','markdown','shell','python']`;

const props: [string, string, string][] = [
  ["v-model / modelValue", "string", "Editor contents (two-way)."],
  [
    "language",
    "string",
    "Language id or alias (javascript, ts, py, json, markdown, shell, …); plaintext = no highlighting.",
  ],
  [
    "readOnly",
    "boolean",
    "Render as a non-editable viewer (copy still works).",
  ],
  [
    "lineNumbers",
    "boolean",
    "Show the line-number gutter (default true; ignored in wrap mode).",
  ],
  ["tabSize", "number", "Indent width in spaces (default 2)."],
  [
    "wrap",
    "boolean",
    "Soft-wrap long lines (disables the gutter + active-line highlight).",
  ],
  ["autoClose", "boolean", "Auto-close brackets/quotes (default true)."],
  ["placeholder", "string", "Empty-state placeholder text."],
  ["maxLength", "number", "Native maxlength cap on the contents."],
  ["copy", "boolean", "Show the copy-to-clipboard button (default true)."],
  [
    "highlightActiveLine",
    "boolean",
    "Highlight the caret's line (default true; ignored in wrap mode).",
  ],
  [
    "spellcheck",
    "boolean",
    "Native spellcheck on the textarea (default false).",
  ],
  ["ariaLabel", "string", "Accessible label for the textarea."],
];

const eventsTable: [string, string][] = [
  ["@update:modelValue", "v-model — emits the new contents string."],
  ["@change", "Contents changed; payload is the string value."],
  ["@focus / @blur", "Native focus / blur events."],
  ["@ready", "Emitted once with the framework-agnostic core instance."],
];

const exposedTable: [string, string][] = [
  ["getInstance()", "The framework-agnostic core editor instance."],
  ["focus() / blur()", "Move focus in / out of the editor."],
  ["getValue() / setValue(v)", "Read / replace the contents."],
  ["getSelection()", "{ start, end, text } of the current selection."],
  ["setSelection(start, end?)", "Set the selection range."],
  ["insertText(text)", "Insert text at the caret (replacing any selection)."],
  ["getContainer()", "The root container element."],
];

const cssVars = `:root {
  --vd-code-editor-bg: var(--vd-bg-primary);
  --vd-code-editor-text: var(--vd-text-primary);
  --vd-code-editor-border: var(--vd-border-color);
  --vd-code-editor-gutter-bg: var(--vd-bg-secondary);
  --vd-code-editor-gutter-text: var(--vd-text-muted);
  --vd-code-editor-caret: var(--vd-color-primary);
  --vd-code-editor-font-size: 0.875rem;
  --vd-code-editor-line-height: 1.5;

  /* Syntax token colors (light; overridden under [data-theme="dark"]) */
  --vd-code-editor-tk-keyword: #7c3aed;
  --vd-code-editor-tk-string: #16a34a;
  --vd-code-editor-tk-comment: #6b7280;
  --vd-code-editor-tk-number: #c2410c;
  --vd-code-editor-tk-function: #2563eb;
}`;
</script>

<template>
  <section id="code-editor">
    <h5 class="demo-title"><i class="ph ph-code"></i>Code Editor</h5>
    <p class="vd-mb-4">
      A lightweight, secure code editor built on the
      <strong>textarea-overlay</strong> model: a native
      <code>&lt;textarea&gt;</code> handles all editing (caret, selection, IME,
      undo/redo, clipboard, accessibility, mobile) while a first-party,
      ReDoS-safe tokenizer paints a syntax-highlight layer beneath it. No
      third-party editor and no runtime dependency beyond Vue — and rendering is
      escaping-safe (no <code>innerHTML</code>).
    </p>
    <p class="vd-text-sm vd-text-muted vd-mb-8">
      Ships in the components bundle at
      <code>@vanduo-oss/vd3-cbun/code-editor</code>. v1 highlights
      JavaScript/TypeScript, HTML, CSS, JSON, Markdown, Shell, and Python, with
      a line-number gutter, auto-indent + bracket/quote auto-close, read-only
      mode, a copy button, a placeholder, and a large-input performance guard.
      It adapts to the active Vanduo theme via <code>--vd-*</code> tokens.
    </p>

    <!-- Interactive playground -->
    <div class="vd-card vd-card-glow demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6>Interactive playground</h6>
        <p class="vd-text-sm vd-text-muted vd-mb-0">
          Live <code>v-model</code> + reactive props — switch language and
          toggle features; the bound value updates as you type.
        </p>
      </div>
      <div class="vd-card-body">
        <div class="ce-controls vd-mb-4">
          <label class="ce-control">
            <span>Language</span>
            <select
              v-model="language"
              class="ce-select"
              @change="onLanguageChange"
            >
              <option v-for="l in languageOptions" :key="l.id" :value="l.id">
                {{ l.label }}
              </option>
            </select>
          </label>
          <label class="ce-control ce-check">
            <input v-model="lineNumbers" type="checkbox" /> line numbers
          </label>
          <label class="ce-control ce-check">
            <input v-model="wrap" type="checkbox" /> wrap
          </label>
          <label class="ce-control ce-check">
            <input v-model="readOnly" type="checkbox" /> read-only
          </label>
        </div>

        <VdCodeEditor
          v-model="code"
          :language="language"
          :read-only="readOnly"
          :line-numbers="lineNumbers"
          :wrap="wrap"
          style="height: 340px"
        />

        <p class="vd-text-sm vd-text-muted vd-mt-3 vd-mb-0">
          <strong>Bound value:</strong> {{ charCount }} chars ·
          {{ lineCount }} lines
        </p>
      </div>
    </div>

    <!-- Language showcase -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header"><h6>Python</h6></div>
          <div class="vd-card-body">
            <VdCodeEditor
              :model-value="SAMPLES.python"
              language="python"
              style="height: 260px"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header"><h6>JSON</h6></div>
          <div class="vd-card-body">
            <VdCodeEditor
              :model-value="SAMPLES.json"
              language="json"
              style="height: 260px"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header"><h6>HTML</h6></div>
          <div class="vd-card-body">
            <VdCodeEditor
              :model-value="SAMPLES.html"
              language="html"
              style="height: 220px"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header"><h6>Markdown</h6></div>
          <div class="vd-card-body">
            <VdCodeEditor
              :model-value="SAMPLES.markdown"
              language="markdown"
              style="height: 220px"
            />
          </div>
        </div>
      </div>
    </div>
    <DocCodeSnippet class="vd-mb-6" :html="languagesSnippet" />

    <!-- Read-only / placeholder / wrap -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header">
            <h6>Read-only</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              A non-editable, syntax-highlighted viewer. The copy button still
              works.
            </p>
          </div>
          <div class="vd-card-body">
            <VdCodeEditor
              v-model="readonlyCode"
              language="typescript"
              read-only
              style="height: 200px"
            />
            <DocCodeSnippet class="vd-mt-4" :html="readonlySnippet" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header">
            <h6>Placeholder (empty state)</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              An empty editor shows placeholder text until you type.
            </p>
          </div>
          <div class="vd-card-body">
            <VdCodeEditor
              v-model="emptyCode"
              language="javascript"
              placeholder="// Start typing JavaScript…"
              style="height: 200px"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6>Soft wrap</h6>
        <p class="vd-text-sm vd-text-muted vd-mb-0">
          <code>wrap</code> soft-wraps long lines (the gutter and active-line
          highlight turn off while wrapping).
        </p>
      </div>
      <div class="vd-card-body">
        <VdCodeEditor
          v-model="wrapCode"
          language="plaintext"
          wrap
          :line-numbers="false"
          style="height: 180px"
        />
        <DocCodeSnippet class="vd-mt-4" :html="wrapSnippet" />
      </div>
    </div>

    <!-- API reference -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-list-dashes mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >API Reference
        </h6>
      </div>
      <div class="vd-card-body">
        <h4>Install</h4>
        <DocCodeSnippet :shell="installShell" />

        <h4 class="vd-mt-6">Usage</h4>
        <DocCodeSnippet :html="vue3Usage" :default-open="true" />

        <h4 class="vd-mt-6">Props</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in props" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>
                  <code>{{ row[1] }}</code>
                </td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in eventsTable" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Exposed methods (template ref)</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in exposedTable" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Framework-agnostic helpers</h4>
        <p class="vd-text-sm vd-text-muted">
          The subpath also re-exports the pure tokenizer helpers (no DOM) and
          the core class as <code>VdCodeEditorCore</code>.
        </p>
        <DocCodeSnippet :js="helpersSnippet" />

        <h4 class="vd-mt-6">CSS variables</h4>
        <DocCodeSnippet :css="cssVars" />

        <h4 class="vd-mt-6">
          <i
            class="ph ph-wheelchair mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >Accessibility
        </h4>
        <ul>
          <li>
            Editing is a native <code>&lt;textarea&gt;</code> — full keyboard
            support, IME, native undo/redo, and screen-reader text editing come
            for free. It carries an <code>aria-label</code> (customizable via
            the <code>ariaLabel</code> prop).
          </li>
          <li>
            The highlight layer and gutter are decorative and marked
            <code>aria-hidden="true"</code>, so assistive tech reads only the
            editable text.
          </li>
          <li>
            The copy button is a real <code>&lt;button&gt;</code> with an
            <code>aria-label</code>; it only appears when the Clipboard API is
            available.
          </li>
          <li>
            Colors derive from the active theme's <code>--vd-*</code> tokens;
            selection stays visible over the painted tokens.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ce-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}
.ce-control {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 0.875rem;
  color: var(--vd-text-primary);
}
.ce-check {
  cursor: pointer;
}
.ce-select {
  padding: 0.3rem 0.5rem;
  font: inherit;
  color: var(--vd-text-primary);
  background: var(--vd-bg-primary);
  border: 1px solid var(--vd-border-color);
  border-radius: 0.375rem;
}
</style>
