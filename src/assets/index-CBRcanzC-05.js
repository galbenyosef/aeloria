// assets/index-CBRcanzC 05 — math
// Lines 1115-1447 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
function randomMountPalette(t, e) {
  const s = t(),
    i = (
      placeSyllables[(t() * 16) | 0] +
      placeSyllables[(t() * 16) | 0] +
      (t() < 0.5 ? placeSyllables[(t() * 16) | 0] : "")
    ).replace(/^./, (n) => n.toUpperCase()),
    a = (n, r, o) =>
      "#" + new W().setHSL(((n % 1) + 1) % 1, r, o).getHexString();
  return {
    id: `wild-${e}-${i.toLowerCase()}`,
    name: i,
    a: a(s, 0.65, 0.35),
    b: a(s + 0.35 + t() * 0.3, 0.85, 0.55),
    belly: a(s + 0.05, 0.4, 0.82),
    glow: a(s + 0.5, 1, 0.65),
  };
}
const paletteGradientCss = (t) =>
    `linear-gradient(135deg,${t.a} 0 45%,${t.b} 45% 70%,${t.glow} 70%)`,
  avatarNoise = createSeededNoise(42);
function buildRibbon(t, e, s, i, a, n) {
  const r = [],
    o = [],
    l = (v, d) => t(v).lerp(e(v), d);
  for (let v = 0; v < s; v++)
    for (let d = 0; d < i; d++) {
      const p = v / s,
        x = (v + 1) / s,
        y = d / i,
        g = (d + 1) / i,
        S = l(p, y),
        w = l(x, y),
        M = l(x, g),
        T = l(p, g);
      (r.push(
        S.x,
        S.y,
        S.z,
        w.x,
        w.y,
        w.z,
        M.x,
        M.y,
        M.z,
        S.x,
        S.y,
        S.z,
        M.x,
        M.y,
        M.z,
        T.x,
        T.y,
        T.z,
      ),
        o.push(p, y, x, y, x, g, p, y, x, g, p, g));
    }
  const c = new ae();
  (c.setAttribute("position", new Float32BufferAttribute(r, 3)), c.computeVertexNormals());
  const f = r.length / 3,
    h = new Float32Array(f * 3),
    m = new Float32Array(f * 3);
  for (let v = 0; v < f; v++) {
    const d = a(o[v * 2], o[v * 2 + 1]),
      p = n(o[v * 2], o[v * 2 + 1]);
    ((h[v * 3] = d.r),
      (h[v * 3 + 1] = d.g),
      (h[v * 3 + 2] = d.b),
      (m[v * 3] = p.r),
      (m[v * 3 + 1] = p.g),
      (m[v * 3 + 2] = p.b));
  }
  return {
    P: new Float32Array(r),
    N: Float32Array.from(c.attributes.normal.array),
    C: h,
    G: m,
  };
}
function mergePaintedParts(t) {
  const e = mergePartsData(t),
    s = new ae();
  return (
    s.setAttribute("position", new D(e.position, 3)),
    s.setAttribute("normal", new D(e.normal, 3)),
    s.setAttribute("color", new D(e.color, 3)),
    s.setAttribute("aGlow", new D(e.glow, 3)),
    s
  );
}
const mountBodyMaterial = createBioMaterial({ roughness: 0.48, side: le }, { base: 0.7, k: 0.8 }),
  mountWingMaterial = createBioMaterial({ roughness: 0.62, side: le }, { base: 0.7, k: 0.8, backlit: 0.85 }),
  glowMaterial = createBioMaterial({ roughness: 0.55 }, { base: 0.25, k: 0.9 });
