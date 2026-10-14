// assets__index-CBRcanzC 14 — pad
// Lines 3871-4003 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
class Pa {
  constructor() {
    ((this.keys = {}),
      (this.aimYaw = 0),
      (this.aimPitch = 0),
      (this.locked = !1),
      (this.lockFailed = !1),
      (this.sensitivity = 0.0022),
      (this.invertY = !1),
      (this.drag = { x: 0, y: 0 }),
      (this.touch = { x: 0, y: 0, flap: !1, dive: !1 }),
      (this.trick = 0),
      (this.pad = { x: 0, y: 0, flap: !1, dive: !1, active: !1 }),
      (this.prevButtons = []),
      (this.aim = new k()),
      (this.onLockLost = null),
      (this.releasing = !1),
      document.addEventListener("pointerlockchange", () => {
        const e = this.locked;
        ((this.locked = !!document.pointerLockElement),
          e && !this.locked && !this.releasing && this.onLockLost?.(),
          (this.releasing = !1));
      }),
      document.addEventListener("pointerlockerror", () => {
        this.lockFailed = !0;
      }),
      document.addEventListener("mousemove", (e) => {
        this.locked &&
          ((this.aimYaw -= e.movementX * this.sensitivity),
          (this.aimPitch = B(
            this.aimPitch -
              e.movementY * this.sensitivity * (this.invertY ? -1 : 1),
            -1.15,
            1.05,
          )));
      }));
  }
  requestLock(e) {
    if (!(this.locked || !e.requestPointerLock))
      try {
        const s = e.requestPointerLock();
        s &&
          typeof s.catch == "function" &&
          s.catch(() => {
            this.lockFailed = !0;
          });
      } catch {
        this.lockFailed = !0;
      }
  }
  releaseLock() {
    document.pointerLockElement &&
      ((this.releasing = !0), document.exitPointerLock());
  }
  syncAim(e, s) {
    ((this.aimYaw = e), (this.aimPitch = s));
  }
  aimDir() {
    const e = Math.cos(this.aimPitch);
    return this.aim.set(
      Math.sin(this.aimYaw) * e,
      Math.sin(this.aimPitch),
      Math.cos(this.aimYaw) * e,
    );
  }
  pollPad() {
    const e = [],
      s = navigator.getGamepads ? navigator.getGamepads() : [],
      i = Array.from(s).find((o) => o && o.connected);
    if (!i) return ((this.pad.active = !1), e);
    const a = (o) =>
      Math.abs(o) < 0.15 ? 0 : (o - Math.sign(o) * 0.15) / 0.85;
    ((this.pad.x = a(i.axes[0] ?? 0)), (this.pad.y = -a(i.axes[1] ?? 0)));
    const n = (o) => !!i.buttons[o]?.pressed;
    ((this.pad.flap = n(0) || n(7)),
      (this.pad.dive = n(1) || n(6)),
      (this.pad.active =
        this.pad.active ||
        Math.abs(this.pad.x) + Math.abs(this.pad.y) > 0 ||
        this.pad.flap ||
        this.pad.dive));
    const r = (o) => n(o) && !this.prevButtons[o];
    return (
      r(9) && e.push("reins"),
      r(3) && e.push("camera"),
      r(5) && e.push("next"),
      r(4) && e.push("prev"),
      r(8) && e.push("map"),
      r(2) && (this.trick = Math.sign(this.pad.x || 1)),
      (this.prevButtons = i.buttons.map((o) => o.pressed)),
      e
    );
  }
  get padActive() {
    return this.pad.active;
  }
  controls(e, s) {
    const i = this.keys;
    let a =
        (i.KeyD || i.ArrowRight ? 1 : 0) -
        (i.KeyA || i.ArrowLeft ? 1 : 0) +
        this.drag.x +
        this.touch.x +
        this.pad.x,
      n =
        (i.KeyW || i.ArrowUp ? 1 : 0) -
        (i.KeyS || i.ArrowDown ? 1 : 0) +
        this.drag.y +
        this.touch.y +
        this.pad.y;
    ((a = B(a, -1, 1)), (n = B(n, -1, 1)));
    const r = Math.abs(a) > 0.05 || Math.abs(n) > 0.05;
    (r || !this.locked) && this.syncAim(e, s);
    const o = this.trick || (i.KeyE ? 1 : i.KeyQ ? -1 : 0);
    return (
      (this.trick = 0),
      {
        x: a,
        y: n,
        aim: this.locked && !r ? this.aimDir().clone() : null,
        flap: !!(i.Space || this.touch.flap || this.pad.flap),
        dive: !!(
          i.ShiftLeft ||
          i.ShiftRight ||
          this.touch.dive ||
          this.pad.dive
        ),
        trick: o,
      }
    );
  }
}
const jt = new k(0, 1, 0);
