import"./ViewTransitions.astro_astro_type_script_index_0_lang.T1cABFxu.js";import"./index.PDhEm6KS.js";document.addEventListener("astro:page-load",()=>{var t=document.querySelector("main.wrapper");if(t){var a=t.querySelectorAll("p");a.forEach(function(e){e.getElementsByTagName("img").length===1&&(e.style.width="100%",e.style.gridColumn="1 / 4")})}const c=document.getElementById("toggle-hide-side-mobile"),o=document.getElementById("article-aside");if(c&&o){const e=()=>{const r=o.classList.contains("open");c.textContent=r?"hide table of contents":"table of contents",c.setAttribute("aria-expanded",String(r))};c.addEventListener("click",()=>{o.classList.toggle("open"),e()}),e()}});document.addEventListener("astro:page-load",()=>{const t=new WeakMap,a=new WeakMap;function c(){const e=document.querySelector("path.toc-marker"),r=Array.from(document.querySelectorAll("nav.toc a"));if(!r.length)return;const i=[];let n=10;r.forEach((s,h)=>{const l=s.offsetLeft,u=s.offsetTop,d=s.offsetHeight;h===0?(t.set(s,0),i.push("M",String(l),String(u),"L",String(l),String(u+d))):(n!==l&&i.push("L",String(n),String(u)),i.push("L",String(l),String(u)),e&&e.setAttribute("d",i.join(" ")),t.set(s,e.getTotalLength()),i.push("L",String(l),String(u+d))),n=l,e.setAttribute("d",i.join(" ")),a.set(s,e.getTotalLength())})}function o(){function e(){if(!document.querySelector("path.toc-marker"))return;const n=document.querySelector("path.toc-marker"),s=n.getTotalLength();let h=document.querySelectorAll("a.active"),l=s,u=0;h=document.querySelectorAll("a.active"),h.forEach(d=>{l=Math.min(l,t.get(d)),u=Math.max(u,a.get(d))}),n.style.display=h.length?"inline":"none",n.setAttribute("stroke-dasharray",`1 ${l} ${u-l} ${s}`)}function r(){if(!document.querySelector("nav.toc"))return;new ResizeObserver(()=>{c(),e()}).observe(document.querySelector("nav.toc"))}const i=new IntersectionObserver(n=>{n.forEach(s=>{if(!document.querySelector("path.toc-marker"))return;const h=s.target;if(!h)return;const l=h.getAttribute("id"),u=document.querySelector(`nav.toc li a[href="#${l}"]`);if(!u)return;const d=s.intersectionRatio>0?"add":"remove",f=document.querySelectorAll("a.active").length===1;if(d==="remove"&&f){document.querySelectorAll("a.active")[0].classList.remove("active");return}u.classList[d]("active"),e()})});r(),document.querySelectorAll("#main-wrapper>h2,#main-wrapper>h3,#main-wrapper>h4,#main-wrapper>h5,#main-wrapper>section>h2").forEach(n=>{i.observe(n)})}window.visualViewport.width>930&&(c(),o())});const M=.25,$=`#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID == 1) ? 3.0 : -1.0, (gl_VertexID == 2) ? 3.0 : -1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}`,z=`#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_colors[4];
uniform vec3 u_accent;
uniform float u_alpha;
uniform float u_scroll;

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

vec3 blobPos(int i, float t) {
  float fi = float(i);
  vec3 base = vec3(
    (hash(fi * 1.7) - 0.5) * 5.0,
    (hash(fi * 3.9) - 0.5) * 3.4,
    hash(fi * 5.1) * 3.5 - 0.5
  );
  vec3 drift = vec3(
    sin(t * (0.05 + 0.03 * hash(fi)) + fi * 1.3),
    cos(t * (0.04 + 0.03 * hash(fi * 2.0)) + fi * 2.7),
    sin(t * (0.03 + 0.02 * hash(fi * 3.0)) + fi * 3.9)
  ) * 0.4;
  return base + drift;
}

float blobRadius(int i) {
  return 0.28 + 0.34 * hash(float(i) * 7.1);
}

float map(vec3 p, float t) {
  float v = 0.0;
  for (int i = 0; i < 7; i++) {
    vec3 c = blobPos(i, t);
    float r = blobRadius(i);
    vec3 d = p - c;
    v += (r * r) / max(dot(d, d), 1e-4);
  }
  return v;
}

int nearestBlob(vec3 p, float t) {
  int best = 0;
  float bestD = 1e10;
  for (int i = 0; i < 7; i++) {
    float d = dot(p - blobPos(i, t), p - blobPos(i, t));
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  float t = u_time;

  float sc = clamp(u_scroll / 600.0, 0.0, 1.5);
  vec3 ro = vec3(
    sin(t * 0.08) * 0.6 + sc * 0.9,
    cos(t * 0.06) * 0.4 - sc * 0.6,
    -3.5 + sc * 1.6
  );
  vec3 rd = normalize(vec3(uv, 1.5));

  float CELL = 0.2;
  float thresh = 1.2;
  vec3 col = vec3(0.0);
  float trans = 1.0;

  vec3 p = ro;
  for (int s = 0; s < 80; s++) {
    vec3 q = floor(p / CELL) * CELL + 0.5 * CELL;
    float f = map(q, t);
    float density = smoothstep(thresh, thresh + 1.0, f);
    if (density > 0.003) {
      vec3 n = vec3(0.0);
      for (int i = 0; i < 7; i++) {
        vec3 c = blobPos(i, t);
        float r = blobRadius(i);
        vec3 d = q - c;
        float d2 = dot(d, d);
        n += (r * r / (d2 * d2)) * d;
      }
      n = normalize(n + 1e-4);
      vec3 L = normalize(vec3(-0.5, 0.4, 1.0));
      vec3 viewDir = -rd;
      vec3 halfVec = normalize(L + viewDir);
      float diff = clamp(dot(n, L), 0.0, 1.0);
      float spec = pow(max(dot(n, halfVec), 0.0), 28.0);
      float rim = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);

      float shadeT = clamp((f - thresh) / 2.5, 0.0, 1.0);
      float jit = hash(dot(q, vec3(127.1, 311.7, 74.7)));
      shadeT = clamp(shadeT + (jit - 0.5) * 1.4, 0.0, 1.0);
      float fi = shadeT * 3.0;
      int i0 = int(fi);
      int i1 = min(i0 + 1, 3);
      vec3 bcol = mix(u_colors[i0], u_colors[i1], fract(fi));
      float brightJit = hash(dot(q, vec3(269.5, 183.3, 421.7)));
      vec3 vcol =
        bcol * (0.4 + 0.9 * diff) * (0.8 + 0.4 * brightJit) +
        vec3(1.0) * spec * 0.45 +
        vec3(1.0) * rim * 0.28;
      float accentPhase = sin(t * 0.07 + dot(q, vec3(3.7, 5.3, 7.1)));
      float accentMask = smoothstep(0.86, 0.97, accentPhase);
      vcol = mix(vcol, u_accent, accentMask * 0.6);
      float lum = dot(vcol, vec3(0.299, 0.587, 0.114));
      vcol *= min(1.0, 0.72 / max(lum, 0.001));

      float depth = length(q - ro);
      vcol *= 1.0 - smoothstep(2.0, 8.0, depth) * 0.5;

      float alpha = density * 0.22;
      col += trans * vcol * alpha;
      trans *= (1.0 - alpha);
      if (trans < 0.02) break;
    }
    p += rd * CELL * 0.5;
  }

  col *= u_alpha;
  outColor = vec4(col, 1.0);
}`;function P(t){const a=t.replace("#","");return[parseInt(a.slice(0,2),16)/255,parseInt(a.slice(2,4),16)/255,parseInt(a.slice(4,6),16)/255]}function I(t,a,c){const o=t.createShader(a);return o?(t.shaderSource(o,c),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)?o:(console.error("[hero3d] shader compile error:",t.getShaderInfoLog(o)),t.deleteShader(o),null)):null}function O(t,a,c){const o=t.createProgram();return o?(t.attachShader(o,a),t.attachShader(o,c),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)?o:(console.error("[hero3d] program link error:",t.getProgramInfoLog(o)),t.deleteProgram(o),null)):null}function U(t,a,c,o){const e=t.getContext("webgl2",{alpha:!0,antialias:!1,powerPreference:"low-power"});if(!e)return null;const r=I(e,e.VERTEX_SHADER,$),i=I(e,e.FRAGMENT_SHADER,z);if(!r||!i)return null;const n=O(e,r,i);if(!n)return null;e.useProgram(n);const s={resolution:e.getUniformLocation(n,"u_resolution"),time:e.getUniformLocation(n,"u_time"),colors:e.getUniformLocation(n,"u_colors[0]"),accent:e.getUniformLocation(n,"u_accent"),alpha:e.getUniformLocation(n,"u_alpha"),scroll:e.getUniformLocation(n,"u_scroll")},h=[];for(let f=0;f<4;f++){const m=a[f]??"#000000",[S,x,D]=P(m);h.push(S,x,D)}e.uniform3fv(s.colors,new Float32Array(h));const[l,u,d]=P(c);return e.uniform3f(s.accent,l,u,d),e.uniform1f(s.alpha,o),e.disable(e.BLEND),{resize(f,m){const S=Math.max(1,Math.round(f*M)),x=Math.max(1,Math.round(m*M));t.width=S,t.height=x,e.viewport(0,0,S,x),e.uniform2f(s.resolution,S,x)},render(f,m){e.useProgram(n),e.uniform1f(s.time,f),e.uniform1f(s.scroll,m),e.drawArrays(e.TRIANGLES,0,3)}}}function E(t,a,c){const o=t.replace("#","");let e=parseInt(o.slice(0,2),16)/255,r=parseInt(o.slice(2,4),16)/255,i=parseInt(o.slice(4,6),16)/255;const n=Math.max(e,r,i),s=Math.min(e,r,i),h=(n+s)/2,l=n-s;if(l>1e-4){const u=h>.5?l/(2-n-s):l/(n+s);let d=n===e?(r-i)/l+(r<i?6:0):n===r?(i-e)/l+2:(e-r)/l+4;d=d*60+a,d=(d%360+360)%360;const f=(1-Math.abs(2*h-1))*u,m=f*(1-Math.abs(d/60%2-1)),S=h-f/2;d<60?(e=f,r=m,i=0):d<120?(e=m,r=f,i=0):d<180?(e=0,r=f,i=m):d<240?(e=0,r=m,i=f):d<300?(e=m,r=0,i=f):(e=f,r=0,i=m),e=(e+S)*255,r=(r+S)*255,i=(i+S)*255}else e*=255,r*=255,i*=255;return`rgba(${Math.round(e)}, ${Math.round(r)}, ${Math.round(i)}, ${c})`}let w=null,b=null,v=null,p=null,g=null,y=null,L=null,A=!0;const H=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function q(){w!=null&&(cancelAnimationFrame(w),w=null)}function _(){!H&&A&&!document.hidden&&b!=null?w==null&&(w=requestAnimationFrame(T)):q()}function C(){if(!v||!g||!b)return;const t=b.querySelector(".hero-art-img"),a=t?t.offsetWidth:g.width,c=t&&t.offsetHeight?t.offsetHeight:Math.round(a*(g.height/g.width)),o=a,e=c;if(v.style.width=`${a}px`,v.style.height=`${c}px`,v.width=o,v.height=e,y){const r=b.querySelector(".hero-art-canvas3d");r&&(r.style.width=`${a}px`,r.style.height=`${c}px`,y.resize(o,e))}}function R(t){if(!v||!p||!g)return;const a=v.width,c=v.height;p.clearRect(0,0,a,c);const o=p.createLinearGradient(0,0,0,c);o.addColorStop(0,g.background),o.addColorStop(1,g.backgroundBottom),p.fillStyle=o,p.fillRect(0,0,a,c);for(const e of g.fields){const r=e.cx+e.driftAmp*Math.sin(t*e.driftSpeed+e.phase),i=e.cy+e.driftAmp*Math.cos(t*e.driftSpeedY+e.phase*1.3),n=t*e.hueDrift,s=r*a,h=i*c,l=e.rx*a,u=e.ry*c,d=e.colors[1]??e.colors[0],f=e.colors[e.colors.length-1];p.save(),p.translate(s,h),p.scale(1,u/l);const m=p.createRadialGradient(0,0,0,0,0,l);m.addColorStop(0,E(e.colors[0],n,e.opacity)),m.addColorStop(.45,E(d,n,e.opacity*.75)),m.addColorStop(1,E(f,n,0)),p.fillStyle=m,p.beginPath(),p.arc(0,0,l,0,Math.PI*2),p.fill(),p.restore()}}function T(t){const a=t/1e3;R(a),y&&y.render(a,window.scrollY),b&&!b.classList.contains("is-animated")&&b.classList.add("is-animated"),w=requestAnimationFrame(T)}function k(){const t=document.querySelector(".hero-art");if(!t){q(),L&&(L.disconnect(),L=null),b=null,v=null,p=null,g=null,y=null;return}if(t.dataset.bound)return;t.dataset.bound="true";const a=t.getAttribute("data-art-config");if(!a||(b=t,g=JSON.parse(a),v=t.querySelector(".hero-art-canvas"),p=v?v.getContext("2d"):null,!v||!p))return;y=null;const c=t.querySelector(".hero-art-canvas3d");c&&(y=U(c,g.neon,g.accent,.9)),L&&L.disconnect(),A=!0,L=new IntersectionObserver(e=>{A=e[0]?.isIntersecting??!0,_()});const o=t.querySelector(".hero-art-img")??t;L.observe(o),q(),C(),R(0),y&&y.render(0,window.scrollY),b.classList.add("is-animated"),_()}document.addEventListener("astro:page-load",k);document.addEventListener("visibilitychange",_);window.addEventListener("resize",()=>{b&&C()});k();
