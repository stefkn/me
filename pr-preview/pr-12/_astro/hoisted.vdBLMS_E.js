import"./ViewTransitions.astro_astro_type_script_index_0_lang.T1cABFxu.js";import"./index.PDhEm6KS.js";document.addEventListener("astro:page-load",()=>{var o=document.querySelector("main.wrapper");if(o){var i=o.querySelectorAll("p");i.forEach(function(t){t.getElementsByTagName("img").length===1&&(t.style.width="100%",t.style.gridColumn="1 / 4")})}const c=document.getElementById("toggle-hide-side-mobile"),e=document.getElementById("article-aside");if(c&&e){const t=()=>{const n=e.classList.contains("open");c.textContent=n?"hide table of contents":"table of contents",c.setAttribute("aria-expanded",String(n))};c.addEventListener("click",()=>{e.classList.toggle("open"),t()}),t()}});document.addEventListener("astro:page-load",()=>{const o=new WeakMap,i=new WeakMap;function c(){const t=document.querySelector("path.toc-marker"),n=Array.from(document.querySelectorAll("nav.toc a"));if(!n.length)return;const r=[];let s=10;n.forEach((d,f)=>{const a=d.offsetLeft,u=d.offsetTop,l=d.offsetHeight;f===0?(o.set(d,0),r.push("M",String(a),String(u),"L",String(a),String(u+l))):(s!==a&&r.push("L",String(s),String(u)),r.push("L",String(a),String(u)),t&&t.setAttribute("d",r.join(" ")),o.set(d,t.getTotalLength()),r.push("L",String(a),String(u+l))),s=a,t.setAttribute("d",r.join(" ")),i.set(d,t.getTotalLength())})}function e(){function t(){if(!document.querySelector("path.toc-marker"))return;const s=document.querySelector("path.toc-marker"),d=s.getTotalLength();let f=document.querySelectorAll("a.active"),a=d,u=0;f=document.querySelectorAll("a.active"),f.forEach(l=>{a=Math.min(a,o.get(l)),u=Math.max(u,i.get(l))}),s.style.display=f.length?"inline":"none",s.setAttribute("stroke-dasharray",`1 ${a} ${u-a} ${d}`)}function n(){if(!document.querySelector("nav.toc"))return;new ResizeObserver(()=>{c(),t()}).observe(document.querySelector("nav.toc"))}const r=new IntersectionObserver(s=>{s.forEach(d=>{if(!document.querySelector("path.toc-marker"))return;const f=d.target;if(!f)return;const a=f.getAttribute("id"),u=document.querySelector(`nav.toc li a[href="#${a}"]`);if(!u)return;const l=d.intersectionRatio>0?"add":"remove",m=document.querySelectorAll("a.active").length===1;if(l==="remove"&&m){document.querySelectorAll("a.active")[0].classList.remove("active");return}u.classList[l]("active"),t()})});n(),document.querySelectorAll("#main-wrapper>h2,#main-wrapper>h3,#main-wrapper>h4,#main-wrapper>h5,#main-wrapper>section>h2").forEach(s=>{r.observe(s)})}window.visualViewport.width>930&&(c(),e())});const _=.25,T=`#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID == 1) ? 3.0 : -1.0, (gl_VertexID == 2) ? 3.0 : -1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}`,k=`#version 300 es
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
}`;function D(o){const i=o.replace("#","");return[parseInt(i.slice(0,2),16)/255,parseInt(i.slice(2,4),16)/255,parseInt(i.slice(4,6),16)/255]}function M(o,i,c){const e=o.createShader(i);return e?(o.shaderSource(e,c),o.compileShader(e),o.getShaderParameter(e,o.COMPILE_STATUS)?e:(console.error("[hero3d] shader compile error:",o.getShaderInfoLog(e)),o.deleteShader(e),null)):null}function $(o,i,c){const e=o.createProgram();return e?(o.attachShader(e,i),o.attachShader(e,c),o.linkProgram(e),o.getProgramParameter(e,o.LINK_STATUS)?e:(console.error("[hero3d] program link error:",o.getProgramInfoLog(e)),o.deleteProgram(e),null)):null}function z(o,i,c){const e=o.getContext("webgl2",{alpha:!0,antialias:!1,powerPreference:"low-power"});if(!e)return null;const t=M(e,e.VERTEX_SHADER,T),n=M(e,e.FRAGMENT_SHADER,k);if(!t||!n)return null;const r=$(e,t,n);if(!r)return null;e.useProgram(r);const s={resolution:e.getUniformLocation(r,"u_resolution"),time:e.getUniformLocation(r,"u_time"),colors:e.getUniformLocation(r,"u_colors[0]"),alpha:e.getUniformLocation(r,"u_alpha"),scroll:e.getUniformLocation(r,"u_scroll")},d=[];for(let f=0;f<4;f++){const a=i[f]??"#000000",[u,l,m]=D(a);d.push(u,l,m)}return e.uniform3fv(s.colors,new Float32Array(d)),e.uniform1f(s.alpha,c),e.disable(e.BLEND),{resize(f,a){const u=Math.max(1,Math.round(f*_)),l=Math.max(1,Math.round(a*_));o.width=u,o.height=l,e.viewport(0,0,u,l),e.uniform2f(s.resolution,u,l)},render(f,a){e.useProgram(r),e.uniform1f(s.time,f),e.uniform1f(s.scroll,a),e.drawArrays(e.TRIANGLES,0,3)}}}function x(o,i,c){const e=o.replace("#","");let t=parseInt(e.slice(0,2),16)/255,n=parseInt(e.slice(2,4),16)/255,r=parseInt(e.slice(4,6),16)/255;const s=Math.max(t,n,r),d=Math.min(t,n,r),f=(s+d)/2,a=s-d;if(a>1e-4){const u=f>.5?a/(2-s-d):a/(s+d);let l=s===t?(n-r)/a+(n<r?6:0):s===n?(r-t)/a+2:(t-n)/a+4;l=l*60+i,l=(l%360+360)%360;const m=(1-Math.abs(2*f-1))*u,v=m*(1-Math.abs(l/60%2-1)),w=f-m/2;l<60?(t=m,n=v,r=0):l<120?(t=v,n=m,r=0):l<180?(t=0,n=m,r=v):l<240?(t=0,n=v,r=m):l<300?(t=v,n=0,r=m):(t=m,n=0,r=v),t=(t+w)*255,n=(n+w)*255,r=(r+w)*255}else t*=255,n*=255,r*=255;return`rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${c})`}let L=null,b=null,p=null,h=null,g=null,S=null,y=null,E=!0;const O=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function A(){L!=null&&(cancelAnimationFrame(L),L=null)}function q(){!O&&E&&!document.hidden&&b!=null?L==null&&(L=requestAnimationFrame(C)):A()}function I(){if(!p||!g||!b)return;const o=b.querySelector(".hero-art-img"),i=o?o.offsetWidth:g.width,c=o&&o.offsetHeight?o.offsetHeight:Math.round(i*(g.height/g.width)),e=i,t=c;if(p.style.width=`${i}px`,p.style.height=`${c}px`,p.width=e,p.height=t,S){const n=b.querySelector(".hero-art-canvas3d");n&&(n.style.width=`${i}px`,n.style.height=`${c}px`,S.resize(e,t))}}function P(o){if(!p||!h||!g)return;const i=p.width,c=p.height;h.clearRect(0,0,i,c);const e=h.createLinearGradient(0,0,0,c);e.addColorStop(0,g.background),e.addColorStop(1,g.backgroundBottom),h.fillStyle=e,h.fillRect(0,0,i,c);for(const t of g.fields){const n=t.cx+t.driftAmp*Math.sin(o*t.driftSpeed+t.phase),r=t.cy+t.driftAmp*Math.cos(o*t.driftSpeedY+t.phase*1.3),s=o*t.hueDrift,d=n*i,f=r*c,a=t.rx*i,u=t.ry*c,l=t.colors[1]??t.colors[0],m=t.colors[t.colors.length-1];h.save(),h.translate(d,f),h.scale(1,u/a);const v=h.createRadialGradient(0,0,0,0,0,a);v.addColorStop(0,x(t.colors[0],s,t.opacity)),v.addColorStop(.45,x(l,s,t.opacity*.75)),v.addColorStop(1,x(m,s,0)),h.fillStyle=v,h.beginPath(),h.arc(0,0,a,0,Math.PI*2),h.fill(),h.restore()}}function C(o){const i=o/1e3;P(i),S&&S.render(i,window.scrollY),b&&!b.classList.contains("is-animated")&&b.classList.add("is-animated"),L=requestAnimationFrame(C)}function R(){const o=document.querySelector(".hero-art");if(!o){A(),y&&(y.disconnect(),y=null),b=null,p=null,h=null,g=null,S=null;return}if(o.dataset.bound)return;o.dataset.bound="true";const i=o.getAttribute("data-art-config");if(!i||(b=o,g=JSON.parse(i),p=o.querySelector(".hero-art-canvas"),h=p?p.getContext("2d"):null,!p||!h))return;S=null;const c=o.querySelector(".hero-art-canvas3d");c&&(S=z(c,g.neon,.9)),y&&y.disconnect(),E=!0,y=new IntersectionObserver(t=>{E=t[0]?.isIntersecting??!0,q()});const e=o.querySelector(".hero-art-img")??o;y.observe(e),A(),I(),P(0),S&&S.render(0,window.scrollY),b.classList.add("is-animated"),q()}document.addEventListener("astro:page-load",R);document.addEventListener("visibilitychange",q);window.addEventListener("resize",()=>{b&&I()});R();
