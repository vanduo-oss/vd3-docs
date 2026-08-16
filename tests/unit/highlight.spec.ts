import { describe, expect, it } from "vitest";
import { highlightCode } from "@/utils/highlight";

describe("highlightCode", () => {
  it("maps html to cbun html tokens", () => {
    const html = highlightCode('<div class="x">hi</div>', "html");
    expect(html).toContain("vd-tk-tag");
    expect(html).not.toContain("hljs-");
  });

  it("maps css to cbun css tokens", () => {
    const html = highlightCode(".x { color: red; }", "css");
    expect(html).toMatch(/vd-tk-/);
  });

  it("maps js to the typescript tokenizer (JS+TS superset)", () => {
    const html = highlightCode("const x: string = 1;", "js");
    expect(html).toContain("vd-tk-keyword");
    expect(html).toContain("const");
  });

  it("maps shell and json", () => {
    expect(highlightCode("echo hi", "shell")).toMatch(/vd-tk-/);
    expect(highlightCode('{"a":1}', "json")).toMatch(/vd-tk-/);
  });

  it("maps vue to the real SFC tokenizer", () => {
    const html = highlightCode(
      `<script setup lang="ts">
const n = 1;
</script>
<template>
  <VdDock tint="green" />
</template>`,
      "vue",
    );
    expect(html).toContain("vd-tk-tag");
    expect(html).toContain("script");
    expect(html).toContain("VdDock");
  });

  it("escapes unknown keys as plaintext", () => {
    const html = highlightCode("<b>x & y</b>", "unknown");
    expect(html).toBe("&lt;b&gt;x &amp; y&lt;/b&gt;");
    expect(html).not.toContain("vd-tk-");
  });

  it("does not append an extra trailing newline", () => {
    expect(highlightCode("const x = 1;", "js").endsWith("\n")).toBe(false);
    const withNl = highlightCode("const x = 1;\n", "js");
    expect(withNl.endsWith("\n")).toBe(true);
    expect(withNl.endsWith("\n\n")).toBe(false);
  });
});
