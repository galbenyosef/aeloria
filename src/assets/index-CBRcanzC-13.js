// assets/index-CBRcanzC 13 — connect
// Lines 3428-3870 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
class SoundEngine {
  constructor() {
    ((this.ac = null), (this.on = !1));
  }
  noiseBuffer(e, s) {
    const i = this.ac,
      a = (i.sampleRate * e) | 0,
      n = i.createBuffer(1, a, i.sampleRate),
      r = n.getChannelData(0);
    let o = 0;
    for (let l = 0; l < a; l++) {
      const c = Math.random() * 2 - 1;
      s ? ((o = (o + 0.02 * c) / 1.02), (r[l] = o * 3.5)) : (r[l] = c);
    }
    return n;
  }
  init() {
    const e = window.AudioContext || window.webkitAudioContext,
      s = (this.ac = new e());
    ((this.master = s.createGain()),
      (this.master.gain.value = 0),
      this.master.connect(s.destination));
    const i = s.createBufferSource();
    ((i.buffer = this.noiseBuffer(2, !0)),
      (i.loop = !0),
      (this.windF = s.createBiquadFilter()),
      (this.windF.type = "lowpass"),
      (this.windF.frequency.value = 500),
      (this.windG = s.createGain()),
      (this.windG.gain.value = 0.25),
      i.connect(this.windF).connect(this.windG).connect(this.master),
      i.start());
    const a = s.createBufferSource();
    ((a.buffer = this.noiseBuffer(2, !1)), (a.loop = !0));
    const n = s.createBiquadFilter();
    ((n.type = "highpass"),
      (n.frequency.value = 1800),
      (this.rainG = s.createGain()),
      (this.rainG.gain.value = 0),
      a.connect(n).connect(this.rainG).connect(this.master),
      a.start());
    const r = s.createBufferSource();
    ((r.buffer = this.noiseBuffer(2, !1)),
      (r.loop = !0),
      (this.whistleF = s.createBiquadFilter()),
      (this.whistleF.type = "bandpass"),
      (this.whistleF.frequency.value = 900),
      (this.whistleF.Q.value = 6),
      (this.whistleG = s.createGain()),
      (this.whistleG.gain.value = 0),
      r.connect(this.whistleF).connect(this.whistleG).connect(this.master),
      r.start(),
      (this.bondO = s.createOscillator()),
      (this.bondO.type = "triangle"),
      (this.bondO.frequency.value = 220));
    const o = s.createOscillator();
    o.frequency.value = 5.5;
    const l = s.createGain();
    ((l.gain.value = 6),
      o.connect(l).connect(this.bondO.frequency),
      o.start(),
      (this.bondG = s.createGain()),
      (this.bondG.gain.value = 0),
      this.bondO.connect(this.bondG).connect(this.master),
      this.bondO.start(),
      (this.pad = s.createGain()),
      (this.pad.gain.value = 0.05));
    const c = s.createBiquadFilter();
    ((c.type = "lowpass"),
      (c.frequency.value = 900),
      this.pad.connect(c).connect(this.master),
      [110, 164.8, 220, 246.9, 329.6].forEach((f, h) => {
        const m = s.createOscillator();
        ((m.type = h % 2 ? "sine" : "triangle"),
          (m.frequency.value = f),
          (m.detune.value = (Math.random() - 0.5) * 12));
        const v = s.createGain();
        v.gain.value = 0.2;
        const d = s.createOscillator();
        d.frequency.value = 0.05 + h * 0.03;
        const p = s.createGain();
        ((p.gain.value = 0.15),
          d.connect(p).connect(v.gain),
          d.start(),
          m.connect(v).connect(this.pad),
          m.start());
      }));
  }
  toggle(e) {
    if (((this.on = e), e && !this.ac))
      try {
        this.init();
      } catch {
        return ((this.on = !1), !1);
      }
    return (
      this.ac &&
        (this.ac.resume(),
        this.master.gain.setTargetAtTime(
          e ? 0.7 : 0,
          this.ac.currentTime,
          0.4,
        )),
      this.on
    );
  }
  suspend(e) {
    this.ac && (e ? this.ac.suspend() : this.on && this.ac.resume());
  }
  frame(e, s, i = 0) {
    if (!this.ac || !this.on) return;
    const a = this.ac.currentTime;
    (this.windF.frequency.setTargetAtTime(300 + e * 14, a, 0.3),
      this.windG.gain.setTargetAtTime(0.12 + e / 180, a, 0.3),
      this.rainG.gain.setTargetAtTime(s * 0.12, a, 0.5));
    const n = Math.max(0, (e - 45) / 50);
    (this.whistleF.frequency.setTargetAtTime(700 + e * 16, a, 0.3),
      this.whistleG.gain.setTargetAtTime(
        Math.min(0.09, n * 0.05 + i * n * 0.05),
        a,
        0.4,
      ));
  }
  bond(e) {
    if (!this.ac || !this.on) return;
    const s = this.ac.currentTime;
    (this.bondO.frequency.setTargetAtTime(196 * Math.pow(2, e * 1.5), s, 0.1),
      this.bondG.gain.setTargetAtTime(e > 0.01 ? 0.03 + e * 0.05 : 0, s, 0.15));
  }
  call() {
    if (!this.ac || !this.on) return;
    const e = this.ac,
      s = e.currentTime,
      i = e.createOscillator(),
      a = e.createOscillator(),
      n = e.createGain(),
      r = e.createGain();
    ((i.type = "sawtooth"),
      i.frequency.setValueAtTime(520, s),
      i.frequency.exponentialRampToValueAtTime(340, s + 0.25),
      i.frequency.exponentialRampToValueAtTime(620, s + 0.7),
      (a.frequency.value = 38),
      (n.gain.value = 60),
      a.connect(n).connect(i.frequency));
    const o = e.createBiquadFilter();
    ((o.type = "lowpass"),
      (o.frequency.value = 1600),
      r.gain.setValueAtTime(0, s),
      r.gain.linearRampToValueAtTime(0.08, s + 0.05),
      r.gain.setTargetAtTime(1e-4, s + 0.55, 0.12),
      i.connect(o).connect(r).connect(this.master),
      i.start(s),
      a.start(s),
      i.stop(s + 1.1),
      a.stop(s + 1.1));
  }
  roll(e) {
    if (!this.ac || !this.on) return;
    const s = this.ac,
      i = s.currentTime,
      a = (s.sampleRate * 0.85) | 0,
      n = s.createBuffer(1, a, s.sampleRate),
      r = n.getChannelData(0);
    for (let h = 0; h < a; h++)
      r[h] = (Math.random() * 2 - 1) * Math.sin((Math.PI * h) / a);
    const o = s.createBufferSource();
    o.buffer = n;
    const l = s.createBiquadFilter();
    ((l.type = "bandpass"),
      (l.Q.value = 2.5),
      l.frequency.setValueAtTime(300, i),
      l.frequency.exponentialRampToValueAtTime(1400, i + 0.4),
      l.frequency.exponentialRampToValueAtTime(350, i + 0.85));
    const c = s.createGain();
    c.gain.value = 0.3;
    let f = c;
    if (s.createStereoPanner) {
      const h = s.createStereoPanner();
      (h.pan.setValueAtTime(-e * 0.8, i),
        h.pan.linearRampToValueAtTime(e * 0.8, i + 0.85),
        c.connect(h),
        (f = h));
    }
    (o.connect(l).connect(c), f.connect(this.master), o.start(i));
  }
  stall() {
    if (!this.ac || !this.on) return;
    const e = this.ac,
      s = e.currentTime;
    for (let i = 0; i < 4; i++) {
      const a = s + i * 0.09,
        n = e.createOscillator(),
        r = e.createGain();
      ((n.type = "square"),
        n.frequency.setValueAtTime(140 - i * 12, a),
        r.gain.setValueAtTime(0, a),
        r.gain.linearRampToValueAtTime(0.035, a + 0.01),
        r.gain.exponentialRampToValueAtTime(1e-4, a + 0.07));
      const o = e.createBiquadFilter();
      ((o.type = "lowpass"),
        (o.frequency.value = 600),
        n.connect(o).connect(r).connect(this.master),
        n.start(a),
        n.stop(a + 0.08));
    }
  }
  reins(e) {
    if (!this.ac || !this.on) return;
    const s = this.ac,
      i = s.currentTime;
    (e ? [392, 587.3] : [587.3, 392]).forEach((n, r) => {
      const o = s.createOscillator(),
        l = s.createGain(),
        c = i + r * 0.09;
      ((o.type = "triangle"),
        (o.frequency.value = n),
        l.gain.setValueAtTime(0, c),
        l.gain.linearRampToValueAtTime(0.06, c + 0.01),
        l.gain.exponentialRampToValueAtTime(1e-4, c + 0.35),
        o.connect(l).connect(this.master),
        o.start(c),
        o.stop(c + 0.4));
    });
  }
  horn() {
    if (!this.ac || !this.on) return;
    const e = this.ac,
      s = e.currentTime,
      i = e.createBiquadFilter(),
      a = e.createGain();
    ((i.type = "lowpass"),
      i.frequency.setValueAtTime(400, s),
      i.frequency.linearRampToValueAtTime(1800, s + 0.5),
      a.gain.setValueAtTime(0, s),
      a.gain.linearRampToValueAtTime(0.09, s + 0.25),
      a.gain.setTargetAtTime(1e-4, s + 0.9, 0.2),
      i.connect(a).connect(this.master),
      [146.8, 220, 293.7].forEach((n, r) => {
        const o = e.createOscillator();
        ((o.type = "sawtooth"),
          (o.frequency.value = n),
          (o.detune.value = (r - 1) * 6),
          o.connect(i),
          o.start(s + r * 0.12),
          o.stop(s + 1.8));
      }));
  }
  shutter() {
    if (!this.ac || !this.on) return;
    const e = this.ac,
      s = e.currentTime;
    [0, 0.07].forEach((i, a) => {
      const n = (e.sampleRate * 0.03) | 0,
        r = e.createBuffer(1, n, e.sampleRate),
        o = r.getChannelData(0);
      for (let h = 0; h < n; h++)
        o[h] = (Math.random() * 2 - 1) * Math.pow(1 - h / n, 3);
      const l = e.createBufferSource();
      l.buffer = r;
      const c = e.createBiquadFilter();
      ((c.type = "bandpass"),
        (c.frequency.value = a ? 2600 : 3800),
        (c.Q.value = 1.2));
      const f = e.createGain();
      ((f.gain.value = 0.35),
        l.connect(c).connect(f).connect(this.master),
        l.start(s + i));
    });
  }
  thump(e) {
    if (!this.ac || !this.on) return;
    const s = this.ac,
      i = s.currentTime,
      a = s.createOscillator(),
      n = s.createGain();
    ((a.type = "sine"),
      a.frequency.setValueAtTime(110, i),
      a.frequency.exponentialRampToValueAtTime(38, i + 0.35),
      n.gain.setValueAtTime(0.5 * e, i),
      n.gain.exponentialRampToValueAtTime(0.001, i + 0.45),
      a.connect(n).connect(this.master),
      a.start(i),
      a.stop(i + 0.5),
      this.whoosh(e * 1.5));
  }
  spray() {
    if (!this.ac || !this.on) return;
    const e = this.ac,
      s = (e.sampleRate * 0.35) | 0,
      i = e.createBuffer(1, s, e.sampleRate),
      a = i.getChannelData(0);
    for (let l = 0; l < s; l++)
      a[l] = (Math.random() * 2 - 1) * Math.pow(1 - l / s, 2);
    const n = e.createBufferSource();
    n.buffer = i;
    const r = e.createBiquadFilter();
    ((r.type = "highpass"), (r.frequency.value = 2400));
    const o = e.createGain();
    ((o.gain.value = 0.12),
      n.connect(r).connect(o).connect(this.master),
      n.start());
  }
  chirp() {
    if (!this.ac || !this.on) return;
    const e = this.ac,
      s = e.currentTime,
      i = e.createOscillator(),
      a = e.createGain(),
      n = 1800 + Math.random() * 2400;
    (i.frequency.setValueAtTime(n, s),
      i.frequency.exponentialRampToValueAtTime(
        n * (0.6 + Math.random() * 0.9),
        s + 0.12,
      ),
      a.gain.setValueAtTime(0, s),
      a.gain.linearRampToValueAtTime(0.025, s + 0.01),
      a.gain.exponentialRampToValueAtTime(1e-4, s + 0.18),
      i.connect(a).connect(this.master),
      i.start(s),
      i.stop(s + 0.2));
  }
  whoosh(e) {
    if (!this.ac || !this.on) return;
    const s = this.ac,
      i = (s.sampleRate * 0.5) | 0,
      a = s.createBuffer(1, i, s.sampleRate),
      n = a.getChannelData(0);
    for (let c = 0; c < i; c++)
      n[c] = (Math.random() * 2 - 1) * Math.sin((Math.PI * c) / i);
    const r = s.createBufferSource();
    r.buffer = a;
    const o = s.createBiquadFilter();
    ((o.type = "bandpass"), (o.frequency.value = 320), (o.Q.value = 0.8));
    const l = s.createGain();
    ((l.gain.value = 0.22 * e),
      r.connect(o).connect(l).connect(this.master),
      r.start());
  }
  chime(e = 0) {
    if (!this.ac || !this.on) return;
    const s = this.ac,
      i = s.currentTime;
    [523.3, 659.3, 784, 1046.5].forEach((a, n) => {
      const r = s.createOscillator(),
        o = s.createGain();
      ((r.type = "sine"), (r.frequency.value = a * Math.pow(2, e / 12)));
      const l = i + n * 0.06;
      (o.gain.setValueAtTime(0, l),
        o.gain.linearRampToValueAtTime(0.05, l + 0.01),
        o.gain.exponentialRampToValueAtTime(1e-4, l + 0.9),
        r.connect(o).connect(this.master),
        r.start(l),
        r.stop(l + 1));
    });
  }
  song(e) {
    if (!this.ac || !this.on) return;
    const s = this.ac,
      i = s.currentTime,
      a = 0.06 + e * 0.22,
      n = s.createBiquadFilter();
    ((n.type = "lowpass"), (n.frequency.value = 900), (n.Q.value = 3));
    const r = s.createGain();
    ((r.gain.value = a), n.connect(r).connect(this.master));
    const o = [
      [0, 2.2, 92, 64],
      [2, 2, 70, 128],
      [3.8, 3.2, 118, 58],
    ];
    for (const [d, p, x, y] of o) {
      const g = i + d,
        S = s.createOscillator(),
        w = s.createOscillator(),
        M = s.createGain(),
        T = s.createOscillator(),
        E = s.createGain();
      ((S.type = "sawtooth"),
        (w.type = "sine"),
        S.frequency.setValueAtTime(x, g),
        S.frequency.exponentialRampToValueAtTime(y, g + p),
        w.frequency.setValueAtTime(x * 0.5, g),
        w.frequency.exponentialRampToValueAtTime(y * 0.5, g + p),
        (T.frequency.value = 4.5),
        (E.gain.value = x * 0.025),
        T.connect(E),
        E.connect(S.frequency),
        M.gain.setValueAtTime(0, g),
        M.gain.linearRampToValueAtTime(0.5, g + p * 0.3),
        M.gain.linearRampToValueAtTime(1e-4, g + p),
        S.connect(M),
        w.connect(M),
        M.connect(n),
        S.start(g),
        w.start(g),
        T.start(g),
        S.stop(g + p + 0.05),
        w.stop(g + p + 0.05),
        T.stop(g + p + 0.05));
    }
    const l = s.createOscillator(),
      c = s.createGain(),
      f = s.createBiquadFilter(),
      h = i + 1.4;
    ((l.type = "triangle"),
      (f.type = "bandpass"),
      (f.frequency.value = 600),
      (f.Q.value = 4),
      l.frequency.setValueAtTime(380, h),
      l.frequency.exponentialRampToValueAtTime(620, h + 1.1),
      l.frequency.exponentialRampToValueAtTime(300, h + 2.6),
      c.gain.setValueAtTime(0, h),
      c.gain.linearRampToValueAtTime(a * 0.35, h + 0.5),
      c.gain.linearRampToValueAtTime(1e-4, h + 2.6),
      l.connect(f).connect(c).connect(this.master),
      l.start(h),
      l.stop(h + 2.7));
    const m = s.createOscillator(),
      v = s.createGain();
    (m.frequency.setValueAtTime(38, i),
      m.frequency.linearRampToValueAtTime(31, i + 6),
      v.gain.setValueAtTime(0, i),
      v.gain.linearRampToValueAtTime(a * 1.2, i + 1.5),
      v.gain.linearRampToValueAtTime(1e-4, i + 7),
      m.connect(v).connect(this.master),
      m.start(i),
      m.stop(i + 7.1));
  }
  thunder(e) {
    if (!this.ac || !this.on) return;
    const s = this.ac,
      i = s.currentTime + e,
      a = s.createBufferSource();
    a.buffer = this.noiseBuffer(3, !0);
    const n = s.createBiquadFilter();
    ((n.type = "lowpass"), (n.frequency.value = 180));
    const r = s.createGain();
    (r.gain.setValueAtTime(0, i),
      r.gain.linearRampToValueAtTime(0.9, i + 0.08),
      r.gain.exponentialRampToValueAtTime(0.001, i + 2.8),
      a.connect(n).connect(r).connect(this.master),
      a.start(i));
  }
}