function tubeFromCurve(t, e, s, i, a, n = 1) {
  const r = t.computeFrenetFrames(e, !1),
    o = [],
    l = [];
  for (let f = 0; f <= e; f++) {
    const h = f / e,
      m = t.getPointAt(h),
      v = lerp(s, i, h),
      d = r.normals[f],
      p = r.binormals[f];
    for (let x = 0; x <= a; x++) {
      const y = (x / a) * Math.PI * 2,
        g = Math.cos(y) * v,
        S = Math.sin(y) * v * n;
      o.push(
        m.x + d.x * g + p.x * S,
        m.y + d.y * g + p.y * S,
        m.z + d.z * g + p.z * S,
      );
    }
  }
  for (let f = 0; f < e; f++)
    for (let h = 0; h < a; h++) {
      const m = f * (a + 1) + h,
        v = m + a + 1;
      l.push(m, v, m + 1, v, v + 1, m + 1);
    }
  const c = new ae();
  return (
    c.setAttribute("position", new Float32BufferAttribute(o, 3)),
    c.setIndex(l),
    c.computeVertexNormals(),
    c
  );
}
function buildMountBody(t) {
  const e = createColor(t.a),
    s = createColor(t.b),
    i = createColor(t.belly),
    a = createColor(t.glow),
    n = new Group(),
    r = [],
    o = (w, M, T, E, z) =>
      z < -0.3
        ? i
        : Math.sin(T * 3.4 + Math.abs(w) * 3.2) > 0.3
          ? s
          : Math.sin(T * 9 + w * 4) > 0.85
            ? s.clone().lerp(e, 0.5)
            : e,
    l = [];
  for (let w = 0; w <= 28; w++) {
    const M = w / 28;
    l.push([
      0.06 +
        0.95 *
          Math.pow(Math.sin(Math.PI * Math.pow(M, 0.8)), 0.9) *
          (1 + 0.08 * Math.sin(M * 9)),
      lerp(-3.4, 3, M),
    ]);
  }
  const c = latheProfile(l, 20);
  (c.rotateX(Math.PI / 2),
    c.scale(0.85, 0.72, 1),
    r.push(
      paintGeometry(c, o, (w, M, T, E, z) =>
        z > 0.62 && (((T * 1.6) % 1) + 1) % 1 < 0.2
          ? a.clone().multiplyScalar(1.1)
          : noGlow,
      ),
    ));
  const f = new CatmullRomCurve3([
    new H(0, 0.05, 2.3),
    new H(0, 0.6, 3.7),
    new H(0, 0.95, 4.7),
    new H(0, 0.98, 5.6),
  ]);
  r.push(paintGeometry(tubeFromCurve(f, 20, 0.62, 0.36, 12, 0.85), o));
  const h = [];
  for (let w = 0; w <= 16; w++) {
    const M = w / 16;
    h.push([
      0.52 * Math.sin(Math.PI * (0.28 + 0.72 * M)) * (1 - M * 0.2),
      M * 2.6,
    ]);
  }
  const m = latheProfile(h, 16);
  (m.rotateX(Math.PI / 2),
    m.scale(0.85, 0.62, 1),
    m.rotateX(0.18),
    m.translate(0, 0.98, 5.3),
    r.push(paintGeometry(m, o)));
  const v = latheProfile(
    h.map(([w, M]) => [w * 0.7, M * 0.85]),
    12,
  );
  (v.rotateX(Math.PI / 2),
    v.scale(0.75, 0.4, 1),
    v.rotateX(0.32),
    v.translate(0, 0.72, 5.45),
    r.push(paintGeometry(v, i)));
  const d = new ShapeGeometry(
    new Shape([
      new I(0, 0),
      new I(0.6, 1.5),
      new I(1.6, 1.2),
      new I(2.9, 1.9),
      new I(3.6, 0.4),
      new I(1.8, 0),
    ]),
  );
  (d.rotateY(Math.PI / 2),
    d.translate(0, 1.1, 6.4),
    r.push(paintGeometry(d, s, (w, M) => a.clone().multiplyScalar(M > 2.1 ? 1.3 : 0.15))));
  for (let w = 0; w < 9; w++) {
    const M = 4.6 - w * 0.85,
      T = 0.55 - Math.abs(w - 3) * 0.05,
      E = w < 3 ? 0.95 - w * 0.15 : 0.62 - (w - 3) * 0.04,
      z = new ShapeGeometry(new Shape([new I(0, 0), new I(0.25, T), new I(0.7, 0)]));
    (z.rotateY(Math.PI / 2),
      z.translate(0, E, M),
      r.push(
        paintGeometry(z, s, (_, L) =>
          a.clone().multiplyScalar(L > E + T * 0.6 ? 1.4 : 0.1),
        ),
      ));
  }
  for (const w of [-1, 1]) {
    const M = new ShapeGeometry(new Shape([new I(0, 0), new I(1.3, 0.5), new I(1.6, -0.3)]));
    (M.rotateY(Math.PI / 2),
      M.rotateZ(w * 0.9),
      M.translate(w * 0.42, 0.9, 6.2),
      r.push(paintGeometry(M, s, a.clone().multiplyScalar(0.3))));
    const T = new SphereGeometry(0.12, 10, 8);
    (T.translate(w * 0.36, 1.05, 6.85),
      r.push(paintGeometry(T, createColor("#ffffff"), a.clone().multiplyScalar(2.6))));
    const E = new H(w * 0.45, -0.3, -1.2),
      z = new H(w * 0.62, -0.95, -1.75),
      _ = new H(w * 0.5, -1.05, -2.7);
    r.push(paintGeometry(capsuleBetween(E, z, 0.24, 0.15, 8), e), paintGeometry(capsuleBetween(z, _, 0.14, 0.09, 8), e));
    for (let L = -1; L <= 1; L++)
      r.push(
        paintGeometry(
          capsuleBetween(
            _,
            _.clone().add(new H(L * 0.12 * w, -0.12, -0.38)),
            0.05,
            0.01,
            5,
          ),
          createColor("#e8e0d0"),
        ),
      );
  }
  const p = new $(mergePaintedParts(r), mountBodyMaterial);
  ((p.castShadow = !0), n.add(p));
  const x = [],
    y = [];
  for (const w of [1, -1]) {
    const M = new Group();
    ((M.scale.x = w), M.position.set(0, 0.4, 1.1), n.add(M));
    const T = new Group();
    (T.position.set(0.6, 0, 0), M.add(T));
    const E = (V, ze) =>
        (Math.sin(V * 16) > 0.45 && ze > 0.2 ? s : e)
          .clone()
          .lerp(i, ze > 0.85 ? 0.4 : 0),
      z = (V) => new H(5 * V, 0.05 * Math.sin(Math.PI * V), 0.9 + 0.1 * V),
      _ = (V) => new H(5 * V, 0, -2.4 + 0.4 * V - 0.3 * Math.sin(Math.PI * V)),
      L = buildRibbon(z, _, 14, 6, E, (V, ze) =>
        ze > 0.9 ? a.clone().multiplyScalar(0.5) : noGlow,
      ),
      j = paintGeometry(tubeFromCurve(new CatmullRomCurve3([0, 0.5, 1].map(z)), 6, 0.17, 0.12, 8), e),
      C = paintGeometry(tubeFromCurve(new LineCurve3(new H(4.8, 0, 0.9), _(0.62)), 3, 0.07, 0.03, 5), e),
      K = new $(mergePaintedParts([L]), mountWingMaterial),
      ie = new $(mergePaintedParts([j, C]), mountBodyMaterial);
    ((K.castShadow = ie.castShadow = !0), T.add(K, ie));
    const he = new Group();
    (he.position.set(5, 0, 0), T.add(he));
    const Ee = (V) =>
        new H(6.8 * V, 0.12 * Math.sin(Math.PI * V), 1 - 2.4 * V * V),
      Te = (V) =>
        new H(6.8 * V, 0, lerp(-2, -1.4, V) - 0.6 * Math.sin(Math.PI * V)),
      De = buildRibbon(
        Ee,
        Te,
        18,
        6,
        (V, ze) => E(V + 1, ze),
        (V, ze) => (ze > 0.88 || V > 0.9 ? a.clone().multiplyScalar(0.85) : noGlow),
      ),
      N = paintGeometry(tubeFromCurve(new CatmullRomCurve3([0, 0.25, 0.5, 0.75, 1].map(Ee)), 12, 0.12, 0.03, 6), e),
      we = [0.3, 0.55, 0.8].map((V) =>
        paintGeometry(tubeFromCurve(new LineCurve3(new H(0.2, 0.02, 0.6), Te(V)), 3, 0.06, 0.02, 5), e),
      ),
      se = new $(mergePaintedParts([De]), mountWingMaterial),
      J = new $(mergePaintedParts([N, ...we]), mountBodyMaterial);
    ((se.castShadow = J.castShadow = !0), he.add(se, J));
    const Ue = new Object3D();
    (Ue.position.set(6.7, 0, -1.35),
      he.add(Ue),
      y.push(Ue),
      x.push({ inner: T, outer: he }));
  }
  const g = [];
  let S = n;
  for (let w = 0; w < 9; w++) {
    const M = new Group();
    (M.position.set(0, 0, w ? -0.72 : -3.2), S.add(M));
    const T = 0.34 * (1 - w / 10),
      E = new CylinderGeometry(T * 0.8, T, 0.76, 10, 1, !0);
    (E.rotateX(Math.PI / 2), E.translate(0, 0, -0.36));
    const z = [paintGeometry(E, o)];
    if (w === 8)
      for (const L of [1, -1])
        z.push(
          buildRibbon(
            (j) => new H(0, 0, -0.7 - j * 2.6),
            (j) =>
              new H(
                0,
                L * 1.35 * Math.sin(Math.PI * Math.pow(j, 0.8)),
                -0.7 - j * 2.6,
              ),
            8,
            3,
            () => s,
            (j, C) => a.clone().multiplyScalar(C > 0.6 ? 1.1 : 0.1),
          ),
        );
    const _ = new $(mergePaintedParts(z), w === 8 ? mountWingMaterial : mountBodyMaterial);
    ((_.castShadow = !0), M.add(_), g.push(M), (S = M));
  }
  return (
    n.traverse((w) => {
      w.isMesh && (w.frustumCulled = !1);
    }),
    { body: n, wings: x, tail: g, tips: y }
  );
}
