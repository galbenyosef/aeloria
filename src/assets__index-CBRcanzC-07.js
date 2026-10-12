// assets__index-CBRcanzC 07 — math
// Lines 1662-2020 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
class sa {
  constructor(e, s, i) {
    ((this.def = e),
      (this.i = s),
      (this.root = new Se()),
      (this.pos = new k()),
      (this.fwd = new k(0, 0, 1)),
      (this.yaw = 0),
      (this.pitch = 0),
      (this.roll = 0),
      (this.speed = 30),
      (this.trickRoll = 0),
      (this.trickDir = 0),
      (this.flap = Math.random() * Z),
      (this.amp = 0.6),
      (this.tuck = 0),
      (this.flapping = !1),
      (this.flapped = !1),
      (this.stamina = 1),
      (this.impact = 0),
      (this.splash = 9),
      (this.queue = []),
      (this.target = null),
      (this.manual = !1),
      (this.low = 0),
      (this.cruise = 27 + Math.random() * 7),
      (this.cruiseOverride = null),
      (this.follow = null),
      (this.autoAim = new k()),
      (this.gndS = -1e9),
      (this.danger = 0),
      (this.autoFlap = !1),
      (this.stick = { x: 0, y: 0 }),
      (this.tmp = new k()),
      (this.n = new k()),
      (this.placeIdx = s % 5),
      (this.pal = e.pal),
      (this.riderFig = Zi(e.skin)),
      this.riderFig.group.position.set(0, 0.55, 1.55),
      this.setPalette(e.pal),
      i.add(this.root));
  }
  get head() {
    return this.riderFig.head;
  }
  setPalette(e) {
    this.mount &&
      (this.mount.body.remove(this.riderFig.group),
      this.root.remove(this.mount.body),
      Wt(this.mount.body));
    const s = Ks(e);
    (s.body.add(this.riderFig.group),
      this.root.add(s.body),
      (this.mount = { root: this.root, ...s, head: this.riderFig.head }),
      (this.pal = e));
  }
  syncFwd() {
    const e = Math.cos(this.pitch);
    this.fwd.set(
      Math.sin(this.yaw) * e,
      Math.sin(this.pitch),
      Math.cos(this.yaw) * e,
    );
  }
  setDir(e) {
    ((this.yaw = Math.atan2(e.x, e.z)),
      (this.pitch = Math.asin(B(e.y / Math.max(e.length(), 1e-6), -1, 1))),
      this.syncFwd());
  }
  spawn(e, s = this.placeIdx) {
    this.placeIdx = s;
    const i = e.places[s],
      a = new k(...i.c),
      n = Math.random() * Z;
    (this.pos.copy(a).add(new k(Math.cos(n) * 220, 40, Math.sin(n) * 220)),
      (this.pos.y = Math.max(
        this.pos.y,
        e.terrain.surface(this.pos.x, this.pos.z) + 60,
      )),
      this.setDir(a.clone().sub(this.pos).setY(0)),
      (this.speed = 30),
      (this.queue = []),
      (this.target = null),
      this.resetSmoothing());
  }
  resetSmoothing() {
    (this.autoAim.copy(this.fwd),
      (this.gndS = -1e9),
      (this.danger = 0),
      (this.stick.x = this.stick.y = 0));
  }
  placeAt(e, s) {
    (this.pos.copy(e), this.setDir(s), this.resetSmoothing());
  }
  nextTarget(e) {
    if (!this.queue.length) {
      Math.random() > 0.65 &&
        (this.placeIdx = (Math.random() * e.places.length) | 0);
      const s = e.places[this.placeIdx].wps
        .slice()
        .sort(() => Math.random() - 0.5);
      this.queue = s
        .slice(0, 3 + ((Math.random() * 3) | 0))
        .map((i) => new k(...i));
    }
    this.target = this.queue.shift() ?? null;
  }
  update(e, s, i) {
    const a = i.terrain,
      n = !this.manual;
    let r = null,
      o = 0,
      l = 0,
      c = !1,
      f = !1;
    if (n) {
      const g = this.follow?.();
      !g &&
        (!this.target || this.pos.distanceTo(this.target) < 70) &&
        this.nextTarget(i);
      const S = g ?? this.target,
        w = S ? this.tmp.copy(S).sub(this.pos).normalize() : this.fwd.clone();
      ((w.y = B(w.y, -0.45, 0.45)),
        this.autoAim.lengthSq() < 0.5 && this.autoAim.copy(this.fwd),
        this.autoAim.lerp(w, 1 - Math.exp(-e * (g ? 1.6 : 0.8))).normalize(),
        (r = this.autoAim.clone()),
        Dt(this.pos, r, i.obstacles, 40),
        Ut(this.pos, r, i.solids.movers, 26));
      const M = r.distanceTo(this.autoAim);
      let T = Math.max(a.groundY(this.pos.x, this.pos.z), fe);
      for (const j of [1, 2, 3.2]) {
        const C = this.pos.x + this.fwd.x * this.speed * j,
          K = this.pos.z + this.fwd.z * this.speed * j;
        T = Math.max(T, a.groundY(C, K));
      }
      ((this.gndS =
        this.gndS < -1e8
          ? T
          : T > this.gndS
            ? F(this.gndS, T, 1 - Math.exp(-e * 3))
            : F(this.gndS, T, 1 - Math.exp(-e * 0.6))),
        this.pos.y < this.gndS + 40 &&
          (r.y += (this.gndS + 40 - this.pos.y) * 0.03));
      const E = B((this.gndS + 14 - this.pos.y) / 10, 0, 1),
        z = Math.max(B((M - 0.3) * 2, 0, 1), E);
      ((this.danger =
        z > this.danger ? z : F(this.danger, z, 1 - Math.exp(-e * 1.5))),
        r.normalize());
      const _ = Math.max(
        F(0.08, 0.42, B((this.speed - 17) / 14, 0, 1)),
        E * 0.6,
      );
      r.y = B(r.y, -0.5, _);
      const L = this.cruiseOverride ?? this.cruise;
      (this.speed < L - 3 || r.y > 0.25
        ? (this.autoFlap = !0)
        : this.speed > L + 1 && r.y < 0.15 && (this.autoFlap = !1),
        (c = this.autoFlap),
        (f = r.y < -0.45));
    } else {
      const g = 1 - Math.exp(-e * 9);
      if (
        ((this.stick.x += (s.x - this.stick.x) * g),
        (this.stick.y += (s.y - this.stick.y) * g),
        Math.abs(s.x) < 0.05 &&
          Math.abs(this.stick.x) < 0.05 &&
          (this.stick.x = 0),
        Math.abs(s.y) < 0.05 &&
          Math.abs(this.stick.y) < 0.05 &&
          (this.stick.y = 0),
        (o = this.stick.x),
        (l = this.stick.y),
        (c = s.flap),
        (f = s.dive),
        Math.abs(o) < 0.05 &&
          Math.abs(l) < 0.05 &&
          s.aim &&
          (r = this.tmp.copy(s.aim)),
        i.assist)
      ) {
        if (r)
          (Dt(this.pos, r, i.obstacles, 14),
            Ut(this.pos, r, i.solids.movers, 18));
        else {
          const M = this.tmp
              .copy(this.pos)
              .addScaledVector(this.fwd, Math.max(this.speed, 20) * 0.8),
            T = this.fwd.clone();
          if (
            (Dt(M, T, i.obstacles, 22),
            Ut(M, T, i.solids.movers, 26),
            T.distanceToSquared(this.fwd) > 1e-4)
          ) {
            T.normalize();
            const E = vs(Math.atan2(T.x, T.z) - this.yaw),
              z = Math.asin(B(T.y, -1, 1)) - this.pitch,
              _ = 1 - Math.min(1, Math.abs(o) + Math.abs(l)) * 0.6;
            ((o = B(o - B(E * 2.2, -0.8, 0.8) * _, -1, 1)),
              (l = B(l + B(z * 2.2, -0.8, 0.8) * _, -1, 1)));
          }
        }
        const S = this.pos
            .clone()
            .addScaledVector(this.fwd, Math.max(this.speed, 20) * 1.1),
          w = Math.max(a.groundY(S.x, S.z), fe);
        S.y < w + 6 &&
          this.fwd.y < 0.2 &&
          (l = Math.max(l, B((w + 6 - S.y) / 12, 0, 1)));
      }
      s.trick &&
        !this.trickDir &&
        this.stamina > 0.15 &&
        ((this.trickDir = s.trick), (this.stamina -= 0.15));
    }
    let h, m;
    if (r && Math.abs(l) < 0.05) {
      r.normalize();
      const g = vs(Math.atan2(r.x, r.z) - this.yaw),
        S = n ? this.danger : 1,
        w = F(0.7, 1.15, S),
        M = F(0.45, 1.3, S);
      ((h = B(-g * F(1.3, 2.1, S), -w, w)),
        (m = B(
          (Math.asin(B(r.y, -1, 1)) - this.pitch) * F(1.3, 2.4, S),
          -M,
          M,
        )));
    } else
      ((h = o * 1.05),
        (m = l * 1.05),
        Math.abs(l) < 0.05 &&
          (m = ((i.assist ? 0 : -0.04) - this.pitch) * (i.assist ? 1.4 : 0.6)));
    (this.speed < _t && (m -= (_t - this.speed) * 0.3),
      (this.roll = F(
        this.roll,
        h,
        1 - Math.exp(-e * (n ? F(1.8, 4, this.danger) : 4)),
      )),
      (this.pitch = B(this.pitch + m * e, -1.3, 1.15)),
      (this.yaw -=
        ((Math.tan(B(this.roll, -1.25, 1.25)) * Bt) /
          Math.max(this.speed, 12)) *
        1.6 *
        e),
      this.syncFwd(),
      (this.tuck = F(this.tuck, f ? 1 : 0, 1 - Math.exp(-e * 4))));
    let v = F(Qi, Ji, this.tuck) * (1 + Math.abs(this.roll) * 0.25);
    if (n) {
      v *= 1 + B((this.speed - 44) / 6, 0, 2);
      const g = this.speed - (this.cruiseOverride ?? this.cruise) - 4;
      g > 0 && (v *= 1 + Math.min(g * 0.3, 3));
    }
    let d = 0;
    (c
      ? n
        ? (d = Ie * 0.75)
        : this.stamina > 0.02
          ? ((d = Ie), (this.stamina = Math.max(0, this.stamina - e * 0.11)))
          : (d = Ie * 0.3)
      : n ||
        (this.stamina = Math.min(
          1,
          this.stamina + e * 0.07 * (1 + this.tuck * 0.6),
        )),
      !n &&
        i.assist &&
        !f &&
        (d = Math.max(
          d,
          B(
            (27 - this.speed) * 0.4 +
              Bt * Math.max(0, Math.sin(this.pitch)) * 0.35,
            0,
            Ie * 0.75,
          ),
        )),
      this.speed < _t + 2 && (d = Math.max(d, Ie * 0.6)),
      (this.flapping = c || d > Ie * 0.45));
    const p =
      -Bt * Math.sin(this.pitch) -
      v * this.speed * this.speed +
      d * (1 - this.tuck * 0.7);
    ((this.speed = B(this.speed + p * e, 9, 115)),
      this.pos.addScaledVector(this.fwd, this.speed * e),
      this.collide(i),
      this.trickDir &&
        ((this.trickRoll += this.trickDir * e * 7.5),
        Math.abs(this.trickRoll) >= Z &&
          ((this.trickRoll = 0), (this.trickDir = 0))),
      this.root.position.copy(this.pos),
      this.root.lookAt(this.tmp.copy(this.pos).add(this.fwd)),
      this.root.rotateZ(this.roll + this.trickRoll));
    const x = this.flapping
      ? 0.7 + 0.3 * Math.min(1, d / Ie)
      : 0.08 + Math.max(0, this.pitch) * 0.6;
    this.amp = F(this.amp, x * (1 - this.tuck * 0.85), 1 - Math.exp(-e * 3));
    const y = this.flap;
    ((this.flap += e * (2.4 + this.amp * 2.8)),
      (this.flapped =
        Math.floor(y / Z) !== Math.floor(this.flap / Z) && this.amp > 0.3),
      (this.root.position.y -= Math.sin(this.flap) * 0.18 * this.amp),
      Ys(
        this.mount,
        this.flap,
        this.amp,
        A.uTime.value,
        this.roll,
        this.pitch,
        this.i,
        this.tuck,
      ),
      (this.low = B(
        1 - (this.pos.y - a.surface(this.pos.x, this.pos.z)) / 48,
        0,
        1,
      )),
      (this.impact *= Math.exp(-e * 3)),
      (this.splash += e));
  }
  collide(e) {
    const s = e.terrain,
      i = this.n,
      a = s.groundY(this.pos.x, this.pos.z),
      n = Math.max(a, fe) + 2.2;
    if (this.pos.y < n) {
      if (a < fe) (i.set(0, 1, 0), (this.splash = 0));
      else {
        const o =
            s.groundY(this.pos.x + 2, this.pos.z) -
            s.groundY(this.pos.x - 2, this.pos.z),
          l =
            s.groundY(this.pos.x, this.pos.z + 2) -
            s.groundY(this.pos.x, this.pos.z - 2);
        i.set(-o, 2 * 2, -l).normalize();
      }
      ((this.pos.y = n), this.bounce(i, a < fe ? 0.15 : 0.35));
    }
    for (let r = 0; r < 2; r++) {
      const o = ta(this.pos, e.solids, i);
      if (!o) break;
      (this.pos.addScaledVector(i, o), this.bounce(i, 0.5));
    }
  }
  bounce(e, s) {
    const i = -this.fwd.dot(e);
    if (i <= 0) return;
    const a = this.fwd
      .clone()
      .addScaledVector(e, i * 1.2)
      .normalize();
    this.setDir(a);
    const n = i * this.speed;
    ((this.speed *= 1 - Math.min(0.6, i * s * 1.6)),
      n > 4 && (this.impact = Math.max(this.impact, Math.min(1, n / 30))));
  }
  get up() {
    return ea;
  }
}
