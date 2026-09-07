import"./ViewTransitions.astro_astro_type_script_index_0_lang.T1cABFxu.js";import"./index.PDhEm6KS.js";document.addEventListener("astro:page-load",()=>{var e=document.querySelector("main.wrapper");if(e){var r=e.querySelectorAll("p");r.forEach(function(t){t.getElementsByTagName("img").length===1&&(t.style.width="100%",t.style.gridColumn="1 / 4")})}const s=document.getElementById("toggle-hide-side-mobile"),o=document.getElementById("article-aside");if(s&&o){const t=()=>{const n=o.classList.contains("open");s.textContent=n?"hide table of contents":"table of contents",s.setAttribute("aria-expanded",String(n))};s.addEventListener("click",()=>{o.classList.toggle("open"),t()}),t()}});document.addEventListener("astro:page-load",()=>{const e=new WeakMap,r=new WeakMap;function s(){const t=document.querySelector("path.toc-marker"),n=Array.from(document.querySelectorAll("nav.toc a"));if(!n.length)return;const c=[];let i=10;n.forEach((l,u)=>{const d=l.offsetLeft,h=l.offsetTop,a=l.offsetHeight;u===0?(e.set(l,0),c.push("M",String(d),String(h),"L",String(d),String(h+a))):(i!==d&&c.push("L",String(i),String(h)),c.push("L",String(d),String(h)),t&&t.setAttribute("d",c.join(" ")),e.set(l,t.getTotalLength()),c.push("L",String(d),String(h+a))),i=d,t.setAttribute("d",c.join(" ")),r.set(l,t.getTotalLength())})}function o(){function t(){if(!document.querySelector("path.toc-marker"))return;const i=document.querySelector("path.toc-marker"),l=i.getTotalLength();let u=document.querySelectorAll("a.active"),d=l,h=0;u=document.querySelectorAll("a.active"),u.forEach(a=>{d=Math.min(d,e.get(a)),h=Math.max(h,r.get(a))}),i.style.display=u.length?"inline":"none",i.setAttribute("stroke-dasharray",`1 ${d} ${h-d} ${l}`)}function n(){if(!document.querySelector("nav.toc"))return;new ResizeObserver(()=>{s(),t()}).observe(document.querySelector("nav.toc"))}const c=new IntersectionObserver(i=>{i.forEach(l=>{if(!document.querySelector("path.toc-marker"))return;const u=l.target;if(!u)return;const d=u.getAttribute("id"),h=document.querySelector(`nav.toc li a[href="#${d}"]`);if(!h)return;const a=l.intersectionRatio>0?"add":"remove",f=document.querySelectorAll("a.active").length===1;if(a==="remove"&&f){document.querySelectorAll("a.active")[0].classList.remove("active");return}h.classList[a]("active"),t()})});n(),document.querySelectorAll("#main-wrapper>h2,#main-wrapper>h3,#main-wrapper>h4,#main-wrapper>h5,#main-wrapper>section>h2").forEach(i=>{c.observe(i)})}window.visualViewport.width>930&&(s(),o())});const C=.25,H=`#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID == 1) ? 3.0 : -1.0, (gl_VertexID == 2) ? 3.0 : -1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}`,$=`#version 300 es
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

  float jitter = hash(gl_FragCoord.x * 13.71 + gl_FragCoord.y * 7.93);
  vec3 p = ro + rd * jitter * CELL;
  for (int s = 0; s < 80; s++) {
    vec3 q = floor(p / CELL) * CELL + 0.5 * CELL;
    float f = map(q, t);
    float density = smoothstep(thresh, thresh + 1.0, f);
    float lifeHash = hash(dot(q, vec3(11.3, 17.7, 23.9)));
    float isLife = step(lifeHash, 0.08);
    float life = 0.5 + 0.5 * sin(t * 0.7 + lifeHash * 50.0);
    density *= mix(1.0, life, isLife);
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
}`;function I(e){const r=e.replace("#","");return[parseInt(r.slice(0,2),16)/255,parseInt(r.slice(2,4),16)/255,parseInt(r.slice(4,6),16)/255]}function M(e,r,s){const o=e.createShader(r);return o?(e.shaderSource(o,s),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)?o:(console.error("[hero3d] shader compile error:",e.getShaderInfoLog(o)),e.deleteShader(o),null)):null}function O(e,r,s){const o=e.createProgram();return o?(e.attachShader(o,r),e.attachShader(o,s),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)?o:(console.error("[hero3d] program link error:",e.getProgramInfoLog(o)),e.deleteProgram(o),null)):null}function z(e,r,s,o){const t=e.getContext("webgl2",{alpha:!0,antialias:!1,powerPreference:"low-power"});if(!t)return null;const n=M(t,t.VERTEX_SHADER,H),c=M(t,t.FRAGMENT_SHADER,$);if(!n||!c)return null;const i=O(t,n,c);if(!i)return null;t.useProgram(i);const l={resolution:t.getUniformLocation(i,"u_resolution"),time:t.getUniformLocation(i,"u_time"),colors:t.getUniformLocation(i,"u_colors[0]"),accent:t.getUniformLocation(i,"u_accent"),alpha:t.getUniformLocation(i,"u_alpha"),scroll:t.getUniformLocation(i,"u_scroll")},u=[];for(let f=0;f<4;f++){const m=r[f]??"#000000",[S,x,D]=I(m);u.push(S,x,D)}t.uniform3fv(l.colors,new Float32Array(u));const[d,h,a]=I(s);return t.uniform3f(l.accent,d,h,a),t.uniform1f(l.alpha,o),t.disable(t.BLEND),{resize(f,m){const S=Math.max(1,Math.round(f*C)),x=Math.max(1,Math.round(m*C));e.width=S,e.height=x,t.viewport(0,0,S,x),t.uniform2f(l.resolution,S,x)},render(f,m){t.useProgram(i),t.uniform1f(l.time,f),t.uniform1f(l.scroll,m),t.drawArrays(t.TRIANGLES,0,3)}}}function E(e,r,s){const o=e.replace("#","");let t=parseInt(o.slice(0,2),16)/255,n=parseInt(o.slice(2,4),16)/255,c=parseInt(o.slice(4,6),16)/255;const i=Math.max(t,n,c),l=Math.min(t,n,c),u=(i+l)/2,d=i-l;if(d>1e-4){const h=u>.5?d/(2-i-l):d/(i+l);let a=i===t?(n-c)/d+(n<c?6:0):i===n?(c-t)/d+2:(t-n)/d+4;a=a*60+r,a=(a%360+360)%360;const f=(1-Math.abs(2*u-1))*h,m=f*(1-Math.abs(a/60%2-1)),S=u-f/2;a<60?(t=f,n=m,c=0):a<120?(t=m,n=f,c=0):a<180?(t=0,n=f,c=m):a<240?(t=0,n=m,c=f):a<300?(t=m,n=0,c=f):(t=f,n=0,c=m),t=(t+S)*255,n=(n+S)*255,c=(c+S)*255}else t*=255,n*=255,c*=255;return`rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(c)}, ${s})`}let L=null,b=null,v=null,p=null,g=null,y=null,w=null,A=!0;const B=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function q(){L!=null&&(cancelAnimationFrame(L),L=null)}function _(){!B&&A&&!document.hidden&&b!=null?L==null&&(L=requestAnimationFrame(R)):q()}function P(){if(!v||!g||!b)return;const e=b.querySelector(".hero-art-img"),r=e?e.offsetWidth:g.width,s=e&&e.offsetHeight?e.offsetHeight:Math.round(r*(g.height/g.width)),o=r,t=s;if(v.style.width=`${r}px`,v.style.height=`${s}px`,v.width=o,v.height=t,y){const n=b.querySelector(".hero-art-canvas3d");n&&(n.style.width=`${r}px`,n.style.height=`${s}px`,y.resize(o,t))}}function T(e){if(!v||!p||!g)return;const r=v.width,s=v.height;p.clearRect(0,0,r,s);const o=p.createLinearGradient(0,0,0,s);o.addColorStop(0,g.background),o.addColorStop(1,g.backgroundBottom),p.fillStyle=o,p.fillRect(0,0,r,s);for(const t of g.fields){const n=t.cx+t.driftAmp*Math.sin(e*t.driftSpeed+t.phase),c=t.cy+t.driftAmp*Math.cos(e*t.driftSpeedY+t.phase*1.3),i=e*t.hueDrift,l=n*r,u=c*s,d=t.rx*r,h=t.ry*s,a=t.colors[1]??t.colors[0],f=t.colors[t.colors.length-1];p.save(),p.translate(l,u),p.scale(1,h/d);const m=p.createRadialGradient(0,0,0,0,0,d);m.addColorStop(0,E(t.colors[0],i,t.opacity)),m.addColorStop(.45,E(a,i,t.opacity*.75)),m.addColorStop(1,E(f,i,0)),p.fillStyle=m,p.beginPath(),p.arc(0,0,d,0,Math.PI*2),p.fill(),p.restore()}}function R(e){const r=e/1e3;T(r),y&&y.render(r,window.scrollY),b&&!b.classList.contains("is-animated")&&b.classList.add("is-animated"),L=requestAnimationFrame(R)}function k(){const e=document.querySelector(".hero-art");if(!e){q(),w&&(w.disconnect(),w=null),b=null,v=null,p=null,g=null,y=null;return}if(e.dataset.bound)return;e.dataset.bound="true";const r=e.getAttribute("data-art-config");if(!r||(b=e,g=JSON.parse(r),v=e.querySelector(".hero-art-canvas"),p=v?v.getContext("2d"):null,!v||!p))return;y=null;const s=e.querySelector(".hero-art-canvas3d");s&&(y=z(s,g.neon,g.accent,.9)),w&&w.disconnect(),A=!0,w=new IntersectionObserver(t=>{A=t[0]?.isIntersecting??!0,_()});const o=e.querySelector(".hero-art-img")??e;w.observe(o),q(),P(),T(0),y&&y.render(0,window.scrollY),b.classList.add("is-animated"),_()}document.addEventListener("astro:page-load",k);document.addEventListener("visibilitychange",_);window.addEventListener("resize",()=>{b&&P()});k();document.addEventListener("astro:page-load",()=>{const e=document.getElementById("section-indicator"),r=document.getElementById("section-indicator-text");if(!e||!r)return;const s=Array.from(document.querySelectorAll("#main-wrapper h2, #main-wrapper h3"));if(!s.length)return;const o=document.getElementById("main-wrapper"),t=o?o.offsetTop-window.innerHeight*.6:0,n=new Set;function c(){const a=s.find(f=>n.has(f));!a||a.textContent===r.textContent||(r.style.opacity="0",setTimeout(()=>{r.textContent=a.textContent.trim(),r.style.opacity="1"},150))}const i=new IntersectionObserver(a=>{a.forEach(f=>{f.isIntersecting?n.add(f.target):n.delete(f.target)}),c()},{rootMargin:"-20% 0px -70% 0px",threshold:0});s.forEach(a=>i.observe(a));let l=window.scrollY,u=!1;function d(){const a=window.scrollY,f=a>t&&a>l;e.classList.toggle("visible",f),l=a,u=!1}function h(){u||(requestAnimationFrame(d),u=!0)}window.addEventListener("scroll",h,{passive:!0}),h()});
