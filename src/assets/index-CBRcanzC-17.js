// assets/index-CBRcanzC 17 — math
// Lines 7607-7835 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
class SplashParticles {
  constructor(e = 260) {
    ((this.n = e), (this.next = 0));
    const s = new ae();
    (s.setAttribute("position", new D(new Float32Array(e * 3).fill(-9999), 3)),
      s.setAttribute("aLife", new D(new Float32Array(e), 1)),
      (this.vel = new Float32Array(e * 3)),
      (this.life = new Float32Array(e)));
    const i = new te({
      transparent: !0,
      depthWrite: !1,
      uniforms: {
        uScale: { value: 400 },
        uColor: { value: new W(0.85, 0.95, 1) },
      },
      vertexShader:
        "attribute float aLife;uniform float uScale;varying float vL;void main(){vL=aLife;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=clamp((.6+(1.-aLife)*1.4)*uScale/max(-mv.z,1.),0.,64.);gl_Position=projectionMatrix*mv;}",
      fragmentShader: `uniform vec3 uColor;varying float vL;void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,.1,d)*vL*.7;gl_FragColor=vec4(uColor,a);
#include <colorspace_fragment>
}`,
    });
    ((this.points = new Points(s, i)), (this.points.frustumCulled = !1));
  }
  get material() {
    return this.points.material;
  }
  emit(e, s, i, a) {
    const n = this.points.geometry.attributes.position.array;
    for (let r = 0; r < a; r++) {
      const o = this.next++ % this.n;
      ((n[o * 3] = e.x + (Math.random() - 0.5) * 3),
        (n[o * 3 + 1] = e.y),
        (n[o * 3 + 2] = e.z + (Math.random() - 0.5) * 3),
        (this.vel[o * 3] = s.x * i * 0.4 + (Math.random() - 0.5) * 6),
        (this.vel[o * 3 + 1] = 3 + Math.random() * 7),
        (this.vel[o * 3 + 2] = s.z * i * 0.4 + (Math.random() - 0.5) * 6),
        (this.life[o] = 1));
    }
  }
  update(e) {
    const s = this.points.geometry.attributes.position.array,
      i = this.points.geometry.attributes.aLife.array;
    for (let a = 0; a < this.n; a++)
      this.life[a] <= 0 ||
        ((this.life[a] -= e * 0.9),
        (this.vel[a * 3 + 1] -= 9.81 * e),
        (s[a * 3] += this.vel[a * 3] * e),
        (s[a * 3 + 1] += this.vel[a * 3 + 1] * e),
        (s[a * 3 + 2] += this.vel[a * 3 + 2] * e),
        (i[a] = Math.max(0, this.life[a])));
    ((this.points.geometry.attributes.position.needsUpdate = !0),
      (this.points.geometry.attributes.aLife.needsUpdate = !0));
  }
}
const useGameStore = createStore(() => ({
  loading: !0,
  loadMsg: "Growing the world…",
  error: null,
  quality: "high",
  seed: 7319,
  sel: 0,
  cam: "chase",
  sky: 0.5,
  cycle: !1,
  weather: "clear",
  gfx: "balanced",
  sound: !1,
  manual: !1,
  uiHidden: !1,
  photo: !1,
  mapOpen: !1,
  paused: !1,
  fullscreen: !1,
  assist: !0,
  tab: "ride",
  panelOpen: typeof window < "u" && window.innerWidth > 1100,
  introOpen: !0,
  touch:
    typeof window < "u" &&
    navigator.maxTouchPoints > 0 &&
    matchMedia("(pointer: coarse)").matches,
  places: [],
  stats: { isles: 0, plants: 0 },
  hud: {
    alt: 0,
    spd: 0,
    where: "—",
    dists: [],
    near: -1,
    fps: 0,
    tris: 0,
    stamina: 1,
    locked: !1,
    pad: !1,
    pin: null,
    pitch: 0,
  },
  race: { active: !1, next: 0, total: 0, time: 0, best: null, last: null },
  bond: { name: null, dist: 1 / 0, progress: 0, swatch: null },
  seeds: { got: 0, total: 0, nearest: null },
  palettes: [],
  riderPal: [],
  toast: null,
  online: null,
}));
let toastSeq = 0;
function showToast(t, e) {
  useGameStore.setState({ toast: { title: t, sub: e, id: ++toastSeq } });
}
const preferences = {
    get(t, e) {
      try {
        const s = localStorage.getItem("aeloria:" + t);
        return s == null ? e : JSON.parse(s);
      } catch {
        return e;
      }
    },
    set(t, e) {
      try {
        localStorage.setItem("aeloria:" + t, JSON.stringify(e));
      } catch {}
    },
  },
  q = k,
  upY = new q(0, 1, 0),
  cameraModes = ["chase", "seat", "drone", "orbit", "cinema"],
  formatAltitude = (t) =>
    t < 1e3
      ? `${Math.max(0, Math.round(t / 10) * 10)} m`
      : `${(t / 1e3).toFixed(1)} km`;
