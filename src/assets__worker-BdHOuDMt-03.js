// assets__worker-BdHOuDMt 03 — math
// Lines 7388-7729 of readable/assets__worker-BdHOuDMt.pretty.js (statement-aligned).
function os({ N: f, rand: t }, e, s, i, n, a, r) {
  const o = fi(f, r.detail ?? 2, i * 0.8, n * 0.8, a * 0.8, 0.3, t() * 50);
  o.translate(s.x, s.y, s.z);
  const l = r.dark.clone().multiplyScalar(0.8);
  e.push(
    rt(
      o,
      (c, p, u, d, y) =>
        ct(l, r.light, y * 0.45 + 0.35 + f.n3(c * 0.3, p * 0.3, u * 0.3) * 0.3),
      (c, p, u, d, y) =>
        r.under.clone().multiplyScalar(H((-y - 0.1) / 0.4) * r.underK),
    ),
  );
  const h = () => 0.85 + t() * 0.3;
  e.push(
    en(
      t,
      s,
      i,
      n,
      a,
      r.cards,
      r.size,
      r.cell,
      (c, p, u, d) =>
        ct(r.dark, r.light, p * 0.5 + 0.5).multiplyScalar(
          (0.6 + 0.45 * d) * h(),
        ),
      (c, p) => r.under.clone().multiplyScalar(H((-p - 0.05) / 0.4) * r.underK),
    ),
  );
}
const as = (f) => (t, e, s) =>
  ct(k("#3a2e26"), k("#6a5a4a"), f.n3(t * 0.6, e * 0.08, s * 0.6) * 0.8 + 0.5);
