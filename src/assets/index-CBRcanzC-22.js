// assets/index-CBRcanzC 22 — jsxruntime
// Lines 10291-10627 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
function WorldMapPanel() {
  const t = useGameStore((o) => o.mapOpen),
    e = useGameStore((o) => o.places),
    s = React.useRef(null),
    [i, a] = React.useState(null);
  if (
    (React.useEffect(() => {
      if (!t) return;
      const o = () => s.current && engine.drawWorldMap(s.current);
      o();
      const l = setInterval(o, 200);
      return () => clearInterval(l);
    }, [t]),
    !t)
  )
    return null;
  const n = () => useGameStore.setState({ mapOpen: !1 }),
    r = (o) => {
      const l = o.currentTarget.getBoundingClientRect(),
        c = engine.mapToWorld(
          (o.clientX - l.left) / l.width,
          (o.clientY - l.top) / l.height,
        );
      (a(c), engine.flyToPoint(c.x, c.z, !1));
    };
  return jsxRuntime.jsx("div", {
    className: "map-overlay",
    role: "dialog",
    "aria-label": "World map",
    onClick: (o) => {
      o.target === o.currentTarget && n();
    },
    children: jsxRuntime.jsxs("div", {
      className: "panel map-card",
      children: [
        jsxRuntime.jsxs("div", {
          className: "map-head",
          children: [
            jsxRuntime.jsxs("div", {
              children: [
                jsxRuntime.jsx("span", { className: "eyebrow", children: "World map" }),
                jsxRuntime.jsx("h2", { children: "Click anywhere to fly there" }),
              ],
            }),
            jsxRuntime.jsxs("button", {
              className: "btn",
              onClick: n,
              children: ["Close ", jsxRuntime.jsx("kbd", { children: "Esc" })],
            }),
          ],
        }),
        jsxRuntime.jsx("canvas", { ref: s, className: "map-canvas", onClick: r }),
        jsxRuntime.jsxs("div", {
          className: "map-foot",
          children: [
            jsxRuntime.jsxs("div", {
              className: "legend",
              children: [
                jsxRuntime.jsxs("span", {
                  children: [
                    jsxRuntime.jsx("i", {
                      className: "dot",
                      style: { background: "#ffd36a" },
                    }),
                    "Drift seeds",
                  ],
                }),
                jsxRuntime.jsxs("span", {
                  children: [
                    jsxRuntime.jsx("i", {
                      className: "dot",
                      style: { background: "#ff6ad5" },
                    }),
                    "Wild mounts",
                  ],
                }),
                jsxRuntime.jsxs("span", {
                  children: [
                    jsxRuntime.jsx("i", {
                      className: "dot",
                      style: { background: "#5ff2d6" },
                    }),
                    "Places and race course",
                  ],
                }),
              ],
            }),
            jsxRuntime.jsxs("div", {
              className: "row",
              children: [
                i &&
                  jsxRuntime.jsx("button", {
                    className: "btn primary",
                    onClick: () => {
                      (engine.flyToPoint(i.x, i.z, !0, fadeToBlack), n());
                    },
                    children: "Jump there now",
                  }),
                e.map((o, l) =>
                  jsxRuntime.jsx(
                    "button",
                    {
                      className: "btn",
                      onClick: () => {
                        (engine.flyTo(l, fadeToBlack), n());
                      },
                      children: o.name,
                    },
                    o.name,
                  ),
                ),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function TouchControls() {
  const t = useGameStore((o) => o.manual),
    e = useGameStore((o) => o.touch),
    s = React.useRef(null),
    i = React.useRef(null);
  if (!e || !t) return null;
  const a = (o) => {
      if (!i.current || o.pointerId !== i.current.id) return;
      const l = Math.max(-1, Math.min(1, (o.clientX - i.current.x) / 56)),
        c = Math.max(-1, Math.min(1, (o.clientY - i.current.y) / 56));
      ((engine.input.touch.x = l),
        (engine.input.touch.y = -c),
        s.current &&
          (s.current.style.transform = `translate(${l * 40}px,${c * 40}px)`));
    },
    n = () => {
      ((i.current = null),
        (engine.input.touch.x = engine.input.touch.y = 0),
        s.current && (s.current.style.transform = ""));
    },
    r = (o, l) => () => {
      engine.input.touch[o] = l;
    };
  return jsxRuntime.jsxs("div", {
    className: "touch",
    children: [
      jsxRuntime.jsx("div", {
        className: "stick",
        onPointerDown: (o) => {
          o.target.setPointerCapture(o.pointerId);
          const l = o.currentTarget.getBoundingClientRect();
          ((i.current = {
            x: l.left + l.width / 2,
            y: l.top + l.height / 2,
            id: o.pointerId,
          }),
            a(o));
        },
        onPointerMove: a,
        onPointerUp: n,
        onPointerCancel: n,
        "aria-label": "Steer",
        children: jsxRuntime.jsx("div", { ref: s, className: "knob" }),
      }),
      jsxRuntime.jsxs("div", {
        className: "touch-btns",
        children: [
          jsxRuntime.jsx("button", {
            className: "tbtn",
            onPointerDown: () => (engine.input.trick = 1),
            children: "Roll",
          }),
          jsxRuntime.jsx("button", {
            className: "tbtn",
            onPointerDown: r("dive", !0),
            onPointerUp: r("dive", !1),
            onPointerCancel: r("dive", !1),
            onPointerLeave: r("dive", !1),
            children: "Dive",
          }),
          jsxRuntime.jsx("button", {
            className: "tbtn big",
            onPointerDown: r("flap", !0),
            onPointerUp: r("flap", !1),
            onPointerCancel: r("flap", !1),
            onPointerLeave: r("flap", !1),
            children: "Flap",
          }),
        ],
      }),
    ],
  });
}
function RiderCarousel() {
  const t = useGameStore((a) => a.sel),
    e = useGameStore((a) => a.palettes),
    s = useGameStore((a) => a.riderPal),
    i = React.useRef([]);
  return (
    React.useEffect(() => {
      engine.labels = i.current;
    }, []),
    jsxRuntime.jsx("div", {
      className: "labels",
      children: mountDefs.map((a, n) => {
        const r = e.find((o) => o.id === s[n]) ?? a.pal;
        return jsxRuntime.jsxs(
          "button",
          {
            ref: (o) => {
              o && (i.current[n] = o);
            },
            className: "tag" + (n === t ? " sel" : ""),
            onClick: () => engine.select(n),
            style: { display: "none" },
            children: [jsxRuntime.jsx("i", { style: { background: paletteGradientCss(r) } }), a.name],
          },
          a.name,
        );
      }),
    })
  );
}
function Toast() {
  const t = useGameStore((i) => i.toast),
    [e, s] = React.useState(!1);
  return (
    React.useEffect(() => {
      if (!t) return;
      s(!0);
      const i = setTimeout(() => s(!1), 2400);
      return () => clearTimeout(i);
    }, [t]),
    jsxRuntime.jsx("div", {
      className: "toast",
      style: { opacity: e ? 1 : 0 },
      role: "status",
      "aria-live": "polite",
      children:
        t &&
        jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [t.title, jsxRuntime.jsx("small", { children: t.sub })],
        }),
    })
  );
}
function LoadingOverlay() {
  const t = useGameStore((i) => i.loading),
    e = useGameStore((i) => i.loadMsg),
    s = useGameStore((i) => i.error);
  return jsxRuntime.jsxs("div", {
    className: "loading" + (t ? "" : " done"),
    "aria-hidden": !t,
    children: [
      jsxRuntime.jsx("div", { className: "t", children: "AELORIA" }),
      jsxRuntime.jsx("div", { className: "by", children: jsxRuntime.jsx(creditsLine, {}) }),
      jsxRuntime.jsx("div", { className: "s", children: e }),
      s && jsxRuntime.jsx("div", { className: "err", children: s }),
    ],
  });
}
function PhotoModeHint() {
  const t = useGameStore((s) => s.photo),
    e = useGameStore((s) => s.uiHidden);
  return !t && !e
    ? null
    : jsxRuntime.jsxs("div", {
        className: "photobar",
        children: [
          t &&
            jsxRuntime.jsx("button", {
              className: "btn primary",
              onClick: () => engine.savePhoto(),
              children: "Save image",
            }),
          jsxRuntime.jsx("button", {
            className: "btn",
            onClick: () => useGameStore.setState({ photo: !1, uiHidden: !1 }),
            children: t ? "Exit photo mode" : "Show UI",
          }),
        ],
      });
}
function FullscreenButton() {
  const t = useGameStore((e) => e.fullscreen);
  return jsxRuntime.jsx("button", {
    className: "btn panel icon",
    onClick: toggleFullscreen,
    "aria-pressed": t,
    "aria-label": t ? "Exit full screen" : "Full screen",
    title: (t ? "Exit full screen" : "Full screen") + " (K)",
    children: jsxRuntime.jsx("svg", {
      viewBox: "0 0 16 16",
      "aria-hidden": "true",
      children: t
        ? jsxRuntime.jsx("path", { d: "M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" })
        : jsxRuntime.jsx("path", { d: "M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" }),
    }),
  });
}
const HELP_ROWS = [
    ["Take the reins / autopilot", "F", "Start", "Take reins button"],
    [
      "Steer",
      "Mouse (click the view first) or WASD / arrows",
      "Left stick",
      "Left stick on screen",
    ],
    ["Flap: thrust, uses stamina", "Space", "A or RT", "Flap"],
    ["Dive: tuck the wings", "Shift", "B or LT", "Dive"],
    ["Barrel roll", "Q / E", "X", "Roll"],
  ],
  TOUCH_ROWS = [
    ["Switch rider", "1–6, Tab, or click a rider", "LB / RB", "Tap a rider"],
    [
      "Camera: chase, saddle, drone, orbit, film",
      "C (Shift+C back)",
      "Y",
      "Settings → Ride",
    ],
    ["World map, fly anywhere", "M", "Back", "Minimap"],
    ["Ring race", "R", "", "Race button"],
    ["Seek a wild flock / hold to bond", "G / hold B", "", "Activity buttons"],
    ["Ride with the Leviathan", "L", "", "Activity buttons"],
    ["Sky: day, dusk, night", "T", "", "Settings → World"],
    ["Photo mode", "P", "", "Settings → World"],
    ["Hide the interface", "H", "", ""],
    ["Sound", "O", "", "Below"],
    ["Full screen", "K", "", "Below"],
    ["New world", "N", "", "Settings → World"],
    [
      "Pause and this help",
      "Esc (twice while aiming with the mouse)",
      "",
      "Pause button, top right",
    ],
    ["Resume", "Esc", "Start", "Resume"],
  ];
