# AELORIA — offline mirror

Full mirror of **AELORIA** (https://aeloria.pokeable.app/), a procedural
bioluminescent world of floating mountains, giant trees and winged riders,
grown in the browser from a single seed.

Source: https://aeloria.pokeable.app/

![AELORIA](docs/cover.png)

## Stack

- **Vite production build** — hashed root-relative `assets/` chunks and the
  Vite modulepreload polyfill inside the app entry chunk (`assets/index-CBRcanzC.js`)
- **three.js r169** — its own vendor chunk (`assets/three-Bf1rlsf7.js`, license
  banner preserved)
- **React runtime chunk** — React/react-dom/react-reconciler + react-three-fiber
  + zustand in `assets/react-D7CucQ1e.js`
- **pmndrs/postprocessing v6.37.1** — inlined into the app chunk by the build,
  license-anchored (`postprocessing v6.37.1 build`, @license Zlib)
- **World generation in a module worker** — `assets/worker-BdHOuDMt.js` bundles
  the three.js worker core plus the app's seeded world builder
- **Everything else is procedural** — textures are painted to canvases, audio is
  synthesized with WebAudio (dozens of oscillator/gain call sites), trees,
  waterfalls and the minimap are generated from code: the capture carries no
  image, model, audio or font payloads
- **pokeable.app platform hosting** — per-game subdomain on Cloudflare; the
  platform injects the Cloudflare Web Analytics beacon and `/cdn-cgi/rum`

## What this is

AELORIA (aeloria.pokeable.app) — "A procedural bioluminescent world of floating
mountains, giant trees and winged riders, grown in your browser from a single
seed": pick a rider and their winged mount (Kaelo, Sora, Tavi, Ruun, Ilsa, Oru,
each with their own mount colours) and fly a seeded world — Hanging Peaks,
Elder Tree, Lumen Forest, Amber Plains, Mirror Lake — racing rings, collecting
drift seeds, bonding wild mounts and riding with a 300 m sky whale. By
@0xRhinoX, published on the pokeable.app game-hosting platform.

The capture is the whole runtime closure: 6 files, 1,359,953 bytes (1.36 MB) —
the entry document, the app entry chunk, the React runtime chunk, the three.js
r169 chunk, the world-generation worker chunk and the stylesheet. Closure was
iterated to fixpoint (static scan of every captured HTML/JS/CSS: script/link
refs, `new URL("…", import.meta.url)` worker paths, dynamic `import("…")`,
bare imports and asset-path string literals) and cross-checked against the
live browser's network log while actually playing: all five same-origin asset
requests matched the capture byte-for-byte (`decodedBodySize` 240,317 /
276,084 / 683,693 / 140,475 / 17,253), zero 404s from the game, zero off-origin
requests other than the two externals below.

External, at runtime, on this origin: the Google Fonts stylesheet
(Marcellus / Figtree / IBM Plex Mono — the game's type; kept CDN, never
backfilled) and the platform's Cloudflare Web Analytics beacon
(`static.cloudflareinsights.com`) plus its same-origin `/cdn-cgi/rum` POST.
Both are platform/telemetry-level and fail soft — the loopback boot test's
resource log is exactly the six captured files plus those externals, and the
game renders and flies with the beacon blocked (the loopback origin answers
`/cdn-cgi/rum` with a 404). Anything pokeable.app-platform-provided (hosting,
the beacon, the platform credit link in the credits panel) is noted as such in
this README, not captured as game content.

