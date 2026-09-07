import"./ViewTransitions.astro_astro_type_script_index_0_lang.T1cABFxu.js";import"./index.PDhEm6KS.js";document.addEventListener("astro:page-load",()=>{var o=document.querySelector("main.wrapper");if(o){var c=o.querySelectorAll("p");c.forEach(function(t){t.getElementsByTagName("img").length===1&&(t.style.width="100%",t.style.gridColumn="1 / 4")})}const n=document.getElementById("toggle-hide-side-mobile"),e=document.getElementById("article-aside");if(n&&e){const t=()=>{const i=e.classList.contains("open");n.textContent=i?"hide table of contents":"table of contents",n.setAttribute("aria-expanded",String(i))};n.addEventListener("click",()=>{e.classList.toggle("open"),t()}),t()}});document.addEventListener("astro:page-load",()=>{const o=new WeakMap,c=new WeakMap;function n(){const t=document.querySelector("path.toc-marker"),i=Array.from(document.querySelectorAll("nav.toc a"));if(!i.length)return;const a=[];let l=10;i.forEach((d,h)=>{const r=d.offsetLeft,f=d.offsetTop,s=d.offsetHeight;h===0?(o.set(d,0),a.push("M",String(r),String(f),"L",String(r),String(f+s))):(l!==r&&a.push("L",String(l),String(f)),a.push("L",String(r),String(f)),t&&t.setAttribute("d",a.join(" ")),o.set(d,t.getTotalLength()),a.push("L",String(r),String(f+s))),l=r,t.setAttribute("d",a.join(" ")),c.set(d,t.getTotalLength())})}function e(){function t(){if(!document.querySelector("path.toc-marker"))return;const l=document.querySelector("path.toc-marker"),d=l.getTotalLength();let h=document.querySelectorAll("a.active"),r=d,f=0;h=document.querySelectorAll("a.active"),h.forEach(s=>{r=Math.min(r,o.get(s)),f=Math.max(f,c.get(s))}),l.style.display=h.length?"inline":"none",l.setAttribute("stroke-dasharray",`1 ${r} ${f-r} ${d}`)}function i(){if(!document.querySelector("nav.toc"))return;new ResizeObserver(()=>{n(),t()}).observe(document.querySelector("nav.toc"))}const a=new IntersectionObserver(l=>{l.forEach(d=>{if(!document.querySelector("path.toc-marker"))return;const h=d.target;if(!h)return;const r=h.getAttribute("id"),f=document.querySelector(`nav.toc li a[href="#${r}"]`);if(!f)return;const s=d.intersectionRatio>0?"add":"remove",u=document.querySelectorAll("a.active").length===1;if(s==="remove"&&u){document.querySelectorAll("a.active")[0].classList.remove("active");return}f.classList[s]("active"),t()})});i(),document.querySelectorAll("#main-wrapper>h2,#main-wrapper>h3,#main-wrapper>h4,#main-wrapper>h5,#main-wrapper>section>h2").forEach(l=>{a.observe(l)})}window.visualViewport.width>930&&(n(),e())});const M=.25,D=`#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID == 1) ? 3.0 : -1.0, (gl_VertexID == 2) ? 3.0 : -1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}`,$=`#version 300 es
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
        vec3(1.0) * spec * 1.0 +
        vec3(1.0) * rim * 0.5;

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
}`;function z(o){const c=o.replace("#","");return[parseInt(c.slice(0,2),16)/255,parseInt(c.slice(2,4),16)/255,parseInt(c.slice(4,6),16)/255]}function O(o,c){let n=parseInt(o.slice(1,3),16)/255,e=parseInt(o.slice(3,5),16)/255,t=parseInt(o.slice(5,7),16)/255;const i=Math.max(n,e,t),a=Math.min(n,e,t),l=(i+a)/2,d=i-a;if(d>1e-4){const h=l>.5?d/(2-i-a):d/(i+a);let r=i===n?(e-t)/d+(e<t?6:0):i===e?(t-n)/d+2:(n-e)/d+4;r=r*60+c,r=(r%360+360)%360;const f=(1-Math.abs(2*l-1))*h,s=f*(1-Math.abs(r/60%2-1)),u=l-f/2;r<60?(n=f,e=s,t=0):r<120?(n=s,e=f,t=0):r<180?(n=0,e=f,t=s):r<240?(n=0,e=s,t=f):r<300?(n=s,e=0,t=f):(n=f,e=0,t=s),n+=u,e+=u,t+=u}return[n,e,t]}function _(o,c,n){const e=o.createShader(c);return e?(o.shaderSource(e,n),o.compileShader(e),o.getShaderParameter(e,o.COMPILE_STATUS)?e:(console.error("[hero3d] shader compile error:",o.getShaderInfoLog(e)),o.deleteShader(e),null)):null}function H(o,c,n){const e=o.createProgram();return e?(o.attachShader(e,c),o.attachShader(e,n),o.linkProgram(e),o.getProgramParameter(e,o.LINK_STATUS)?e:(console.error("[hero3d] program link error:",o.getProgramInfoLog(e)),o.deleteProgram(e),null)):null}function F(o,c,n){const e=o.getContext("webgl2",{alpha:!0,antialias:!1,powerPreference:"low-power"});if(!e)return null;const t=_(e,e.VERTEX_SHADER,D),i=_(e,e.FRAGMENT_SHADER,$);if(!t||!i)return null;const a=H(e,t,i);if(!a)return null;e.useProgram(a);const l={resolution:e.getUniformLocation(a,"u_resolution"),time:e.getUniformLocation(a,"u_time"),colors:e.getUniformLocation(a,"u_colors[0]"),alpha:e.getUniformLocation(a,"u_alpha"),scroll:e.getUniformLocation(a,"u_scroll")},d=c.slice(0,4),h=[];for(let r=0;r<4;r++){const f=c[r]??"#000000",[s,u,m]=z(f);h.push(s,u,m)}return e.uniform3fv(l.colors,new Float32Array(h)),e.uniform1f(l.alpha,n),e.disable(e.BLEND),{resize(r,f){const s=Math.max(1,Math.round(r*M)),u=Math.max(1,Math.round(f*M));o.width=s,o.height=u,e.viewport(0,0,s,u),e.uniform2f(l.resolution,s,u)},render(r,f){const s=24*Math.sin(r*.12),u=[];for(let m=0;m<4;m++){const[w,T,k]=O(d[m]??"#000000",s);u.push(w,T,k)}e.useProgram(a),e.uniform3fv(l.colors,new Float32Array(u)),e.uniform1f(l.time,r),e.uniform1f(l.scroll,f),e.drawArrays(e.TRIANGLES,0,3)}}}function x(o,c,n){const e=o.replace("#","");let t=parseInt(e.slice(0,2),16)/255,i=parseInt(e.slice(2,4),16)/255,a=parseInt(e.slice(4,6),16)/255;const l=Math.max(t,i,a),d=Math.min(t,i,a),h=(l+d)/2,r=l-d;if(r>1e-4){const f=h>.5?r/(2-l-d):r/(l+d);let s=l===t?(i-a)/r+(i<a?6:0):l===i?(a-t)/r+2:(t-i)/r+4;s=s*60+c,s=(s%360+360)%360;const u=(1-Math.abs(2*h-1))*f,m=u*(1-Math.abs(s/60%2-1)),w=h-u/2;s<60?(t=u,i=m,a=0):s<120?(t=m,i=u,a=0):s<180?(t=0,i=u,a=m):s<240?(t=0,i=m,a=u):s<300?(t=m,i=0,a=u):(t=u,i=0,a=m),t=(t+w)*255,i=(i+w)*255,a=(a+w)*255}else t*=255,i*=255,a*=255;return`rgba(${Math.round(t)}, ${Math.round(i)}, ${Math.round(a)}, ${n})`}let L=null,b=null,v=null,p=null,g=null,S=null,y=null,E=!0;const U=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function A(){L!=null&&(cancelAnimationFrame(L),L=null)}function q(){!U&&E&&!document.hidden&&b!=null?L==null&&(L=requestAnimationFrame(P)):A()}function I(){if(!v||!g||!b)return;const o=b.querySelector(".hero-art-img"),c=o?o.offsetWidth:g.width,n=o&&o.offsetHeight?o.offsetHeight:Math.round(c*(g.height/g.width)),e=c,t=n;if(v.style.width=`${c}px`,v.style.height=`${n}px`,v.width=e,v.height=t,S){const i=b.querySelector(".hero-art-canvas3d");i&&(i.style.width=`${c}px`,i.style.height=`${n}px`,S.resize(e,t))}}function C(o){if(!v||!p||!g)return;const c=v.width,n=v.height;p.clearRect(0,0,c,n);const e=p.createLinearGradient(0,0,0,n);e.addColorStop(0,g.background),e.addColorStop(1,g.backgroundBottom),p.fillStyle=e,p.fillRect(0,0,c,n);for(const t of g.fields){const i=t.cx+t.driftAmp*Math.sin(o*t.driftSpeed+t.phase),a=t.cy+t.driftAmp*Math.cos(o*t.driftSpeedY+t.phase*1.3),l=o*t.hueDrift,d=i*c,h=a*n,r=t.rx*c,f=t.ry*n,s=t.colors[1]??t.colors[0],u=t.colors[t.colors.length-1];p.save(),p.translate(d,h),p.scale(1,f/r);const m=p.createRadialGradient(0,0,0,0,0,r);m.addColorStop(0,x(t.colors[0],l,t.opacity)),m.addColorStop(.45,x(s,l,t.opacity*.75)),m.addColorStop(1,x(u,l,0)),p.fillStyle=m,p.beginPath(),p.arc(0,0,r,0,Math.PI*2),p.fill(),p.restore()}}function P(o){const c=o/1e3;C(c),S&&S.render(c,window.scrollY),b&&!b.classList.contains("is-animated")&&b.classList.add("is-animated"),L=requestAnimationFrame(P)}function R(){const o=document.querySelector(".hero-art");if(!o){A(),y&&(y.disconnect(),y=null),b=null,v=null,p=null,g=null,S=null;return}if(o.dataset.bound)return;o.dataset.bound="true";const c=o.getAttribute("data-art-config");if(!c||(b=o,g=JSON.parse(c),v=o.querySelector(".hero-art-canvas"),p=v?v.getContext("2d"):null,!v||!p))return;S=null;const n=o.querySelector(".hero-art-canvas3d");n&&(S=F(n,g.neon,.9)),y&&y.disconnect(),E=!0,y=new IntersectionObserver(t=>{E=t[0]?.isIntersecting??!0,q()});const e=o.querySelector(".hero-art-img")??o;y.observe(e),A(),I(),C(0),S&&S.render(0,window.scrollY),b.classList.add("is-animated"),q()}document.addEventListener("astro:page-load",R);document.addEventListener("visibilitychange",q);window.addEventListener("resize",()=>{b&&I()});R();
