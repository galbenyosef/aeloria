// assets__index-CBRcanzC 21 — children
// Lines 9985-10290 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
function pr() {
  const t = b((s) => s.race),
    e = b((s) => s.seeds);
  return u.jsxs("section", {
    className: "panel acts",
    "aria-label": "Activities",
    children: [
      t.active
        ? u.jsxs("div", {
            className: "chip race",
            children: [
              u.jsx("span", { className: "label", children: "Skyveil Run" }),
              u.jsx("strong", { children: Vt(t.time) }),
              u.jsxs("small", {
                children: [
                  "ring ",
                  Math.min(t.next + 1, t.total),
                  " / ",
                  t.total,
                ],
              }),
              u.jsx("button", {
                className: "btn",
                onClick: () => P.stopRace(),
                children: "Quit",
              }),
            ],
          })
        : u.jsxs("button", {
            className: "act",
            onClick: () => P.startRace(it),
            disabled: !t.total,
            children: [
              u.jsx("b", { children: "Race the rings" }),
              u.jsxs("small", {
                children: [
                  t.last != null ? `last ${Vt(t.last)} · ` : "",
                  t.best != null
                    ? `best ${Vt(t.best)}`
                    : `${t.total} rings · R`,
                ],
              }),
            ],
          }),
      u.jsxs("button", {
        className: "act",
        onClick: () => P.findLeviathan(),
        children: [
          u.jsx("b", { children: "Ride with the Leviathan" }),
          u.jsx("small", { children: "a 300 m sky whale · L" }),
        ],
      }),
      u.jsxs("button", {
        className: "act",
        onClick: () => P.findFlock(),
        children: [
          u.jsx("b", { children: "Find wild mounts" }),
          u.jsx("small", { children: "bond to take a new mount · G" }),
        ],
      }),
      u.jsxs("button", {
        className: "act",
        onClick: () => P.findSeed(),
        children: [
          u.jsxs("b", { children: ["Drift seeds ", e.got, "/", e.total] }),
          u.jsx("small", {
            children:
              e.nearest != null ? `nearest ${rs(e.nearest)}` : "all collected",
          }),
        ],
      }),
      u.jsx(fr, {}),
    ],
  });
}
function mr() {
  const t = G.useRef(null);
  return (
    G.useEffect(
      () => (
        (P.minimap = t.current),
        () => {
          P.minimap = null;
        }
      ),
      [],
    ),
    u.jsx("button", {
      className: "minimap",
      onClick: () => b.setState({ mapOpen: !0 }),
      "aria-label": "Open world map",
      title: "World map (M)",
      children: u.jsx("canvas", { ref: t }),
    })
  );
}
function vr() {
  const t = b((i) => i.hud),
    e = b((i) => i.manual),
    s = b((i) => i.touch);
  return u.jsxs("div", {
    className: "panel hud",
    children: [
      u.jsx(mr, {}),
      u.jsxs("div", {
        className: "hud-main",
        children: [
          u.jsxs("div", {
            className: "gauges",
            children: [
              u.jsxs("div", {
                className: "gauge wide",
                children: [
                  u.jsx("span", {
                    className: "label mode" + (e ? " manual" : ""),
                    children: e ? "Your reins" : "Autopilot",
                  }),
                  u.jsx("strong", { className: "where", children: t.where }),
                ],
              }),
              u.jsxs("div", {
                className: "gauge",
                children: [
                  u.jsx("span", { className: "label", children: "Altitude" }),
                  u.jsxs("strong", {
                    children: [t.alt, u.jsx("sub", { children: "m" })],
                  }),
                ],
              }),
              u.jsxs("div", {
                className: "gauge",
                children: [
                  u.jsx("span", { className: "label", children: "Speed" }),
                  u.jsxs("strong", {
                    children: [t.spd, u.jsx("sub", { children: "km/h" })],
                  }),
                ],
              }),
            ],
          }),
          e &&
            u.jsxs("div", {
              className: "stamina",
              "aria-label": `Stamina ${Math.round(t.stamina * 100)} percent`,
              children: [
                u.jsx("span", { className: "label", children: "Stamina" }),
                u.jsx("div", {
                  className: "bar",
                  children: u.jsx("i", {
                    style: { transform: `scaleX(${t.stamina})` },
                    className: t.stamina < 0.2 ? "low" : "",
                  }),
                }),
              ],
            }),
          t.pin != null &&
            u.jsxs("div", {
              className: "pin-row",
              children: [
                u.jsx("span", { className: "label", children: "Map pin" }),
                u.jsx("b", { children: rs(t.pin) }),
                u.jsx("button", {
                  className: "link",
                  onClick: () => P.clearPin(),
                  children: "Clear",
                }),
              ],
            }),
          u.jsxs("div", {
            className: "hud-actions",
            children: [
              u.jsxs("button", {
                className: "btn",
                "aria-pressed": e,
                onClick: () => P.reins(!e),
                children: [
                  e ? "Autopilot" : "Take reins",
                  " ",
                  u.jsx("kbd", { children: "F" }),
                ],
              }),
              u.jsxs("button", {
                className: "btn",
                onClick: () => b.setState({ mapOpen: !0 }),
                children: ["Map ", u.jsx("kbd", { children: "M" })],
              }),
            ],
          }),
          !s &&
            u.jsx("div", {
              className: "keys",
              children: e
                ? t.pad
                  ? u.jsxs(u.Fragment, {
                      children: [
                        u.jsxs("span", {
                          children: [
                            u.jsx("kbd", { children: "Stick" }),
                            "steer",
                          ],
                        }),
                        u.jsxs("span", {
                          children: [
                            u.jsx("kbd", { children: "A/RT" }),
                            "flap",
                          ],
                        }),
                        u.jsxs("span", {
                          children: [
                            u.jsx("kbd", { children: "B/LT" }),
                            "dive",
                          ],
                        }),
                        u.jsxs("span", {
                          children: [u.jsx("kbd", { children: "X" }), "roll"],
                        }),
                      ],
                    })
                  : u.jsxs(u.Fragment, {
                      children: [
                        u.jsxs("span", {
                          children: [
                            u.jsx("kbd", {
                              children: t.locked ? "Mouse" : "WASD",
                            }),
                            "steer",
                          ],
                        }),
                        u.jsxs("span", {
                          children: [
                            u.jsx("kbd", { children: "Space" }),
                            "flap",
                          ],
                        }),
                        u.jsxs("span", {
                          children: [
                            u.jsx("kbd", { children: "Shift" }),
                            "dive",
                          ],
                        }),
                        u.jsxs("span", {
                          children: [u.jsx("kbd", { children: "Q E" }), "roll"],
                        }),
                        !t.locked &&
                          u.jsx("span", {
                            children: "click the view to aim with the mouse",
                          }),
                      ],
                    })
                : u.jsxs(u.Fragment, {
                    children: [
                      u.jsxs("span", {
                        children: [u.jsx("kbd", { children: "1–6" }), "rider"],
                      }),
                      u.jsxs("span", {
                        children: [u.jsx("kbd", { children: "C" }), "camera"],
                      }),
                      u.jsxs("span", {
                        children: [u.jsx("kbd", { children: "R" }), "race"],
                      }),
                      u.jsxs("span", {
                        children: [u.jsx("kbd", { children: "P" }), "photo"],
                      }),
                      u.jsxs("span", {
                        children: [u.jsx("kbd", { children: "H" }), "hide"],
                      }),
                    ],
                  }),
            }),
        ],
      }),
    ],
  });
}
function gr() {
  const t = G.useRef(null);
  return (
    G.useEffect(
      () => (
        (P.compass = t.current),
        () => {
          P.compass = null;
        }
      ),
      [],
    ),
    u.jsx("canvas", { ref: t, className: "compass", "aria-hidden": "true" })
  );
}
function xr() {
  const t = b((s) => s.manual),
    e = b((s) => s.hud.locked);
  return !t || !e
    ? null
    : u.jsxs("div", {
        className: "reticle",
        "aria-hidden": "true",
        children: [
          u.jsx("i", {}),
          u.jsx("small", {
            children:
              "Esc frees the cursor, Esc again pauses · F hands back to autopilot",
          }),
        ],
      });
}
