// assets__index-CBRcanzC 23 — children
// Lines 10628-10885 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
function Ps({ title: t, rows: e, touch: s, pad: i }) {
  return u.jsxs("div", {
    className: "grp",
    children: [
      u.jsx("span", { className: "label", children: t }),
      u.jsx("table", {
        className: "keytable",
        children: u.jsx("tbody", {
          children: e.map(([a, n, r, o]) => {
            const l = s ? o : i ? r : n;
            return l
              ? u.jsxs(
                  "tr",
                  {
                    children: [
                      u.jsx("th", { scope: "row", children: a }),
                      u.jsx("td", { children: l }),
                    ],
                  },
                  a,
                )
              : null;
          }),
        }),
      }),
    ],
  });
}
function Ar() {
  const t = b(
      ns((n) => ({
        paused: n.paused,
        touch: n.touch,
        pad: n.hud.pad,
        sound: n.sound,
        fs: n.fullscreen,
        manual: n.manual,
      })),
    ),
    e = G.useRef(null),
    [s, i] = G.useState("kb");
  if (
    (G.useEffect(() => {
      t.paused &&
        (i(t.touch ? "touch" : t.pad ? "pad" : "kb"), e.current?.focus());
    }, [t.paused]),
    !t.paused)
  )
    return null;
  const a = () => P.pause(!1);
  return u.jsx("div", {
    className: "pause-overlay",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "pause-title",
    onClick: (n) => {
      n.target === n.currentTarget && a();
    },
    children: u.jsxs("div", {
      className: "panel pause-card",
      children: [
        u.jsxs("div", {
          className: "pause-head",
          children: [
            u.jsxs("div", {
              children: [
                u.jsx("span", { className: "eyebrow", children: "Paused" }),
                u.jsx("h2", { id: "pause-title", children: "How to fly" }),
              ],
            }),
            u.jsxs("button", {
              ref: e,
              className: "btn primary",
              onClick: a,
              children: [
                "Resume ",
                !t.touch && u.jsx("kbd", { children: "Esc" }),
              ],
            }),
          ],
        }),
        u.jsx("p", {
          className: "hint",
          children:
            "Flight runs on energy. Diving trades height for speed, climbing spends it. Flapping gives thrust but drains stamina, which refills while you glide, collect drift seeds or pass race rings. Fly too slow and you stall. Flight assist (Settings → Ride) steers you around rock.",
        }),
        u.jsx("div", {
          className: "seg",
          role: "group",
          "aria-label": "Show controls for",
          children: [
            ["kb", "Keyboard + mouse"],
            ["pad", "Gamepad"],
            ["touch", "Touch"],
          ].map(([n, r]) =>
            u.jsx(
              "button",
              { "aria-pressed": s === n, onClick: () => i(n), children: r },
              n,
            ),
          ),
        }),
        u.jsxs("div", {
          className: "pause-cols",
          children: [
            u.jsx(Ps, {
              title: t.manual ? "Flying (your reins)" : "Flying yourself",
              rows: Pr,
              touch: s === "touch",
              pad: s === "pad",
            }),
            u.jsx(Ps, {
              title: "Exploring",
              rows: Cr,
              touch: s === "touch",
              pad: s === "pad",
            }),
          ],
        }),
        u.jsxs("div", {
          className: "row",
          children: [
            ni() &&
              u.jsxs("button", {
                className: "btn grow",
                "aria-pressed": t.fs,
                onClick: as,
                children: [
                  t.fs ? "Exit full screen" : "Full screen",
                  !t.touch && u.jsx("kbd", { children: "K" }),
                ],
              }),
            u.jsxs("button", {
              className: "btn grow",
              "data-sound": !0,
              "aria-pressed": t.sound,
              onClick: () => P.toggleSound(),
              children: [
                t.sound ? "Sound on" : "Sound off",
                !t.touch && u.jsx("kbd", { children: "O" }),
              ],
            }),
          ],
        }),
        u.jsx("div", { className: "by pause-by", children: u.jsx(ri, {}) }),
      ],
    }),
  });
}
function Er() {
  const t = b((n) => n.loading),
    e = b((n) => n.manual),
    s = b((n) => n.touch),
    [i, a] = G.useState(!1);
  return (
    G.useEffect(() => {
      if (t || X.get("took-reins", !1)) return;
      const n = setTimeout(() => a(!0), 3600),
        r = setTimeout(() => a(!1), 13600);
      return () => {
        (clearTimeout(n), clearTimeout(r));
      };
    }, [t]),
    G.useEffect(() => {
      e && (X.set("took-reins", !0), a(!1));
    }, [e]),
    !i || e
      ? null
      : u.jsxs("div", {
          className: "panel reins-hint",
          role: "status",
          children: [
            u.jsx("span", { className: "eyebrow", children: "Autopilot" }),
            u.jsxs("p", {
              children: [
                "Your mount is flying itself. ",
                s
                  ? u.jsxs(u.Fragment, {
                      children: [
                        "Tap ",
                        u.jsx("b", { children: "Take reins" }),
                        " to fly yourself.",
                      ],
                    })
                  : u.jsxs(u.Fragment, {
                      children: [
                        "Press ",
                        u.jsx("kbd", { children: "F" }),
                        " to take the reins and fly yourself.",
                      ],
                    }),
              ],
            }),
            u.jsxs("div", {
              className: "row",
              children: [
                u.jsxs("button", {
                  className: "btn primary",
                  onClick: () => P.reins(!0),
                  children: [
                    "Take reins",
                    !s && u.jsx("kbd", { children: "F" }),
                  ],
                }),
                u.jsx("button", {
                  className: "btn",
                  onClick: () => a(!1),
                  children: "Keep watching",
                }),
              ],
            }),
          ],
        })
  );
}
const He = er(),
  Cs = X.get("gfx", null) ?? ai(He),
  os = Math.min(devicePixelRatio, He === "low" ? 1 : 1.5);
P.dpr = os;
P.maxDpr = os;
b.setState({ gfx: ["fast", "balanced", "high"].includes(Cs) ? Cs : ai(He) });
function zr() {
  const t = new URLSearchParams(location.search),
    e = parseInt(t.get("seed") || "", 10),
    s = parseInt(t.get("rider") || "", 10),
    i = t.get("sky"),
    a = t.get("weather");
  b.setState({
    quality: He,
    seed: Number.isFinite(e) ? Math.abs(e) % 1e6 : 7319,
    sel: Number.isFinite(s) ? Math.max(0, Math.min(5, s - 1)) : 0,
    ...(i === "cycle"
      ? { cycle: !0 }
      : i != null && !isNaN(+i)
        ? { sky: Math.max(0, Math.min(1, +i)) }
        : {}),
    ...(a && ["clear", "mist", "rain", "storm"].includes(a)
      ? { weather: a }
      : {}),
  });
}
function Rr() {
  const t = ui((e) => e.get);
  return (
    di((e, s) => {
      if (!P.ready) return;
      if (b.getState().paused) {
        (P.pollPaused(), P.render(0));
        return;
      }
      const i = Math.min(s, 0.05);
      P.update(i);
      const { viewport: a, setDpr: n } = t();
      (Math.abs(a.dpr - P.dpr) > 0.01 && n(P.dpr), P.render(i));
    }, 1),
    null
  );
}
