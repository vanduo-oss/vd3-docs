# Design

Use ordinary static imports for the 15 measured lightweight pages, retaining
the existing route map and SSG. This eliminates download waits on those pages
for mouse, keyboard, touch, search, and programmatic navigation alike.

An app-provided navigation controller installs beforeEach/afterEach/onError
hooks. Its refs are per app, and browser timers/hooks are disabled during SSG.
Start feedback before async route resolution. Identify the pending normalized
route by object identity so stale cancellation/error callbacks cannot clear a
newer route. Clicking the current page also clears a cancelled pending state.

The pending sidebar link renders the published VdSpinner. The current article
and committed active link remain in place. An indeterminate top bar and polite
announcement appear after 150 ms; aria-busy marks main while loading. An error
offers a full-page reload to recover failed/missing chunks after deployments.
Reduced motion disables progress/spinner animation.

Sidebar hover/focus uses Vue Router's public loadRouteLocation, sharing its
resolved route cache. Coalesce concurrent speculative loads; keep failures
silent until actual navigation. Do not prefetch on saveData/2G when exposed by
the browser. No mass idle preloading, hover dependency for eager pages, or
minimum spinner display time.

Measure gzip-served local production output in installed Chromium, using fresh
browser contexts, three samples, normal and throttled profiles. Record actual
click-handler time to two animation frames after changed article DOM. This is
a paint opportunity proxy, not field INP or a compositor trace. Third-party
resources are blocked consistently; there is no claim of live CDN timing.
