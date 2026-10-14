// assets__index-CBRcanzC 06 — math
// Lines 1448-1661 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
function Zi(t) {
  const e = xe(t),
    s = e.clone().multiplyScalar(0.6),
    i = xe("#1a1420"),
    a = [],
    n = (d, p) => (Math.sin(p * 14 + Math.sin(d * 9) * 2) > 0.55 ? s : e),
    r = (d, p, x) =>
      Yi.n3(d * 18, p * 18, x * 18) > 0.42
        ? xe("#7ffcff").multiplyScalar(0.9)
        : Be,
    o = (d, p = n, x = r) => a.push(re(d, p, x)),
    l = (d, p, x, y, g, S, w) => {
      const M = new wt(d, 12, 10);
      return (M.scale(p, x, y), M.translate(g, S, w), M);
    };
  o(l(0.2, 1.2, 0.8, 1, 0, 0.2, 0));
  const c = new mi(0.19, 0.55, 4, 10);
  (c.scale(1.25, 1, 0.85),
    c.rotateX(0.35),
    c.translate(0, 0.7, 0.14),
    o(c),
    o(Ne(new H(0, 1.02, 0.26), new H(0, 1.26, 0.34), 0.075, 0.07)),
    o(l(0.165, 0.85, 1.15, 1.05, 0, 1.42, 0.4)));
  for (const d of [-1, 1]) {
    const p = new Rs(0.05, 0.2, 6);
    (p.rotateZ(-d * 1), p.translate(d * 0.17, 1.48, 0.36), o(p));
    const x = new H(d * 0.25, 1.02, 0.27),
      y = new H(d * 0.32, 0.78, 0.62),
      g = new H(d * 0.13, 0.74, 0.98);
    (o(Ne(x, y, 0.07, 0.06)),
      o(Ne(y, g, 0.06, 0.045)),
      o(l(0.06, 1, 1, 1, g.x, g.y, g.z)));
    const S = new Fs(0.065, 0.018, 5, 10);
    (S.rotateX(Math.PI / 2),
      S.translate(F(y.x, g.x, 0.7), F(y.y, g.y, 0.7), F(y.z, g.z, 0.7)),
      o(S, xe("#e0b060"), xe("#5ff2d6").multiplyScalar(1.5)));
    const w = new H(d * 0.16, 0.12, 0),
      M = new H(d * 0.64, -0.06, 0.45),
      T = new H(d * 0.62, -0.62, 0.22);
    (o(Ne(w, M, 0.1, 0.08)), o(Ne(M, T, 0.075, 0.055)));
  }
  (o(
    new vi(
      new dt([
        new H(0, 1.52, 0.3),
        new H(0, 1.36, 0.1),
        new H(0, 1, -0.12),
        new H(0.05, 0.6, -0.28),
        new H(0.08, 0.3, -0.35),
      ]),
      16,
      0.055,
      6,
    ),
    i,
    Be,
  ),
    o(
      l(0.172, 0.9, 1.05, 1.08, 0, 1.47, 0.36),
      (d, p, x) => (x > 0.48 && p < 1.55 ? e : i),
      Be,
    ));
  const f = new yt(0.24, 0.28, 0.22, 10, 1, !0);
  (f.translate(0, 0.17, 0), o(f, xe("#6b4a2a"), Be));
  const h = new Se(),
    m = new $(Oe(a), Xi);
  ((m.frustumCulled = !1), h.add(m), h.scale.setScalar(1.3));
  const v = new Ns();
  return (v.position.set(0, 1.46, 0.62), h.add(v), { group: h, head: v });
}
function Wt(t) {
  t.traverse((e) => {
    const s = e;
    s.isMesh && s.geometry.dispose();
  });
}
function Ys(t, e, s, i, a, n, r, o = 0) {
  const l = Math.sin(e),
    c = Math.sin(i * 11 + r) * 0.012 * (1 - s);
  for (const f of t.wings)
    ((f.inner.rotation.z = l * 0.62 * s + 0.06 - o * 0.12 + c),
      (f.inner.rotation.y = -Math.cos(e) * 0.12 * s - o * 0.5),
      (f.outer.rotation.z =
        Math.sin(e - 0.7) * 0.55 * s + 0.04 + o * 0.3 + c * 1.5),
      (f.outer.rotation.y = -o * 0.95));
  t.tail.forEach((f, h) => {
    ((f.rotation.y = Math.sin(i * 1.4 - h * 0.55 + r) * 0.07 - a * 0.035),
      (f.rotation.x = Math.sin(i * 1.1 - h * 0.4) * 0.035 + n * 0.05));
  });
}
const ms = { x: 0, y: 0, aim: null, flap: !1, dive: !1, trick: 0 },
  Bt = 9.81,
  Qi = 0.00109,
  Ji = 52e-5,
  Ie = 6.4,
  _t = 14,
  ea = new k(0, 1, 0);
