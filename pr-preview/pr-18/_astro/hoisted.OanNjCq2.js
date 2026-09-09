import"./ViewTransitions.astro_astro_type_script_index_0_lang.T1cABFxu.js";import"./index.PDhEm6KS.js";document.addEventListener("astro:page-load",()=>{var e=document.querySelector("main.wrapper");if(e){var o=e.querySelectorAll("p");o.forEach(function(t){t.getElementsByTagName("img").length===1&&(t.style.width="100%",t.style.gridColumn="1 / 4")})}const n=document.getElementById("toggle-hide-side-mobile"),i=document.getElementById("article-aside");if(n&&i){const t=()=>{const a=i.classList.contains("open");n.textContent=a?"hide table of contents":"table of contents",n.setAttribute("aria-expanded",String(a))};n.addEventListener("click",()=>{i.classList.toggle("open"),t()}),t()}});const it=10;document.addEventListener("astro:page-load",()=>{const e=new WeakMap,o=new WeakMap;function n(a){const c=a.getClientRects();return c.length?c[0]:a.getBoundingClientRect()}function i(){const a=document.querySelector("path.toc-marker"),c=Array.from(document.querySelectorAll("nav.toc a"));if(!c.length||!a)return;const h=a.ownerSVGElement.getBoundingClientRect(),g=c.map(r=>{const l=n(r);return{link:r,x:l.left-h.left-it,top:l.top-h.top,bottom:l.bottom-h.top}}),u=[];let f=null;g.forEach(r=>{f?(f.x!==r.x&&u.push("L",String(f.x),String(r.top)),u.push("L",String(r.x),String(r.top)),a.setAttribute("d",u.join(" ")),e.set(r.link,a.getTotalLength()),u.push("L",String(r.x),String(r.bottom))):(e.set(r.link,0),u.push("M",String(r.x),String(r.top),"L",String(r.x),String(r.bottom))),f=r,a.setAttribute("d",u.join(" ")),o.set(r.link,a.getTotalLength())})}function t(){function a(){const h=document.querySelector("path.toc-marker");if(!h)return;const g=h.getTotalLength(),u=document.querySelectorAll("a.active");let f=g,r=0;u.forEach(l=>{f=Math.min(f,e.get(l)??0),r=Math.max(r,o.get(l)??0)}),h.style.display=u.length?"inline":"none",h.setAttribute("stroke-dasharray",`1 ${f} ${r-f} ${g}`)}function c(){const h=document.querySelector("nav.toc");if(!h)return;new ResizeObserver(()=>{i(),a()}).observe(h)}const s=new IntersectionObserver(h=>{h.forEach(g=>{if(!document.querySelector("path.toc-marker"))return;const f=g.target.getAttribute("id"),r=document.querySelector(`nav.toc li a[href="#${f}"]`);if(!r)return;const l=g.intersectionRatio<=0,d=document.querySelectorAll("a.active").length===1;if(l&&d){const p=document.querySelector("a.active");p?.classList.remove("active"),p?.removeAttribute("aria-current");return}l?(r.classList.remove("active"),r.removeAttribute("aria-current")):(r.classList.add("active"),r.setAttribute("aria-current","true")),a()})});c(),document.querySelectorAll("#main-wrapper>h2,#main-wrapper>h3,#main-wrapper>h4,#main-wrapper>h5,#main-wrapper>section>h2").forEach(h=>{s.observe(h)})}window.visualViewport&&window.visualViewport.width>930&&(i(),t())});const at="2026-09-09T00:40:56.346Z",rt={"codioful-formerly-gradienta-LeG68PrXA6Y-unsplash.jpg":{hash:"b9131710ad8e7b1b679f6fbaa4f9d1f0924cc53b",swatches:[{L:.901,C:.06,H:81.1,weight:.238},{L:.725,C:.127,H:249.7,weight:.216},{L:.687,C:.205,H:2.4,weight:.187},{L:.827,C:.063,H:212.1,weight:.172},{L:.81,C:.093,H:30.1,weight:.125},{L:.567,C:.209,H:303.9,weight:.061}]},"codioful-formerly-gradienta-O10vBIDRkZw-unsplash.jpg":{hash:"8a28800eb1235769aef1d5db3b3e0cd1327e4e84",swatches:[{L:.664,C:.246,H:351.5,weight:.251},{L:.892,C:.093,H:84.1,weight:.196},{L:.799,C:.082,H:26.9,weight:.163},{L:.704,C:.127,H:348.8,weight:.158},{L:.543,C:.215,H:309.2,weight:.128},{L:.816,C:.086,H:199.6,weight:.104}]},"codioful-formerly-gradienta-ix_kUDzCczo-unsplash.jpg":{hash:"4a4d6213833373afac995ce309133148b862fb3b",swatches:[{L:.647,C:.244,H:1.3,weight:.299},{L:.773,C:.11,H:190,weight:.164},{L:.744,C:.05,H:97.2,weight:.147},{L:.589,C:.156,H:324,weight:.145},{L:.69,C:.109,H:20.2,weight:.142},{L:.465,C:.217,H:299.5,weight:.103}]},"gradient_bg.jpg":{hash:"c380adb26f2d8cb88fb2ce409e6ba785c84b4193",swatches:[{L:.844,C:.084,H:66.5,weight:.351},{L:.603,C:.128,H:240.2,weight:.222},{L:.744,C:.132,H:48,weight:.158},{L:.837,C:.082,H:194.3,weight:.092},{L:.497,C:.17,H:261.1,weight:.089},{L:.644,C:.119,H:344.9,weight:.088}]},"sean-sinclair-5nNsBN3FNzo-unsplash.jpg":{hash:"d98dfdb5179917b5ea4e23e50fb76140307697b0",swatches:[{L:.839,C:.062,H:328.3,weight:.264},{L:.713,C:.13,H:16.8,weight:.213},{L:.787,C:.093,H:49.4,weight:.161},{L:.603,C:.09,H:339.9,weight:.138},{L:.856,C:.084,H:135.7,weight:.123},{L:.493,C:.191,H:290.7,weight:.1}]},"sean-sinclair-BKhL-edg4Q4-unsplash.jpg":{hash:"281b49641bf673e8203ebbae21e15df2e81e125f",swatches:[{L:.677,C:.077,H:307.7,weight:.278},{L:.811,C:.108,H:214.5,weight:.2},{L:.702,C:.129,H:252.3,weight:.147},{L:.615,C:.109,H:41.1,weight:.135},{L:.785,C:.038,H:162.9,weight:.134},{L:.734,C:.072,H:45.4,weight:.107}]},"sean-sinclair-GDzUX58Y1oU-unsplash.jpg":{hash:"a483496f562a7eb451ef9a85265b8bc6ba3d2dc8",swatches:[{L:.645,C:.052,H:9.2,weight:.271},{L:.732,C:.018,H:330.4,weight:.246},{L:.545,C:.103,H:49.2,weight:.159},{L:.805,C:.1,H:214,weight:.149},{L:.357,C:.078,H:19.5,weight:.105},{L:.7,C:.144,H:248.9,weight:.07}]},"sean-sinclair-NrOdW2tCr8A-unsplash.jpg":{hash:"09a7b2b9f38c0d4f55954ffce17c31d1bcb09f2a",swatches:[{L:.782,C:.039,H:199,weight:.256},{L:.754,C:.098,H:274.5,weight:.219},{L:.72,C:.168,H:310.9,weight:.189},{L:.653,C:.166,H:328.6,weight:.117},{L:.722,C:.06,H:39.8,weight:.113},{L:.645,C:.158,H:31.6,weight:.105}]},"sean-sinclair-RekH1pSyvGs-unsplash.jpg":{hash:"ca2b546aa73d76ba2a6115139ff5b8ea27502fdc",swatches:[{L:.747,C:.122,H:241.4,weight:.275},{L:.746,C:.051,H:263.2,weight:.208},{L:.79,C:.032,H:344.4,weight:.183},{L:.743,C:.08,H:209.2,weight:.162},{L:.662,C:.156,H:283.1,weight:.091},{L:.749,C:.089,H:314.4,weight:.081}]},"sean-sinclair-Y0ydM5vRiNs-unsplash.jpg":{hash:"3d0abe26aa3edf9f4f56ac4b6176239107841b13",swatches:[{L:.435,C:.279,H:269.4,weight:.298},{L:.346,C:.235,H:265.4,weight:.241},{L:.734,C:.07,H:277.1,weight:.129},{L:.93,C:.102,H:98.3,weight:.127},{L:.236,C:.163,H:264.2,weight:.113},{L:.566,C:.175,H:294.9,weight:.091}]},"sean-sinclair-Ye7EqyAmsb8-unsplash.jpg":{hash:"bea11bc7627c98fd936eb6ba61f6d8e10e27992b",swatches:[{L:.841,C:.059,H:342.2,weight:.261},{L:.69,C:.094,H:255.4,weight:.169},{L:.588,C:.217,H:288.4,weight:.158},{L:.581,C:.122,H:282,weight:.14},{L:.707,C:.057,H:56.2,weight:.14},{L:.651,C:.169,H:319.8,weight:.132}]},"sean-sinclair-fq1t-jpinwI-unsplash.jpg":{hash:"da9c5c8e0eb835d44841ff9f253d80863c78ece4",swatches:[{L:.609,C:.234,H:28.6,weight:.241},{L:.134,C:.038,H:283.8,weight:.201},{L:.693,C:.133,H:31.9,weight:.178},{L:.608,C:.195,H:354.7,weight:.174},{L:.379,C:.121,H:18.6,weight:.135},{L:.47,C:.197,H:315.7,weight:.07}]},"sean-sinclair-hQFh45kch74-unsplash.jpg":{hash:"c63cff63a0b3cb671d984849d276cdbb0dbe9823",swatches:[{L:.888,C:.064,H:58,weight:.318},{L:.434,C:.095,H:276.9,weight:.257},{L:.589,C:.162,H:11.5,weight:.122},{L:.668,C:.13,H:238.1,weight:.11},{L:.725,C:.111,H:56.2,weight:.099},{L:.561,C:.208,H:260,weight:.095}]},"sean-sinclair-oQqfUY_47is-unsplash.jpg":{hash:"8810538fc8170ed3fd2a7c7deb2ebc8939acc6b2",swatches:[{L:.752,C:.107,H:240.6,weight:.27},{L:.716,C:.102,H:303.9,weight:.189},{L:.634,C:.168,H:23.6,weight:.188},{L:.746,C:.053,H:143.9,weight:.122},{L:.701,C:.128,H:71.2,weight:.121},{L:.664,C:.129,H:346.2,weight:.11}]}},st=[{source:"codioful-formerly-gradienta-LeG68PrXA6Y-unsplash.jpg",swatches:[{L:.901,C:.06,H:81.1,weight:.238},{L:.725,C:.127,H:249.7,weight:.216},{L:.687,C:.205,H:2.4,weight:.187},{L:.827,C:.063,H:212.1,weight:.172},{L:.81,C:.093,H:30.1,weight:.125},{L:.567,C:.209,H:303.9,weight:.061}]},{source:"codioful-formerly-gradienta-O10vBIDRkZw-unsplash.jpg",swatches:[{L:.664,C:.246,H:351.5,weight:.251},{L:.892,C:.093,H:84.1,weight:.196},{L:.799,C:.082,H:26.9,weight:.163},{L:.704,C:.127,H:348.8,weight:.158},{L:.543,C:.215,H:309.2,weight:.128},{L:.816,C:.086,H:199.6,weight:.104}]},{source:"codioful-formerly-gradienta-ix_kUDzCczo-unsplash.jpg",swatches:[{L:.647,C:.244,H:1.3,weight:.299},{L:.773,C:.11,H:190,weight:.164},{L:.744,C:.05,H:97.2,weight:.147},{L:.589,C:.156,H:324,weight:.145},{L:.69,C:.109,H:20.2,weight:.142},{L:.465,C:.217,H:299.5,weight:.103}]},{source:"gradient_bg.jpg",swatches:[{L:.844,C:.084,H:66.5,weight:.351},{L:.603,C:.128,H:240.2,weight:.222},{L:.744,C:.132,H:48,weight:.158},{L:.837,C:.082,H:194.3,weight:.092},{L:.497,C:.17,H:261.1,weight:.089},{L:.644,C:.119,H:344.9,weight:.088}]},{source:"sean-sinclair-5nNsBN3FNzo-unsplash.jpg",swatches:[{L:.839,C:.062,H:328.3,weight:.264},{L:.713,C:.13,H:16.8,weight:.213},{L:.787,C:.093,H:49.4,weight:.161},{L:.603,C:.09,H:339.9,weight:.138},{L:.856,C:.084,H:135.7,weight:.123},{L:.493,C:.191,H:290.7,weight:.1}]},{source:"sean-sinclair-BKhL-edg4Q4-unsplash.jpg",swatches:[{L:.677,C:.077,H:307.7,weight:.278},{L:.811,C:.108,H:214.5,weight:.2},{L:.702,C:.129,H:252.3,weight:.147},{L:.615,C:.109,H:41.1,weight:.135},{L:.785,C:.038,H:162.9,weight:.134},{L:.734,C:.072,H:45.4,weight:.107}]},{source:"sean-sinclair-GDzUX58Y1oU-unsplash.jpg",swatches:[{L:.645,C:.052,H:9.2,weight:.271},{L:.732,C:.018,H:330.4,weight:.246},{L:.545,C:.103,H:49.2,weight:.159},{L:.805,C:.1,H:214,weight:.149},{L:.357,C:.078,H:19.5,weight:.105},{L:.7,C:.144,H:248.9,weight:.07}]},{source:"sean-sinclair-NrOdW2tCr8A-unsplash.jpg",swatches:[{L:.782,C:.039,H:199,weight:.256},{L:.754,C:.098,H:274.5,weight:.219},{L:.72,C:.168,H:310.9,weight:.189},{L:.653,C:.166,H:328.6,weight:.117},{L:.722,C:.06,H:39.8,weight:.113},{L:.645,C:.158,H:31.6,weight:.105}]},{source:"sean-sinclair-RekH1pSyvGs-unsplash.jpg",swatches:[{L:.747,C:.122,H:241.4,weight:.275},{L:.746,C:.051,H:263.2,weight:.208},{L:.79,C:.032,H:344.4,weight:.183},{L:.743,C:.08,H:209.2,weight:.162},{L:.662,C:.156,H:283.1,weight:.091},{L:.749,C:.089,H:314.4,weight:.081}]},{source:"sean-sinclair-Y0ydM5vRiNs-unsplash.jpg",swatches:[{L:.435,C:.279,H:269.4,weight:.298},{L:.346,C:.235,H:265.4,weight:.241},{L:.734,C:.07,H:277.1,weight:.129},{L:.93,C:.102,H:98.3,weight:.127},{L:.236,C:.163,H:264.2,weight:.113},{L:.566,C:.175,H:294.9,weight:.091}]},{source:"sean-sinclair-Ye7EqyAmsb8-unsplash.jpg",swatches:[{L:.841,C:.059,H:342.2,weight:.261},{L:.69,C:.094,H:255.4,weight:.169},{L:.588,C:.217,H:288.4,weight:.158},{L:.581,C:.122,H:282,weight:.14},{L:.707,C:.057,H:56.2,weight:.14},{L:.651,C:.169,H:319.8,weight:.132}]},{source:"sean-sinclair-fq1t-jpinwI-unsplash.jpg",swatches:[{L:.609,C:.234,H:28.6,weight:.241},{L:.134,C:.038,H:283.8,weight:.201},{L:.693,C:.133,H:31.9,weight:.178},{L:.608,C:.195,H:354.7,weight:.174},{L:.379,C:.121,H:18.6,weight:.135},{L:.47,C:.197,H:315.7,weight:.07}]},{source:"sean-sinclair-hQFh45kch74-unsplash.jpg",swatches:[{L:.888,C:.064,H:58,weight:.318},{L:.434,C:.095,H:276.9,weight:.257},{L:.589,C:.162,H:11.5,weight:.122},{L:.668,C:.13,H:238.1,weight:.11},{L:.725,C:.111,H:56.2,weight:.099},{L:.561,C:.208,H:260,weight:.095}]},{source:"sean-sinclair-oQqfUY_47is-unsplash.jpg",swatches:[{L:.752,C:.107,H:240.6,weight:.27},{L:.716,C:.102,H:303.9,weight:.189},{L:.634,C:.168,H:23.6,weight:.188},{L:.746,C:.053,H:143.9,weight:.122},{L:.701,C:.128,H:71.2,weight:.121},{L:.664,C:.129,H:346.2,weight:.11}]}],ct={generatedAt:at,cache:rt,palettes:st};function Z(e){let o=e>>>0;return function(){o|=0,o=o+1831565813|0;let n=Math.imul(o^o>>>15,1|o);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function Y(e){return e=Math.min(1,Math.max(0,e)),e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055}function q(e,o,n){const i=n*Math.PI/180,t=o*Math.cos(i),a=o*Math.sin(i),c=e+.3963377774*t+.2158037573*a,s=e-.1055613458*t-.0638541728*a,h=e-.0894841775*t-1.291485548*a,[g,u,f]=[c**3,s**3,h**3],r=4.0767416621*g-3.3077115913*u+.2309699292*f,l=-1.2684380046*g+2.6097574011*u-.3413193965*f,d=-.0041960863*g-.7034186147*u+1.707614701*f;return[Y(r)*255,Y(l)*255,Y(d)*255]}function ht(e){const o=Z(e),n=16,i=new Float32Array(n*n);for(let c=0;c<n*n;c++)i[c]=o()*Math.PI*2;function t(c,s){const h=(s%n+n)%n*n+(c%n+n)%n,g=i[h];return[Math.cos(g),Math.sin(g)]}const a=c=>c*c*c*(c*(c*6-15)+10);return function(s,h){const g=Math.floor(s),u=Math.floor(h),f=g+1,r=u+1,l=s-g,d=h-u,[p,m]=t(g,u),[H,w]=t(f,u),[y,T]=t(g,r),[P,B]=t(f,r),D=p*l+m*d,A=H*(l-1)+w*d,nt=y*l+T*(d-1),ot=P*(l-1)+B*(d-1),k=a(l),G=a(d);return(D*(1-k)+A*k)*(1-G)+(nt*(1-k)+ot*k)*G}}function j(e,o,n,i,t){const a=ht(e),c=new Float32Array(i*t);for(let s=0;s<t;s++)for(let h=0;h<i;h++){const g=h/(i-1),u=s/(t-1);let f=.5,r=o,l=0,d=0;for(let p=0;p<n;p++)l+=f*a(g*r,u*r),d+=f,f*=.5,r*=2;c[s*i+h]=l/d}return c}const lt=ct.palettes,gt={source:"fallback",swatches:[{L:.58,C:.17,H:265,weight:.2},{L:.68,C:.15,H:320,weight:.18},{L:.72,C:.1,H:200,weight:.16},{L:.52,C:.13,H:30,weight:.14},{L:.82,C:.06,H:130,weight:.12},{L:.46,C:.09,H:170,weight:.1}]};function ut(e){const o=[...e].sort((i,t)=>t.C-i.C),n=Math.ceil(o.length/2);return{sorted:o,rich:o.slice(0,n),wash:o.slice(n)}}const N=60,ft=.06;function J(e,o){const n=((e-o)%360+360)%360;return n>180?360-n:n}function dt(e){if(e.length<=1)return e.length;const o=e.map(a=>a.H).sort((a,c)=>a-c);let n=1,i=o[0],t=o[0];for(let a=1;a<o.length;a++){if(o[a]-i<N){t=o[a];continue}n++,i=o[a],t=o[a]}return n>1&&J(o[0],t)<N&&n--,n}function wt(e,o,n){const i=[...e.swatches].sort((s,h)=>h.C-s.C).slice(0,n);if(dt(i)>=n)return i;const t=o.flatMap(s=>s.swatches).filter(s=>s.C>=ft).sort((s,h)=>h.C-s.C),a=[i[0]],c=new Set(a);for(;a.length<n;){let s=null,h=-1/0;for(const g of t){if(c.has(g))continue;let u=1/0;for(const r of a){const l=J(r.H,g.H);l<u&&(u=l)}if(u<N)continue;const f=u+g.C*.01;f>h&&(h=f,s=g)}if(!s)break;a.push(s),c.add(s)}for(const s of i){if(a.length>=n)break;c.has(s)||(a.push(s),c.add(s))}return a}function pt(e,o){const n=e.L+(.58-e.L)*.35,i=Math.max(e.C,.2+o()*.1);return q(n,i,e.H)}function Lt(e,o){const n=e.at(-1)??o.at(-1),i=e.at(-2)??o.at(-2)??n;return{bgTop:q(n.L,n.C,n.H),bgBottom:q(i.L,i.C,i.H)}}function Ct(e,o,n,i){const t=Z(e),a=o.length>0?o:[gt],c=a[Math.floor(t()*a.length)],{sorted:s,wash:h}=ut(c.swatches),g=wt(c,a,Math.ceil(c.swatches.length/2)),u=t()*Math.PI*2,f=Math.min(g.length,1+(t()<.4?1:0)),r=new Set;for(;r.size<f;)r.add(Math.floor(t()*g.length));const l=[];return g.forEach((d,p)=>{const m=u+p/g.length*Math.PI*2+(t()-.5)*.5,H=.22+t()*.14,w=.7+d.weight*2.2,y=r.has(p);l.push({rgb:pt(d,t),cx:.5+Math.cos(m)*H,cy:.5+Math.sin(m)*H,rx:(y?.58+t()*.28:.5+t()*.25)*w,ry:(.42+t()*.2)*w,opacity:.95+t()*.2,core:y?.32+t()*.22:.12+t()*.1,hardness:y?2.6+t()*1.6:1.6+t()*.6,warpAmt:y?.22+t()*.16:.05+t()*.05,warpX:j(Math.floor(t()*1e6),2.5+t()*2,3,n,i),warpY:j(Math.floor(t()*1e6)+7919,2.5+t()*2,3,n,i),driftAmp:y?.05+t()*.05:.07+t()*.06,driftSpeed:.05+t()*.06,driftSpeedY:.06+t()*.09,phase:t()*Math.PI*2})}),h.forEach(d=>{const p=.7+d.weight*2.2;l.push({rgb:q(d.L,d.C,d.H),cx:-.3+t()*1.6,cy:-.3+t()*1.6,rx:(.85+t()*.35)*p,ry:(.7+t()*.3)*p,opacity:.38+t()*.14,core:0,hardness:1.1+t()*.4,warpAmt:.03+t()*.03,warpX:j(Math.floor(t()*1e6),2+t()*1.5,3,n,i),warpY:j(Math.floor(t()*1e6)+7919,2+t()*1.5,3,n,i),driftAmp:.14+t()*.1,driftSpeed:.05+t()*.06,driftSpeedY:.06+t()*.09,phase:t()*Math.PI*2})}),{fields:l,...Lt(h,s),source:c.source}}function mt(e,o,n){if(e<=o)return 1;const i=Math.max(.08,1-o),t=Math.min(1,(e-o)/i);return Math.pow(Math.max(0,1-t),n)}function Ht(e,o,n,i){const t=new Uint8ClampedArray(n*i*4);for(let a=0;a<i;a++)for(let c=0;c<n;c++){const s=a*n+c,h=c/(n-1),g=a/(i-1);let u=0,f=0,r=0,l=0;for(const w of e.fields){const y=w.cx+w.driftAmp*Math.sin(o*w.driftSpeed+w.phase),T=w.cy+w.driftAmp*Math.cos(o*w.driftSpeedY+w.phase*1.3),P=(h-y)/w.rx+w.warpX[s]*w.warpAmt,B=(g-T)/w.ry+w.warpY[s]*w.warpAmt,D=Math.hypot(P,B),A=w.opacity*mt(D,w.core,w.hardness);u+=w.rgb[0]*A,f+=w.rgb[1]*A,r+=w.rgb[2]*A,l+=A}const d=e.bgTop[0]+(e.bgBottom[0]-e.bgTop[0])*g,p=e.bgTop[1]+(e.bgBottom[1]-e.bgTop[1])*g,m=e.bgTop[2]+(e.bgBottom[2]-e.bgTop[2])*g;u+=d*.2,f+=p*.2,r+=m*.2,l+=.2;const H=s*4;t[H]=u/l,t[H+1]=f/l,t[H+2]=r/l,t[H+3]=255}return t}const $=.25,bt=`#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID == 1) ? 3.0 : -1.0, (gl_VertexID == 2) ? 3.0 : -1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}`,vt=`#version 300 es
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
}`;function V(e){const o=e.replace("#","");return[parseInt(o.slice(0,2),16)/255,parseInt(o.slice(2,4),16)/255,parseInt(o.slice(4,6),16)/255]}function X(e,o,n){const i=e.createShader(o);return i?(e.shaderSource(i,n),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS)?i:(console.error("[hero3d] shader compile error:",e.getShaderInfoLog(i)),e.deleteShader(i),null)):null}function yt(e,o,n){const i=e.createProgram();return i?(e.attachShader(i,o),e.attachShader(i,n),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)?i:(console.error("[hero3d] program link error:",e.getProgramInfoLog(i)),e.deleteProgram(i),null)):null}function St(e,o,n,i){const t=e.getContext("webgl2",{alpha:!0,antialias:!1,powerPreference:"low-power"});if(!t)return null;const a=X(t,t.VERTEX_SHADER,bt),c=X(t,t.FRAGMENT_SHADER,vt);if(!a||!c)return null;const s=yt(t,a,c);if(!s)return null;t.useProgram(s);const h={resolution:t.getUniformLocation(s,"u_resolution"),time:t.getUniformLocation(s,"u_time"),colors:t.getUniformLocation(s,"u_colors[0]"),accent:t.getUniformLocation(s,"u_accent"),alpha:t.getUniformLocation(s,"u_alpha"),scroll:t.getUniformLocation(s,"u_scroll")},g=[];for(let l=0;l<4;l++){const d=o[l]??"#000000",[p,m,H]=V(d);g.push(p,m,H)}t.uniform3fv(h.colors,new Float32Array(g));const[u,f,r]=V(n);return t.uniform3f(h.accent,u,f,r),t.uniform1f(h.alpha,i),t.disable(t.BLEND),{resize(l,d){const p=Math.max(1,Math.round(l*$)),m=Math.max(1,Math.round(d*$));e.width=p,e.height=m,t.viewport(0,0,p,m),t.uniform2f(h.resolution,p,m)},render(l,d){t.useProgram(s),t.uniform1f(h.time,l),t.uniform1f(h.scroll,d),t.drawArrays(t.TRIANGLES,0,3)}}}const I=76,R=43;let M=null,Q=null,S=null,E=null,_=null,v=null,C=null,L=null,b=null,x=null,U=!0;const xt=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function K(e){const o=n=>Math.round(Math.min(255,Math.max(0,n))).toString(16).padStart(2,"0");return`#${o(e[0])}${o(e[1])}${o(e[2])}`}function At(e){const o=e.fields.filter(a=>a.core>0),n=o.length>0?o:e.fields,i=Array.from({length:4},(a,c)=>{const s=n[c%n.length]??n[n.length-1];return s?K(s.rgb):"#000000"}),t=n.length>1?K(n[1].rgb):i[0];return{neon:i,accent:t}}function Mt(e,o){if(S&&S.width===e&&S.height===o)return S;S=document.createElement("canvas"),S.width=e,S.height=o;const n=S.getContext("2d"),i=n.createImageData(e,o);for(let t=0;t<i.data.length;t+=4){const a=128+(Math.random()-.5)*140;i.data[t]=a,i.data[t+1]=a,i.data[t+2]=a,i.data[t+3]=255}return n.putImageData(i,0,0),S}function O(e){if(!C||!L||!E)return;const o=C.width,n=C.height;M||(M=document.createElement("canvas"),M.width=I,M.height=R,Q=M.getContext("2d"));const i=Ht(E,e,I,R);Q.putImageData(new ImageData(new Uint8ClampedArray(i),I,R),0,0),L.imageSmoothingEnabled=!0,L.imageSmoothingQuality="high",L.clearRect(0,0,o,n),L.filter="blur(2px)",L.drawImage(M,0,0,I,R,0,0,o,n),L.filter="none",L.globalAlpha=.05,L.globalCompositeOperation="overlay",L.drawImage(Mt(o,n),0,0),L.globalAlpha=1,L.globalCompositeOperation="source-over"}function F(){_!=null&&(cancelAnimationFrame(_),_=null)}function z(){!xt&&U&&!document.hidden&&v!=null?_==null&&(_=requestAnimationFrame(tt)):F()}function W(){if(!C||!E||!v)return;const e=v.querySelector(".hero-art-img"),o=e?e.offsetWidth:1920,n=e&&e.offsetHeight?e.offsetHeight:Math.round(o*(1080/1920));if(C.style.width=`${o}px`,C.style.height=`${n}px`,C.width=o,C.height=n,b){const i=v.querySelector(".hero-art-canvas3d");i&&(i.style.width=`${o}px`,i.style.height=`${n}px`,b.resize(o,n))}}function tt(e){const o=e/1e3;O(o),b&&b.render(o,window.scrollY),v&&!v.classList.contains("is-animated")&&v.classList.add("is-animated"),_=requestAnimationFrame(tt)}function et(){const e=document.querySelector(".hero-art");if(!e){F(),x&&(x.disconnect(),x=null),v=null,C=null,L=null,E=null,b=null;return}if(e.dataset.bound)return;e.dataset.bound="true";const o=e.getAttribute("data-art-seed");if(o==null||(v=e,E=Ct(Number(o),lt,I,R),C=e.querySelector(".hero-art-canvas"),L=C?C.getContext("2d"):null,!C||!L))return;b=null;const n=e.querySelector(".hero-art-canvas3d");if(n){const{neon:t,accent:a}=At(E);b=St(n,t,a,.9)}x&&x.disconnect(),U=!0,x=new IntersectionObserver(t=>{U=t[0]?.isIntersecting??!0,z()});const i=e.querySelector(".hero-art-img")??e;x.observe(i),F(),W(),O(0),b&&b.render(0,window.scrollY),v.classList.add("is-animated"),z()}document.addEventListener("astro:page-load",et);document.addEventListener("visibilitychange",z);window.addEventListener("resize",()=>{v&&(W(),O(0),b&&b.render(0,window.scrollY))});et();document.addEventListener("astro:page-load",()=>{const e=document.getElementById("section-indicator"),o=document.getElementById("section-indicator-text");if(!e||!o)return;const n=Array.from(document.querySelectorAll("#main-wrapper h2, #main-wrapper h3"));if(!n.length)return;const i=document.getElementById("main-wrapper"),t=i?i.offsetTop-window.innerHeight*.6:0,a=new Set;function c(){const r=n.find(l=>a.has(l));!r||r.textContent===o.textContent||(o.style.opacity="0",setTimeout(()=>{o.textContent=r.textContent.trim(),o.style.opacity="1"},150))}const s=new IntersectionObserver(r=>{r.forEach(l=>{l.isIntersecting?a.add(l.target):a.delete(l.target)}),c()},{rootMargin:"-20% 0px -70% 0px",threshold:0});n.forEach(r=>s.observe(r));let h=window.scrollY,g=!1;function u(){const r=window.scrollY,l=r>t&&r>h;e.classList.toggle("visible",l),h=r,g=!1}function f(){g||(requestAnimationFrame(u),g=!0)}window.addEventListener("scroll",f,{passive:!0}),f()});
