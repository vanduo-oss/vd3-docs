## REMOVED Requirements

### Requirement: no premature package or site code

**Reason**: This change is exactly the `docs-clone-and-strip` the scaffold
deferred to — it lands the vd2 clone, so the site now legitimately contains a
`package.json`, `src/`, build config, and CI/deploy workflow. The scaffold's
"repo holds hygiene files only" invariant was a point-in-time gate for the
`init-docs-scaffold` change; leaving it in the promoted spec would assert
something now provably false.

**Migration**: None. The remaining `repo-scaffold` requirements (ignore rules,
MIT license, README status) still hold — the README's "site arrives via the
`docs-clone-and-strip` openspec change" line becomes an accurate description of
history rather than a forward-looking promise. Build/test artifacts produced by
the now-present site are already covered by the existing `.gitignore` rules.
