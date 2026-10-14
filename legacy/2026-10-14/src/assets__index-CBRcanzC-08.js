// assets__index-CBRcanzC 08 — math
// Lines 2021-2347 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
class ia {
  constructor(e, s, i, a) {
    ((this.pal = e),
      (this.flock = s),
      (this.slot = i),
      (this.root = new Se()),
      (this.pos = new k()),
      (this.fwd = new k(1, 0, 0)),
      (this.flap = Math.random() * Z),
      (this.roll = 0),
      (this.phase = (i / 4) * 0.5),
      this.setPalette(e),
      this.root.scale.setScalar(0.92),
      a.add(this.root));
  }
  setPalette(e) {
    (this.body && (this.root.remove(this.body.body), Wt(this.body.body)),
      (this.body = Ks(e)),
      this.root.add(this.body.body),
      (this.pal = e));
  }
  dispose(e) {
    (e.remove(this.root), Wt(this.root));
  }
}
class aa {
  constructor(e) {
    ((this.scene = e), (this.flocks = []), (this.mounts = []), (this.made = 0));
  }
  build(e, s) {
    this.dispose();
    const i = tt(e * 31 + 7);
    s.forEach(([a, n, r, o], l) => {
      const c = {
        c: new k(a, n, r),
        r: o,
        dir: l % 2 ? 1 : -1,
        speed: 24,
        a: i() * Z,
      };
      this.flocks.push(c);
      for (let f = 0; f < 4; f++)
        this.mounts.push(new ia(Ki(i, this.made++), c, f, this.scene));
    });
  }
  dispose() {
    (this.mounts.forEach((e) => e.dispose(this.scene)),
      (this.mounts = []),
      (this.flocks = []));
  }
  release(e, s) {
    e.setPalette(s);
  }
  update(e, s, i) {
    const a = A.uTime.value;
    for (const n of this.flocks) n.a += (n.speed / n.r) * e * n.dir;
    for (const n of this.mounts) {
      const r = n.flock,
        o = r.a - n.slot * 0.09 * r.dir,
        l = (n.slot - 1.5) * 9,
        c = new k(
          r.c.x + Math.cos(o) * (r.r + l),
          r.c.y + Math.sin(o * 2 + n.slot) * 22 + n.slot * 4,
          r.c.z + Math.sin(o) * (r.r + l),
        );
      c.y = Math.max(c.y, s.surface(c.x, c.z) + 40);
      for (const v of i)
        if (v.t === "s") {
          const d = Math.hypot(c.x - v.x, c.y - v.y, c.z - v.z),
            p = v.r + 25;
          if (d < p) {
            const x = (p - d) / Math.max(d, 1);
            ((c.x += (c.x - v.x) * x),
              (c.y += (c.y - v.y) * x),
              (c.z += (c.z - v.z) * x));
          }
        } else if (c.y < v.top + 25) {
          const d = Math.hypot(c.x - v.x, c.z - v.z),
            p = v.r + 25;
          if (d < p) {
            const x = (p - d) / Math.max(d, 1);
            ((c.x += (c.x - v.x) * x), (c.z += (c.z - v.z) * x));
          }
        }
      n.pos.lengthSq() === 0 && n.pos.copy(c);
      const f = n.fwd.clone(),
        h = c.clone().sub(n.pos);
      (n.pos.lerp(c, 1 - Math.exp(-e * 2)),
        h.lengthSq() > 0.01 &&
          n.fwd.lerp(h.normalize(), 1 - Math.exp(-e * 3)).normalize());
      const m = (f.x * n.fwd.z - f.z * n.fwd.x) / Math.max(e, 1e-4);
      ((n.roll = F(n.roll, B(m * 1.5, -0.9, 0.9), 1 - Math.exp(-e * 3))),
        n.root.position.copy(n.pos),
        n.root.lookAt(n.pos.clone().add(n.fwd)),
        n.root.rotateZ(n.roll),
        (n.flap += e * (3.2 + n.slot * 0.2)),
        Ys(
          n.body,
          n.flap,
          0.55 + 0.3 * Math.sin(a * 0.3 + n.slot),
          a,
          n.roll,
          n.fwd.y,
          n.slot * 3,
        ));
    }
  }
  nearest(e) {
    let s = null,
      i = 1 / 0;
    for (const a of this.mounts) {
      const n = a.pos.distanceTo(e);
      n < i && ((i = n), (s = a));
    }
    return { mount: s, dist: i };
  }
}
const na = new k(0, 1, 0),
  qt = 300,
  Qe = 27,
  ra = 26,
  ee = 128,
  ne = 4096,
  st = 0.55,
  Mt = 1.25,
  gs = st / (st + Mt),
  Xs = 1 / (Math.pow(gs, st) * Math.pow(1 - gs, Mt)),
  de = 30,
  Xe = 320,
  Re = 280,
  ce = (t, e, s) => {
    const i = B((s - t) / (e - t), 0, 1);
    return i * i * (3 - 2 * i);
  },
  Zs = (t) => (
    (t = B(t, 0, 1)),
    Math.pow(t, st) * Math.pow(1 - t, Mt) * Xs +
      0.06 * ce(0.75, 0.95, t) * (1 - ce(0.985, 1, t))
  ),
  oa = (t) => F(F(1.12, 1, ce(0.05, 0.35, t)), 0.62, ce(0.6, 0.92, t)),
  la = (t) => F(F(0.74, 0.95, ce(0.04, 0.42, t)), 1.05, ce(0.65, 0.92, t)),
  ca = (t) => F(F(1.08, 0.9, ce(0.12, 0.5, t)), 1.05, ce(0.65, 0.92, t)),
  ha = (t) => 0.1 * ce(0.22, 0.38, t) * (1 - ce(0.58, 0.78, t)),
  ua = (t) => 0.22 * ce(0.62, 0.9, t) * (1 - ce(0.97, 1, t));
