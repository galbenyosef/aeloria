// assets/worker-BdHOuDMt 01 — math
// Lines 6735-7049 of readable/assets/worker-BdHOuDMt.pretty.js (statement-aligned).
const TAU = Math.PI * 2,
  clamp = (f, t, e) => Math.max(t, Math.min(e, f)),
  lerp = (f, t, e) => f + (t - f) * e,
  smoothstep = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f * f * (3 - 2 * f));
function mulberry32(f) {
  let t = f | 0;
  return () => {
    t = (t + 1831565813) | 0;
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    return (
      (e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
const perlinGradients = [
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0,
  -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
];
function createSeededNoise(f) {
  const t = mulberry32(f * 9301 + 49297),
    e = [],
    s = new Uint8Array(512);
  for (let c = 0; c < 256; c++) e[c] = c;
  for (let c = 255; c > 0; c--) {
    const p = (t() * (c + 1)) | 0,
      u = e[c];
    ((e[c] = e[p]), (e[p] = u));
  }
  for (let c = 0; c < 512; c++) s[c] = e[c & 255];
  const i = (c) => c * c * c * (c * (c * 6 - 15) + 10),
    n = (c, p, u, d) => {
      const y = (c % 12) * 3;
      return perlinGradients[y] * p + perlinGradients[y + 1] * u + perlinGradients[y + 2] * d;
    };
  function a(c, p, u) {
    const d = Math.floor(c),
      y = Math.floor(p),
      b = Math.floor(u);
    ((c -= d), (p -= y), (u -= b));
    const g = d & 255,
      w = y & 255,
      x = b & 255,
      M = i(c),
      A = i(p),
      _ = i(u),
      F = s[g] + w,
      S = s[F] + x,
      R = s[F + 1] + x,
      P = s[g + 1] + w,
      D = s[P] + x,
      L = s[P + 1] + x;
    return lerp(
      lerp(
        lerp(n(s[S], c, p, u), n(s[D], c - 1, p, u), M),
        lerp(n(s[R], c, p - 1, u), n(s[L], c - 1, p - 1, u), M),
        A,
      ),
      lerp(
        lerp(n(s[S + 1], c, p, u - 1), n(s[D + 1], c - 1, p, u - 1), M),
        lerp(n(s[R + 1], c, p - 1, u - 1), n(s[L + 1], c - 1, p - 1, u - 1), M),
        A,
      ),
      _,
    );
  }
  const r = (c, p) => a(c, p, 0.37);
  function o(c, p, u = 5) {
    let d = 0.5,
      y = 1,
      b = 0;
    for (let g = 0; g < u; g++)
      ((b += d * r(c * y, p * y)), (y *= 2.03), (d *= 0.5));
    return b;
  }
  function l(c, p, u, d = 4) {
    let y = 0.5,
      b = 1,
      g = 0;
    for (let w = 0; w < d; w++)
      ((g += y * a(c * b, p * b, u * b)), (b *= 2.07), (y *= 0.5));
    return g;
  }
  function h(c, p, u = 4) {
    let d = 0.5,
      y = 1,
      b = 0,
      g = 0;
    for (let w = 0; w < u; w++)
      ((b += d * (1 - Math.abs(r(c * y, p * y)) * 1.6)),
        (g += d),
        (y *= 2.1),
        (d *= 0.5));
    return b / g;
  }
  return { n3: a, n2: r, fbm: o, fbm3: l, ridge: h };
}
const atlasCells = {
    broad: [0, 0.5],
    round: [0.5, 0.5],
    frond: [0, 0],
    solid: [0.75, 0.25],
  },
  Vector3 = v,
  noGlow = new xe(0),
  createColor = (f) => new xe(f),
  colorLerp = (f, t, e) => f.clone().lerp(t, Math.max(0, Math.min(1, e)));
function smoothNormals(f, t) {
  const e = f.attributes.position.array,
    s = t || e,
    i = e.length / 3,
    n = new Float32Array(i * 3);
  for (let h = 0; h < i; h += 3) {
    const c = h * 3,
      p = c + 3,
      u = c + 6,
      d = e[p] - e[c],
      y = e[p + 1] - e[c + 1],
      b = e[p + 2] - e[c + 2],
      g = e[u] - e[c],
      w = e[u + 1] - e[c + 1],
      x = e[u + 2] - e[c + 2],
      M = y * x - b * w,
      A = b * g - d * x,
      _ = d * w - y * g;
    for (let F = 0; F < 3; F++)
      ((n[c + F * 3] = M), (n[c + F * 3 + 1] = A), (n[c + F * 3 + 2] = _));
  }
  const a = new Map(),
    r = new Int32Array(i),
    o = [];
  for (let h = 0; h < i; h++) {
    const c =
      Math.round(s[h * 3] * 2e3 + 8e3) * 256e6 +
      Math.round(s[h * 3 + 1] * 2e3 + 8e3) * 16e3 +
      Math.round(s[h * 3 + 2] * 2e3 + 8e3);
    let p = a.get(c);
    (p === void 0 && ((p = o.length / 3), a.set(c, p), o.push(0, 0, 0)),
      (r[h] = p),
      (o[p * 3] += n[h * 3]),
      (o[p * 3 + 1] += n[h * 3 + 1]),
      (o[p * 3 + 2] += n[h * 3 + 2]));
  }
  const l = new Float32Array(i * 3);
  for (let h = 0; h < i; h++) {
    const c = r[h] * 3,
      p = Math.hypot(o[c], o[c + 1], o[c + 2]) || 1;
    ((l[h * 3] = o[c] / p),
      (l[h * 3 + 1] = o[c + 1] / p),
      (l[h * 3 + 2] = o[c + 2] / p));
  }
  return (f.setAttribute("normal", new re(l, 3)), f);
}
function paintGeometry(f, t, e = noGlow) {
  f.attributes.normal || f.computeVertexNormals();
  const s = f.index ? f.toNonIndexed() : f,
    i = s.attributes.position.count,
    n = s.attributes.position.array,
    a = s.attributes.normal.array,
    r = new Float32Array(i * 3),
    o = new Float32Array(i * 3);
  for (let l = 0; l < i; l++) {
    const h = n[l * 3],
      c = n[l * 3 + 1],
      p = n[l * 3 + 2],
      u = a[l * 3],
      d = a[l * 3 + 1],
      y = a[l * 3 + 2],
      b = typeof t == "function" ? t(h, c, p, u, d, y) : t,
      g = typeof e == "function" ? e(h, c, p, u, d, y) : e;
    ((r[l * 3] = b.r),
      (r[l * 3 + 1] = b.g),
      (r[l * 3 + 2] = b.b),
      (o[l * 3] = g.r),
      (o[l * 3 + 1] = g.g),
      (o[l * 3 + 2] = g.b));
  }
  return { P: Float32Array.from(n), N: Float32Array.from(a), C: r, G: o };
}
function mergeParts(f) {
  let t = 0;
  for (const h of f) t += h.P.length;
  const e = new Float32Array(t),
    s = new Float32Array(t),
    i = new Float32Array(t),
    n = new Float32Array(t),
    r = f.some((h) => h.U) ? new Float32Array((t / 3) * 2) : void 0;
  let o = 0;
  for (const h of f) {
    if ((e.set(h.P, o), s.set(h.N, o), i.set(h.C, o), n.set(h.G, o), r))
      if (h.U) r.set(h.U, (o / 3) * 2);
      else
        for (let c = (o / 3) * 2, p = ((o + h.P.length) / 3) * 2; c < p; c += 2)
          ((r[c] = atlasCells.solid[0]), (r[c + 1] = atlasCells.solid[1]));
    o += h.P.length;
  }
  let l = 0;
  for (let h = 0; h < t; h += 3)
    l = Math.max(l, Math.hypot(e[h], e[h + 1], e[h + 2]));
  return { position: e, normal: s, color: i, glow: n, uv: r, radius: l };
}
function buildGrassBlades(f, t, e, s, i, n, a, r, o, l) {
  const h = new Float32Array(n * 18),
    c = new Float32Array(n * 18),
    p = new Float32Array(n * 18),
    u = new Float32Array(n * 18),
    d = new Float32Array(n * 12),
    y = new v(),
    b = new v(),
    g = new v(),
    w = new v(),
    x = new v(),
    M = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, -1],
      [1, 1],
      [-1, 1],
    ];
  for (let A = 0; A < n; A++) {
    const _ = f() * 1.55 - 0.55,
      F = f() * Math.PI * 2,
      S = Math.sqrt(Math.max(0, 1 - _ * _));
    y.set(Math.cos(F) * S, _, Math.sin(F) * S);
    const R = 0.72 + f() * 0.38,
      P = t.x + y.x * e * R,
      D = t.y + y.y * s * R,
      L = t.z + y.z * i * R;
    (b.set(y.x / e, y.y / s, y.z / i).normalize(),
      x
        .set(
          b.x + (f() - 0.5) * 1.6,
          b.y + (f() - 0.5) * 1.2,
          b.z + (f() - 0.5) * 1.6,
        )
        .normalize(),
      g.set(0, 1, 0).cross(x),
      g.lengthSq() < 1e-4 && g.set(1, 0, 0),
      g.normalize(),
      w.crossVectors(x, g).normalize());
    const V = f() * Math.PI * 2,
      Z = Math.cos(V),
      $ = Math.sin(V),
      it = a * (0.7 + f() * 0.6) * 0.5,
      et = o(b.x, b.y, b.z, R),
      mt = l(b.x, b.y, b.z);
    M.forEach(([K, Q], nt) => {
      const gt = K * Z - Q * $,
        Y = K * $ + Q * Z,
        ot = A * 18 + nt * 3;
      ((h[ot] = P + (g.x * gt + w.x * Y) * it),
        (h[ot + 1] = D + (g.y * gt + w.y * Y) * it),
        (h[ot + 2] = L + (g.z * gt + w.z * Y) * it),
        (c[ot] = b.x),
        (c[ot + 1] = b.y),
        (c[ot + 2] = b.z),
        (p[ot] = et.r),
        (p[ot + 1] = et.g),
        (p[ot + 2] = et.b),
        (u[ot] = mt.r),
        (u[ot + 1] = mt.g),
        (u[ot + 2] = mt.b),
        (d[A * 12 + nt * 2] = r[0] + ((K + 1) / 2) * 0.5),
        (d[A * 12 + nt * 2 + 1] = r[1] + ((Q + 1) / 2) * 0.5));
    });
  }
  return { P: h, N: c, C: p, G: u, U: d };
}
function capsuleBetween(f, t, e, s, i = 7) {
  const n = t.clone().sub(f),
    a = n.length(),
    r = new is(s ?? e * 0.8, e, a, i, 1, !0);
  return (
    r.translate(0, a / 2, 0),
    r.applyQuaternion(
      new oe().setFromUnitVectors(new Vector3(0, 1, 0), n.normalize()),
    ),
    r.translate(f.x, f.y, f.z),
    r
  );
}
function buildBlob(f, t, e, s, i, n, a) {
  const r = new ns(1, t),
    o = r.attributes.position.array,
    l = Float32Array.from(o);
  for (let h = 0; h < o.length; h += 3) {
    const c = o[h],
      p = o[h + 1],
      u = o[h + 2],
      d = 1 + f.n3(c * 1.8 + a, p * 1.8, u * 1.8 - a) * n;
    ((o[h] = c * d * e), (o[h + 1] = p * d * s), (o[h + 2] = u * d * i));
  }
  return smoothNormals(r, l);
}
function latheProfile(f, t) {
  const s = new ss(
    f.map(([i, n]) => new j(Math.max(i, 0.001), n)),
    t,
  ).toNonIndexed();
  return smoothNormals(s, Float32Array.from(s.attributes.position.array));
}
const waterLevel = 2,
  worldSize = 2700,
  worldBoundary = 1120;
function landmarkTable(f) {
  const t = () => (f() - 0.5) * 160;
  return {
    PK: { x: -520 + t(), z: -360 + t() },
    TR: { x: 470 + t(), z: 330 + t() },
    PL: { x: 430 + t(), z: -520 + t() },
    LK: { x: -400 + t(), z: 470 + t() },
    FO: { x: 40 + t(), z: 60 + t() },
  };
}
