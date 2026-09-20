import type { RouteRecordRaw } from "vue-router";
// Small, frequently browsed component references are available immediately.
// Optional demos and the rest of the catalog retain independent lazy imports.
// Measurements and the explicit eager set: reviews/2026-09-20-navigation/.
const HomePage = () => import("@/pages/home.vue");
const AboutPage = () => import("@/pages/about.vue");
const ChangelogPage = () => import("@/pages/changelog.vue");
const DocsLandingPage = () => import("@/pages/docs-landing.vue");
const CbunPage = () => import("@/pages/cbun.vue");
const NotFoundPage = () => import("@/pages/not-found.vue");

import ButtonPage from "@/pages/components/Button.vue";
import BadgePage from "@/pages/components/Badge.vue";
import AlertPage from "@/pages/components/Alert.vue";
import CardPage from "@/pages/components/Card.vue";
const ModalPage = () => import("@/pages/components/Modal.vue");
const ToastPage = () => import("@/pages/components/Toast.vue");
import TooltipPage from "@/pages/components/Tooltip.vue";
import TabsPage from "@/pages/components/Tabs.vue";
import AccordionPage from "@/pages/components/Accordion.vue";
const FlowPage = () => import("@/pages/components/Flow.vue");
import ProgressPage from "@/pages/components/Progress.vue";
const PrimitivesPage = () => import("@/pages/components/Primitives.vue");
import SpinnerPage from "@/pages/components/Spinner.vue";
const CodeSnippetPage = () => import("@/pages/components/CodeSnippet.vue");
const SidenavPage = () => import("@/pages/components/Sidenav.vue");
const StickyPage = () => import("@/pages/components/Sticky.vue");
const ScrollspyPage = () => import("@/pages/components/Scrollspy.vue");
const OffcanvasPage = () => import("@/pages/components/Offcanvas.vue");
const NavbarPage = () => import("@/pages/components/Navbar.vue");
const DockPage = () => import("@/pages/components/Dock.vue");
const FooterPage = () => import("@/pages/components/Footer.vue");
import AvatarPage from "@/pages/components/Avatar.vue";
const TablePage = () => import("@/pages/components/Table.vue");
const CollectionPage = () => import("@/pages/components/Collection.vue");
import BreadcrumbPage from "@/pages/components/Breadcrumb.vue";
import ChipPage from "@/pages/components/Chip.vue";
const SkeletonPage = () => import("@/pages/components/Skeleton.vue");
const PreloaderPage = () => import("@/pages/components/Preloader.vue");
const FormsPage = () => import("@/pages/components/Forms.vue");
const LoginPage = () => import("@/pages/components/Login.vue");
const FormValidationPage = () =>
  import("@/pages/components/FormValidation.vue");
const DatepickerPage = () => import("@/pages/components/Datepicker.vue");
const TimepickerPage = () => import("@/pages/components/Timepicker.vue");
const RatingPage = () => import("@/pages/components/Rating.vue");
import SwitchPage from "@/pages/components/Switch.vue";
const SliderPage = () => import("@/pages/components/Slider.vue");
import SeparatorPage from "@/pages/components/Separator.vue";
const MenuPage = () => import("@/pages/components/Menu.vue");
const ChartsPage = () => import("@/pages/canvas/Charts.vue");
const FlowchartPage = () => import("@/pages/canvas/Flowchart.vue");
const StepperPage = () => import("@/pages/components/Stepper.vue");
const AutocompletePage = () => import("@/pages/components/Autocomplete.vue");
const TransferPage = () => import("@/pages/components/Transfer.vue");
const TreePage = () => import("@/pages/components/Tree.vue");
const PaginationPage = () => import("@/pages/components/Pagination.vue");
const ButtonGroupsPage = () => import("@/pages/components/ButtonGroups.vue");
import DropdownPage from "@/pages/components/Dropdown.vue";
const RipplePage = () => import("@/pages/components/Ripple.vue");
const FabPage = () => import("@/pages/components/Fab.vue");
const ExpandingCardsPage = () =>
  import("@/pages/components/ExpandingCards.vue");
