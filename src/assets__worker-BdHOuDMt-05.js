// assets__worker-BdHOuDMt 05 — math
// Lines 7839-8709 of readable/assets__worker-BdHOuDMt.pretty.js (statement-aligned).
function _n(f, t) {
  const e = zn[t],
    s = tn(f),
    i = pi(f),
    n = { N: s, rand: i },
    a = nn(i),
    r = new rn(s, a, e.seg),
    { PK: o, TR: l, PL: h, LK: c, FO: p } = a,
    u = [],
    d = (m) => u.push(m) - 1,
    y = [],
    b = [],
    g = [],
    w = new Ie(tt, tt, e.seg, e.seg).rotateX(-Math.PI / 2),
    x = w.attributes.position.array,
    M = new Float32Array((e.seg + 1) * (e.seg + 1));
  for (let m = 0; m < x.length / 3; m++) {
    const z = r.H(x[m * 3], x[m * 3 + 2]);
    ((x[m * 3 + 1] = z), (M[m] = z));
  }
  ((r.heights = M), w.computeVertexNormals());
  const A = w.attributes.normal.array,
    _ = new Float32Array(x.length),
    F = new Float32Array(x.length),
    S = k("#1e4a2a"),
    R = k("#4c8a34"),
    P = k("#1f5a4c"),
    D = k("#5f6168"),
    L = k("#3e3a2c"),
    V = k("#6a8a3a"),
    Z = k("#2fffd0"),
    $ = k("#9a5cff"),
    it = k("#6dff8a"),
    et = new xe();
  for (let m = 0; m < x.length / 3; m++) {
    const z = x[m * 3],
      C = x[m * 3 + 1],
      B = x[m * 3 + 2],
      T = A[m * 3 + 1],
      U = s.n2(z * 0.008, B * 0.008) + 0.5,
      O = r.forestMask(z, B);
    (et
      .copy(S)
      .lerp(R, Ot(U, 0, 1))
      .lerp(P, O * 0.5),
      et.lerp(V, H(1 - Math.hypot(z - h.x, B - h.z) / 400) * 0.4),
      et.lerp(D, H((1 - T - 0.28) / 0.3)).lerp(D, H((C - 220) / 140) * 0.8),
      C < bt + 2.5 && et.lerp(L, H((bt + 2.5 - C) / 2)),
      (_[m * 3] = et.r),
      (_[m * 3 + 1] = et.g),
      (_[m * 3 + 2] = et.b));
    let E = 0,
      I = 0,
      G = 0;
    const q = Math.abs(s.n2(z * 0.011 + 50, B * 0.011 - 20)),
      X = s.n2(z * 0.035, B * 0.035),
      at =
        (1 - H((C - 140) / 60)) * (C > bt + 0.5 ? 1 : 0) * H((T - 0.6) / 0.2);
    if (q < 0.035) {
      const J = (1 - q / 0.035) * 1.1 * (0.35 + O);
      ((E += Z.r * J), (I += Z.g * J), (G += Z.b * J));
    }
    if (X > 0.32) {
      const J = (X - 0.32) * 3.5 * (0.3 + O),
        dt = Math.hypot(z - c.x, B - c.z) < 420 ? $ : Z;
      ((E += dt.r * J), (I += dt.g * J), (G += dt.b * J));
    }
    const lt = s.n2(z * 0.09, B * 0.09);
    if (lt > 0.42) {
      const J = (lt - 0.42) * 3 * (1 - O * 0.5) * 0.6;
      ((E += it.r * J), (I += it.g * J), (G += it.b * J));
    }
    ((F[m * 3] = E * at * 0.5),
      (F[m * 3 + 1] = I * at * 0.5),
      (F[m * 3 + 2] = G * at * 0.5));
  }
  const mt = {
      position: x,
      normal: A,
      color: _,
      glow: F,
      index: new Uint32Array(w.index.array),
      radius: tt,
    },
    K = new Ie(9e3, 9e3, 150, 150).rotateX(-Math.PI / 2),
    Q = K.attributes.position.array,
    nt = new Float32Array(Q.length);
  for (let m = 0; m < Q.length / 3; m++) {
    const z = Q[m * 3],
      C = Q[m * 3 + 2],
      B = Math.max(Math.abs(z), Math.abs(C)) < tt / 2 - 30,
      T = r.H(z, C);
    ((Q[m * 3 + 1] = B ? T - 30 : T),
      et.copy(D).lerp(S, Ot(s.n2(z * 0.003, C * 0.003) + 0.5, 0, 1)),
      (nt[m * 3] = et.r),
      (nt[m * 3 + 1] = et.g),
      (nt[m * 3 + 2] = et.b));
  }
  K.computeVertexNormals();
  const gt = {
      position: Q,
      normal: K.attributes.normal.array,
      color: nt,
      glow: new Float32Array(Q.length),
      index: new Uint32Array(K.index.array),
      radius: 6400,
    },
    Y = {
      a: [],
      b: [],
      c: [],
      pod: [],
      tru: [],
      fern: [],
      leaf: [],
      shroom: [],
      grass: [],
      vine: [],
      tend: [],
    },
    ot = [],
    te = [],
    Me = [],
    qe = k("#ffffff"),
    be = () => new xe().setHSL(0, 0, 0.82 + i() * 0.36),
    hs = [],
    Us = [],
    qs = [],
    cs = [];
  for (let m = 0; m < 10; m++) {
    const z = Mn(s, m * 13.7 + (f % 97), e.isleDetail);
    cs.push({ isle: z, idx: d(z.geo) });
  }
  const Ut = [];
  function Ve(m, z, C, B, T, U, O, E) {
    let I = 0;
    for (; B > 0 && I++ < 4e3;) {
      const G = i() * W,
        q = Math.sqrt(i()) * C,
        X = m + Math.cos(G) * q,
        at = z + Math.sin(G) * q,
        lt = St(O, E, Math.pow(i(), 1.8)),
        J = r.surface(X, at) + St(T, U, i()) + lt;
      if (Math.hypot(X, at) > sn - 60) continue;
      const dt = new N(X, J, at);
      Ut.some((kt) => kt.c.distanceTo(dt) < (kt.R + lt) * 1.25 + 12) ||
        (Ut.push({ c: dt, R: lt, v: cs[(i() * cs.length) | 0], ry: i() * W }),
        B--);
    }
  }
  (Ve(o.x, o.z, 420, 38, 90, 380, 16, 82),
    Ve(h.x, h.z, 380, 9, 200, 380, 10, 40),
    Ve(c.x, c.z, 260, 6, 120, 260, 14, 46),
    Ve(l.x, l.z, 520, 5, 260, 380, 12, 36));
  const we = new Rt(),
    ls = new oe(),
    us = new Ne(),
    Ye = new N();
  for (const m of Ut) {
    (y.push({
      geo: m.v.idx,
      mat: "rock",
      pos: Mt(m.c),
      rotY: m.ry,
      scale: m.R,
    }),
      g.push({
        t: "s",
        x: m.c.x,
        y: m.c.y - m.R * 0.45,
        z: m.c.z,
        r: m.R * 1.05,
        top: 0,
      }),
      we.compose(m.c, ls.setFromEuler(us.set(0, m.ry, 0)), Ye.setScalar(m.R)));
    const z = m.v.isle.tops,
      C = m.v.isle.rims,
      B = () => {
        const T = (((i() * z.length) / 3) | 0) * 3;
        return new N(z[T], z[T + 1], z[T + 2]).applyMatrix4(we);
      };
    if (z.length) {
      const T = Math.round(m.R * 0.35);
      for (let U = 0; U < T; U++) {
        const O = B(),
          E = i();
        E < 0.45
          ? Y.c.push({ p: O, s: 0.4 + i() * 0.5, ry: i() * W, c: be() })
          : E < 0.6
            ? Y.a.push({ p: O, s: 0.3 + i() * 0.25, ry: i() * W, c: be() })
            : E < 0.8
              ? Y.leaf.push({ p: O, s: 1 + i(), ry: i() * W })
              : Y.pod.push({ p: O, s: 1 + i() * 0.6, ry: i() * W });
      }
      for (let U = 0; U < m.R * 1.1 * e.grass; U++)
        Y.grass.push({ p: B(), s: 1 + i() * 0.6, ry: i() * W });
    }
    if (C.length) {
      const T = () => {
          const O = (((i() * C.length) / 5) | 0) * 5,
            E = new N(C[O], C[O + 1], C[O + 2]).applyMatrix4(we),
            I = new N(C[O + 3], 0, C[O + 4]).applyAxisAngle(
              new N(0, 1, 0),
              m.ry,
            );
          return { p: E, n: I };
        },
        U = Math.round(m.R * 0.7 * (0.5 + e.density * 0.5));
      for (let O = 0; O < U; O++)
        Y.vine.push({
          p: T().p,
          s: new N(1, St(6, 32, i()) * (m.R / 50 + 0.4), 1),
          ry: i() * W,
        });
      if (m.R > 34 && i() < 0.55) {
        const { p: O, n: E } = T(),
          I = m.R * 0.16 + 3,
          G = m.R * 2.4 + 60,
          q = 30,
          X = Math.atan2(E.x, E.z),
          at = hs.length / 3,
          lt = O.clone().addScaledVector(E, -1.5);
        for (let J = 0; J <= q; J++) {
          const dt = J / q;
          for (const kt of [-0.5, 0.5]) {
            const ys = new N(
              kt * I,
              -dt * G,
              7 * (1 - Math.exp(-dt * 9)) + dt * 6,
            )
              .applyAxisAngle(new N(0, 1, 0), X)
              .add(lt);
            (hs.push(ys.x, ys.y, ys.z), Us.push(kt + 0.5, 1 - dt));
          }
          if (J < q) {
            const kt = at + J * 2;
            qs.push(kt, kt + 2, kt + 1, kt + 1, kt + 2, kt + 3);
          }
        }
        for (let J = 0; J < 10; J++)
          Me.push({
            p: new N(
              O.x + E.x * 12 + (i() - 0.5) * 30,
              O.y - G * (0.55 + i() * 0.4),
              O.z + E.z * 12 + (i() - 0.5) * 30,
            ),
            s: 60 + i() * 90,
            c: qe,
          });
      }
    }
    for (let T = 0; T < 3; T++)
      Me.push({
        p: m.c
          .clone()
          .add(
            new N(
              (i() - 0.5) * m.R * 2,
              -m.R * (1 + i() * 1.5),
              (i() - 0.5) * m.R * 2,
            ),
          ),
        s: m.R * 3 + i() * 80,
        c: qe,
      });
  }
  const ps = [];
  for (let m = 0, z = 0; m < 22 && z < 500; z++) {
    const C = i() * W,
      B = Math.sqrt(i()) * 430,
      T = o.x + Math.cos(C) * B,
      U = o.z + Math.sin(C) * B,
      O = 110 + i() * 230,
      E = 12 + i() * 22;
    if (
      g.some(
        (q) => q.t === "c" && Math.hypot(q.x - T, q.z - U) < q.r + E + 40,
      ) ||
      Ut.some(
        (q) =>
          Math.hypot(q.c.x - T, q.c.z - U) < q.R + E + 10 &&
          q.c.y - q.R * 2.2 < r.groundY(T, U) + O,
      )
    )
      continue;
    const I = r.groundY(T, U);
    if (I < bt - 4) continue;
    (y.push({
      geo: d(bn(s, O, E, i() * 99)),
      mat: "rock",
      pos: [T, I - 6, U],
      rotY: 0,
      scale: 1,
    }),
      g.push({ t: "c", x: T, y: I, z: U, r: E * 1.4, top: I + O }),
      ps.push({ x: T, z: U, r: E }));
    const G = new N(T, I - 6 + O * 0.985, U);
    for (let q = 0; q < 4; q++)
      Y.c.push({
        p: G.clone().add(new N((i() - 0.5) * E, 0, (i() - 0.5) * E)),
        s: 0.4 + i() * 0.4,
        ry: i() * W,
      });
    for (let q = 0; q < 10; q++) {
      const X = i() * W;
      Y.vine.push({
        p: new N(
          T + Math.cos(X) * E * 0.95,
          I + O * 0.93,
          U + Math.sin(X) * E * 0.95,
        ),
        s: new N(1, 8 + i() * 30, 1),
      });
    }
    m++;
  }
  const ze = [];
  for (let m = 0; m < 2; m++) {
    const z = m ? 46 : 72,
      C = m ? 8 : 11;
    let B = 0,
      T = 0,
      U = !1;
    for (let I = 0; I < 60 && !U; I++) {
      const G = i() * W,
        q = 120 + i() * 220;
      ((B = o.x + Math.cos(G) * q),
        (T = o.z + Math.sin(G) * q),
        (U = !g.some((X) =>
          X.t === "c"
            ? Math.hypot(X.x - B, X.z - T) < X.r + z + 30
            : Math.hypot(X.x - B, X.z - T) < X.r + z + 20 &&
              X.y - X.r < r.surface(B, T) + z * 1.6,
        )));
    }
    const O = i() * Math.PI,
      E = new N(B, r.surface(B, T) - C * 0.6, T);
    y.push({
      geo: d(wn(s, z, C, i() * 50)),
      mat: "rock",
      pos: Mt(E),
      rotY: O,
      scale: 1,
    });
    for (let I = 0; I <= 8; I++) {
      const G = (I / 8) * Math.PI,
        q = new N(Math.cos(G) * z, Math.sin(G) * z, 0)
          .applyAxisAngle(new N(0, 1, 0), O)
          .add(E);
      if (
        (g.push({ t: "s", x: q.x, y: q.y, z: q.z, r: C * 1.7, top: 0 }),
        I > 1 && I < 7)
      )
        for (let X = 0; X < 6; X++)
          Y.vine.push({
            p: q.clone().add(new N((i() - 0.5) * 6, -C * 0.8, (i() - 0.5) * 6)),
            s: new N(1, 6 + i() * 22, 1),
          });
    }
    ze.push({
      c: E.clone().add(new N(0, z * 0.45, 0)),
      ax: new N(0, 0, 1).applyAxisAngle(new N(0, 1, 0), O),
      base: E,
      R: z,
      tube: C,
    });
  }
  const zt = l.x,
    At = l.z,
    Lt = r.groundY(zt, At);
  y.push({ geo: d(gn(n)), mat: "elder", pos: [zt, Lt, At], rotY: 0, scale: 1 });
  const mi = Math.round(2600 * (0.4 + e.density * 0.6));
  for (let m = 0; m < mi; m++) {
    const z = i() * W,
      C = 12 + Math.sqrt(i()) * 102,
      B = Lt + 140 + Math.cos((C / 100) * 1.4) * 36 - 6,
      T = 18 + i() * i() * 80,
      U = new N(zt + Math.cos(z) * C, B, At + Math.sin(z) * C);
    (Y.tend.push({ p: U, s: new N(1, T, 1), ry: i() * W }),
      m % 4 === 0 &&
        te.push({
          p: U.clone().add(new N(0, -T, 0)),
          s: 5 + i() * 4,
          c: i() < 0.5 ? k("#7a6bff") : k("#4ff6ff"),
        }));
  }
  for (let m = 0; m < 500; m++) {
    const z = i() * W,
      C = i() * 190;
    ot.push({
      p: new N(zt + Math.cos(z) * C, Lt + 10 + i() * 170, At + Math.sin(z) * C),
      s: 1.6 + i() * 1.8,
      c: k("#e8fbff"),
    });
  }
  g.push(
    { t: "s", x: zt, y: Lt + 175, z: At, r: 120, top: 0 },
    { t: "c", x: zt, y: Lt, z: At, r: 42, top: Lt + 150 },
  );
  const ut = e.seg + 1,
    ee = tt / e.seg,
    Ae = new Float32Array(ut * ut);
  {
    const m = [
        [1, 0],
        [0.707, 0.707],
        [0, 1],
        [-0.707, 0.707],
        [-1, 0],
        [-0.707, -0.707],
        [0, -1],
        [0.707, -0.707],
      ],
      z = [2, 5, 11];
    for (let B = 0; B < ut; B++)
      for (let T = 0; T < ut; T++) {
        const U = M[B * ut + T];
        let O = 0;
        for (const [E, I] of m) {
          let G = 0;
          for (const q of z) {
            const X = Math.min(ut - 1, Math.max(0, Math.round(T + E * q))),
              at = Math.min(ut - 1, Math.max(0, Math.round(B + I * q))),
              lt = Math.max(M[at * ut + X], bt) - U;
            lt > 0 && (G = Math.max(G, lt / Math.hypot(lt, q * ee)));
          }
          O += G;
        }
        Ae[B * ut + T] = 1 - Math.min(0.72, (O / 8) * 1.15);
      }
    const C = (B, T, U, O) => {
      const E = Math.max(0, Math.floor((B - U + tt / 2) / ee)),
        I = Math.min(ut - 1, Math.ceil((B + U + tt / 2) / ee)),
        G = Math.max(0, Math.floor((T - U + tt / 2) / ee)),
        q = Math.min(ut - 1, Math.ceil((T + U + tt / 2) / ee));
      for (let X = G; X <= q; X++)
        for (let at = E; at <= I; at++) {
          const lt = Math.hypot(-tt / 2 + at * ee - B, -tt / 2 + X * ee - T);
          lt < U && (Ae[X * ut + at] *= 1 - O(lt, M[X * ut + at]));
        }
    };
    for (const B of Ut) {
      const T = B.R * 1.7;
      C(
        B.c.x,
        B.c.z,
        T,
        (U, O) =>
          (1 - H(U / T)) * Ot(1.25 - (B.c.y - O) / (B.R * 7), 0, 1) * 0.5,
      );
    }
    for (const B of ps)
      C(B.x, B.z, B.r * 2.6, (T) => (1 - H(T / (B.r * 2.6))) * 0.38);
    C(zt, At, 140, (B) => (1 - H(B / 140)) * 0.5);
  }
  const _e = new Float32Array(ut * ut * 4);
  for (let m = 0; m < ut * ut; m++) {
    const z = x[m * 3],
      C = x[m * 3 + 1],
      B = x[m * 3 + 2],
      T = A[m * 3 + 1];
    for (let G = 0; G < 3; G++) _[m * 3 + G] *= 0.35 + 0.65 * Ae[m];
    const U = r.forestMask(z, B),
      O = r.plainsMask(z, B),
      E = r.lakeMask(z, B);
    let I =
      (C > bt + 0.8 ? 1 : 0) * H((T - 0.78) / 0.12) * (1 - H((C - 170) / 60));
    ((I *= Ot(0.62 + O * 0.38 + E * 0.2 - U * 0.18, 0, 1)),
      (I *= 0.45 + 0.55 * H((s.n2(z * 0.018, B * 0.018) + 0.25) / 0.5)),
      Math.hypot(z - zt, B - At) < 60 && (I *= 0.4),
      (_e[m * 4] = C),
      (_e[m * 4 + 1] = I),
      (_e[m * 4 + 2] = U),
      (_e[m * 4 + 3] = Ae[m]));
  }
  const fs = e.density;
  function Et(m, z, C, B = 0) {
    const T = [];
    m = Math.round(m * fs);
    for (let U = 0; U < z && T.length < m; U++) {
      const O = (i() * 2 - 1) * 1150,
        E = (i() * 2 - 1) * 1150;
      if (i() > C(O, E)) continue;
      const I = r.groundY(O, E);
      I < bt + 0.6 ||
        I > 200 ||
        r.slopeAt(O, E) > 0.75 ||
        (B && Math.hypot(O - zt, E - At) < B) ||
        g.some(
          (G) => G.t === "c" && Math.hypot(G.x - O, G.z - E) < G.r * 0.8,
        ) ||
        T.push(new N(O, I - 0.25, E));
    }
    return T;
  }
  const Nt = (m, z) => r.forestMask(m, z),
    Ge = (m, z) => r.plainsMask(m, z),
    Gt = (m, z) => r.lakeMask(m, z);
  (Et(520, 6e4, (m, z) => Nt(m, z) * 0.85, 95).forEach((m) =>
    Y.a.push({ p: m.setY(m.y - 1), s: 0.7 + i() * 0.7, ry: i() * W, c: be() }),
  ),
    Et(
      130,
      4e4,
      (m, z) => Ge(m, z) * 0.35 + Gt(m, z) * 0.12 + Nt(m, z) * 0.05,
      95,
    ).forEach((m) =>
      Y.b.push({
        p: m.setY(m.y - 1),
        s: 0.75 + i() * 0.6,
        ry: i() * W,
        c: be(),
      }),
    ),
    Et(520, 6e4, (m, z) => Nt(m, z) * 0.5 + Gt(m, z) * 0.6 + 0.04, 60).forEach(
      (m) => Y.c.push({ p: m, s: 0.7 + i() * 0.8, ry: i() * W, c: be() }),
    ),
    Et(2600, 9e4, (m, z) => Nt(m, z) * 0.7 + Gt(m, z) * 0.8 + 0.03).forEach(
      (m) => {
        (Y.pod.push({ p: m, s: 0.8 + i() * 0.9, ry: i() * W }),
          i() < 0.5 &&
            te.push({
              p: m.clone().add(new N(0, 1.6, 0)),
              s: 7 + i() * 5,
              c: k("#33e8ff"),
            }));
      },
    ),
    Et(900, 6e4, (m, z) => Nt(m, z) * 0.5 + Gt(m, z) * 0.9 + 0.03).forEach(
      (m) => {
        (Y.tru.push({ p: m, s: 0.8 + i() * 0.8, ry: i() * W }),
          i() < 0.4 &&
            te.push({
              p: m.clone().add(new N(0, 2.4, 0)),
              s: 5,
              c: k("#ff4fd0"),
            }));
      },
    ),
    Et(700, 4e4, (m, z) => Nt(m, z) * 0.6 + 0.05).forEach((m) =>
      Y.fern.push({ p: m, s: 1 + i() * 0.9, ry: i() * W }),
    ),
    Et(4500, 9e4, (m, z) => Nt(m, z) * 0.9 + Gt(m, z) * 0.5 + 0.08).forEach(
      (m) => Y.leaf.push({ p: m, s: 0.8 + i() * 1.2, ry: i() * W }),
    ),
    Et(1400, 6e4, (m, z) => Nt(m, z) * 0.6 + 0.03).forEach((m) =>
      Y.shroom.push({ p: m, s: 0.9 + i() * 1.2, ry: i() * W }),
    ),
    (Y.boulder = []),
    Et(
      900,
      6e4,
      (m, z) =>
        H(1 - Math.hypot(m - o.x, z - o.z) / 480) * 0.8 +
        Gt(m, z) * 0.25 +
        Ge(m, z) * 0.08 +
        0.03,
    ).forEach((m) =>
      Y.boulder.push({
        p: m.setY(m.y - 0.4),
        s: 1.2 + i() * i() * 4.5,
        ry: i() * W,
      }),
    ),
    Et(
      (15e3 * e.grass) / fs,
      12e4,
      (m, z) => Ge(m, z) * 0.95 + Gt(m, z) * 0.4 + (1 - Nt(m, z)) * 0.25,
    ).forEach((m) => Y.grass.push({ p: m, s: 0.8 + i() * 0.8, ry: i() * W })),
    Et(
      5200,
      6e4,
      (m, z) => Nt(m, z) * 0.7 + Ge(m, z) * 0.6 + Gt(m, z) * 0.7 + 0.05,
    ).forEach((m) => {
      const z = i();
      ot.push({
        p: m.clone().add(new N(0, 1 + i() * 22, 0)),
        s: 1 + i() * 1.6,
        c:
          z < 0.5
            ? k("#4dffe0")
            : z < 0.8
              ? k("#9dff6a")
              : z < 0.9
                ? k("#ff6ad8")
                : k("#ffd36a"),
      });
    }));
  for (let m = 0; m < 260 * (0.5 + fs * 0.5); m++) {
    const z = i() * W,
      C = Math.sqrt(i()) * 450,
      B = o.x + Math.cos(z) * C,
      T = o.z + Math.sin(z) * C;
    Me.push({
      p: new N(B, r.surface(B, T) + 20 + i() * 90, T),
      s: 120 + i() * 160,
      c: qe,
    });
  }
  for (let m = 0; m < 90; m++) {
    const z = i() * W,
      C = Math.sqrt(i()) * 300;
    Me.push({
      p: new N(c.x + Math.cos(z) * C, bt + 8 + i() * 20, c.z + Math.sin(z) * C),
      s: 90 + i() * 100,
      c: qe,
    });
  }
  function Ct(m, z, C, B, T, U = !1) {
    if (!C.length) return;
    const O = d(m),
      E = new Map();
    for (const I of C) {
      const G = Math.floor(I.p.x / B) + "," + Math.floor(I.p.z / B);
      let q = E.get(G);
      (q || E.set(G, (q = [])), q.push(I));
    }
    for (const I of E.values()) {
      const G = new Float32Array(I.length * 16),
        X = I.some((J) => J.c) ? new Float32Array(I.length * 3).fill(1) : null,
        at = new N();
      (I.forEach((J, dt) => {
        (us.set(0, J.ry || 0, 0),
          ls.setFromEuler(us),
          typeof J.s == "number" ? Ye.setScalar(J.s) : Ye.copy(J.s),
          we.compose(J.p, ls, Ye),
          we.toArray(G, dt * 16),
          X && J.c && J.c.toArray(X, dt * 3),
          at.add(J.p));
      }),
        at.divideScalar(I.length));
      let lt = 0;
      for (const J of I) {
        const dt = typeof J.s == "number" ? J.s : Math.max(J.s.x, J.s.y, J.s.z);
        lt = Math.max(lt, J.p.distanceTo(at) + m.radius * dt);
      }
      b.push({
        geo: O,
        mat: z,
        matrices: G,
        colors: X,
        center: Mt(at),
        radius: lt,
        maxDist: T,
        grass: U,
      });
    }
  }
  const ms = (m, z, C) => m.filter((B, T) => T % C === z);
  for (let m = 0; m < 3; m++) Ct(dn(n), "tree", ms(Y.a, m, 3), 500, 2600);
  for (let m = 0; m < 2; m++) Ct(yn(n), "tree", ms(Y.b, m, 2), 500, 2600);
  for (let m = 0; m < 2; m++) Ct(xn(n), "tree", ms(Y.c, m, 2), 500, 2e3);
  (Ct(on(n), "flora", Y.pod, 250, 620),
    Ct(an(n), "flora", Y.tru, 250, 620),
    Ct(hn(n), "flora", Y.fern, 250, 460),
    Ct(cn(n), "flora", Y.leaf, 250, 560),
    Ct(ln(n), "flora", Y.shroom, 250, 460),
    Ct(pn(n), "rock", Y.boulder, 400, 1200),
    Ct(un(n), "grass", Y.grass, 250, 480, !0),
    Ct(fn(), "vine", Y.vine, 600, 2400),
    Ct(mn(), "tendril", Y.tend, 600, 3e3));
  const Wt = (m, z, C) => new N(m, r.surface(m, z) + C, z),
    We = Ut.filter((m) => Math.hypot(m.c.x - o.x, m.c.z - o.z) < 460),
    Vs = [];
  for (let m = 0; m < 14 && We.length > 1; m++) {
    const z = We[(i() * We.length) | 0];
    let C = null,
      B = 1e9;
    for (const T of We) {
      const U = T.c.distanceTo(z.c);
      T !== z && U < B && ((B = U), (C = T));
    }
    C &&
      Vs.push(
        z.c
          .clone()
          .lerp(C.c, 0.5)
          .add(new N(0, -Math.min(z.R, C.R) * 0.3, 0)),
      );
  }
  const ve = (m, z) =>
      m.y > r.surface(m.x, m.z) + 25 &&
      !g.some((C) =>
        C.t === "s"
          ? Math.hypot(m.x - C.x, m.y - C.y, m.z - C.z) < C.r + z
          : m.y < C.top + z && Math.hypot(m.x - C.x, m.z - C.z) < C.r + z,
      ),
    Ys = Vs.filter((m) => ve(m, 18)),
    Fe = [];
  for (const m of ze)
    Fe.push(
      m.c.clone().addScaledVector(m.ax, -90),
      m.c.clone(),
      m.c.clone().addScaledVector(m.ax, 90),
    );
  (Fe.push(...Ys.slice(0, 8)), Fe.length || Fe.push(Wt(o.x, o.z, 190)));
  const ds = [
    {
      name: "Hanging Peaks",
      sub: "Floating mountains spilling waterfalls into the mist",
      c: Mt(Wt(o.x, o.z, 190)),
      wps: Fe.map(Mt),
    },
    {
      name: "Elder Tree",
      sub: "A 200 m tree that glows from within",
      c: [zt, Lt + 110, At],
      wps: Array.from({ length: 8 }, (m, z) => {
        const C = (z / 8) * W;
        return [
          zt + Math.cos(C) * 175,
          Lt + 70 + (z % 2) * 60,
          At + Math.sin(C) * 175,
        ];
      }).concat([[zt, Lt + 270, At]]),
    },
    {
      name: "Lumen Forest",
      sub: "Rainforest floor that lights up under every wingbeat",
      c: Mt(Wt(p.x, p.z, 70)),
      wps: Array.from({ length: 7 }, () => {
        const m = i() * W,
          z = i() * 320;
        return Mt(
          Wt(p.x + Math.cos(m) * z, p.z + Math.sin(m) * z, 62 + i() * 25),
        );
      }),
    },
    {
      name: "Amber Plains",
      sub: "Open meadows under drifting islands",
      c: Mt(Wt(h.x, h.z, 40)),
      wps: Array.from({ length: 7 }, (m, z) => {
        const C = i() * W,
          B = i() * 330;
        return Mt(
          Wt(h.x + Math.cos(C) * B, h.z + Math.sin(C) * B, z < 5 ? 14 : 150),
        );
      }),
    },
    {
      name: "Mirror Lake",
      sub: "Still water under a banded gas giant",
      c: [c.x, bt + 40, c.z],
      wps: Array.from({ length: 6 }, (m, z) => {
        const C = (z / 6) * W;
        return [
          c.x + Math.cos(C) * 190,
          bt + (z % 2 ? 12 : 45),
          c.z + Math.sin(C) * 190,
        ];
      }),
    },
  ];
  for (const m of ds)
    for (const z of m.wps) {
      const C = new N(...z);
      for (let B = 0; B < 12 && !ve(C, 10); B++) C.y += 15;
      ((z[0] = C.x), (z[1] = C.y), (z[2] = C.z));
    }
  const Gs = [];
  {
    const m = ze.map((E) => ({
      pts: [
        E.c.clone().addScaledVector(E.ax, -70),
        E.c.clone(),
        E.c.clone().addScaledVector(E.ax, 70),
      ],
      c: E.c.clone(),
    }));
    for (const E of Ys)
      m.length < 9 &&
        m.every((I) => I.c.distanceTo(E) > 90) &&
        m.push({ pts: [E], c: E });
    for (let E = 0; m.length < 7 && E < 200; E++) {
      const I = i() * W,
        G = 80 + i() * 340,
        q = Wt(o.x + Math.cos(I) * G, o.z + Math.sin(I) * G, 40 + i() * 120);
      ve(q, 25) &&
        m.every((X) => X.c.distanceTo(q) > 110) &&
        m.push({ pts: [q], c: q });
    }
    const z = new N(
        o.x,
        m.reduce((E, I) => E + I.c.y, 0) / Math.max(1, m.length),
        o.z,
      ),
      C = [];
    let B = m.slice().sort((E, I) => I.c.distanceTo(z) - E.c.distanceTo(z))[0];
    const T = new Set(m);
    let U = null;
    for (; B;) {
      T.delete(B);
      let E = B.pts;
      (U &&
        E.length > 1 &&
        E[E.length - 1].distanceTo(U) < E[0].distanceTo(U) &&
        (E = E.slice().reverse()),
        C.push({ pts: E, c: B.c }),
        (U = E[E.length - 1]));
      let I,
        G = 1e9;
      for (const q of T) {
        const X = q.c.distanceTo(U);
        X < G && ((G = X), (I = q));
      }
      B = I;
    }
    const O = C.flatMap((E) => E.pts);
    O.forEach((E, I) => {
      const G = O[Math.max(0, I - 1)],
        X = O[Math.min(O.length - 1, I + 1)].clone().sub(G).normalize();
      Gs.push({ p: Mt(E), n: Mt(X) });
    });
  }
  const ae = [];
  for (const m of ds)
    for (const z of m.wps)
      for (let C = 0; C < 2; C++) {
        const B = new N(
          z[0] + (i() - 0.5) * 120,
          z[1] + (i() - 0.5) * 50,
          z[2] + (i() - 0.5) * 120,
        );
        ((B.y = Math.max(B.y, r.surface(B.x, B.z) + 14)),
          ve(B, 8) && ae.push(Mt(B)));
      }
  for (let m = 0; ae.length < 60 && m < 400; m++) {
    const z = i() * W,
      C = Math.sqrt(i()) * 950,
      B = Wt(Math.cos(z) * C, Math.sin(z) * C, 18 + i() * 160);
    ve(B, 8) && ae.push(Mt(B));
  }
  ae.length = Math.min(ae.length, 60);
  const di = [
      [o.x, r.surface(o.x, o.z) + 260, o.z, 220],
      [h.x, r.surface(h.x, h.z) + 120, h.z, 180],
    ],
    yi = { ff: Rs(ot, i), halo: Rs(te, i), mist: Rs(Me, i) },
    xi = Object.values(Y).reduce((m, z) => m + z.length, 0),
    gi = vn(r, Ae, ut, Ut, ps, ze, { x: zt, z: At });
  return {
    seed: f,
    quality: t,
    seg: e.seg,
    regions: a,
    heights: M,
    terrain: mt,
    outer: gt,
    geos: u,
    meshes: y,
    chunks: b,
    falls: {
      position: new Float32Array(hs),
      uv: new Float32Array(Us),
      index: new Uint32Array(qs),
    },
    points: yi,
    obstacles: g,
    places: ds,
    rings: Gs,
    seeds: ae,
    flocks: di,
    stats: { isles: Ut.length, plants: xi },
    field: _e,
    map: gi,
    isles: Ut.map((m) => [m.c.x, m.c.y, m.c.z, m.R]),
    arches: ze.map((m) => ({ c: Mt(m.c), ax: Mt(m.ax), R: m.R, tube: m.tube })),
    elder: [zt, Lt, At],
  };
}
