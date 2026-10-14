// assets/index-CBRcanzC 02 — math
// Lines 120-427 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
var createRoot,
  domClient = reactDomClient;
((createRoot = domClient.createRoot), domClient.hydrateRoot);
const TAU = Math.PI * 2,
  clamp = (t, e, s) => Math.max(e, Math.min(s, t)),
  lerp = (t, e, s) => t + (e - t) * s,
  smoothstep = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
function mulberry32(t) {
  let e = t | 0;
  return () => {
    e = (e + 1831565813) | 0;
    let s = Math.imul(e ^ (e >>> 15), 1 | e);
    return (
      (s = (s + Math.imul(s ^ (s >>> 7), 61 | s)) ^ s),
      ((s ^ (s >>> 14)) >>> 0) / 4294967296
    );
  };
}
const perlinGradients = [
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0,
  -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
];
function createSeededNoise(t) {
  const e = mulberry32(t * 9301 + 49297),
    s = [],
    i = new Uint8Array(512);
  for (let h = 0; h < 256; h++) s[h] = h;
  for (let h = 255; h > 0; h--) {
    const m = (e() * (h + 1)) | 0,
      v = s[h];
    ((s[h] = s[m]), (s[m] = v));
  }
  for (let h = 0; h < 512; h++) i[h] = s[h & 255];
  const a = (h) => h * h * h * (h * (h * 6 - 15) + 10),
    n = (h, m, v, d) => {
      const p = (h % 12) * 3;
      return perlinGradients[p] * m + perlinGradients[p + 1] * v + perlinGradients[p + 2] * d;
    };
  function r(h, m, v) {
    const d = Math.floor(h),
      p = Math.floor(m),
      x = Math.floor(v);
    ((h -= d), (m -= p), (v -= x));
    const y = d & 255,
      g = p & 255,
      S = x & 255,
      w = a(h),
      M = a(m),
      T = a(v),
      E = i[y] + g,
      z = i[E] + S,
      _ = i[E + 1] + S,
      L = i[y + 1] + g,
      j = i[L] + S,
      C = i[L + 1] + S;
    return lerp(
      lerp(
        lerp(n(i[z], h, m, v), n(i[j], h - 1, m, v), w),
        lerp(n(i[_], h, m - 1, v), n(i[C], h - 1, m - 1, v), w),
        M,
      ),
      lerp(
        lerp(n(i[z + 1], h, m, v - 1), n(i[j + 1], h - 1, m, v - 1), w),
        lerp(n(i[_ + 1], h, m - 1, v - 1), n(i[C + 1], h - 1, m - 1, v - 1), w),
        M,
      ),
      T,
    );
  }
  const o = (h, m) => r(h, m, 0.37);
  function l(h, m, v = 5) {
    let d = 0.5,
      p = 1,
      x = 0;
    for (let y = 0; y < v; y++)
      ((x += d * o(h * p, m * p)), (p *= 2.03), (d *= 0.5));
    return x;
  }
  function c(h, m, v, d = 4) {
    let p = 0.5,
      x = 1,
      y = 0;
    for (let g = 0; g < d; g++)
      ((y += p * r(h * x, m * x, v * x)), (x *= 2.07), (p *= 0.5));
    return y;
  }
  function f(h, m, v = 4) {
    let d = 0.5,
      p = 1,
      x = 0,
      y = 0;
    for (let g = 0; g < v; g++)
      ((x += d * (1 - Math.abs(o(h * p, m * p)) * 1.6)),
        (y += d),
        (p *= 2.1),
        (d *= 0.5));
    return x / y;
  }
  return { n3: r, n2: o, fbm: l, fbm3: c, ridge: f };
}
const waterLevel = 2,
  worldSize = 2700,
  worldBoundary = 1120;
