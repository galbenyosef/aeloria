// assets__index-CBRcanzC 22 — children
// Lines 10291-10627 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
function yr() {
  const t = b((o) => o.mapOpen),
    e = b((o) => o.places),
    s = G.useRef(null),
    [i, a] = G.useState(null);
  if (
    (G.useEffect(() => {
      if (!t) return;
      const o = () => s.current && P.drawWorldMap(s.current);
      o();
      const l = setInterval(o, 200);
      return () => clearInterval(l);
    }, [t]),
    !t)
  )
    return null;
  const n = () => b.setState({ mapOpen: !1 }),
    r = (o) => {
      const l = o.currentTarget.getBoundingClientRect(),
        c = P.mapToWorld(
          (o.clientX - l.left) / l.width,
          (o.clientY - l.top) / l.height,
        );
      (a(c), P.flyToPoint(c.x, c.z, !1));
    };
  return u.jsx("div", {
    className: "map-overlay",
    role: "dialog",
    "aria-label": "World map",
    onClick: (o) => {
      o.target === o.currentTarget && n();
    },
    children: u.jsxs("div", {
      className: "panel map-card",
      children: [
        u.jsxs("div", {
          className: "map-head",
          children: [
            u.jsxs("div", {
              children: [
                u.jsx("span", { className: "eyebrow", children: "World map" }),
                u.jsx("h2", { children: "Click anywhere to fly there" }),
              ],
            }),
            u.jsxs("button", {
              className: "btn",
              onClick: n,
              children: ["Close ", u.jsx("kbd", { children: "Esc" })],
            }),
          ],
        }),
        u.jsx("canvas", { ref: s, className: "map-canvas", onClick: r }),
        u.jsxs("div", {
          className: "map-foot",
          children: [
            u.jsxs("div", {
              className: "legend",
              children: [
                u.jsxs("span", {
                  children: [
                    u.jsx("i", {
                      className: "dot",
                      style: { background: "#ffd36a" },
                    }),
                    "Drift seeds",
                  ],
                }),
                u.jsxs("span", {
                  children: [
                    u.jsx("i", {
                      className: "dot",
                      style: { background: "#ff6ad5" },
                    }),
                    "Wild mounts",
                  ],
                }),
                u.jsxs("span", {
                  children: [
                    u.jsx("i", {
                      className: "dot",
                      style: { background: "#5ff2d6" },
                    }),
                    "Places and race course",
                  ],
                }),
              ],
            }),
            u.jsxs("div", {
              className: "row",
              children: [
                i &&
                  u.jsx("button", {
                    className: "btn primary",
                    onClick: () => {
                      (P.flyToPoint(i.x, i.z, !0, it), n());
                    },
                    children: "Jump there now",
                  }),
                e.map((o, l) =>
                  u.jsx(
                    "button",
                    {
                      className: "btn",
                      onClick: () => {
                        (P.flyTo(l, it), n());
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
function wr() {
  const t = b((o) => o.manual),
    e = b((o) => o.touch),
    s = G.useRef(null),
    i = G.useRef(null);
  if (!e || !t) return null;
  const a = (o) => {
      if (!i.current || o.pointerId !== i.current.id) return;
      const l = Math.max(-1, Math.min(1, (o.clientX - i.current.x) / 56)),
        c = Math.max(-1, Math.min(1, (o.clientY - i.current.y) / 56));
      ((P.input.touch.x = l),
        (P.input.touch.y = -c),
        s.current &&
          (s.current.style.transform = `translate(${l * 40}px,${c * 40}px)`));
    },
    n = () => {
      ((i.current = null),
        (P.input.touch.x = P.input.touch.y = 0),
        s.current && (s.current.style.transform = ""));
    },
    r = (o, l) => () => {
      P.input.touch[o] = l;
    };
  return u.jsxs("div", {
    className: "touch",
    children: [
      u.jsx("div", {
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
        children: u.jsx("div", { ref: s, className: "knob" }),
      }),
      u.jsxs("div", {
        className: "touch-btns",
        children: [
          u.jsx("button", {
            className: "tbtn",
            onPointerDown: () => (P.input.trick = 1),
            children: "Roll",
          }),
          u.jsx("button", {
            className: "tbtn",
            onPointerDown: r("dive", !0),
            onPointerUp: r("dive", !1),
            onPointerCancel: r("dive", !1),
            onPointerLeave: r("dive", !1),
            children: "Dive",
          }),
          u.jsx("button", {
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
function br() {
  const t = b((a) => a.sel),
    e = b((a) => a.palettes),
    s = b((a) => a.riderPal),
    i = G.useRef([]);
  return (
    G.useEffect(() => {
      P.labels = i.current;
    }, []),
    u.jsx("div", {
      className: "labels",
      children: ke.map((a, n) => {
        const r = e.find((o) => o.id === s[n]) ?? a.pal;
        return u.jsxs(
          "button",
          {
            ref: (o) => {
              o && (i.current[n] = o);
            },
            className: "tag" + (n === t ? " sel" : ""),
            onClick: () => P.select(n),
            style: { display: "none" },
            children: [u.jsx("i", { style: { background: St(r) } }), a.name],
          },
          a.name,
        );
      }),
    })
  );
}
function Sr() {
  const t = b((i) => i.toast),
    [e, s] = G.useState(!1);
  return (
    G.useEffect(() => {
      if (!t) return;
      s(!0);
      const i = setTimeout(() => s(!1), 2400);
      return () => clearTimeout(i);
    }, [t]),
    u.jsx("div", {
      className: "toast",
      style: { opacity: e ? 1 : 0 },
      role: "status",
      "aria-live": "polite",
      children:
        t &&
        u.jsxs(u.Fragment, {
          children: [t.title, u.jsx("small", { children: t.sub })],
        }),
    })
  );
}
function Mr() {
  const t = b((i) => i.loading),
    e = b((i) => i.loadMsg),
    s = b((i) => i.error);
  return u.jsxs("div", {
    className: "loading" + (t ? "" : " done"),
    "aria-hidden": !t,
    children: [
      u.jsx("div", { className: "t", children: "AELORIA" }),
      u.jsx("div", { className: "by", children: u.jsx(ri, {}) }),
      u.jsx("div", { className: "s", children: e }),
      s && u.jsx("div", { className: "err", children: s }),
    ],
  });
}
function Tr() {
  const t = b((s) => s.photo),
    e = b((s) => s.uiHidden);
  return !t && !e
    ? null
    : u.jsxs("div", {
        className: "photobar",
        children: [
          t &&
            u.jsx("button", {
              className: "btn primary",
              onClick: () => P.savePhoto(),
              children: "Save image",
            }),
          u.jsx("button", {
            className: "btn",
            onClick: () => b.setState({ photo: !1, uiHidden: !1 }),
            children: t ? "Exit photo mode" : "Show UI",
          }),
        ],
      });
}
function kr() {
  const t = b((e) => e.fullscreen);
  return u.jsx("button", {
    className: "btn panel icon",
    onClick: as,
    "aria-pressed": t,
    "aria-label": t ? "Exit full screen" : "Full screen",
    title: (t ? "Exit full screen" : "Full screen") + " (K)",
    children: u.jsx("svg", {
      viewBox: "0 0 16 16",
      "aria-hidden": "true",
      children: t
        ? u.jsx("path", { d: "M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" })
        : u.jsx("path", { d: "M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" }),
    }),
  });
}
const Pr = [
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
  Cr = [
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
