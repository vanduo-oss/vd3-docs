import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/home.vue";
import AboutPage from "@/pages/about.vue";
import ChangelogPage from "@/pages/changelog.vue";
import KiloOssPage from "@/pages/kilo-oss.vue";
import DocsLandingPage from "@/pages/docs-landing.vue";
import NotFoundPage from "@/pages/not-found.vue";

import ButtonPage from "@/pages/components/Button.vue";
import BadgePage from "@/pages/components/Badge.vue";
import AlertPage from "@/pages/components/Alert.vue";
import CardPage from "@/pages/components/Card.vue";
import ModalPage from "@/pages/components/Modal.vue";
import ToastPage from "@/pages/components/Toast.vue";
import TooltipPage from "@/pages/components/Tooltip.vue";
import TabsPage from "@/pages/components/Tabs.vue";
import AccordionPage from "@/pages/components/Accordion.vue";
import FlowPage from "@/pages/components/Flow.vue";
import ProgressPage from "@/pages/components/Progress.vue";
import PrimitivesPage from "@/pages/components/Primitives.vue";
import SpinnerPage from "@/pages/components/Spinner.vue";
import CodeSnippetPage from "@/pages/components/CodeSnippet.vue";
import IconPage from "@/pages/components/Icon.vue";
import SidenavPage from "@/pages/components/Sidenav.vue";
import StickyPage from "@/pages/components/Sticky.vue";
import ScrollspyPage from "@/pages/components/Scrollspy.vue";
import OffcanvasPage from "@/pages/components/Offcanvas.vue";
import NavbarPage from "@/pages/components/Navbar.vue";
import FooterPage from "@/pages/components/Footer.vue";
import AvatarPage from "@/pages/components/Avatar.vue";
import TablePage from "@/pages/components/Table.vue";
import CollectionPage from "@/pages/components/Collection.vue";
import BreadcrumbPage from "@/pages/components/Breadcrumb.vue";
import ChipPage from "@/pages/components/Chip.vue";
import SkeletonPage from "@/pages/components/Skeleton.vue";
import PreloaderPage from "@/pages/components/Preloader.vue";
import FormsPage from "@/pages/components/Forms.vue";
import FormValidationPage from "@/pages/components/FormValidation.vue";
import DatepickerPage from "@/pages/components/Datepicker.vue";
import TimepickerPage from "@/pages/components/Timepicker.vue";
import RatingPage from "@/pages/components/Rating.vue";
import SwitchPage from "@/pages/components/Switch.vue";
import SliderPage from "@/pages/components/Slider.vue";
import SeparatorPage from "@/pages/components/Separator.vue";
import MenuPage from "@/pages/components/Menu.vue";
import ChartsPage from "@/pages/canvas/Charts.vue";
import FlowchartPage from "@/pages/canvas/Flowchart.vue";
import HexPage from "@/pages/canvas/Hex.vue";
import MusicPlayerPage from "@/pages/media/MusicPlayer.vue";
import StepperPage from "@/pages/components/Stepper.vue";
import AutocompletePage from "@/pages/components/Autocomplete.vue";
import TransferPage from "@/pages/components/Transfer.vue";
import TreePage from "@/pages/components/Tree.vue";
import PaginationPage from "@/pages/components/Pagination.vue";
import ButtonGroupsPage from "@/pages/components/ButtonGroups.vue";
import DropdownPage from "@/pages/components/Dropdown.vue";
import RipplePage from "@/pages/components/Ripple.vue";
import FabPage from "@/pages/components/Fab.vue";
import ExpandingCardsPage from "@/pages/components/ExpandingCards.vue";
import SpotlightPage from "@/pages/components/Spotlight.vue";
import TimelinePage from "@/pages/components/Timeline.vue";
import DraggablePage from "@/pages/interactive/Draggable.vue";
import ImageBoxPage from "@/pages/media/ImageBox.vue";
import PopoverPage from "@/pages/components/Popover.vue";
import DocSearchPage from "@/pages/components/DocSearch.vue";
import SearchPage from "@/pages/interactive/Search.vue";
import TemplatePage from "@/pages/components/Template.vue";
import NavigationPage from "@/pages/components/Navigation.vue";
import ColorPalettePage from "@/pages/core/ColorPalette.vue";
import GlassPage from "@/pages/effects/Glass.vue";
import ThemeSwitcherPage from "@/pages/components/ThemeSwitcher.vue";
import ThemeCustomizerPage from "@/pages/components/ThemeCustomizer.vue";
import GettingStartedPage from "@/pages/guides/GettingStarted.vue";
import FirstLayoutPage from "@/pages/guides/FirstLayout.vue";
import FrameworkIntegrationPage from "@/pages/guides/FrameworkIntegration.vue";
import RuntimeArchitecturePage from "@/pages/guides/RuntimeArchitecture.vue";
import LazyLoadingPage from "@/pages/guides/LazyLoading.vue";
import CssVariablesPage from "@/pages/guides/CssVariables.vue";
import ThemeCustomizerGuidePage from "@/pages/guides/ThemeCustomizerGuide.vue";
import FibonacciPage from "@/pages/guides/Fibonacci.vue";
import AccessibilityPage from "@/pages/guides/Accessibility.vue";
import SecurityPage from "@/pages/guides/SecurityPractices.vue";
import ProductionPage from "@/pages/guides/ProductionBestPractices.vue";
import MigrationPage from "@/pages/guides/MigrationComparison.vue";
import TroubleshootingPage from "@/pages/guides/Troubleshooting.vue";
import UtilitiesCheatSheetPage from "@/pages/guides/UtilitiesCheatSheet.vue";
import VanduoEcosystemPage from "@/pages/guides/VanduoEcosystem.vue";
import MorphPage from "@/pages/effects/Morph.vue";
import ParallaxPage from "@/pages/effects/Parallax.vue";
import TypographyPage from "@/pages/core/Typography.vue";
import IconsPage from "@/pages/core/Icons.vue";
import GoldenRatioPage from "@/pages/core/GoldenRatio.vue";
import GridSystemPage from "@/pages/core/GridSystem.vue";
import ShadowsGlowPage from "@/pages/core/ShadowsGlow.vue";

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
  icon: IconPage,
  sidenav: SidenavPage,
  sticky: StickyPage,
  scrollspy: ScrollspyPage,
  offcanvas: OffcanvasPage,
  navbar: NavbarPage,
  footer: FooterPage,
  avatar: AvatarPage,
  table: TablePage,
  collection: CollectionPage,
  breadcrumb: BreadcrumbPage,
  chip: ChipPage,
  skeleton: SkeletonPage,
  preloader: PreloaderPage,
  forms: FormsPage,
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
  hex: HexPage,
  "music-player": MusicPlayerPage,
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
  morph: MorphPage,
  parallax: ParallaxPage,
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
  migration: MigrationPage,
  troubleshooting: TroubleshootingPage,
  "utilities-cheat-sheet": UtilitiesCheatSheetPage,
  "vanduo-ecosystem": VanduoEcosystemPage,
};

function definePage<T>(component: T): T {
  return component;
}

const pageComponents: Record<string, ReturnType<typeof definePage>> = {
  home: HomePage,
  about: AboutPage,
  changelog: ChangelogPage,
  "kilo-oss": KiloOssPage,
  "docs-landing": DocsLandingPage,
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
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundPage,
    meta: { title: "Page not found", keywords: [] },
  });

  return routes;
};
