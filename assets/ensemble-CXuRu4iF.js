import{B as e,Ct as t,M as n,Pt as r,St as i,Vt as a,X as o,Z as s,c,d as l,j as u,l as d,r as f,st as p}from"./index-CGzb8ZZN.js";var m=[{id:`volt`,name:`Volt`,look:`Yellow Diva`,color:`#ffd52d`},{id:`onyx`,name:`Onyx`,look:`Tactical Baddie`,color:`#e3ebed`},{id:`rouge`,name:`Rouge`,look:`Classy Seductress`,color:`#ff726e`},{id:`sable`,name:`Sable`,look:`Luxury Queen`,color:`#cc9972`},{id:`relay`,name:`Relay`,look:`Cyber Raver`,color:`#69deeb`},{id:`veil`,name:`Veil`,look:`Mystery Diva`,color:`#d5b4ef`}],h=`
attribute vec4 projectors;
uniform float clock;
uniform float member;
varying vec3 localNormal;
varying vec3 cameraNormal;
varying vec4 photo;
varying vec3 bindPoint;
void main() {
  vec3 p=position;
  photo=projectors; bindPoint=p; localNormal=normal;
  float beat=clock*6.2831853*128./60.;
  float phase=member*.61;
  float hips=smoothstep(.12,.61,p.y);
  float arm=smoothstep(.10,.17,abs(p.x))*smoothstep(.36,.59,p.y)*(1.-smoothstep(.82,.94,p.y));
  p.x+=sin(beat*.25+phase)*.012*hips + sin(beat*.5+phase)*.008*arm;
  p.y-=pow(.5+.5*cos(beat+phase),2.)*.010*smoothstep(.08,.53,p.y);
  p.z+=sin(beat*.5+phase)*arm*.016 + .003*sin(beat*.25)*hips;
  cameraNormal=normalize(normalMatrix*normal);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
}`,g=`
precision highp float;
uniform sampler2D atlas;
uniform float member;
uniform float heading;
uniform float clock;
uniform float pass;
uniform float intensity;
uniform float focus;
varying vec3 localNormal;
varying vec3 cameraNormal;
varying vec4 photo;
varying vec3 bindPoint;
vec4 samplePlate(float i,float u) {
  vec2 uv=vec2((i+clamp(u,.005,.995))/3.,(member+clamp(photo.w,.002,.998))/6.);
  return texture2D(atlas,uv);
}
void main() {
  float ca=cos(heading),sa=sin(heading);
  vec3 n=normalize(localNormal);
  float side=max(0.,abs(sa)); float fr=max(0.,ca),ba=max(0.,-ca);
  vec3 w=pow(vec3(fr,side,ba),vec3(2.8));
  // A view-oriented blend preserves the photographed outfit; local normals improve grazing features.
  w*=pow(.12+.88*max(vec3(n.z,abs(n.x),-n.z),0.),vec3(2.45));
  w=pow(w,vec3(1.65));
  w/=max(.0001,w.x+w.y+w.z);
  vec4 photoMix=samplePlate(0.,photo.x)*w.x+samplePlate(1.,photo.y)*w.y+samplePlate(2.,photo.z)*w.z;
  if(photoMix.a<.24) discard;
  vec3 c=photoMix.rgb;
  float facing=clamp(abs(normalize(cameraNormal).z),0.,1.);
  c*=1.03+.09*intensity+.025*focus;
  c+=vec3(.06,.14,.15)*pow(1.-facing,3.)*.5;
  float v=1.-photo.w;
  vec2 grid=vec2(atan(bindPoint.x,bindPoint.z)*2.7,bindPoint.y*33.);
  vec2 d=abs(fract(grid+.5)-.5)/max(fwidth(grid),vec2(.01));
  float line=1.-smoothstep(.35,1.24,min(d.x,d.y));
  vec3 wire=mix(vec3(.017,.070,.078),vec3(.25,.81,.81),line*(.40+.6*facing));
  float sweep=1.08-mod(clock*13./22.5+member*.055,1.)*1.16;
  float mixWire=pass>1.5?.89*exp(-abs(v-sweep)*16.):(pass>.5?1.:0.);
  c=mix(c,wire,mixWire);
  if(pass>1.5)c+=vec3(.23,.96,.85)*exp(-abs(v-sweep)*175.)*.9;
  gl_FragColor=vec4(c,1.);
}`,_=[1,.96,.98,.97,1.01,.99],v=[.04,-.13,.16,-.16,.12,-.08],y=[5,-4,4,-5,5,-4],b=22.5;function x(e,t,n){let r=(e%b+b)%b/b,i=.065*(Math.sin(S*r*8+t*.7)-Math.sin(t*.7));return v[t]+y[t]*S*r+i+n}var S=Math.PI*2,C=e=>a(`ensemble/`+e);function w(e){Object.assign(e.style,{position:`absolute`,inset:`0`,width:`100%`,height:`100%`,pointerEvents:`none`}),e.setAttribute(`aria-hidden`,`true`)}function T(e){let t=new DataView(e);if(t.getUint32(0)!==1094080072||t.getUint32(4,!0)!==1)throw Error(`Invalid fashion geometry`);let r=64;return m.map((i,a)=>{let o=t.getUint32(16+8*a,!0),s=t.getUint32(20+8*a,!0),l=new Float32Array(e,r,o*10);r+=o*40;let f=new Uint16Array(e,r,s);r+=s*2;let p=new u(l,10),m=new d;return m.setAttribute(`position`,new n(p,3,0)),m.setAttribute(`normal`,new n(p,3,3)),m.setAttribute(`projectors`,new n(p,4,6)),m.setIndex(new c(f,1)),m.computeBoundingSphere(),m})}function E(n){let a=document.createElement(`div`);w(a),a.style.overflow=`hidden`,n.append(a);let c=new Image;c.src=C(`fashion-lineup.webp`),w(c),Object.assign(c.style,{objectFit:`contain`,height:`86%`,top:`6%`}),a.append(c);let u,d,v,y,E=`initializing`,D=!1,O=0,k=`beauty`,A=-1,j=.55,M=0,N=1,P=1,F=.404,I=0,L=0,R=[],z=[],B=[],V=new AbortController;function H(){if(D)return;N=a.clientWidth||1,P=a.clientHeight||1;let e=N/P,t=Math.max(1.1,2.46/e);if(F=Math.min(5,t*e)*.96/6,R.forEach((e,t)=>{e.position.x=(t-2.5)*F,z[t].position.x=e.position.x}),u&&d){d.left=-t*e/2,d.right=-d.left,d.top=t/2,d.bottom=-d.top,d.position.set(0,.54,4),d.lookAt(0,.54,0),d.updateProjectionMatrix();let n=a.getBoundingClientRect().width/N,r=Math.min(3,Math.max(1,devicePixelRatio*n));Math.abs(u.getPixelRatio()-r)>.01&&u.setPixelRatio(r),u.setSize(N,P,!1)}for(let e=0;e<B.length;e++){let{holder:n}=B[e],r=P/t;n.style.width=r*.525*_[e]+`px`,n.style.height=r*1.047*_[e]+`px`,n.style.left=N/2+(e-2.5)*F*r+`px`,n.style.bottom=P/2-.544*r+`px`}W()}function U(){if(D||E===`reference sequence`)return;E=`reference sequence`,u?.domElement&&(u.domElement.style.display=`none`);for(let e=0;e<6;e++){let e=document.createElement(`div`);Object.assign(e.style,{position:`absolute`,transform:`translateX(-50%)`});let t=[0,1].map(()=>{let t=document.createElement(`div`);return w(t),t.style.backgroundImage=`url("`+C(`fashion-cards.webp`)+`")`,t.style.backgroundSize=`300% 600%`,e.append(t),t});a.append(e),B.push({holder:e,cards:t})}let e=new Image;e.onload=()=>{D||(c.style.display=`none`)},e.src=C(`fashion-cards.webp`),H()}function W(){D||(E===`WebGL`?(R.forEach((e,t)=>{let n=x(O,t,M),r=e.material.uniforms;e.rotation.y=-n,r.heading.value=n,r.clock.value=(O%b+b)%b,r.focus.value=+(t===A),r.pass.value=k===`wire`?1:k===`scan`?2:0,r.intensity.value=j;let i=_[t]*(t===A?1.022:1);e.scale.setScalar(i),z[t].material.opacity=t===A?.38:.27}),u.render(v,d)):E===`reference sequence`&&B.forEach(({holder:e,cards:t},n)=>{let r=(x(O,n,M)%S+S)%S/(Math.PI/2),i=Math.floor(r)%4,a=r-i,o=[0,1,2,1];[i,(i+1)%4].forEach((e,r)=>{t[r].style.backgroundPosition=o[e]*50+`% `+n*20+`%`,t[r].style.transform=e===3?`scaleX(-1)`:`none`}),t[1].style.opacity=String(a*a*(3-2*a)),e.style.filter=k===`wire`?`grayscale(1) sepia(1) saturate(3) hue-rotate(118deg)`:`none`}))}async function G(){try{u=new f({alpha:!0,antialias:!0,powerPreference:`high-performance`}),u.setClearColor(0,0),w(u.domElement),a.append(u.domElement),u.domElement.addEventListener(`webglcontextlost`,U),v=new i,d=new p(-1,1,1,-1,.1,20),H();let[n,m]=await Promise.all([fetch(C(`fashion-hulls.bin`),{signal:V.signal}).then(e=>{if(!e.ok)throw Error(`Ensemble mesh unavailable`);return e.arrayBuffer()}),new r().loadAsync(C(`fashion-projectors.webp`))]);return D?(m.dispose(),!1):(y=m,y.flipY=!1,y.minFilter=e,y.magFilter=e,y.generateMipmaps=!1,y.needsUpdate=!0,T(n).forEach((e,n)=>{let r=new t({vertexShader:h,fragmentShader:g,side:2,uniforms:{atlas:{value:y},member:{value:n},heading:{value:0},clock:{value:0},intensity:{value:j},focus:{value:0},pass:{value:0}}}),i=new o(e,r);i.position.x=(n-2.5)*.404,R.push(i),v.add(i),I+=e.attributes.position.count,L+=e.index.count/3;let a=new o(new l(1,38),new s({color:4888,transparent:!0,opacity:.27,depthWrite:!1}));a.position.set(i.position.x,-.004,-.15),a.scale.set(.175,.018,1),z.push(a),v.add(a)}),!D&&(E=`WebGL`,H(),c.style.display=`none`,!0))}catch{return U(),!1}}let K=new ResizeObserver(H);K.observe(a),window.addEventListener(`resize`,H);let q=G();return{whenReady:q,ready:q,cast:m,get angle(){return(x(O,Number.isInteger(A)&&A>=0&&A<6?A:0,M)%S+S)%S*180/Math.PI},get renderer(){return E},get vertices(){return I},get triangles(){return L},render(e,t={}){D||(O=Number.isFinite(e)?e:0,k=t.mode||`beauty`,M=Number.isFinite(t.yawOffset)?t.yawOffset:0,A=typeof t.focus==`string`?m.findIndex(e=>e.id===t.focus):t.focus??-1,t.light&&Number.isFinite(t.light.key)&&(j=t.light.key),W())},dispose(){D=!0,V.abort(),K.disconnect(),window.removeEventListener(`resize`,H),u?.domElement.removeEventListener(`webglcontextlost`,U);for(let e of[...R,...z])e.geometry.dispose(),e.material.dispose();y?.dispose(),u?.dispose(),a.remove()}}}export{E as createEnsemble};