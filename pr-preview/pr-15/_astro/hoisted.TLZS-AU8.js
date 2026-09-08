import"./ViewTransitions.astro_astro_type_script_index_0_lang.T1cABFxu.js";import"./index.PDhEm6KS.js";document.addEventListener("astro:page-load",()=>{var e=document.querySelector("main.wrapper");if(e){var i=e.querySelectorAll("p");i.forEach(function(t){t.getElementsByTagName("img").length===1&&(t.style.width="100%",t.style.gridColumn="1 / 4")})}const s=document.getElementById("toggle-hide-side-mobile"),r=document.getElementById("article-aside");if(s&&r){const t=()=>{const n=r.classList.contains("open");s.textContent=n?"hide table of contents":"table of contents",s.setAttribute("aria-expanded",String(n))};s.addEventListener("click",()=>{r.classList.toggle("open"),t()}),t()}});const B=10;document.addEventListener("astro:page-load",()=>{const e=new WeakMap,i=new WeakMap;function s(n){const l=n.getClientRects();return l.length?l[0]:n.getBoundingClientRect()}function r(){const n=document.querySelector("path.toc-marker"),l=Array.from(document.querySelectorAll("nav.toc a"));if(!l.length||!n)return;const c=n.ownerSVGElement.getBoundingClientRect(),f=l.map(o=>{const a=s(o);return{link:o,x:a.left-c.left-B,top:a.top-c.top,bottom:a.bottom-c.top}}),u=[];let h=null;f.forEach(o=>{h?(h.x!==o.x&&u.push("L",String(h.x),String(o.top)),u.push("L",String(o.x),String(o.top)),n.setAttribute("d",u.join(" ")),e.set(o.link,n.getTotalLength()),u.push("L",String(o.x),String(o.bottom))):(e.set(o.link,0),u.push("M",String(o.x),String(o.top),"L",String(o.x),String(o.bottom))),h=o,n.setAttribute("d",u.join(" ")),i.set(o.link,n.getTotalLength())})}function t(){function n(){const c=document.querySelector("path.toc-marker");if(!c)return;const f=c.getTotalLength(),u=document.querySelectorAll("a.active");let h=f,o=0;u.forEach(a=>{h=Math.min(h,e.get(a)??0),o=Math.max(o,i.get(a)??0)}),c.style.display=u.length?"inline":"none",c.setAttribute("stroke-dasharray",`1 ${h} ${o-h} ${f}`)}function l(){const c=document.querySelector("nav.toc");if(!c)return;new ResizeObserver(()=>{r(),n()}).observe(c)}const d=new IntersectionObserver(c=>{c.forEach(f=>{if(!document.querySelector("path.toc-marker"))return;const h=f.target.getAttribute("id"),o=document.querySelector(`nav.toc li a[href="#${h}"]`);if(!o)return;const a=f.intersectionRatio<=0,m=document.querySelectorAll("a.active").length===1;if(a&&m){const g=document.querySelector("a.active");g?.classList.remove("active"),g?.removeAttribute("aria-current");return}a?(o.classList.remove("active"),o.removeAttribute("aria-current")):(o.classList.add("active"),o.setAttribute("aria-current","true")),n()})});l(),document.querySelectorAll("#main-wrapper>h2,#main-wrapper>h3,#main-wrapper>h4,#main-wrapper>h5,#main-wrapper>section>h2").forEach(c=>{d.observe(c)})}window.visualViewport&&window.visualViewport.width>930&&(r(),t())});const I=.25,$=`#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID == 1) ? 3.0 : -1.0, (gl_VertexID == 2) ? 3.0 : -1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}`,H=`#version 300 es
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
}`;function M(e){const i=e.replace("#","");return[parseInt(i.slice(0,2),16)/255,parseInt(i.slice(2,4),16)/255,parseInt(i.slice(4,6),16)/255]}function k(e,i,s){const r=e.createShader(i);return r?(e.shaderSource(r,s),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error("[hero3d] shader compile error:",e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function O(e,i,s){const r=e.createProgram();return r?(e.attachShader(r,i),e.attachShader(r,s),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)?r:(console.error("[hero3d] program link error:",e.getProgramInfoLog(r)),e.deleteProgram(r),null)):null}function z(e,i,s,r){const t=e.getContext("webgl2",{alpha:!0,antialias:!1,powerPreference:"low-power"});if(!t)return null;const n=k(t,t.VERTEX_SHADER,$),l=k(t,t.FRAGMENT_SHADER,H);if(!n||!l)return null;const d=O(t,n,l);if(!d)return null;t.useProgram(d);const c={resolution:t.getUniformLocation(d,"u_resolution"),time:t.getUniformLocation(d,"u_time"),colors:t.getUniformLocation(d,"u_colors[0]"),accent:t.getUniformLocation(d,"u_accent"),alpha:t.getUniformLocation(d,"u_alpha"),scroll:t.getUniformLocation(d,"u_scroll")},f=[];for(let a=0;a<4;a++){const m=i[a]??"#000000",[g,x,D]=M(m);f.push(g,x,D)}t.uniform3fv(c.colors,new Float32Array(f));const[u,h,o]=M(s);return t.uniform3f(c.accent,u,h,o),t.uniform1f(c.alpha,r),t.disable(t.BLEND),{resize(a,m){const g=Math.max(1,Math.round(a*I)),x=Math.max(1,Math.round(m*I));e.width=g,e.height=x,t.viewport(0,0,g,x),t.uniform2f(c.resolution,g,x)},render(a,m){t.useProgram(d),t.uniform1f(c.time,a),t.uniform1f(c.scroll,m),t.drawArrays(t.TRIANGLES,0,3)}}}function E(e,i,s){const r=e.replace("#","");let t=parseInt(r.slice(0,2),16)/255,n=parseInt(r.slice(2,4),16)/255,l=parseInt(r.slice(4,6),16)/255;const d=Math.max(t,n,l),c=Math.min(t,n,l),f=(d+c)/2,u=d-c;if(u>1e-4){const h=f>.5?u/(2-d-c):u/(d+c);let o=d===t?(n-l)/u+(n<l?6:0):d===n?(l-t)/u+2:(t-n)/u+4;o=o*60+i,o=(o%360+360)%360;const a=(1-Math.abs(2*f-1))*h,m=a*(1-Math.abs(o/60%2-1)),g=f-a/2;o<60?(t=a,n=m,l=0):o<120?(t=m,n=a,l=0):o<180?(t=0,n=a,l=m):o<240?(t=0,n=m,l=a):o<300?(t=m,n=0,l=a):(t=a,n=0,l=m),t=(t+g)*255,n=(n+g)*255,l=(l+g)*255}else t*=255,n*=255,l*=255;return`rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(l)}, ${s})`}let y=null,S=null,v=null,p=null,b=null,w=null,L=null,A=!0;const F=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function C(){y!=null&&(cancelAnimationFrame(y),y=null)}function _(){!F&&A&&!document.hidden&&S!=null?y==null&&(y=requestAnimationFrame(R)):C()}function P(){if(!v||!b||!S)return;const e=S.querySelector(".hero-art-img"),i=e?e.offsetWidth:b.width,s=e&&e.offsetHeight?e.offsetHeight:Math.round(i*(b.height/b.width)),r=i,t=s;if(v.style.width=`${i}px`,v.style.height=`${s}px`,v.width=r,v.height=t,w){const n=S.querySelector(".hero-art-canvas3d");n&&(n.style.width=`${i}px`,n.style.height=`${s}px`,w.resize(r,t))}}function q(e){if(!v||!p||!b)return;const i=v.width,s=v.height;p.clearRect(0,0,i,s);const r=p.createLinearGradient(0,0,0,s);r.addColorStop(0,b.background),r.addColorStop(1,b.backgroundBottom),p.fillStyle=r,p.fillRect(0,0,i,s);for(const t of b.fields){const n=t.cx+t.driftAmp*Math.sin(e*t.driftSpeed+t.phase),l=t.cy+t.driftAmp*Math.cos(e*t.driftSpeedY+t.phase*1.3),d=e*t.hueDrift,c=n*i,f=l*s,u=t.rx*i,h=t.ry*s,o=t.colors[1]??t.colors[0],a=t.colors[t.colors.length-1];p.save(),p.translate(c,f),p.scale(1,h/u);const m=p.createRadialGradient(0,0,0,0,0,u);m.addColorStop(0,E(t.colors[0],d,t.opacity)),m.addColorStop(.45,E(o,d,t.opacity*.75)),m.addColorStop(1,E(a,d,0)),p.fillStyle=m,p.beginPath(),p.arc(0,0,u,0,Math.PI*2),p.fill(),p.restore()}}function R(e){const i=e/1e3;q(i),w&&w.render(i,window.scrollY),S&&!S.classList.contains("is-animated")&&S.classList.add("is-animated"),y=requestAnimationFrame(R)}function T(){const e=document.querySelector(".hero-art");if(!e){C(),L&&(L.disconnect(),L=null),S=null,v=null,p=null,b=null,w=null;return}if(e.dataset.bound)return;e.dataset.bound="true";const i=e.getAttribute("data-art-config");if(!i||(S=e,b=JSON.parse(i),v=e.querySelector(".hero-art-canvas"),p=v?v.getContext("2d"):null,!v||!p))return;w=null;const s=e.querySelector(".hero-art-canvas3d");s&&(w=z(s,b.neon,b.accent,.9)),L&&L.disconnect(),A=!0,L=new IntersectionObserver(t=>{A=t[0]?.isIntersecting??!0,_()});const r=e.querySelector(".hero-art-img")??e;L.observe(r),C(),P(),q(0),w&&w.render(0,window.scrollY),S.classList.add("is-animated"),_()}document.addEventListener("astro:page-load",T);document.addEventListener("visibilitychange",_);window.addEventListener("resize",()=>{S&&(P(),q(0),w&&w.render(0,window.scrollY))});T();document.addEventListener("astro:page-load",()=>{const e=document.getElementById("section-indicator"),i=document.getElementById("section-indicator-text");if(!e||!i)return;const s=Array.from(document.querySelectorAll("#main-wrapper h2, #main-wrapper h3"));if(!s.length)return;const r=document.getElementById("main-wrapper"),t=r?r.offsetTop-window.innerHeight*.6:0,n=new Set;function l(){const o=s.find(a=>n.has(a));!o||o.textContent===i.textContent||(i.style.opacity="0",setTimeout(()=>{i.textContent=o.textContent.trim(),i.style.opacity="1"},150))}const d=new IntersectionObserver(o=>{o.forEach(a=>{a.isIntersecting?n.add(a.target):n.delete(a.target)}),l()},{rootMargin:"-20% 0px -70% 0px",threshold:0});s.forEach(o=>d.observe(o));let c=window.scrollY,f=!1;function u(){const o=window.scrollY,a=o>t&&o>c;e.classList.toggle("visible",a),c=o,f=!1}function h(){f||(requestAnimationFrame(u),f=!0)}window.addEventListener("scroll",h,{passive:!0}),h()});
