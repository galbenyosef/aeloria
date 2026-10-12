// assets__index-CBRcanzC 03 — uniforms
// Lines 428-776 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
const Ge = 512,
  A = {
    uTime: { value: 0 },
    uNight: { value: 0 },
    uWind: { value: 1 },
    uRip: { value: Array.from({ length: 6 }, () => new pt(0, -9999, 0, 0)) },
    uSunDir: { value: new k(0, 1, 0) },
    uSunCol: { value: new W(1, 1, 1) },
    uFogH: { value: new k(fe + 8, 0.012, 0.0012) },
    uFogScatter: { value: 0.6 },
    uField: { value: null },
    uFieldInfo: { value: new pt(oe, 2, 1, 0) },
  },
  me = (t) => t.toFixed(4),
  bt = `
float bh(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float bn(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
return mix(mix(mix(bh(i),bh(i+vec3(1,0,0)),f.x),mix(bh(i+vec3(0,1,0)),bh(i+vec3(1,1,0)),f.x),f.y),
mix(mix(bh(i+vec3(0,0,1)),bh(i+vec3(1,0,1)),f.x),mix(bh(i+vec3(0,1,1)),bh(i+vec3(1,1,1)),f.x),f.y),f.z);}`,
  es = `
uniform vec3 uSunDir;uniform vec3 uSunCol;uniform vec3 uFogH;uniform float uFogScatter;
vec3 aeFog(vec3 c,vec3 wp){
  vec3 ray=wp-cameraPosition;float d=length(ray);
  float fo=1.-exp(-fogDensity*fogDensity*d*d);
  float k=uFogH.y,y0=cameraPosition.y-uFogH.x,y1=wp.y-uFogH.x,dy=y1-y0;
  float e0=exp(-k*clamp(y0,-150.,2000.)),e1=exp(-k*clamp(y1,-150.,2000.));
  float hi=abs(dy)>1.?(e0-e1)/(k*dy):e0;
  float hf=1.-exp(-uFogH.z*d*hi);
  fo=clamp(1.-(1.-fo)*(1.-hf),0.,1.);
  float sa=pow(max(dot(ray/max(d,.001),uSunDir),0.),6.);
  return mix(c,mix(fogColor,uSunCol,sa*uFogScatter),fo);
}`,
  Ws = `
uniform sampler2D uField;uniform vec4 uFieldInfo;
vec4 fieldAt(vec2 xz){
  vec2 g=(xz+uFieldInfo.x*.5)/uFieldInfo.z;float S=uFieldInfo.y-1.;
  if(g.x<0.||g.y<0.||g.x>=S||g.y>=S)return vec4(-60.,0.,0.,1.);
  ivec2 i=ivec2(floor(g));vec2 u=g-vec2(i);
  vec4 a=texelFetch(uField,i,0),b=texelFetch(uField,i+ivec2(0,1),0),c=texelFetch(uField,i+ivec2(1,1),0),d=texelFetch(uField,i+ivec2(1,0),0);
  return (u.x+u.y<=1.)?a+u.x*(d-a)+u.y*(b-a):c+(1.-u.x)*(b-c)+(1.-u.y)*(d-c);
}`,
  Ii = `float rip=0.;
for(int i=0;i<6;i++){vec3 dd=vWP-uRip[i].xyz;float d=length(dd.xz);
rip+=uRip[i].w*exp(-d*d/1600.)*(.55+.45*sin(d*.28-uTime*4.5))*exp(-abs(dd.y)/30.);}`;
function nt(t) {
  ((t.uniforms.uSunDir = A.uSunDir),
    (t.uniforms.uSunCol = A.uSunCol),
    (t.uniforms.uFogH = A.uFogH),
    (t.uniforms.uFogScatter = A.uFogScatter),
    (t.fragmentShader = t.fragmentShader
      .replace(
        "#include <fog_pars_fragment>",
        `#include <fog_pars_fragment>
#ifdef USE_FOG
${es}
#endif`,
      )
      .replace(
        "#include <fog_fragment>",
        `#ifdef USE_FOG
gl_FragColor.rgb=aeFog(gl_FragColor.rgb,vWP);
#endif`,
      )));
}
function ve(t, e = {}) {
  const s = new at({ vertexColors: !0, roughness: 0.85, metalness: 0, ...t }),
    i = {
      base: 0,
      k: 1.6,
      ripple: !1,
      sway: 0,
      swayH: 1,
      hang: !1,
      speck: 0,
      detail: 0,
      bump: 0,
      bumpF: 0.5,
      leaf: !1,
      backlit: 0,
      ...e,
    };
  return (
    (s.onBeforeCompile = (a) => {
      ((a.uniforms.uTime = A.uTime),
        (a.uniforms.uNight = A.uNight),
        (a.uniforms.uWind = A.uWind),
        (a.uniforms.uRip = A.uRip),
        (a.vertexShader = a.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
uniform float uTime;uniform float uWind;attribute vec3 aGlow;varying vec3 vGlow;varying vec3 vWP;`,
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
vec3 orig=vec3(0.);
#ifdef USE_INSTANCING
orig=instanceMatrix[3].xyz;
#endif
orig=(modelMatrix*vec4(orig,1.)).xyz;
float hh=${i.hang ? "max(-position.y,0.)" : "max(position.y,0.)"}/${me(i.swayH)};
float sw=${me(i.sway)}*hh*hh*uWind;
float gust=1.+.5*sin(uTime*.4+orig.x*.004);
transformed.x+=sw*gust*sin(uTime*1.6*uWind+orig.x*.07+orig.z*.05);
transformed.z+=sw*.7*cos(uTime*1.3*uWind+orig.x*.04-orig.z*.06);
vGlow=aGlow;
vec4 wp4=vec4(transformed,1.);
#ifdef USE_INSTANCING
wp4=instanceMatrix*wp4;
#endif
vWP=(modelMatrix*wp4).xyz;`,
          )),
        (a.fragmentShader = a.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
uniform float uTime;uniform float uNight;uniform vec4 uRip[6];varying vec3 vGlow;varying vec3 vWP;
${bt}`,
          )
          .replace(
            "#include <map_fragment>",
            `#include <map_fragment>
${
  i.leaf
    ? `#ifdef USE_MAP
{vec2 ts=vec2(textureSize(map,0));vec2 dx=dFdx(vMapUv*ts),dy=dFdy(vMapUv*ts);
float lod=.5*log2(max(max(dot(dx,dx),dot(dy,dy)),1e-6));diffuseColor.a*=1.+max(lod,0.)*.35;}
#endif`
    : ""
}`,
          )
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
${i.detail ? `diffuseColor.rgb*=.76+.48*(bn(vWP*${me(i.detail)})*.6+bn(vWP*${me(i.detail * 3.7)}+3.)*.4);` : ""}`,
          )
          .replace(
            "#include <normal_fragment_begin>",
            `#include <normal_fragment_begin>
${
  i.leaf
    ? `#ifdef DOUBLE_SIDED
normal*=faceDirection;
#endif`
    : ""
}`,
          )
          .replace(
            "#include <normal_fragment_maps>",
            `#include <normal_fragment_maps>
${
  i.bump
    ? `{float bd=distance(vWP,cameraPosition);
if(bd<380.){vec3 bp=vWP*${me(i.bumpF)};const float E=.2;
float b0=bn(bp);
vec3 g=vec3(bn(bp+vec3(E,0,0))-b0,bn(bp+vec3(0,E,0))-b0,bn(bp+vec3(0,0,E))-b0)/E;
vec3 gv=(viewMatrix*vec4(g,0.)).xyz;
normal=normalize(normal-${me(i.bump)}*(1.-bd/380.)*(gv-dot(gv,normal)*normal));}}`
    : ""
}`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
float pulse=.78+.22*sin(uTime*1.1+vWP.x*.045+vWP.z*.037);
vec3 glw=vGlow*(${me(i.base)}+uNight*${me(i.k)}*pulse);
${
  i.speck
    ? `vec3 sq=vWP*vec3(${me(i.speck)},${me(i.speck * 0.4)},${me(i.speck)});
float spk=bn(sq)*.6+bn(sq*2.9+7.)*.4;
glw*=smoothstep(.6,.76,spk)*2.2+smoothstep(.45,.6,spk)*.12;`
    : ""
}
${
  i.ripple
    ? `${Ii}
glw+=(vGlow*2.4+vec3(.04,.5,.46))*rip*(.2+1.1*uNight);`
    : ""
}
${i.backlit ? `glw+=diffuseColor.rgb*uSunCol*pow(max(dot(normalize(vWP-cameraPosition),uSunDir),0.),4.)*${me(i.backlit)};` : ""}
totalEmissiveRadiance+=glw;`,
          )),
        i.backlit &&
          ((a.uniforms.uSunDir = A.uSunDir),
          (a.uniforms.uSunCol = A.uSunCol),
          (a.fragmentShader = a.fragmentShader.replace(
            "uniform float uTime;uniform float uNight;",
            `uniform float uTime;uniform float uNight;
#ifndef USE_FOG
uniform vec3 uSunDir;uniform vec3 uSunCol;
#endif
`,
          ))),
        nt(a));
    }),
    (s.customProgramCacheKey = () => "bio" + JSON.stringify(i)),
    s
  );
}
const Oi = new k(0.55, 0.3, -0.78).normalize();
function ji() {
  return new te({
    depthWrite: !1,
    side: Ze,
    fog: !1,
    uniforms: {
      uZen: { value: new W() },
      uHor: { value: new W() },
      uSunDir: { value: new k() },
      uSunC: { value: new W() },
      uCloud: { value: new W() },
      uStars: { value: 0 },
      uNight: { value: 0 },
      uCover: { value: 0 },
      uFlash: { value: 0 },
      uTime: A.uTime,
      uPlanet: { value: Oi },
    },
    vertexShader:
      "varying vec3 vDir;void main(){vDir=position;vec4 p=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position=p.xyww;}",
    fragmentShader: `varying vec3 vDir;uniform vec3 uZen,uHor,uSunDir,uSunC,uCloud,uPlanet;uniform float uStars,uNight,uTime,uCover,uFlash;
float h3(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float vn(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),
mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*vn(p);p=p*2.02+vec3(1.7,9.2,3.1);a*=.5;}return s;}
float fbm3(vec3 p){float a=.5,s=0.;for(int i=0;i<3;i++){s+=a*vn(p);p=p*2.02+vec3(1.7,9.2,3.1);a*=.5;}return s;}
vec3 body(vec3 d,vec3 P,float R,vec3 c1,vec3 c2,float bands,vec3 L,out float al){
  vec3 T=normalize(cross(P,vec3(0,1,0)));vec3 B=cross(T,P);
  vec2 q=vec2(dot(d,T),dot(d,B))/R;float rr=dot(q,q);al=0.;
  if(dot(d,P)<0.||rr>1.3)return vec3(0);
  float z=sqrt(max(1.-rr,0.));vec3 n=normalize(q.x*T+q.y*B-z*P);
  float c=cos(.38),s=sin(.38);vec2 qq=vec2(c*q.x-s*q.y,s*q.x+c*q.y);
  float b=sin(qq.y*bands+fbm(vec3(qq*3.,1.))*2.6)*.5+.5;
  vec3 cc=mix(c1,c2,b);
  float storm=smoothstep(.16,.0,length(qq-vec2(.3,-.25)));cc=mix(cc,c1*.6+vec3(.0,.15,.18),storm*.8);
  float lit=clamp(dot(n,L)*1.15+.05,0.,1.);
  al=1.-smoothstep(.96,1.,rr);
  float atm=(1.-smoothstep(1.,1.3,rr))*step(1.,rr);
  return cc*(.05+lit)*mix(.55,1.,z)*al+vec3(.45,.8,1.)*atm*.25;
}
void main(){
  vec3 d=normalize(vDir);float h=max(d.y,0.);
  vec3 col=mix(uHor,uZen,pow(h,.5));
  col=mix(col,uHor*.92,smoothstep(0.,-.12,d.y));
  float s=max(dot(d,uSunDir),0.);
  float clearSky=1.-uCover*.85;
  float sunUp=smoothstep(-.05,.02,uSunDir.y)*(1.-uNight*.85);
  col+=uSunC*(pow(s,6.)*.32+pow(s,60.)*.5+pow(s,1400.)*6.*clearSky)*sunUp;
  vec3 sp=d*230.;vec3 ci=floor(sp);float rn=h3(ci);
  if(rn>.982){vec3 o=vec3(h3(ci+1.3),h3(ci+2.7),h3(ci+5.1))-.5;float dd=length(fract(sp)-.5-o*.6);
    col+=vec3(.85,.9,1.)*smoothstep(.1,.0,dd)*(.55+.45*sin(uTime*2.+rn*90.))*uStars*clearSky*smoothstep(0.,.25,d.y)*2.2;}
  col+=uStars*clearSky*vec3(.22,.08,.35)*pow(fbm(d*3.+7.),3.)*smoothstep(0.,.4,d.y)*1.4;
  float haze=smoothstep(0.,.22,d.y);
  vec3 L=normalize(-uPlanet+vec3(-.7,.45,.25));
  float vis=clearSky;
  float al;vec3 pc=body(d,uPlanet,.17,vec3(.42,.72,.86),vec3(.9,.97,.98),15.,L,al);
  col=mix(col,pc,al*mix(.6,1.,uNight)*(.35+.65*haze)*vis);col+=pc*(1.-al)*haze*vis;
  vec3 m1=normalize(vec3(.92,.38,-.1));float a1;vec3 mc=body(d,m1,.035,vec3(.7,.68,.66),vec3(.92,.9,.88),4.,normalize(-m1+vec3(-.5,.4,.3)),a1);
  col=mix(col,mc,a1*mix(.5,1.,uNight)*haze*vis);
  vec3 m2=normalize(vec3(.25,.55,-.8));float a2;vec3 mc2=body(d,m2,.016,vec3(.75,.55,.5),vec3(.95,.8,.7),3.,normalize(-m2+vec3(.4,.4,.2)),a2);
  col=mix(col,mc2,a2*mix(.4,1.,uNight)*haze*vis);
  if(d.y>0.){
    vec2 cp=d.xz/(d.y+.18)*1.15;
    vec2 drift=vec2(uTime*.004*(1.+uCover*3.));
    float c=fbm(vec3(cp+drift,uTime*.006));
    float c2=fbm(vec3(cp*2.3-uTime*.006,3.));
    float dens=c*.75+c2*.35;
    float cl=smoothstep(.48-uCover*.4,.78-uCover*.25,dens);
    // self-shadowing: denser cloud toward the sun means a darker underside
    vec2 toSun=normalize(uSunDir.xz+vec2(1e-4))*.1;
    float cs=fbm3(vec3(cp+drift+toSun,uTime*.006))*.75+c2*.35;
    float lit=clamp(.55+(dens-cs)*4.,0.,1.);
    vec3 shadowC=uCloud*vec3(.55,.58,.7)*(1.-uCover*.45);
    vec3 litC=uCloud*(1.05-uCover*.35)+uSunC*.35*(1.-uNight)*clearSky;
    vec3 cc=mix(shadowC,litC,lit);
    cc+=uSunC*pow(s,8.)*(1.-cl)*.9*sunUp;
    cc+=vec3(.75,.8,1.)*uFlash*(.5+c2);
    col=mix(col,cc,cl*(.82+uCover*.18)*smoothstep(0.,.18,d.y));
  }
  col=mix(col,uHor,exp(-h*14.)*.4*step(0.,d.y));
  col+=vec3(.6,.65,.9)*uFlash*.25;
  gl_FragColor=vec4(col,1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  });
}
function Hi(t) {
  const e = new te({
    transparent: !0,
    fog: !0,
    uniforms: As.merge([zs.fog, { uRain: { value: 0 } }]),
    vertexShader: `varying vec3 vWP;
#include <fog_pars_vertex>
void main(){vec4 w=modelMatrix*vec4(position,1.);vWP=w.xyz;vec4 mvPosition=viewMatrix*w;gl_Position=projectionMatrix*mvPosition;
#include <fog_vertex>
}`,
    fragmentShader: `uniform float uTime,uNight,uRain;uniform vec3 uZen,uHor,uSunC;varying vec3 vWP;
#include <fog_pars_fragment>
${es}
${Ws}
float h2(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h2(i),h2(i+vec2(1,0)),f.x),mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x),f.y);}
float wav(vec2 p){return n2(p*.08+vec2(uTime*.05,uTime*.03))*.6+n2(p*.21-vec2(uTime*.07,-uTime*.05))*.3+n2(p*.6+vec2(uTime*.2,0.))*.1;}
void main(){
  vec3 V=normalize(cameraPosition-vWP);vec2 p=vWP.xz;
  const float E=.6;float w0=wav(p);
  vec3 N=normalize(vec3(-(wav(p+vec2(E,0.))-w0)/E*2.2,1.,-(wav(p+vec2(0.,E))-w0)/E*2.2));
  vec2 rc=floor(p*.6);float rt=fract(uTime*1.3+h2(rc));float rd=length(fract(p*.6)-.5);
  N.xz+=uRain*.25*sin(rd*40.-rt*20.)*smoothstep(.5,.0,rd)*(1.-rt);N=normalize(N);
  float depth=${me(fe)}-fieldAt(p).x;
  float fr=pow(1.-max(dot(N,V),0.),5.)*.92+.04;
  vec3 R=reflect(-V,N);
  vec3 sk=mix(uHor,uZen,pow(max(R.y,0.),.6));
  vec3 shallow=mix(vec3(.08,.36,.34),vec3(.02,.16,.2),uNight);
  vec3 deepC=mix(vec3(.01,.07,.1),vec3(.0,.03,.07),uNight);
  vec3 body=mix(shallow,deepC,smoothstep(.5,14.,depth));
  vec3 c=mix(body,sk,fr);
  c+=uSunC*pow(max(dot(R,uSunDir),0.),220.)*3.5*(1.-uNight*.6)*(1.-uRain);
  float foam=smoothstep(1.4,.0,depth)*(.5+.5*sin(depth*7.-uTime*1.8+n2(p*.3)*6.));
  foam*=smoothstep(.0,.25,depth+.1);
  c=mix(c,vec3(.85,.95,.95)*mix(1.,.35,uNight),foam*.55);
  vec2 cell=floor(p*1.3);float r=h2(cell);
  float pl=smoothstep(.975,1.,r)*(.5+.5*sin(uTime*2.+r*60.))*smoothstep(.45,.0,length(fract(p*1.3)-.5));
  c+=vec3(.1,.95,.85)*(pl*1.6+foam*.6+smoothstep(3.,0.,depth)*.08)*uNight;
  float a=mix(.5,.95,smoothstep(0.,7.,depth));a=max(a,fr);a=max(a,foam*.8);
  gl_FragColor=vec4(c,a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  gl_FragColor.rgb=aeFog(gl_FragColor.rgb,vWP);
}`,
  });
  for (const s of ["uZen", "uHor", "uSunC"]) e.uniforms[s] = t.uniforms[s];
  return (
    Object.assign(e.uniforms, {
      uTime: A.uTime,
      uNight: A.uNight,
      uSunDir: A.uSunDir,
      uSunCol: A.uSunCol,
      uFogH: A.uFogH,
      uFogScatter: A.uFogScatter,
      uField: A.uField,
      uFieldInfo: A.uFieldInfo,
    }),
    e
  );
}
