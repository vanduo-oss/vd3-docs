import { describe, expect, it } from "vitest";
import { docsDocumentTitle } from "@/lib/document-title";

describe("docs document title", () => {
  it("matches the home hero", () => {
    expect(docsDocumentTitle("/")).toBe("vd3 UI");
  });

  it("keeps section titles on the vd3 suffix", () => {
    expect(docsDocumentTitle("/canvas/flowchart", "Flowchart")).toBe(
      "Flowchart — vd3",
    );
    expect(docsDocumentTitle("/about")).toBe(
      "vd3 — Fibonacci-Tuned Vue 3 Design System",
    );
  });
});
