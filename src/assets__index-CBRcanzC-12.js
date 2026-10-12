// assets__index-CBRcanzC 12 — mesh
// Lines 3290-3427 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
const xt = (t, e = 2.2) =>
  new yi({
    color: new W(t).multiplyScalar(e),
    toneMapped: !0,
    transparent: !0,
    depthWrite: !1,
    blending: $e,
  });
class Ma {
  constructor(e, s, i) {
    ((this.m = new je()),
      (this.q = new qe()),
      (this.s = new k()),
      (this.pos = s.map((r) => new k(...r))),
      (this.got = new Set(i)));
    const a = new cs(1.1, 1);
    ((this.mesh = new We(a, xt("#ffe9a8", 1.3), Math.max(1, s.length))),
      (this.mesh.count = s.length),
      (this.mesh.frustumCulled = !1),
      e.add(this.mesh));
    const n = new We(new cs(3.2, 1), xt("#2a1d08"), Math.max(1, s.length));
    ((n.count = s.length), (n.frustumCulled = !1), (this.halo = n), e.add(n));
  }
  update(e) {
    const s = A.uTime.value;
    let i = -1;
    return (
      this.pos.forEach((a, n) => {
        !this.got.has(n) && a.distanceTo(e) < 10 && (this.got.add(n), (i = n));
        const o = this.got.has(n) ? 0 : 1 + 0.15 * Math.sin(s * 3 + n);
        (this.q.setFromAxisAngle(new k(0, 1, 0), s * 0.8 + n),
          this.m.compose(
            this.s.copy(a).setY(a.y + Math.sin(s * 1.2 + n) * 1.5),
            this.q,
            new k(o, o * 1.3, o),
          ),
          this.mesh.setMatrixAt(n, this.m),
          this.m.compose(
            this.s,
            this.q,
            new k(o, o, o).multiplyScalar(0.9 + 0.2 * Math.sin(s * 2 + n)),
          ),
          this.halo.setMatrixAt(n, this.m));
      }),
      (this.mesh.instanceMatrix.needsUpdate = !0),
      (this.halo.instanceMatrix.needsUpdate = !0),
      i
    );
  }
  nearestOpen(e) {
    let s = -1,
      i = 1 / 0;
    return (
      this.pos.forEach((a, n) => {
        if (!this.got.has(n)) {
          const r = a.distanceTo(e);
          r < i && ((i = r), (s = n));
        }
      }),
      s < 0 ? null : { i: s, d: i, p: this.pos[s] }
    );
  }
  dispose(e) {
    for (const s of [this.mesh, this.halo])
      (e.remove(s), s.geometry.dispose(), s.material.dispose());
  }
}
class Ta {
  constructor(e, s) {
    ((this.group = new Se()),
      (this.rings = []),
      (this.active = !1),
      (this.next = 0),
      (this.start = 0),
      (this.elapsed = 0),
      (this.mat = { next: xt("#5ff2d6"), later: xt("#1e5a6a") }));
    const i = new Fs(15, 0.9, 10, 48);
    for (const a of s) {
      const n = new k(...a.p),
        r = new k(...a.n),
        o = new $(i, this.mat.later);
      (o.position.copy(n),
        o.lookAt(n.clone().add(r)),
        this.group.add(o),
        this.rings.push({ p: n, n: r, mesh: o }));
    }
    ((this.group.visible = !1), e.add(this.group));
  }
  get total() {
    return this.rings.length;
  }
  begin() {
    ((this.active = this.rings.length > 0),
      (this.next = 0),
      (this.elapsed = 0),
      (this.start = performance.now()),
      (this.group.visible = this.active),
      this.paint());
  }
  stop() {
    ((this.active = !1), (this.group.visible = !1));
  }
  hold(e) {
    this.start += e;
  }
  paint() {
    this.rings.forEach((e, s) => {
      ((e.mesh.visible = s >= this.next),
        (e.mesh.material = s === this.next ? this.mat.next : this.mat.later));
    });
  }
  aim() {
    const e = this.rings[this.next];
    return e ? e.p.clone().addScaledVector(e.n, 20) : null;
  }
  update(e) {
    if (!this.active) return null;
    this.elapsed = (performance.now() - this.start) / 1e3;
    const s = A.uTime.value,
      i = this.rings[this.next];
    return (
      i && i.mesh.scale.setScalar(1 + 0.06 * Math.sin(s * 5)),
      i && e.distanceTo(i.p) < 17
        ? (this.next++,
          this.paint(),
          this.next >= this.rings.length
            ? ((this.active = !1), (this.group.visible = !1), "done")
            : "ring")
        : null
    );
  }
  dispose(e) {
    (e.remove(this.group),
      this.rings[0]?.mesh.geometry.dispose(),
      this.mat.next.dispose(),
      this.mat.later.dispose());
  }
}
