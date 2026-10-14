// assets/index-CBRcanzC 21 — jsxruntime
// Lines 9985-10290 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
function ActivitiesPanel() {
  const t = useGameStore((s) => s.race),
    e = useGameStore((s) => s.seeds);
  return jsxRuntime.jsxs("section", {
    className: "panel acts",
    "aria-label": "Activities",
    children: [
      t.active
        ? jsxRuntime.jsxs("div", {
            className: "chip race",
            children: [
              jsxRuntime.jsx("span", { className: "label", children: "Skyveil Run" }),
              jsxRuntime.jsx("strong", { children: formatTime(t.time) }),
              jsxRuntime.jsxs("small", {
                children: [
                  "ring ",
                  Math.min(t.next + 1, t.total),
                  " / ",
                  t.total,
                ],
              }),
              jsxRuntime.jsx("button", {
                className: "btn",
                onClick: () => engine.stopRace(),
                children: "Quit",
              }),
            ],
          })
        : jsxRuntime.jsxs("button", {
            className: "act",
            onClick: () => engine.startRace(fadeToBlack),
            disabled: !t.total,
            children: [
              jsxRuntime.jsx("b", { children: "Race the rings" }),
              jsxRuntime.jsxs("small", {
                children: [
                  t.last != null ? `last ${formatTime(t.last)} · ` : "",
                  t.best != null
                    ? `best ${formatTime(t.best)}`
                    : `${t.total} rings · R`,
                ],
              }),
            ],
          }),
      jsxRuntime.jsxs("button", {
        className: "act",
        onClick: () => engine.findLeviathan(),
        children: [
          jsxRuntime.jsx("b", { children: "Ride with the Leviathan" }),
          jsxRuntime.jsx("small", { children: "a 300 m sky whale · L" }),
        ],
      }),
      jsxRuntime.jsxs("button", {
        className: "act",
        onClick: () => engine.findFlock(),
        children: [
          jsxRuntime.jsx("b", { children: "Find wild mounts" }),
          jsxRuntime.jsx("small", { children: "bond to take a new mount · G" }),
        ],
      }),
      jsxRuntime.jsxs("button", {
        className: "act",
        onClick: () => engine.findSeed(),
        children: [
          jsxRuntime.jsxs("b", { children: ["Drift seeds ", e.got, "/", e.total] }),
          jsxRuntime.jsx("small", {
            children:
              e.nearest != null ? `nearest ${formatDistance(e.nearest)}` : "all collected",
          }),
        ],
      }),
      jsxRuntime.jsx(BondPanel, {}),
    ],
  });
}
function MinimapCanvas() {
  const t = React.useRef(null);
  return (
    React.useEffect(
      () => (
        (engine.minimap = t.current),
        () => {
          engine.minimap = null;
        }
      ),
      [],
    ),
    jsxRuntime.jsx("button", {
      className: "minimap",
      onClick: () => useGameStore.setState({ mapOpen: !0 }),
      "aria-label": "Open world map",
      title: "World map (M)",
      children: jsxRuntime.jsx("canvas", { ref: t }),
    })
  );
}
function HudOverlay() {
  const t = useGameStore((i) => i.hud),
    e = useGameStore((i) => i.manual),
    s = useGameStore((i) => i.touch);
  return jsxRuntime.jsxs("div", {
    className: "panel hud",
    children: [
      jsxRuntime.jsx(MinimapCanvas, {}),
      jsxRuntime.jsxs("div", {
        className: "hud-main",
        children: [
          jsxRuntime.jsxs("div", {
            className: "gauges",
            children: [
              jsxRuntime.jsxs("div", {
                className: "gauge wide",
                children: [
                  jsxRuntime.jsx("span", {
                    className: "label mode" + (e ? " manual" : ""),
                    children: e ? "Your reins" : "Autopilot",
                  }),
                  jsxRuntime.jsx("strong", { className: "where", children: t.where }),
                ],
              }),
              jsxRuntime.jsxs("div", {
                className: "gauge",
                children: [
                  jsxRuntime.jsx("span", { className: "label", children: "Altitude" }),
                  jsxRuntime.jsxs("strong", {
                    children: [t.alt, jsxRuntime.jsx("sub", { children: "m" })],
                  }),
                ],
              }),
              jsxRuntime.jsxs("div", {
                className: "gauge",
                children: [
                  jsxRuntime.jsx("span", { className: "label", children: "Speed" }),
                  jsxRuntime.jsxs("strong", {
                    children: [t.spd, jsxRuntime.jsx("sub", { children: "km/h" })],
                  }),
                ],
              }),
            ],
          }),
          e &&
            jsxRuntime.jsxs("div", {
              className: "stamina",
              "aria-label": `Stamina ${Math.round(t.stamina * 100)} percent`,
              children: [
                jsxRuntime.jsx("span", { className: "label", children: "Stamina" }),
                jsxRuntime.jsx("div", {
                  className: "bar",
                  children: jsxRuntime.jsx("i", {
                    style: { transform: `scaleX(${t.stamina})` },
                    className: t.stamina < 0.2 ? "low" : "",
                  }),
                }),
              ],
            }),
          t.pin != null &&
            jsxRuntime.jsxs("div", {
              className: "pin-row",
              children: [
                jsxRuntime.jsx("span", { className: "label", children: "Map pin" }),
                jsxRuntime.jsx("b", { children: formatDistance(t.pin) }),
                jsxRuntime.jsx("button", {
                  className: "link",
                  onClick: () => engine.clearPin(),
                  children: "Clear",
                }),
              ],
            }),
          jsxRuntime.jsxs("div", {
            className: "hud-actions",
            children: [
              jsxRuntime.jsxs("button", {
                className: "btn",
                "aria-pressed": e,
                onClick: () => engine.reins(!e),
                children: [
                  e ? "Autopilot" : "Take reins",
                  " ",
                  jsxRuntime.jsx("kbd", { children: "F" }),
                ],
              }),
              jsxRuntime.jsxs("button", {
                className: "btn",
                onClick: () => useGameStore.setState({ mapOpen: !0 }),
                children: ["Map ", jsxRuntime.jsx("kbd", { children: "M" })],
              }),
            ],
          }),
          !s &&
            jsxRuntime.jsx("div", {
              className: "keys",
              children: e
                ? t.pad
                  ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                      children: [
                        jsxRuntime.jsxs("span", {
                          children: [
                            jsxRuntime.jsx("kbd", { children: "Stick" }),
                            "steer",
                          ],
                        }),
                        jsxRuntime.jsxs("span", {
                          children: [
                            jsxRuntime.jsx("kbd", { children: "A/RT" }),
                            "flap",
                          ],
                        }),
                        jsxRuntime.jsxs("span", {
                          children: [
                            jsxRuntime.jsx("kbd", { children: "B/LT" }),
                            "dive",
                          ],
                        }),
                        jsxRuntime.jsxs("span", {
                          children: [jsxRuntime.jsx("kbd", { children: "X" }), "roll"],
                        }),
                      ],
                    })
                  : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                      children: [
                        jsxRuntime.jsxs("span", {
                          children: [
                            jsxRuntime.jsx("kbd", {
                              children: t.locked ? "Mouse" : "WASD",
                            }),
                            "steer",
                          ],
                        }),
                        jsxRuntime.jsxs("span", {
                          children: [
                            jsxRuntime.jsx("kbd", { children: "Space" }),
                            "flap",
                          ],
                        }),
                        jsxRuntime.jsxs("span", {
                          children: [
                            jsxRuntime.jsx("kbd", { children: "Shift" }),
                            "dive",
                          ],
                        }),
                        jsxRuntime.jsxs("span", {
                          children: [jsxRuntime.jsx("kbd", { children: "Q E" }), "roll"],
                        }),
                        !t.locked &&
                          jsxRuntime.jsx("span", {
                            children: "click the view to aim with the mouse",
                          }),
                      ],
                    })
                : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                    children: [
                      jsxRuntime.jsxs("span", {
                        children: [jsxRuntime.jsx("kbd", { children: "1–6" }), "rider"],
                      }),
                      jsxRuntime.jsxs("span", {
                        children: [jsxRuntime.jsx("kbd", { children: "C" }), "camera"],
                      }),
                      jsxRuntime.jsxs("span", {
                        children: [jsxRuntime.jsx("kbd", { children: "R" }), "race"],
                      }),
                      jsxRuntime.jsxs("span", {
                        children: [jsxRuntime.jsx("kbd", { children: "P" }), "photo"],
                      }),
                      jsxRuntime.jsxs("span", {
                        children: [jsxRuntime.jsx("kbd", { children: "H" }), "hide"],
                      }),
                    ],
                  }),
            }),
        ],
      }),
    ],
  });
}
function CompassCanvas() {
  const t = React.useRef(null);
  return (
    React.useEffect(
      () => (
        (engine.compass = t.current),
        () => {
          engine.compass = null;
        }
      ),
      [],
    ),
    jsxRuntime.jsx("canvas", { ref: t, className: "compass", "aria-hidden": "true" })
  );
}
function Reticle() {
  const t = useGameStore((s) => s.manual),
    e = useGameStore((s) => s.hud.locked);
  return !t || !e
    ? null
    : jsxRuntime.jsxs("div", {
        className: "reticle",
        "aria-hidden": "true",
        children: [
          jsxRuntime.jsx("i", {}),
          jsxRuntime.jsx("small", {
            children:
              "Esc frees the cursor, Esc again pauses · F hands back to autopilot",
          }),
        ],
      });
}
