// assets/worker-BdHOuDMt 06 — math
// Lines 8710-8883 of readable/assets/worker-BdHOuDMt.pretty.js (statement-aligned).
function buildHeightField(f, t, e, s, i, n, a) {
  const r = fieldSize,
    o = worldSize / r,
    l = new Uint8ClampedArray(r * r * 4),
    h = f.N,
    c = (x) => [(x >> 16) & 255, (x >> 8) & 255, x & 255],
    p = (x, M, A) => (
      (A = clamp(A, 0, 1)),
      [
        x[0] + (M[0] - x[0]) * A,
        x[1] + (M[1] - x[1]) * A,
        x[2] + (M[2] - x[2]) * A,
      ]
    ),
    u = {
      deep: c(864074),
      shallow: c(2984596),
      grass: c(3896376),
      grassHi: c(6986314),
      amber: c(10724950),
      forest: c(1787442),
      rock: c(8222831),
      rockDark: c(5198682),
      sand: c(9273954),
      isle: c(5936708),
      isleHi: c(8829018),
      isleRim: c(7038300),
      elder: c(1923654),
      glow: c(6288086),
    },
    d = new Vector3(-0.5, 0.75, -0.42).normalize(),
    y = (x, M) => {
      ((l[x] = M[0]), (l[x + 1] = M[1]), (l[x + 2] = M[2]), (l[x + 3] = 255));
    };
  for (let x = 0; x < r; x++)
    for (let M = 0; M < r; M++) {
      const A = -worldSize / 2 + (M + 0.5) * o,
        _ = -worldSize / 2 + (x + 0.5) * o,
        F = f.groundY(A, _),
        S = (x * r + M) * 4;
      if (F < waterLevel) {
        const it = h.n2(A * 0.05, _ * 0.05) * 0.08;
        y(S, p(u.shallow, u.deep, (waterLevel - F) / 16 + it));
        continue;
      }
      const R = 4,
        P = f.groundY(A + R, _) - f.groundY(A - R, _),
        D = f.groundY(A, _ + R) - f.groundY(A, _ - R),
        L = new Vector3(-P, 2 * R, -D).normalize();
      let V = p(u.grass, u.grassHi, h.n2(A * 0.01, _ * 0.01) + 0.5);
      ((V = p(V, u.forest, f.forestMask(A, _) * 0.9)),
        (V = p(V, u.amber, f.plainsMask(A, _) * 0.55)),
        (V = p(V, u.rock, smoothstep((1 - L.y - 0.25) / 0.3))),
        (V = p(V, u.rockDark, smoothstep((F - 200) / 160))),
        F < waterLevel + 2 && (V = p(V, u.sand, (waterLevel + 2 - F) / 2)));
      const Z =
          Math.min(e - 1, Math.round((_ + worldSize / 2) / (worldSize / (e - 1)))) * e +
          Math.min(e - 1, Math.round((A + worldSize / 2) / (worldSize / (e - 1)))),
        $ = (0.55 + 0.75 * Math.max(0, L.dot(d))) * (0.55 + 0.45 * t[Z]);
      y(S, [V[0] * $, V[1] * $, V[2] * $]);
    }
  const b = (x, M, A, _) => {
      const F = Math.max(0, Math.floor((x - A + worldSize / 2) / o)),
        S = Math.min(r - 1, Math.ceil((x + A + worldSize / 2) / o)),
        R = Math.max(0, Math.floor((M - A + worldSize / 2) / o)),
        P = Math.min(r - 1, Math.ceil((M + A + worldSize / 2) / o));
      for (let D = R; D <= P; D++)
        for (let L = F; L <= S; L++) {
          const V = -worldSize / 2 + (L + 0.5) * o - x,
            Z = -worldSize / 2 + (D + 0.5) * o - M,
            $ = Math.hypot(V, Z);
          $ < A && _((D * r + L) * 4, $ / A, V / A, Z / A);
        }
    },
    g = (x) => (M, A) => {
      const _ = 1 - x * (1 - smoothstep((A - 0.6) / 0.4));
      ((l[M] *= _), (l[M + 1] *= _), (l[M + 2] *= _));
    },
    w = s.slice().sort((x, M) => x.c.y - M.c.y);
  for (const x of w)
    b(x.c.x + x.R * 0.45, x.c.z + x.R * 0.55, x.R * 1.1, g(0.45));
  for (const x of w)
    b(x.c.x, x.c.z, x.R * 0.98, (M, A, _, F) => {
      const S = A + h.n2(_ * 3 + x.c.x, F * 3) * 0.12;
      if (S > 1) return;
      const R = 0.8 + 0.35 * clamp(-(_ * 0.6 + F * 0.5), -1, 1),
        P =
          S > 0.84
            ? u.isleRim
            : p(u.isle, u.isleHi, h.n2(_ * 4 + x.c.z, F * 4) + 0.5);
      y(M, [P[0] * R, P[1] * R, P[2] * R]);
    });
  for (const x of i)
    (b(x.x + x.r * 0.5, x.z + x.r * 0.6, x.r * 1.3, g(0.4)),
      b(x.x, x.z, x.r * 1.15, (M, A, _, F) => {
        const S = 0.85 + 0.3 * clamp(-(_ * 0.6 + F * 0.5), -1, 1),
          R = A < 0.6 ? u.isle : u.rock;
        y(M, [R[0] * S, R[1] * S, R[2] * S]);
      }));
  for (const x of n) {
    const M = new Vector3(x.ax.z, 0, -x.ax.x);
    for (let A = -1; A <= 1; A += 0.05)
      b(x.base.x + M.x * x.R * A, x.base.z + M.z * x.R * A, x.tube * 1.3, (_) =>
        y(_, u.rock),
      );
  }
  return (
    b(a.x + 30, a.z + 36, 128, g(0.45)),
    b(a.x, a.z, 118, (x, M, A, _) => {
      const F = M + h.n2(A * 5, _ * 5) * 0.06;
      F > 1 ||
        y(
          x,
          F > 0.94
            ? u.glow
            : p(u.elder, u.isle, h.n2(A * 6 + 3, _ * 6) * 0.6 + 0.3),
        );
    }),
    l
  );
}
function packPoints(f, t) {
  const e = f.length,
    s = new Float32Array(e * 3),
    i = new Float32Array(e),
    n = new Float32Array(e * 3),
    a = new Float32Array(e);
  return (
    f.forEach((r, o) => {
      (r.p.toArray(s, o * 3),
        (i[o] = r.s),
        r.c.toArray(n, o * 3),
        (a[o] = t()));
    }),
    { position: s, size: i, color: n, phase: a }
  );
}
function collectTransferables(f) {
  const t = new Set(),
    e = (i) => {
      i && t.add(i.buffer);
    },
    s = (i) => {
      (e(i.position), e(i.normal), e(i.color), e(i.glow), e(i.uv), e(i.index));
    };
  (e(f.heights),
    e(f.field),
    e(f.map),
    s(f.terrain),
    s(f.outer),
    f.geos.forEach(s),
    f.chunks.forEach((i) => {
      (e(i.matrices), e(i.colors));
    }),
    e(f.falls.position),
    e(f.falls.uv),
    e(f.falls.index));
  for (const i of Object.values(f.points))
    (e(i.position), e(i.size), e(i.color), e(i.phase));
  return [...t];
}
self.onmessage = (f) => {
  const { seed: t, quality: e, id: s } = f.data;
  try {
    const i = performance.now(),
      n = generateWorld(t, e);
    self.postMessage({ id: s, world: n, ms: performance.now() - i }, collectTransferables(n));
  } catch (i) {
    self.postMessage({
      id: s,
      error: i instanceof Error ? i.message : String(i),
    });
  }
};
