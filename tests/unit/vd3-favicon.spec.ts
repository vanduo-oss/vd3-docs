import { describe, expect, it } from "vitest";
import {
  VD3_FAVICON_FALLBACK,
  buildVd3FaviconSvg,
  installVd3Favicon,
  sanitizeCssColor,
} from "@/lib/vd3-favicon";

describe("vd3 favicon", () => {
  it("rejects an injected color and keeps the fallback svg closed", () => {
    expect(sanitizeCssColor('rgb(1, 2, 3)"><script>alert(1)</script>')).toBe(
      "",
    );
    const svg = buildVd3FaviconSvg(
      'rgb(1, 2, 3)"><script>',
      VD3_FAVICON_FALLBACK.innerLight,
      VD3_FAVICON_FALLBACK.innerDark,
    );
    expect(svg).toContain(`fill="${VD3_FAVICON_FALLBACK.outer}"`);
    expect(svg).not.toContain("<script");
    expect(svg).not.toContain("alert");
  });

  it("recolors the icon from data-primary and ignores an injected value", () => {
    const doc = createFaviconDocument();
    doc.documentElement.setAttribute("data-primary", "green");
    const disconnect = installVd3Favicon(doc as unknown as Document);
    const link = doc.querySelector('link[rel="icon"]') as {
      getAttribute(name: string): string | null;
    };
    expect(link.getAttribute("type")).toBe("image/svg+xml");
    expect(decodeURIComponent(link.getAttribute("href") ?? "")).toContain(
      'fill="rgb(24, 76, 34)"',
    );

    doc.documentElement.setAttribute("data-primary", "red");
    const red = decodeURIComponent(link.getAttribute("href") ?? "");
    expect(red).toContain('fill="rgb(120, 24, 24)"');
    expect(red).not.toContain("rgb(24, 76, 34)");

    doc.documentElement.setAttribute("data-primary", "injected");
    const injected = decodeURIComponent(link.getAttribute("href") ?? "");
    expect(injected).toContain(`fill="${VD3_FAVICON_FALLBACK.outer}"`);
    expect(injected).toContain(
      `stop-color="${VD3_FAVICON_FALLBACK.innerLight}"`,
    );
    expect(injected).not.toContain("<script");

    disconnect();
    doc.documentElement.setAttribute("data-primary", "blue");
    expect(decodeURIComponent(link.getAttribute("href") ?? "")).toContain(
      `fill="${VD3_FAVICON_FALLBACK.outer}"`,
    );
  });
});

function createFaviconDocument() {
  const observers: {
    callback: () => void;
    target: FakeElement | null;
    filter: string[] | null;
    disconnect(): void;
  }[] = [];

  class MutationObserver {
    callback: () => void;
    target: FakeElement | null = null;
    filter: string[] | null = null;

    constructor(callback: () => void) {
      this.callback = callback;
    }

    observe(target: FakeElement, options: { attributeFilter?: string[] } = {}) {
      this.target = target;
      this.filter = options.attributeFilter ?? null;
      observers.push(this);
    }

    disconnect(): void {
      const index = observers.indexOf(this);
      if (index >= 0) observers.splice(index, 1);
    }
  }

  function notify(target: FakeElement, name: string): void {
    for (const observer of observers) {
      if (observer.target !== target) continue;
      if (observer.filter && !observer.filter.includes(name)) continue;
      observer.callback();
    }
  }

  type FakeElement = {
    tag: string;
    attrs: Record<string, string>;
    style: Record<string, string>;
    children: FakeElement[];
    parent: FakeElement | null;
    ownerDocument?: unknown;
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string | null;
    appendChild(child: FakeElement): FakeElement;
    remove(): void;
  };

  function element(tag: string): FakeElement {
    return {
      tag,
      attrs: {},
      style: {},
      children: [],
      parent: null,
      setAttribute(name, value) {
        this.attrs[name] = String(value);
        notify(this, name);
      },
      getAttribute(name) {
        return Object.prototype.hasOwnProperty.call(this.attrs, name)
          ? this.attrs[name]
          : null;
      },
      appendChild(child) {
        child.parent = this;
        this.children.push(child);
        return child;
      },
      remove() {
        if (!this.parent) return;
        this.parent.children = this.parent.children.filter(
          (child) => child !== this,
        );
        this.parent = null;
      },
    };
  }

  const colors: Record<string, string> = {
    green: "rgb(24, 76, 34)",
    red: "rgb(120, 24, 24)",
    blue: "rgb(10, 20, 200)",
    injected: 'rgb(1, 2, 3)"><script>',
  };

  const doc = {
    documentElement: element("html"),
    head: element("head"),
    createElement: element,
    querySelector(selector: string) {
      if (selector !== 'link[rel="icon"]') return null;
      return (
        this.head.children.find((child) => child.attrs.rel === "icon") ?? null
      );
    },
    defaultView: {
      MutationObserver,
      getComputedStyle(node: FakeElement) {
        let current: FakeElement | null = node;
        let primary = "";
        while (current) {
          if (current.attrs?.["data-primary"]) {
            primary = current.attrs["data-primary"];
            break;
          }
          current = current.parent;
        }
        const color = colors[primary] ?? "";
        return { color, backgroundColor: color, borderTopColor: color };
      },
    },
  };
  doc.documentElement.ownerDocument = doc;
  const link = element("link");
  link.setAttribute("rel", "icon");
  link.setAttribute("type", "image/svg+xml");
  link.setAttribute("href", "/favicon.svg");
  doc.head.appendChild(link);
  return doc;
}
