export interface NavSection {
  id: string;
  title: string;
  route: string;
  icon?: string;
  keywords: string[];
}

export interface NavCategory {
  id: string;
  title: string;
  icon?: string;
  sections: NavSection[];
}

export interface NavTab {
  id: string;
  title: string;
  icon?: string;
  categories: NavCategory[];
}

export interface NavPage {
  id: string;
  title: string;
  route: string;
  icon?: string;
  keywords: string[];
}

export interface NavTree {
  pages: NavPage[];
  tabs: NavTab[];
}

export const nav: NavTree = {
  pages: [
    {
      id: "home",
      title: "Home",
      route: "/",
      icon: "house",
      keywords: ["home", "vd3", "ui"],
    },
    {
      id: "docs-landing",
      title: "Docs",
      route: "/docs-landing",
      icon: "book",
      keywords: ["docs", "documentation", "guide"],
    },
    {
      id: "cbun",
      title: "Canvas Components Bundle",
      route: "/cbun",
      icon: "tree-structure",
      keywords: [
        "cbun",
        "canvas components",
        "vd3-charts",
        "vd3-flowchart",
        "components bundle",
        "charts",
        "flowchart",
        "auxiliary",
        "npm",
      ],
    },
    {
      id: "about",
      title: "About",
      route: "/about",
      icon: "info",
      keywords: ["about", "vd3", "overview"],
    },
    {
      id: "changelog",
      title: "Changelog",
      route: "/changelog",
      icon: "clock",
      keywords: [
        "changelog",
        "releases",
        "versions",
        "vd3-charts",
        "vd3-flowchart",
      ],
    },
  ],
  tabs: [
    {
      id: "core-foundation",
      title: "Core",
      icon: "cube",
      categories: [
        {
          id: "foundation",
          title: "Foundation",
          icon: "shapes",
          sections: [
            {
              id: "color-palette",
              title: "Color palette",
              route: "/core/color-palette",
              icon: "palette",
              keywords: [
                "color",
                "palette",
                "tokens",
                "fibonacci",
                "golden",
                "open color",
              ],
            },
            {
              id: "typography",
              title: "Typography",
              route: "/core/typography",
              icon: "text-aa",
              keywords: ["typography", "font", "type"],
            },
            {
              id: "icons",
              title: "Icons",
              route: "/core/icons",
              icon: "images",
              keywords: ["icons", "icon", "phosphor", "glyph", "vdicon"],
            },
            {
              id: "golden-ratio",
              title: "Golden ratio",
              route: "/core/golden-ratio",
              icon: "shapes",
              keywords: ["ratio", "phi", "fibonacci"],
            },
            {
              id: "grid-system",
              title: "Grid system",
              route: "/core/grid-system",
              icon: "grid-four",
              keywords: ["grid", "layout", "columns"],
            },
            {
              id: "shadows-glow",
              title: "Shadows & glow",
              route: "/core/shadows-glow",
              icon: "square",
              keywords: ["shadow", "elevation", "glow"],
            },
          ],
        },
      ],
    },
    {
      id: "components",
      title: "Components",
      icon: "squares-four",
      categories: [
        {
          id: "theme",
          title: "Theme",
          icon: "paint-brush",
          sections: [
            {
              id: "theme-switcher",
              title: "Theme switcher",
              route: "/components/theme-switcher",
              icon: "palette",
              keywords: ["theme", "dark", "light", "contrast"],
            },
            {
              id: "theme-customizer",
              title: "Theme customizer",
              route: "/components/theme-customizer",
              icon: "sliders",
              keywords: [
                "customizer",
                "tokens",
                "live-edit",
                "swatches",
                "fan",
                "variant",
                "primary",
                "controlled",
              ],
            },
          ],
        },
        {
          id: "core",
          title: "Core",
          icon: "cube",
          sections: [
            {
              id: "button",
              title: "Button",
              route: "/components/button",
              icon: "cursor-click",
              keywords: ["button", "click", "cta", "ring", "outline", "ink"],
            },
            {
              id: "badge",
              title: "Badge",
              route: "/components/badge",
              icon: "tag",
              keywords: ["badge", "tag", "pill"],
            },
            {
              id: "alert",
              title: "Alert",
              route: "/components/alert",
              icon: "warning",
              keywords: ["alert", "notice", "banner"],
            },
            {
              id: "card",
              title: "Card",
              route: "/components/card",
              icon: "credit-card",
              keywords: ["card", "panel", "container"],
            },
            {
              id: "dropdown",
              title: "Dropdown",
              route: "/components/dropdown",
              icon: "caret-down",
              keywords: ["dropdown", "menu", "split", "select"],
            },
            {
              id: "menu",
              title: "Menu",
              route: "/components/menu",
              icon: "list-dashes",
              keywords: ["menu", "dropdown", "actions", "context", "items"],
            },
            {
              id: "popover",
              title: "Popover",
              route: "/components/popover",
              icon: "chat-circle-dots",
              keywords: ["popover", "hover", "click", "focus", "tooltip"],
            },
            {
              id: "doc-search",
              title: "Doc Search",
              route: "/components/doc-search",
              icon: "magnifying-glass",
              keywords: [
                "search",
                "docsearch",
                "command palette",
                "cmd k",
                "combobox",
              ],
            },
            {
              id: "global-search",
              title: "Global Search",
              route: "/components/global-search",
              icon: "magnifying-glass-plus",
              keywords: [
                "search",
                "global",
                "palette",
                "cmd k",
                "command",
                "modal",
                "ai",
              ],
            },
            {
              id: "fab",
              title: "Floating Action Button",
              route: "/components/fab",
              icon: "plus-circle",
              keywords: ["fab", "floating", "action", "button"],
            },
            {
              id: "ripple",
              title: "Ripple",
              route: "/components/ripple",
              icon: "drop",
              keywords: ["ripple", "click", "material"],
            },
            {
              id: "expanding-cards",
              title: "Expanding Cards",
              route: "/components/expanding-cards",
              icon: "squares-four",
              keywords: ["expanding", "cards", "gallery", "showcase"],
            },
            {
              id: "spotlight",
              title: "Spotlight",
              route: "/components/spotlight",
              icon: "frame-corners",
              keywords: ["spotlight", "lightbox", "zoom", "gallery"],
            },
            {
              id: "timeline",
              title: "Timeline",
              route: "/components/timeline",
              icon: "clock-clockwise",
              keywords: ["timeline", "history", "changelog", "steps"],
            },
            {
              id: "template",
              title: "Template",
              route: "/components/template",
              icon: "layout",
              keywords: ["template", "layout", "skeleton", "starter"],
            },
            {
              id: "navigation",
              title: "Navigation",
              route: "/components/navigation",
              icon: "compass",
              keywords: [
                "navigation",
                "nav",
                "navbar",
                "sidenav",
                "breadcrumb",
                "pagination",
              ],
            },
          ],
        },
        {
          id: "feedback",
          title: "Feedback",
          icon: "chat-circle",
          sections: [
            {
              id: "modal",
              title: "Modal",
              route: "/components/modal",
              icon: "rectangle",
              keywords: ["modal", "dialog", "overlay"],
            },
            {
              id: "toast",
              title: "Toast",
              route: "/components/toast",
              icon: "bell",
              keywords: ["toast", "notification", "snackbar"],
            },
            {
              id: "tooltip",
              title: "Tooltip",
              route: "/components/tooltip",
              icon: "chat-text",
              keywords: ["tooltip", "hover", "hint", "delay", "dock"],
            },
            {
              id: "chip",
              title: "Chip",
              route: "/components/chip",
              icon: "tag",
              keywords: ["chip", "tag", "token"],
            },
            {
              id: "skeleton",
              title: "Skeleton",
              route: "/components/skeleton",
              icon: "shapes",
              keywords: ["skeleton", "placeholder", "loading"],
            },
            {
              id: "preloader",
              title: "Preloader",
              route: "/components/preloader",
              icon: "circle-notch",
              keywords: ["preloader", "spinner", "loader"],
            },
          ],
        },
        {
          id: "data-display",
          title: "Data display",
          icon: "table",
          sections: [
            {
              id: "avatar",
              title: "Avatar",
              route: "/components/avatar",
              icon: "user-circle",
              keywords: ["avatar", "user", "profile"],
            },
            {
              id: "table",
              title: "Table",
              route: "/components/table",
              icon: "table",
              keywords: [
                "table",
                "grid",
                "data",
                "datatable",
                "sort",
                "search",
                "empty",
              ],
            },
            {
              id: "collection",
              title: "Collection",
              route: "/components/collection",
              icon: "list-bullets",
              keywords: ["collection", "list", "items"],
            },
            {
              id: "breadcrumb",
              title: "Breadcrumb",
              route: "/components/breadcrumb",
              icon: "caret-right",
              keywords: ["breadcrumb", "crumbs", "trail"],
            },
          ],
        },
        {
          id: "interactive",
          title: "Interactive",
          icon: "hand-pointing",
          sections: [
            {
              id: "tabs",
              title: "Tabs",
              route: "/components/tabs",
              icon: "tabs",
              keywords: ["tabs", "tab", "segmented"],
            },
            {
              id: "accordion",
              title: "Accordion",
              route: "/components/accordion",
              icon: "list",
              keywords: ["accordion", "collapse", "expand"],
            },
            {
              id: "flow",
              title: "Flow",
              route: "/components/flow",
              icon: "slideshow",
              keywords: ["flow", "carousel", "slideshow"],
            },
            {
              id: "draggable",
              title: "Draggable",
              route: "/interactive/draggable",
              icon: "arrows-out-cardinal",
              keywords: ["draggable", "drag", "drop", "dropzone"],
            },
            {
              id: "search",
              title: "Search",
              route: "/interactive/search",
              icon: "magnifying-glass",
              keywords: ["search", "find", "query", "autocomplete", "registry"],
            },
          ],
        },
        {
          id: "canvas",
          title: "Canvas",
          icon: "chart-donut",
          sections: [
            {
              id: "charts",
              title: "Charts",
              route: "/canvas/charts",
              icon: "chart-donut",
              keywords: [
                "charts",
                "vd3-charts",
                "chart",
                "bar",
                "line",
                "donut",
                "svg",
                "dashboard",
                "graph",
              ],
            },
            {
              id: "flowchart",
              title: "Flowchart",
              route: "/canvas/flowchart",
              icon: "flow-arrow",
              keywords: [
                "flowchart",
                "vd3-flowchart",
                "diagram",
                "editor",
                "workflow",
                "svg",
                "nodes",
                "edges",
              ],
            },
          ],
        },
        {
          id: "media",
          title: "Media",
          icon: "music-note",
          sections: [
            {
              id: "image-box",
              title: "Image Box",
              route: "/media/image-box",
              icon: "image-square",
              keywords: ["image", "box", "caption", "zoom", "gallery"],
            },
          ],
        },
        {
          id: "guides",
          title: "Guides",
          icon: "book",
          sections: [
            {
              id: "getting-started",
              title: "Getting started",
              route: "/guides/getting-started",
              icon: "rocket-launch",
              keywords: ["getting started", "install", "setup"],
            },
            {
              id: "first-layout",
              title: "Your first layout",
              route: "/guides/first-layout",
              icon: "layout",
              keywords: ["layout", "first", "navbar"],
            },
            {
              id: "framework-integration",
              title: "Installation & Integration",
              route: "/guides/framework-integration",
              icon: "plug",
              keywords: ["integration", "vue", "install", "nuxt", "plugin"],
            },
            {
              id: "runtime-architecture",
              title: "vd3 Architecture",
              route: "/guides/runtime-architecture",
              icon: "cpu",
              keywords: ["runtime", "architecture", "css", "js"],
            },
            {
              id: "lazy-loading",
              title: "Lazy loading",
              route: "/guides/lazy-loading",
              icon: "download",
              keywords: ["lazy", "load", "tree-shake"],
            },
            {
              id: "css-variables",
              title: "CSS variables & theming",
              route: "/guides/css-variables",
              icon: "sliders",
              keywords: ["css", "variables", "theme"],
            },
            {
              id: "theme-customizer-guide",
              title: "Theme customizer",
              route: "/guides/theme-customizer",
              icon: "paint-brush",
              keywords: ["customizer", "live-edit"],
            },
            {
              id: "fibonacci",
              title: "Fibonacci scale",
              route: "/guides/fibonacci",
              icon: "shapes",
              keywords: ["fibonacci", "scale", "spacing"],
            },
            {
              id: "accessibility",
              title: "Accessibility",
              route: "/guides/accessibility",
              icon: "wheelchair",
              keywords: ["accessibility", "a11y", "aria"],
            },
            {
              id: "security",
              title: "Security",
              route: "/guides/security",
              icon: "shield-check",
              keywords: ["security", "xss", "csp", "auth", "login", "csrf"],
            },
            {
              id: "production",
              title: "Production",
              route: "/guides/production",
              icon: "rocket",
              keywords: ["production", "build", "bundle"],
            },
            {
              id: "troubleshooting",
              title: "Troubleshooting",
              route: "/guides/troubleshooting",
              icon: "wrench",
              keywords: ["troubleshoot", "fix", "debug"],
            },
            {
              id: "utilities-cheat-sheet",
              title: "Utilities cheat sheet",
              route: "/guides/utilities-cheat-sheet",
              icon: "list-bullets",
              keywords: ["utilities", "cheat", "reference"],
            },
            {
              id: "vd3-ecosystem",
              title: "vd3 ecosystem",
              route: "/guides/vd3-ecosystem",
              icon: "globe",
              keywords: ["ecosystem", "tools", "projects", "vd3"],
            },
          ],
        },
        {
          id: "effects",
          title: "Effects",
          icon: "sparkle",
          sections: [
            {
              id: "glass",
              title: "Glass",
              route: "/effects/glass",
              icon: "drop",
              keywords: [
                "glass",
                "blur",
                "frosted",
                "seemore",
                "fibonacci",
                "backdrop-filter",
              ],
            },
            {
              id: "surfaces",
              title: "Surfaces",
              route: "/effects/surfaces",
              icon: "checkerboard",
              keywords: [
                "surface",
                "mesh",
                "stripe",
                "noise",
                "aurora",
                "dots",
                "grid",
                "backdrop",
                "seemore",
              ],
            },
            {
              id: "morph",
              title: "Morph",
              route: "/effects/morph",
              icon: "shapes",
              keywords: ["morph", "shape", "animation"],
            },
            {
              id: "parallax",
              title: "Parallax",
              route: "/effects/parallax",
              icon: "mountains",
              keywords: ["parallax", "scroll", "background"],
            },
            {
              id: "liquid-gradient",
              title: "Liquid Gradient",
              route: "/effects/liquid-gradient",
              icon: "wave-sine",
              keywords: [
                "liquid",
                "gradient",
                "webgl",
                "atmosphere",
                "pointer",
              ],
            },
          ],
        },
        {
          id: "forms",
          title: "Forms",
          icon: "textbox",
          sections: [
            {
              id: "forms",
              title: "Form controls",
              route: "/components/forms",
              icon: "list",
              keywords: ["form", "input", "select"],
            },
            {
              id: "login",
              title: "Login",
              route: "/components/login",
              icon: "sign-in",
              keywords: [
                "login",
                "auth",
                "sign-in",
                "signup",
                "otp",
                "checkbox",
                "password",
              ],
            },
            {
              id: "form-validation",
              title: "Form validation",
              route: "/components/form-validation",
              icon: "check",
              keywords: ["form", "validation", "error"],
            },
            {
              id: "datepicker",
              title: "Datepicker",
              route: "/components/datepicker",
              icon: "calendar",
              keywords: ["date", "datepicker", "calendar"],
            },
            {
              id: "timepicker",
              title: "Timepicker",
              route: "/components/timepicker",
              icon: "clock",
              keywords: ["time", "timepicker", "clock"],
            },
            {
              id: "rating",
              title: "Rating",
              route: "/components/rating",
              icon: "star",
              keywords: ["rating", "stars", "review"],
            },
            {
              id: "switch",
              title: "Switch",
              route: "/components/switch",
              icon: "toggle-right",
              keywords: [
                "switch",
                "toggle",
                "on",
                "off",
                "checkbox",
                "boolean",
              ],
            },
            {
              id: "slider",
              title: "Slider",
              route: "/components/slider",
              icon: "sliders-horizontal",
              keywords: ["slider", "range", "input", "value", "drag"],
            },
            {
              id: "stepper",
              title: "Stepper",
              route: "/components/stepper",
              icon: "steps",
              keywords: ["stepper", "wizard", "steps"],
            },
            {
              id: "autocomplete",
              title: "Autocomplete",
              route: "/components/autocomplete",
              icon: "text-aa",
              keywords: ["autocomplete", "typeahead", "search"],
            },
            {
              id: "transfer",
              title: "Transfer",
              route: "/components/transfer",
              icon: "arrows-left-right",
              keywords: ["transfer", "shuttle", "list"],
            },
            {
              id: "tree",
              title: "Tree",
              route: "/components/tree",
              icon: "tree",
              keywords: ["tree", "hierarchy", "nested"],
            },
            {
              id: "pagination",
              title: "Pagination",
              route: "/components/pagination",
              icon: "dots-three",
              keywords: ["pagination", "pages", "pager"],
            },
            {
              id: "button-groups",
              title: "Button group",
              route: "/components/button-groups",
              icon: "squares-four",
              keywords: ["button", "group", "toolbar"],
            },
          ],
        },
        {
          id: "primitives",
          title: "Primitives",
          icon: "shapes",
          sections: [
            {
              id: "progress",
              title: "Progress",
              route: "/components/progress",
              icon: "chart-bar",
              keywords: ["progress", "bar", "loading"],
            },
            {
              id: "spinner",
              title: "Spinner",
              route: "/components/spinner",
              icon: "spinner",
              keywords: ["spinner", "loader", "spinner-gap"],
            },
            {
              id: "code-snippet",
              title: "Code snippet",
              route: "/components/code-snippet",
              icon: "code",
              keywords: ["code", "snippet", "highlight"],
            },
          ],
        },
        {
          id: "layout",
          title: "Layout",
          icon: "layout",
          sections: [
            {
              id: "layout-primitives",
              title: "Primitives",
              route: "/components/primitives",
              icon: "shapes",
              keywords: [
                "primitives",
                "box",
                "stack",
                "inline",
                "center",
                "cover",
                "frame",
                "switcher",
                "layout",
              ],
            },
            {
              id: "separator",
              title: "Separator",
              route: "/components/separator",
              icon: "minus",
              keywords: ["separator", "divider", "hr", "rule", "split"],
            },
            {
              id: "sidenav",
              title: "Sidenav",
              route: "/components/sidenav",
              icon: "sidebar",
              keywords: ["sidenav", "drawer", "panel"],
            },
            {
              id: "sticky",
              title: "Sticky",
              route: "/components/sticky",
              icon: "bookmark-simple",
              keywords: ["sticky", "affix", "pinned"],
            },
            {
              id: "scrollspy",
              title: "Waypoint (Scrollspy)",
              route: "/components/scrollspy",
              icon: "map-trifold",
              keywords: ["scrollspy", "waypoint", "nav"],
            },
            {
              id: "offcanvas",
              title: "Off-canvas",
              route: "/components/offcanvas",
              icon: "rectangle",
              keywords: ["offcanvas", "panel", "slide"],
            },
            {
              id: "navbar",
              title: "Navbar",
              route: "/components/navbar",
              icon: "browser",
              keywords: ["navbar", "header", "top"],
            },
            {
              id: "dock",
              title: "Oola Dock",
              route: "/components/dock",
              icon: "rows",
              keywords: [
                "dock",
                "oola",
                "navbar",
                "bottom",
                "morph",
                "glass",
                "customizer",
                "tint mode",
                "accent",
                "surface",
              ],
            },
            {
              id: "footer",
              title: "Footer",
              route: "/components/footer",
              icon: "layout",
              keywords: ["footer", "bottom", "columns"],
            },
          ],
        },
      ],
    },
  ],
};

export const flattenNav = (tree: NavTree): NavSection[] => {
  const sections: NavSection[] = [];
  for (const tab of tree.tabs) {
    for (const category of tab.categories) {
      for (const section of category.sections) {
        sections.push(section);
      }
    }
  }
  return sections;
};
