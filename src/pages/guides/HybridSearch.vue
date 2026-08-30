<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";
import { EMBEDDING_PRESETS } from "@vanduo-oss/vdl-hybrid-search";

const presetRows = Object.entries(EMBEDDING_PRESETS).map(
  ([key, p]) =>
    [
      key,
      p.modelName.split("/").pop() ?? p.modelName,
      String(p.dimensions),
      p.queryPrefix ? "Yes" : "—",
      p.dtype,
    ] as [string, string, string, string, string],
);

const tuningRows: [string, string, string][] = [
  ["fuseThreshold", "0.4", "Fuse.js fuzziness (lower = stricter)."],
  [
    "semanticThreshold",
    "0.3",
    "Min cosine for semantic candidates (model-dependent).",
  ],
  ["fuzzyMinScore", "0.35", "Floor for fuzzy-only body hits."],
  ["titleExactBoost", "0.15", "Extra score when title matches exactly."],
  ["maxResults", "20", "Merged hits returned to UI."],
  ["maxSemanticResults", "10", "Semantic branch cap before merge."],
  [
    "confidence",
    "adaptive",
    "filterConfidentHits after merge (disable with false).",
  ],
];

const guideLinks = [
  {
    to: "/components/global-search",
    icon: "ph-magnifying-glass",
    title: "Global search",
    desc: "VdGlobalSearch palette wired to your adapter.",
  },
  {
    to: "/components/doc-search",
    icon: "ph-list-magnifying-glass",
    title: "Doc Search",
    desc: "Inline combobox for page-local docs.",
  },
];

const indexCommand = `npx vdl-hybrid-index \\
  --preset embeddinggemma \\
  --routes /components/button,/guides/theming \\
  --base https://vd3.vanduo.dev \\
  --out public/search`;

const searchIndexExample = `{
  "model": "onnx-community/embeddinggemma-300m-ONNX",
  "dimensions": 768,
  "generatedAt": "2026-08-30T12:00:00.000Z",
  "documents": [
    {
      "id": "button",
      "title": "Button",
      "route": "/components/button",
      "category": "Core",
      "keywords": ["click", "action"],
      "headings": ["Variants"],
      "bodyText": "...",
      "icon": "cursor-click"
    }
  ]
}`;

const vectorsExample = `{
  "model": "onnx-community/embeddinggemma-300m-ONNX",
  "dimensions": 768,
  "generatedAt": "2026-08-30T12:00:00.000Z",
  "documents": [
    { "id": "button", "vector": [0.01] }
  ]
}`;

const hybridSearchExample = `import { HybridSearch } from '@vanduo-oss/vdl-hybrid-search';

const search = new HybridSearch({
  embeddingPreset: 'embeddinggemma',
  indexUrl: '/search/search-index.json',
  vectorsUrl: '/search/vectors.json',
  confidence: {
    absFloor: 0.22,
    minTopScore: 0.53,
    relativeTopFraction: 0.45,
    weakBodyRelative: 0.92,
  },
});`;
</script>

