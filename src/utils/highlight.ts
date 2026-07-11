import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";

// Register only the languages the docs actually use, so the bundle stays lean.
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);

// DocCodeSnippet tab keys → highlight.js language ids.
const LANGUAGE: Record<string, string> = {
  html: "xml",
  css: "css",
  js: "typescript", // superset — handles both plain JS and TS snippets
  shell: "bash",
  json: "json",
};

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Syntax-highlight a code string for one of DocCodeSnippet's tabs. Returns
 * HTML-escaped markup with `hljs-*` token spans — safe for `v-html` (highlight.js
 * escapes the source). Runs synchronously, so it works during vite-ssg prerender
 * and matches on client hydration. Unknown languages fall back to escaped text.
 */
export const highlightCode = (code: string, key: string): string => {
  const language = LANGUAGE[key];
  if (!language) return escapeHtml(code);
  try {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  } catch {
    return escapeHtml(code);
  }
};
