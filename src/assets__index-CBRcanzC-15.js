// assets__index-CBRcanzC 15 — math
// Lines 4004-4225 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
class Ca {
  constructor(e) {
    ((this.unocclude = e),
      (this.snap = !0),
      (this.lookYaw = 0),
      (this.lookPitch = 0),
      (this.orbitYaw = 0),
      (this.orbitPitch = 0.25),
      (this.orbitDist = 34),
      (this.chaseDist = 34),
      (this.pos = new k()),
      (this.look = new k()),
      (this.upv = new k(0, 1, 0)),
      (this.shot = 0),
      (this.shotT = 0),
      (this.shotPos = new k()),
      (this.qFlip = new qe().setFromAxisAngle(jt, Math.PI)),
      (this.heading = new k(0, 0, 1)),
      (this.t = 0));
  }
  zoom(e) {
    ((this.orbitDist = B(this.orbitDist * (1 + e * 0.001), 12, 220)),
      (this.chaseDist = B(this.chaseDist * (1 + e * 0.001), 10, 90)));
  }
  drag(e, s, i) {
    i === "orbit" || i === "drone"
      ? ((this.orbitYaw -= e * 0.006),
        (this.orbitPitch = B(this.orbitPitch + s * 0.004, -0.4, 1.4)))
      : ((this.lookYaw -= e * 0.005),
        (this.lookPitch = B(this.lookPitch - s * 0.004, -0.8, 0.8)));
  }
  update(e, s, i, a, n) {
    this.t += e;
    let r = n.mode;
    (n.photo && (r = "cinema"),
      n.idle &&
        !n.dragging &&
        ((this.lookYaw *= 1 - Math.min(1, e * 0.5)),
        (this.lookPitch *= 1 - Math.min(1, e * 0.5))));
    const o = new k(i.fwd.x, 0, i.fwd.z).normalize(),
      l = new k().crossVectors(o, jt).normalize(),
      c = B((i.speed - 25) / 60, 0, 1);
    let f = 60,
      h = 5,
      m = 10,
      v = 0;
    const d = new k(),
      p = new k();
    if (r === "seat") {
      (i.root.updateMatrixWorld(!0),
        i.head.getWorldPosition(d),
        s.position.copy(d),
        s.quaternion.copy(i.root.quaternion).multiply(this.qFlip),
        s.rotateY(this.lookYaw),
        s.rotateX(-0.08 + this.lookPitch),
        (s.fov = F(s.fov, 74 + c * 16 + i.tuck * 6, 0.1)),
        s.updateProjectionMatrix(),
        this.pos.copy(d),
        this.look.copy(d).addScaledVector(i.fwd, 10),
        (this.snap = !1));
      return;
    }
    if (r === "chase") {
      const T = n.aim ? n.aim : i.fwd;
      this.snap
        ? this.heading.copy(T)
        : this.heading
            .lerp(T, 1 - Math.exp(-e * (n.aim ? 7 : i.manual ? 3 : 1.4)))
            .normalize();
      const E = n.aim ? 0.7 : i.manual ? 0.5 : 0.35,
        z = B(Math.asin(B(this.heading.y, -1, 1)) * E, -0.6, 0.6),
        _ = Math.atan2(this.heading.x, this.heading.z) + this.lookYaw,
        L = new k(
          Math.sin(_) * Math.cos(z),
          Math.sin(z),
          Math.cos(_) * Math.cos(z),
        ),
        j = this.chaseDist * (1 + c * 0.25);
      (d
        .copy(i.pos)
        .addScaledVector(L, -j)
        .add(new k(0, j * 0.3 + this.lookPitch * 22, 0)),
        p
          .copy(i.pos)
          .addScaledVector(L, n.aim ? 40 : 14)
          .add(new k(0, 2.5, 0)),
        (f = 60 + c * 20 + i.tuck * 6),
        (v = (i.roll + i.trickRoll * 0.15) * (i.manual ? 0.3 : 0.12)),
        (h = 6),
        (m = 12));
    } else if (r === "drone") {
      const T = Math.atan2(o.x, o.z) + this.orbitYaw,
        E = new k(Math.sin(T), 0, Math.cos(T)),
        z = 55 + this.orbitPitch * 60;
      (d
        .copy(i.pos)
        .addScaledVector(E, -110)
        .add(new k(0, z, 0)),
        p.copy(i.pos).addScaledVector(E, 50),
        (f = 50),
        (h = 1.6),
        (m = 3));
    } else if (r === "orbit") {
      n.idle && !n.dragging && (this.orbitYaw += e * 0.12);
      const T = Math.atan2(i.fwd.x, i.fwd.z) + Math.PI + this.orbitYaw;
      (d
        .set(
          Math.sin(T) * Math.cos(this.orbitPitch),
          Math.sin(this.orbitPitch),
          Math.cos(T) * Math.cos(this.orbitPitch),
        )
        .multiplyScalar(this.orbitDist)
        .add(i.pos),
        p.copy(i.pos),
        (h = 6));
    } else {
      const T = n.photo ? 1.6 : 1;
      if (((this.shotT -= e), this.shotT <= 0)) {
        ((this.shot = (this.shot + 1) % 6),
          (this.shotT = (6 + Math.random() * 4) * T));
        const E = Math.random() < 0.5 ? -1 : 1;
        if (
          (this.shot === 1 &&
            this.shotPos
              .copy(i.pos)
              .addScaledVector(i.fwd, i.speed * 4.5)
              .addScaledVector(l, E * 30)
              .add(new k(0, -6, 0)),
          this.shot === 2 &&
            this.shotPos
              .copy(i.pos)
              .addScaledVector(o, -70)
              .addScaledVector(l, -90)
              .add(new k(0, 70, 0)),
          this.shot === 4)
        ) {
          const z = i.pos
            .clone()
            .addScaledVector(o, i.speed * 5)
            .addScaledVector(l, E * 22);
          this.shotPos.set(
            z.x,
            Math.max(a.surface(z.x, z.z) + 3, i.pos.y - 70),
            z.z,
          );
        }
        this.snap = !0;
      }
      switch (this.shot) {
        case 0:
          (d
            .copy(i.pos)
            .addScaledVector(l, 26)
            .addScaledVector(o, -4)
            .add(new k(0, 3, 0)),
            p.copy(i.pos),
            (f = 40),
            (h = 4));
          break;
        case 1:
          (d.copy(this.shotPos),
            p.copy(i.pos),
            (f = F(48, 28, B(1 - i.pos.distanceTo(this.shotPos) / 200, 0, 1))),
            (h = 50));
          break;
        case 2:
          (this.shotPos.addScaledVector(o, i.speed * 0.85 * e),
            d.copy(this.shotPos),
            p.copy(i.pos),
            (f = 34),
            (h = 50));
          break;
        case 3:
          (d
            .copy(i.pos)
            .addScaledVector(i.fwd, 15)
            .add(new k(0, 3.5, 0))
            .addScaledVector(l, 4),
            p.copy(i.pos).add(new k(0, 1.5, 0)),
            (f = 55),
            (h = 5));
          break;
        case 4:
          (d.copy(this.shotPos), p.copy(i.pos), (f = 44), (h = 50));
          break;
        default:
          (d
            .copy(i.pos)
            .add(new k(0, 90, 0))
            .addScaledVector(o, -20),
            p.copy(i.pos).addScaledVector(o, 25),
            (f = 52),
            (h = 3));
          break;
      }
    }
    (r !== "cinema" || this.shot === 0 || this.shot === 3) &&
      this.unocclude(i.pos, d);
    const x = a.surface(d.x, d.z) + 2.5;
    d.y < x && (d.y = x);
    const y = this.snap ? 1 : 1 - Math.exp(-e * h);
    (this.pos.lerp(d, y),
      this.look.lerp(p, this.snap ? 1 : 1 - Math.exp(-e * m)),
      (this.snap = !1));
    const g = i.impact * 1.4 + Math.max(0, i.speed - 62) * 0.006,
      S = (Math.sin(this.t * 37.1) + Math.sin(this.t * 23.7)) * 0.5 * g,
      w = (Math.sin(this.t * 31.3 + 1.7) + Math.sin(this.t * 19.9)) * 0.5 * g;
    s.position
      .copy(this.pos)
      .addScaledVector(l, S)
      .add(new k(0, w, 0));
    const M = this.look.clone().sub(this.pos).normalize();
    (this.upv.lerp(jt.clone().applyAxisAngle(M, v), 1 - Math.exp(-e * 4)),
      s.up.copy(this.upv),
      s.lookAt(this.look),
      (s.fov = F(s.fov, f, 1 - Math.exp(-e * 3))),
      s.updateProjectionMatrix());
  }
  get eye() {
    return this.pos;
  }
}