function dn({ N: f, rand: t }) {
  const e = as(f),
    s = [],
    i = 46,
    n = [];
  for (let h = 0; h <= 16; h++) {
    const c = h / 16,
      p = c * i;
    n.push([1.1 + 2.8 * Math.exp(-p / 2.6) - c * 0.5, p]);
  }
  const a = Ue(n, 10),
    r = a.attributes.position.array;
  for (let h = 0; h < r.length; h += 3) r[h] += Math.sin(r[h + 1] * 0.05) * 1.6;
  s.push(
    rt(a, e, (h, c, p) =>
      k("#3fffd8").multiplyScalar(
        H((f.n3(h * 0.3, c * 0.08, p * 0.3) + 0.1) / 0.35) * 0.7,
      ),
    ),
  );
  for (let h = 0; h < 6; h++) {
    const c = (h / 6) * W + t() * 0.4;
    s.push(
      rt(
        Ts(
          new N(Math.cos(c) * 1.2, 4, Math.sin(c) * 1.2),
          new N(Math.cos(c) * 6.5, -0.6, Math.sin(c) * 6.5),
          0.9,
          0.25,
        ),
        e,
      ),
    );
  }
  const o = [];
  for (let h = 0; h < 5; h++) {
    const c = (h / 5) * W + t(),
      p = 30 + h * 2.4,
      u = new N(
        Math.cos(c) * (9 + t() * 3),
        p + 8 + t() * 5,
        Math.sin(c) * (9 + t() * 3),
      );
    (s.push(rt(Ts(new N(Math.sin(p * 0.05) * 1.6, p, 0), u, 0.75, 0.3), e)),
      o.push(u));
  }
  o.push(new N(Math.sin(i * 0.05) * 1.6, i + 3, 0));
  const l = {
    dark: k("#183f26"),
    light: k("#4f9440"),
    under: k("#8c4dff"),
    underK: 0.7,
    cell: Qt.broad,
    cards: 30,
    size: 5.2,
  };
  for (const h of o)
    os({ N: f, rand: t }, s, h, 8 + t() * 3, 3.8 + t() * 1.5, 8 + t() * 3, l);
  for (let h = 0; h < 12; h++) {
    const c = o[h % o.length],
      p = 5 + t() * 9,
      u = new ge(0.14, p, 0.14, 1, 4, 1);
    (u.translate(
      c.x + (t() - 0.5) * 10,
      c.y - 2 - p / 2,
      c.z + (t() - 0.5) * 10,
    ),
      s.push(
        rt(u, k("#5c7a4a"), (d, y) =>
          k("#3dffd2").multiplyScalar(y < c.y - 2 - p * 0.75 ? 1.4 : 0),
        ),
      ));
  }
  return wt(s);
}
function yn({ N: f, rand: t }) {
  const e = as(f),
    s = [],
    i = 22,
    n = [];
  for (let r = 0; r <= 14; r++) {
    const o = r / 14;
    n.push([
      2.4 + Math.sin(o * Math.PI) * 0.9 - o * 1.5 + Math.exp(-o * 12) * 1.4,
      o * i,
    ]);
  }
  s.push(
    rt(Ue(n, 12), e, (r, o, l) =>
      k("#ff9a3f").multiplyScalar(
        f.n3(r * 0.7, o * 0.3, l * 0.7) > 0.45 ? 0.4 : 0,
      ),
    ),
  );
  for (let r = 0; r < 5; r++) {
    const o = (r / 5) * W + t() * 0.5,
      l = new N(Math.cos(o) * 11, i + 9 + t() * 3, Math.sin(o) * 11);
    s.push(rt(Ts(new N(0, i - 1, 0), l, 1.2, 0.45), e));
  }
  const a = {
    dark: k("#1c4424"),
    light: k("#649c42"),
    under: k("#36f5d0"),
    underK: 0.6,
    cell: Qt.round,
    cards: 22,
    size: 4.6,
  };
  for (let r = 0; r < 11; r++) {
    const o = t() * W,
      l = r ? 4 + t() * 9 : 0;
    os(
      { N: f, rand: t },
      s,
      new N(Math.cos(o) * l, i + 10 + t() * 2.5 - l * 0.12, Math.sin(o) * l),
      7 + t() * 3,
      2.4 + t(),
      7 + t() * 3,
      a,
    );
  }
  return wt(s);
}
function xn({ N: f, rand: t }) {
  const e = as(f),
    s = [],
    i = 12,
    n = [];
  for (let h = 0; h <= 10; h++) {
    const c = h / 10;
    n.push([0.55 - c * 0.3 + Math.exp(-c * 10) * 0.5, c * i]);
  }
  const a = Ue(n, 8),
    r = a.attributes.position.array;
  for (let h = 0; h < r.length; h += 3) r[h] += Math.pow(r[h + 1] / i, 2) * 2;
  s.push(rt(a, e));
  const o = t() < 0.5,
    l = o
      ? {
          dark: k("#4a2262"),
          light: k("#c063b0"),
          under: k("#ff4fd8"),
          underK: 0.75,
          cell: Qt.frond,
          cards: 18,
          size: 2.8,
        }
      : {
          dark: k("#16443f"),
          light: k("#45ab95"),
          under: k("#3fffe0"),
          underK: 0.75,
          cell: Qt.frond,
          cards: 18,
          size: 2.8,
        };
  for (let h = 0; h < 4; h++) {
    const c = t() * W;
    os(
      { N: f, rand: t },
      s,
      new N(2 + Math.cos(c) * 2.4, i + 1 + t() * 3, Math.sin(c) * 2.4),
      3.4 + t() * 1.6,
      2.5 + t(),
      3.4 + t() * 1.6,
      l,
    );
  }
  for (let h = 0; h < 8; h++) {
    const c = 2 + t() * 4,
      p = new ge(0.1, c, 0.1);
    (p.translate(2 + (t() - 0.5) * 6, i - c / 2, (t() - 0.5) * 6),
      s.push(
        rt(p, k("#d8c0ff"), k(o ? "#ff6ae0" : "#5fffe8").multiplyScalar(1.2)),
      ));
  }
  return wt(s);
}
function gn({ N: f, rand: t }) {
  const e = as(f),
    s = [];
  for (let i = 0; i < 9; i++) {
    const n = (i / 9) * W,
      a = [];
    for (let r = 0; r <= 12; r++) {
      const o = r / 12,
        l = o * 150,
        h = o < 0.45 ? 24 + -16 * H(o / 0.45) : 8 + 26 * H((o - 0.45) / 0.55),
        c = n + o * 1.6;
      a.push(new N(Math.cos(c) * h, l - 4, Math.sin(c) * h));
    }
    s.push(
      rt(new Oe(new ts(a), 48, 5.2, 8), e, (r, o, l) =>
        k("#4dfff0").multiplyScalar(
          H((f.n3(r * 0.05, o * 0.03, l * 0.05) + 0.05) / 0.3) * 1.2,
        ),
      ),
    );
  }
  for (let i = 0; i < 12; i++) {
    const n = (i / 12) * W + t() * 0.3,
      a = [];
    for (let r = 0; r <= 8; r++) {
      const o = r / 8,
        l = 20 + o * 55;
      a.push(
        new N(
          Math.cos(n + o * 0.3) * l,
          12 * (1 - o) * (1 - o) - 3,
          Math.sin(n + o * 0.3) * l,
        ),
      );
    }
    s.push(
      rt(new Oe(new ts(a), 24, 3.2, 6), e, (r, o, l) =>
        k("#4dfff0").multiplyScalar(
          H((f.n3(r * 0.06, o * 0.06, l * 0.06) + 0.05) / 0.3) * 1,
        ),
      ),
    );
  }
  for (let i = 0; i < 38; i++) {
    const n = t() * W,
      a = Math.sqrt(t()) * 100,
      r = 146 + Math.cos((a / 100) * 1.4) * 42 + t() * 10;
    os(
      { N: f, rand: t },
      s,
      new N(Math.cos(n) * a, r, Math.sin(n) * a),
      22 + t() * 16,
      9 + t() * 6,
      22 + t() * 16,
      {
        dark: k("#123a2a"),
        light: k("#3f9258"),
        under: k("#7a5cff"),
        underK: 0.85,
        cell: i % 3 === 0 ? Qt.frond : Qt.broad,
        cards: 40,
        size: 11,
        detail: 3,
      },
    );
  }
  return wt(s);
}
function Mn(f, t, e) {
  const s = new ns(1, e),
    i = s.attributes.position.array,
    n = Float32Array.from(i);
  for (let c = 0; c < i.length; c += 3) {
    const p = i[c],
      u = i[c + 1],
      d = i[c + 2],
      y = 1 + f.fbm3(p * 1.5 + t, u * 1.5, d * 1.5 + t, 4) * 0.42;
    let b = p * y,
      g = u * y,
      w = d * y;
    if (g > 0) g = g * 0.3 + f.fbm3(p * 3 + t, 1, d * 3, 3) * 0.07;
    else {
      const x = -g,
        M = Math.max(0.06, 1 - Math.pow(x, 1.1) * 0.88);
      ((b *= M),
        (w *= M),
        (g = -Math.pow(x, 0.85) * (1.7 + f.n3(p * 2 + t, d * 2, 1) * 0.8)));
      const A = f.n3(Math.atan2(d, p) * 3 + t, g * 5, 0) * 0.16;
      ((b *= 1 + A), (w *= 1 + A));
    }
    ((i[c] = b), (i[c + 1] = g), (i[c + 2] = w));
  }
  De(s, n);
  const a = wt([
      rt(
        s,
        (c, p, u, d, y) => {
          const b = f.n3(c * 4 + t, p * 6, u * 4);
          if (y > 0.55 && p > -0.05)
            return ct(k("#2a5a2c"), k("#5a9a3e"), b + 0.5);
          const g = ct(
            k("#5b5650"),
            k("#7d776c"),
            f.n3(c * 2, p * 9, u * 2) + 0.5,
          ).lerp(k("#3a3836"), Ot(-p * 0.3, 0, 0.45));
          return b > 0.15 ? g.lerp(k("#2f5a32"), 0.7) : g;
        },
        (c, p, u, d, y) => {
          const b = f.n3(c * 2.2 + t, p * 3, u * 2.2 + 9);
          return y < 0.55
            ? k("#2fffd0").multiplyScalar(H((b + 0.05) / 0.3) * 0.9)
            : k("#a46bff").multiplyScalar(H((b - 0.1) / 0.3) * 0.6);
        },
      ),
    ]),
    r = [],
    o = [],
    l = a.normal,
    h = a.position;
  for (let c = 0; c < h.length; c += 9) {
    const p = l[c + 1],
      u = h[c + 1];
    if (p > 0.8 && u > 0) r.push(h[c], h[c + 1], h[c + 2]);
    else if (p < 0.25 && p > -0.35 && u > -0.18 && u < 0.12) {
      const d = Math.hypot(l[c], l[c + 2]) || 1;
      o.push(h[c], h[c + 1], h[c + 2], l[c] / d, l[c + 2] / d);
    }
  }
  return { geo: a, tops: r, rims: o };
}
