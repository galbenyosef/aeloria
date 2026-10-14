// assets__worker-BdHOuDMt 02 — math
// Lines 7050-7387 of readable/assets__worker-BdHOuDMt.pretty.js (statement-aligned).
class rn {
  constructor(t, e, s) {
    ((this.N = t),
      (this.R = e),
      (this.seg = s),
      (this.heights = null),
      (this.cell = tt / s));
  }
  H(t, e) {
    const { N: s, R: i } = this;
    let n = 16 + s.fbm(t * 0.0021, e * 0.0021, 5) * 78;
    n += Math.max(0, s.ridge(t * 0.0034 + 7, e * 0.0034 - 3, 4) - 0.56) * 70;
    const a = H(1 - Math.hypot(t - i.PL.x, e - i.PL.z) / 440);
    n = St(n, 9 + s.fbm(t * 0.007, e * 0.007, 3) * 9, a * 0.9);
    const r = H(1 - Math.hypot(t - i.TR.x, e - i.TR.z) / 240);
    n = St(n, 14 + s.fbm(t * 0.01, e * 0.01, 2) * 5, r * 0.85);
    const o = H(1 - Math.hypot(t - i.LK.x, e - i.LK.z) / 300);
    n = St(n, -24, o * o * 1.05);
    const l = Math.hypot(t, e);
    return (
      (n +=
        H((l - 930) / 560) *
        (230 + s.ridge(t * 0.004 + 3, e * 0.004, 4) * 300)),
      n
    );
  }
  groundY(t, e) {
    const s = this.heights,
      i = this.seg,
      n = (t + tt / 2) / this.cell,
      a = (e + tt / 2) / this.cell;
    if (!s || n < 0 || a < 0 || n >= i || a >= i) return this.H(t, e);
    const r = Math.floor(n),
      o = Math.floor(a),
      l = n - r,
      h = a - o,
      c = i + 1,
      p = s[o * c + r],
      u = s[(o + 1) * c + r],
      d = s[(o + 1) * c + r + 1],
      y = s[o * c + r + 1];
    return l + h <= 1
      ? p + l * (y - p) + h * (u - p)
      : d + (1 - l) * (u - d) + (1 - h) * (y - d);
  }
  surface(t, e) {
    return Math.max(this.groundY(t, e), bt);
  }
  slopeAt(t, e) {
    return (
      Math.hypot(
        this.groundY(t + 3, e) - this.groundY(t - 3, e),
        this.groundY(t, e + 3) - this.groundY(t, e - 3),
      ) /
      (2 * 3)
    );
  }
  forestMask(t, e) {
    const { N: s, R: i } = this,
      n = H(1 - Math.hypot(t - i.TR.x, e - i.TR.z) / 560),
      a = H(1 - Math.hypot(t - i.FO.x, e - i.FO.z) / 420),
      r = s.n2(t * 0.006 + 11, e * 0.006) * 0.9 + 0.5;
    return (
      Ot(
        Math.max(n, a) * (0.55 + r * 0.6) + Math.max(0, r - 0.75) * 0.6,
        0,
        1,
      ) *
      (1 - H((Math.hypot(t, e) - 900) / 150))
    );
  }
  plainsMask(t, e) {
    return H(1 - Math.hypot(t - this.R.PL.x, e - this.R.PL.z) / 420);
  }
  lakeMask(t, e) {
    return H(1 - Math.hypot(t - this.R.LK.x, e - this.R.LK.z) / 420);
  }
}
function on({ rand: f }) {
  const t = [];
  for (let e = 0; e < 5; e++) {
    const s = 1 + f() * 1.7,
      i = 0.26 + f() * 0.2,
      n = [];
    for (let l = 0; l <= 7; l++) {
      const h = l / 7;
      n.push([
        i *
          Math.pow(Math.sin(Math.PI * Math.pow(h, 0.62)), 0.85) *
          (h < 0.12 ? 0.5 + h / 0.24 : 1),
        h * s,
      ]);
    }
    const a = Ue(n, 7),
      r = (e / 5) * W + f(),
      o = e ? 0.42 + f() * 0.2 : 0;
    (a.rotateZ((f() - 0.5) * 0.35),
      a.rotateX((f() - 0.5) * 0.35),
      a.translate(Math.cos(r) * o, 0, Math.sin(r) * o),
      t.push(
        rt(
          a,
          (l, h) => ct(k("#1b3a44"), k("#a6dfe9"), h / s),
          (l, h) =>
            k("#2fe8ff").multiplyScalar(Math.pow(Ot(h / s, 0, 1), 1.4) * 1.5),
        ),
      ));
  }
  return wt(t);
}
function an({ rand: f }) {
  const t = [];
  for (let e = 0; e < 3; e++) {
    const s = 1.6 + f() * 1.4,
      i = [];
    for (let a = 0; a <= 9; a++) {
      const r = a / 9;
      i.push([0.06 + Math.pow(r, 3.2) * 0.8, r * s]);
    }
    const n = Ue(i, 9);
    (n.rotateZ((f() - 0.5) * 0.4),
      n.translate((f() - 0.5) * 0.8, 0, (f() - 0.5) * 0.8),
      t.push(
        rt(
          n,
          (a, r) =>
            r / s < 0.55
              ? ct(k("#2d5a30"), k("#7a2a6e"), (r / s) * 1.6)
              : ct(k("#a9338f"), k("#ff9ad8"), (r / s - 0.55) * 2.2),
          (a, r) => k("#ff3fd0").multiplyScalar(H((r / s - 0.6) / 0.4) * 1.4),
        ),
      ));
  }
  return wt(t);
}
function hn({ rand: f }) {
  const t = [];
  for (let e = 0; e < 3; e++) {
    const s = [],
      i = 1.2 + f() * 0.8,
      n = 0.35 + f() * 0.15;
    for (let r = 0; r <= 28; r++) {
      const o = r / 28;
      if (o < 0.5) s.push(new N(0, o * 2 * i, 0));
      else {
        const l = (o - 0.5) / 0.5,
          h = l * Math.PI * 2.4,
          c = n * (1 - l * 0.85);
        s.push(
          new N(
            0,
            i + n + Math.sin(h - Math.PI / 2) * c,
            Math.cos(h - Math.PI / 2) * c,
          ),
        );
      }
    }
    const a = new Oe(new ts(s), 24, 0.055, 4);
    (a.rotateY((e / 3) * W + f()),
      a.translate((f() - 0.5) * 0.6, 0, (f() - 0.5) * 0.6),
      t.push(
        rt(
          a,
          (r, o) => ct(k("#24502a"), k("#7ab84a"), o / 2),
          (r, o) => k("#5dffb0").multiplyScalar(H((o - i) / n) * 1.2),
        ),
      ));
  }
  return wt(t);
}
function cn({ rand: f }) {
  const t = [],
    e = 6 + ((f() * 3) | 0);
  for (let s = 0; s < e; s++) {
    const i = 1.8 + f() * 1.4,
      n = new Ie(0.75, i, 2, 7),
      a = n.attributes.position.array;
    for (let l = 0; l < a.length; l += 3) {
      const h = (a[l + 1] + i / 2) / i;
      ((a[l] *= Math.pow(Math.sin(Math.PI * Ot(h * 0.95 + 0.05, 0, 1)), 0.7)),
        (a[l + 1] = h * i),
        (a[l + 2] = -Math.abs(a[l]) * 0.25));
    }
    n.rotateX(-0.75 - f() * 0.3);
    const r = n.attributes.position.array;
    for (let l = 0; l < r.length; l += 3) {
      const h = r[l + 2] / i;
      r[l + 1] -= h * h * 1.1 * i * 0.3;
    }
    n.computeVertexNormals();
    const o = (s / e) * W + f() * 0.4;
    (n.rotateY(o),
      t.push(
        rt(
          n,
          (l, h, c) => ct(k("#1a4426"), k("#3f7f3a"), Math.hypot(l, c) / i),
          (l, h, c) => {
            const p = Math.hypot(l, c),
              u = Math.atan2(l, c) - o;
            return k("#33ffd6").multiplyScalar(
              Math.abs(Math.sin(u)) * p < 0.05 ? 0.8 : 0.05,
            );
          },
        ),
      ));
  }
  return wt(t);
}
function ln({ rand: f }) {
  const t = [];
  for (let e = 0; e < 4; e++) {
    const s = 0.4 + f() * 0.9,
      i = (f() - 0.5) * 1.2,
      n = (f() - 0.5) * 1.2,
      a = 0.18 + f() * 0.28,
      r = new is(0.05, 0.08, s, 6, 1, !0);
    (r.translate(i, s / 2, n), t.push(rt(r, k("#d8d0e8"))));
    const o = new Ns(a, 8, 4, 0, W, 0, Math.PI / 2);
    (o.scale(1, 0.55, 1),
      o.translate(i, s, n),
      t.push(
        rt(
          o,
          k("#b9a8e8"),
          k(f() < 0.5 ? "#8b6bff" : "#3fb8ff").multiplyScalar(1.3),
        ),
      ));
  }
  return wt(t);
}
function un({ rand: f }) {
  const t = [],
    e = [],
    s = [],
    i = k("#1c3a1d"),
    n = k("#7dae45"),
    a = k("#6dff8a").multiplyScalar(0.7);
  for (let o = 0; o < 9; o++) {
    const l = f() * W,
      h = f() * 1.2,
      c = Math.cos(l) * h,
      p = Math.sin(l) * h,
      u = 0.6 + f() * 1.1,
      d = 0.06 + f() * 0.04,
      y = f() * W,
      b = 0.2 + f() * 0.4,
      g = Math.cos(y),
      w = Math.sin(y),
      x = -w,
      M = g,
      A = (_) => [c + g * b * _ * _ * u, _ * u, p + w * b * _ * _ * u];
    for (let _ = 0; _ < 3; _++) {
      const F = _ / 3,
        S = (_ + 1) / 3,
        R = d * (1 - F),
        P = d * (1 - S),
        D = A(F),
        L = A(S),
        V = [D[0] - x * R, D[1], D[2] - M * R],
        Z = [D[0] + x * R, D[1], D[2] + M * R],
        $ = [L[0] - x * P, L[1], L[2] - M * P],
        it = [L[0] + x * P, L[1], L[2] + M * P],
        et = (mt, K, Q, nt) => {
          t.push(...mt, ...K, ...Q);
          for (const gt of nt) {
            const Y = ct(i, n, gt);
            e.push(Y.r, Y.g, Y.b);
            const ot = gt > 0.85 ? a : rs;
            s.push(ot.r, ot.g, ot.b);
          }
        };
      (et(V, Z, $, [F, F, S]), et(Z, it, $, [F, S, S]));
    }
  }
  const r = new Float32Array(t.length);
  for (let o = 1; o < t.length; o += 3) r[o] = 1;
  return {
    position: new Float32Array(t),
    normal: r,
    color: new Float32Array(e),
    glow: new Float32Array(s),
    radius: 3,
  };
}
function pn({ N: f, rand: t }) {
  const e = [];
  for (let s = 0; s < 3; s++) {
    const i = s ? 0.35 + t() * 0.4 : 1,
      n = fi(
        f,
        2,
        1.6 * i * (0.8 + t() * 0.4),
        i * (0.7 + t() * 0.5),
        1.4 * i,
        0.45,
        t() * 50,
      );
    (n.translate(s ? (t() - 0.5) * 2.8 : 0, i * 0.3, s ? (t() - 0.5) * 2.8 : 0),
      e.push(
        rt(
          n,
          (a, r, o, l, h) =>
            h > 0.55
              ? ct(k("#2c5a2e"), k("#4f8a3a"), f.n3(a * 2, r * 2, o * 2) + 0.5)
              : ct(k("#5b5650"), k("#867e72"), f.n3(a * 3, r * 5, o * 3) + 0.5),
          (a, r, o, l, h) => (h < 0.5 ? k("#2fffd0").multiplyScalar(0.7) : rs),
        ),
      ));
  }
  return wt(e);
}
function fn() {
  const f = new ge(0.3, 1, 0.3, 1, 6, 1);
  return (
    f.translate(0, -0.5, 0),
    wt([
      rt(
        f,
        (t, e) => ct(k("#4c7a3c"), k("#2a4a2a"), -e),
        (t, e) => k("#3dffd2").multiplyScalar(H((-e - 0.75) / 0.25) * 1.6),
      ),
    ])
  );
}
function mn() {
  const f = new ge(0.16, 1, 0.16, 1, 8, 1);
  return (
    f.translate(0, -0.5, 0),
    wt([
      rt(
        f,
        (t, e) => ct(k("#c8b8f0"), k("#e0f8ff"), -e),
        (t, e) =>
          ct(k("#6a4dff"), k("#3ff0ff"), -e).multiplyScalar(0.4 + -e * 1.4),
      ),
    ])
  );
}