function detectQuality() {
  const t = navigator;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(t.userAgent) ||
    (t.maxTouchPoints > 1 && Math.min(screen.width, screen.height) < 900)
    ? "low"
    : (t.hardwareConcurrency || 4) >= 8 && (t.deviceMemory ?? 8) >= 8
      ? "high"
      : "medium";
}
const qualityName = (t) => (t === "low" ? "fast" : t === "medium" ? "balanced" : "high");
class BirdFlock {
  constructor(e, s, i) {
    ((this.birds = []),
      (this.m = new Matrix4()),
      (this.w = new Matrix4()),
      (this.q = new Quaternion()),
      (this.p = new q()),
      (this.f = new q()),
      (this.bank = new Quaternion()),
      (this.one = new q(1, 1, 1)),
      (this.mirror = new Matrix4().makeScale(-1, 1, 1)),
      (this.rz = new Matrix4()));
    const a = new CapsuleGeometry(0.6, 4, 6);
    a.rotateX(Math.PI / 2);
    const n = new ae();
    (n.setAttribute(
      "position",
      new Float32BufferAttribute(
        [0, 0, 1, 5, 0, -0.6, 0, 0, -1.4, 5, 0, -0.6, 7, 0, -1.8, 0, 0, -1.4],
        3,
      ),
    ),
      n.computeVertexNormals());
    const r = (l, c, f) => {
      const h = l.attributes.position.array,
        m = h.length / 3,
        v = new Float32Array(m * 3),
        d = new Float32Array(m * 3),
        p = new W(c),
        x = new W("#ff8a3f");
      for (let y = 0; y < m; y++)
        (p.toArray(v, y * 3),
          x
            .clone()
            .multiplyScalar(f(h[y * 3]))
            .toArray(d, y * 3));
      (l.setAttribute("color", new D(v, 3)),
        l.setAttribute("aGlow", new D(d, 3)));
    };
    (r(a, "#1a1f2e", () => 0.3), r(n, "#2a2440", (l) => (l > 4 ? 0.35 : 0)));
    const o = s.length * 10;
    ((this.B = new InstancedMesh(a, i, o)),
      (this.L = new InstancedMesh(n, i, o)),
      (this.R = new InstancedMesh(n, i, o)));
    for (const l of [this.B, this.L, this.R])
      ((l.frustumCulled = !1), e.add(l));
    s.forEach((l, c) => {
      const f = 90 + Math.random() * 120;
      for (let h = 0; h < 10; h++)
        this.birds.push({
          c: l,
          rad: f + (Math.random() - 0.5) * 40,
          ph: Math.random() * TAU,
          sp: 0.12 + Math.random() * 0.03,
          dy: (Math.random() - 0.5) * 30,
          fl: Math.random() * TAU,
          dir: c % 2 ? 1 : -1,
        });
    });
  }
  update(e) {
    (this.birds.forEach((s, i) => {
      const a = s.ph + e * s.sp * s.dir;
      (this.p.set(
        s.c.x + Math.cos(a) * s.rad,
        s.c.y + s.dy + Math.sin(e * 0.3 + s.ph) * 12,
        s.c.z + Math.sin(a) * s.rad,
      ),
        this.f.set(-Math.sin(a) * s.dir, 0, Math.cos(a) * s.dir),
        this.m.lookAt(new q(), this.f, upY),
        this.q
          .setFromRotationMatrix(this.m)
          .multiply(this.bank.setFromAxisAngle(new q(0, 0, 1), 0.35 * s.dir)),
        this.m.compose(this.p, this.q, this.one),
        this.B.setMatrixAt(i, this.m),
        this.rz.makeRotationZ(Math.sin(e * 5 + s.fl) * 0.6),
        this.R.setMatrixAt(i, this.w.copy(this.m).multiply(this.rz)),
        this.L.setMatrixAt(
          i,
          this.w.copy(this.m).multiply(this.mirror).multiply(this.rz),
        ));
    }),
      (this.B.instanceMatrix.needsUpdate =
        this.L.instanceMatrix.needsUpdate =
        this.R.instanceMatrix.needsUpdate =
          !0));
  }
}
