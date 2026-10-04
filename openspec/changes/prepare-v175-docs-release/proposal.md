# Prepare the documentation for vd3 1.7.5

The accepted component fixes need accurate package release notes. The homepage
also needs the requested brand polish before the documentation release.

Keep the vd3 changelog column limited to library changes, label 1.7.5 as a
release candidate until npm publication, and retain 1.7.4 as the published latest.
Remove the homepage Seemore Glass and Oola Dock promotions. Add the grey UI suffix
and a small tagline directly below the wordmark, aligned at the same left edge;
reduce the hero mark by 5%. On mobile, center the wordmark and tagline beneath the
logo and shrink that logo by a further 10%; reduce primary navigation glyphs and labels
slightly and enlarge the dock brand while retaining usable button targets.

No new dependencies, package version bump, docs push or deployment. The committed
library pin stays at 1.7.4 until 1.7.5 is published. The local preview is built
against the staged 1.7.5 artifact. A14 and broad B1–B6 remain deferred.

After publication, adopt the exact registry dependency and lockfile for 1.7.5,
replace the candidate label with Latest, and update the landing page and pinned
production example. Changelog dates use month and year, matching existing entries.
Rebuild the local preview from the registry artifact and record its validation.