function Dt(t, e, s, i = 38) {
  for (const n of s)
    if (n.t === "s") {
      const r = t.x - n.x,
        o = t.y - n.y,
        l = t.z - n.z,
        c = Math.hypot(r, o, l),
        f = n.r + i;
      if (c < f && c > 0) {
        const h = (((f - c) / i) * 2.4) / c;
        ((e.x += r * h), (e.y += o * h), (e.z += l * h));
      }
    } else if (t.y < n.top + 25) {
      const r = t.x - n.x,
        o = t.z - n.z,
        l = Math.hypot(r, o),
        c = n.r + i;
      if (l < c && l > 0) {
        const f = (((c - l) / i) * 2.4) / l;
        ((e.x += r * f), (e.z += o * f), (e.y += 0.4));
      }
    }
  const a = Math.hypot(t.x, t.z);
  a > At &&
    ((e.x -= (t.x / a) * (a - At) * 0.03),
    (e.z -= (t.z / a) * (a - At) * 0.03));
}
function Ut(t, e, s, i) {
  for (const [a, n, r, o] of s) {
    const l = t.x - a,
      c = t.y - n,
      f = t.z - r,
      h = Math.hypot(l, c, f),
      m = o + i;
    if (h < m && h > 0) {
      const v = (((m - h) / i) * 2.4) / h;
      ((e.x += l * v), (e.y += c * v), (e.z += f * v));
    }
  }
}
const vs = (t) => Math.atan2(Math.sin(t), Math.cos(t));
function ta(t, e, s) {
  let i = 0;
  const a = (n, r, o, l) => {
    l > 0 && (i === 0 || l < i) && ((i = l), s.set(n, r, o).normalize());
  };
  for (const [n, r, o, l] of e.isles) {
    const c = t.x - n,
      f = t.z - o,
      h = Math.hypot(c, f);
    if (h > l * 1.02 || t.y > r + l * 0.32 || t.y < r - l * 2.1) continue;
    const m = h / l,
      v = r + l * 0.3 * (1 - m * m),
      d = r - l * 2 * Math.pow(Math.max(0, 1 - m), 0.85);
    if (t.y > v || t.y < d) continue;
    const p = v - t.y,
      x = t.y - d,
      y = l * 1.02 - h;
    p <= y && p <= x
      ? a((c * 0.3) / l, 1, (f * 0.3) / l, p + 0.5)
      : y <= x
        ? a(c, 0, f, y + 0.5)
        : a(0, -1, 0, x + 0.5);
  }
  for (const n of e.arches) {
    const r = t.clone().sub(n.base),
      o = new k(n.side.z, 0, -n.side.x),
      l = r.dot(n.side),
      c = r.y,
      f = r.dot(o),
      h = Math.atan2(Math.max(c, 0), l),
      m = Math.cos(h) * n.R,
      v = Math.sin(h) * n.R,
      d = l - m,
      p = c - v,
      x = Math.hypot(d, p, f),
      y = n.tube * 1.15;
    if (x < y && c > -n.tube) {
      const g = n.side
        .clone()
        .multiplyScalar(d)
        .add(new k(0, p, 0))
        .addScaledVector(o, f);
      a(g.x, g.y, g.z, y - x + 0.4);
    }
  }
  for (const n of e.pillars) {
    if (t.y > n.top) continue;
    const r = t.x - n.x,
      o = t.z - n.z,
      l = Math.hypot(r, o),
      c = n.r;
    if (l < c) {
      const f = n.top - t.y,
        h = c - l;
      f < h ? a(0, 1, 0, f + 0.5) : a(r, 0, o, h + 0.5);
    }
  }
  for (const [n, r, o, l] of e.movers) {
    const c = t.x - n,
      f = t.y - r,
      h = t.z - o,
      m = Math.hypot(c, f, h);
    m < l + 1.5 && a(c, f, h, l + 1.5 - m);
  }
  {
    const n = e.elder,
      r = t.x - n.x,
      o = t.y - (n.y + 162),
      l = t.z - n.z,
      c = (r * r + l * l) / (108 * 108) + (o * o) / (40 * 40);
    c < 1 && a(r / 108, o / 40, l / 108, (1 - Math.sqrt(c)) * 40 + 0.5);
    const f = Math.hypot(r, l);
    t.y < n.y + 140 && f < 24 && a(r, 0, l, 24 - f + 0.5);
  }
  return i;
}
