import { highlight } from "@vanduo-oss/vd3-cbun/code-editor/highlight";

// DocCodeSnippet / VdCodeSnippet tab keys → cbun tokenizer ids.
// `js` uses typescript so today's JS+TS snippets stay a single superset.
const LANGUAGE: Record<string, string> = {
  html: "html",
  css: "css",
  js: "typescript",
  shell: "shell",
  vue: "vue",
  json: "json",
};

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Syntax-highlight a code string for one of DocCodeSnippet's tabs. Returns
 * HTML-escaped markup with `vd-tk-*` token spans — safe for `v-html` (cbun
 * escapes the source). Default `trailingNewline` is false (snippet-safe).
 * Unknown languages fall back to escaped plaintext.
 */
export const highlightCode = (code: string, key: string): string => {
  const language = LANGUAGE[key];
  if (!language) return escapeHtml(code);
  try {
    return highlight(code, language);
  } catch {
    return escapeHtml(code);
  }
};