class Terrain {
  constructor(e, s, i) {
    ((this.N = e),
      (this.R = s),
      (this.seg = i),
      (this.heights = null),
      (this.cell = worldSize / i));
  }
  H(e, s) {
    const { N: i, R: a } = this;
    let n = 16 + i.fbm(e * 0.0021, s * 0.0021, 5) * 78;
    n += Math.max(0, i.ridge(e * 0.0034 + 7, s * 0.0034 - 3, 4) - 0.56) * 70;
    const r = smoothstep(1 - Math.hypot(e - a.PL.x, s - a.PL.z) / 440);
    n = lerp(n, 9 + i.fbm(e * 0.007, s * 0.007, 3) * 9, r * 0.9);
    const o = smoothstep(1 - Math.hypot(e - a.TR.x, s - a.TR.z) / 240);
    n = lerp(n, 14 + i.fbm(e * 0.01, s * 0.01, 2) * 5, o * 0.85);
    const l = smoothstep(1 - Math.hypot(e - a.LK.x, s - a.LK.z) / 300);
    n = lerp(n, -24, l * l * 1.05);
    const c = Math.hypot(e, s);
    return (
      (n +=
        smoothstep((c - 930) / 560) *
        (230 + i.ridge(e * 0.004 + 3, s * 0.004, 4) * 300)),
      n
    );
  }
  groundY(e, s) {
    const i = this.heights,
      a = this.seg,
      n = (e + worldSize / 2) / this.cell,
      r = (s + worldSize / 2) / this.cell;
    if (!i || n < 0 || r < 0 || n >= a || r >= a) return this.H(e, s);
    const o = Math.floor(n),
      l = Math.floor(r),
      c = n - o,
      f = r - l,
      h = a + 1,
      m = i[l * h + o],
      v = i[(l + 1) * h + o],
      d = i[(l + 1) * h + o + 1],
      p = i[l * h + o + 1];
    return c + f <= 1
      ? m + c * (p - m) + f * (v - m)
      : d + (1 - c) * (v - d) + (1 - f) * (p - d);
  }
  surface(e, s) {
    return Math.max(this.groundY(e, s), waterLevel);
  }
  slopeAt(e, s) {
    return (
      Math.hypot(
        this.groundY(e + 3, s) - this.groundY(e - 3, s),
        this.groundY(e, s + 3) - this.groundY(e, s - 3),
      ) /
      (2 * 3)
    );
  }
  forestMask(e, s) {
    const { N: i, R: a } = this,
      n = smoothstep(1 - Math.hypot(e - a.TR.x, s - a.TR.z) / 560),
      r = smoothstep(1 - Math.hypot(e - a.FO.x, s - a.FO.z) / 420),
      o = i.n2(e * 0.006 + 11, s * 0.006) * 0.9 + 0.5;
    return (
      clamp(Math.max(n, r) * (0.55 + o * 0.6) + Math.max(0, o - 0.75) * 0.6, 0, 1) *
      (1 - smoothstep((Math.hypot(e, s) - 900) / 150))
    );
  }
  plainsMask(e, s) {
    return smoothstep(1 - Math.hypot(e - this.R.PL.x, s - this.R.PL.z) / 420);
  }
  lakeMask(e, s) {
    return smoothstep(1 - Math.hypot(e - this.R.LK.x, s - this.R.LK.z) / 420);
  }
}
const defaultAtlasCell = { solid: [0.75, 0.25] },
  H = k,
  noGlow = new W(0),
  createColor = (t) => new W(t);
