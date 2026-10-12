// assets__index-CBRcanzC 20 — children
// Lines 9699-9984 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
function cr() {
  const t = b(
      ns((a) => ({
        sky: a.sky,
        cycle: a.cycle,
        weather: a.weather,
        gfx: a.gfx,
        sound: a.sound,
        seed: a.seed,
        fps: a.hud.fps,
      })),
    ),
    [e, s] = G.useState(String(t.seed));
  G.useEffect(() => s(String(t.seed)), [t.seed]);
  const i = () => {
    const a = parseInt(e, 10);
    Number.isFinite(a) && Xt(Math.abs(a) % 1e6);
  };
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx(ft, {
        id: "l-sky",
        label: "Sky",
        hint: "T",
        value: t.cycle ? "cycle" : String(t.sky),
        onPick: (a) =>
          b.setState(
            a === "cycle" ? { cycle: !t.cycle } : { cycle: !1, sky: +a },
          ),
        options: [
          ["0", "Day"],
          ["0.5", "Dusk"],
          ["1", "Night"],
          ["cycle", "Cycle"],
        ],
      }),
      u.jsx(ft, {
        id: "l-wx",
        label: "Weather",
        value: t.weather,
        onPick: (a) => b.setState({ weather: a }),
        options: [
          ["clear", "Clear"],
          ["mist", "Mist"],
          ["rain", "Rain"],
          ["storm", "Storm"],
        ],
      }),
      u.jsxs("div", {
        className: "grp",
        children: [
          u.jsxs("div", {
            className: "grp-head",
            children: [
              u.jsx("span", { className: "label", children: "World seed" }),
              u.jsx("span", { className: "label", children: "N" }),
            ],
          }),
          u.jsxs("div", {
            className: "row",
            children: [
              u.jsx("input", {
                id: "seed-in",
                inputMode: "numeric",
                "aria-label": "World seed",
                value: e,
                onChange: (a) => s(a.target.value.replace(/\D/g, "")),
                onKeyDown: (a) => {
                  a.key === "Enter" && i();
                },
              }),
              u.jsx("button", {
                className: "btn",
                onClick: i,
                children: "Grow",
              }),
              u.jsx("button", {
                className: "btn primary",
                onClick: () => Xt((Math.random() * 99999) | 0),
                children: "New world",
              }),
            ],
          }),
          u.jsx("button", {
            className: "btn",
            onClick: () => void P.share(),
            children: "Copy link to this world",
          }),
        ],
      }),
      u.jsx(ft, {
        id: "l-gfx",
        label: "Graphics",
        hint: t.fps ? `${t.fps} fps` : void 0,
        value: t.gfx,
        onPick: (a) => b.setState({ gfx: a }),
        options: [
          ["fast", "Fast"],
          ["balanced", "Balanced"],
          ["high", "High"],
        ],
      }),
      u.jsx("small", {
        className: "hint",
        children:
          "High adds shadows, 4× anti-aliasing and denser grass. Fast turns off glow for older phones.",
      }),
      u.jsxs("div", {
        className: "row",
        children: [
          u.jsx("button", {
            className: "btn grow",
            "data-sound": !0,
            "aria-pressed": t.sound,
            onClick: () => P.toggleSound(),
            children: t.sound ? "Sound on" : "Sound off",
          }),
          u.jsx("button", {
            className: "btn grow",
            onClick: () => b.setState({ photo: !0 }),
            children: "Photo mode",
          }),
          u.jsx("button", {
            className: "btn grow",
            onClick: () => b.setState({ uiHidden: !0 }),
            children: "Hide UI",
          }),
        ],
      }),
    ],
  });
}
function hr() {
  const t = b((e) => e.online);
  return t == null
    ? null
    : u.jsxs("div", {
        className: "panel online",
        title: "Players in Aeloria right now",
        children: [u.jsx("i", { "aria-hidden": "true" }), t, " online"],
      });
}
function ur() {
  const t = b((s) => s.panelOpen),
    e = b((s) => s.tab);
  return u.jsxs(u.Fragment, {
    children: [
      u.jsxs("div", {
        className: "top-right",
        children: [
          u.jsx(hr, {}),
          ni() && u.jsx(kr, {}),
          u.jsx("button", {
            className: "btn panel icon",
            onClick: () => P.pause(!0),
            "aria-label": "Pause and show controls",
            title: "Pause, controls and help (Esc)",
            children: u.jsxs("svg", {
              viewBox: "0 0 16 16",
              "aria-hidden": "true",
              children: [
                u.jsx("rect", {
                  x: "3.5",
                  y: "2.5",
                  width: "3",
                  height: "11",
                  rx: "1",
                }),
                u.jsx("rect", {
                  x: "9.5",
                  y: "2.5",
                  width: "3",
                  height: "11",
                  rx: "1",
                }),
              ],
            }),
          }),
          u.jsx("button", {
            className: "btn panel ctrl-toggle",
            "aria-expanded": t,
            "aria-controls": "ctrl",
            onClick: () => b.setState({ panelOpen: !t }),
            children: t ? "Close" : "Settings",
          }),
        ],
      }),
      u.jsxs("aside", {
        id: "ctrl",
        className: "panel ctrl" + (t ? " open" : ""),
        "aria-label": "World controls",
        children: [
          u.jsxs("div", {
            className: "tabs",
            role: "tablist",
            children: [
              u.jsx("button", {
                role: "tab",
                "aria-selected": e === "ride",
                onClick: () => b.setState({ tab: "ride" }),
                children: "Ride",
              }),
              u.jsx("button", {
                role: "tab",
                "aria-selected": e === "world",
                onClick: () => b.setState({ tab: "world" }),
                children: "World",
              }),
            ],
          }),
          e === "ride" ? u.jsx(lr, {}) : u.jsx(cr, {}),
        ],
      }),
    ],
  });
}
function dr() {
  const t = b((i) => i.sel),
    e = b((i) => i.palettes),
    s = b((i) => i.riderPal);
  return u.jsx("nav", {
    className: "panel roster",
    "aria-label": "Riders",
    children: ke.map((i, a) => {
      const n = e.find((r) => r.id === s[a]) ?? i.pal;
      return u.jsxs(
        "button",
        {
          className: "rider",
          "aria-pressed": a === t,
          onClick: () => P.select(a),
          children: [
            u.jsx("span", { className: "sw", style: { background: St(n) } }),
            u.jsxs("span", {
              children: [
                u.jsx("b", { children: i.name }),
                u.jsxs("small", { children: [a + 1, " · ", n.name] }),
              ],
            }),
          ],
        },
        i.name,
      );
    }),
  });
}
function fr() {
  const t = b((i) => i.bond),
    e = t.dist < 40,
    s = (i) => () => {
      P.bondHold = i;
    };
  return !t.name || t.dist > 160
    ? null
    : u.jsxs("div", {
        className: "chip bond",
        children: [
          u.jsx("span", {
            className: "sw sm",
            style: { background: t.swatch ?? void 0 },
          }),
          u.jsxs("span", {
            children: [
              u.jsx("b", { children: t.name }),
              u.jsxs("small", {
                children: ["wild · ", Math.round(t.dist), " m"],
              }),
            ],
          }),
          e
            ? u.jsxs("button", {
                className: "btn primary hold",
                onPointerDown: s(!0),
                onPointerUp: s(!1),
                onPointerLeave: s(!1),
                onPointerCancel: s(!1),
                style: { "--p": String(Math.min(1, t.progress)) },
                children: ["Hold to bond ", u.jsx("kbd", { children: "B" })],
              })
            : u.jsx("small", {
                className: "hint",
                children: "fly closer to bond",
              }),
        ],
      });
}
