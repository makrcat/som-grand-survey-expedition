(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();let P=Symbol,[I,Pe,je,ae,oe,Ze,et,se,ce,tt,rt,it]=Array.from(Array(12),P),H=P.toPrimitive,lt=Object.assign,Ee=globalThis,D=()=>{throw Error("dl")},Z=new Map([[rt,/\[\s*(?:(?<ns>\*|[-\w\P{ASCII}]*)\|)?(?<nm>[-\w\P{ASCII}]+)\s*(?:(?<op>\W?=)\s*(?<val>.+?)\s*(\s(?<case>[iIsS]))?\s*)?\]/gu],[Ze,/#(?<nm>[-\w\P{ASCII}]+)/gu],[et,/\.(?<nm>[-\w\P{ASCII}]+)/gu],[ae,/\s*,\s*/g],[oe,/\s*[\s>+~]\s*/g],[se,/::(?<nm>[-\w\P{ASCII}]+)(?:\((?<arg>¶*)\))?/gu],[ce,/:(?<nm>[-\w\P{ASCII}]+)(?:\((?<arg>¶*)\))?/gu],[tt,/(?:(?<ns>\*|[-\w\P{ASCII}]*)\|)?\*/gu],[it,/(?:(?<ns>\*|[-\w\P{ASCII}]*)\|)?(?<nm>[-\w\P{ASCII}]+)/gu]]),nt=e=>e==ce||e==se?RegExp(Z.get(e).source.replace("¶","."),"gu"):Z.get(e),at=(e,r)=>{let n=0,o="";for(;r<e.length;r++){let i=e[r];if(i=="("?++n:i==")"&&--n,o+=i,n===0)return o}return o},ot=/(['"])([^\\\n]*?)\1/g,Y=e=>{if((e=e.trim())==="")return[];let r=[];e=(e=e.replace(/\\./g,(i,l)=>(r.push({t:i,l}),"".repeat(i.length)))).replace(ot,(i,l,a,s)=>(r.push({t:i,l:s}),`${l}${"".repeat(a.length)}${l}`));{let i,l=0;for(;(i=e.indexOf("(",l))>-1;){let a=at(e,i);r.push({t:a,l:i}),e=`${e.substring(0,i)}(${"¶".repeat(a.length-2)})${e.substring(i+a.length)}`,l=i+a.length}}let n=(i=>{if(!i)return[];let l=[i];for(let[s,d]of Z.entries())for(let c=0;c<l.length;c++){let u=l[c];if(typeof u!="string")continue;d.lastIndex=0;let h=d.exec(u);if(!h)continue;let m=h.index-1,f=[],p=h[0],g=u.slice(0,m+1);g&&f.push(g),f.push({...h.groups,i:s,o:p});let v=u.slice(m+p.length+1);v&&f.push(v),l.splice(c,1,...f)}let a=0;for(let s of l)typeof s=="string"?D():(s.u=[a,a+=s.o.length],s.i!=oe&&s.i!=ae||(s.o=s.o.trim()||" "));return l})(e),o=[];for(let i of r.reverse())for(let l of n){let{l:a,t:s}=i;if(l.u[0]>a||a+s.length>l.u[1])continue;let{o:d}=l,c=a-l.u[0];l.o=d.slice(0,c)+s+d.slice(c+s.length),l.o!==d&&o.push(l)}for(let i of o){let l=nt(i.i);l||D(),l.lastIndex=0;let a=l.exec(i.o);a||D(),lt(i,a.groups)}return n},ke=e=>e.map(r=>r.o).join(""),b=(e,...r)=>({_:e,p:r}),W="dlc",Re=()=>[...Array(16)].reduce(e=>e+Math.random().toString(36)[2],""),qe=":global(",O="dlcss-",R=Ee.document,G=Ee.Node,de=e=>new Text(e),N=e=>new Comment(e),U=()=>O+Re(),M=()=>!1,ze=e=>{R=e[0],G=e[1],de=e[2],N=e[3],U=e[4],M=e[5]},Ne=()=>[R,G,de,N,U,M],Ve=new Map,Se=e=>typeof e=="symbol"&&re(e)?new q(e):e,We=e=>{let r={h:[],I:e,m:P()};Ve.set(r.m,r);let n=new Proxy(e,{get(o,i,l){if(i==I)return L?r.m:Pe;if(L){let a=te({i:0,A:r,m:P(),S:[Se(i)],h:[]});return new Proxy({},{get(s,d,c){return d==H?()=>a.m:(a.S.push(Se(d)),c)}})}return Reflect.get(o,i,l)},set(o,i,l,a){let s=Reflect.set(o,i,l,a);return r.h.map(d=>d(i)),s}});return r.P=n,n},st=(e,r,n)=>{let o=He(e);o.I[r]=n.value;let i=!1;n.listen(l=>{i=!0,o.P[r]=l}),o.h.push(l=>{l===r&&(i?i=!1:pe(n.C,e[l])||(i=!0,e[l]=n.value))})},ct=e=>typeof e=="object"&&e!==null&&e[I]==Pe,L=!1,He=e=>{L=!0;let r=e[I];return L=!1,Ve.get(r)},he=new Map,ue=(e,r)=>r.reduce((n,o)=>n[K(o)],e),Oe=e=>{let r;return e.i==0?r=ue(e.A.I,e.S):e.i==1?r=e.M.map(n=>n.value):e.i==2&&(r=e.j(Oe(e.C))),r},pe=(e,r)=>{if(r===je)return!1;if(e.i==0){let n=e.S;return ue(e.A.P,n.slice(0,-1))[K(n.at(-1))]=r,!0}return!(e.i!=2||!e.O)&&pe(e.C,e.O(r))},ee=e=>{e.h.forEach(r=>r())},te=e=>(he.set(e.m,e),e),re=e=>{let r=he.get(e);if(!r)return!1;let n,o=r.S,i=r.A.I,l=()=>n.forEach((a,s)=>{a.A&&(a.A.h=a.A.h.filter(c=>c!==a.T));let d=n.slice(0,s).map(c=>ue(i,c.k)).find(ct);a.A=d?He(d):r.A,a.A.h.push(a.T)});return n=o.map((a,s)=>(C(a)&&a.listen(l),{k:o.slice(0,s+1),T(d){d===K(a)&&ee(r)}})),l(),!0},C=e=>e instanceof q,K=e=>C(e)?e.value:e,$=(e,r,n)=>{C(e)&&(n?.(),e.listen(r)),r(K(e))};class q{C;N;constructor(r){this.C=he.get(r)}get value(){return Oe(this.C)}set value(r){pe(this.C,r)}[I](){let r=this.C;return r.i==1?r.M:null}[H](){return this.C.m}j(r,n){let o=te({i:2,m:P(),h:[],j:r,O:n,C:this.C});return this.listen(i=>ee(o)),o.m}listen(r){this.C.h.push(()=>r(this.value))}zip(...r){let n=te({i:1,m:P(),h:[],M:[new q(this.C.m),...r]});return n.M.map(o=>o.listen(i=>ee(n))),new q(n.m)}andThen(r,n){return this.map(o=>{let i=o?r:n;return typeof i=="function"?i(o):i})}map(r,n){return new q(this.j(r,n))}mapEach(r){return this.map(n=>Array.from(n).map(r))}clone(){return new q(this.C.m)}}let x=null,ie=(e,r,n,o)=>{if(e==null)return[N()];if(C(e)){let i=N("["),l=null;return $(e,a=>{let s=ie(a,r,n,e.N);if(!M?.(r)&&l){if(s.length===l.length&&l.every((c,u)=>c===s[u]))return;l.map(c=>c.parentNode===r&&r.removeChild(c));let d=i;for(let c of s)r.insertBefore(c,d.nextSibling),d=c}l=s}),[i,...M?.(r)?[]:l,N("]")]}if(e instanceof G){let i,l=a=>{if(i=a.classList){let s=[...i],d=s.find(c=>c.startsWith(O));if(s.find(c=>c==W))return;d?o&&d!==o&&(i.remove(d),i.add(o)):i.add(o||n),[...a.childNodes].map(l)}};return(o||n)&&l(e),[e]}return e instanceof Array?e.flatMap(i=>ie(i,r,n,o)):[de(e)]},$e="createElement",le=new Map,dt=(e,r,...n)=>t(e,{children:n,...r}),t=(e,r,n)=>{let{children:o,...i}=r;n&&(i.key=n),o||=[];let l,a=o instanceof Array?o:[o];if(typeof e=="function"){let s=We({});for(let h in i){let m=i[h];C(m)?st(s,h,m):s[h]=m}for(let h of a)C(h)&&(h.N||=x);let d=le.get(e);if(e.style){let h=e.style,m=R[$e]("style");if(!d){d={m:U(),R:[]};let f="";for(let p=0;p<h._.length;p++)if(f+=h._[p],p+1<h._.length){let g=h.p[p];if(typeof g=="string")f+=g;else{let v=U();f+=`var(--${v})`,d.R.push([v,g])}}M?.(m)||(m.setAttribute(W,e.name),m.setAttribute(O+"id",d.m),R.head.append(m),((p,g,v)=>{let V=Y(`:where(.${v})`),be=`:where(._${Re()} `,ye=(T,k)=>{for(let z=0;z<T.length;z++){let A,B,E,S=T[z];if(S.i==ce&&S.arg){let xe=S.nm=="global",Te=ye(Y(S.arg),xe||k);xe?(A=z,B=1,E=Te):(S.arg=ke(Te),S.o=`:${S.nm}(${S.arg})`)}else if(!k&&(z===T.length-1||[oe,ae].includes(T[z+1].i))){for(A=z;A>0&&T[A].i==se;)A--;A++,B=0,E=V}E&&(T.splice(A,B,...E),z+=E.length)}return T},we=T=>[...T].map(k=>(k.selectorText&&(k.selectorText=ke(ye(Y(k.selectorText.replaceAll(be,qe)))).replace(/:scope/g,`.${v}.${W}`)),k.cssRules&&we(k.cssRules),k));p.innerText=g.replaceAll(qe,be),we(p.sheet.cssRules)})(m,f,d.m)),le.set(e,d)}}let c={state:s,children:a,id:d?.m},u=x;if(x=d?.m,l=e.call(s,c),x=u,c.root=l,l instanceof G&&(l.$=c,l.classList.add(W),d))for(let[h,m]of d.R){let f="--"+h,p=l.style;$(m(c.state),g=>{g===void 0?p.removeProperty(f):p.setProperty(f,g)})}c.init?.(),M&&c.mount?.()}else{let s=i?.xmlns;l=R[$e+(s?"NS":"")](s||e,s&&e,i,a);let d=(u,h)=>{M?.(l)||(h===void 0||h===!1?l.removeAttribute(u):l.setAttribute(u,h))};for(let u of a)ie(u,l,x).map(h=>{h.parentNode!==l&&l.appendChild(h)});let c=l.classList;for(let u in i){let h=i[u];if(u==="this")h.value=l;else if(u==="value"||u==="checked")$(h,m=>{d(u,m),l.value=m},()=>{l.addEventListener("change",()=>h.value=l[u])});else if(u==="class"){let m=[];$(h,f=>{let p=f.split(" ").filter(g=>g.length);m.length&&c.remove(...m),p.length&&c.add(...p),m=p})}else if(u.startsWith("on:"))l.addEventListener(u.substring(3),m=>h(m));else if(u.startsWith("class:")){let m=u.substring(6);$(h,f=>{f?c.add(m):c.remove(m)})}else if(u.startsWith("attr:")){let m=u.substring(5);$(h,f=>{M?.(l)||(l[m]=f)})}else if(u!="style"||typeof h!="object"||C(h))$(h,m=>d(u,m));else for(let m in h)$(h[m],f=>{l.style.setProperty(m,f)})}x&&![...c].find(u=>u.startsWith(O))&&c.add(x),s&&(l.innerHTML=l.innerHTML)}return l},ht=e=>e.children,me=()=>{let e=[],r=n=>((o,i)=>i.map(l=>{let a=x;x=l.N,l.J(o),x=a}))(n,e);return r.listen=n=>{e.push({J:n,N:x})},r};Object.defineProperty(globalThis,"use",{get(){let e=L;return L=!0,(r,...n)=>{if(L=e,r instanceof Array&&"raw"in r)return((i,l)=>{let a=We({}),s=[];for(let d in i)if(s.push(i[d]),l[d]){let c,u=l[d],h=u[H]();if(C(u)?c=u:re(h)&&(c=new q(h)),c){let m=s.length;c.listen(f=>{s[m]=f,a.L=s.join("")}),s.push(c.value)}else s.push(u)}return a.L=s.join(""),use(a.L)})(r,n);let o=i=>{let l=i[H]();return re(l),new q(l)};return n=n.map(o),r=o(r),n.length?r.zip(...n):r}},configurable:!0}),t[I]=()=>le=new Map;let X="dlssri",ut=JSON,pt=(e,r,n)=>{let o=(a,s)=>{s instanceof Array?a[I]().forEach((d,c)=>o(d,s[c])):a.value=i(s.v,a.value,!0)},i=(a,s,d)=>{if(typeof a=="number")return e.v[a];let[c,u]=a;if(c==4)return o(s,u),d?je:s;if(c==2)return new Set(u.map(h=>i(h,{})));if(c==0){let h={};return l(u,h),new Map(Object.entries(h))}return c==3?u.map(h=>i(h,{})):c==1?(l(u,s),s):void 0},l=(a,s)=>{for(let[d,c]of a){let u=e.k[d];s[u]=i(c,s[u])}};l(r,n)},mt=(e,r,n,o)=>{let i=t("textarea",{});i.innerHTML=o.innerText;let l=ut.parse(i.value),a=[],s=+r.getAttribute(X),d=-1,c=p=>{let g=`[${X}="${p}"]`,v=s==p?r:r.querySelector(g)||n.querySelector(g);return v&&a.push([p,v]),v},u=()=>{let p=l.n[++d];if(!p)return;let[g,v]=p;return c(g)?.childNodes?.[v]};for(let[p,g,v]of l.t){let V=c(p).childNodes[g];V.length!==v&&V.splitText(v)}let h=Ne(),m=[{createElement:p=>c(++d)||h[0].createElement(p),createElementNS:(p,g)=>c(++d)||h[0].createElementNS(p,g),head:h[0].head},h[1],p=>u()||h[2](p),p=>u()||h[3](p),()=>l.i[d+1]||h[4](),p=>p.hasAttribute(X)];ze(m),t[I]();let f=e();ze(h);for(let[p,g]of a.filter(v=>v[1].$)){let v=l.n[p];pt(l,v,g.$.state)}return f},J,Me=(e,r,n,o)=>{let i=e.t;return i instanceof Function?i(n,o):i},Ce=(e,r,n,o,i)=>{if(e.$){let l=e.$.state;for(let a in o)l[a]=o[a];l.outlet=i,l["on:routeshown"]?.(n)}},Ue=(e,r,n,o)=>{let i=[],l=!1;if(e.i?i=e.i.split("/"):e.l.length||(l=!0),!i.length||n.splice(0,i.length).every((a,s)=>((d,c,u)=>c.startsWith(":")?(u[c.substring(1)]=d,!0):d===c)(a,i[s],o))){if((!n.length||n[0]===""&&l)&&e.t){let a=Me(e,0,r,o);return Ce(a,0,r,o),a}{let a,s={...o};for(let d of e.l||[])if(a=Ue(d,r,[...n],o),a)break;if(a){let d=Me(e,0,r,s);return d?(Ce(d,0,r,o,a),d):a}}}return null},Q=function(e){return{i:this.path,t:this.show,l:e.children}},ft=function(e){J=this;let r={l:e.children};return this.route=(n=location.pathname,o=location.origin)=>{let i=new URL(n,o).pathname;i.endsWith(".html")&&(i=i.slice(0,i.length-5));let l=i.split("/").slice(1),a=Ue(r,i,[...l],{});if(this.h=a,a)return i},this.navigate=n=>{let o=this.route(n);return o&&history.pushState(null,"",o),o},this.ssgables=()=>{let n=(o,i)=>(i.i&&(o+="/"+i.i),i.l.length?i.l.map(l=>n(o,l)).flat():i.i&&i.i.startsWith(":")?void 0:[[o||"/",i.i?o+".html":o+"/index.html"]]);return n("",r)},e.mount=()=>{addEventListener("popstate",()=>{this.route()})},dt(ht,null,use(this.h))},gt=Ne()[4],ne=navigator.userAgent,vt=ne.includes("Firefox"),Ae=!(!ne.includes("Chrome")&&ne.includes("Safari")||vt),Fe=function(e){let r=gt();return e.mount=()=>{this.cancel.listen(n=>{let o=t("animate",{xmlns:"http://www.w3.org/2000/svg",attributeName:"opacity",from:1,to:0,dur:n+"ms",fill:"freeze",calcMode:"spline",keySplines:"0.4 0, 0.2 1"});e.root.querySelector("circle").appendChild(o),o.beginElement()})},t("svg",{xmlns:"http://www.w3.org/2000/svg",children:[t("radialGradient",{id:"gradient-"+r,children:[t("stop",{offset:"0%","stop-color":"currentColor","stop-opacity":"0.12"}),t("stop",{offset:"70%","stop-color":"currentColor","stop-opacity":"0.12"}),t("stop",{offset:"100%","stop-color":"currentColor","stop-opacity":"0"})]}),Ae?t("filter",{id:"filter-"+r,children:[t("feTurbulence",{type:"fractalNoise",baseFrequency:"0.6",seed:Math.random()}),t("feDisplacementMap",{in:"SourceGraphic",in2:"turbulence",scale:this.size**2*1e-4,xChannelSelector:"R",yChannelSelector:"B"})]}):"firefox sucks",t("circle",{cx:this.size/2,cy:this.size/2,r:0,fill:`url(#gradient-${r})`,...Ae?{filter:`url(#filter-${r})`}:{},children:t("animate",{attributeName:"r",from:0,to:this.size/2,dur:this.speed+"ms",fill:"freeze",calcMode:"spline",keySplines:"0.4 0, 0.2 1"})})]})};Fe.style=b`:scope{position:absolute;left:${e=>e.x-e.size/2+"px"};top:${e=>e.y-e.size/2+"px"};width:${e=>e.size+"px"};height:${e=>e.size+"px"};pointer-events:none;overflow:visible}`;let fe=function(e){this.ripples=[];let r=[];return e.mount=()=>{this.create.listen(o=>{let i=e.root.getBoundingClientRect(),l=o.clientX-i.left,a=o.clientY-i.top,s=2.5*Math.hypot(Math.max(l,i.width-l),Math.max(a,i.height-a)),d=Math.max(Math.min(50*Math.log(s),600),200),c=me(),u=t(Fe,{x:l,y:a,size:s,speed:d,cancel:c});r.push(()=>{c(800),setTimeout(()=>this.ripples=this.ripples.filter(h=>h!==u),800)}),this.ripples=[...this.ripples,u]});let n=()=>{r.map(o=>o()),r=[]};window.addEventListener("pointerup",n),window.addEventListener("dragend",n)},t("div",{children:use(this.ripples)})};fe.style=b`:scope{position:absolute;inset:0;border-radius:inherit;pointer-events:none;overflow:hidden}:global(*):disabled>:scope{opacity:0}`;let ge=()=>t("div",{});ge.style=b`:scope{position:absolute;inset:0;border-radius:inherit;pointer-events:none;overflow:hidden;background:var(--m3dl-state-color,currentColor);opacity:0;transition:opacity var(--m3dl-motion-effects-default)}:global(*):hover:not(:global(:disabled))>:scope{opacity:.08}`;let bt={xs:"label-large",s:"label-large",m:"title-medium",l:"headline-small",xl:"headline-large"},w=function(e){this.size??="s",this.shape??="round",this.icon??="left",this.disabled??=!1;let r=me(),n=use(this.size).map(o=>bt[o]);return t("button",{class:use`m3dl-container m3dl-button m3dl-font-${n} variant-${this.variant} size-${this.size} shape-${this.shape} icon-${this.icon}`,disabled:use(this.disabled),"on:click":this["on:click"],"on:pointerdown":r,title:use(this.title),children:[t(fe,{create:r}),t(ge,{}),e.children]})};w.style=b`:scope{position:relative;border:none;display:inline-flex;align-items:center;justify-content:center;transition:border-radius var(--m3dl-motion-spatial-fast),flex var(--m3dl-motion-spatial-fast),color var(--m3dl-motion-effects-default),background var(--m3dl-motion-effects-default),border-color var(--m3dl-motion-effects-default);cursor:pointer;user-select:none;height:var(--m3dl-shape-full);word-spacing:inherit;text-align:inherit}:scope:disabled{cursor:default}:scope.variant-elevated{background:rgb(var(--m3dl-color-surface-container-low));color:rgb(var(--m3dl-color-primary));box-shadow:var(--m3dl-elevation-1)}:scope:has(:global(.m3dl-toggle.selected)).variant-elevated{background:rgb(var(--m3dl-color-primary));color:rgb(var(--m3dl-color-on-primary))}:scope:not(:has(:global(.m3dl-toggle:not(.selected)))).variant-filled{background:rgb(var(--m3dl-color-primary));color:rgb(var(--m3dl-color-on-primary))}:scope:has(:global(.m3dl-toggle)).variant-filled{background:rgb(var(--m3dl-color-surface-container));color:rgb(var(--m3dl-color-on-surface-variant))}:scope.variant-tonal{background:rgb(var(--m3dl-color-secondary-container));color:rgb(var(--m3dl-color-on-secondary-container))}:scope:has(:global(.m3dl-toggle.selected)).variant-tonal{background:rgb(var(--m3dl-color-secondary));color:rgb(var(--m3dl-color-on-secondary))}:scope.variant-outlined{border:var(--m3dl-button-border,1px) solid rgb(var(--m3dl-color-outline-variant));background:0 0;color:rgb(var(--m3dl-color-on-surface-variant))}:scope:has(:global(.m3dl-toggle.selected)).variant-outlined{border-color:transparent;background:rgb(var(--m3dl-color-inverse-surface));color:rgb(var(--m3dl-color-inverse-on-surface))}:scope.variant-text{background:0 0;color:rgb(var(--m3dl-color-primary))}:scope:disabled:disabled:disabled:disabled{background:rgb(var(--m3dl-color-on-surface) / .1);color:rgb(var(--m3dl-color-on-surface) / .38);box-shadow:var(--m3dl-elevation-0)}:scope.shape-round{border-radius:var(--m3dl-shape-full)}:scope.shape-square:is(.size-xs, .size-s){border-radius:var(--m3dl-shape-medium)}:scope.shape-square:is(.size-m){border-radius:var(--m3dl-shape-large)}:scope.shape-square:is(.size-l, .size-xl){border-radius:var(--m3dl-shape-extra-large)}:scope:enabled:active:is(.size-xs, .size-s){border-radius:var(--m3dl-shape-small)}:scope:enabled:active:is(.size-m){border-radius:var(--m3dl-shape-medium)}:scope:enabled:active:is(.size-l, .size-xl){border-radius:var(--m3dl-shape-large)}:scope.size-xs{--m3dl-shape-full:2rem;padding:.75rem;gap:.25rem}:scope.size-s{--m3dl-shape-full:2.5rem;padding:1rem;gap:.5rem}:scope.size-m{--m3dl-shape-full:3.5rem;padding:1.5rem;gap:.5rem}:scope.size-l{--m3dl-button-border:2px;--m3dl-shape-full:6rem;padding:3rem;gap:.75rem}:scope.size-xl{--m3dl-button-border:3px;--m3dl-shape-full:8.5rem;padding:4rem;gap:1rem}:scope:not(.icon-left).size-xs{--m3dl-icon-size:1.25rem}:scope:not(.icon-left):is(.size-s, .size-m){--m3dl-icon-size:1.5rem}:scope:not(.icon-left).size-l{--m3dl-icon-size:2rem}:scope:not(.icon-left).size-xl{--m3dl-icon-size:2.5rem}:scope.icon-full.size-xs{padding:.375rem}:scope.icon-full.size-s{padding:.5rem}:scope.icon-full.size-m{padding:1rem}:scope.icon-full.size-l{padding:2rem}:scope.icon-full.size-xl{padding:3rem}:scope>:global(svg){width:var(--m3dl-icon-size,1em);height:var(--m3dl-icon-size,1em)}:scope>:global(span.m3dl-toggle){display:none}`;const y=function(){return t("svg",{width:use(this.width).map(e=>e||"1em"),height:use(this.height).map(e=>e||"1em"),viewBox:use`0 0 ${this.icon.width} ${this.icon.height}`,xmlns:"http://www.w3.org/2000/svg",...this.class?{class:this.class}:{},"attr:innerHTML":use(this.icon).map(e=>e.body)})};let F=function(e){if(this["on:click"]){let r=me();return t("button",{class:use`m3dl-container m3dl-card variant-${this.variant}`,"on:pointerdown":r,"on:click":this["on:click"],children:[t(fe,{create:r}),t(ge,{}),e.children]})}return t("div",{class:use`m3dl-container m3dl-card variant-${this.variant}`,children:e.children})};F.style=b`:scope{padding:1rem;border:none;border-radius:var(--m3dl-shape-medium);color:rgb(var(--m3dl-color-on-surface))}button:scope{position:relative;font:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit;text-align:inherit;cursor:pointer}:scope.variant-elevated{background:rgb(var(--m3dl-color-surface-container-low));box-shadow:var(--m3dl-elevation-1)}:scope.variant-filled{background:rgb(var(--m3dl-color-surface-container-highest))}:scope.variant-outlined{background:rgb(var(--m3dl-color-surface));border:1px solid rgb(var(--m3dl-color-outline-variant))}`;const Le={width:24,height:24,body:'<path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h14v-6q0-.425.288-.712T20 12t.713.288T21 13v6q0 .825-.587 1.413T19 21zM19 6.4L10.4 15q-.275.275-.7.275T9 15t-.275-.7t.275-.7L17.6 5H15q-.425 0-.712-.288T14 4t.288-.712T15 3h5q.425 0 .713.288T21 4v5q0 .425-.288.713T20 10t-.712-.288T19 9z"/>'},yt={width:24,height:24,body:'<path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>'},Ie={width:24,height:24,body:'<path fill="currentColor" d="m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6z"/>'};let Ge=function(){return t("img",{src:use(this.src)})};Ge.style=b`
	:scope {
		height: 1.25em;
		width: 1.25em;
		vertical-align: -0.25em;
	}
`;let wt=function(e){return t("a",{href:`https://hackclub.slack.com/app_redirect?channel=${this.id}`,target:"_blank",children:e.children})};const xt={width:24,height:24,body:'<path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"/>'};let ve=function(e){return t("div",{"class:grid":use(this.grid),children:e.children})};ve.style=b`
	:scope {
		margin: 1rem 0;

		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.grid {
		grid-template-areas: "a" "b" "c";
	}
	.grid > :global(:nth-child(1)) { grid-area: a; }
	.grid > :global(:nth-child(2)) { grid-area: b; }
	.grid > :global(:nth-child(3)) { grid-area: c; }

	@media (min-width: 550px) and (max-width: 800px) {
		:scope {
			grid-template-columns: 1fr 1fr;
		}

		.grid {
			grid-template-areas:
				"a b"
				"c c";
		}
	}
`;let j=function(e){return t("div",{children:t(F,{variant:"filled",children:[t("div",{class:"image",children:e.children[0]}),t("div",{class:"body",children:[t("div",{class:"m3dl-font-title-large",children:use(this.title)}),t("div",{class:"expand",children:e.children[1]}),this.target?t("div",{class:"buttons",children:t(w,{variant:"filled",icon:"left","on:click":()=>window.open(`https://isle.a.hackclub.dev/scenes/${this.target}`),children:[t(y,{icon:xt}),"Visit!"]})}):null]})]})})};j.style=b`
	:scope > :global(.m3dl-card) {
		width: 100%;
		height: 100%;
		overflow: hidden;

		display: flex;
		padding: 0;
		align-items: stretch;
	}

	.image {
		background: rgb(var(--m3dl-color-surface-container));
		border-radius: 0 var(--m3dl-shape-medium) var(--m3dl-shape-medium) 0;
		aspect-ratio: 4 / 3;
		flex: 3 0;

		overflow: hidden;
	}
	.body {
		padding: 1rem;
		flex: 5;

		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.expand { flex: 1; }
	.buttons {
		display: flex;
		justify-content: flex-end;
	}

	@media (max-width: 800px) {
		:scope > :global(.m3dl-card) {
			flex-direction: column;
		}

		.image {
			border-radius: 0 0 var(--m3dl-shape-medium) var(--m3dl-shape-medium);
		}
	}
`;const Tt={width:24,height:24,body:'<path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2q3.525 0 6.188 2.113T21.675 9.5q.125.4-.088.75t-.612.475t-.75-.1T19.75 10q-.475-1.825-1.713-3.25T15 4.6V5q0 .825-.587 1.413T13 7h-2v2q0 .425-.288.713T10 10H8v2h6q.375 0 .575.338t0 .687q-.3.575-.437 1.2T14 15.5q0 1.325.6 2.488t1.325 2.212q.2.3.125.65t-.425.475q-.85.35-1.763.513T12 22m-1-2.05V18q-.825 0-1.412-.587T9 16v-1l-4.8-4.8q-.075.45-.137.9T4 12q0 3.025 1.988 5.3T11 19.95M19.5 22q-.175 0-.3-.1t-.175-.25q-.275-.875-.775-1.625t-1.075-1.475q-.525-.65-.85-1.425T16 15.5q0-1.45 1.025-2.475T19.5 12t2.475 1.025T23 15.5q0 .85-.337 1.613t-.838 1.437q-.575.725-1.075 1.475t-.775 1.625q-.05.15-.175.25t-.3.1m0-2.825q.25-.425.55-.787t.575-.738q.35-.475.613-1.012T21.5 15.5q0-.825-.587-1.412T19.5 13.5t-1.412.588T17.5 15.5q0 .6.263 1.138t.612 1.012l.588.738q.287.363.537.787m0-2.425q-.525 0-.888-.363t-.362-.887t.363-.888t.887-.362t.888.363t.362.887t-.363.888t-.887.362"/>'};let Ke=function(){return t("div",{children:t(j,{title:"Porple Point",target:98,children:[t("div",{class:"construction",children:t(y,{icon:Tt})}),t("div",{children:"Porple Point's exhibit is being constructed! Our most senior employee is currently out on an expedition collecting data to display here. We aim to provide our visitors with info about Porple Point as soon as possible! For now, you can trek down and visit it yourself; we don't provide any guarantees about what's there, however."})]})})};Ke.style=b`
	.construction {
		height: 100%;

		background: repeating-linear-gradient(
			45deg,
			rgb(var(--m3dl-color-surface-container-high)),
			rgb(var(--m3dl-color-surface-container-high)) 20px,
			transparent 20px,
			transparent 40px
		);

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 8rem;
	}
`;const kt={width:24,height:24,body:'<path fill="currentColor" d="m6 10.95l-1 .55q-.35.2-.75.1t-.6-.45l-2-3.5q-.2-.35-.1-.75T2 6.3L7.75 3H9.5q.225 0 .363.138T10 3.5V4q0 .825.588 1.413T12 6t1.413-.587T14 4v-.5q0-.225.138-.363T14.5 3h1.75L22 6.3q.35.2.45.6t-.1.75l-2 3.5q-.2.35-.588.438T19 11.475l-1-.5V20q0 .425-.288.713T17 21H7q-.425 0-.712-.288T6 20z"/>'},qt={width:24,height:24,body:'<path fill="currentColor" d="M4 21v-2h16v2zm4-4q-1.65 0-2.825-1.175T4 13V3h16q.825 0 1.413.588T22 5v3q0 .825-.587 1.413T20 10h-2v3q0 1.65-1.175 2.825T14 17zm10-9h2V5h-2z"/>'},zt={width:24,height:24,body:'<path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/>'},St={width:24,height:24,body:'<path fill="currentColor" d="M7 15q1.25 0 2.125-.875T10 12t-.875-2.125T7 9t-2.125.875T4 12t.875 2.125T7 15m0 3q-2.5 0-4.25-1.75T1 12t1.75-4.25T7 6q2.025 0 3.538 1.15T12.65 10h8.375L23 11.975l-3.5 4L17 14l-2 2l-2-2h-.35q-.625 1.8-2.175 2.9T7 18"/>'};let Je=function(){let e=r=>()=>{alert("Go buy a "+r+"!")};return t("div",{children:t(j,{title:"Mount Kablooey Gift Shop",target:11,children:[t("div",{class:"rich-image m3dl-gift-shop",children:t("div",{class:"shop",children:[t("div",{children:t(w,{variant:"elevated",icon:"full",size:"m","on:click":e("Mug"),children:t(y,{icon:qt})})}),t("div",{children:t(w,{variant:"elevated",icon:"full",size:"m","on:click":e("T-Shirt"),children:t(y,{icon:kt})})}),t("div",{class:"weird",children:t(w,{variant:"elevated",icon:"full",size:"m","on:click":e("Postcard"),children:t(y,{icon:zt})})}),t("div",{class:"weird2",children:t(w,{variant:"elevated",icon:"full",size:"m","on:click":e("Keychain"),children:t(y,{icon:St})})})]})}),t("div",{children:"The official Mount Kablooey Gift Shop is a great place to get your usual bits and bobs like shirts and mugs. Speaking of, why is the branded mug $35?? The whole shop seems to be very expensive... except for the keychain. That's reasonably priced at $2. I guess the visitor center needs to start selling stuff for cheaper; a new revenue source, at last!"})]})})};Je.style=b`
	.rich-image {
		height: 100%;

		background: url(./stops/gift-shop/background.webp);
		background-size: cover;
		background-position: center;

		display: flex;
		align-items: center;
		justify-content: center;

		color: rgb(var(--m3dl-color-on-surface));
	}

	.shop {
		width: 60%;
		aspect-ratio: 1 / 1;

		background: url(./stops/gift-shop/shop.webp);
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;

		padding: 6%;

		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 1fr;
	}

	.shop > * {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.weird {
		margin-right: 10%;
		margin-bottom: 10%;
	}

	.weird2 {
		margin-right: 10%;
		margin-bottom: 15%;
	}
`;let $t="./som.webp",Mt="./skulk.webp",Ct="./stickerlode-3.webp",_e=function(){return t("div",{children:[t("div",{class:"m3dl-font-display-small title",children:[t("img",{src:$t})," Mount Kablooey Summit"]}),t("div",{class:"m3dl-font-title-large",children:t("b",{children:t("i",{children:"enjoy the view..."})})}),t("div",{class:"top",children:[t("div",{class:"content",children:[t("p",{children:["Welcome to the official Mount Kablooey Summit visitor center! We're so high up that you can see almost the entire island, (including all the airplanes failing to land at ",t("b",{children:"http://island"}),"'s airport ",t(Ge,{src:Mt}),") so we recommend planning your next visits from here with our information and featured exhibits. However, we're still reconstructing after that massive ",t("i",{children:"volcano explosion"}),"; please don't mind the lack of exhibits and artifacts as we recover..."]}),t("p",{children:"Heidi visited us recently and gave us this awesome sticker of her on Mount Kablooey to give out specifically on 15-09-2025; not sure why that date though, maybe it's a special event?"})]}),t("img",{class:"sticker",src:Ct})]}),t("div",{class:"m3dl-font-headline-medium",children:t("b",{children:"Nearby Stops"})}),t(ve,{grid:!0,children:[t(Je,{}),t(Ke,{}),t("div",{class:"more",children:[t("div",{children:[t("div",{class:"m3dl-font-title-large",children:t("b",{children:"Featured Stops"})}),"There's a lot more to explore on the island! We've curated a seperate exhibition area to showcase all the cool places to visit."]}),t(w,{variant:"filled",size:"m","on:click":()=>J.navigate(_+"/featured"),children:["View featured ",t(y,{icon:yt})]})]})]}),t("div",{class:"m3dl-font-headline-medium about",children:t("b",{children:"About This Center"})}),t("div",{class:"about-content",children:[t("div",{class:"info",children:["The code for this center is available ",t("a",{href:"https://github.com/r58playz/som-grand-survey",target:"_blank",children:"on GitHub"}),". It's built with the ",t("code",{children:"dreamland.js"})," JavaScript framework, which was rewritten from scratch during Journey v1, Journey v2, and Summer of Making. It's also been prerendered and hydrated client-side with ",t("code",{children:"dreamland.js"}),"'s ",t("b",{children:"built-in SSR support"})," and Vite integrations (developed during Summer of Making). Components from ",t("code",{children:"m3-dreamland"}),", rewritten during Summer of Making to support ",t("code",{children:"dreamland.js"}),"'s rewrite, were used to give this center a very ",t("i",{children:"expressive"})," (possibly even a little ",t("b",{children:"material"}),"-like) look. Assets and fonts from the Summer of Making website were used as well. Each destination's exhibit uses assets from the location."]}),t("div",{class:"cards",children:[t(F,{variant:"outlined",children:[t("div",{class:"m3dl-font-title-large",children:"dreamland.js"}),t("div",{class:"expand",children:[t("div",{children:"Utilitarian web framework smaller than preact."}),t("div",{children:["This is the first user-accessible project on Summer of Making! It's also used by ",t("a",{href:"https://mail.hackclub.com",target:"_blank",children:"mail.hackclub.com"}),"'s admin UI."]})]}),t("div",{class:"buttons",children:[t(w,{variant:"tonal",icon:"full","on:click":()=>window.open("https://github.com/MercuryWorkshop/dreamlandjs"),children:t(y,{icon:Ie})}),t(w,{variant:"filled","on:click":()=>window.open("https://summer.hackclub.com/projects/3"),children:[t(y,{icon:Le}),"Visit on SoM!"]})]})]}),t(F,{variant:"outlined",children:[t("div",{class:"m3dl-font-title-large",children:"m3-dreamland"}),t("div",{class:"expand",children:"A Material 3 (Expressive) component library for dreamland.js."}),t("div",{class:"buttons",children:[t(w,{variant:"tonal",icon:"full","on:click":()=>window.open("https://github.com/r58Playz/m3-dreamland"),children:t(y,{icon:Ie})}),t(w,{variant:"filled","on:click":()=>window.open("https://summer.hackclub.com/projects/8235"),children:[t(y,{icon:Le}),"Visit on SoM!"]})]})]})]})]})]})};_e.style=b`
	.top {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.top .content {
		flex: 1;
	}
	.sticker {
		height: 200px;
		object-fit: cover;
	}

	.title img {
		width: 1em;
		height: 1em;
		vertical-align: -0.125em;
	}

	.more {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.more > div {
		flex: 1;
	}

	.about {
		margin-bottom: 1rem;
	}
	.about-content {
		display: grid;
		grid-template-columns: 3fr 5fr;
		gap: 1rem;
	}

	.cards {
		display: flex;
		gap: 0.5rem;
	}
	.cards > :global(.m3dl-card) {
		flex: 1;

		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.cards .buttons {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}

	.expand { flex: 1; }

	@media (min-width: 550px) and (max-width: 800px) {
		.about-content {
			grid-template-columns: 1fr;
		}
		.sticker {
			height: 150px;
		}
	}

	@media (max-width: 550px) {
		.about-content {
			grid-template-columns: 1fr;
		}

		.top {
			flex-direction: column-reverse;
		}
		.sticker {
			margin-top: 1rem;
			height: 150px;
		}

		.cards {
			flex-direction: column;
		}
	}
`;let Be=function(){return t("div",{children:t(j,{title:"http://island",target:19,children:[t("div",{class:"rich-image",children:t("marquee",{direction:"right",scrollamount:10,children:[t("img",{src:"./stops/island/plane.webp"}),t("div",{children:t("span",{class:"pull-up",children:"terrain! PULL UP!!"})})]})}),t("div",{children:["A small island in the middle of the ocean, home to a small population (currently about 5 people). 500ft",t("sup",{children:"2"})," in size with a tropical climate. Residents are English-speaking and use the Beenz currency and the Internet Time timezone."]})]})})};Be.style=b`
	.rich-image {
		position: relative;

		height: 100%;
		background: url(./stops/island/island.webp);
		background-size: cover;
		background-position: center;

		overflow: hidden;
	}

	marquee {
		position: absolute;
		top: 25%;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		transform: rotate(2deg);
	}
	
	marquee img {
		width: 25%;
	}

	.pull-up {
		background: rgb(var(--m3dl-color-surface-container) / 0.5);
		padding: 0 0.25rem;
		border-radius: var(--m3dl-shape-extra-small);
	}
`;const At={width:24,height:24,body:'<path fill="currentColor" d="m18.9 21l-5.475-5.475l2.1-2.1L21 18.9zM5.1 21L3 18.9L9.9 12l-1.7-1.7l-.7.7l-1.275-1.275v2.05l-.7.7L2.5 9.45l.7-.7h2.05L4 7.5l3.55-3.55q.5-.5 1.075-.725T9.8 3t1.175.225t1.075.725l-2.3 2.3L11 7.5l-.7.7L12 9.9l2.25-2.25q-.1-.275-.162-.575t-.063-.6q0-1.475 1.013-2.488t2.487-1.012q.375 0 .713.075t.687.225L16.45 5.75l1.8 1.8l2.475-2.475q.175.35.238.687t.062.713q0 1.475-1.012 2.488t-2.488 1.012q-.3 0-.6-.05t-.575-.175z"/>'};let De=function(){return t("div",{children:t(j,{title:"Exhibits Under Construction",children:[t("div",{class:"construction",children:t(y,{icon:At})}),t("div",{children:["We apologize for the lack of exhibits showcasing ",t("i",{children:"Hacklantis Island"}),". We need to send our employees out to collect fresh information after our databases were... erm... ",t("b",{children:"vitrified"}),"... by the explosion. More exhibits will be coming as soon as possible!"]})]})})};De.style=b`
	.construction {
		height: 100%;

		background: repeating-linear-gradient(
			45deg,
			rgb(var(--m3dl-color-surface-container-high)),
			rgb(var(--m3dl-color-surface-container-high)) 20px,
			transparent 20px,
			transparent 40px
		);

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 8rem;
	}
`;const Lt={width:24,height:24,body:'<path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"/>'},It={width:24,height:24,body:'<path fill="currentColor" d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20"/>'};let Pt=["crab-dancing-blocky","crab-excited","crab-yay","dancing-crab1","dancing-crab2","dancing-crab3","dancing-crab4","minecraft-crab","silly-crab"],Ye=function(){let e=()=>{this.meta=Pt.map(r=>({path:r,x:Math.random()*100,y:Math.random()*100,hue:Math.random()*360}))};return e(),t("div",{children:t(j,{title:"Crab Rave",target:16,children:[t("div",{class:"rave",children:[t("div",{children:use(this.meta).mapEach(r=>t("img",{src:`./stops/crab-rave/${r.path}.webp`,style:{"--x":r.x+"%","--y":r.y+"%","--hue":r.hue+"deg"}}))}),t(w,{variant:"tonal",icon:"full","on:click":e,children:t(y,{icon:It})})]}),t("div",{children:['The Crab Rave island has daily performances of the "Dance of the Rising Sun", or ',t("b",{children:'"Crab Rave"'})," by the local ",t("i",{children:"Raving Crabs"}),". Scientists do not know exactly why these crabs perform the ritual; some argue that it's instinct while others believe the crabs are intelligent and perform more extravagantly when they're being observed. In any case, this masterpiece of a performance is a must-watch!"]})]})})};Ye.style=b`
	.rave {
		position: relative;

		height: 100%;
		padding: 0 20% 20% 0;

		background: url(./stops/crab-rave/beach.webp);
		background-size: cover;
		background-position: center;
	}

	.rave > :global(.m3dl-button) {
		position: absolute;
		top: 0.25rem;
		right: 0.25rem;
	}

	.rave > div {
		height: 100%;
		position: relative;
	}

	.rave > div > * {
		width: 25%;

		animation: hue-cycle 5s linear infinite;
		position: absolute;
		top: var(--x);
		left: var(--y);
	}

	@keyframes hue-cycle {
		from {
			filter: sepia(50%) saturate(1000%) contrast(180%) hue-rotate(var(--hue))
		}
		to {
			filter: sepia(50%) saturate(1000%) contrast(180%) hue-rotate(calc(var(--hue) + 360deg))
		}
	}
`;let jt="./som.webp",Xe=function(){return t("div",{children:[t("div",{class:"m3dl-font-display-small title",children:[t("img",{src:jt})," Mount Kablooey Summit"]}),t("div",{class:"m3dl-font-headline-medium",children:t("b",{children:"Featured Stops"})}),t("p",{children:["We've curated a special exhibition area for stops that our lead curator, ",t(wt,{id:"U07UY5CR7U5",children:"Toshit"}),", finds cool or fun. We urge all our visitors to give these stops a visit! They're guaranteed to be awesome."]}),t(ve,{grid:!1,children:[t(Be,{}),t(Ye,{}),t(De,{})]}),t(w,{variant:"filled",size:"m","on:click":()=>J.navigate(_),children:[t(y,{icon:Lt})," Return to lobby"]})]})};Xe.style=b`
	.title img {
		width: 1em;
		height: 1em;
		vertical-align: -0.125em;
	}
`;let _;{let e=new URL("../",import.meta.url).pathname;_=e.slice(1,e.length-1)}let Qe=function(e){return e.init=()=>{J.route()},t("div",{id:"app",class:"m3dl-colon3 m3dl-font-body-large",children:t(ft,{children:t(Q,{path:_,children:[t(Q,{show:t(_e,{})}),t(Q,{path:"featured",show:t(Xe,{})})]})})})};Qe.style=b`
	:scope {
		background: rgb(var(--m3dl-color-background));
		color: rgb(var(--m3dl-color-on-background));
		font-family: var(--m3dl-font);

		overflow-y: auto;
	}
	:scope > :global(*) {
		max-width: 62rem;
		padding: 1rem;
		margin: auto;
	}
`;const Et=e=>t(Qe,{});mt(Et,document.querySelector("#app"),document.head,document.querySelector("[dlssr-d]"));
