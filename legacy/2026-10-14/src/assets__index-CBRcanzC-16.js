// assets__index-CBRcanzC 16 — math
// Lines 7272-7606 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
function Kn(t, e) {
  const i = [],
    a = [];
  for (let h = 0; h <= 3; h++) {
    const m = h / 3,
      v = 0.5 * (1 - m * 0.85);
    i.push(-v, m, 0, v, m, 0);
  }
  for (let h = 0; h < 3; h++) {
    const m = h * 2;
    a.push(m, m + 1, m + 2, m + 1, m + 3, m + 2);
  }
  const n = new Ds();
  (n.setAttribute("position", new Pe(i, 3)),
    n.setAttribute(
      "normal",
      new Pe(
        new Array(i.length).fill(0).map((h, m) => (m % 3 === 1 ? 1 : 0)),
        3,
      ),
    ),
    n.setIndex(a));
  const r = new Float32Array(t * 4);
  for (let h = 0; h < t; h++)
    ((r[h * 4] = Math.random()),
      (r[h * 4 + 1] = Math.random()),
      (r[h * 4 + 2] = Math.random()),
      (r[h * 4 + 3] = Math.random()));
  (n.setAttribute("aR", new Je(r, 4)),
    (n.instanceCount = t),
    (n.boundingSphere = new mt(new k(), 1e7)));
  const o = { value: new k() },
    l = { value: e },
    c = new at({ roughness: 0.9, side: le });
  ((c.onBeforeCompile = (h) => {
    (Object.assign(h.uniforms, {
      uTime: A.uTime,
      uNight: A.uNight,
      uWind: A.uWind,
      uRip: A.uRip,
      uField: A.uField,
      uFieldInfo: A.uFieldInfo,
      uCam: o,
      uSize: l,
    }),
      (h.vertexShader = h.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
attribute vec4 aR;uniform float uTime,uWind,uSize;uniform vec3 uCam;
varying vec3 vWP;varying vec3 vGrass;varying float vTip;varying float vSpark;
${Ws}`,
        )
        .replace(
          "#include <beginnormal_vertex>",
          "vec3 objectNormal=vec3(0.,1.,0.);",
        )
        .replace(
          "#include <begin_vertex>",
          `
vec2 rel=aR.xy*uSize-uCam.xz;rel-=uSize*floor(rel/uSize+.5);
vec2 xz=uCam.xz+rel;
vec4 fd=fieldAt(xz);
float fade=1.-smoothstep(uSize*.3,uSize*.5,length(rel));
float keep=smoothstep(aR.z-.08,aR.z+.08,fd.y*fade);
float hgt=(.45+fract(aR.w*7.31)*1.1)*keep*(1.+fd.z*.3);
float ang=aR.w*6.2832,cs=cos(ang),sn=sin(ang);
float t=position.y;
vec3 lp=vec3(position.x*.09*keep,0.,0.);
lp=vec3(lp.x*cs,0.,lp.x*sn);
float lean=.25+fract(aR.z*13.7)*.35;
vec2 wind=vec2(sin(uTime*1.7*uWind+xz.x*.09+xz.y*.05),cos(uTime*1.3*uWind+xz.x*.05-xz.y*.08))*.35*uWind;
vec3 transformed=vec3(xz.x,fd.x-.05,xz.y)+lp+vec3(0.,t*hgt,0.);
transformed.xz+=(vec2(cs,sn)*lean+wind)*t*t*hgt;
vWP=transformed;
vTip=t;
vec3 base=mix(vec3(.10,.22,.07),vec3(.06,.2,.17),fd.z);
vec3 tip=mix(vec3(.45,.62,.22),vec3(.22,.55,.42),fd.z);
vGrass=mix(base,tip,t)*(.55+.45*fd.w)*(.85+.3*fract(aR.x*91.7));
vSpark=step(.93,fract(aR.y*57.3));`,
        )
        .replace(
          "#include <project_vertex>",
          "vec4 mvPosition=viewMatrix*vec4(transformed,1.);gl_Position=projectionMatrix*mvPosition;",
        )
        .replace(
          "#include <worldpos_vertex>",
          "vec4 worldPosition=vec4(transformed,1.);",
        )),
      (h.fragmentShader = h.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
uniform float uTime,uNight;uniform vec4 uRip[6];varying vec3 vWP;varying vec3 vGrass;varying float vTip;varying float vSpark;
${bt}`,
        )
        .replace("#include <color_fragment>", "diffuseColor.rgb*=vGrass;")
        .replace(
          "#include <emissivemap_fragment>",
          `#include <emissivemap_fragment>
float rip=0.;
for(int i=0;i<6;i++){vec3 dd=vWP-uRip[i].xyz;float d=length(dd.xz);
rip+=uRip[i].w*exp(-d*d/1600.)*(.55+.45*sin(d*.28-uTime*4.5))*exp(-abs(dd.y)/30.);}
float tipGlow=pow(vTip,6.)*(vSpark*1.6+.12);
totalEmissiveRadiance+=vec3(.25,1.,.55)*tipGlow*uNight*(.7+.3*sin(uTime*2.+vWP.x))+vec3(.04,.5,.46)*rip*vTip*(.2+1.1*uNight);`,
        )),
      nt(h));
  }),
    (c.customProgramCacheKey = () => "grass-field"));
  const f = new $(n, c);
  return ((f.frustumCulled = !1), (f.receiveShadow = !0), { mesh: f, uCam: o });
}
function Yn(t) {
  const i = document.createElement("canvas");
  i.width = i.height = 512;
  const a = i.getContext("2d"),
    n = tt(911);
  a.clearRect(0, 0, 512, 512);
  const r = (f, h, m, v, d, p) => {
    (a.save(), a.translate(f, h), a.rotate(d));
    const x = a.createLinearGradient(0, -v, 0, v),
      y = Math.round(170 + p * 70),
      g = Math.round(130 + p * 60);
    (x.addColorStop(0, `rgb(${y},${y},${y})`),
      x.addColorStop(1, `rgb(${g},${g},${g})`),
      (a.fillStyle = x),
      a.beginPath(),
      a.moveTo(0, 0),
      a.bezierCurveTo(m * 0.3, -v, m * 0.75, -v * 0.9, m, 0),
      a.bezierCurveTo(m * 0.75, v * 0.9, m * 0.3, v, 0, 0),
      a.fill(),
      (a.strokeStyle = "rgba(90,90,90,0.55)"),
      (a.lineWidth = Math.max(1, v * 0.12)),
      a.beginPath(),
      a.moveTo(m * 0.05, 0),
      a.lineTo(m * 0.92, 0),
      a.stroke(),
      a.restore());
  };
  for (let f = 0; f < 4; f++) {
    const h = 60 + n() * 136,
      m = 60 + n() * 136;
    for (let v = 0; v < 9; v++) {
      const d = n() * Math.PI * 2,
        p = 34 + n() * 30,
        x = h + Math.cos(d) * 10,
        y = m + Math.sin(d) * 10;
      x + Math.cos(d) * p < 10 ||
        x + Math.cos(d) * p > 246 ||
        y + Math.sin(d) * p < 10 ||
        y + Math.sin(d) * p > 246 ||
        r(x, y, p, 9 + n() * 7, d, n());
    }
  }
  for (let f = 0; f < 110; f++) {
    const h = n() * Math.PI * 2,
      m = Math.sqrt(n()) * 100,
      v = 256 + 256 / 2 + Math.cos(h) * m,
      d = 256 / 2 + Math.sin(h) * m,
      p = 7 + n() * 9,
      x = Math.round(150 + n() * 100);
    ((a.fillStyle = `rgb(${x},${x},${x})`),
      a.beginPath(),
      a.ellipse(v, d, p, p * (0.7 + n() * 0.3), n() * Math.PI, 0, Math.PI * 2),
      a.fill());
  }
  for (let f = 0; f < 6; f++) {
    let h = 30 + n() * 196,
      m = 274 + n() * 30,
      v = Math.PI / 2 + (n() - 0.5) * 0.9;
    for (let d = 0; d < 14; d++) {
      const p = h + Math.cos(v) * 12,
        x = m + Math.sin(v) * 12;
      if (p < 14 || p > 242 || x > 498) break;
      ((a.strokeStyle = "rgb(150,150,150)"),
        (a.lineWidth = 2),
        a.beginPath(),
        a.moveTo(h, m),
        a.lineTo(p, x),
        a.stroke());
      const y = 16 - d * 0.6;
      (r(p, x, y, 4, v - 1.1, n()),
        r(p, x, y, 4, v + 1.1, n()),
        (h = p),
        (m = x),
        (v += (n() - 0.3) * 0.18));
    }
  }
  ((a.fillStyle = "#ffffff"), a.fillRect(256, 256, 256, 256));
  const o = a.getImageData(0, 0, 512, 512).data,
    l = new Uint8Array(512 * 512 * 4);
  for (let f = 0; f < 512; f++)
    for (let h = 0; h < 512; h++) {
      const m = (f * 512 + h) * 4,
        v = ((511 - f) * 512 + h) * 4;
      let d = o[m],
        p = o[m + 1],
        x = o[m + 2];
      if (o[m + 3] < 8) {
        let y = 0;
        d = p = x = 0;
        for (let g = -3; g <= 3; g += 3)
          for (let S = -3; S <= 3; S += 3) {
            const w = Math.min(511, Math.max(0, h + S)),
              M = Math.min(511, Math.max(0, f + g)),
              T = (M * 512 + w) * 4;
            o[T + 3] > 8 &&
              ((d += o[T]), (p += o[T + 1]), (x += o[T + 2]), y++);
          }
        y ? ((d /= y), (p /= y), (x /= y)) : (d = p = x = 165);
      }
      ((l[v] = d), (l[v + 1] = p), (l[v + 2] = x), (l[v + 3] = o[m + 3]));
    }
  const c = new Zt(l, 512, 512, Qt);
  return (
    (c.colorSpace = Q),
    (c.anisotropy = t),
    (c.generateMipmaps = !0),
    (c.minFilter = Ci),
    (c.magFilter = et),
    (c.needsUpdate = !0),
    c
  );
}
class Xn {
  constructor(e = 46, s = 2) {
    ((this.length = e),
      (this.tmp = new k()),
      (this.up = new k()),
      (this.pts = Array.from({ length: s }, () => [])),
      (this.ups = Array.from({ length: s }, () => [])));
    const i = s * e * 2;
    ((this.geo = new ae()),
      this.geo.setAttribute("position", new D(new Float32Array(i * 3), 3)),
      this.geo.setAttribute("aT", new D(new Float32Array(i), 1)));
    const a = [];
    for (let n = 0; n < s; n++)
      for (let r = 0; r < e - 1; r++) {
        const o = (n * e + r) * 2;
        a.push(o, o + 1, o + 2, o + 1, o + 3, o + 2);
      }
    (this.geo.setIndex(a),
      (this.mat = new te({
        transparent: !0,
        depthWrite: !1,
        blending: $e,
        side: le,
        uniforms: {
          uColor: { value: new W() },
          uAlpha: { value: 0 },
          uNight: A.uNight,
        },
        vertexShader:
          "attribute float aT;varying float vT;void main(){vT=aT;gl_Position=projectionMatrix*viewMatrix*vec4(position,1.);}",
        fragmentShader: `uniform vec3 uColor;uniform float uAlpha,uNight;varying float vT;
void main(){float a=pow(1.-vT,2.)*uAlpha*(.08+.9*uNight);gl_FragColor=vec4(uColor*a*1.4,1.);
#include <colorspace_fragment>
}`,
      })),
      (this.mesh = new $(this.geo, this.mat)),
      (this.mesh.frustumCulled = !1));
  }
  reset() {
    (this.pts.forEach((e) => (e.length = 0)),
      this.ups.forEach((e) => (e.length = 0)));
  }
  update(e, s, i, a) {
    (this.mat.uniforms.uColor.value.copy(i),
      (this.mat.uniforms.uAlpha.value = a),
      this.up.set(0, 1, 0).applyQuaternion(s.getWorldQuaternion(new qe())));
    const n = this.geo.attributes.position.array,
      r = this.geo.attributes.aT.array;
    (e.forEach((o, l) => {
      o.getWorldPosition(this.tmp);
      const c = this.pts[l],
        f = this.ups[l];
      (c.unshift(this.tmp.clone()),
        f.unshift(this.up.clone()),
        c.length > this.length && (c.pop(), f.pop()));
      for (let h = 0; h < this.length; h++) {
        const m = c[Math.min(h, c.length - 1)],
          v = f[Math.min(h, f.length - 1)],
          d = 0.2 * (1 - h / this.length),
          p = (l * this.length + h) * 2;
        ((n[p * 3] = m.x + v.x * d),
          (n[p * 3 + 1] = m.y + v.y * d),
          (n[p * 3 + 2] = m.z + v.z * d),
          (n[p * 3 + 3] = m.x - v.x * d),
          (n[p * 3 + 4] = m.y - v.y * d),
          (n[p * 3 + 5] = m.z - v.z * d),
          (r[p] = r[p + 1] = h / (this.length - 1)));
      }
    }),
      (this.geo.attributes.position.needsUpdate = !0),
      (this.geo.attributes.aT.needsUpdate = !0));
  }
}
function Zn(t = 160) {
  const e = new Float32Array(t * 6),
    s = new Float32Array(t * 2 * 4);
  for (let r = 0; r < t; r++) {
    const o = Math.random() * Math.PI * 2,
      l = 1.2 + Math.random() * 3.2,
      c = Math.cos(o) * l,
      f = Math.sin(o) * l * 0.7,
      h = Math.random();
    e.set([c, f, h, c, f, h], r * 6);
    const m = Math.random(),
      v = 0.6 + Math.random();
    s.set([0, m, v, 0, 1, m, v, 0], r * 8);
  }
  const i = new ae();
  (i.setAttribute("position", new D(e, 3)), i.setAttribute("aR", new D(s, 4)));
  const a = new te({
      transparent: !0,
      depthWrite: !1,
      depthTest: !1,
      blending: $e,
      uniforms: {
        uTime: A.uTime,
        uAmt: { value: 0 },
        uSpeed: { value: 0 },
        uColor: { value: new W(1, 1, 1) },
      },
      vertexShader: `attribute vec4 aR;uniform float uTime,uSpeed;varying float vA;
void main(){float z=fract(position.z-uTime*uSpeed*.035+aR.y);float zz=min(-(1.+z*26.)+aR.x*aR.z*uSpeed*.06,-.4);
vA=smoothstep(0.,.25,z)*smoothstep(1.,.6,z)*(1.-aR.x*.6);
gl_Position=projectionMatrix*vec4(position.xy*(1.+z*.4),zz,1.);}`,
      fragmentShader: `uniform float uAmt;uniform vec3 uColor;varying float vA;void main(){gl_FragColor=vec4(uColor*vA*uAmt*.22,1.);
#include <colorspace_fragment>
}`,
    }),
    n = new Es(i, a);
  return ((n.frustumCulled = !1), (n.renderOrder = 20), n);
}