function smoothNormals(t, e) {
  const s = t.attributes.position.array,
    i = e || s,
    a = s.length / 3,
    n = new Float32Array(a * 3);
  for (let f = 0; f < a; f += 3) {
    const h = f * 3,
      m = h + 3,
      v = h + 6,
      d = s[m] - s[h],
      p = s[m + 1] - s[h + 1],
      x = s[m + 2] - s[h + 2],
      y = s[v] - s[h],
      g = s[v + 1] - s[h + 1],
      S = s[v + 2] - s[h + 2],
      w = p * S - x * g,
      M = x * y - d * S,
      T = d * g - p * y;
    for (let E = 0; E < 3; E++)
      ((n[h + E * 3] = w), (n[h + E * 3 + 1] = M), (n[h + E * 3 + 2] = T));
  }
  const r = new Map(),
    o = new Int32Array(a),
    l = [];
  for (let f = 0; f < a; f++) {
    const h =
      Math.round(i[f * 3] * 2e3 + 8e3) * 256e6 +
      Math.round(i[f * 3 + 1] * 2e3 + 8e3) * 16e3 +
      Math.round(i[f * 3 + 2] * 2e3 + 8e3);
    let m = r.get(h);
    (m === void 0 && ((m = l.length / 3), r.set(h, m), l.push(0, 0, 0)),
      (o[f] = m),
      (l[m * 3] += n[f * 3]),
      (l[m * 3 + 1] += n[f * 3 + 1]),
      (l[m * 3 + 2] += n[f * 3 + 2]));
  }
  const c = new Float32Array(a * 3);
  for (let f = 0; f < a; f++) {
    const h = o[f] * 3,
      m = Math.hypot(l[h], l[h + 1], l[h + 2]) || 1;
    ((c[f * 3] = l[h] / m),
      (c[f * 3 + 1] = l[h + 1] / m),
      (c[f * 3 + 2] = l[h + 2] / m));
  }
  return (t.setAttribute("normal", new D(c, 3)), t);
}
function paintGeometry(t, e, s = noGlow) {
  t.attributes.normal || t.computeVertexNormals();
  const i = t.index ? t.toNonIndexed() : t,
    a = i.attributes.position.count,
    n = i.attributes.position.array,
    r = i.attributes.normal.array,
    o = new Float32Array(a * 3),
    l = new Float32Array(a * 3);
  for (let c = 0; c < a; c++) {
    const f = n[c * 3],
      h = n[c * 3 + 1],
      m = n[c * 3 + 2],
      v = r[c * 3],
      d = r[c * 3 + 1],
      p = r[c * 3 + 2],
      x = typeof e == "function" ? e(f, h, m, v, d, p) : e,
      y = typeof s == "function" ? s(f, h, m, v, d, p) : s;
    ((o[c * 3] = x.r),
      (o[c * 3 + 1] = x.g),
      (o[c * 3 + 2] = x.b),
      (l[c * 3] = y.r),
      (l[c * 3 + 1] = y.g),
      (l[c * 3 + 2] = y.b));
  }
  return { P: Float32Array.from(n), N: Float32Array.from(r), C: o, G: l };
}
function mergePartsData(t) {
  let e = 0;
  for (const f of t) e += f.P.length;
  const s = new Float32Array(e),
    i = new Float32Array(e),
    a = new Float32Array(e),
    n = new Float32Array(e),
    o = t.some((f) => f.U) ? new Float32Array((e / 3) * 2) : void 0;
  let l = 0;
  for (const f of t) {
    if ((s.set(f.P, l), i.set(f.N, l), a.set(f.C, l), n.set(f.G, l), o))
      if (f.U) o.set(f.U, (l / 3) * 2);
      else
        for (let h = (l / 3) * 2, m = ((l + f.P.length) / 3) * 2; h < m; h += 2)
          ((o[h] = defaultAtlasCell.solid[0]), (o[h + 1] = defaultAtlasCell.solid[1]));
    l += f.P.length;
  }
  let c = 0;
  for (let f = 0; f < e; f += 3)
    c = Math.max(c, Math.hypot(s[f], s[f + 1], s[f + 2]));
  return { position: s, normal: i, color: a, glow: n, uv: o, radius: c };
}
function geometryFromPart(t) {
  const e = new ae();
  return (
    e.setAttribute("position", new D(t.position, 3)),
    e.setAttribute("normal", new D(t.normal, 3)),
    e.setAttribute("color", new D(t.color, 3)),
    e.setAttribute("aGlow", new D(t.glow, 3)),
    t.uv && e.setAttribute("uv", new D(t.uv, 2)),
    t.index && e.setIndex(new D(t.index, 1)),
    e.computeBoundingSphere(),
    e
  );
}
function capsuleBetween(t, e, s, i, a = 7) {
  const n = e.clone().sub(t),
    r = n.length(),
    o = new CylinderGeometry(i ?? s * 0.8, s, r, a, 1, !0);
  return (
    o.translate(0, r / 2, 0),
    o.applyQuaternion(
      new Quaternion().setFromUnitVectors(new H(0, 1, 0), n.normalize()),
    ),
    o.translate(t.x, t.y, t.z),
    o
  );
}
function latheProfile(t, e) {
  const i = new LatheGeometry(
    t.map(([a, n]) => new I(Math.max(a, 0.001), n)),
    e,
  ).toNonIndexed();
  return smoothNormals(i, Float32Array.from(i.attributes.position.array));
}
