// assets__index-CBRcanzC 19 — children
// Lines 9372-9698 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
const P = new sr();
function Xt(t) {
  const e = new URL(location.href);
  (e.searchParams.set("seed", String(t)),
    history.replaceState(null, "", e),
    P.grow(t, b.getState().quality));
}
const ni = () =>
  !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
function as() {
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
function ir(t, e) {
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
const { useRef: ar } = ci;
function ns(t) {
  const e = ar();
  return (s) => {
    const i = t(s);
    return ir(e.current, i) ? e.current : (e.current = i);
  };
}
const nr = "https://x.com/0xRhinoX",
  rr = "https://pokeable.app/",
  Ts = { target: "_blank", rel: "noopener" },
  ks = () =>
    u.jsx("svg", {
      className: "out",
      viewBox: "0 0 12 12",
      "aria-hidden": "true",
      children: u.jsx("path", { d: "M4.5 2.5h5v5M9.5 2.5 3 9" }),
    });
function ri() {
  return u.jsxs("span", {
    className: "credits",
    children: [
      u.jsx("span", { children: "by" }),
      u.jsxs("a", {
        href: nr,
        ...Ts,
        title: "0xRhinoX on X (opens in a new tab)",
        children: ["@0xRhinoX", u.jsx(ks, {})],
      }),
      u.jsx("span", { children: "more worlds on" }),
      u.jsxs("a", {
        href: rr,
        ...Ts,
        title: "Pokeable: AI-built worlds and toys (opens in a new tab)",
        children: ["Pokeable", u.jsx(ks, {})],
      }),
    ],
  });
}
const it = () =>
    new Promise((t) => {
      const e = document.getElementById("fade");
      if (!e) return t();
      ((e.style.opacity = "1"),
        setTimeout(() => {
          (t(), setTimeout(() => (e.style.opacity = "0"), 80));
        }, 380));
    }),
  rs = (t) => (t < 1e3 ? `${Math.round(t)} m` : `${(t / 1e3).toFixed(1)} km`),
  Vt = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;
function ft({ label: t, hint: e, value: s, options: i, onPick: a, id: n }) {
  return u.jsxs("div", {
    className: "grp",
    children: [
      u.jsxs("div", {
        className: "grp-head",
        children: [
          u.jsx("span", { className: "label", id: n, children: t }),
          e && u.jsx("span", { className: "label", children: e }),
        ],
      }),
      u.jsx("div", {
        className: "seg",
        role: "group",
        "aria-labelledby": n,
        children: i.map(([r, o]) =>
          u.jsx(
            "button",
            { "aria-pressed": s === r, onClick: () => a(r), children: o },
            String(r),
          ),
        ),
      }),
    ],
  });
}
function or() {
  const t = b((n) => n.seed),
    e = b((n) => n.stats),
    s = b((n) => n.hud.tris),
    i = b((n) => n.introOpen),
    a = b((n) => n.manual);
  return (
    G.useEffect(() => {
      a && b.setState({ introOpen: !1 });
    }, [a]),
    G.useEffect(() => {
      const n = setTimeout(() => b.setState({ introOpen: !1 }), 16e3);
      return () => clearTimeout(n);
    }, []),
    u.jsxs("header", {
      className: "panel intro" + (i ? "" : " closed"),
      children: [
        u.jsxs("button", {
          className: "intro-head",
          onClick: () => b.setState({ introOpen: !i }),
          "aria-expanded": i,
          children: [
            u.jsxs("span", {
              className: "eyebrow",
              children: ["Procedural world · seed ", t],
            }),
            u.jsx("h1", { children: "Aeloria" }),
          ],
        }),
        i &&
          u.jsxs(u.Fragment, {
            children: [
              u.jsxs("p", {
                children: [
                  "Every leaf, cliff, waterfall and glow here is grown in your browser from one number. ",
                  u.jsx("b", {
                    children: "No models, no textures, no assets.",
                  }),
                  " Click a rider to fly with them, or press ",
                  u.jsx("kbd", { children: "F" }),
                  " and fly yourself. ",
                  u.jsx("kbd", { children: "Esc" }),
                  " pauses and shows every control.",
                ],
              }),
              u.jsxs("dl", {
                className: "stats",
                children: [
                  u.jsxs("div", {
                    children: [
                      u.jsx("dt", { children: "Floating isles" }),
                      u.jsx("dd", { children: e.isles || "—" }),
                    ],
                  }),
                  u.jsxs("div", {
                    children: [
                      u.jsx("dt", { children: "Plants" }),
                      u.jsx("dd", {
                        children: e.plants
                          ? (e.plants / 1e3).toFixed(1) + "k"
                          : "—",
                      }),
                    ],
                  }),
                  u.jsxs("div", {
                    children: [
                      u.jsx("dt", { children: "Triangles" }),
                      u.jsx("dd", {
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
function lr() {
  const t = b(ns((c) => ({ cam: c.cam, assist: c.assist }))),
    e = b((c) => c.places),
    s = b((c) => c.hud.dists),
    i = b((c) => c.hud.near),
    a = b((c) => c.palettes),
    n = b((c) => c.riderPal),
    r = b((c) => c.sel),
    [o, l] = G.useState(P.input.invertY);
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx(ft, {
        id: "l-cam",
        label: "Camera",
        hint: "C",
        value: t.cam,
        onPick: (c) => P.setCam(c),
        options: [
          ["chase", "Chase"],
          ["seat", "Saddle"],
          ["drone", "Drone"],
          ["orbit", "Orbit"],
          ["cinema", "Film"],
        ],
      }),
      u.jsxs("div", {
        className: "grp",
        children: [
          u.jsxs("div", {
            className: "grp-head",
            children: [
              u.jsx("span", { className: "label", children: "Fly to" }),
              u.jsx("span", { className: "label", children: "M map" }),
            ],
          }),
          u.jsx("div", {
            className: "places",
            children: e.map((c, f) =>
              u.jsxs(
                "button",
                {
                  title: c.sub,
                  className: f === i ? "here" : "",
                  onClick: () => P.flyTo(f, it),
                  children: [
                    u.jsx("span", { children: c.name }),
                    u.jsx("small", { children: s[f] != null ? rs(s[f]) : "—" }),
                  ],
                },
                c.name,
              ),
            ),
          }),
        ],
      }),
      u.jsxs("div", {
        className: "grp",
        children: [
          u.jsx("div", {
            className: "grp-head",
            children: u.jsxs("span", {
              className: "label",
              children: ["Mount colours · ", ke[r].name],
            }),
          }),
          u.jsx("div", {
            className: "swatches",
            children: a.map((c) =>
              u.jsx(
                "button",
                {
                  className: "sw",
                  title: c.name,
                  "aria-label": c.name,
                  "aria-pressed": n[r] === c.id,
                  style: { background: St(c) },
                  onClick: () => P.applyPalette(c.id),
                },
                c.id,
              ),
            ),
          }),
          u.jsx("small", {
            className: "hint",
            children:
              "Collect drift seeds or bond with wild mounts to unlock more.",
          }),
        ],
      }),
      u.jsxs("div", {
        className: "grp",
        children: [
          u.jsx("div", {
            className: "grp-head",
            children: u.jsx("span", {
              className: "label",
              children: "Flying yourself",
            }),
          }),
          u.jsxs("label", {
            className: "check",
            children: [
              u.jsx("input", {
                type: "checkbox",
                checked: t.assist,
                onChange: (c) => b.setState({ assist: c.target.checked }),
              }),
              " Flight assist (steer around rock, pull up near ground)",
            ],
          }),
          u.jsxs("label", {
            className: "check",
            children: [
              u.jsx("input", {
                type: "checkbox",
                checked: o,
                onChange: (c) => {
                  ((P.input.invertY = c.target.checked), l(c.target.checked));
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
