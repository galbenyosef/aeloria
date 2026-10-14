// assets/worker-BdHOuDMt 04 — math
// Lines 7730-7838 of readable/assets/worker-BdHOuDMt.pretty.js (statement-aligned).
function buildFrond(f, t, e, s) {
  const i = [];
  for (let o = 0; o <= 40; o++) {
    const l = o / 40;
    i.push([
      e *
        (1.3 - l * 0.4 + Math.exp(-l * 20) * 0.5) *
        (l > 0.94 ? Math.sqrt(Math.max(0, (1 - l) / 0.06)) : 1),
      l * t,
    ]);
  }
  const n = new ss(
      i.map(([o, l]) => new j(Math.max(o, 0.001), l)),
      28,
    ).toNonIndexed(),
    a = n.attributes.position.array,
    r = Float32Array.from(a);
  for (let o = 0; o < a.length; o += 3) {
    const l = a[o],
      h = a[o + 1],
      c = a[o + 2],
      p = Math.atan2(c, l),
      u =
        1 +
        f.n3(Math.cos(p) * 2 + s, (h / t) * 6, Math.sin(p) * 2) * 0.32 +
        f.n3(p * 4 + s, h * 0.08, 0) * 0.12;
    ((a[o] = l * u), (a[o + 2] = c * u));
  }
  return (
    smoothNormals(n, r),
    mergeParts([
      paintGeometry(
        n,
        (o, l, h, c, p) => {
          if (p > 0.5 || l > t * 0.95)
            return colorLerp(
              createColor("#2c5a2e"),
              createColor("#5a9a3e"),
              f.n3(o * 0.1, l * 0.1, h * 0.1) + 0.5,
            );
          const u = colorLerp(
            createColor("#56524c"),
            createColor("#827a6e"),
            f.n3(o * 0.2, l * 0.6, h * 0.2) + 0.5,
          );
          return f.n3(o * 0.05 + s, l * 0.08, h * 0.05) > 0.2
            ? u.lerp(createColor("#2f5a32"), 0.65)
            : u;
        },
        (o, l, h) =>
          createColor("#2fffd0").multiplyScalar(
            smoothstep((f.n3(o * 0.04, l * 0.05 + s, h * 0.04) + 0.05) / 0.3) * 0.9,
          ),
      ),
    ])
  );
}
function buildStoneArch(f, t, e, s) {
  const i = new Ds(t, e, 14, 80, Math.PI).toNonIndexed(),
    n = i.attributes.position.array,
    a = Float32Array.from(n);
  for (let r = 0; r < n.length; r += 3) {
    const o = n[r],
      l = n[r + 1],
      h = n[r + 2],
      c = Math.atan2(l, o),
      p = Math.cos(c) * t,
      u = Math.sin(c) * t,
      d =
        (1 + (1 - Math.sin(c)) * 0.9) *
        (1 + f.n3(o * 0.05 + s, l * 0.05, h * 0.05) * 0.5);
    ((n[r] = p + (o - p) * d),
      (n[r + 1] = u + (l - u) * d),
      (n[r + 2] = h * d));
  }
  return (
    smoothNormals(i, a),
    mergeParts([
      paintGeometry(
        i,
        (r, o, l, h, c) =>
          c > 0.45
            ? colorLerp(
                createColor("#2c5a2e"),
                createColor("#5a9a3e"),
                f.n3(r * 0.1, o * 0.1, l * 0.1) + 0.5,
              )
            : colorLerp(
                createColor("#56524c"),
                createColor("#7a7266"),
                f.n3(r * 0.1, o * 0.4, l * 0.1) + 0.5,
              ),
        (r, o, l, h, c) =>
          c > 0.45
            ? noGlow
            : createColor("#2fffd0").multiplyScalar(
                smoothstep((f.n3(r * 0.05, o * 0.05, l * 0.05) + 0.05) / 0.3) * 0.9,
              ),
      ),
    ])
  );
}
const qualityPresets = {
    low: { density: 0.38, seg: 240, isleDetail: 14, grass: 0.25 },
    medium: { density: 0.7, seg: 340, isleDetail: 19, grass: 0.6 },
    high: { density: 1, seg: 440, isleDetail: 22, grass: 0.8 },
  },
  fieldSize = 512,
  toArray = (f) => [f.x, f.y, f.z];