Upstream quirk (recorded, not a defect of the mirror): `assets/react-D7CucQ1e.js`
serves intermittently — some edge responses answer the entry document
(HTTP 200 `text/html`, the static host's SPA fallback) instead of the chunk.
The capture holds the real 200 `text/javascript` bytes (re-probed repeatedly),
and `tools/update.mjs` retries once and records such responses as `fallback`
known-noise rows instead of drift.

## Layout

- `index.html` — the entry document as served to browsers (byte-exact, 2,131 B;
  the browser-variant bytes include the platform-injected Cloudflare beacon tag)
- `assets/` — the five captured files as served: `index-CBRcanzC.js` (app entry
  chunk), `react-D7CucQ1e.js` (React runtime chunk), `three-Bf1rlsf7.js`
  (three.js r169), `worker-BdHOuDMt.js` (world-generation worker),
  `index-Ctb6YBeZ.css` (stylesheet)
- `.upstream/manifest.json` — Gen-A sha256 record for all 6 captured files
- `readable/` — prettified derived layer (pinned prettier 3.9.6, module API):
  `assets__index-CBRcanzC.pretty.js`, `assets__worker-BdHOuDMt.pretty.js`,
  `assets__react-D7CucQ1e.pretty.js`, `assets__three-Bf1rlsf7.pretty.js` and
  `assets__index-Ctb6YBeZ.pretty.css`
- `src/` + `split-spec.json` — 30 statement-aligned slices (`<tag>-NN.js`,
  exact 2-line provenance header) across the app entry chunk (24) and the
  worker's app section (6), with the derivation record (36 sections)
- `tools/derive.mjs` — rebuild `readable/` + `src/` + `split-spec.json`
- `tools/verify.mjs` — re-hash the capture against the manifest
- `tools/update.mjs` — read-only drift probe against the live origin
- `tools/audit.js` — integrity gate for the derived layers (`AUDIT PASS`)
- `docs/cover.png`, `docs/boot-2026-10-13.png` — cover + boot evidence (both
  captured in actual gameplay against the served mirror: rider on the wing
  over the glowing canopy, HUD with altitude/speed and the minimap in frame)

## Assets

none — code/docs only. The capture carries no image, model, audio or font
payloads: the game paints its textures to canvases, synthesizes its audio with
WebAudio and grows the entire world in code (the seeded world builder in
`assets/worker-BdHOuDMt.js`); the only library asset is the three.js vendor
chunk. The favicon is an inline `data:` SVG. Fonts come from the Google Fonts
stylesheet (external, never captured).

## Run

Serve the repo root with any static file server (the capture is a static site;
no build step):

```
npx serve .
```

The game boots at `http://localhost:3000/` and grows a seeded world (append
`?seed=NNNN` to pick a seed; a `?debug` flag exposes `window.aeloria`).

## Verify

```
node tools/verify.mjs     # re-hash the capture against the manifest
node tools/audit.js       # derived-layer integrity gate
```

Last run: `6 files checked, 0 problems` and `AUDIT PASS`.

## Updating from upstream

```
node tools/update.mjs     # read-only drift probe: what changed upstream
```

The probe never rewrites the capture — a mirror is a point-in-time snapshot.
Refreshing means re-fetching the full runtime closure into a clean tree, copying
every replaced file into `legacy/<date>/`, re-cutting `.upstream/manifest.json`,
and re-deriving `readable/` + `src/` from the new bytes with
`node tools/derive.mjs`. Known noise rows: `_mirror-report.json` is a local
capture record and is never probed (excluded by name); `cdn-cgi/` is platform
telemetry and is never probed; a 200 `text/html` body on a non-HTML captured
file is the static host's SPA fallback (see the upstream quirk above) and is
recorded as `fallback` noise, not drift.

### 2026-10-13 readable/src derivation

Both queued derived layers are in place, cut from the recorded capture (capture
bytes untouched — `node tools/verify.mjs` re-hashes all 6 files):

- `readable/` — pinned prettier 3.9.6 (module API, default options, single pass
  verified idempotent — never the CLI, it respects `.gitignore` and can silently
  echo its input) rendered the four captured JS chunks to `*.pretty.js` (70,816
  lines: app entry 11,088; React runtime 17,448; three.js 33,397; worker 8,883)
  and the stylesheet to `*.pretty.css` (1 file, 1,211 lines). Names are
  capture-relative with `/` flattened to `__` (`assets__index-CBRcanzC`, …).
  Every pretty is provably not a byte copy of its capture source and re-renders
  byte-exact under the pinned version.
- `src/` — 30 statement-aligned slices (`src/<tag>-NN.js`, exact 2-line
  provenance header) recorded in `split-spec.json` (36 sections): 30/30 parse
  standalone (`node --input-type=module --check -`) and round-trip byte-exact to
  their readable line ranges. Cuts land only on top-level declaration
  boundaries (~250–350 line windows); oversized single declarations stay whole
  (largest: `assets__index-CBRcanzC-18.js`, 1,536 lines — the engine class,
  kept whole; the sky-whale/leviathan class follows at 568). Identification is
  the bundle's own minified names — the rename campaign (PLAN §5) remains an
  open task in this README.
- Vendor rule — wholeFile sections, never sliced (6): the three.js r169 build
  (`assets/three-Bf1rlsf7-vendor.js`), the React runtime chunk
  (`assets/react-D7CucQ1e-vendor.js`: React/react-dom/react-reconciler +
  react-three-fiber + zustand), the bundled three.js r169 worker core inside
  `assets/worker-BdHOuDMt.js` (content-anchored: it ends at the classic
  `__THREE__`/`__THREE_DEVTOOLS__` module tail and the app's world builder
  resumes right after), the inlined pmndrs/postprocessing v6.37.1 region inside
  the app chunk (license-anchored, asserted between the app's camera code and
  its wing builder), the Vite modulepreload polyfill (build machinery) and the
  stylesheet.
- Non-standalone parts would be indexed as skipped sections; this capture has
  none (no pure trailing export tables — the chunks end in code, and vendor
  export tables live inside wholeFile vendor sections). Non-code payloads:
  zero (`notRendered: 0`). Inline entry blocks: zero — `index.html` references
  external resources only (module script, modulepreload links, stylesheet,
  Google Fonts, the platform beacon), so there are no `*-inline-N` twins and no
  `readable/index-inline-map.json`.
- Gates: `node tools/verify.mjs` → `6 files checked, 0 problems`;
  `node tools/audit.js` → `AUDIT PASS` (30/30 round-trips, 5/5 pretties
  re-render byte-exact, 5/5 pretty sources tiled, 3/3 imports resolve inside the
  capture — the two chunk imports and the `new URL("/assets/worker-BdHOuDMt.js",
  import.meta.url)` worker path); `node tools/update.mjs` → `up to date: 6
  captured files identical upstream`; serve probe — mirror root served on
  loopback (entry + all five assets over HTTP 200, bytes identical to the
  capture), listener killed, port 4311 closed (netstat + connection refused).
  Boot evidence and cover are real gameplay (`docs/boot-2026-10-13.png`,
  `docs/cover.png`) — the seeded world grown in the worker, rider on the wing
  over the glowing canopy, HUD with altitude/speed and minimap in frame,
  captured through the opencli browser against the served mirror; its resource
  log matched the 6-file capture exactly. Rebuild with `node tools/derive.mjs`.
- §0.4 fork-over-mirror checked 2026-10-13: the page and all five captured JS
  files were scanned for a public source repo — every `github.com` reference is
  a library credit (`github.com/pmndrs/postprocessing`,
  `github.com/pmndrs/zustand/discussions/1937`,
  `docs.pmnd.rs/react-three-fiber`), plus the author's `x.com/0xRhinoX` and the
  platform's `pokeable.app` credit link; no project's own repository is
  referenced or published, and a GitHub search finds nothing — the platform
  publishes the deployment only, so the mirror stands.

## Mirror conventions

- **Capture layer** — the captured files are byte-exact copies of what the
  origin served; nothing in them is edited. Vendor files (three.js, React) stay
  byte-exact exactly as served — never re-minified or re-hosted.
- **Readable layer** — `readable/` is derived (prettified) and never shipped to
  a browser; it exists so the bundles can actually be read.
- **Provenance** — `.upstream/manifest.json` records sha256 for each captured
  artifact, and `tools/verify.mjs` re-checks it.
- **Drift** — `tools/update.mjs` is read-only: it reports what changed upstream
  and never rewrites the capture.
- **Open task** — the identifier rename campaign (PLAN §5): `src/` carries the
  bundles' own minified names; a per-file rename pass over the reversed slices
  is queued, not claimed.

## Fleet status

<!-- mirror-status:start — feeds _standard/REPO-INDEX.md. Update ONLY your own mirror's block; never edit the shared index (PLAN §8). Rebuild: node _standard/build-index.mjs -->
<!-- cols: cls=classification · ver=verify 0 problems · upd=drift probe · man=manifest · rdbl=readable re-derived · src=reversed src · boot=boot test · top=offline-mirror topic · tag=backup tag · staged=staged not committed -->
| # | repo | cls | ver | upd | man | rdbl | src | boot | top | tag | staged |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | aeloria | mirror | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
<!-- mirror-status:end -->
