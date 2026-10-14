// assets/index-CBRcanzC 23 — jsxruntime
// Lines 10628-10885 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
function ControlsHelp({ title: t, rows: e, touch: s, pad: i }) {
  return jsxRuntime.jsxs("div", {
    className: "grp",
    children: [
      jsxRuntime.jsx("span", { className: "label", children: t }),
      jsxRuntime.jsx("table", {
        className: "keytable",
        children: jsxRuntime.jsx("tbody", {
          children: e.map(([a, n, r, o]) => {
            const l = s ? o : i ? r : n;
            return l
              ? jsxRuntime.jsxs(
                  "tr",
                  {
                    children: [
                      jsxRuntime.jsx("th", { scope: "row", children: a }),
                      jsxRuntime.jsx("td", { children: l }),
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
function PauseMenu() {
  const t = useGameStore(
      useShallow((n) => ({
        paused: n.paused,
        touch: n.touch,
        pad: n.hud.pad,
        sound: n.sound,
        fs: n.fullscreen,
        manual: n.manual,
      })),
    ),
    e = React.useRef(null),
    [s, i] = React.useState("kb");
  if (
    (React.useEffect(() => {
      t.paused &&
        (i(t.touch ? "touch" : t.pad ? "pad" : "kb"), e.current?.focus());
    }, [t.paused]),
    !t.paused)
  )
    return null;
  const a = () => engine.pause(!1);
  return jsxRuntime.jsx("div", {
    className: "pause-overlay",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "pause-title",
    onClick: (n) => {
      n.target === n.currentTarget && a();
    },
    children: jsxRuntime.jsxs("div", {
      className: "panel pause-card",
      children: [
        jsxRuntime.jsxs("div", {
          className: "pause-head",
          children: [
            jsxRuntime.jsxs("div", {
              children: [
                jsxRuntime.jsx("span", { className: "eyebrow", children: "Paused" }),
                jsxRuntime.jsx("h2", { id: "pause-title", children: "How to fly" }),
              ],
            }),
            jsxRuntime.jsxs("button", {
              ref: e,
              className: "btn primary",
              onClick: a,
              children: [
                "Resume ",
                !t.touch && jsxRuntime.jsx("kbd", { children: "Esc" }),
              ],
            }),
          ],
        }),
        jsxRuntime.jsx("p", {
          className: "hint",
          children:
            "Flight runs on energy. Diving trades height for speed, climbing spends it. Flapping gives thrust but drains stamina, which refills while you glide, collect drift seeds or pass race rings. Fly too slow and you stall. Flight assist (Settings → Ride) steers you around rock.",
        }),
        jsxRuntime.jsx("div", {
          className: "seg",
          role: "group",
          "aria-label": "Show controls for",
          children: [
            ["kb", "Keyboard + mouse"],
            ["pad", "Gamepad"],
            ["touch", "Touch"],
          ].map(([n, r]) =>
            jsxRuntime.jsx(
              "button",
              { "aria-pressed": s === n, onClick: () => i(n), children: r },
              n,
            ),
          ),
        }),
        jsxRuntime.jsxs("div", {
          className: "pause-cols",
          children: [
            jsxRuntime.jsx(ControlsHelp, {
              title: t.manual ? "Flying (your reins)" : "Flying yourself",
              rows: HELP_ROWS,
              touch: s === "touch",
              pad: s === "pad",
            }),
            jsxRuntime.jsx(ControlsHelp, {
              title: "Exploring",
              rows: TOUCH_ROWS,
              touch: s === "touch",
              pad: s === "pad",
            }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "row",
          children: [
            fullscreenAvailable() &&
              jsxRuntime.jsxs("button", {
                className: "btn grow",
                "aria-pressed": t.fs,
                onClick: toggleFullscreen,
                children: [
                  t.fs ? "Exit full screen" : "Full screen",
                  !t.touch && jsxRuntime.jsx("kbd", { children: "K" }),
                ],
              }),
            jsxRuntime.jsxs("button", {
              className: "btn grow",
              "data-sound": !0,
              "aria-pressed": t.sound,
              onClick: () => engine.toggleSound(),
              children: [
                t.sound ? "Sound on" : "Sound off",
                !t.touch && jsxRuntime.jsx("kbd", { children: "O" }),
              ],
            }),
          ],
        }),
        jsxRuntime.jsx("div", { className: "by pause-by", children: jsxRuntime.jsx(creditsLine, {}) }),
      ],
    }),
  });
}
function IntroOverlay() {
  const t = useGameStore((n) => n.loading),
    e = useGameStore((n) => n.manual),
    s = useGameStore((n) => n.touch),
    [i, a] = React.useState(!1);
  return (
    React.useEffect(() => {
      if (t || preferences.get("took-reins", !1)) return;
      const n = setTimeout(() => a(!0), 3600),
        r = setTimeout(() => a(!1), 13600);
      return () => {
        (clearTimeout(n), clearTimeout(r));
      };
    }, [t]),
    React.useEffect(() => {
      e && (preferences.set("took-reins", !0), a(!1));
    }, [e]),
    !i || e
      ? null
      : jsxRuntime.jsxs("div", {
          className: "panel reins-hint",
          role: "status",
          children: [
            jsxRuntime.jsx("span", { className: "eyebrow", children: "Autopilot" }),
            jsxRuntime.jsxs("p", {
              children: [
                "Your mount is flying itself. ",
                s
                  ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                      children: [
                        "Tap ",
                        jsxRuntime.jsx("b", { children: "Take reins" }),
                        " to fly yourself.",
                      ],
                    })
                  : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                      children: [
                        "Press ",
                        jsxRuntime.jsx("kbd", { children: "F" }),
                        " to take the reins and fly yourself.",
                      ],
                    }),
              ],
            }),
            jsxRuntime.jsxs("div", {
              className: "row",
              children: [
                jsxRuntime.jsxs("button", {
                  className: "btn primary",
                  onClick: () => engine.reins(!0),
                  children: [
                    "Take reins",
                    !s && jsxRuntime.jsx("kbd", { children: "F" }),
                  ],
                }),
                jsxRuntime.jsx("button", {
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
const deviceQuality = detectQuality(),
  qualitySetting = preferences.get("gfx", null) ?? qualityName(deviceQuality),
  pixelRatioCap = Math.min(devicePixelRatio, deviceQuality === "low" ? 1 : 1.5);
engine.dpr = pixelRatioCap;
engine.maxDpr = pixelRatioCap;
useGameStore.setState({ gfx: ["fast", "balanced", "high"].includes(qualitySetting) ? qualitySetting : qualityName(deviceQuality) });
function applyUrlParams() {
  const t = new URLSearchParams(location.search),
    e = parseInt(t.get("seed") || "", 10),
    s = parseInt(t.get("rider") || "", 10),
    i = t.get("sky"),
    a = t.get("weather");
  useGameStore.setState({
    quality: deviceQuality,
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
function FrameLoop() {
  const t = useThree((e) => e.get);
  return (
    useFrame((e, s) => {
      if (!engine.ready) return;
      if (useGameStore.getState().paused) {
        (engine.pollPaused(), engine.render(0));
        return;
      }
      const i = Math.min(s, 0.05);
      engine.update(i);
      const { viewport: a, setDpr: n } = t();
      (Math.abs(a.dpr - engine.dpr) > 0.01 && n(engine.dpr), engine.render(i));
    }, 1),
    null
  );
}