function da(t, e, s) {
  const i = Qe * Zs(t),
    a = Math.cos(e),
    n = Math.sin(e),
    r = ca(t) * (1 + ha(t) * Math.min(n, 0));
  return (
    (s.x = a * i * oa(t)),
    (s.y =
      n * i * F(r, la(t), ce(-0.5, 0.5, n)) +
      i *
        ua(t) *
        Math.exp(-a * a * 25) *
        (Math.max(n, 0) - 0.7 * Math.max(-n, 0))),
    s
  );
}
const gt = `
const float LV_R0=${Qe.toFixed(1)},LV_LEN=${qt.toFixed(1)};
float lvProf(float u){u=clamp(u,0.,1.);return pow(u,${st.toFixed(2)})*pow(1.-u,${Mt.toFixed(2)})*${Xs.toFixed(5)}+.06*smoothstep(.75,.95,u)*(1.-smoothstep(.985,1.,u));}
float lvWX(float u){return mix(mix(1.12,1.,smoothstep(.05,.35,u)),.62,smoothstep(.6,.92,u));}
float lvHT(float u){return mix(mix(.74,.95,smoothstep(.04,.42,u)),1.05,smoothstep(.65,.92,u));}
float lvHB(float u){return mix(mix(1.08,.9,smoothstep(.12,.5,u)),1.05,smoothstep(.65,.92,u));}
float lvKB(float u){return .1*smoothstep(.22,.38,u)*(1.-smoothstep(.58,.78,u));}
float lvKK(float u){return .22*smoothstep(.62,.9,u)*(1.-smoothstep(.97,1.,u));}
vec2 lvSect(float u,float th){
  float r=LV_R0*lvProf(u),c=cos(th),s=sin(th),fb=lvHB(u)*(1.+lvKB(u)*min(s,0.));
  return vec2(c*r*lvWX(u),s*r*mix(fb,lvHT(u),smoothstep(-.5,.5,s))+r*lvKK(u)*exp(-c*c*25.)*(max(s,0.)-.7*max(-s,0.)));
}`,
  ss = `
uniform sampler2D uSpine;
vec3 lvC,lvS,lvUp,lvT;
vec4 lvTex(int i,int row){return texelFetch(uSpine,ivec2(clamp(i,0,${ee - 1}),row),0);}
void lvFrame(float u){
  float x=clamp(u,0.,1.)*${ee - 1}.;
  int i=min(int(x),${ee - 2});float f=x-float(i),f2=f*f,f3=f2*f;
  vec3 p0=lvTex(i-1,0).xyz,p1=lvTex(i,0).xyz,p2=lvTex(i+1,0).xyz,p3=lvTex(i+2,0).xyz;
  lvC=.5*(2.*p1+(p2-p0)*f+(2.*p0-5.*p1+4.*p2-p3)*f2+(3.*p1-p0-3.*p2+p3)*f3);
  lvS=normalize(mix(lvTex(i,1).xyz,lvTex(i+1,1).xyz,f));
  lvUp=normalize(mix(lvTex(i,2).xyz,lvTex(i+1,2).xyz,f));
  lvUp=normalize(lvUp-lvS*dot(lvUp,lvS));
  lvT=cross(lvUp,lvS);
}
vec3 lvNormal(float u,float th){
  float ud=clamp(u,.003,.997);
  vec2 dth=(lvSect(ud,th+.004)-lvSect(ud,th-.004))/.008,du=(lvSect(ud+.0015,th)-lvSect(ud-.0015,th))/.003;
  return normalize(cross(lvS*dth.x+lvUp*dth.y,-lvT*LV_LEN+lvS*du.x+lvUp*du.y));
}`,
  fa = `
float lvHash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec2 lvHash2(vec2 p){float a=lvHash(p);return vec2(a,lvHash(p+a*17.31+3.7));}
vec2 lvCell(vec2 p){
  vec2 i=floor(p),f=fract(p);float best=9.,id=0.;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    vec2 g=vec2(float(x),float(y)),o=g+.1+.8*lvHash2(i+g)-f;float d=dot(o,o);
    if(d<best){best=d;id=lvHash(i+g+19.7);}
  }
  return vec2(sqrt(best),id);
}
float lvBand(float d,float w,float aa){return 1.-smoothstep(w-aa,w+aa,d);}
struct LvSkin{vec3 alb;float rough;vec3 em;};
LvSkin lvSkin(vec3 L,float u,float th,float fw){
  LvSkin o;
  float c=cos(th),s=sin(th),side=c<0.?-1.:1.;
  float phi=atan(s,abs(c)),tau=atan(c,s),psi=atan(c,-s);
  float ar=max(LV_R0*lvProf(u),.1),v=L.x;
  float far=smoothstep(.12,.6,fw);
  float night=clamp(uNight,0.,1.6),kg=.35+1.45*night+1.8*uPulse;
  vec3 CY=vec3(.3,1.,.86),VI=vec3(.62,.42,1.),GO=vec3(1.,.76,.32);
  float n1=bn(L*vec3(.03,.08,.08)),n2=bn(L*vec3(.1,.22,.22)+7.);
  float back=smoothstep(-.5,.15,s+(n1-.5)*.5+(n2-.5)*.18);
  vec3 alb=mix(mix(vec3(.3,.39,.45),vec3(.45,.54,.59),n1),mix(vec3(.008,.022,.04),vec3(.025,.07,.1),n2*n2),back);
  float rough=mix(.44,.3,back)+(n2-.5)*.14;
  vec3 em=vec3(0.);
  // soft, irregular pale mottling with scattered flecks, like a blue whale's back
  float mreg0=back*smoothstep(.08,.16,u);
  if(mreg0>.01){
    float mot=smoothstep(.58,.8,bn(L*vec3(.16,.42,.42)+1.7)*.7+bn(L*vec3(.5,1.2,1.2))*.3),spk=0.;
    if(far<.99){vec2 sc=lvCell(vec2(v,tau*ar)/1.6);spk=(1.-smoothstep(.04+.1*sc.y,.17+.12*sc.y+fw/1.6,sc.x))*step(.45,sc.y)*(1.-far);}
    alb=mix(alb,alb*1.7+vec3(.02,.035,.045),(mot*.5+spk*.3)*mreg0);
  }
  if(u<.46&&s<-.1){
    float gw=psi*ar/.9,gid=floor(gw+.5),gend=.3+.12*lvHash(vec2(gid,3.7));
    float greg=smoothstep(.02,.045,u)*(1.-smoothstep(gend-.05,gend,u))*(1.-smoothstep(-.5,-.2,s));
    float gr=lvBand(abs(fract(gw+.5)-.5)*.9,.05,fw+.02)*greg*(1.-far);
    alb=mix(alb,alb*vec3(.72,.6,.62),gr+greg*far*.22);
    em+=CY*gr*.3*night;
  }
  float on=smoothstep(.05,.1,u)*(1.-smoothstep(.8,.88,u));
  if(on>0.&&phi<.1&&phi>-.85){
    for(int k=0;k<2;k++){
      float fk=float(k),row=fk<.5?-.2:-.5,spc=3.4;
      float a=v/spc+fk*.5,cid=floor(a);
      float h1=lvHash(vec2(cid,fk*3.1+side*7.3)),h2=lvHash(vec2(cid+5.,fk+side*2.1));
      float dv=(fract(a)-.5+(h1-.5)*.25)*spc,ds=(phi-row)*ar;
      float rad=.36+.2*h2,d=length(vec2(dv,ds)),aa=fw+.015;
      float wave=.55+.45*sin(v*.07-uTime*1.7+side*.6+fk*1.3);
      float cr=lvBand(d,rad,aa),rim=lvBand(d,rad+.3,aa)-cr;
      cr=mix(cr,.14*lvBand(abs(ds),rad*1.5,aa),far);
      em+=CY*(cr*2.4+exp(-d*d/(rad*rad*6.))*.3)*on*wave*kg;
      alb*=1.-.5*rim*on*(1.-far);
    }
  }
  float lds=(phi-.08)*ar;
  float ll=lvBand(abs(lds),.05,fw+.02)*step(.3,fract(v/2.6+side*.25));
  ll=mix(ll,.3*lvBand(abs(lds),.25,fw),far)*smoothstep(.12,.18,u)*(1.-smoothstep(.75,.84,u));
  em+=VI*ll*kg*.9;
  float dsd=abs(tau)*ar;
  if(dsd<3.&&s>0.){
    float dq=abs(fract((v+dsd*.9)/7.5+.5)-.5)*7.5;
    float ch=mix(lvBand(dq,.14,fw+.03),.16,far)*(1.-smoothstep(1.6,2.6,dsd));
    em+=VI*ch*smoothstep(.14,.2,u)*(1.-smoothstep(.78,.86,u))*kg*.85;
  }
  float mreg=smoothstep(.13,.2,u)*(1.-smoothstep(.62,.72,u))*smoothstep(.45,.8,s)*smoothstep(2.4,3.6,dsd);
  if(mreg>0.){
    float moss=smoothstep(.46,.6,bn(L*.11+11.)*.6+bn(L*.33+2.)*.4)*mreg;
    alb=mix(alb,mix(vec3(.03,.11,.07),vec3(.09,.25,.12),bn(L*1.1)),moss);
    rough=mix(rough,.88,moss);
    vec2 mc=lvCell(vec2(v,tau*ar)/.8);
    float ms=lvBand(mc.x,.12,fw/.8+.02)*step(.55,mc.y)*moss*(1.-far);
    em+=mix(GO,vec3(.4,1.,.7),fract(mc.y*7.))*ms*kg*1.3+vec3(.3,.8,.5)*moss*far*.05*kg;
  }
  if(u<.13&&s>.35){
    vec2 kc=lvCell(vec2(v,tau*ar)/2.);
    float kn=(1.-smoothstep(.04+.08*kc.y,.14+.08*kc.y+fw/2.,kc.x))*(1.-smoothstep(.08,.12,u))*smoothstep(.35,.7,s)*step(.35,kc.y);
    alb=mix(alb,alb*1.35+vec3(.012,.02,.025),kn*.6);
    em+=GO*kn*step(.85,kc.y)*kg*.5*(1.-far);
  }
  float breg=(1.-smoothstep(.05,.08,u))*(1.-smoothstep(-.3,.1,s))+exp(-pow((u-.235)/.03,2.))*exp(-pow((phi+.5)/.25,2.));
  if(breg>.01)breg*=smoothstep(.55,.7,bn(L*.21+4.));
  if(breg>.01){
    vec2 bc=lvCell(vec2(v,psi*ar)/.55);
    float bar=lvBand(bc.x,.28,fw/.55+.02)*breg*(1.-far*.7);
    alb=mix(alb,mix(vec3(.36,.38,.37),vec3(.55,.56,.52),bc.y),bar);
    rough=mix(rough,.95,bar);
  }
  if(u<.16){
    float mphi=-.06-.24*smoothstep(0.,.1,u)+.08*smoothstep(.085,.115,u);
    float mds=(phi-mphi)*ar,mr=1.-smoothstep(.1,.118,u);
    alb=mix(alb,vec3(.006,.01,.016),lvBand(abs(mds),.06,fw+.02)*mr);
    em+=CY*exp(-pow((mds-.25)/.07,2.))*mr*kg*.35;
    vec2 ed=vec2(v-.125*LV_LEN,(phi+.02)*ar);
    float er=length(ed/vec2(1.25,.85)),lid=1.-smoothstep(1.,2.8,er);
    alb=mix(alb,alb*.35,lid*.9);
    alb*=1.-.3*lid*smoothstep(.2,.9,sin(er*13.))*smoothstep(1.,1.3,er)*(1.-far);
    float ball=lvBand(er,.78,fw*1.2+.01),ir=length(ed/vec2(.95,.65));
    float iris=lvBand(ir,.62,fw*1.4+.01),pup=lvBand(length(ed/vec2(.5,.16)),1.,fw*1.5+.01);
    float stri=.75+.25*sin(atan(ed.y,ed.x)*28.);
    vec3 eye=mix(vec3(.05,.06,.07),mix(vec3(.02,.06,.06),vec3(.09,.06,.025),smoothstep(.1,.6,ir))*stri,iris);
    alb=mix(alb,mix(eye,vec3(.002),pup),ball);
    rough=mix(rough,.05,ball);
    em+=mix(vec3(1.,.7,.25),vec3(.25,1.,.85),smoothstep(.2,.62,ir))*iris*(1.-pup)*stri*(.2*night+.9*uPulse);
  }
  if(u>.13&&u<.17&&s>.5){
    vec2 bo=vec2(v-.15*LV_LEN,abs(tau)*ar-.7);
    alb=mix(alb,vec3(.01,.02,.03),lvBand(length(bo/vec2(1.8,.32)),1.,fw*2.+.05)*.9);
  }
  o.alb=alb;o.rough=clamp(rough,.08,1.);o.em=em;
  return o;
}
float lvH(vec3 p){
  float u=p.x/LV_LEN,ar=max(LV_R0*lvProf(u),.1);
  float l=max(length(p.yz),1e-3),c=p.y/l,s=p.z/l;
  float h=(bn(p*vec3(.45,1.3,1.3))-.5)*.05;
  if(u<.46&&s<-.1){
    float gw=atan(c,-s)*ar/.9,gid=floor(gw+.5),gend=.3+.12*lvHash(vec2(gid,3.7));
    float greg=smoothstep(.02,.045,u)*(1.-smoothstep(gend-.05,gend,u))*(1.-smoothstep(-.5,-.2,s));
    h-=.1*(1.-smoothstep(0.,.17,abs(fract(gw+.5)-.5)*.9))*greg;
  }
  if(u<.13&&s>.35){
    vec2 kc=lvCell(vec2(p.x,atan(c,s)*ar)/2.);
    float kr=.14+.08*kc.y,kd=clamp(kc.x/kr,0.,1.),q=1.-kd*kd;
    h+=q*q*kr*.9*(1.-smoothstep(.08,.12,u))*smoothstep(.35,.7,s)*step(.35,kc.y);
  }
  return h;
}`,
  pa = `
float lvBk=1.-smoothstep(.1,.5,lvFw);
if(lvBk>0.){
  float h0=lvH(vLvL);
  vec3 g=vec3(lvH(vLvL+vec3(.04,0.,0.))-h0,lvH(vLvL+vec3(0.,.04,0.))-h0,lvH(vLvL+vec3(0.,0.,.04))-h0)/.04;
  vec3 gv=g.x*vLvAV+g.y*vLvAX+g.z*vLvAY;
  normal=normalize(normal-lvBk*(gv-dot(gv,normal)*normal));
}`;
