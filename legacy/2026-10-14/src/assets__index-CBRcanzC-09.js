// assets__index-CBRcanzC 09 — replace
// Lines 2348-2686 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
function ma(t, e) {
  const s = new at({ roughness: 0.4, metalness: 0 });
  return (
    (s.onBeforeCompile = (i) => {
      (Object.assign(i.uniforms, t),
        (i.vertexShader = i.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
${gt}${ss}
varying float vLvU,vLvTh;varying vec3 vLvL,vLvAV,vLvAX,vLvAY,vWP;`,
          )
          .replace(
            "#include <beginnormal_vertex>",
            `float lvU=position.x,lvTh=position.y;
lvFrame(lvU);
vec2 lvXY=lvSect(lvU,lvTh);
vec3 lvP=lvC+lvS*lvXY.x+lvUp*lvXY.y;
vec3 objectNormal=lvNormal(lvU,lvTh);
#ifdef USE_TANGENT
vec3 objectTangent=vec3(tangent.xyz);
#endif
vLvU=lvU;vLvTh=lvTh;vLvL=vec3(lvU*LV_LEN,lvXY);
mat3 lvVM=mat3(viewMatrix);vLvAV=lvVM*(-lvT);vLvAX=lvVM*lvS;vLvAY=lvVM*lvUp;`,
          )
          .replace("#include <begin_vertex>", "vec3 transformed=lvP;vWP=lvP;")),
        (i.fragmentShader = i.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
uniform float uTime,uNight,uPulse;
varying float vLvU,vLvTh;varying vec3 vLvL,vLvAV,vLvAX,vLvAY,vWP;
${bt}${gt}${fa}`,
          )
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
float lvFw=max(length(fwidth(vLvL)),1e-4);
LvSkin lvSk=lvSkin(vLvL,vLvU,vLvTh,lvFw);
diffuseColor.rgb=lvSk.alb;`,
          )
          .replace(
            "#include <roughnessmap_fragment>",
            `#include <roughnessmap_fragment>
roughnessFactor=lvSk.rough;`,
          )
          .replace(
            "#include <normal_fragment_maps>",
            `#include <normal_fragment_maps>
${e ? pa : ""}`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
float lvUpN=dot(normal,normalize((viewMatrix*vec4(0.,1.,0.,0.)).xyz));
float lvFres=pow(1.-clamp(dot(normal,normalize(-vViewPosition)),0.,1.),4.)*smoothstep(-.2,.7,lvUpN);
// skylight bouncing up under the belly, so the pale underside reads even in its own shade
totalEmissiveRadiance+=lvSk.em+vec3(.3,.5,.85)*lvFres*(.03+.07*clamp(uNight,0.,1.))+lvSk.alb*vec3(.55,.66,.8)*(.22-.16*clamp(uNight,0.,1.))*(1.-smoothstep(-.6,.3,lvUpN));`,
          )),
        nt(i));
    }),
    (s.customProgramCacheKey = () => "leviathan-body" + (e ? "-hq" : "")),
    s
  );
}
function va(t) {
  const e = new gi({ depthPacking: xi });
  return (
    (e.onBeforeCompile = (s) => {
      (Object.assign(s.uniforms, t),
        (s.vertexShader = s.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
${gt}${ss}`,
          )
          .replace(
            "#include <begin_vertex>",
            "lvFrame(position.x);vec2 lvXY=lvSect(position.x,position.y);vec3 transformed=lvC+lvS*lvXY.x+lvUp*lvXY.y;",
          )));
    }),
    (e.customProgramCacheKey = () => "leviathan-depth"),
    e
  );
}
function Lt(t, e, s, i = 0) {
  const a = new at({ roughness: 0.42, metalness: 0, side: le }),
    n = {
      uBend: { value: 0 },
      uSpan: { value: e },
      uKnobs: { value: s },
      uDark: { value: i },
    };
  return (
    (a.userData.bend = n.uBend),
    (a.onBeforeCompile = (r) => {
      (Object.assign(r.uniforms, t, n, { uLSun: A.uSunDir, uLSunC: A.uSunCol }),
        (r.vertexShader = r.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
uniform float uBend,uSpan;varying vec2 vFin;varying float vFinTop;varying vec3 vWP;`,
          )
          .replace(
            "#include <beginnormal_vertex>",
            `#include <beginnormal_vertex>
float fnS=abs(uv.x),fnA=atan(uBend*.6*fnS*sign(uv.x+1e-6)),fnC=cos(fnA),fnN=sin(fnA);
vFinTop=objectNormal.y;
objectNormal=vec3(objectNormal.x*fnC-objectNormal.y*fnN,objectNormal.x*fnN+objectNormal.y*fnC,objectNormal.z);`,
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
transformed.y+=uBend*.3*fnS*fnS*uSpan;
vFin=vec2(fnS,uv.y);vWP=(modelMatrix*vec4(transformed,1.)).xyz;`,
          )),
        (r.fragmentShader = r.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
uniform float uTime,uNight,uPulse,uKnobs,uSpan,uDark;uniform vec3 uLSun,uLSunC;varying vec2 vFin;varying float vFinTop;varying vec3 vWP;
${bt}`,
          )
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
float fs=vFin.x,fc=vFin.y,ffw=max(length(fwidth(vWP)),1e-3),ffar=smoothstep(.15,.7,ffw);
float fkg=.35+1.45*clamp(uNight,0.,1.6)+1.8*uPulse,fn=bn(vWP*.13),ftop=max(smoothstep(-.3,.3,vFinTop),uDark);
vec3 fA=mix(mix(vec3(.3,.39,.44),vec3(.45,.53,.57),fn),mix(vec3(.008,.022,.04),vec3(.025,.07,.1),fn*fn),ftop);
fA*=1.-.45*(1.-ftop)*smoothstep(.55,.7,bn(vWP*.07+5.));
float knob=(1.-smoothstep(0.,.1,fc))*pow(max(0.,sin(fs*uKnobs*3.14159)),2.)*smoothstep(.06,.14,fs)*(1.-smoothstep(.85,.97,fs))*step(.5,uKnobs);
fA=mix(fA,vec3(.42,.47,.48),knob*.55);
float te=smoothstep(.8,.97,fc)*smoothstep(.03,.1,fs),tw=.5+.5*sin(fs*14.-uTime*2.2);
float fdv=(fract(fs*uSpan/4.2)-.5)*4.2,fds=(fc-.42)*14.;
float fcore=1.-smoothstep(.42-ffw,.42+ffw,length(vec2(fdv,fds)));
fcore=mix(fcore,.035*(1.-smoothstep(0.,.8,abs(fds))),ffar)*smoothstep(.06,.12,fs)*(1.-smoothstep(.85,.95,fs));
vec3 fEm=vec3(.3,1.,.86)*(te*(.3+.7*tw)*1.5+fcore*2.2)*fkg+vec3(.4,1.,.85)*knob*clamp(uNight,0.,1.)*fkg*.3;
fEm+=fA*uLSunC*pow(max(dot(normalize(vWP-cameraPosition),uLSun),0.),5.)*1.2*(1.-uDark*.85);
diffuseColor.rgb=fA;`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
float fFres=pow(1.-clamp(abs(dot(normal,normalize(-vViewPosition))),0.,1.),4.);
float fUpN=dot(normal,normalize((viewMatrix*vec4(0.,1.,0.,0.)).xyz));
totalEmissiveRadiance+=fEm+vec3(.3,.5,.85)*fFres*(.03+.07*clamp(uNight,0.,1.))+fA*vec3(.55,.66,.8)*(.22-.16*clamp(uNight,0.,1.))*(1.-smoothstep(-.6,.3,fUpN));`,
          )),
        nt(r));
    }),
    (a.customProgramCacheKey = () => "leviathan-fin"),
    a
  );
}
function ga(t) {
  const e = new at({ roughness: 0.6, metalness: 0 });
  return (
    (e.onBeforeCompile = (s) => {
      (Object.assign(s.uniforms, t),
        (s.vertexShader = s.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
${gt}${ss}
uniform float uTime;attribute vec4 aInst;attribute vec3 aCol;attribute float aBulb;
varying float vBulb,vAlong;varying vec3 vCol,vWP;`,
          )
          .replace(
            "#include <beginnormal_vertex>",
            `float stTh=1.5707963-aInst.y,stH=aInst.z,stPh=aInst.w;
lvFrame(aInst.x);
vec2 stXY=lvSect(aInst.x,stTh);
vec3 stN=lvNormal(aInst.x,stTh),stZ=normalize(lvT-stN*dot(lvT,stN)),stX=cross(stN,stZ);
vec3 stB=lvC+lvS*stXY.x+lvUp*stXY.y-stN*.3;
vec3 objectNormal=normalize(stX*normal.x+stN*normal.y+stZ*normal.z);
#ifdef USE_TANGENT
vec3 objectTangent=vec3(tangent.xyz);
#endif`,
          )
          .replace(
            "#include <begin_vertex>",
            `float sy=position.y;
vec3 sw=vec3(sin(uTime*1.1+stPh)*.14,0.,-.22+.06*sin(uTime*.7+stPh*2.))*sy*sy;
vec3 lp=(position+sw)*stH;
vec3 transformed=stB+stX*lp.x+stN*lp.y+stZ*lp.z;
vBulb=aBulb;vCol=aCol;vAlong=sy;vWP=transformed;`,
          )),
        (s.fragmentShader = s.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
uniform float uTime,uNight,uPulse;varying float vBulb,vAlong;varying vec3 vCol,vWP;`,
          )
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
diffuseColor.rgb=mix(mix(vec3(.02,.08,.07),vec3(.12,.36,.28),vAlong*vAlong),vCol*.3,vBulb);`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
float stk=.35+1.45*clamp(uNight,0.,1.6)+1.8*uPulse;
totalEmissiveRadiance+=vCol*(vBulb*(1.1+.5*sin(uTime*2.+vWP.x*.3+vWP.z*.2))*1.6+smoothstep(.55,1.,vAlong)*(1.-vBulb)*.45)*stk+vec3(.05,.3,.22)*vAlong*(1.-vBulb)*stk*.25;`,
          )),
        nt(s));
    }),
    (e.customProgramCacheKey = () => "leviathan-garden"),
    e
  );
}
function xa(t) {
  return new te({
    transparent: !0,
    depthWrite: !1,
    blending: $e,
    side: le,
    uniforms: { uTime: A.uTime, uNight: A.uNight, uPulse: t.uPulse },
    vertexShader: `attribute vec3 aTan;attribute float aEdge,aAlong,aSeed;
varying float vEdge,vAlong,vSeed,vFade;
void main(){
  float w=mix(.55,.08,pow(aAlong,.7));
  vec3 sd=normalize(cross(aTan,normalize(cameraPosition-position)));
  vec4 mv=modelViewMatrix*vec4(position+sd*w*aEdge,1.);
  vEdge=aEdge;vAlong=aAlong;vSeed=aSeed;vFade=exp(-length(mv.xyz)*.00035);
  gl_Position=projectionMatrix*mv;
}`,
    fragmentShader: `uniform float uTime,uNight,uPulse;varying float vEdge,vAlong,vSeed,vFade;
void main(){
  float a=exp(-vEdge*vEdge*3.);
  float pulse=pow(.5+.5*sin(vAlong*16.-uTime*3.+vSeed*6.28),6.);
  vec3 c=mix(vec3(.3,1.,.86),vec3(.66,.42,1.),smoothstep(.2,1.,vAlong));
  float k=(.1+1.1*clamp(uNight,0.,1.6)+1.5*uPulse)*(1.-vAlong*.5);
  gl_FragColor=vec4(c*a*(.3+1.5*pulse)*k*vFade,1.);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,
  });
}
function ya() {
  return new te({
    transparent: !0,
    depthWrite: !1,
    blending: $e,
    uniforms: { uScale: { value: 500 }, uInt: { value: 1 } },
    vertexShader: `attribute float aSize,aA;uniform float uScale;varying float vA,vT;
void main(){vec4 mv=modelViewMatrix*vec4(position,1.);float d=-mv.z;
gl_PointSize=clamp(aSize*uScale/max(d,1.),0.,320.);vA=aA*exp(-d*.0003)*smoothstep(2.,10.,d);vT=aSize;
gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `uniform float uInt;varying float vA,vT;
void main(){float d=length(gl_PointCoord-.5)*2.;float a=exp(-d*d*3.2)*(1.-smoothstep(.85,1.,d));
vec3 c=mix(vec3(.8,1.,.96),vec3(.45,.8,1.),smoothstep(6.,26.,vT));
gl_FragColor=vec4(c*a*vA*uInt,1.);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,
  });
}
function $t(t) {
  const e = [],
    s = [],
    i = [],
    a = 2 * t.nc + 1,
    n = t.both ? 2 * t.ns + 1 : t.ns + 1;
  for (let o = 0; o < n; o++) {
    const l = t.both ? o / t.ns - 1 : o / t.ns,
      c = Math.abs(l),
      f = Math.max(t.chord(c), 0.05),
      h = t.lead(c),
      m = t.drop(c),
      v = t.thick(c);
    for (let d = 0; d < a; d++) {
      const p = d > t.nc,
        x = p ? (d - t.nc) / t.nc : 1 - d / t.nc,
        y = 0.5 - 0.5 * Math.cos(Math.PI * x),
        g =
          5 *
          v *
          f *
          (0.2969 * Math.sqrt(y) -
            0.126 * y -
            0.3516 * y * y +
            0.2843 * y ** 3 -
            0.1036 * y ** 4);
      (e.push(l * t.span, m + (p ? g : -g), h - y * f), s.push(l, y));
    }
  }
  for (let o = 0; o < n - 1; o++)
    for (let l = 0; l < a - 1; l++) {
      const c = o * a + l,
        f = c + 1,
        h = c + a,
        m = h + 1;
      i.push(c, h, f, f, h, m);
    }
  const r = new ae();
  return (
    r.setAttribute("position", new Pe(e, 3)),
    r.setAttribute("uv", new Pe(s, 2)),
    r.setIndex(i),
    r.computeVertexNormals(),
    r
  );
}
const xs = (t) =>
    1.1 *
    Math.max(0, Math.sin(t * 20 * Math.PI)) ** 2 *
    ce(0.06, 0.14, t) *
    (1 - ce(0.85, 0.97, t)),
  It = {
    span: 88,
    ns: 80,
    nc: 14,
    chord: (t) =>
      22 * (1 - 0.45 * t) * Math.sqrt(Math.max(0, 1 - t ** 6)) + 1 + xs(t),
    lead: (t) => -10 * t ** 1.6 + xs(t),
    drop: (t) => -4 * t * t,
    thick: (t) => 0.16 - 0.06 * t,
  },
  Ot = {
    span: 58,
    ns: 48,
    nc: 12,
    both: !0,
    chord: (t) =>
      26 * Math.max(0, 1 - t ** 1.8) ** 0.75 * (0.6 + 0.4 * ce(0, 0.2, t)) +
      0.5,
    lead: (t) => -30 * t ** 2.2,
    drop: (t) => -2 * t * t,
    thick: (t) => 0.13 - 0.05 * t,
  },
  wa = () =>
    $t({
      span: 11,
      ns: 16,
      nc: 10,
      chord: (e) => 16 * (1 - e ** 1.2) + 0.5,
      lead: (e) => -12 * e ** 1.5,
      drop: () => 0,
      thick: () => 0.14,
    }).rotateZ(Math.PI / 2);
