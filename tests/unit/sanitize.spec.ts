import { describe, it, expect } from "vitest";
import { sanitizeHtml } from "@vanduo-oss/vue";

describe("sanitizeHtml", () => {
  it("keeps allowed inline tags", () => {
    expect(sanitizeHtml("<b>hi</b> <em>x</em>")).toBe("<b>hi</b> <em>x</em>");
  });

  it("drops <script> (no executable markup survives)", () => {
    const out = sanitizeHtml("<script>alert(1)</script>");
    expect(out).not.toContain("<script");
  });

  it("strips event-handler attributes", () => {
    expect(sanitizeHtml('<span onclick="evil()">x</span>')).toBe("<span>x</span>");
  });

  it("replaces disallowed tags with text, neutralizing <img onerror>", () => {
    const out = sanitizeHtml('<img src=x onerror="alert(1)">');
    expect(out).not.toContain("<img");
    expect(out).not.toContain("onerror");
  });

  it("drops javascript: hrefs but keeps http(s)", () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).toBe("<a>x</a>");
    expect(sanitizeHtml('<a href="https://example.com">x</a>')).toContain(
      'href="https://example.com"',
    );
  });

  it("denies style by default and allows it only on opt-in", () => {
    expect(sanitizeHtml('<span style="color:red">a</span>')).toBe("<span>a</span>");
    expect(
      sanitizeHtml('<span style="color:red">a</span>', { allowStyle: true }),
    ).toContain('style="color:red"');
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeHtml("")).toBe("");
  });
});
