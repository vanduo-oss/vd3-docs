import { describe, expect, it } from "vitest";
import { docsDocumentTitle } from "@/lib/document-title";

describe("docs document title", () => {
  it("matches the home hero", () => {
    expect(docsDocumentTitle("/")).toBe("VD3 UI");
  });

  it("keeps section titles on the VD3 UI suffix", () => {
    expect(docsDocumentTitle("/canvas/flowchart", "Flowchart")).toBe(
      "Flowchart — VD3 UI",
    );
    expect(docsDocumentTitle("/about")).toBe(
      "VD3 UI — Fibonacci-Tuned Vue 3 Design System",
    );
  });
});
