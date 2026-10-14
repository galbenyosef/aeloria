// assets/index-CBRcanzC 24 — engine
// Lines 10886-11088 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
function KeyboardShortcuts() {
  React.useEffect(() => {
    const t = (i) => {
        if (i.target.tagName === "INPUT") return;
        ((i.code === "Space" || i.code === "Enter") &&
          document.activeElement instanceof HTMLButtonElement &&
          useGameStore.getState().manual &&
          document.activeElement.blur(),
          (engine.input.keys[i.code] = !0));
        const a = useGameStore.getState();
        if (!a.loading) {
          if (i.code === "KeyK") {
            toggleFullscreen();
            return;
          }
          if (a.paused) {
            ((i.code === "Escape" || i.code === "KeyP") && engine.pause(!1),
              i.code === "KeyO" && engine.toggleSound());
            return;
          }
          switch (
            (/^Digit[1-6]$/.test(i.code) && engine.select(+i.code.slice(5) - 1),
            i.code)
          ) {
            case "Tab":
              (i.preventDefault(),
                engine.select((a.sel + (i.shiftKey ? 5 : 1)) % 6));
              break;
            case "KeyC":
              engine.cycleCam(i.shiftKey ? -1 : 1);
              break;
            case "KeyT": {
              const n = [0, 0.5, 1];
              useGameStore.setState({ cycle: !1, sky: n[(n.indexOf(a.sky) + 1) % 3] });
              break;
            }
            case "KeyF":
              engine.reins(!a.manual);
              break;
            case "Escape":
              a.mapOpen
                ? useGameStore.setState({ mapOpen: !1 })
                : a.photo
                  ? useGameStore.setState({ photo: !1 })
                  : performance.now() - engine.lockLostAt > 400 && engine.pause(!0);
              break;
            case "KeyH":
              useGameStore.setState({ uiHidden: !a.uiHidden });
              break;
            case "KeyM":
              (useGameStore.setState({ mapOpen: !a.mapOpen }),
                a.mapOpen || engine.input.releaseLock());
              break;
            case "KeyO":
              engine.toggleSound();
              break;
            case "KeyN":
              setSeed((Math.random() * 99999) | 0);
              break;
            case "KeyP":
              useGameStore.setState({ photo: !a.photo });
              break;
            case "KeyR":
              a.race.active ? engine.stopRace() : engine.startRace(fadeToBlack);
              break;
            case "KeyG":
              engine.findFlock();
              break;
            case "KeyL":
              engine.findLeviathan();
              break;
            case "KeyB":
              engine.bondHold = !0;
              break;
          }
          ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
            i.code,
          ) && i.preventDefault();
        }
      },
      e = (i) => {
        ((engine.input.keys[i.code] = !1), i.code === "KeyB" && (engine.bondHold = !1));
      },
      s = () => {
        ((engine.input.keys = {}), (engine.bondHold = !1));
      };
    return (
      addEventListener("keydown", t),
      addEventListener("keyup", e),
      addEventListener("blur", s),
      () => {
        (removeEventListener("keydown", t),
          removeEventListener("keyup", e),
          removeEventListener("blur", s));
      }
    );
  }, []);
}
function App() {
  const t = useGameStore((a) => a.uiHidden || a.photo),
    e = useGameStore((a) => a.manual),
    s = useGameStore((a) => a.touch),
    i = React.useRef(!1);
  return (
    KeyboardShortcuts(),
    React.useEffect(
      () =>
        useGameStore.subscribe((a, n) => {
          a.gfx !== n.gfx && preferences.set("gfx", a.gfx);
        }),
      [],
    ),
    React.useEffect(() => {
      const a = () =>
        useGameStore.setState({
          fullscreen: !!(
            document.fullscreenElement ?? document.webkitFullscreenElement
          ),
        });
      return (
        document.addEventListener("fullscreenchange", a),
        document.addEventListener("webkitfullscreenchange", a),
        () => {
          (document.removeEventListener("fullscreenchange", a),
            document.removeEventListener("webkitfullscreenchange", a));
        }
      );
    }, []),
    jsxRuntime.jsxs("div", {
      className: ["app", t && "hidden-ui", e && "manual", s && "touch-device"]
        .filter(Boolean)
        .join(" "),
      children: [
        jsxRuntime.jsx(R3FCanvas, {
          className: "gl",
          dpr: pixelRatioCap,
          gl: { antialias: deviceQuality !== "low", powerPreference: "high-performance" },
          shadows: !1,
          camera: { fov: 60, near: 0.3, far: 9500, position: [0, 200, 0] },
          onCreated: ({ gl: a, scene: n, camera: r }) => {
            (engine.attach(a, n, r, deviceQuality),
              !i.current &&
                ((i.current = !0),
                applyUrlParams(),
                engine.grow(useGameStore.getState().seed, deviceQuality).then(() => {
                  const o = mountDefs[useGameStore.getState().sel];
                  setTimeout(() => showToast(o.name, `riding ${o.pal.name}`), 900);
                })));
          },
          children: jsxRuntime.jsx(FrameLoop, {}),
        }),
        jsxRuntime.jsx(RiderCarousel, {}),
        jsxRuntime.jsx(Reticle, {}),
        jsxRuntime.jsx(CompassCanvas, {}),
        jsxRuntime.jsx(TopBar, {}),
        jsxRuntime.jsx(SettingsPanel, {}),
        jsxRuntime.jsx(RiderRoster, {}),
        jsxRuntime.jsx(ActivitiesPanel, {}),
        jsxRuntime.jsx(HudOverlay, {}),
        jsxRuntime.jsx(TouchControls, {}),
        jsxRuntime.jsx(WorldMapPanel, {}),
        jsxRuntime.jsx(PhotoModeHint, {}),
        jsxRuntime.jsx(PauseMenu, {}),
        jsxRuntime.jsx(Toast, {}),
        jsxRuntime.jsx(IntroOverlay, {}),
        jsxRuntime.jsx("div", { id: "fade" }),
        jsxRuntime.jsx(LoadingOverlay, {}),
      ],
    })
  );
}
function PresenceClient() {
  let t = 2e3;
  const e = () => {
    const s = new WebSocket(
        `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/api/presence`,
      ),
      i = setInterval(
        () => s.readyState === WebSocket.OPEN && s.send("ping"),
        4e4,
      );
    ((s.onopen = () => {
      t = 2e3;
    }),
      (s.onmessage = (a) => {
        const n = parseInt(a.data, 10);
        n > 0 && useGameStore.setState({ online: n });
      }),
      (s.onclose = () => {
        (clearInterval(i),
          useGameStore.setState({ online: null }),
          setTimeout(e, t),
          (t = Math.min(t * 2, 6e4)));
      }));
  };
  e();
}
new URLSearchParams(location.search).has("debug") &&
  Object.assign(window, { aeloria: { engine: engine, useUI: useGameStore } });
PresenceClient();
createRoot(document.getElementById("root")).render(
  jsxRuntime.jsx(React.StrictMode, { children: jsxRuntime.jsx(App, {}) }),
);
