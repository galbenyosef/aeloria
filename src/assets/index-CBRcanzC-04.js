// assets/index-CBRcanzC 04 — skyblend
// Lines 777-1114 of readable/assets/index-CBRcanzC.pretty.js (statement-aligned).
function createWaterfallMaterial() {
  const t = new te({
    transparent: !0,
    depthWrite: !1,
    side: le,
    fog: !0,
    uniforms: UniformsUtils.merge([UniformsLib.fog]),
    vertexShader: `varying vec2 vUv;varying vec3 vWP;
#include <fog_pars_vertex>
void main(){vUv=uv;vWP=(modelMatrix*vec4(position,1.)).xyz;vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mvPosition;
#include <fog_vertex>
}`,
    fragmentShader: `uniform float uTime,uNight;varying vec2 vUv;varying vec3 vWP;
#include <fog_pars_fragment>
${glslAeFog}
float h2(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h2(i),h2(i+vec2(1,0)),f.x),mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x),f.y);}
void main(){float x=vUv.x,y=vUv.y;
float st=vn(vec2(x*16.,y*5.+uTime*1.7))*.6+vn(vec2(x*42.,y*11.+uTime*2.6))*.4;
float a=smoothstep(0.,.28,x)*smoothstep(1.,.72,x)*smoothstep(0.,.5,y)*smoothstep(1.,.97,y)*(.3+.7*st);
vec3 c=mix(vec3(.8,.9,.96),vec3(.3,.85,.85),uNight*.6)*(.65+.6*st)*mix(1.,.42,uNight);
gl_FragColor=vec4(c,a*.85);
#include <tonemapping_fragment>
#include <colorspace_fragment>
gl_FragColor.rgb=aeFog(gl_FragColor.rgb,vWP);
}`,
  });
  return (
    Object.assign(t.uniforms, {
      uTime: shaderUniforms.uTime,
      uNight: shaderUniforms.uNight,
      uSunDir: shaderUniforms.uSunDir,
      uSunCol: shaderUniforms.uSunCol,
      uFogH: shaderUniforms.uFogH,
      uFogScatter: shaderUniforms.uFogScatter,
    }),
    t
  );
}
function createGlowPointsMaterial(t) {
  return new te({
    transparent: !0,
    depthWrite: !1,
    blending: t ? AdditiveBlending : NormalBlending,
    defines: t ? { ADD: 1 } : {},
    uniforms: {
      uTime: shaderUniforms.uTime,
      uScale: { value: 500 },
      uDrift: { value: 1 },
      uBlink: { value: 1 },
      uInt: { value: 1 },
      uTint: { value: new W(1, 1, 1) },
      uOp: { value: 0.3 },
      uFar: { value: 8e-4 },
    },
    vertexShader: `attribute float aSize;attribute float aPhase;attribute vec3 aColor;
uniform float uTime,uScale,uDrift,uBlink,uFar;varying vec3 vC;varying float vA;
void main(){vec3 p=position+uDrift*vec3(sin(uTime*.5+aPhase*6.28)*2.5,sin(uTime*.8+aPhase*12.)*1.2,cos(uTime*.45+aPhase*9.)*2.5);
vec4 mv=modelViewMatrix*vec4(p,1.);float d=-mv.z;
gl_PointSize=clamp(aSize*uScale/max(d,1.),0.,180.);vC=aColor;
vA=mix(1.,.25+.75*pow(.5+.5*sin(uTime*(1.2+aPhase*2.)+aPhase*40.),2.),uBlink)*exp(-d*uFar)*smoothstep(1.,6.,d);
gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `uniform float uInt,uOp;uniform vec3 uTint;varying vec3 vC;varying float vA;
void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,0.,d);
#ifdef ADD
float core=smoothstep(.14,0.,d);gl_FragColor=vec4(vC*(a*a*.55+core*1.4)*uInt*vA,1.);
#else
gl_FragColor=vec4(uTint*vC,a*a*uOp*vA);
#endif
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,
  });
}
function createRain(t) {
  const e = new Float32Array(t * 6),
    s = new Float32Array(t * 2);
  for (let r = 0; r < t; r++) {
    const o = Math.random(),
      l = Math.random(),
      c = Math.random();
    (e.set([o, l, c, o, l, c], r * 6), (s[r * 2 + 1] = 1));
  }
  const i = new ae();
  (i.setAttribute("position", new D(e, 3)),
    i.setAttribute("aEnd", new D(s, 1)));
  const a = new te({
      transparent: !0,
      depthWrite: !1,
      uniforms: {
        uTime: shaderUniforms.uTime,
        uCam: { value: new k() },
        uRain: { value: 0 },
        uColor: { value: new W(0.7, 0.8, 0.9) },
      },
      vertexShader: `attribute float aEnd;uniform float uTime;uniform vec3 uCam;varying float vA;
void main(){const float B=90.;vec3 vel=vec3(-6.,-55.,-3.);
vec3 p=mod(position*B+vel*uTime*(.8+position.x*.4)-uCam+B*.5,B)-B*.5+uCam;
p+=normalize(vel)*aEnd*1.8;vA=1.-aEnd*.7;
gl_Position=projectionMatrix*viewMatrix*vec4(p,1.);}`,
      fragmentShader: `uniform float uRain;uniform vec3 uColor;varying float vA;void main(){gl_FragColor=vec4(uColor,.35*uRain*vA);
#include <colorspace_fragment>
}`,
    }),
    n = new LineSegments(i, a);
  return ((n.frustumCulled = !1), n);
}
const skyPresets = [
    {
      zen: "#3b7fcb",
      hor: "#a8d8ea",
      fog: "#9fcadb",
      fd: 4e-4,
      sunC: "#fff1d8",
      sunI: 2.7,
      el: 0.95,
      az: 0.6,
      hs: "#c3e8ff",
      hg: "#2c4a2a",
      hi: 1.15,
      glow: 0.05,
      cloud: "#ffffff",
      stars: 0,
      exp: 1,
    },
    {
      zen: "#3a4b8f",
      hor: "#f6b394",
      fog: "#c99aa7",
      fd: 54e-5,
      sunC: "#ffad78",
      sunI: 1.9,
      el: 0.1,
      az: 2.3,
      hs: "#b9a3d8",
      hg: "#3a2f46",
      hi: 0.85,
      glow: 0.3,
      cloud: "#ffc4ad",
      stars: 0.18,
      exp: 1.05,
    },
    {
      zen: "#030820",
      hor: "#132a63",
      fog: "#0c1c46",
      fd: 66e-5,
      sunC: "#86a9ff",
      sunI: 0.6,
      el: 0.7,
      az: 2.55,
      hs: "#3a5ab0",
      hg: "#0a1428",
      hi: 0.5,
      glow: 1,
      cloud: "#1b2a58",
      stars: 1,
      exp: 1.18,
    },
  ],
  skyKeys = ["zen", "hor", "fog", "sunC", "hs", "hg", "cloud"],
  skyScaleKeys = ["fd", "sunI", "el", "az", "hi", "glow", "stars", "exp"],
  skyColorSets = skyPresets.map((t) => {
    const e = {};
    for (const s of skyKeys) e[s] = new W(t[s]);
    for (const s of skyScaleKeys) e[s] = t[s];
    return e;
  }),
  weatherPresets = {
    clear: { fog: 1, cover: 0, dim: 0, wind: 1, rain: 0, grey: 0 },
    mist: { fog: 2.6, cover: 0.3, dim: 0.15, wind: 0.7, rain: 0, grey: 0.25 },
    rain: {
      fog: 1.7,
      cover: 0.75,
      dim: 0.45,
      wind: 1.6,
      rain: 0.8,
      grey: 0.45,
    },
    storm: { fog: 2, cover: 1, dim: 0.62, wind: 2.6, rain: 1, grey: 0.6 },
  },
  skyBlend = {};