const SpotlightPage = () => import("@/pages/components/Spotlight.vue");
const TimelinePage = () => import("@/pages/components/Timeline.vue");
const DraggablePage = () => import("@/pages/interactive/Draggable.vue");
const ImageBoxPage = () => import("@/pages/media/ImageBox.vue");
const PopoverPage = () => import("@/pages/components/Popover.vue");
const DocSearchPage = () => import("@/pages/components/DocSearch.vue");
const GlobalSearchPage = () => import("@/pages/components/GlobalSearch.vue");
const SearchPage = () => import("@/pages/interactive/Search.vue");
const TemplatePage = () => import("@/pages/components/Template.vue");
const NavigationPage = () => import("@/pages/components/Navigation.vue");
const ColorPalettePage = () => import("@/pages/core/ColorPalette.vue");
const GlassPage = () => import("@/pages/effects/Glass.vue");
const SurfacesPage = () => import("@/pages/effects/Surfaces.vue");
const ThemeSwitcherPage = () => import("@/pages/components/ThemeSwitcher.vue");
const ThemeCustomizerPage = () =>
  import("@/pages/components/ThemeCustomizer.vue");
const GettingStartedPage = () => import("@/pages/guides/GettingStarted.vue");
const FirstLayoutPage = () => import("@/pages/guides/FirstLayout.vue");
const FrameworkIntegrationPage = () =>
  import("@/pages/guides/FrameworkIntegration.vue");
const RuntimeArchitecturePage = () =>
  import("@/pages/guides/RuntimeArchitecture.vue");
const LazyLoadingPage = () => import("@/pages/guides/LazyLoading.vue");
const CssVariablesPage = () => import("@/pages/guides/CssVariables.vue");
const ThemeCustomizerGuidePage = () =>
  import("@/pages/guides/ThemeCustomizerGuide.vue");
const FibonacciPage = () => import("@/pages/guides/Fibonacci.vue");
const AccessibilityPage = () => import("@/pages/guides/Accessibility.vue");
const SecurityPage = () => import("@/pages/guides/SecurityPractices.vue");
const ProductionPage = () =>
  import("@/pages/guides/ProductionBestPractices.vue");
const TroubleshootingPage = () => import("@/pages/guides/Troubleshooting.vue");
const UtilitiesCheatSheetPage = () =>
  import("@/pages/guides/UtilitiesCheatSheet.vue");
const Vd3EcosystemPage = () => import("@/pages/guides/Vd3Ecosystem.vue");
const MorphPage = () => import("@/pages/effects/Morph.vue");
const ParallaxPage = () => import("@/pages/effects/Parallax.vue");
const LiquidGradientPage = () => import("@/pages/effects/LiquidGradient.vue");
const TypographyPage = () => import("@/pages/core/Typography.vue");
const IconsPage = () => import("@/pages/core/Icons.vue");
const GoldenRatioPage = () => import("@/pages/core/GoldenRatio.vue");
const GridSystemPage = () => import("@/pages/core/GridSystem.vue");
const ShadowsGlowPage = () => import("@/pages/core/ShadowsGlow.vue");

import { nav } from "@/nav";

