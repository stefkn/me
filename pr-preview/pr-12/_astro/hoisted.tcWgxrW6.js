import"./ViewTransitions.astro_astro_type_script_index_0_lang.T1cABFxu.js";import"./index.PDhEm6KS.js";document.addEventListener("astro:page-load",()=>{var o=document.querySelector("main.wrapper");if(o){var i=o.querySelectorAll("p");i.forEach(function(e){e.getElementsByTagName("img").length===1&&(e.style.width="100%",e.style.gridColumn="1 / 4")})}const c=document.getElementById("toggle-hide-side-mobile"),t=document.getElementById("article-aside");if(c&&t){const e=()=>{const n=t.classList.contains("open");c.textContent=n?"hide table of contents":"table of contents",c.setAttribute("aria-expanded",String(n))};c.addEventListener("click",()=>{t.classList.toggle("open"),e()}),e()}});document.addEventListener("astro:page-load",()=>{const o=new WeakMap,i=new WeakMap;function c(){const e=document.querySelector("path.toc-marker"),n=Array.from(document.querySelectorAll("nav.toc a"));if(!n.length)return;const r=[];let s=10;n.forEach((u,f)=>{const a=u.offsetLeft,d=u.offsetTop,l=u.offsetHeight;f===0?(o.set(u,0),r.push("M",String(a),String(d),"L",String(a),String(d+l))):(s!==a&&r.push("L",String(s),String(d)),r.push("L",String(a),String(d)),e&&e.setAttribute("d",r.join(" ")),o.set(u,e.getTotalLength()),r.push("L",String(a),String(d+l))),s=a,e.setAttribute("d",r.join(" ")),i.set(u,e.getTotalLength())})}function t(){function e(){if(!document.querySelector("path.toc-marker"))return;const s=document.querySelector("path.toc-marker"),u=s.getTotalLength();let f=document.querySelectorAll("a.active"),a=u,d=0;f=document.querySelectorAll("a.active"),f.forEach(l=>{a=Math.min(a,o.get(l)),d=Math.max(d,i.get(l))}),s.style.display=f.length?"inline":"none",s.setAttribute("stroke-dasharray",`1 ${a} ${d-a} ${u}`)}function n(){if(!document.querySelector("nav.toc"))return;new ResizeObserver(()=>{c(),e()}).observe(document.querySelector("nav.toc"))}const r=new IntersectionObserver(s=>{s.forEach(u=>{if(!document.querySelector("path.toc-marker"))return;const f=u.target;if(!f)return;const a=f.getAttribute("id"),d=document.querySelector(`nav.toc li a[href="#${a}"]`);if(!d)return;const l=u.intersectionRatio>0?"add":"remove",m=document.querySelectorAll("a.active").length===1;if(l==="remove"&&m){document.querySelectorAll("a.active")[0].classList.remove("active");return}d.classList[l]("active"),e()})});n(),document.querySelectorAll("#main-wrapper>h2,#main-wrapper>h3,#main-wrapper>h4,#main-wrapper>h5,#main-wrapper>section>h2").forEach(s=>{r.observe(s)})}window.visualViewport.width>930&&(c(),t())});const x=.25,P=`#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID == 1) ? 3.0 : -1.0, (gl_VertexID == 2) ? 3.0 : -1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}`,I=`#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_colors[4];
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

  vec3 p = ro;
  for (int s = 0; s < 80; s++) {
    vec3 q = floor(p / CELL) * CELL + 0.5 * CELL;
    float f = map(q, t);
    if (f > thresh) {
      vec3 n = vec3(
        map(q + vec3(CELL, 0.0, 0.0), t) - map(q - vec3(CELL, 0.0, 0.0), t),
        map(q + vec3(0.0, CELL, 0.0), t) - map(q - vec3(0.0, CELL, 0.0), t),
        map(q + vec3(0.0, 0.0, CELL), t) - map(q - vec3(0.0, 0.0, CELL), t)
      );
      n = normalize(n + 1e-4);
      vec3 L = normalize(vec3(-0.5, 0.4, 1.0));
      float diff = clamp(dot(n, L), 0.0, 1.0);

      float shadeT = clamp((f - thresh) / 2.5, 0.0, 1.0);
      float jit = hash(dot(q, vec3(127.1, 311.7, 74.7)));
      shadeT = clamp(shadeT + (jit - 0.5) * 1.4, 0.0, 1.0);
      float fi = shadeT * 3.0;
      int i0 = int(fi);
      int i1 = min(i0 + 1, 3);
      vec3 bcol = mix(u_colors[i0], u_colors[i1], fract(fi));
      float brightJit = hash(dot(q, vec3(269.5, 183.3, 421.7)));
      col = bcol * (0.5 + 0.7 * diff) * (0.8 + 0.4 * brightJit);

      float depth = length(q - ro);
      col *= 1.0 - smoothstep(2.0, 8.0, depth) * 0.5;
      col *= u_alpha;
      break;
    }
    p += rd * CELL * 0.5;
  }

  outColor = vec4(col, 1.0);
}`;function T(o){const i=o.replace("#","");return[parseInt(i.slice(0,2),16)/255,parseInt(i.slice(2,4),16)/255,parseInt(i.slice(4,6),16)/255]}function A(o,i,c){const t=o.createShader(i);return t?(o.shaderSource(t,c),o.compileShader(t),o.getShaderParameter(t,o.COMPILE_STATUS)?t:(console.error("[hero3d] shader compile error:",o.getShaderInfoLog(t)),o.deleteShader(t),null)):null}function R(o,i,c){const t=o.createProgram();return t?(o.attachShader(t,i),o.attachShader(t,c),o.linkProgram(t),o.getProgramParameter(t,o.LINK_STATUS)?t:(console.error("[hero3d] program link error:",o.getProgramInfoLog(t)),o.deleteProgram(t),null)):null}function k(o,i,c){const t=o.getContext("webgl2",{alpha:!0,antialias:!1,powerPreference:"low-power"});if(!t)return null;const e=A(t,t.VERTEX_SHADER,P),n=A(t,t.FRAGMENT_SHADER,I);if(!e||!n)return null;const r=R(t,e,n);if(!r)return null;t.useProgram(r);const s={resolution:t.getUniformLocation(r,"u_resolution"),time:t.getUniformLocation(r,"u_time"),colors:t.getUniformLocation(r,"u_colors[0]"),alpha:t.getUniformLocation(r,"u_alpha"),scroll:t.getUniformLocation(r,"u_scroll")},u=[];for(let f=0;f<4;f++){const a=i[f]??"#000000",[d,l,m]=T(a);u.push(d,l,m)}return t.uniform3fv(s.colors,new Float32Array(u)),t.uniform1f(s.alpha,c),t.disable(t.BLEND),{resize(f,a){const d=Math.max(1,Math.round(f*x)),l=Math.max(1,Math.round(a*x));o.width=d,o.height=l,t.viewport(0,0,d,l),t.uniform2f(s.resolution,d,l)},render(f,a){t.useProgram(r),t.uniform1f(s.time,f),t.uniform1f(s.scroll,a),t.drawArrays(t.TRIANGLES,0,3)}}}function w(o,i,c){const t=o.replace("#","");let e=parseInt(t.slice(0,2),16)/255,n=parseInt(t.slice(2,4),16)/255,r=parseInt(t.slice(4,6),16)/255;const s=Math.max(e,n,r),u=Math.min(e,n,r),f=(s+u)/2,a=s-u;if(a>1e-4){const d=f>.5?a/(2-s-u):a/(s+u);let l=s===e?(n-r)/a+(n<r?6:0):s===n?(r-e)/a+2:(e-n)/a+4;l=l*60+i,l=(l%360+360)%360;const m=(1-Math.abs(2*f-1))*d,v=m*(1-Math.abs(l/60%2-1)),y=f-m/2;l<60?(e=m,n=v,r=0):l<120?(e=v,n=m,r=0):l<180?(e=0,n=m,r=v):l<240?(e=0,n=v,r=m):l<300?(e=v,n=0,r=m):(e=m,n=0,r=v),e=(e+y)*255,n=(n+y)*255,r=(r+y)*255}else e*=255,n*=255,r*=255;return`rgba(${Math.round(e)}, ${Math.round(n)}, ${Math.round(r)}, ${c})`}let L=null,S=null,p=null,h=null,g=null,b=null;const C=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function E(){L!=null&&(cancelAnimationFrame(L),L=null)}function _(){if(!p||!g||!S)return;const o=S.querySelector(".hero-art-img"),i=o?o.offsetWidth:g.width,c=o&&o.offsetHeight?o.offsetHeight:Math.round(i*(g.height/g.width)),t=i,e=c;if(p.style.width=`${i}px`,p.style.height=`${c}px`,p.width=t,p.height=e,b){const n=S.querySelector(".hero-art-canvas3d");n&&(n.style.width=`${i}px`,n.style.height=`${c}px`,b.resize(t,e))}}function $(o){if(!p||!h||!g)return;const i=p.width,c=p.height;h.clearRect(0,0,i,c);const t=h.createLinearGradient(0,0,0,c);t.addColorStop(0,g.background),t.addColorStop(1,g.backgroundBottom),h.fillStyle=t,h.fillRect(0,0,i,c);for(const e of g.fields){const n=e.cx+e.driftAmp*Math.sin(o*e.driftSpeed+e.phase),r=e.cy+e.driftAmp*Math.cos(o*e.driftSpeedY+e.phase*1.3),s=o*e.hueDrift,u=n*i,f=r*c,a=e.rx*i,d=e.ry*c,l=e.colors[1]??e.colors[0],m=e.colors[e.colors.length-1];h.save(),h.translate(u,f),h.scale(1,d/a);const v=h.createRadialGradient(0,0,0,0,0,a);v.addColorStop(0,w(e.colors[0],s,e.opacity)),v.addColorStop(.45,w(l,s,e.opacity*.75)),v.addColorStop(1,w(m,s,0)),h.fillStyle=v,h.beginPath(),h.arc(0,0,a,0,Math.PI*2),h.fill(),h.restore()}}function q(o){const i=o/1e3;$(i),b&&b.render(i,window.scrollY),S&&!S.classList.contains("is-animated")&&S.classList.add("is-animated"),C||(L=requestAnimationFrame(q))}function M(){const o=document.querySelector(".hero-art");if(!o){E(),S=null,p=null,h=null,g=null,b=null;return}if(o.dataset.bound)return;o.dataset.bound="true";const i=o.getAttribute("data-art-config");if(!i||(S=o,g=JSON.parse(i),p=o.querySelector(".hero-art-canvas"),h=p?p.getContext("2d"):null,!p||!h))return;b=null;const c=o.querySelector(".hero-art-canvas3d");c&&(b=k(c,g.neon,.9)),E(),_(),L=requestAnimationFrame(q)}document.addEventListener("astro:page-load",M);document.addEventListener("visibilitychange",()=>{document.hidden?E():S&&!C&&L==null&&(L=requestAnimationFrame(q))});window.addEventListener("resize",()=>{S&&_()});M();