<template>
  <section id="hybrid-search">
    <h5 class="demo-title"><i class="ph ph-brain"></i>AI and hybrid search</h5>
    <p class="vd-mb-8">
      This site uses
      <a
        href="https://github.com/vanduo-oss/vdl-hybrid-search"
        target="_blank"
        rel="noopener"
        ><code>@vanduo-oss/vdl-hybrid-search</code></a
      >
      <strong>0.2.0+</strong> for Cmd+K: fuzzy keyword search (Fuse.js) merged
      with optional in-browser semantic search (Transformers.js). The palette UI
      lives in
      <RouterLink to="/components/global-search">VdGlobalSearch</RouterLink>;
      the engine is injected via <code>GlobalSearchAdapter</code>.
    </p>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>Merge pipeline</h4></div>
          <div class="vd-card-body">
            <pre class="vd-text-sm" style="overflow-x: auto"><code>flowchart LR
  Q[Query] --> F[Fuse fuzzy]
  Q --> S[Semantic embed + dot product]
  F --> M[Merge by doc id]
  S --> M
  M --> C[Confidence cutoff]
  C --> R[Ranked hits]</code></pre>
            <ul class="vd-mt-4">
              <li>
                Fuse scores convert to similarity: <code>1 - fuseScore</code>.
              </li>
              <li>
                Semantic uses normalized embeddings; query gets
                <code>queryPrefix</code>.
              </li>
              <li>Dedupe by document id; best branch wins per doc.</li>
              <li>
                <code>filterConfidentHits</code> drops weak tails (adaptive
                floor vs top score).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>Building the index</h4></div>
          <div class="vd-card-body">
            <p>
              Run the CLI shipped with the library (this repo wraps it in
              <code>pnpm index</code>):
            </p>
            <DocCodeSnippet :shell="indexCommand" />
            <p class="vd-mt-4">
              <strong>search-index.json</strong> — Fuse corpus:
            </p>
            <DocCodeSnippet :js="searchIndexExample" />
            <p class="vd-mt-4">
              <strong>vectors.json</strong> — precomputed embeddings (same
              <code>model</code> / <code>dimensions</code>):
            </p>
            <DocCodeSnippet :js="vectorsExample" />
            <p class="vd-mt-4 vd-text-sm vd-text-muted">
              Guardrails (category, keywords, headings, bodyText) improve
              ranking; the TypeScript type marks them optional but the indexer
              should populate them for production corpora.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>Embedding presets</h4></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Preset</th>
                  <th>Model</th>
                  <th>Dims</th>
                  <th>Prefixes</th>
                  <th>dtype</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in presetRows" :key="row[0]">
                  <td>
                    <code>{{ row[0] }}</code>
                  </td>
                  <td>
                    <code>{{ row[1] }}</code>
                  </td>
                  <td>{{ row[2] }}</td>
                  <td>{{ row[3] }}</td>
                  <td>
                    <code>{{ row[4] }}</code>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="vd-mt-4">
              Default is <code>embeddinggemma</code>. Changing preset requires
              <strong>re-indexing</strong> vectors with the same model, pooling,
              and normalization. HybridSearch warns when
              <code>vectors.json</code> model ≠ active <code>modelName</code>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>Tuning (this site)</h4></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Value</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tuningRows" :key="row[0]">
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
            <DocCodeSnippet class="vd-mt-4" :vue="hybridSearchExample" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>Eval harness</h4></div>
          <div class="vd-card-body">
            <p>
              Labeled queries in <code>scripts/search-eval-queries.json</code> —
              run after indexing:
            </p>
            <DocCodeSnippet :shell="`pnpm index:eval`" />
            <p class="vd-mt-4">
              Measures top-1 / top-3 / MRR on intent queries and asserts
              nonsense queries return empty (post confidence cutoff). Use this
              when swapping MiniLM → EmbeddingGemma or changing index text.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>CSP, offline, privacy</h4></div>
          <div class="vd-card-body">
            <ul>
              <li>
                Default loads Transformers.js from jsDelivr CDN — allow in CSP
                or bundle locally.
              </li>
              <li>
                Set <code>onnxWasmPaths</code> for self-hosted WASM when CDN is
                blocked.
              </li>
              <li>
                Warm up with <code>initSemantic()</code> + show footer progress
                (see site store).
              </li>
              <li>
                <strong>AI search is opt-in</strong> on this site (EU AI Act
                transparency); embeddings run in-browser — no query text sent to
                a server.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header"><h4>Troubleshooting</h4></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Symptom</th>
                  <th>Likely cause</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>No semantic results</td>
                  <td>
                    AI off, model still downloading, or threshold too high.
                  </td>
                </tr>
                <tr>
                  <td>Nonsense queries match</td>
                  <td>Disable confidence or raise <code>minTopScore</code>.</td>
                </tr>
                <tr>
                  <td>Dimension error</td>
                  <td>
                    vectors.json built with a different preset than runtime.
                  </td>
                </tr>
                <tr>
                  <td>Console model mismatch</td>
                  <td>
                    Re-run <code>vdl-hybrid-index</code> after preset change.
                  </td>
                </tr>
                <tr>
                  <td>semantic-failed retry</td>
                  <td>Network/CDN blocked — check CSP or use local bundle.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <GuideLinkCards :links="guideLinks" />
  </section>
</template>
