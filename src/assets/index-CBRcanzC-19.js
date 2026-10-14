// assets/index-CBRcanzC 19 — jsxruntime
// Lines 9372-9698 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
const engine = new AeloriaEngine();
function setSeed(t) {
  const e = new URL(location.href);
  (e.searchParams.set("seed", String(t)),
    history.replaceState(null, "", e),
    engine.grow(t, useGameStore.getState().quality));
}
const fullscreenAvailable = () =>
  !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
function toggleFullscreen() {
  const t = document,
    e = document.documentElement;
  try {
    t.fullscreenElement || t.webkitFullscreenElement
      ? t.exitFullscreen
        ? t.exitFullscreen()
        : t.webkitExitFullscreen?.()
      : e.requestFullscreen
        ? e.requestFullscreen({ navigationUI: "hide" }).catch(() => {})
        : e.webkitRequestFullscreen?.();
  } catch {}
}
function shallowEqual(t, e) {
  if (Object.is(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  if (t instanceof Map && e instanceof Map) {
    if (t.size !== e.size) return !1;
    for (const [i, a] of t) if (!Object.is(a, e.get(i))) return !1;
    return !0;
  }
  if (t instanceof Set && e instanceof Set) {
    if (t.size !== e.size) return !1;
    for (const i of t) if (!e.has(i)) return !1;
    return !0;
  }
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !1;
  for (const i of s)
    if (!Object.prototype.hasOwnProperty.call(e, i) || !Object.is(t[i], e[i]))
      return !1;
  return !0;
}
const { useRef: useRef } = reactHooks;
function useShallow(t) {
  const e = useRef();
  return (s) => {
    const i = t(s);
    return shallowEqual(e.current, i) ? e.current : (e.current = i);
  };
}
const authorUrl = "https://x.com/0xRhinoX",
  platformUrl = "https://pokeable.app/",
  linkProps = { target: "_blank", rel: "noopener" },
  creditIcon = () =>
    jsxRuntime.jsx("svg", {
      className: "out",
      viewBox: "0 0 12 12",
      "aria-hidden": "true",
      children: jsxRuntime.jsx("path", { d: "M4.5 2.5h5v5M9.5 2.5 3 9" }),
    });
function creditsLine() {
  return jsxRuntime.jsxs("span", {
    className: "credits",
    children: [
      jsxRuntime.jsx("span", { children: "by" }),
      jsxRuntime.jsxs("a", {
        href: authorUrl,
        ...linkProps,
        title: "0xRhinoX on X (opens in a new tab)",
        children: ["@0xRhinoX", jsxRuntime.jsx(creditIcon, {})],
      }),
      jsxRuntime.jsx("span", { children: "more worlds on" }),
      jsxRuntime.jsxs("a", {
        href: platformUrl,
        ...linkProps,
        title: "Pokeable: AI-built worlds and toys (opens in a new tab)",
        children: ["Pokeable", jsxRuntime.jsx(creditIcon, {})],
      }),
    ],
  });
}
const fadeToBlack = () =>
    new Promise((t) => {
      const e = document.getElementById("fade");
      if (!e) return t();
      ((e.style.opacity = "1"),
        setTimeout(() => {
          (t(), setTimeout(() => (e.style.opacity = "0"), 80));
        }, 380));
    }),
  formatDistance = (t) => (t < 1e3 ? `${Math.round(t)} m` : `${(t / 1e3).toFixed(1)} km`),
  formatTime = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;
function SettingRow({ label: t, hint: e, value: s, options: i, onPick: a, id: n }) {
  return jsxRuntime.jsxs("div", {
    className: "grp",
    children: [
      jsxRuntime.jsxs("div", {
        className: "grp-head",
        children: [
          jsxRuntime.jsx("span", { className: "label", id: n, children: t }),
          e && jsxRuntime.jsx("span", { className: "label", children: e }),
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "seg",
        role: "group",
        "aria-labelledby": n,
        children: i.map(([r, o]) =>
          jsxRuntime.jsx(
            "button",
            { "aria-pressed": s === r, onClick: () => a(r), children: o },
            String(r),
          ),
        ),
      }),
    ],
  });
}
function TopBar() {
  const t = useGameStore((n) => n.seed),
    e = useGameStore((n) => n.stats),
    s = useGameStore((n) => n.hud.tris),
    i = useGameStore((n) => n.introOpen),
    a = useGameStore((n) => n.manual);
  return (
    React.useEffect(() => {
      a && useGameStore.setState({ introOpen: !1 });
    }, [a]),
    React.useEffect(() => {
      const n = setTimeout(() => useGameStore.setState({ introOpen: !1 }), 16e3);
      return () => clearTimeout(n);
    }, []),
    jsxRuntime.jsxs("header", {
      className: "panel intro" + (i ? "" : " closed"),
      children: [
        jsxRuntime.jsxs("button", {
          className: "intro-head",
          onClick: () => useGameStore.setState({ introOpen: !i }),
          "aria-expanded": i,
          children: [
            jsxRuntime.jsxs("span", {
              className: "eyebrow",
              children: ["Procedural world · seed ", t],
            }),
            jsxRuntime.jsx("h1", { children: "Aeloria" }),
          ],
        }),
        i &&
          jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsxs("p", {
                children: [
                  "Every leaf, cliff, waterfall and glow here is grown in your browser from one number. ",
                  jsxRuntime.jsx("b", {
                    children: "No models, no textures, no assets.",
                  }),
                  " Click a rider to fly with them, or press ",
                  jsxRuntime.jsx("kbd", { children: "F" }),
                  " and fly yourself. ",
                  jsxRuntime.jsx("kbd", { children: "Esc" }),
                  " pauses and shows every control.",
                ],
              }),
              jsxRuntime.jsxs("dl", {
                className: "stats",
                children: [
                  jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsx("dt", { children: "Floating isles" }),
                      jsxRuntime.jsx("dd", { children: e.isles || "—" }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsx("dt", { children: "Plants" }),
                      jsxRuntime.jsx("dd", {
                        children: e.plants
                          ? (e.plants / 1e3).toFixed(1) + "k"
                          : "—",
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsx("dt", { children: "Triangles" }),
                      jsxRuntime.jsx("dd", {
                        children: s ? (s / 1e6).toFixed(1) + "M" : "—",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
      ],
    })
  );
}
function FlightPanel() {
  const t = useGameStore(useShallow((c) => ({ cam: c.cam, assist: c.assist }))),
    e = useGameStore((c) => c.places),
    s = useGameStore((c) => c.hud.dists),
    i = useGameStore((c) => c.hud.near),
    a = useGameStore((c) => c.palettes),
    n = useGameStore((c) => c.riderPal),
    r = useGameStore((c) => c.sel),
    [o, l] = React.useState(engine.input.invertY);
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      jsxRuntime.jsx(SettingRow, {
        id: "l-cam",
        label: "Camera",
        hint: "C",
        value: t.cam,
        onPick: (c) => engine.setCam(c),
        options: [
          ["chase", "Chase"],
          ["seat", "Saddle"],
          ["drone", "Drone"],
          ["orbit", "Orbit"],
          ["cinema", "Film"],
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "grp",
        children: [
          jsxRuntime.jsxs("div", {
            className: "grp-head",
            children: [
              jsxRuntime.jsx("span", { className: "label", children: "Fly to" }),
              jsxRuntime.jsx("span", { className: "label", children: "M map" }),
            ],
          }),
          jsxRuntime.jsx("div", {
            className: "places",
            children: e.map((c, f) =>
              jsxRuntime.jsxs(
                "button",
                {
                  title: c.sub,
                  className: f === i ? "here" : "",
                  onClick: () => engine.flyTo(f, fadeToBlack),
                  children: [
                    jsxRuntime.jsx("span", { children: c.name }),
                    jsxRuntime.jsx("small", { children: s[f] != null ? formatDistance(s[f]) : "—" }),
                  ],
                },
                c.name,
              ),
            ),
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "grp",
        children: [
          jsxRuntime.jsx("div", {
            className: "grp-head",
            children: jsxRuntime.jsxs("span", {
              className: "label",
              children: ["Mount colours · ", mountDefs[r].name],
            }),
          }),
          jsxRuntime.jsx("div", {
            className: "swatches",
            children: a.map((c) =>
              jsxRuntime.jsx(
                "button",
                {
                  className: "sw",
                  title: c.name,
                  "aria-label": c.name,
                  "aria-pressed": n[r] === c.id,
                  style: { background: paletteGradientCss(c) },
                  onClick: () => engine.applyPalette(c.id),
                },
                c.id,
              ),
            ),
          }),
          jsxRuntime.jsx("small", {
            className: "hint",
            children:
              "Collect drift seeds or bond with wild mounts to unlock more.",
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "grp",
        children: [
          jsxRuntime.jsx("div", {
            className: "grp-head",
            children: jsxRuntime.jsx("span", {
              className: "label",
              children: "Flying yourself",
            }),
          }),
          jsxRuntime.jsxs("label", {
            className: "check",
            children: [
              jsxRuntime.jsx("input", {
                type: "checkbox",
                checked: t.assist,
                onChange: (c) => useGameStore.setState({ assist: c.target.checked }),
              }),
              " Flight assist (steer around rock, pull up near ground)",
            ],
          }),
          jsxRuntime.jsxs("label", {
            className: "check",
            children: [
              jsxRuntime.jsx("input", {
                type: "checkbox",
                checked: o,
                onChange: (c) => {
                  ((engine.input.invertY = c.target.checked), l(c.target.checked));
                },
              }),
              " Invert mouse up and down",
            ],
          }),
        ],
      }),
    ],
  });
}
