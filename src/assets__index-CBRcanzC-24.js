// assets__index-CBRcanzC 24 — jsx
// Lines 10886-11088 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
function Fr() {
  G.useEffect(() => {
    const t = (i) => {
        if (i.target.tagName === "INPUT") return;
        ((i.code === "Space" || i.code === "Enter") &&
          document.activeElement instanceof HTMLButtonElement &&
          b.getState().manual &&
          document.activeElement.blur(),
          (P.input.keys[i.code] = !0));
        const a = b.getState();
        if (!a.loading) {
          if (i.code === "KeyK") {
            as();
            return;
          }
          if (a.paused) {
            ((i.code === "Escape" || i.code === "KeyP") && P.pause(!1),
              i.code === "KeyO" && P.toggleSound());
            return;
          }
          switch (
            (/^Digit[1-6]$/.test(i.code) && P.select(+i.code.slice(5) - 1),
            i.code)
          ) {
            case "Tab":
              (i.preventDefault(),
                P.select((a.sel + (i.shiftKey ? 5 : 1)) % 6));
              break;
            case "KeyC":
              P.cycleCam(i.shiftKey ? -1 : 1);
              break;
            case "KeyT": {
              const n = [0, 0.5, 1];
              b.setState({ cycle: !1, sky: n[(n.indexOf(a.sky) + 1) % 3] });
              break;
            }
            case "KeyF":
              P.reins(!a.manual);
              break;
            case "Escape":
              a.mapOpen
                ? b.setState({ mapOpen: !1 })
                : a.photo
                  ? b.setState({ photo: !1 })
                  : performance.now() - P.lockLostAt > 400 && P.pause(!0);
              break;
            case "KeyH":
              b.setState({ uiHidden: !a.uiHidden });
              break;
            case "KeyM":
              (b.setState({ mapOpen: !a.mapOpen }),
                a.mapOpen || P.input.releaseLock());
              break;
            case "KeyO":
              P.toggleSound();
              break;
            case "KeyN":
              Xt((Math.random() * 99999) | 0);
              break;
            case "KeyP":
              b.setState({ photo: !a.photo });
              break;
            case "KeyR":
              a.race.active ? P.stopRace() : P.startRace(it);
              break;
            case "KeyG":
              P.findFlock();
              break;
            case "KeyL":
              P.findLeviathan();
              break;
            case "KeyB":
              P.bondHold = !0;
              break;
          }
          ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
            i.code,
          ) && i.preventDefault();
        }
      },
      e = (i) => {
        ((P.input.keys[i.code] = !1), i.code === "KeyB" && (P.bondHold = !1));
      },
      s = () => {
        ((P.input.keys = {}), (P.bondHold = !1));
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
function Nr() {
  const t = b((a) => a.uiHidden || a.photo),
    e = b((a) => a.manual),
    s = b((a) => a.touch),
    i = G.useRef(!1);
  return (
    Fr(),
    G.useEffect(
      () =>
        b.subscribe((a, n) => {
          a.gfx !== n.gfx && X.set("gfx", a.gfx);
        }),
      [],
    ),
    G.useEffect(() => {
      const a = () =>
        b.setState({
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
    u.jsxs("div", {
      className: ["app", t && "hidden-ui", e && "manual", s && "touch-device"]
        .filter(Boolean)
        .join(" "),
      children: [
        u.jsx(hi, {
          className: "gl",
          dpr: os,
          gl: { antialias: He !== "low", powerPreference: "high-performance" },
          shadows: !1,
          camera: { fov: 60, near: 0.3, far: 9500, position: [0, 200, 0] },
          onCreated: ({ gl: a, scene: n, camera: r }) => {
            (P.attach(a, n, r, He),
              !i.current &&
                ((i.current = !0),
                zr(),
                P.grow(b.getState().seed, He).then(() => {
                  const o = ke[b.getState().sel];
                  setTimeout(() => Y(o.name, `riding ${o.pal.name}`), 900);
                })));
          },
          children: u.jsx(Rr, {}),
        }),
        u.jsx(br, {}),
        u.jsx(xr, {}),
        u.jsx(gr, {}),
        u.jsx(or, {}),
        u.jsx(ur, {}),
        u.jsx(dr, {}),
        u.jsx(pr, {}),
        u.jsx(vr, {}),
        u.jsx(wr, {}),
        u.jsx(yr, {}),
        u.jsx(Tr, {}),
        u.jsx(Ar, {}),
        u.jsx(Sr, {}),
        u.jsx(Er, {}),
        u.jsx("div", { id: "fade" }),
        u.jsx(Mr, {}),
      ],
    })
  );
}
function Br() {
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
        n > 0 && b.setState({ online: n });
      }),
      (s.onclose = () => {
        (clearInterval(i),
          b.setState({ online: null }),
          setTimeout(e, t),
          (t = Math.min(t * 2, 6e4)));
      }));
  };
  e();
}
new URLSearchParams(location.search).has("debug") &&
  Object.assign(window, { aeloria: { engine: P, useUI: b } });
Br();
Gs(document.getElementById("root")).render(
  u.jsx(G.StrictMode, { children: u.jsx(Nr, {}) }),
);
