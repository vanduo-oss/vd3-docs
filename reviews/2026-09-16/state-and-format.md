# State ownership and saved documents

## Current state scope

VD3's theme preferences, defaults, storage prefix, and toast queue are module-wide.
Two Vue apps sharing the same package instance share this state. The theme layer
also updates document-level attributes. `storagePrefix` selects browser keys; it
does not create an independent context. Server guards prevent browser access but
do not prevent a caller from mutating the shared reactive state during SSR.

Keep personalized server data in app/request-owned state. Trigger toasts from
client interactions. A static SSG shell does not need a new store. The consumer
skill and source comments now state these limits without implying isolation.

## Proposed isolation API

For applications that require independent themes or personalized SSR, add an
opt-in `createVanduoContext()` factory. Each context would own theme preferences,
defaults, storage adapter/prefix, toast queue, id counters, and disposal. Provide
it through the Vue app's injection scope; composables outside component setup
would receive it explicitly. Existing no-argument composables retain the current
shared default for compatibility.

A theme context must also own a DOM target. Independent apps would apply theme
attributes to their app roots, with overlays teleporting inside that themed
boundary. Merely replacing the reactive singleton is insufficient because the
current document-level theme and body teleports would still couple apps.

Create one context per SSR request, with no browser storage and no shared timers.
Hydrate only the serialized preferences intended for that client. Required tests:
two apps with conflicting themes and toasts; unmounting one app; overlapping SSR
requests; hydration; and overlay colors inside isolated roots.

This is a design, not a shipped isolation API. It warrants a separate minor
release and a consumer requiring independent roots. The current implementation
continues the documented shared scope.

## Flowchart document format

`FLOWCHART_DOCUMENT_VERSION` now owns the saved `version` field. Its initial value
remains `1.2.0`, preserving existing output. `VD_FLOWCHART_VERSION` continues to
track the package release and no longer determines document serialization.

Unversioned partial input and numeric 1.x versions through 1.2.0 use the existing
normalization, including legacy edge markers. Malformed JSON, invalid node/edge
collections, and unsupported future formats throw before the active document,
selection, or history changes. The editor's JSON panel displays the error.

The frozen 1.1.0 fixture still round-trips into 1.2.0. Core callers should catch
load errors. Existing bounds on document size remain; benchmark limits are not
claims that every document below the deserialization cap is interactive.
