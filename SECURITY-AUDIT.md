# Development audit exceptions

Approved by the maintainer on 2026-10-08 for the vd3 ecosystem security pass.
Owner: vanduo-oss. Review at the next dependency update or release and no later
than 2026-12-31, or sooner if a patched path ships.

## braces — CVE-2026-93687 / GHSA-vfj7-8cjw-p6xm

- Installed path: `stylelint > micromatch > braces@3.0.3`.
- Issue: deeply nested brace patterns can exhaust the Node call stack.
- Patched version: none at approval time.
- Scope: development tooling only (stylelint on repository-owned CSS). The docs
  site does not ship braces. CI uses the explicit pnpm exception:

```sh
pnpm audit --audit-level=moderate --ignore GHSA-vfj7-8cjw-p6xm
```

pnpm 10.28.2 does not enforce the former `auditConfig.ignoreCves` workspace
setting. An unfiltered `pnpm audit --audit-level=moderate` remains the evidence
that the approved advisory is still present.

## uri-js — CVE-2026-93690 / CVE-2026-93751 / CVE-2026-103387

- Installed path: `eslint > ajv > uri-js@4.4.1`.
- Patched version: none reported by Snyk (`fixedIn: []`).
- Scope: eslint on repository-owned sources.

## Snyk organization policy

The `vanduo-oss-default` organization-specific policy contains exactly:

- `SNYK-JS-BRACES-19963945`
- `SNYK-JS-URIJS-19963961`
- `SNYK-JS-URIJS-19963963`
- `SNYK-JS-URIJS-20341609`

The policy has no automatic expiry and no unpatched-only condition. Review and
remove it manually by 2026-12-31, removing individual IDs earlier when patched
paths ship. Do not add fixable findings or MPL-2.0 license findings.

## Local review scripts

`reviews/**` helpers are CLI-only trust-boundary tools (loopback benchmark
server, script-derived sibling-workspace fixture root, enumerated phase/output
args). They are not part of the deployed docs SSG output. Do not exclude whole
`reviews/` trees.

Hardening in place for `reviews/2026-09-20-navigation/benchmark.mjs`:

- Pre-indexes the approved `dist` tree into an allowlist `Map`; request
  handlers only exact-match URL keys and never join request input into `fs`.
- Loopback bind (`127.0.0.1`), method allowlist, decode failure handling,
  response security headers, and an 8 MiB pre-read file-size bound with a
  second post-read check.

Residual Snyk Code finding (loopback HTTP required by the benchmark):

| Finding ID                             | Rule                     | Rationale                                        | Expiry     |
| -------------------------------------- | ------------------------ | ------------------------------------------------ | ---------- |
| `ad633225-7fb7-488c-bd00-65945de52aac` | `javascript/HttpToHttps` | Loopback-only Chromium measurement; not deployed | 2026-12-31 |

On 2026-10-12, a Snyk Code scan that included ignored findings reported four
low `javascript/PT` notes. They were removed in code rather than ignored:

- `reviews/2026-09-20-cbun-responsive/inspect.mjs` now rejects every phase
  except `before` and `after`, then selects only literal screenshot and JSON
  paths.
- `reviews/2026-09-20-navigation/benchmark.mjs` now accepts only the literal
  `dist` root and assigns output paths from explicit switch branches. CLI input
  no longer reaches `readdirSync`, `readFileSync`, or `writeFileSync`.

The follow-up scan reported exactly one finding: the already-approved,
organization-ignored loopback `javascript/HttpToHttps` exception above. It
reported no actionable Code findings and no low path notes.

## Removal conditions

Same as [@vanduo-oss/vd3 SECURITY-AUDIT.md](https://github.com/vanduo-oss/vd3/blob/main/SECURITY-AUDIT.md):
remove when a patched release exists and gates stay green; do not broaden.
