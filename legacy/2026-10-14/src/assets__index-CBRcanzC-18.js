// assets__index-CBRcanzC 18 — math
// Lines 7836-9371 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
class sr {
  constructor() {
    ((this.ready = !1),
      (this.quality = "medium"),
      (this.data = null),
      (this.terrain = null),
      (this.world = null),
      (this.chunks = []),
      (this.pts = {}),
      (this.riders = []),
      (this.levFollow = null),
      (this.levEscort = null),
      (this.inWake = !1),
      (this.heardSong = !1),
      (this.seeds = null),
      (this.race = null),
      (this.birds = null),
      (this.sound = new ka()),
      (this.input = new Pa()),
      (this.rig = new Ca((e, s) => this.unocclude(e, s))),
      (this.solids = null),
      (this.pin = null),
      (this.skyMat = ji()),
      (this.sky = new $(new wt(4600, 48, 24), this.skyMat)),
      (this.waterMat = Hi(this.skyMat)),
      (this.water = new $(
        new Ai(9e3, 9e3).rotateX(-Math.PI / 2),
        this.waterMat,
      )),
      (this.fallMat = Gi()),
      (this.rain = Vi(5e3)),
      (this.sun = new Ei(16777215, 2)),
      (this.hemi = new zi(16777215, 2236962, 1)),
      (this.birdMat = ve({ roughness: 0.7, side: le }, { base: 0.4, k: 1.2 })),
      (this.post = null),
      (this.grass = null),
      (this.trails = new Xn()),
      (this.speedLines = Zn()),
      (this.splash = new Qn()),
      (this.fieldTex = null),
      (this.mapCanvas = null),
      (this.gfx = null),
      (this.tod = 0.5),
      (this.cycleP = 0.25),
      (this.flash = 0),
      (this.boltT = 6),
      (this.bondT = 0),
      (this.bondHold = !1),
      (this.hudT = 0),
      (this.fps = { acc: 0, n: 0, t: 0 }),
      (this.dpr = 1),
      (this.maxDpr = 1.5),
      (this.dprHold = 0),
      (this.chirpT = 0),
      (this.sprayT = 0),
      (this.captureNext = !1),
      (this.worker = null),
      (this.reqId = 0),
      (this.sunDir = new q(0, 1, 0)),
      (this.lastImpact = 0),
      (this.lastTrick = 0),
      (this.pausedAt = 0),
      (this.lockLostAt = -1e9),
      (this.stallT = 0),
      (this.drag = null),
      (this.lastDrag = 0),
      (this.labels = []),
      (this.minimap = null),
      (this.compass = null),
      (this.miniT = 0));
  }
  attach(e, s, i, a) {
    if (this.ready) return;
    ((this.gl = e),
      (this.scene = s),
      (this.camera = i),
      (this.quality = a),
      (i.near = 0.3),
      (i.far = 9500),
      (i.fov = 60),
      i.updateProjectionMatrix(),
      (s.fog = new Ri(0, 5e-4)),
      (this.sky.renderOrder = -10),
      (this.sky.frustumCulled = !1),
      (this.water.position.y = fe),
      (this.water.receiveShadow = !0));
    const n = this.sun.shadow;
    (n.mapSize.set(2048, 2048),
      Object.assign(n.camera, {
        left: -230,
        right: 230,
        top: 230,
        bottom: -230,
        near: 1,
        far: 3200,
      }),
      (n.bias = -4e-4),
      (n.normalBias = 0.8),
      s.add(
        this.sky,
        this.water,
        this.sun,
        this.sun.target,
        this.hemi,
        this.rain,
        this.trails.mesh,
        this.speedLines,
        this.splash.points,
      ),
      (this.leviathan = new Sa(a)),
      s.add(this.leviathan.group));
    const r = a === "low" ? 0 : 1,
      o = Yn(Math.min(8, e.capabilities.getMaxAnisotropy()));
    ((this.mats = {
      terrain: ve(
        { roughness: 0.95 },
        { ripple: !0, k: 1.5, detail: 0.07, bump: 0.55 * r, bumpF: 0.18 },
      ),
      outer: ve({ roughness: 1 }),
      rock: ve(
        { roughness: 0.92 },
        { k: 0.75, speck: 0.36, detail: 0.05, bump: 0.9 * r, bumpF: 0.22 },
      ),
      elder: ve(
        { roughness: 0.9, side: le, map: o, alphaTest: 0.5 },
        { k: 1.5, speck: 0.4, detail: 0.06, leaf: !0 },
      ),
      tree: ve(
        { roughness: 0.85, side: le, map: o, alphaTest: 0.5 },
        { k: 1.5, sway: 0.6, swayH: 50, speck: 0.6, detail: 0.2, leaf: !0 },
      ),
      flora: ve(
        { roughness: 0.7, side: le },
        { k: 1.8, ripple: !0, sway: 0.12, swayH: 2.5 },
      ),
      grass: ve(
        { roughness: 0.9, side: le },
        { k: 1.2, ripple: !0, sway: 0.35, swayH: 1.6 },
      ),
      vine: ve({ roughness: 0.9 }, { k: 1.5, sway: 1.2, swayH: 1, hang: !0 }),
      tendril: ve(
        { roughness: 0.6 },
        { base: 0.15, k: 1.4, sway: 2.2, swayH: 1, hang: !0 },
      ),
    }),
      (this.wilds = new aa(s)),
      this.bindPointer(e.domElement),
      this.armSound(),
      (this.input.onLockLost = () => {
        this.lockLostAt = performance.now();
      }),
      this.applyGfx(b.getState().gfx),
      (this.ready = !0));
  }
  applyGfx(e) {
    if (e === this.gfx) return;
    this.gfx = e;
    const s = e !== "fast";
    (s &&
      !this.post &&
      (this.post = new $n(
        this.gl,
        this.scene,
        this.camera,
        e === "high" ? 4 : 2,
      )),
      this.post && (this.post.msaa = e === "high" ? 4 : 2),
      (this.gl.toneMapping = s ? Fi : Ni));
    const i = e === "high";
    ((this.gl.shadowMap.enabled = i),
      (this.gl.shadowMap.type = Bi),
      (this.sun.castShadow = i),
      this.scene.traverse((n) => {
        const r = n.material;
        r && [r].flat().forEach((o) => (o.needsUpdate = !0));
      }),
      this.grass &&
        (this.scene.remove(this.grass.mesh),
        this.grass.mesh.geometry.dispose(),
        this.grass.mesh.material.dispose(),
        (this.grass = null)));
    const a =
      e === "fast"
        ? this.quality === "low"
          ? 14e3
          : 24e3
        : e === "balanced"
          ? 6e4
          : 13e4;
    ((this.grass = Kn(a, e === "high" ? 150 : e === "balanced" ? 120 : 80)),
      this.scene.add(this.grass.mesh),
      (this.maxDpr =
        e === "high"
          ? Math.min(devicePixelRatio, 2)
          : e === "balanced"
            ? Math.min(devicePixelRatio, 1.5)
            : Math.min(devicePixelRatio, 1) * 0.85),
      (this.dpr = Math.min(this.dpr, this.maxDpr)));
  }
  grow(e, s) {
    (b.setState({ loading: !0, loadMsg: `Growing seed ${e}…`, error: null }),
      this.worker ??
        (this.worker = new Worker(
          new URL("/assets/worker-BdHOuDMt.js", import.meta.url),
          { type: "module" },
        )));
    const i = ++this.reqId;
    return new Promise((a) => {
      ((this.worker.onmessage = (n) => {
        if (n.data.id === i) {
          if (n.data.error || !n.data.world)
            return (
              b.setState({
                error: n.data.error || "Generation failed",
                loadMsg: "This device could not grow the world.",
              }),
              a()
            );
          (this.build(n.data.world), b.setState({ loading: !1 }), a());
        }
      }),
        this.worker.postMessage({ seed: e, quality: s, id: i }));
    });
  }
  disposeWorld() {
    this.world &&
      (this.world.traverse((e) => {
        const s = e;
        (s.geometry && s.geometry.dispose(),
          e.isPoints && e.material.dispose());
      }),
      this.seeds?.dispose(this.world),
      this.race?.dispose(this.world),
      this.scene.remove(this.world),
      (this.world = null),
      (this.chunks = []),
      this.fieldTex?.dispose());
  }
  build(e) {
    (this.disposeWorld(), (this.data = e));
    const s = new Di(Vs(e.seed), e.regions, e.seg);
    ((s.heights = e.heights), (this.terrain = s));
    const i = (this.world = new Se());
    this.scene.add(i);
    const a = e.seg + 1,
      n = new Zt(e.field, a, a, Qt, Bs);
    ((n.minFilter = n.magFilter = _s),
      (n.generateMipmaps = !1),
      (n.needsUpdate = !0),
      (this.fieldTex = n),
      (A.uField.value = n),
      A.uFieldInfo.value.set(oe, a, oe / e.seg, 0));
    const r = document.createElement("canvas");
    ((r.width = r.height = Ge),
      r
        .getContext("2d")
        .putImageData(
          new ImageData(new Uint8ClampedArray(e.map), Ge, Ge),
          0,
          0,
        ),
      (this.mapCanvas = r));
    const o = new $(Et(e.terrain), this.mats.terrain);
    ((o.receiveShadow = !0), i.add(o, new $(Et(e.outer), this.mats.outer)));
    const l = e.geos.map(Et);
    for (const g of e.meshes) {
      const S = new $(l[g.geo], this.mats[g.mat]);
      (S.position.set(...g.pos),
        (S.rotation.y = g.rotY),
        S.scale.setScalar(g.scale),
        (S.matrixAutoUpdate = !1),
        S.updateMatrix(),
        (S.castShadow = S.receiveShadow = !0),
        i.add(S));
    }
    for (const g of e.chunks) {
      const S = g.matrices.length / 16,
        w = new We(l[g.geo], this.mats[g.mat], S);
      ((w.instanceMatrix = new Je(g.matrices, 16)),
        g.colors && (w.instanceColor = new Je(g.colors, 3)),
        (w.boundingSphere = new mt(new q(...g.center), g.radius)),
        (w.userData = {
          c: new q(...g.center),
          r: g.radius,
          max: g.maxDist,
          grass: g.grass,
        }),
        (w.matrixAutoUpdate = !1),
        (w.castShadow = g.mat === "tree" || g.mat === "rock"),
        (w.receiveShadow = g.mat !== "tendril"),
        this.chunks.push(w),
        i.add(w));
    }
    if (e.falls.index.length) {
      const g = new ae();
      (g.setAttribute("position", new D(e.falls.position, 3)),
        g.setAttribute("uv", new D(e.falls.uv, 2)),
        g.setIndex(new D(e.falls.index, 1)),
        g.computeBoundingSphere());
      const S = new $(g, this.fallMat);
      ((S.renderOrder = 2), i.add(S));
    }
    const c = (g, S) => {
      const w = new ae();
      (w.setAttribute("position", new D(g.position, 3)),
        w.setAttribute("aSize", new D(g.size, 1)),
        w.setAttribute("aPhase", new D(g.phase, 1)),
        w.setAttribute("aColor", new D(g.color, 3)));
      const M = qs(S),
        T = new vt(w, M);
      return ((T.frustumCulled = !1), i.add(T), { pts: T, mat: M });
    };
    this.pts.ff = c(e.points.ff, !0).mat;
    const f = c(e.points.halo, !0);
    ((f.mat.uniforms.uBlink.value = 0.35),
      (f.mat.uniforms.uDrift.value = 0),
      (this.pts.halo = f.mat));
    const h = c(e.points.mist, !1);
    ((h.mat.uniforms.uBlink.value = 0),
      (h.mat.uniforms.uDrift.value = 3),
      (h.mat.uniforms.uFar.value = 2e-4),
      (h.pts.renderOrder = 3),
      (this.pts.mist = h.mat),
      (this.birds = new tr(
        i,
        [e.regions.PK, e.regions.PL, e.regions.LK, e.regions.TR].map(
          (g) =>
            new q(g.x, s.surface(g.x, g.z) + 180 + Math.random() * 160, g.z),
        ),
        this.birdMat,
      )),
      (this.seeds = new Ma(i, e.seeds, X.get(`seeds-${e.seed}`, []))),
      (this.race = new Ta(i, e.rings)),
      this.wilds.build(e.seed, e.flocks),
      this.leviathan.build(e.seed, s, e.isles, e.elder),
      (this.levFollow = null));
    const [m, v, d] = e.elder;
    ((this.solids = {
      isles: e.isles,
      arches: e.arches.map((g) => {
        const S = new q(...g.ax);
        return {
          base: new q(...g.c).add(new q(0, -g.R * 0.45, 0)),
          side: new q(S.z, 0, -S.x),
          R: g.R,
          tube: g.tube,
        };
      }),
      pillars: e.obstacles
        .filter((g) => g.t === "c" && Math.hypot(g.x - m, g.z - d) > 5)
        .map((g) => ({ x: g.x, z: g.z, r: (g.r / 1.4) * 1.08, top: g.top })),
      elder: { x: m, y: v, z: d },
      movers: this.leviathan.spheres,
    }),
      this.riders.length ||
        (this.riders = ke.map((g, S) => new sa(g, S, this.scene))));
    const p = X.get("rider-pal", {}),
      x = b.getState().manual,
      y = b.getState().sel;
    (this.riders.forEach((g, S) => {
      ((g.manual = x && S === y), (g.follow = null), (g.cruiseOverride = null));
      const w = p[S] && this.allPalettes().find((M) => M.id === p[S]);
      (w && w.id !== g.pal.id && g.setPalette(w),
        g.spawn(this.flight, S % e.places.length));
    }),
      x && this.input.syncAim(this.riders[y].yaw, this.riders[y].pitch),
      (this.pin = null),
      this.trails.reset(),
      (this.rig.snap = !0),
      b.setState({
        seed: e.seed,
        places: e.places.map((g) => ({ name: g.name, sub: g.sub })),
        stats: e.stats,
        race: {
          active: !1,
          next: 0,
          total: e.rings.length,
          time: 0,
          best: X.get(`best-${e.seed}`, null),
          last: null,
        },
        seeds: {
          got: this.seeds.got.size,
          total: e.seeds.length,
          nearest: null,
        },
      }),
      this.syncPalettes());
  }
  get flight() {
    return {
      terrain: this.terrain,
      obstacles: this.data.obstacles,
      places: this.data.places,
      solids: this.solids,
      assist: b.getState().assist,
    };
  }
  allPalettes() {
    const e = X.get("seed-total", 0),
      s = X.get("bonded", []);
    return [
      ...ke.map((i) => i.pal),
      ...ps.filter((i) => e >= i.at).map((i) => i.pal),
      ...s,
    ];
  }
  syncPalettes() {
    b.setState({
      palettes: this.allPalettes(),
      riderPal: this.riders.map((e) => e.pal.id),
    });
  }
  applyPalette(e) {
    const s = this.allPalettes().find((n) => n.id === e),
      i = this.cur;
    if (!s || !i) return;
    (i.setPalette(s), this.trails.reset());
    const a = X.get("rider-pal", {});
    ((a[i.i] = e), X.set("rider-pal", a), this.syncPalettes());
  }
  get cur() {
    return this.riders[b.getState().sel];
  }
  select(e) {
    const s = b.getState();
    if (e === s.sel || !this.riders[e]) return;
    s.race.active && this.stopRace();
    const i = this.riders[s.sel],
      a = this.riders[e];
    (i && ((i.manual = !1), i.resetSmoothing()),
      s.manual &&
        ((a.manual = !0),
        (a.follow = null),
        (a.cruiseOverride = null),
        this.input.syncAim(a.yaw, a.pitch)),
      b.setState({ sel: e }),
      (this.rig.snap = !0),
      this.trails.reset(),
      Y(ke[e].name, "riding " + this.riders[e].pal.name));
  }
  cycleCam(e = 1) {
    const s = b.getState().cam;
    this.setCam(ht[(ht.indexOf(s) + e + ht.length) % ht.length]);
  }
  setCam(e) {
    (b.setState({ cam: e }), (this.rig.snap = !0));
  }
  reins(e) {
    const s = this.cur;
    s &&
      ((s.manual = e),
      s.resetSmoothing(),
      e
        ? ((s.follow = null),
          (s.cruiseOverride = null),
          (s.stamina = 1),
          this.input.syncAim(s.yaw, s.pitch),
          b.getState().touch || this.input.requestLock(this.gl.domElement),
          (b.getState().cam === "cinema" || b.getState().cam === "orbit") &&
            this.setCam("chase"))
        : this.input.releaseLock(),
      s.manual !== b.getState().manual && this.sound.reins(e),
      b.setState({ manual: e }));
  }
  flyTo(e, s) {
    const i = () => {
      const a = this.cur;
      !a ||
        !this.data ||
        (b.getState().race.active && this.stopRace(),
        (a.follow = null),
        (a.cruiseOverride = null),
        a.spawn(this.flight, e),
        a.nextTarget(this.flight),
        (this.rig.snap = !0),
        this.trails.reset(),
        Y(this.data.places[e].name, this.data.places[e].sub));
    };
    s ? s().then(i) : i();
  }
  flyToPoint(e, s, i, a) {
    const n = this.cur,
      r = this.terrain;
    if (!n || !r) return;
    const o = new q(e, r.surface(e, s) + 55, s);
    for (let c = 0; c < 14 && this.solidAt(o); c++) o.y += 20;
    ((this.pin = o), b.getState().race.active && this.stopRace());
    const l = () => {
      if (i) {
        const c = new q(n.pos.x - o.x, 0, n.pos.z - o.z);
        (c.lengthSq() < 1 && c.set(1, 0, 0), c.normalize());
        const f = o.clone().addScaledVector(c, 220);
        ((f.y = Math.max(o.y + 30, r.surface(f.x, f.z) + 50)),
          n.placeAt(f, o.clone().sub(f)),
          (this.rig.snap = !0),
          this.trails.reset());
      }
      n.manual ||
        (n.follow = () =>
          this.pin
            ? n.pos.distanceTo(this.pin) < 60
              ? ((this.pin = null),
                (n.follow = null),
                Y("Arrived", "autopilot resumes the tour"),
                null)
              : this.pin
            : null);
    };
    (i && a ? a().then(l) : l(),
      Y(
        i ? "Jumping" : "Course set",
        `${Math.round(Math.hypot(e - n.pos.x, s - n.pos.z))} m away`,
      ));
  }
  clearPin() {
    this.pin = null;
    const e = this.cur;
    e && e.follow && (e.follow = null);
  }
  startRace(e) {
    const s = () => {
      const i = this.cur,
        a = this.race;
      if (!i || !a || !a.total) return;
      const n = a.rings[0];
      (i.placeAt(
        n.p
          .clone()
          .addScaledVector(n.n, -140)
          .add(new q(0, 6, 0)),
        n.n,
      ),
        (i.speed = 34),
        (i.stamina = 1),
        i.manual || (i.follow = () => a.aim()),
        a.begin(),
        (this.rig.snap = !0),
        this.trails.reset(),
        b.setState((r) => ({
          race: { ...r.race, active: !0, next: 0, time: 0, last: null },
        })),
        this.sound.horn(),
        Y("Skyveil Run", `${a.total} rings through the Hanging Peaks`));
    };
    e ? e().then(s) : s();
  }
  stopRace() {
    this.race?.stop();
    const e = this.cur;
    (e && (e.follow = null),
      b.setState((s) => ({ race: { ...s.race, active: !1 } })));
  }
  findFlock() {
    const e = this.cur;
    if (e) {
      if (e.manual) {
        const { mount: s } = this.wilds.nearest(e.pos);
        if (!s) return;
        ((this.pin = s.pos.clone()),
          Y(
            "Wild flock marked",
            "follow the pin on your compass, hold B when you are close",
          ));
        return;
      }
      ((e.follow = () => {
        const { mount: s } = this.wilds.nearest(e.pos);
        if (!s) return null;
        const i = new q().crossVectors(s.fwd, ii).normalize();
        return s.pos.clone().addScaledVector(s.fwd, -12).addScaledVector(i, 14);
      }),
        Y(
          "Seeking a wild flock",
          "hold B or the Bond button when you are close",
        ));
    }
  }
  findLeviathan() {
    const e = this.cur;
    if (!e) return;
    const s = this.leviathan,
      i = s.nearest(e.pos).skin;
    if (e.manual) {
      Y(
        "The Leviathan",
        `${ut(i)} away · follow the violet marker on your compass`,
      );
      return;
    }
    b.getState().race.active && this.stopRace();
    let a = 1;
    ((this.levEscort = () => {
      const n = s.frameAt(0.62);
      return (
        (a = Math.sign(e.pos.clone().sub(n.c).dot(n.side)) || a),
        n.c
          .clone()
          .addScaledVector(n.up, n.r * 0.85 + 32)
          .addScaledVector(n.side, a * 22)
      );
    }),
      (this.levFollow = () => {
        const n = this.levEscort();
        return n.distanceTo(e.pos) > 220 ? n : n.addScaledVector(s.dir, 90);
      }),
      (e.follow = this.levFollow),
      Y(
        i > 150 ? "Flying to the Leviathan" : "Riding with the Leviathan",
        i > 150 ? `${ut(i)} away` : "its slipstream carries you",
      ));
  }
  findSeed() {
    const e = this.cur;
    if (!e || !this.seeds) return;
    const s = this.seeds;
    if (e.manual) {
      const i = s.nearestOpen(e.pos);
      if (!i) return;
      ((this.pin = i.p.clone()),
        Y("Drift seed marked", "follow the pin on your compass"));
      return;
    }
    ((e.follow = () => s.nearestOpen(e.pos)?.p ?? null),
      Y("Seeking drift seeds", "your rider will fly through the nearest ones"));
  }
  async share() {
    const e = b.getState(),
      s = `${location.origin}${location.pathname}?seed=${e.seed}&rider=${e.sel + 1}&sky=${e.cycle ? "cycle" : e.sky}&weather=${e.weather}`;
    try {
      (await navigator.clipboard.writeText(s),
        Y("Link copied", "anyone opening it gets this exact world"));
    } catch {
      Y("Copy this link", s);
    }
    return s;
  }
  savePhoto() {
    ((this.captureNext = !0), this.sound.shutter());
  }
  toggleSound() {
    const e = this.sound.toggle(!b.getState().sound);
    (b.getState().paused && this.sound.suspend(!0),
      b.setState({ sound: e }),
      X.set("sound", e));
  }
  pause(e) {
    const s = b.getState();
    e !== s.paused &&
      (e
        ? ((this.pausedAt = performance.now()),
          (this.input.keys = {}),
          (this.bondHold = !1),
          this.input.releaseLock())
        : (this.race?.hold(performance.now() - this.pausedAt),
          s.manual && !s.touch && this.input.requestLock(this.gl.domElement)),
      this.sound.suspend(e),
      b.setState({ paused: e }));
  }
  pollPaused() {
    for (const e of this.input.pollPad()) e === "reins" && this.pause(!1);
  }
  armSound() {
    if (!X.get("sound", !0)) return;
    const e = ["pointerdown", "keydown", "touchstart"],
      s = (i) => {
        (e.forEach((a) => window.removeEventListener(a, s, !0)),
          !(i.code === "KeyO" || i.target?.closest?.("[data-sound]")) &&
            (b.getState().sound || b.setState({ sound: this.sound.toggle(!0) }),
            b.getState().paused && this.sound.suspend(!0)));
      };
    e.forEach((i) => window.addEventListener(i, s, !0));
  }
  bond() {
    const e = this.cur,
      { mount: s } = this.wilds.nearest(e.pos);
    if (!s) return;
    const i = e.pal,
      a = s.pal;
    (e.setPalette(a), this.wilds.release(s, i), this.trails.reset());
    const n = X.get("bonded", []);
    !n.some((o) => o.id === a.id) &&
      !ke.some((o) => o.pal.id === a.id) &&
      (n.push(a), X.set("bonded", n));
    const r = X.get("rider-pal", {});
    ((r[e.i] = a.id),
      X.set("rider-pal", r),
      (e.follow = null),
      (e.cruiseOverride = null),
      this.syncPalettes(),
      this.sound.chime(7),
      this.sound.call(),
      Y(`Bonded with ${a.name}`, `${i.name} returns to the wild`));
  }
  bindPointer(e) {
    (e.addEventListener("pointerdown", (i) => {
      if (
        this.cur?.manual &&
        i.pointerType === "mouse" &&
        !this.input.locked &&
        !this.input.lockFailed
      ) {
        this.input.requestLock(e);
        return;
      }
      this.input.locked ||
        ((this.drag = {
          x: i.clientX,
          y: i.clientY,
          sx: i.clientX,
          sy: i.clientY,
        }),
        e.setPointerCapture(i.pointerId),
        e.classList.add("drag"));
    }),
      e.addEventListener("pointermove", (i) => {
        if (this.input.locked) return;
        if (!this.drag) {
          e.classList.toggle("hover", this.pick(i) >= 0);
          return;
        }
        const a = i.clientX - this.drag.x,
          n = i.clientY - this.drag.y;
        if (
          ((this.drag.x = i.clientX),
          (this.drag.y = i.clientY),
          (this.lastDrag = performance.now()),
          this.cur?.manual && i.pointerType === "mouse")
        ) {
          ((this.input.drag.x = B((i.clientX - this.drag.sx) / 110, -1, 1)),
            (this.input.drag.y = B(-(i.clientY - this.drag.sy) / 110, -1, 1)));
          return;
        }
        this.rig.drag(a, n, b.getState().cam);
      }));
    const s = (i) => {
      if (
        (e.classList.remove("drag"),
        (this.input.drag.x = this.input.drag.y = 0),
        this.drag &&
          Math.hypot(i.clientX - this.drag.sx, i.clientY - this.drag.sy) < 6)
      ) {
        const a = this.pick(i);
        a >= 0 && this.select(a);
      }
      this.drag = null;
    };
    (e.addEventListener("pointerup", s),
      e.addEventListener("pointercancel", s),
      e.addEventListener("wheel", (i) => this.rig.zoom(i.deltaY), {
        passive: !0,
      }));
  }
  pick(e) {
    const s = this.gl.domElement.getBoundingClientRect(),
      i = new _i();
    i.setFromCamera(
      new I(
        ((e.clientX - s.left) / s.width) * 2 - 1,
        -((e.clientY - s.top) / s.height) * 2 + 1,
      ),
      this.camera,
    );
    let a = -1,
      n = 1 / 0;
    return (
      this.riders.forEach((r, o) => {
        const l = r.pos.clone().sub(i.ray.origin).dot(i.ray.direction);
        if (l < 0) return;
        i.ray.distanceToPoint(r.pos) < Math.max(9, l * 0.025) &&
          l < n &&
          ((n = l), (a = o));
      }),
      a
    );
  }
  solidAt(e) {
    return !this.data || !this.terrain
      ? !1
      : e.y < this.terrain.surface(e.x, e.z) + 3
        ? !0
        : this.data.obstacles.some((s) =>
            s.t === "s"
              ? Math.hypot(e.x - s.x, e.y - s.y, e.z - s.z) < s.r
              : e.y < s.top && Math.hypot(e.x - s.x, e.z - s.z) < s.r,
          );
  }
  camBlocked(e) {
    const s = this.solids;
    if (!s) return !1;
    for (const [r, o, l, c] of s.isles) {
      const f = Math.hypot(e.x - r, e.z - l);
      if (f > c * 1.35 + 4 || e.y > o + c * 0.45 + 4 || e.y < o - c * 2.2)
        continue;
      const h = Math.min(1, f / (c * 1.35));
      if (
        e.y < o + c * 0.4 * (1 - h * h) + 4 &&
        e.y > o - c * 2.1 * Math.pow(1 - h, 0.8) - 2
      )
        return !0;
    }
    for (const r of s.pillars)
      if (e.y < r.top + 4 && Math.hypot(e.x - r.x, e.z - r.z) < r.r * 1.35 + 3)
        return !0;
    for (const [r, o, l, c] of s.movers)
      if (Math.hypot(e.x - r, e.y - o, e.z - l) < c * 1.2 + 4) return !0;
    const i = s.elder,
      a = e.x - i.x,
      n = e.z - i.z;
    return (
      (a * a + n * n) / (128 * 128) + (e.y - i.y - 162) ** 2 / (55 * 55) < 1
    );
  }
  unocclude(e, s) {
    if (!this.data) return;
    const i = new q(),
      a = (o) => {
        for (let l = 2; l <= 12; l++)
          if ((i.lerpVectors(e, o, l / 12), this.camBlocked(i))) return !1;
        return !0;
      };
    if (a(s)) return;
    const n = e.distanceTo(s),
      r = s.clone().add(new q(0, n * 0.7, 0));
    if (a(r)) {
      s.copy(r);
      return;
    }
    for (const o of [0.7, 0.5, 0.35]) {
      const l = new q().lerpVectors(e, r, o);
      if (a(l)) {
        s.copy(l);
        return;
      }
    }
    s.lerpVectors(e, s, 0.35);
  }
  update(e) {
    if (!this.data || !this.terrain) return;
    const s = b.getState();
    s.gfx !== this.gfx && this.applyGfx(s.gfx);
    const i = this.terrain,
      a = (A.uTime.value += e);
    for (const C of this.input.pollPad())
      (C === "reins" && this.reins(!s.manual),
        C === "camera" && this.cycleCam(),
        C === "next" && this.select((s.sel + 1) % this.riders.length),
        C === "prev" &&
          this.select((s.sel + this.riders.length - 1) % this.riders.length),
        C === "map" && b.setState({ mapOpen: !s.mapOpen }));
    let n = s.sky;
    (s.cycle &&
      ((this.cycleP = (this.cycleP + e / 240) % 1),
      (n = 1 - Math.abs(Math.cos(this.cycleP * Math.PI)))),
      (this.tod = s.cycle ? n : F(this.tod, n, 1 - Math.exp(-e * 1.4))));
    const r = $i(this.tod, s.weather, e);
    (s.weather === "storm" &&
      ((this.boltT -= e),
      this.boltT < 0 &&
        ((this.flash = 1),
        (this.boltT = 4 + Math.random() * 9),
        this.sound.thunder(0.4 + Math.random() * 1.8))),
      (this.flash *= Math.exp(-e * 5)));
    const o = this.flash * (0.6 + 0.4 * Math.sin(a * 60)),
      l = this.sunDir
        .set(
          Math.cos(r.el) * Math.sin(r.az),
          Math.sin(r.el),
          Math.cos(r.el) * Math.cos(r.az),
        )
        .normalize(),
      c = this.skyMat.uniforms;
    (c.uZen.value.copy(r.zen),
      c.uHor.value.copy(r.hor),
      c.uSunDir.value.copy(l),
      c.uSunC.value.copy(r.sunC),
      c.uCloud.value.copy(r.cloud),
      (c.uStars.value = r.stars),
      (c.uNight.value = be((this.tod - 0.5) * 2)),
      (c.uCover.value = r.cover),
      (c.uFlash.value = o));
    const f = this.scene.fog;
    (f.color.copy(r.fog),
      (f.density = r.fd),
      A.uSunDir.value.copy(l),
      A.uSunCol.value.copy(r.sunC).lerp(r.fog, 0.35));
    const h =
      s.weather === "mist"
        ? 2.6
        : s.weather === "rain"
          ? 1.6
          : s.weather === "storm"
            ? 1.9
            : 1;
    (A.uFogH.value.set(fe + 6, 0.011, 0.0011 * h * (1 + r.glow * 0.3)),
      (A.uFogScatter.value =
        F(0.45, 0.9, 1 - Math.abs(this.tod - 0.5) * 2) * (1 - r.cover * 0.7)),
      this.sun.color.copy(r.sunC),
      (this.sun.intensity = r.sunI),
      this.hemi.color.copy(r.hs),
      this.hemi.groundColor.copy(r.hg),
      (this.hemi.intensity = r.hi + o * 3),
      (this.gl.toneMappingExposure = r.exp + o * 0.3),
      (A.uNight.value = r.glow + this.leviathan.pulse * 0.55),
      (A.uWind.value = r.wind));
    const m = this.leviathan;
    m.update(e, a, r.glow, this.gl.getDrawingBufferSize(new I()).y * 0.5);
    const v = this.flight,
      d = this.cur,
      p = d.manual ? this.input.controls(d.yaw, d.pitch) : ms;
    (this.riders.forEach((C, K) => {
      if (C.follow && C.follow === this.levFollow && !C.manual) {
        const ie = this.levEscort(),
          he = ie.clone().sub(C.pos).dot(m.dir),
          Ee = ie.distanceTo(C.pos);
        C.cruiseOverride = Ee > 220 ? 40 : B(m.speed + he * 0.12, 19, 36);
      } else if (C.follow && C === d && !s.race.active && !C.manual) {
        const ie = C.follow();
        C.cruiseOverride = ie && ie.distanceTo(C.pos) < 40 ? 25 : null;
      } else C.follow || (C.cruiseOverride = null);
      (C.update(e, K === s.sel ? p : ms, v),
        A.uRip.value[K].set(
          C.pos.x,
          i.surface(C.pos.x, C.pos.z),
          C.pos.z,
          C.low,
        ));
    }),
      this.wilds.update(e, i, this.data.obstacles),
      this.birds?.update(a));
    const x = m.nearest(d.pos);
    if (m.sang) {
      const C = B(1 - x.skin / 1600, 0, 1);
      (this.sound.song(C),
        (!this.heardSong || C > 0.5) &&
          Y(
            "The Leviathan sings",
            C > 0.5
              ? "the whole world answers in light"
              : `${ut(x.skin)} away · press L to ride with it`,
          ),
        (this.heardSong = !0));
    }
    const y = x.skin > 0 && x.skin < 70 ? 1 - x.skin / 70 : 0,
      g = d.fwd.dot(x.frame.t);
    y > 0 &&
      g > 0.3 &&
      d.manual &&
      ((d.speed = Math.min(d.speed + 7 * y * g * e, 60)),
      (d.stamina = Math.min(1, d.stamina + e * 0.3 * y)));
    const S = y > 0.15 && g > 0.3;
    (S &&
      !this.inWake &&
      Y(
        "Leviathan's slipstream",
        d.manual
          ? "riding its wake restores stamina"
          : "gliding alongside the Leviathan",
      ),
      (this.inWake = S ? !0 : y === 0 ? !1 : this.inWake),
      d.impact > this.lastImpact + 0.15 && this.sound.thump(d.impact),
      (this.lastImpact = d.impact));
    const w = i.groundY(d.pos.x, d.pos.z) < fe && d.pos.y - fe < 5;
    if (
      ((this.sprayT -= e),
      w &&
        d.speed > 12 &&
        (this.splash.emit(
          new q(d.pos.x, fe + 0.3, d.pos.z),
          d.fwd,
          d.speed,
          d.pos.y - fe < 3 ? 6 : 2,
        ),
        this.sprayT < 0 && (this.sound.spray(), (this.sprayT = 0.4))),
      this.splash.update(e),
      this.trails.update(
        d.mount.tips,
        d.mount.body,
        new W(d.pal.glow),
        B((d.speed - 26) / 40, 0, 1) * (s.cam === "seat" ? 0.35 : 0.8),
      ),
      d.manual &&
        this.pin &&
        d.pos.distanceTo(this.pin) < 60 &&
        ((this.pin = null), Y("Arrived", "pin cleared")),
      this.seeds && this.seeds.update(d.pos) >= 0)
    ) {
      X.set(`seeds-${this.data.seed}`, [...this.seeds.got]);
      const K = X.get("seed-total", 0) + 1;
      (X.set("seed-total", K),
        this.sound.chime(this.seeds.got.size % 5),
        d.manual && (d.stamina = Math.min(1, d.stamina + 0.35)));
      const ie = ps.find((he) => he.at === K);
      ie
        ? (Y(
            `${ie.pal.name} unlocked`,
            "a new mount colourway is in the roster",
          ),
          this.syncPalettes())
        : Y(
            "Drift seed",
            `${this.seeds.got.size} of ${this.seeds.pos.length} in this world · stamina restored`,
          );
    }
    if (this.race?.active) {
      const C = this.race.update(d.pos);
      if (
        (C === "ring" &&
          (this.sound.chime(this.race.next),
          d.manual && (d.stamina = Math.min(1, d.stamina + 0.2))),
        C === "done")
      ) {
        const K = this.race.elapsed,
          ie = X.get(`best-${this.data.seed}`, null),
          he = ie == null || K < ie;
        (he && X.set(`best-${this.data.seed}`, K),
          (d.follow = null),
          this.sound.chime(12),
          Y(he ? "New best time" : "Run complete", `${K.toFixed(2)} s`),
          b.setState((Ee) => ({
            race: { ...Ee.race, active: !1, last: K, best: he ? K : ie },
          })));
      }
    }
    const M = this.wilds.nearest(d.pos);
    (this.bondHold && M.dist < 40
      ? (this.bondT += e)
      : (this.bondT = Math.max(0, this.bondT - e * 2)),
      this.bondT >= 2.5 &&
        ((this.bondT = 0), (this.bondHold = !1), this.bond()),
      this.sound.bond(this.bondT / 2.5),
      this.rig.update(e, this.camera, d, i, {
        mode: s.cam,
        photo: s.photo,
        aim: d.manual && this.input.locked ? this.input.aimDir() : null,
        dragging: !!this.drag,
        idle: performance.now() - this.lastDrag > 2500,
      }));
    const T = d.pos;
    (this.sun.position.copy(T).addScaledVector(l, 1500),
      this.sun.target.position.copy(T),
      this.sky.position.copy(this.camera.position));
    const E = this.gl.getDrawingBufferSize(new I()).y * 0.5;
    if (
      (this.pts.ff &&
        ((this.pts.ff.uniforms.uInt.value =
          0.15 + r.glow * 1.3 * (1 - r.rain * 0.6)),
        (this.pts.ff.uniforms.uScale.value = E)),
      this.pts.halo &&
        ((this.pts.halo.uniforms.uInt.value = Math.pow(r.glow, 1.4) * 0.55),
        (this.pts.halo.uniforms.uScale.value = E)),
      this.pts.mist)
    ) {
      const C = this.pts.mist.uniforms;
      (C.uTint.value.copy(r.fog).lerp(r.hor, 0.3),
        (C.uOp.value = 0.22 + r.glow * 0.06 + r.cover * 0.12),
        (C.uScale.value = E));
    }
    this.splash.material.uniforms.uScale.value = E;
    const z = this.rain.material;
    ((z.uniforms.uRain.value = r.rain),
      z.uniforms.uCam.value.copy(this.camera.position),
      z.uniforms.uColor.value.copy(r.fog).lerp(new W(1, 1, 1), 0.5),
      (this.rain.visible = r.rain > 0.01),
      (this.waterMat.uniforms.uRain.value = r.rain),
      this.grass &&
        (this.grass.uCam.value.copy(this.camera.position),
        (this.grass.mesh.visible =
          this.camera.position.y -
            i.surface(this.camera.position.x, this.camera.position.z) <
          170)));
    const _ = this.speedLines.material,
      L = s.cam === "chase" || s.cam === "seat";
    ((_.uniforms.uAmt.value = F(
      _.uniforms.uAmt.value,
      L && !s.photo ? B((d.speed - 34) / 40, 0, 1) : 0,
      1 - Math.exp(-e * 4),
    )),
      (_.uniforms.uSpeed.value = d.speed),
      _.uniforms.uColor.value
        .setRGB(1, 1, 1)
        .lerp(new W(0.5, 1, 0.9), r.glow * 0.6));
    const j = s.gfx === "fast";
    for (const C of this.chunks) {
      const K = C.userData.c.distanceTo(this.camera.position) - C.userData.r;
      C.visible =
        K < C.userData.max * (j ? 0.7 : 1) && !(C.userData.grass && j);
    }
    (this.post &&
      this.gfx !== "fast" &&
      ((this.post.bloom.luminanceMaterial.threshold = F(1.15, 0.55, r.glow)),
      (this.post.bloom.intensity = 0.5 + r.glow * 0.9 + o * 0.8),
      (this.post.grade.exposure = r.exp + o * 0.35),
      (this.post.grade.saturation = 1.06 + r.glow * 0.08),
      this.post.focus(s.photo, d.pos.distanceTo(this.camera.position))),
      this.updateLabels(s.sel, s.cam),
      (this.miniT -= e),
      this.miniT < 0 &&
        ((this.miniT = 1 / 30), this.drawMinimap(), this.drawCompass()),
      this.sound.frame(d.speed, r.rain, d.tuck),
      this.sound.on &&
        (d.flapped &&
          s.cam !== "cinema" &&
          !s.photo &&
          this.sound.whoosh(d.amp),
        d.trickRoll !== 0 &&
          this.lastTrick === 0 &&
          this.sound.roll(Math.sign(d.trickRoll)),
        (this.stallT -= e),
        d.manual &&
          d.speed < 14.5 &&
          this.stallT < 0 &&
          (this.sound.stall(), (this.stallT = 1.2)),
        (this.chirpT -= e),
        this.chirpT < 0 &&
          ((this.chirpT = 0.3 + Math.random() * (3 - r.glow * 2.2)),
          (d.low > 0.2 || r.glow > 0.4) && r.rain < 0.5 && this.sound.chirp())),
      (this.lastTrick = d.trickRoll),
      this.syncHud(e, M.mount?.pal ?? null, M.dist),
      this.adaptDpr(e));
  }
  render(e) {
    (this.post && this.gfx !== "fast"
      ? this.post.render(e)
      : this.gl.render(this.scene, this.camera),
      this.captureNext &&
        ((this.captureNext = !1),
        this.gl.domElement.toBlob((s) => {
          if (!s) return;
          const i = document.createElement("a");
          ((i.href = URL.createObjectURL(s)),
            (i.download = `aeloria-${b.getState().seed}-${Date.now()}.png`),
            i.click(),
            setTimeout(() => URL.revokeObjectURL(i.href), 2e3),
            Y("Photo saved", "check your downloads"));
        }, "image/png")));
  }
  syncHud(e, s, i) {
    if (((this.hudT -= e), this.hudT > 0 || !this.data || !this.terrain))
      return;
    this.hudT = 0.15;
    const a = this.cur,
      n = this.data.places,
      r = n.map((c) => Math.hypot(c.c[0] - a.pos.x, c.c[2] - a.pos.z));
    let o = 0;
    r.forEach((c, f) => {
      c < r[o] && (o = f);
    });
    const l = this.seeds?.nearestOpen(a.pos);
    b.setState((c) => ({
      hud: {
        alt: Math.round(a.pos.y - this.terrain.surface(a.pos.x, a.pos.z)),
        spd: Math.round(a.speed * 3.6),
        where: r[o] < 520 ? n[o].name : "Open sky",
        dists: r,
        near: o,
        fps: c.hud.fps,
        tris: this.gl.info.render.triangles,
        stamina: a.stamina,
        locked: this.input.locked,
        pad: this.input.padActive,
        pin: this.pin
          ? Math.round(Math.hypot(this.pin.x - a.pos.x, this.pin.z - a.pos.z))
          : null,
        pitch: a.pitch,
      },
      race: this.race?.active
        ? { ...c.race, next: this.race.next, time: this.race.elapsed }
        : c.race,
      bond: {
        name: s?.name ?? null,
        dist: i,
        progress: this.bondT / 2.5,
        swatch: s ? St(s) : null,
      },
      seeds: {
        got: this.seeds?.got.size ?? 0,
        total: this.seeds?.pos.length ?? 0,
        nearest: l ? Math.round(l.d) : null,
      },
    }));
  }
  adaptDpr(e) {
    const s = this.fps;
    if (((s.acc += e), s.n++, (s.t += e), (this.dprHold -= e), s.t < 2)) return;
    const i = s.n / s.acc;
    ((s.t = s.acc = s.n = 0),
      b.setState((a) => ({ hud: { ...a.hud, fps: Math.round(i) } })),
      i < 34 && this.dpr > 0.6
        ? ((this.dpr = Math.max(0.6, this.dpr - 0.15)), (this.dprHold = 10))
        : i > 56 &&
          this.dpr < this.maxDpr &&
          this.dprHold <= 0 &&
          (this.dpr = Math.min(this.maxDpr, this.dpr + 0.1)));
  }
  updateLabels(e, s) {
    const i = this.gl.domElement.clientWidth,
      a = this.gl.domElement.clientHeight,
      n = new q();
    this.riders.forEach((r, o) => {
      const l = this.labels[o];
      if (!l) return;
      n.copy(r.pos)
        .add(new q(0, 6, 0))
        .project(this.camera);
      const c = r.pos.distanceTo(this.camera.position),
        f =
          n.z < 1 &&
          Math.abs(n.x) < 1.1 &&
          Math.abs(n.y) < 1.1 &&
          c < 1600 &&
          !(o === e && (s === "seat" || s === "chase"));
      ((l.style.display = f ? "flex" : "none"),
        f &&
          (l.style.transform = `translate(${(n.x * 0.5 + 0.5) * i}px,${(-n.y * 0.5 + 0.5) * a - 14}px) translate(-50%,-100%)`));
    });
  }
  mp(e, s, i) {
    return [((e + oe / 2) / oe) * i, ((s + oe / 2) / oe) * i];
  }
  drawMinimap() {
    const e = this.minimap,
      s = this.cur;
    if (!e || !this.mapCanvas || !s || !this.data) return;
    const i = Math.min(devicePixelRatio, 2),
      a = e.clientWidth || 160,
      n = Math.round(a * i);
    (e.width !== n || e.height !== n) && (e.width = e.height = n);
    const r = e.getContext("2d"),
      o = n / 2,
      l = 520,
      c = n / 2 / l,
      f = Math.atan2(s.fwd.z, s.fwd.x),
      h = -Math.PI / 2 - f;
    (r.clearRect(0, 0, n, n),
      r.save(),
      r.beginPath(),
      r.arc(o, o, o - 1, 0, Z),
      r.clip(),
      (r.fillStyle = "#0b1a24"),
      r.fillRect(0, 0, n, n),
      r.translate(o, o),
      r.rotate(h));
    const m = oe / Ge;
    ((r.imageSmoothingEnabled = !0),
      r.drawImage(
        this.mapCanvas,
        (-oe / 2 - s.pos.x) * c,
        (-oe / 2 - s.pos.z) * c,
        Ge * m * c,
        Ge * m * c,
      ));
    const v = (p, x, y, g, S) => {
      (r.beginPath(),
        r.arc((p - s.pos.x) * c, (x - s.pos.z) * c, y * i, 0, Z),
        (r.fillStyle = g),
        r.fill(),
        S && ((r.lineWidth = 1.5 * i), (r.strokeStyle = S), r.stroke()));
    };
    (this.seeds?.pos.forEach((p, x) => {
      this.seeds.got.has(x) || v(p.x, p.z, 2.4, "#ffd36a");
    }),
      this.race?.active &&
        this.race.rings.forEach((p, x) => {
          x >= this.race.next &&
            v(
              p.p.x,
              p.p.z,
              x === this.race.next ? 4.5 : 2.5,
              x === this.race.next ? "#5ff2d6" : "rgba(95,242,214,.45)",
            );
        }));
    for (const p of this.wilds.mounts) v(p.pos.x, p.pos.z, 3, "#ff6ad5");
    for (const p of [0.15, 0.4, 0.65]) {
      const x = this.leviathan.frameAt(p);
      v(x.c.x, x.c.z, 5 - p * 4, "#b18cff");
    }
    (this.riders.forEach((p) => {
      p !== s && v(p.pos.x, p.pos.z, 3.4, p.pal.glow, "rgba(0,0,0,.5)");
    }),
      this.pin && v(this.pin.x, this.pin.z, 4.5, "#ffffff", "#5ff2d6"),
      r.restore(),
      r.save(),
      r.translate(o, o),
      (r.fillStyle = "#ffffff"),
      (r.strokeStyle = "rgba(0,0,0,.6)"),
      (r.lineWidth = 1.5 * i),
      r.beginPath(),
      r.moveTo(0, -9 * i),
      r.lineTo(6 * i, 7 * i),
      r.lineTo(0, 3.5 * i),
      r.lineTo(-6 * i, 7 * i),
      r.closePath(),
      r.fill(),
      r.stroke(),
      r.restore());
    const d = h - Math.PI / 2;
    ((r.fillStyle = "#5ff2d6"),
      (r.font = `600 ${11 * i}px "IBM Plex Mono", monospace`),
      (r.textAlign = "center"),
      (r.textBaseline = "middle"),
      r.fillText(
        "N",
        o + Math.cos(d) * (o - 11 * i),
        o + Math.sin(d) * (o - 11 * i),
      ),
      (r.lineWidth = 2 * i),
      (r.strokeStyle = "rgba(95,242,214,.55)"),
      r.beginPath(),
      r.arc(o, o, o - 1.5 * i, 0, Z),
      r.stroke());
  }
  drawCompass() {
    const e = this.compass,
      s = this.cur;
    if (!e || !s || !this.data) return;
    const i = Math.min(devicePixelRatio, 2),
      a = Math.round((e.clientWidth || 520) * i),
      n = Math.round((e.clientHeight || 40) * i);
    (e.width !== a || e.height !== n) && ((e.width = a), (e.height = n));
    const r = e.getContext("2d");
    r.clearRect(0, 0, a, n);
    const o = r.createLinearGradient(0, 0, a, 0);
    (o.addColorStop(0, "rgba(5,11,20,0)"),
      o.addColorStop(0.15, "rgba(5,11,20,.45)"),
      o.addColorStop(0.85, "rgba(5,11,20,.45)"),
      o.addColorStop(1, "rgba(5,11,20,0)"),
      (r.fillStyle = o),
      r.fillRect(0, n * 0.48, a, n * 0.52));
    const l = [],
      c = (w, M) => Math.atan2(w, -M),
      f = c(s.fwd.x, s.fwd.z),
      h = (100 * Math.PI) / 180,
      m = (w) => {
        const M = Math.atan2(Math.sin(w - f), Math.cos(w - f));
        return Math.abs(M) > h ? null : a / 2 + (M / h) * (a / 2);
      };
    ((r.textAlign = "center"), (r.textBaseline = "middle"));
    for (let w = 0; w < 360; w += 15) {
      const M = m((w * Math.PI) / 180);
      if (M == null) continue;
      const T = w % 90 === 0;
      ((r.strokeStyle = T ? "rgba(234,247,244,.9)" : "rgba(234,247,244,.35)"),
        (r.lineWidth = i),
        r.beginPath(),
        r.moveTo(M, n * 0.62),
        r.lineTo(M, n * (T ? 0.95 : 0.82)),
        r.stroke(),
        T &&
          ((r.fillStyle = w === 0 ? "#5ff2d6" : "rgba(234,247,244,.95)"),
          (r.font = `600 ${11 * i}px "IBM Plex Mono", monospace`),
          r.fillText("NESW"[w / 90], M, n * 0.36)));
    }
    const v = (w, M, T, E, z = 4) => {
        const _ = m(c(w - s.pos.x, M - s.pos.z));
        if (
          _ != null &&
          ((r.fillStyle = T),
          r.beginPath(),
          r.moveTo(_, n * 0.6),
          r.lineTo(_ - z * i, n * 0.6 - z * 1.6 * i),
          r.lineTo(_ + z * i, n * 0.6 - z * 1.6 * i),
          r.closePath(),
          r.fill(),
          E)
        ) {
          r.font = `500 ${10 * i}px Figtree, sans-serif`;
          const L = r.measureText(E).width + 8 * i,
            j = B(_, L / 2, a - L / 2);
          if (l.some(([C, K]) => j + L / 2 > C && j - L / 2 < K)) return;
          (l.push([j - L / 2, j + L / 2]),
            (r.fillStyle = "rgba(5,11,20,.55)"),
            r.fillRect(j - L / 2, 0, L, n * 0.3),
            (r.fillStyle = "rgba(234,247,244,.92)"),
            r.fillText(E, j, n * 0.15));
        }
      },
      d = b.getState().hud.near;
    if (
      (this.pin && v(this.pin.x, this.pin.z, "#ffffff", "pin", 6),
      this.race?.active)
    ) {
      const w = this.race.rings[this.race.next];
      w && v(w.p.x, w.p.z, "#5ff2d6", "next ring", 6);
    }
    const p = this.data.places
      .map((w, M) => ({
        pl: w,
        i: M,
        d: Math.hypot(w.c[0] - s.pos.x, w.c[2] - s.pos.z),
      }))
      .sort((w, M) => w.d - M.d);
    for (const { pl: w, i: M, d: T } of p)
      v(
        w.c[0],
        w.c[2],
        M === d ? "#5ff2d6" : "rgba(234,247,244,.7)",
        M === d && T < 520
          ? ""
          : `${w.name} ${T < 1e3 ? Math.round(T / 10) * 10 + " m" : (T / 1e3).toFixed(1) + " km"}`,
        3.5,
      );
    const x = this.seeds?.nearestOpen(s.pos);
    x && v(x.p.x, x.p.z, "#ffd36a", "", 4);
    const y = this.wilds.nearest(s.pos).mount;
    y && v(y.pos.x, y.pos.z, "#ff6ad5", "", 4);
    const g = this.leviathan.center,
      S = this.leviathan.nearest(s.pos).skin;
    (v(g.x, g.z, "#b18cff", S > 120 ? `Leviathan ${ut(S)}` : "", 6),
      (r.fillStyle = "#5ff2d6"),
      r.beginPath(),
      r.moveTo(a / 2, n * 0.98),
      r.lineTo(a / 2 - 5 * i, n * 0.98 + 0.1),
      r.lineTo(a / 2, n * 0.7),
      r.lineTo(a / 2 + 5 * i, n * 0.98),
      r.closePath(),
      r.fill());
  }
  drawWorldMap(e) {
    if (!this.mapCanvas || !this.data) return;
    const s = Math.min(devicePixelRatio, 2),
      i = Math.round((e.clientWidth || 600) * s);
    e.width !== i && (e.width = e.height = i);
    const a = e.getContext("2d");
    ((a.imageSmoothingEnabled = !0), a.drawImage(this.mapCanvas, 0, 0, i, i));
    const n = (o, l) => this.mp(o, l, i),
      r = (o, l = 500) => `${l} ${o * s}px Figtree, system-ui, sans-serif`;
    (this.race &&
      ((a.strokeStyle = this.race.active
        ? "rgba(95,242,214,.85)"
        : "rgba(95,242,214,.35)"),
      (a.lineWidth = 1.5 * s),
      a.setLineDash([4 * s, 4 * s]),
      a.beginPath(),
      this.race.rings.forEach((o, l) => {
        const [c, f] = n(o.p.x, o.p.z);
        l ? a.lineTo(c, f) : a.moveTo(c, f);
      }),
      a.stroke(),
      a.setLineDash([])),
      this.seeds?.pos.forEach((o, l) => {
        if (this.seeds.got.has(l)) return;
        const [c, f] = n(o.x, o.z);
        ((a.fillStyle = "#ffd36a"),
          a.beginPath(),
          a.arc(c, f, 2.6 * s, 0, Z),
          a.fill());
      }));
    for (const o of this.wilds.mounts) {
      const [l, c] = n(o.pos.x, o.pos.z);
      ((a.fillStyle = "#ff6ad5"),
        a.beginPath(),
        a.arc(l, c, 3 * s, 0, Z),
        a.fill());
    }
    {
      ((a.strokeStyle = "#b18cff"), (a.lineCap = "round"));
      for (let c = 0; c < 8; c++) {
        const f = this.leviathan.frameAt(c / 8),
          h = this.leviathan.frameAt((c + 1) / 8),
          [m, v] = n(f.c.x, f.c.z),
          [d, p] = n(h.c.x, h.c.z);
        ((a.lineWidth = (7 - c * 0.7) * s),
          a.beginPath(),
          a.moveTo(m, v),
          a.lineTo(d, p),
          a.stroke());
      }
      const [o, l] = n(this.leviathan.center.x, this.leviathan.center.z);
      ((a.font = r(12, 600)),
        (a.textAlign = "center"),
        (a.fillStyle = "#e6dcff"),
        a.fillText("Leviathan", o, l - 12 * s));
    }
    if (
      (this.data.places.forEach((o) => {
        const [l, c] = n(o.c[0], o.c[2]);
        ((a.fillStyle = "rgba(5,11,20,.55)"),
          (a.font = r(13, 600)),
          (a.textAlign = "center"));
        const f = a.measureText(o.name).width + 14 * s;
        (a.beginPath(),
          a.roundRect(l - f / 2, c - 26 * s, f, 20 * s, 10 * s),
          a.fill(),
          (a.fillStyle = "#eaf7f4"),
          a.fillText(o.name, l, c - 12 * s),
          (a.fillStyle = "#5ff2d6"),
          a.beginPath(),
          a.arc(l, c, 3 * s, 0, Z),
          a.fill());
      }),
      this.riders.forEach((o, l) => {
        const [c, f] = n(o.pos.x, o.pos.z),
          h = Math.atan2(o.fwd.z, o.fwd.x);
        (a.save(),
          a.translate(c, f),
          a.rotate(h + Math.PI / 2),
          (a.fillStyle = o.pal.glow),
          (a.strokeStyle =
            l === b.getState().sel ? "#ffffff" : "rgba(0,0,0,.6)"),
          (a.lineWidth = (l === b.getState().sel ? 2 : 1) * s));
        const m = (l === b.getState().sel ? 1.4 : 1) * s;
        (a.beginPath(),
          a.moveTo(0, -8 * m),
          a.lineTo(5.5 * m, 6 * m),
          a.lineTo(0, 3 * m),
          a.lineTo(-5.5 * m, 6 * m),
          a.closePath(),
          a.fill(),
          a.stroke(),
          a.restore(),
          (a.font = r(11)),
          (a.fillStyle = "#eaf7f4"),
          (a.textAlign = "left"),
          a.fillText(ke[l].name, c + 9 * s, f + 4 * s));
      }),
      this.pin)
    ) {
      const [o, l] = n(this.pin.x, this.pin.z);
      ((a.strokeStyle = "#ffffff"),
        (a.lineWidth = 2 * s),
        a.beginPath(),
        a.arc(o, l, 7 * s, 0, Z),
        a.stroke(),
        a.beginPath(),
        a.moveTo(o, l - 12 * s),
        a.lineTo(o, l + 12 * s),
        a.moveTo(o - 12 * s, l),
        a.lineTo(o + 12 * s, l),
        a.stroke());
    }
  }
  mapToWorld(e, s) {
    return { x: -oe / 2 + e * oe, z: -oe / 2 + s * oe };
  }
}