for (const t of skyKeys) skyBlend[t] = new W();
const skyColor = new W(),
  weatherState = { fog: 1, cover: 0, dim: 0, wind: 1, rain: 0, grey: 0 };
function blendSkyPalette(t, e, s) {
  const i = t < 0.5 ? skyColorSets[0] : skyColorSets[1],
    a = t < 0.5 ? skyColorSets[1] : skyColorSets[2],
    n = smoothstep(t < 0.5 ? t * 2 : (t - 0.5) * 2);
  for (const l of skyKeys) skyBlend[l].copy(i[l]).lerp(a[l], n);
  for (const l of skyScaleKeys) skyBlend[l] = lerp(i[l], a[l], n);
  const r = weatherPresets[e],
    o = 1 - Math.exp(-s * 0.8);
  for (const l of Object.keys(weatherState)) weatherState[l] = lerp(weatherState[l], r[l], o);
  for (const l of ["zen", "hor", "fog", "cloud"]) {
    const c = skyBlend[l].getHSL({ h: 0, s: 0, l: 0 }).l;
    (skyColor.setRGB(c, c, c * 1.05), skyBlend[l].lerp(skyColor, weatherState.grey));
  }
  return (
    skyBlend.zen.multiplyScalar(1 - weatherState.dim * 0.5),
    skyBlend.hor.multiplyScalar(1 - weatherState.dim * 0.35),
    (skyBlend.fd *= weatherState.fog),
    (skyBlend.sunI *= 1 - weatherState.dim),
    (skyBlend.hi *= 1 - weatherState.dim * 0.4),
    (skyBlend.stars *= 1 - weatherState.cover),
    (skyBlend.cover = weatherState.cover),
    (skyBlend.wind = weatherState.wind),
    (skyBlend.rain = weatherState.rain),
    skyBlend
  );
}
const mountDefs = [
    {
      name: "Kaelo",
      skin: "#3f74c4",
      pal: {
        id: "ember",
        name: "Ember",
        a: "#d9531e",
        b: "#1fb5a3",
        belly: "#f2c48d",
        glow: "#ffcc55",
      },
    },
    {
      name: "Sora",
      skin: "#4a86d0",
      pal: {
        id: "tidewing",
        name: "Tidewing",
        a: "#1d5fbf",
        b: "#5ff2e0",
        belly: "#d6f0ff",
        glow: "#7ffcff",
      },
    },
    {
      name: "Tavi",
      skin: "#3a6cb8",
      pal: {
        id: "vesper",
        name: "Vesper",
        a: "#6a2fbf",
        b: "#ff5fd2",
        belly: "#e9d0ff",
        glow: "#ff7ae6",
      },
    },
    {
      name: "Ruun",
      skin: "#4479bf",
      pal: {
        id: "mossback",
        name: "Mossback",
        a: "#2f7a3a",
        b: "#e8d23a",
        belly: "#dff0b0",
        glow: "#b8ff5a",
      },
    },
    {
      name: "Ilsa",
      skin: "#3d70c0",
      pal: {
        id: "crimson",
        name: "Crimson Veil",
        a: "#a3122a",
        b: "#ffb21f",
        belly: "#ffd9b0",
        glow: "#ffd15a",
      },
    },
    {
      name: "Oru",
      skin: "#4680cc",
      pal: {
        id: "frost",
        name: "Frost",
        a: "#dfe8f2",
        b: "#3a8fe0",
        belly: "#ffffff",
        glow: "#9fe3ff",
      },
    },
  ],
  spires = [
    {
      at: 10,
      pal: {
        id: "aurora",
        name: "Aurora",
        a: "#2a1a6e",
        b: "#4dffb0",
        belly: "#d0f0ff",
        glow: "#8affd6",
      },
    },
    {
      at: 25,
      pal: {
        id: "obsidian",
        name: "Obsidian",
        a: "#15161c",
        b: "#ff5a2a",
        belly: "#3a3a44",
        glow: "#ff7a3a",
      },
    },
    {
      at: 45,
      pal: {
        id: "sunbloom",
        name: "Sunbloom",
        a: "#ffb21f",
        b: "#ff4f8a",
        belly: "#fff0c0",
        glow: "#ffe066",
      },
    },
  ],
  placeSyllables = [
    "ka",
    "ri",
    "tho",
    "mel",
    "va",
    "sen",
    "ly",
    "or",
    "quin",
    "the",
    "za",
    "ru",
    "ne",
    "shi",
    "ae",
    "lo",
  ];
