// assets__index-CBRcanzC 11 — math
// Lines 2722-3289 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
class Sa {
  constructor(e) {
    ((this.group = new Se()),
      (this.spheres = []),
      (this.pulse = 0),
      (this.sang = !1),
      (this.speed = ra),
      (this.path = new Float32Array(ne * 3)),
      (this.cum = new Float32Array(ne + 1)),
      (this.total = 1),
      (this.s = 0),
      (this.songT = 25),
      (this.blowT = 12),
      (this.rising = !1),
      (this.frames = []),
      (this.spine = new Float32Array(ee * 3 * 4)),
      (this.tend = []),
      (this.ptsMat = qs(!0)),
      (this.spore = {
        head: 0,
        acc: 0,
        age: new Float32Array(Xe),
        vel: new Float32Array(Xe * 3),
      }),
      (this.blow = {
        head: 0,
        age: new Float32Array(Re),
        vel: new Float32Array(Re * 3),
      }),
      (this.mistMat = ya()),
      (this.bound = new mt(new k(), 240)),
      (this.boundFx = new mt(new k(), 330)),
      (this.sc = { x: 0, y: 0 }),
      (this.v1 = new k()),
      (this.v2 = new k()),
      (this.v3 = new k()),
      (this.fc = new k()),
      (this.fs = new k()),
      (this.fu = new k()),
      (this.ft = new k()),
      (this.m1 = new je()),
      (this.m2 = new je()));
    const s = e !== "low";
    for (let N = 0; N < ee; N++)
      this.frames.push({
        c: new k(),
        t: new k(0, 0, 1),
        side: new k(-1, 0, 0),
        up: new k(0, 1, 0),
        r: Qe * Zs(N / (ee - 1)),
      });
    ((this.spineTex = new Zt(this.spine, ee, 3, Qt, Bs)),
      (this.spineTex.minFilter = this.spineTex.magFilter = _s),
      (this.spineTex.generateMipmaps = !1),
      (this.spineTex.needsUpdate = !0),
      (this.uni = {
        uSpine: { value: this.spineTex },
        uPulse: { value: 0 },
        uTime: A.uTime,
        uNight: A.uNight,
      }));
    const i = s ? 300 : 150,
      a = s ? 84 : 44,
      n = new Float32Array((i + 1) * (a + 1) * 3),
      r = [];
    for (let N = 0; N <= i; N++) {
      const we = 0.5 - 0.5 * Math.cos((Math.PI * N) / i);
      for (let se = 0; se <= a; se++) {
        const J = (N * (a + 1) + se) * 3;
        ((n[J] = we), (n[J + 1] = (se / a) * Z));
      }
    }
    for (let N = 0; N < i; N++)
      for (let we = 0; we < a; we++) {
        const se = N * (a + 1) + we,
          J = se + 1,
          Ue = se + a + 1,
          V = Ue + 1;
        r.push(se, J, Ue, J, V, Ue);
      }
    const o = new ae();
    (o.setAttribute("position", new D(n, 3)),
      o.setIndex(r),
      (o.boundingSphere = this.bound),
      (this.body = new $(o, ma(this.uni, s))),
      (this.body.customDepthMaterial = va(this.uni)),
      (this.body.castShadow = this.body.receiveShadow = !0));
    const l = $t(It),
      c = Lt(this.uni, 88, 20);
    ((this.finR = new $(l, c)),
      (this.finL = new $(l, c)),
      (this.fluke = new $($t(Ot), Lt(this.uni, 58, 0))),
      (this.dorsal = new $(wa(), Lt(this.uni, 11, 0, 1))));
    for (const N of [this.finR, this.finL, this.fluke, this.dorsal])
      ((N.matrixAutoUpdate = !1),
        (N.castShadow = !0),
        N.geometry.boundingSphere ||
          (N.geometry.computeBoundingSphere(),
          (N.geometry.boundingSphere.radius += 12)));
    const f = tt(911),
      h = s ? 320 : 140,
      m = new Float32Array(h * 4),
      v = new Float32Array(h * 3),
      d = new W(),
      p = ["#ffd36a", "#ff7ae6", "#7ffcff", "#b8ff5a", "#ffb07a"];
    for (let N = 0; N < h; N++) {
      const we = f() < 0.5 ? -1 : 1,
        se = we * (0.16 + Math.pow(f(), 1.4) * 0.75);
      (m.set(
        [0.14 + f() * 0.56, se, 1.5 + Math.pow(f(), 2) * 6.5, f() * Z],
        N * 4,
      ),
        d.set(p[(f() * p.length) | 0]).toArray(v, N * 3));
    }
    const x = ba(s),
      y = new Ds();
    y.index = x.index;
    for (const N of ["position", "normal", "aBulb"])
      y.setAttribute(N, x.getAttribute(N));
    (y.setAttribute("aInst", new Je(m, 4)),
      y.setAttribute("aCol", new Je(v, 3)),
      (y.instanceCount = h),
      (y.boundingSphere = this.bound));
    const g = new $(y, ga(this.uni)),
      S = s ? 34 : 18;
    for (let N = 0; N < S; N++)
      this.tend.push({
        u: 0.12 + f() * 0.5,
        th: -Math.PI / 2 + (f() - 0.5) * 1.7,
        len: 45 + f() * 70,
        ph: f() * Z,
        tilt: 0.75 + f() * 0.35,
        p: new Float32Array(de * 3),
      });
    const w = S * de * 2,
      M = new Float32Array(w),
      T = new Float32Array(w),
      E = new Float32Array(w),
      z = [];
    for (let N = 0; N < S; N++) {
      const we = f();
      for (let se = 0; se < de; se++) {
        const J = (N * de + se) * 2;
        ((M[J] = -1),
          (M[J + 1] = 1),
          (T[J] = T[J + 1] = se / (de - 1)),
          (E[J] = E[J + 1] = we),
          se < de - 1 && z.push(J, J + 1, J + 2, J + 1, J + 3, J + 2));
      }
    }
    const _ = new ae();
    ((this.rPos = new D(new Float32Array(w * 3), 3).setUsage(Le)),
      (this.rTan = new D(new Float32Array(w * 3), 3).setUsage(Le)),
      _.setAttribute("position", this.rPos),
      _.setAttribute("aTan", this.rTan),
      _.setAttribute("aEdge", new D(M, 1)),
      _.setAttribute("aAlong", new D(T, 1)),
      _.setAttribute("aSeed", new D(E, 1)),
      _.setIndex(z),
      (_.boundingSphere = this.bound),
      (this.ribbon = new $(_, xa(this.uni))),
      (this.ribbon.renderOrder = 4));
    const L = S * 2 + Xe,
      j = new Float32Array(L * 3),
      C = new Float32Array(L),
      K = new Float32Array(L),
      ie = new W("#5ff2d6"),
      he = new W("#ffd36a"),
      Ee = new W("#b18cff");
    for (let N = 0; N < L; N++)
      ((K[N] = f()),
        N < S * 2
          ? ((N % 2 ? Ee : ie).toArray(j, N * 3), (C[N] = N % 2 ? 4.5 : 2.6))
          : d
              .copy(ie)
              .lerp(he, f() * 0.6)
              .toArray(j, N * 3));
    (this.spore.age.fill(99), this.blow.age.fill(99));
    const Te = new ae();
    ((this.ppos = new D(new Float32Array(L * 3), 3).setUsage(Le)),
      (this.psize = new D(C, 1).setUsage(Le)),
      Te.setAttribute("position", this.ppos),
      Te.setAttribute("aSize", this.psize),
      Te.setAttribute("aPhase", new D(K, 1)),
      Te.setAttribute("aColor", new D(j, 3)),
      (this.ptsMat.uniforms.uDrift.value = 0.4),
      (this.ptsMat.uniforms.uBlink.value = 0.5),
      (this.ptsMat.uniforms.uFar.value = 25e-5),
      (Te.boundingSphere = this.boundFx),
      (this.pts = new vt(Te, this.ptsMat)));
    const De = new ae();
    ((this.mPos = new D(new Float32Array(Re * 3), 3).setUsage(Le)),
      (this.mSize = new D(new Float32Array(Re), 1).setUsage(Le)),
      (this.mA = new D(new Float32Array(Re), 1).setUsage(Le)),
      De.setAttribute("position", this.mPos),
      De.setAttribute("aSize", this.mSize),
      De.setAttribute("aA", this.mA),
      (De.boundingSphere = this.boundFx),
      (this.mist = new vt(De, this.mistMat)),
      (this.mist.renderOrder = 5),
      this.group.add(
        this.body,
        this.finL,
        this.finR,
        this.fluke,
        this.dorsal,
        g,
        this.ribbon,
        this.pts,
        this.mist,
      ));
  }
  build(e, s, i, a) {
    const n = tt(e * 7 + 3),
      r = n() * Z,
      o = Math.cos(r),
      l = Math.sin(r),
      c = 640,
      f = 440,
      h = new Float32Array(ne),
      m = [
        ...i.map(([p, x, y, g]) => [p, y, g + Qe + 30, x + g * 0.35]),
        [a[0], a[2], 150, a[1] + 215],
      ];
    for (let p = 0; p < ne; p++) {
      const x = (p / ne) * Z,
        y = c * Math.sin(x),
        g = f * Math.sin(2 * x),
        S = y * o - g * l,
        w = y * l + g * o;
      let M = Math.max(250 + 35 * Math.sin(3 * x + 1), s.surface(S, w) + 150);
      for (const [T, E, z, _] of m)
        Math.hypot(S - T, w - E) < z && (M = Math.max(M, _ + Qe + 45));
      ((this.path[p * 3] = S), (this.path[p * 3 + 2] = w), (h[p] = M));
    }
    const v = 160,
      d = new Float32Array(ne);
    for (let p = 0; p < ne; p++) {
      let x = -1e9;
      for (let y = -v; y <= v; y += 4) x = Math.max(x, h[(p + y + ne) % ne]);
      d[p] = x;
    }
    for (let p = 0; p < ne; p++) {
      let x = 0,
        y = 0;
      for (let g = -v; g <= v; g += 4) ((x += d[(p + g + ne) % ne]), y++);
      this.path[p * 3 + 1] = x / y;
    }
    this.cum[0] = 0;
    for (let p = 0; p < ne; p++) {
      const x = (p + 1) % ne;
      this.cum[p + 1] =
        this.cum[p] +
        Math.hypot(
          this.path[x * 3] - this.path[p * 3],
          this.path[x * 3 + 1] - this.path[p * 3 + 1],
          this.path[x * 3 + 2] - this.path[p * 3 + 2],
        );
    }
    ((this.total = this.cum[ne]),
      (this.s = n() * this.total),
      (this.songT = 20 + n() * 15),
      (this.blowT = 8 + n() * 10),
      (this.pulse = 0),
      this.spore.age.fill(99),
      this.blow.age.fill(99),
      this.layout(A.uTime.value));
  }
  at(e, s) {
    e = ((e % this.total) + this.total) % this.total;
    let i = 0,
      a = ne;
    for (; a - i > 1;) {
      const c = (i + a) >> 1;
      this.cum[c] <= e ? (i = c) : (a = c);
    }
    const n = i,
      r = (n + 1) % ne,
      o = (e - this.cum[n]) / Math.max(this.cum[n + 1] - this.cum[n], 1e-6),
      l = this.path;
    s.set(
      l[n * 3] + (l[r * 3] - l[n * 3]) * o,
      l[n * 3 + 1] + (l[r * 3 + 1] - l[n * 3 + 1]) * o,
      l[n * 3 + 2] + (l[r * 3 + 2] - l[n * 3 + 2]) * o,
    );
  }
  layout(e) {
    const s = this.frames;
    for (let i = 0; i < ee; i++) {
      const a = i / (ee - 1),
        n = s[i];
      (this.at(this.s - a * qt, n.c),
        (n.c.y += (2 + 12 * a * a) * Math.sin(e * 0.55 - a * 5.2)));
    }
    for (let i = 0; i < ee; i++) {
      const a = s[i];
      (a.t
        .subVectors(s[Math.max(0, i - 1)].c, s[Math.min(ee - 1, i + 1)].c)
        .normalize(),
        a.side.crossVectors(a.t, na).normalize(),
        a.up.crossVectors(a.side, a.t).normalize());
      const n = this.spine;
      for (const [r, o] of [
        [0, a.c],
        [1, a.side],
        [2, a.up],
      ]) {
        const l = (r * ee + i) * 4;
        ((n[l] = o.x), (n[l + 1] = o.y), (n[l + 2] = o.z));
      }
    }
    ((this.spineTex.needsUpdate = !0),
      this.bound.center.copy(s[ee >> 1].c),
      this.boundFx.center.copy(s[ee >> 1].c));
  }
  frame(e) {
    const s = B(e, 0, 1) * (ee - 1),
      i = Math.min(ee - 2, Math.floor(s)),
      a = s - i,
      n = this.frames[i],
      r = this.frames[i + 1];
    (this.fc.lerpVectors(n.c, r.c, a),
      this.fs.lerpVectors(n.side, r.side, a).normalize(),
      this.fu.lerpVectors(n.up, r.up, a).normalize(),
      this.ft.lerpVectors(n.t, r.t, a).normalize());
  }
  surf(e, s, i, a = 0) {
    this.frame(e);
    const n = da(e, s, this.sc),
      r = Math.hypot(n.x, n.y),
      o = r > 0.001 ? Math.max(0, 1 - a / r) : 0;
    return i
      .copy(this.fc)
      .addScaledVector(this.fs, n.x * o)
      .addScaledVector(this.fu, n.y * o);
  }
  frameAt(e) {
    return this.frames[Math.round(B(e, 0, 1) * (ee - 1))];
  }
  get dir() {
    return this.frames[0].t;
  }
  get center() {
    return this.frames[Math.round((ee - 1) * 0.2)].c;
  }
  nearest(e) {
    let s = this.frames[0],
      i = 1 / 0;
    for (let a = 0; a < ee; a += 2) {
      const n = this.frames[a],
        r = n.c.distanceTo(e) - n.r;
      r < i && ((i = r), (s = n));
    }
    return { frame: s, skin: i };
  }
  place(e, s, i, a, n, r) {
    (this.v2.copy(this.fs).multiplyScalar(i),
      e.matrix
        .makeBasis(this.v2, this.fu, this.ft)
        .multiply(this.m1.makeRotationY(n))
        .multiply(this.m2.makeRotationZ(a))
        .multiply(this.m1.makeRotationX(r))
        .setPosition(s),
      (e.matrixWorldNeedsUpdate = !0));
  }
  update(e, s, i, a) {
    ((this.s += this.speed * e),
      (this.songT -= e),
      (this.sang = !1),
      this.songT < 0 &&
        ((this.songT = 60 + Math.random() * 25),
        (this.sang = !0),
        (this.rising = !0),
        (this.blowT = 0)),
      this.rising
        ? ((this.pulse = Math.min(1, this.pulse + e * 0.8)),
          this.pulse >= 1 && (this.rising = !1))
        : (this.pulse *= Math.exp(-e * 0.35)),
      (this.uni.uPulse.value = this.pulse),
      this.layout(s));
    const n = Math.sin(s * 0.5),
      r = Math.cos(s * 0.55 - 5.2);
    ((this.finR.material.userData.bend.value = 0.28 * Math.cos(s * 0.5 + 0.6)),
      (this.fluke.material.userData.bend.value = 0.35 * r));
    for (const l of [1, -1])
      (this.surf(0.24, l > 0 ? -0.42 : Math.PI + 0.42, this.v1, 3),
        this.place(
          l > 0 ? this.finR : this.finL,
          this.v1,
          l,
          -0.45 + 0.2 * n,
          -0.12,
          0.06,
        ));
    (this.frame(0.972),
      this.place(this.fluke, this.v1.copy(this.fc), 1, 0, 0, 0.18 * r),
      this.surf(0.67, Math.PI / 2, this.v1, 0.6),
      this.place(this.dorsal, this.v1, 1, 0, 0, 0),
      this.stepTendrils(s),
      this.stepParticles(e, s, i, a),
      (this.spheres.length = 0));
    for (let l = 2; l < ee; l += 4) {
      const c = this.frames[l];
      this.spheres.push([c.c.x, c.c.y, c.c.z, c.r * 0.98]);
    }
    const o = (l, c, f, h) => {
      for (const m of f) {
        const v = c.chord(m);
        (this.v1
          .set(h * m * c.span, c.drop(m), c.lead(m) - v * 0.5)
          .applyMatrix4(l.matrix),
          this.spheres.push([this.v1.x, this.v1.y, this.v1.z, v * 0.42]));
      }
    };
    (o(this.finR, It, [0.25, 0.48, 0.7, 0.88], 1),
      o(this.finL, It, [0.25, 0.48, 0.7, 0.88], 1),
      o(this.fluke, Ot, [0.2, 0.5, 0.8], 1),
      o(this.fluke, Ot, [0.2, 0.5, 0.8], -1));
  }
  stepTendrils(e) {
    const s = this.rPos.array,
      i = this.rTan.array,
      a = this.v2,
      n = this.v3;
    for (const r of this.tend) {
      const o = r.p,
        l = r.len / (de - 1),
        c = this.s - r.u * qt,
        f = Math.cos(r.tilt),
        h = Math.sin(r.tilt);
      (this.surf(r.u, r.th, this.v1, 0.4), this.at(c, a));
      for (let m = 0; m < de; m++) {
        const v = m * l,
          d = m / (de - 1),
          p = m * 3;
        this.at(c - v * f, n);
        const x = Math.sin(e * 0.7 + r.ph + m * 0.25) * Math.pow(d, 1.5) * 4,
          y = Math.sin(e * 1.1 + r.ph * 2 + m * 0.4) * d * 1.5;
        ((o[p] = this.v1.x + n.x - a.x + this.fs.x * x),
          (o[p + 1] = this.v1.y + n.y - a.y - v * h + y),
          (o[p + 2] = this.v1.z + n.z - a.z + this.fs.z * x));
      }
    }
    (this.tend.forEach((r, o) => {
      const l = r.p;
      for (let c = 0; c < de; c++) {
        const f = c * 3,
          h = Math.max(0, c - 1) * 3,
          m = Math.min(de - 1, c + 1) * 3,
          v = l[m] - l[h],
          d = l[m + 1] - l[h + 1],
          p = l[m + 2] - l[h + 2],
          x = Math.hypot(v, d, p) || 1;
        for (let y = 0; y < 2; y++) {
          const g = ((o * de + c) * 2 + y) * 3;
          ((s[g] = l[f]),
            (s[g + 1] = l[f + 1]),
            (s[g + 2] = l[f + 2]),
            (i[g] = v / x),
            (i[g + 1] = d / x),
            (i[g + 2] = p / x));
        }
      }
    }),
      (this.rPos.needsUpdate = this.rTan.needsUpdate = !0));
  }
  stepParticles(e, s, i, a) {
    const n = this.ppos.array,
      r = this.psize.array,
      o = this.tend.length;
    this.tend.forEach((d, p) => {
      const x = (de - 1) * 3,
        y = Math.round(de * 0.55) * 3;
      (n.set([d.p[x], d.p[x + 1], d.p[x + 2]], p * 2 * 3),
        n.set([d.p[y], d.p[y + 1], d.p[y + 2]], (p * 2 + 1) * 3),
        (r[p * 2] = 2.6 + Math.sin(s * 2 + d.ph) * 0.8));
    });
    const l = this.spore,
      c = o * 2;
    for (l.acc += e * 26; l.acc >= 1; l.acc--) {
      const d = (l.head = (l.head + 1) % Xe),
        p = (c + d) * 3;
      (this.surf(0.3 + Math.random() * 0.62, Math.random() * Z, this.v1),
        (n[p] = this.v1.x),
        (n[p + 1] = this.v1.y),
        (n[p + 2] = this.v1.z),
        (l.vel[d * 3] = (Math.random() - 0.5) * 3),
        (l.vel[d * 3 + 1] = -1.2 - Math.random() * 2.2),
        (l.vel[d * 3 + 2] = (Math.random() - 0.5) * 3),
        (l.age[d] = 0));
    }
    for (let d = 0; d < Xe; d++) {
      const p = (c + d) * 3,
        x = (l.age[d] += e);
      if (x > 14) {
        r[c + d] = 0;
        continue;
      }
      ((n[p] += l.vel[d * 3] * e),
        (n[p + 1] += l.vel[d * 3 + 1] * e),
        (n[p + 2] += l.vel[d * 3 + 2] * e),
        (r[c + d] = 2.4 * Math.min(1, x * 2) * (1 - x / 14)));
    }
    this.blowT -= e;
    const f = this.blow,
      h = this.mPos.array,
      m = this.mSize.array,
      v = this.mA.array;
    if (this.blowT < 0) {
      ((this.blowT = 28 + Math.random() * 20), this.frame(0.15));
      for (let d = 0; d < Re; d++) {
        const p = (f.head = (f.head + 1) % Re),
          x = p * 3,
          y = d % 2 ? 1 : -1;
        (this.surf(0.15, Math.PI / 2 + y * 0.03, this.v1),
          (h[x] = this.v1.x),
          (h[x + 1] = this.v1.y),
          (h[x + 2] = this.v1.z));
        const g = 22 + Math.random() * 24,
          S = (Math.random() - 0.5) * 13;
        (this.v2
          .copy(this.fu)
          .multiplyScalar(g)
          .addScaledVector(this.fs, S + y * 3)
          .addScaledVector(
            this.ft,
            this.speed * 0.9 + (Math.random() - 0.5) * 9,
          ),
          f.vel.set([this.v2.x, this.v2.y, this.v2.z], p * 3),
          (f.age[p] = -Math.random() * 0.9));
      }
    }
    for (let d = 0; d < Re; d++) {
      const p = d * 3,
        x = (f.age[d] += e);
      if (x < 0 || x > 7) {
        v[d] = 0;
        continue;
      }
      const y = Math.exp(-0.65 * e),
        g = 1 + e * 0.7;
      ((f.vel[d * 3] = f.vel[d * 3] * y * g),
        (f.vel[d * 3 + 1] = f.vel[d * 3 + 1] * y - 2.5 * e),
        (f.vel[d * 3 + 2] = f.vel[d * 3 + 2] * y * g),
        (h[p] += f.vel[d * 3] * e),
        (h[p + 1] += f.vel[d * 3 + 1] * e),
        (h[p + 2] += f.vel[d * 3 + 2] * e),
        (m[d] = 6 + x * 3.2),
        (v[d] = 0.1 * Math.min(1, x * 2.5) * Math.pow(1 - x / 7, 1.6)));
    }
    ((this.ppos.needsUpdate = this.psize.needsUpdate = !0),
      (this.mPos.needsUpdate =
        this.mSize.needsUpdate =
        this.mA.needsUpdate =
          !0),
      (this.mistMat.uniforms.uScale.value = a),
      (this.mistMat.uniforms.uInt.value = 0.7 + i * 0.9 + this.pulse * 1.2),
      (this.ptsMat.uniforms.uScale.value = a),
      (this.ptsMat.uniforms.uInt.value = 0.55 + i * 1.1 + this.pulse * 1.6));
  }
  dispose() {
    (this.group.traverse((e) => {
      const s = e;
      s.geometry && s.geometry.dispose();
    }),
      this.spineTex.dispose());
  }
}