const componentPages: Record<string, ReturnType<typeof definePage>> = {
  button: ButtonPage,
  badge: BadgePage,
  alert: AlertPage,
  card: CardPage,
  modal: ModalPage,
  toast: ToastPage,
  tooltip: TooltipPage,
  tabs: TabsPage,
  accordion: AccordionPage,
  flow: FlowPage,
  progress: ProgressPage,
  spinner: SpinnerPage,
  "code-snippet": CodeSnippetPage,
  sidenav: SidenavPage,
  sticky: StickyPage,
  scrollspy: ScrollspyPage,
  offcanvas: OffcanvasPage,
  navbar: NavbarPage,
  dock: DockPage,
  footer: FooterPage,
  avatar: AvatarPage,
  table: TablePage,
  collection: CollectionPage,
  breadcrumb: BreadcrumbPage,
  chip: ChipPage,
  skeleton: SkeletonPage,
  preloader: PreloaderPage,
  forms: FormsPage,
  login: LoginPage,
  "form-validation": FormValidationPage,
  datepicker: DatepickerPage,
  timepicker: TimepickerPage,
  rating: RatingPage,
  switch: SwitchPage,
  slider: SliderPage,
  separator: SeparatorPage,
  menu: MenuPage,
  charts: ChartsPage,
  flowchart: FlowchartPage,
  stepper: StepperPage,
  autocomplete: AutocompletePage,
  transfer: TransferPage,
  tree: TreePage,
  pagination: PaginationPage,
  "button-groups": ButtonGroupsPage,
  dropdown: DropdownPage,
  ripple: RipplePage,
  fab: FabPage,
  "expanding-cards": ExpandingCardsPage,
  spotlight: SpotlightPage,
  timeline: TimelinePage,
  draggable: DraggablePage,
  "image-box": ImageBoxPage,
  popover: PopoverPage,
  "doc-search": DocSearchPage,
  "global-search": GlobalSearchPage,
  search: SearchPage,
  template: TemplatePage,
  navigation: NavigationPage,
  "color-palette": ColorPalettePage,
  typography: TypographyPage,
  icons: IconsPage,
  "golden-ratio": GoldenRatioPage,
  "grid-system": GridSystemPage,
  "shadows-glow": ShadowsGlowPage,
  "layout-primitives": PrimitivesPage,
  glass: GlassPage,
  surfaces: SurfacesPage,
  morph: MorphPage,
  parallax: ParallaxPage,
  "liquid-gradient": LiquidGradientPage,
  "theme-switcher": ThemeSwitcherPage,
  "theme-customizer": ThemeCustomizerPage,
  "getting-started": GettingStartedPage,
  "first-layout": FirstLayoutPage,
  "framework-integration": FrameworkIntegrationPage,
  "runtime-architecture": RuntimeArchitecturePage,
  "lazy-loading": LazyLoadingPage,
  "css-variables": CssVariablesPage,
  "theme-customizer-guide": ThemeCustomizerGuidePage,
  fibonacci: FibonacciPage,
  accessibility: AccessibilityPage,
  security: SecurityPage,
  production: ProductionPage,
  troubleshooting: TroubleshootingPage,
  "utilities-cheat-sheet": UtilitiesCheatSheetPage,
  "vd3-ecosystem": Vd3EcosystemPage,
};

function definePage<T>(component: T): T {
  return component;
}

const pageComponents: Record<string, ReturnType<typeof definePage>> = {
  home: HomePage,
  about: AboutPage,
  changelog: ChangelogPage,
  "docs-landing": DocsLandingPage,
  cbun: CbunPage,
};

export const buildRoutes = (): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = [];

  for (const page of nav.pages) {
    const component = pageComponents[page.id];
    if (!component) continue;
    routes.push({
      path: page.route,
      name: `page-${page.id}`,
      component,
      meta: { title: page.title, keywords: page.keywords },
    });
  }

  for (const tab of nav.tabs) {
    for (const category of tab.categories) {
      for (const section of category.sections) {
        const component = componentPages[section.id];
        if (!component) continue;
        routes.push({
          path: section.route,
          name: `section-${section.id}`,
          component,
          meta: {
            title: `${section.title} — ${category.title}`,
            keywords: section.keywords,
            category: category.title,
            sectionId: section.id,
            layout: "docs",
          },
        });
      }
    }
  }

  routes.push({
    path: "/quick-start",
    redirect: "/guides/getting-started",
    meta: { title: "Quick Start", keywords: [] },
  });

  routes.push({
    path: "/guides/vanduo-ecosystem",
    redirect: "/guides/vd3-ecosystem",
    meta: { title: "vd3 ecosystem", keywords: [] },
  });

  // Legacy alias — Icon lived under Primitives but duplicated /core/icons.
  routes.push({
    path: "/components/icon",
    redirect: "/core/icons",
    meta: { title: "Icon", keywords: [] },
  });

  routes.push({
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundPage,
    meta: { title: "Page not found", keywords: [] },
  });

  return routes;
};
