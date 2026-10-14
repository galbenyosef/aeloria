// assets/index-CBRcanzC 20 — jsxruntime
// Lines 9699-9984 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
function SkyPanel() {
  const t = useGameStore(
      useShallow((a) => ({
        sky: a.sky,
        cycle: a.cycle,
        weather: a.weather,
        gfx: a.gfx,
        sound: a.sound,
        seed: a.seed,
        fps: a.hud.fps,
      })),
    ),
    [e, s] = React.useState(String(t.seed));
  React.useEffect(() => s(String(t.seed)), [t.seed]);
  const i = () => {
    const a = parseInt(e, 10);
    Number.isFinite(a) && setSeed(Math.abs(a) % 1e6);
  };
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      jsxRuntime.jsx(SettingRow, {
        id: "l-sky",
        label: "Sky",
        hint: "T",
        value: t.cycle ? "cycle" : String(t.sky),
        onPick: (a) =>
          useGameStore.setState(
            a === "cycle" ? { cycle: !t.cycle } : { cycle: !1, sky: +a },
          ),
        options: [
          ["0", "Day"],
          ["0.5", "Dusk"],
          ["1", "Night"],
          ["cycle", "Cycle"],
        ],
      }),
      jsxRuntime.jsx(SettingRow, {
        id: "l-wx",
        label: "Weather",
        value: t.weather,
        onPick: (a) => useGameStore.setState({ weather: a }),
        options: [
          ["clear", "Clear"],
          ["mist", "Mist"],
          ["rain", "Rain"],
          ["storm", "Storm"],
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "grp",
        children: [
          jsxRuntime.jsxs("div", {
            className: "grp-head",
            children: [
              jsxRuntime.jsx("span", { className: "label", children: "World seed" }),
              jsxRuntime.jsx("span", { className: "label", children: "N" }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            className: "row",
            children: [
              jsxRuntime.jsx("input", {
                id: "seed-in",
                inputMode: "numeric",
                "aria-label": "World seed",
                value: e,
                onChange: (a) => s(a.target.value.replace(/\D/g, "")),
                onKeyDown: (a) => {
                  a.key === "Enter" && i();
                },
              }),
              jsxRuntime.jsx("button", {
                className: "btn",
                onClick: i,
                children: "Grow",
              }),
              jsxRuntime.jsx("button", {
                className: "btn primary",
                onClick: () => setSeed((Math.random() * 99999) | 0),
                children: "New world",
              }),
            ],
          }),
          jsxRuntime.jsx("button", {
            className: "btn",
            onClick: () => void engine.share(),
            children: "Copy link to this world",
          }),
        ],
      }),
      jsxRuntime.jsx(SettingRow, {
        id: "l-gfx",
        label: "Graphics",
        hint: t.fps ? `${t.fps} fps` : void 0,
        value: t.gfx,
        onPick: (a) => useGameStore.setState({ gfx: a }),
        options: [
          ["fast", "Fast"],
          ["balanced", "Balanced"],
          ["high", "High"],
        ],
      }),
      jsxRuntime.jsx("small", {
        className: "hint",
        children:
          "High adds shadows, 4× anti-aliasing and denser grass. Fast turns off glow for older phones.",
      }),
      jsxRuntime.jsxs("div", {
        className: "row",
        children: [
          jsxRuntime.jsx("button", {
            className: "btn grow",
            "data-sound": !0,
            "aria-pressed": t.sound,
            onClick: () => engine.toggleSound(),
            children: t.sound ? "Sound on" : "Sound off",
          }),
          jsxRuntime.jsx("button", {
            className: "btn grow",
            onClick: () => useGameStore.setState({ photo: !0 }),
            children: "Photo mode",
          }),
          jsxRuntime.jsx("button", {
            className: "btn grow",
            onClick: () => useGameStore.setState({ uiHidden: !0 }),
            children: "Hide UI",
          }),
        ],
      }),
    ],
  });
}
function OnlineBadge() {
  const t = useGameStore((e) => e.online);
  return t == null
    ? null
    : jsxRuntime.jsxs("div", {
        className: "panel online",
        title: "Players in Aeloria right now",
        children: [jsxRuntime.jsx("i", { "aria-hidden": "true" }), t, " online"],
      });
}
function SettingsPanel() {
  const t = useGameStore((s) => s.panelOpen),
    e = useGameStore((s) => s.tab);
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      jsxRuntime.jsxs("div", {
        className: "top-right",
        children: [
          jsxRuntime.jsx(OnlineBadge, {}),
          fullscreenAvailable() && jsxRuntime.jsx(FullscreenButton, {}),
          jsxRuntime.jsx("button", {
            className: "btn panel icon",
            onClick: () => engine.pause(!0),
            "aria-label": "Pause and show controls",
            title: "Pause, controls and help (Esc)",
            children: jsxRuntime.jsxs("svg", {
              viewBox: "0 0 16 16",
              "aria-hidden": "true",
              children: [
                jsxRuntime.jsx("rect", {
                  x: "3.5",
                  y: "2.5",
                  width: "3",
                  height: "11",
                  rx: "1",
                }),
                jsxRuntime.jsx("rect", {
                  x: "9.5",
                  y: "2.5",
                  width: "3",
                  height: "11",
                  rx: "1",
                }),
              ],
            }),
          }),
          jsxRuntime.jsx("button", {
            className: "btn panel ctrl-toggle",
            "aria-expanded": t,
            "aria-controls": "ctrl",
            onClick: () => useGameStore.setState({ panelOpen: !t }),
            children: t ? "Close" : "Settings",
          }),
        ],
      }),
      jsxRuntime.jsxs("aside", {
        id: "ctrl",
        className: "panel ctrl" + (t ? " open" : ""),
        "aria-label": "World controls",
        children: [
          jsxRuntime.jsxs("div", {
            className: "tabs",
            role: "tablist",
            children: [
              jsxRuntime.jsx("button", {
                role: "tab",
                "aria-selected": e === "ride",
                onClick: () => useGameStore.setState({ tab: "ride" }),
                children: "Ride",
              }),
              jsxRuntime.jsx("button", {
                role: "tab",
                "aria-selected": e === "world",
                onClick: () => useGameStore.setState({ tab: "world" }),
                children: "World",
              }),
            ],
          }),
          e === "ride" ? jsxRuntime.jsx(FlightPanel, {}) : jsxRuntime.jsx(SkyPanel, {}),
        ],
      }),
    ],
  });
}
function RiderRoster() {
  const t = useGameStore((i) => i.sel),
    e = useGameStore((i) => i.palettes),
    s = useGameStore((i) => i.riderPal);
  return jsxRuntime.jsx("nav", {
    className: "panel roster",
    "aria-label": "Riders",
    children: mountDefs.map((i, a) => {
      const n = e.find((r) => r.id === s[a]) ?? i.pal;
      return jsxRuntime.jsxs(
        "button",
        {
          className: "rider",
          "aria-pressed": a === t,
          onClick: () => engine.select(a),
          children: [
            jsxRuntime.jsx("span", { className: "sw", style: { background: paletteGradientCss(n) } }),
            jsxRuntime.jsxs("span", {
              children: [
                jsxRuntime.jsx("b", { children: i.name }),
                jsxRuntime.jsxs("small", { children: [a + 1, " · ", n.name] }),
              ],
            }),
          ],
        },
        i.name,
      );
    }),
  });
}
function BondPanel() {
  const t = useGameStore((i) => i.bond),
    e = t.dist < 40,
    s = (i) => () => {
      engine.bondHold = i;
    };
  return !t.name || t.dist > 160
    ? null
    : jsxRuntime.jsxs("div", {
        className: "chip bond",
        children: [
          jsxRuntime.jsx("span", {
            className: "sw sm",
            style: { background: t.swatch ?? void 0 },
          }),
          jsxRuntime.jsxs("span", {
            children: [
              jsxRuntime.jsx("b", { children: t.name }),
              jsxRuntime.jsxs("small", {
                children: ["wild · ", Math.round(t.dist), " m"],
              }),
            ],
          }),
          e
            ? jsxRuntime.jsxs("button", {
                className: "btn primary hold",
                onPointerDown: s(!0),
                onPointerUp: s(!1),
                onPointerLeave: s(!1),
                onPointerCancel: s(!1),
                style: { "--p": String(Math.min(1, t.progress)) },
                children: ["Hold to bond ", jsxRuntime.jsx("kbd", { children: "B" })],
              })
            : jsxRuntime.jsx("small", {
                className: "hint",
                children: "fly closer to bond",
              }),
        ],
      });
}
