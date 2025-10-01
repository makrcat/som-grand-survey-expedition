(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();let ye,le=Symbol,[W,kr,ve,He,je,jr,Ur,Ue,Ye,Yr,Kr,Wr]=Array.from(Array(12),le),be=le.toPrimitive,Xr=Object.assign,wr=globalThis,Le=()=>{throw Error("dl")},Ve=new Map([[Kr,/\[\s*(?:(?<ns>\*|[-\w\P{ASCII}]*)\|)?(?<nm>[-\w\P{ASCII}]+)\s*(?:(?<op>\W?=)\s*(?<val>.+?)\s*(\s(?<case>[iIsS]))?\s*)?\]/gu],[jr,/#(?<nm>[-\w\P{ASCII}]+)/gu],[Ur,/\.(?<nm>[-\w\P{ASCII}]+)/gu],[He,/\s*,\s*/g],[je,/\s*[\s>+~]\s*/g],[Ue,/::(?<nm>[-\w\P{ASCII}]+)(?:\((?<arg>¶*)\))?/gu],[Ye,/:(?<nm>[-\w\P{ASCII}]+)(?:\((?<arg>¶*)\))?/gu],[Yr,/(?:(?<ns>\*|[-\w\P{ASCII}]*)\|)?\*/gu],[Wr,/(?:(?<ns>\*|[-\w\P{ASCII}]*)\|)?(?<nm>[-\w\P{ASCII}]+)/gu]]),Gr=r=>r==Ye||r==Ue?RegExp(Ve.get(r).source.replace("¶","."),"gu"):Ve.get(r),Jr=(r,e)=>{let t=0,n="";for(;e<r.length;e++){let a=r[e];if(a=="("?++t:a==")"&&--t,n+=a,t===0)return n}return n},Zr=/(['"])([^\\\n]*?)\1/g,Ie=r=>{if((r=r.trim())==="")return[];let e=[];r=(r=r.replace(/\\./g,(a,i)=>(e.push({t:a,l:i}),"".repeat(a.length)))).replace(Zr,(a,i,o,h)=>(e.push({t:a,l:h}),`${i}${"".repeat(o.length)}${i}`));{let a,i=0;for(;(a=r.indexOf("(",i))>-1;){let o=Jr(r,a);e.push({t:o,l:a}),r=`${r.substring(0,a)}(${"¶".repeat(o.length-2)})${r.substring(a+o.length)}`,i=a+o.length}}let t=(a=>{if(!a)return[];let i=[a];for(let[h,c]of Ve.entries())for(let d=0;d<i.length;d++){let u=i[d];if(typeof u!="string")continue;c.lastIndex=0;let f=c.exec(u);if(!f)continue;let p=f.index-1,y=[],v=f[0],g=u.slice(0,p+1);g&&y.push(g),y.push({...f.groups,i:h,o:v});let C=u.slice(p+v.length+1);C&&y.push(C),i.splice(d,1,...y)}let o=0;for(let h of i)typeof h=="string"?Le():(h.u=[o,o+=h.o.length],h.i!=je&&h.i!=He||(h.o=h.o.trim()||" "));return i})(r),n=[];for(let a of e.reverse())for(let i of t){let{l:o,t:h}=a;if(i.u[0]>o||o+h.length>i.u[1])continue;let{o:c}=i,d=o-i.u[0];i.o=c.slice(0,d)+h+c.slice(d+h.length),i.o!==c&&n.push(i)}for(let a of n){let i=Gr(a.i);i||Le(),i.lastIndex=0;let o=i.exec(a.o);o||Le(),Xr(a,o.groups)}return t},sr=r=>r.map(e=>e.o).join(""),z=(r,...e)=>({_:r,p:e,h:Qr}),Pe="dlc",Cr=()=>[...Array(16)].reduce(r=>r+Math.random().toString(36)[2],""),lr=":global(",Qr=(r,e,t)=>{let n=Ie(`:where(.${t})`),a=`:where(._${Cr()} `,i=(h,c)=>{for(let d=0;d<h.length;d++){let u,f,p,y=h[d];if(y.i==Ye&&y.arg){let v=y.nm=="global",g=i(Ie(y.arg),v||c);v?(u=d,f=1,p=g):(y.arg=sr(g),y.o=`:${y.nm}(${y.arg})`)}else if(!c&&(d===h.length-1||[je,He].includes(h[d+1].i))){for(u=d;u>0&&h[u].i==Ue;)u--;u++,f=0,p=n}p&&(h.splice(u,f,...p),d+=p.length)}return h},o=h=>[...h].map(c=>(c.selectorText&&(c.selectorText=sr(i(Ie(c.selectorText.replaceAll(a,lr)))).replace(/:scope/g,`.${t}.${Pe}`)),c.cssRules&&o(c.cssRules),c));r.innerText=e.replaceAll(lr,a),o(r.sheet.cssRules)},ke="dlcss-",de=wr.document,Se=wr.Node,Ke=r=>new Text(r),he=r=>new Comment(r),we=()=>ke+Cr(),J=()=>!1,cr=r=>{de=r[0],Se=r[1],Ke=r[2],he=r[3],we=r[4],J=r[5],ye=r[6]},Sr=()=>[de,Se,Ke,he,we,J,ye],xr=new Map,ur=r=>typeof r=="symbol"&&Re(r)?new Z(r):r,Tr=r=>{let e={I:[],m:r,A:le()};xr.set(e.A,e);let t=new Proxy(r,{get(n,a,i){if(a==W)return ne?e.A:kr;if(ne){let o=Ee({i:0,S:e,A:le(),P:[ur(a)],I:[]});return new Proxy({},{get(h,c,d){return c==be?()=>o.A:(o.P.push(ur(c)),d)}})}return Reflect.get(n,a,i)},set(n,a,i,o){let h=Reflect.set(n,a,i,o);return e.I.map(c=>c(a)),h}});return e.C=t,t},et=(r,e,t)=>{let n=Dr(r);n.m[e]=t.value;let a=!1;t.listen(i=>{a=!0,n.C[e]=i}),n.I.push(i=>{i===e&&(a?a=!1:Ge(t.M,r[i])||(a=!0,r[i]=t.value))})},rt=r=>typeof r=="object"&&r!==null&&r[W]==kr,ne=!1,Dr=r=>{ne=!0;let e=r[W];return ne=!1,xr.get(e)},We=new Map,Xe=(r,e)=>e.reduce((t,n)=>t[xe(n)],r),Mr=r=>{let e;return r.i==0?e=Xe(r.S.m,r.P):r.i==1?e=r.j.map(t=>t.value):r.i==2&&(e=r.O(Mr(r.M))),e},Ge=(r,e)=>{if(e===ve)return!1;if(r.i==0){let t=r.P;return Xe(r.S.C,t.slice(0,-1))[xe(t.at(-1))]=e,!0}return!(r.i!=2||!r.T)&&Ge(r.M,r.T(e))},Fe=r=>{r.I.forEach(e=>e())},Ee=r=>(We.set(r.A,r),r),Re=r=>{let e=We.get(r);if(!e)return!1;let t,n=e.P,a=e.S.m,i=()=>t.forEach((o,h)=>{o.S&&(o.S.I=o.S.I.filter(d=>d!==o.k));let c=t.slice(0,h).map(d=>Xe(a,d.N)).find(rt);o.S=c?Dr(c):e.S,o.S.I.push(o.k)});return t=n.map((o,h)=>(te(o)&&o.listen(i),{N:n.slice(0,h+1),k(c){c===xe(o)&&Fe(e)}})),i(),!0},te=r=>r instanceof Z,xe=r=>te(r)?r.value:r,ee=(r,e,t)=>{te(r)&&(t?.(),r.listen(e)),e(xe(r))};class Z{M;R;constructor(e){this.M=We.get(e)}get value(){return Mr(this.M)}set value(e){Ge(this.M,e)}[W](){let e=this.M;return e.i==1?e.j:null}[be](){return this.M.A}O(e,t){let n=Ee({i:2,A:le(),I:[],O:e,T:t,M:this.M});return this.listen(a=>Fe(n)),n.A}listen(e){this.M.I.push(()=>e(this.value))}zip(...e){let t=Ee({i:1,A:le(),I:[],j:[new Z(this.M.A),...e]});return t.j.map(n=>n.listen(a=>Fe(t))),new Z(t.A)}andThen(e,t){return this.map(n=>{let a=n?e:t;return typeof a=="function"?a(n):a})}map(e,t){return new Z(this.O(e,t))}mapEach(e){return this.map(t=>Array.from(t).map(e))}clone(){return new Z(this.M.A)}}let X=null,Oe=(r,e,t,n)=>{if(r==null)return[he()];if(te(r)){let a=he("["),i=null;return ee(r,o=>{let h=Oe(o,e,t,r.R);if(!J?.(e)&&i){if(h.length===i.length&&i.every((d,u)=>d===h[u]))return;i.map(d=>d.parentNode===e&&e.removeChild(d));let c=a;for(let d of h)e.insertBefore(d,c.nextSibling),c=d}i=h}),[a,...J?.(e)?[]:i,he("]")]}if(r instanceof Se){let a,i=o=>{if(a=o.classList){let h=[...a],c=h.find(d=>d.startsWith(ke));if(h.find(d=>d==Pe))return;c?n&&c!==n&&(a.remove(c),a.add(n)):a.add(n||t),[...o.childNodes].map(i)}};return(n||t)&&i(r),[r]}return r instanceof Array?r.flatMap(a=>Oe(a,e,t,n)):[Ke(r)]},dr="createElement",qe=new Map,$e=[],hr=r=>r instanceof Se,tt=(r,e,...t)=>s(r,{children:t,...e}),s=(r,e,t)=>{let{children:n,...a}=e;t&&(a.key=t),n||=[];let i,o=n instanceof Array?n:[n];if(typeof r=="function"){let h=Tr({});ye?.(r);for(let f in a){let p=a[f];te(p)?et(h,f,p):h[f]=p}for(let f of o)te(f)&&(f.R||=X);let c=qe.get(r);if(r.style){let f=r.style,p=de[dr]("style");if(!c){c={A:we(),J:[]};let y="";for(let v=0;v<f._.length;v++)if(y+=f._[v],v+1<f._.length){let g=f.p[v];if(typeof g=="string")y+=g;else{let C=we();y+=`var(--${C})`,c.J.push([C,g])}}J?.(p)||(p.setAttribute(Pe,r.name),p.setAttribute(ke+"id",c.A),de.head.append(p),f.h(p,y,c.A)),qe.set(r,c)}}let d={state:h,children:o,id:c?.A},u=X;if(X=c?.A,i=r.call(h,d),X=u,d.root=i,hr(i)&&(i.$=d,i.classList.add(Pe),c))for(let[f,p]of c.J){let y="--"+f,v=i.style;ee(p(d.state),g=>{g===void 0?v.removeProperty(y):v.setProperty(y,g)})}d.init?.(),ye?.(r,d),hr(i)&&J?.(i)?$e.push(d):J&&d.mount?.()}else{let h=a?.xmlns;i=de[dr+(h?"NS":"")](h||r,h&&r,a,o);let c=(u,f)=>{J?.(i)||(f===void 0||f===!1?i.removeAttribute(u):i.setAttribute(u,f))};for(let u of o)Oe(u,i,X).map(f=>{f.parentNode!==i&&i.appendChild(f)});let d=i.classList;for(let u in a){let f=a[u];if(u==="this")f.value=i;else if(u==="value"||u==="checked")ee(f,p=>{c(u,p),i.value=p},()=>{i.addEventListener("input",()=>f.value=i[u])});else if(u==="class"){let p=[];ee(f,y=>{let v=y.split(" ").filter(g=>g.length);p.length&&d.remove(...p),v.length&&d.add(...v),p=v})}else if(u.startsWith("on:"))i.addEventListener(u.substring(3),p=>f(p));else if(u.startsWith("class:")){let p=u.substring(6);ee(f,y=>{y?d.add(p):d.remove(p)})}else if(u.startsWith("attr:")){let p=u.substring(5);ee(f,y=>{J?.(i)||(i[p]=y)})}else if(u!="style"||typeof f!="object"||te(f))ee(f,p=>c(u,p));else for(let p in f)ee(f[p],y=>{i.style.setProperty(p,y)})}X&&![...d].find(u=>u.startsWith(ke))&&d.add(X),h&&(i.innerHTML=i.innerHTML)}return i},at=r=>r.children,Je=()=>{let r=[],e=t=>((n,a)=>a.map(i=>{let o=X;X=i.R,i.L(n),X=o}))(t,r);return e.listen=t=>{r.push({L:t,R:X})},e};Object.defineProperty(globalThis,"use",{get(){let r=ne;return ne=!0,(e,...t)=>{if(ne=r,e instanceof Array&&"raw"in e)return((a,i)=>{let o=Tr({}),h=[];for(let c in a)if(h.push(a[c]),i[c]){let d,u=i[c],f=u[be]();if(te(u)?d=u:Re(f)&&(d=new Z(f)),d){let p=h.length;d.listen(y=>{h[p]=y,o.W=h.join("")}),h.push(d.value)}else h.push(u)}return o.W=h.join(""),use(o.W)})(e,t);let n=a=>{let i=a[be]();return Re(i),new Z(i)};return t=t.map(n),e=n(e),t.length?e.zip(...t):e}},configurable:!0}),s[W]=()=>qe=new Map,s[ve]=()=>$e.splice(0,$e.length);let ge="dlssri",nt=JSON,it=(r,e,t,n)=>{let a=s("textarea",{});a.innerHTML=n.innerText;let i=nt.parse(a.value),o=+e.getAttribute(ge),h=-1,c=g=>{let C=`[${ge}="${g}"]`;return o==g?e:e.querySelector(C)||t.querySelector(C)},d=()=>{let g=i.n[++h];if(!g)return;let[C,A]=g;return c(C)?.childNodes?.[A]},u=g=>{let C=i.n[g?.root?.getAttribute?.(ge)];C&&((A,V,E)=>{let L=(M,T)=>{T instanceof Array?M[W]().forEach((q,Y)=>L(q,T[Y])):M.value=I(T.v,M.value,!0)},I=(M,T,q)=>{if(typeof M=="number")return A.v[M];let[Y,$]=M;if(Y==4)return L(T,$),q?ve:T;if(Y==2)return new Set($.map(_=>I(_,{})));if(Y==0){let _={};return O($,_),new Map(Object.entries(_))}return Y==3?$.map(_=>I(_,{})):Y==1?(T||={},O($,T),T):void 0},O=(M,T)=>{for(let[q,Y]of M){let $=A.k[q];T[$]=I(Y,T[$])}};O(V,E)})(i,C,g.state)},f=g=>g.hasAttribute(ge);for(let[g,C,A]of i.t){let V=c(g).childNodes[C];V.length!==A&&V.splitText(A)}let p=Sr(),y=[{createElement:g=>c(++h)||p[0].createElement(g),createElementNS:(g,C)=>c(++h)||p[0].createElementNS(g,C),head:p[0].head},p[1],g=>d()||p[2](g),g=>d()||p[3](g),()=>i.i[h+1]||p[4](),f,(g,C)=>{C?.root instanceof p[1]&&!f(C.root)&&u(C)}];cr(y),s[W]();let v=r();return cr(p),s[ve]().map(g=>{u(g),g.mount?.()}),v},Te,mr=(r,e,t,n)=>{let a=r.t;return a instanceof Function?a(t,n):a},pr=(r,e,t,n,a)=>{if(r.$){let i=r.$.state;for(let o in n)i[o]=n[o];i.outlet=a,i["on:routeshown"]?.(t)}},Lr=(r,e,t,n)=>{let a=[],i=!1;if(r.i?a=r.i.split("/"):r.l.length||(i=!0),!a.length||t.splice(0,a.length).every((o,h)=>((c,d,u)=>u[W]||d==="*"?(u[W]+="/"+c,!0):d.startsWith(":")?(u[d.substring(1)]=c,!0):c===d)(o,a[h],n))){if((!t.length||t[0]===""&&i||n[W])&&r.t){n[W]&&(n["*"]=n[W].slice(10),delete n[W]);let o=mr(r,0,e,n);return pr(o,0,e,n),o}{let o,h={...n};for(let c of r.l||[])if(o=Lr(c,e,[...t],n),o)break;if(o){let c=mr(r,0,e,h);return c?(pr(c,0,e,n,o),c):o}}}return null},Be=function(r){return{i:this.path,t:this.show,l:r.children}},ot=function(r){Te=this;let e={l:r.children};return this.route=(t=location.pathname,n=location.origin)=>{let a=new URL(t,n).pathname;a.endsWith(".html")&&(a=a.slice(0,a.length-5));let i=a.split("/").slice(1),o=Lr(e,a,[...i],{});if(this.h=o,o)return a},this.navigate=t=>{let n=this.route(t);return n&&history.pushState(null,"",n),n},this.ssgables=()=>{let t=(n,a)=>(a.i&&(n+="/"+a.i),a.l.length?a.l.map(i=>t(n,i)).flat():!a.i||!a.i.startsWith(":")&&a.i!=="*"?[[n||"/",a.i?n+".html":n+"/index.html"]]:[]);return t("",e)},r.mount=()=>{addEventListener("popstate",()=>{this.route()})},tt(at,null,use(this.h))};function U(r){return 0>r?-1:r===0?0:1}function me(r,e,t){return(1-t)*r+t*e}function N(r,e,t){return r>t?r:t>e?e:t}function st(r){return 0>(r%=360)&&(r+=360),r}function Ne(r,e){return[r[0]*e[0][0]+r[1]*e[0][1]+r[2]*e[0][2],r[0]*e[1][0]+r[1]*e[1][1]+r[2]*e[1][2],r[0]*e[2][0]+r[1]*e[2][1]+r[2]*e[2][2]]}const lt=[[.41233895,.35762064,.18051042],[.2126,.7152,.0722],[.01932141,.11916382,.95034478]],ct=[[3.2413774792388685,-1.5376652402851851,-.49885366846268053],[-.9691452513005321,1.8758853451067872,.04156585616912061],[.05562093689691305,-.20395524564742123,1.0571799111220335]],ut=[95.047,100,108.883];function Ze(r,e,t){return(255<<24|(255&r)<<16|(255&e)<<8|255&t)>>>0}function fr(r){return Ze(ie(r[0]),ie(r[1]),ie(r[2]))}function dt(r){return r>>16&255}function ht(r){return r>>8&255}function mt(r){return 255&r}function pt(r,e,t){const n=ct,a=n[0][0]*r+n[0][1]*e+n[0][2]*t,i=n[1][0]*r+n[1][1]*e+n[1][2]*t,o=n[2][0]*r+n[2][1]*e+n[2][2]*t;return Ze(ie(a),ie(i),ie(o))}function gr(r){const e=(t=>Ne([se(dt(t)),se(ht(t)),se(mt(t))],lt))(r)[1];return 116*Ir(e/100)-16}function re(r){return 100*ft((r+16)/116)}function ze(r){return 116*Ir(r/100)-16}function se(r){const e=r/255;return e>.040449936?100*Math.pow((e+.055)/1.055,2.4):e/12.92*100}function ie(r){const e=r/100;let t=0;return t=e>.0031308?1.055*Math.pow(e,1/2.4)-.055:12.92*e,0>(n=Math.round(255*t))?0:n>255?255:n;var n}function Ir(r){return r>216/24389?Math.pow(r,1/3):(24389/27*r+16)/116}function ft(r){const e=r*r*r;return e>216/24389?e:(116*r-16)/(24389/27)}class G{static make(e=ut,t=200/Math.PI*re(50)/100,n=50,a=2,i=!1){const o=e,h=.401288*o[0]+.650173*o[1]+-.051461*o[2],c=-.250268*o[0]+1.204414*o[1]+.045854*o[2],d=-.002079*o[0]+.048952*o[1]+.953127*o[2],u=.8+a/10,f=.9>u?me(.525,.59,10*(u-.8)):me(.59,.69,10*(u-.9));let p=i?1:u*(1-1/3.6*Math.exp((-t-42)/92));p=p>1?1:0>p?0:p;const y=u,v=[p*(100/h)+1-p,p*(100/c)+1-p,p*(100/d)+1-p],g=1/(5*t+1),C=g*g*g*g,A=1-C,V=C*t+.1*A*A*Math.cbrt(5*t),E=re(n)/e[1],L=1.48+Math.sqrt(E),I=.725/Math.pow(E,.2),O=I,M=[Math.pow(V*v[0]*h/100,.42),Math.pow(V*v[1]*c/100,.42),Math.pow(V*v[2]*d/100,.42)],T=[400*M[0]/(M[0]+27.13),400*M[1]/(M[1]+27.13),400*M[2]/(M[2]+27.13)];return new G(E,(2*T[0]+T[1]+.05*T[2])*I,I,O,f,y,v,V,Math.pow(V,.25),L)}constructor(e,t,n,a,i,o,h,c,d,u){this.n=e,this.aw=t,this.nbb=n,this.ncb=a,this.c=i,this.nc=o,this.rgbD=h,this.fl=c,this.fLRoot=d,this.z=u}}G.DEFAULT=G.make();class K{constructor(e,t,n,a,i,o,h,c,d){this.hue=e,this.chroma=t,this.j=n,this.q=a,this.m=i,this.s=o,this.jstar=h,this.astar=c,this.bstar=d}distance(e){const t=this.jstar-e.jstar,n=this.astar-e.astar,a=this.bstar-e.bstar;return 1.41*Math.pow(Math.sqrt(t*t+n*n+a*a),.63)}static fromInt(e){return K.fromIntInViewingConditions(e,G.DEFAULT)}static fromIntInViewingConditions(e,t){const n=(65280&e)>>8,a=255&e,i=se((16711680&e)>>16),o=se(n),h=se(a),c=.41233895*i+.35762064*o+.18051042*h,d=.2126*i+.7152*o+.0722*h,u=.01932141*i+.11916382*o+.95034478*h,f=.401288*c+.650173*d-.051461*u,p=-.250268*c+1.204414*d+.045854*u,y=-.002079*c+.048952*d+.953127*u,v=t.rgbD[0]*f,g=t.rgbD[1]*p,C=t.rgbD[2]*y,A=Math.pow(t.fl*Math.abs(v)/100,.42),V=Math.pow(t.fl*Math.abs(g)/100,.42),E=Math.pow(t.fl*Math.abs(C)/100,.42),L=400*U(v)*A/(A+27.13),I=400*U(g)*V/(V+27.13),O=400*U(C)*E/(E+27.13),M=(11*L+-12*I+O)/11,T=(L+I-2*O)/9,q=(20*L+20*I+21*O)/20,Y=(40*L+20*I+O)/20,$=180*Math.atan2(T,M)/Math.PI,_=0>$?$+360:360>$?$:$-360,ue=_*Math.PI/180,pe=Y*t.nbb,ae=100*Math.pow(pe/t.aw,t.c*t.z),Me=4/t.c*Math.sqrt(ae/100)*(t.aw+4)*t.fLRoot,fe=5e4/13*.25*(Math.cos((20.14>_?_+360:_)*Math.PI/180+2)+3.8)*t.nc*t.ncb,ar=Math.pow(fe*Math.sqrt(M*M+T*T)/(q+.305),.9)*Math.pow(1.64-Math.pow(.29,t.n),.73),nr=ar*Math.sqrt(ae/100),ir=nr*t.fLRoot,_r=50*Math.sqrt(ar*t.c/(t.aw+4)),Hr=(1+100*.007)*ae/(1+.007*ae),or=1/.0228*Math.log(1+.0228*ir);return new K(_,nr,ae,Me,ir,_r,Hr,or*Math.cos(ue),or*Math.sin(ue))}static fromJch(e,t,n){return K.fromJchInViewingConditions(e,t,n,G.DEFAULT)}static fromJchInViewingConditions(e,t,n,a){const i=4/a.c*Math.sqrt(e/100)*(a.aw+4)*a.fLRoot,o=t*a.fLRoot,h=50*Math.sqrt(t/Math.sqrt(e/100)*a.c/(a.aw+4)),c=n*Math.PI/180,d=(1+100*.007)*e/(1+.007*e),u=1/.0228*Math.log(1+.0228*o);return new K(n,t,e,i,o,h,d,u*Math.cos(c),u*Math.sin(c))}static fromUcs(e,t,n){return K.fromUcsInViewingConditions(e,t,n,G.DEFAULT)}static fromUcsInViewingConditions(e,t,n,a){const i=t,o=n,h=(Math.exp(.0228*Math.sqrt(i*i+o*o))-1)/.0228/a.fLRoot;let c=Math.atan2(o,i)*(180/Math.PI);0>c&&(c+=360);const d=e/(1-.007*(e-100));return K.fromJchInViewingConditions(d,h,c,a)}toInt(){return this.viewed(G.DEFAULT)}viewed(e){const t=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(t/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),a=this.hue*Math.PI/180,i=.25*(Math.cos(a+2)+3.8),o=e.aw*Math.pow(this.j/100,1/e.c/e.z),h=i*(5e4/13)*e.nc*e.ncb,c=o/e.nbb,d=Math.sin(a),u=Math.cos(a),f=23*(c+.305)*n/(23*h+11*n*u+108*n*d),p=f*u,y=f*d,v=(460*c+451*p+288*y)/1403,g=(460*c-891*p-261*y)/1403,C=(460*c-220*p-6300*y)/1403,A=Math.max(0,27.13*Math.abs(v)/(400-Math.abs(v))),V=U(v)*(100/e.fl)*Math.pow(A,1/.42),E=Math.max(0,27.13*Math.abs(g)/(400-Math.abs(g))),L=U(g)*(100/e.fl)*Math.pow(E,1/.42),I=Math.max(0,27.13*Math.abs(C)/(400-Math.abs(C))),O=U(C)*(100/e.fl)*Math.pow(I,1/.42),M=V/e.rgbD[0],T=L/e.rgbD[1],q=O/e.rgbD[2];return pt(1.86206786*M-1.01125463*T+.14918677*q,.38752654*M+.62144744*T-.00897398*q,-.0158415*M-.03412294*T+1.04996444*q)}static fromXyzInViewingConditions(e,t,n,a){const i=.401288*e+.650173*t-.051461*n,o=-.250268*e+1.204414*t+.045854*n,h=-.002079*e+.048952*t+.953127*n,c=a.rgbD[0]*i,d=a.rgbD[1]*o,u=a.rgbD[2]*h,f=Math.pow(a.fl*Math.abs(c)/100,.42),p=Math.pow(a.fl*Math.abs(d)/100,.42),y=Math.pow(a.fl*Math.abs(u)/100,.42),v=400*U(c)*f/(f+27.13),g=400*U(d)*p/(p+27.13),C=400*U(u)*y/(y+27.13),A=(11*v+-12*g+C)/11,V=(v+g-2*C)/9,E=(20*v+20*g+21*C)/20,L=(40*v+20*g+C)/20,I=180*Math.atan2(V,A)/Math.PI,O=0>I?I+360:360>I?I:I-360,M=O*Math.PI/180,T=L*a.nbb,q=100*Math.pow(T/a.aw,a.c*a.z),Y=4/a.c*Math.sqrt(q/100)*(a.aw+4)*a.fLRoot,$=5e4/13*(1/4)*(Math.cos((20.14>O?O+360:O)*Math.PI/180+2)+3.8)*a.nc*a.ncb,_=Math.pow($*Math.sqrt(A*A+V*V)/(E+.305),.9)*Math.pow(1.64-Math.pow(.29,a.n),.73),ue=_*Math.sqrt(q/100),pe=ue*a.fLRoot,ae=50*Math.sqrt(_*a.c/(a.aw+4)),Me=(1+100*.007)*q/(1+.007*q),fe=Math.log(1+.0228*pe)/.0228;return new K(O,ue,q,Y,pe,ae,Me,fe*Math.cos(M),fe*Math.sin(M))}xyzInViewingConditions(e){const t=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(t/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),a=this.hue*Math.PI/180,i=.25*(Math.cos(a+2)+3.8),o=e.aw*Math.pow(this.j/100,1/e.c/e.z),h=i*(5e4/13)*e.nc*e.ncb,c=o/e.nbb,d=Math.sin(a),u=Math.cos(a),f=23*(c+.305)*n/(23*h+11*n*u+108*n*d),p=f*u,y=f*d,v=(460*c+451*p+288*y)/1403,g=(460*c-891*p-261*y)/1403,C=(460*c-220*p-6300*y)/1403,A=Math.max(0,27.13*Math.abs(v)/(400-Math.abs(v))),V=U(v)*(100/e.fl)*Math.pow(A,1/.42),E=Math.max(0,27.13*Math.abs(g)/(400-Math.abs(g))),L=U(g)*(100/e.fl)*Math.pow(E,1/.42),I=Math.max(0,27.13*Math.abs(C)/(400-Math.abs(C))),O=U(C)*(100/e.fl)*Math.pow(I,1/.42),M=V/e.rgbD[0],T=L/e.rgbD[1],q=O/e.rgbD[2];return[1.86206786*M-1.01125463*T+.14918677*q,.38752654*M+.62144744*T-.00897398*q,-.0158415*M-.03412294*T+1.04996444*q]}}class w{static sanitizeRadians(e){return(e+8*Math.PI)%(2*Math.PI)}static trueDelinearized(e){const t=e/100;let n=0;return n=t>.0031308?1.055*Math.pow(t,1/2.4)-.055:12.92*t,255*n}static chromaticAdaptation(e){const t=Math.pow(Math.abs(e),.42);return 400*U(e)*t/(t+27.13)}static hueOf(e){const t=Ne(e,w.SCALED_DISCOUNT_FROM_LINRGB),n=w.chromaticAdaptation(t[0]),a=w.chromaticAdaptation(t[1]),i=w.chromaticAdaptation(t[2]);return Math.atan2((n+a-2*i)/9,(11*n+-12*a+i)/11)}static areInCyclicOrder(e,t,n){const a=w.sanitizeRadians(t-e);return w.sanitizeRadians(n-e)>a}static intercept(e,t,n){return(t-e)/(n-e)}static lerpPoint(e,t,n){return[e[0]+(n[0]-e[0])*t,e[1]+(n[1]-e[1])*t,e[2]+(n[2]-e[2])*t]}static setCoordinate(e,t,n,a){const i=w.intercept(e[a],t,n[a]);return w.lerpPoint(e,i,n)}static isBounded(e){return e>=0&&100>=e}static nthVertex(e,t){const n=w.Y_FROM_LINRGB[0],a=w.Y_FROM_LINRGB[1],i=w.Y_FROM_LINRGB[2],o=t%4>1?100:0,h=t%2==0?0:100;if(4>t){const c=o,d=h,u=(e-c*a-d*i)/n;return w.isBounded(u)?[u,c,d]:[-1,-1,-1]}if(8>t){const c=o,d=h,u=(e-d*n-c*i)/a;return w.isBounded(u)?[d,u,c]:[-1,-1,-1]}{const c=o,d=h,u=(e-c*n-d*a)/i;return w.isBounded(u)?[c,d,u]:[-1,-1,-1]}}static bisectToSegment(e,t){let n=[-1,-1,-1],a=n,i=0,o=0,h=!1,c=!0;for(let d=0;12>d;d++){const u=w.nthVertex(e,d);if(0>u[0])continue;const f=w.hueOf(u);h?(c||w.areInCyclicOrder(i,f,o))&&(c=!1,w.areInCyclicOrder(i,t,f)?(a=u,o=f):(n=u,i=f)):(n=u,a=u,i=f,o=f,h=!0)}return[n,a]}static midpoint(e,t){return[(e[0]+t[0])/2,(e[1]+t[1])/2,(e[2]+t[2])/2]}static criticalPlaneBelow(e){return Math.floor(e-.5)}static criticalPlaneAbove(e){return Math.ceil(e-.5)}static bisectToLimit(e,t){const n=w.bisectToSegment(e,t);let a=n[0],i=w.hueOf(a),o=n[1];for(let h=0;3>h;h++)if(a[h]!==o[h]){let c=-1,d=255;a[h]<o[h]?(c=w.criticalPlaneBelow(w.trueDelinearized(a[h])),d=w.criticalPlaneAbove(w.trueDelinearized(o[h]))):(c=w.criticalPlaneAbove(w.trueDelinearized(a[h])),d=w.criticalPlaneBelow(w.trueDelinearized(o[h])));for(let u=0;8>u&&Math.abs(d-c)>1;u++){const f=Math.floor((c+d)/2),p=w.CRITICAL_PLANES[f],y=w.setCoordinate(a,p,o,h),v=w.hueOf(y);w.areInCyclicOrder(i,t,v)?(o=y,d=f):(a=y,i=v,c=f)}}return w.midpoint(a,o)}static inverseChromaticAdaptation(e){const t=Math.abs(e),n=Math.max(0,27.13*t/(400-t));return U(e)*Math.pow(n,1/.42)}static findResultByJ(e,t,n){let a=11*Math.sqrt(n);const i=G.DEFAULT,o=1/Math.pow(1.64-Math.pow(.29,i.n),.73),h=.25*(Math.cos(e+2)+3.8)*(5e4/13)*i.nc*i.ncb,c=Math.sin(e),d=Math.cos(e);for(let u=0;5>u;u++){const f=a/100,p=Math.pow((t===0||a===0?0:t/Math.sqrt(f))*o,1/.9),y=i.aw*Math.pow(f,1/i.c/i.z)/i.nbb,v=23*(y+.305)*p/(23*h+11*p*d+108*p*c),g=v*d,C=v*c,A=(460*y+451*g+288*C)/1403,V=(460*y-891*g-261*C)/1403,E=(460*y-220*g-6300*C)/1403,L=Ne([w.inverseChromaticAdaptation(A),w.inverseChromaticAdaptation(V),w.inverseChromaticAdaptation(E)],w.LINRGB_FROM_SCALED_DISCOUNT);if(0>L[0]||0>L[1]||0>L[2])return 0;const I=w.Y_FROM_LINRGB[0],O=w.Y_FROM_LINRGB[1],M=w.Y_FROM_LINRGB[2],T=I*L[0]+O*L[1]+M*L[2];if(0>=T)return 0;if(u===4||.002>Math.abs(T-n))return L[0]>100.01||L[1]>100.01||L[2]>100.01?0:fr(L);a-=(T-n)*a/(2*T)}return 0}static solveToInt(e,t,n){if(1e-4>t||1e-4>n||n>99.9999)return(h=>{const c=ie(re(h));return Ze(c,c,c)})(n);const a=(e=st(e))/180*Math.PI,i=re(n),o=w.findResultByJ(a,t,i);return o!==0?o:fr(w.bisectToLimit(i,a))}static solveToCam(e,t,n){return K.fromInt(w.solveToInt(e,t,n))}}w.SCALED_DISCOUNT_FROM_LINRGB=[[.001200833568784504,.002389694492170889,.0002795742885861124],[.0005891086651375999,.0029785502573438758,.0003270666104008398],[.00010146692491640572,.0005364214359186694,.0032979401770712076]],w.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]],w.Y_FROM_LINRGB=[.2126,.7152,.0722],w.CRITICAL_PLANES=[.015176349177441876,.045529047532325624,.07588174588720938,.10623444424209313,.13658714259697685,.16693984095186062,.19729253930674434,.2276452376616281,.2579979360165119,.28835063437139563,.3188300904430532,.350925934958123,.3848314933096426,.42057480301049466,.458183274052838,.4976837250274023,.5391024159806381,.5824650784040898,.6277969426914107,.6751227633498623,.7244668422128921,.775853049866786,.829304845476233,.8848452951698498,.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];class D{static from(e,t,n){return new D(w.solveToInt(e,t,n))}static fromInt(e){return new D(e)}toInt(){return this.argb}get hue(){return this.internalHue}set hue(e){this.setInternalState(w.solveToInt(e,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}set chroma(e){this.setInternalState(w.solveToInt(this.internalHue,e,this.internalTone))}get tone(){return this.internalTone}set tone(e){this.setInternalState(w.solveToInt(this.internalHue,this.internalChroma,e))}setValue(e,t){this[e]=t}toString(){return`HCT(${this.hue.toFixed(0)}, ${this.chroma.toFixed(0)}, ${this.tone.toFixed(0)})`}static isBlue(e){return e>=250&&270>e}static isYellow(e){return e>=105&&125>e}static isCyan(e){return e>=170&&207>e}constructor(e){this.argb=e;const t=K.fromInt(e);this.internalHue=t.hue,this.internalChroma=t.chroma,this.internalTone=gr(e),this.argb=e}setInternalState(e){const t=K.fromInt(e);this.internalHue=t.hue,this.internalChroma=t.chroma,this.internalTone=gr(e),this.argb=e}inViewingConditions(e){const t=K.fromInt(this.toInt()).xyzInViewingConditions(e),n=K.fromXyzInViewingConditions(t[0],t[1],t[2],G.make());return D.from(n.hue,n.chroma,ze(t[1]))}}class F{static ratioOfTones(e,t){return e=N(0,100,e),t=N(0,100,t),F.ratioOfYs(re(e),re(t))}static ratioOfYs(e,t){const n=e>t?e:t;return(n+5)/((n===t?e:t)+5)}static lighter(e,t){if(0>e||e>100)return-1;const n=re(e),a=t*(n+5)-5,i=F.ratioOfYs(a,n);if(t>i&&Math.abs(i-t)>.04)return-1;const o=ze(a)+.4;return 0>o||o>100?-1:o}static darker(e,t){if(0>e||e>100)return-1;const n=re(e),a=(n+5)/t-5,i=F.ratioOfYs(n,a);if(t>i&&Math.abs(i-t)>.04)return-1;const o=ze(a)-.4;return 0>o||o>100?-1:o}static lighterUnsafe(e,t){const n=F.lighter(e,t);return 0>n?100:n}static darkerUnsafe(e,t){const n=F.darker(e,t);return 0>n?0:n}}class Qe{static isDisliked(e){const t=Math.round(e.hue)>=90&&111>=Math.round(e.hue),n=Math.round(e.chroma)>16,a=65>Math.round(e.tone);return t&&n&&a}static fixIfDisliked(e){return Qe.isDisliked(e)?D.from(e.hue,e.chroma,70):e}}function S(r,e,t){return((n,a,i)=>{if(n.name!==i.name)throw Error(`Attempting to extend color ${n.name} with color ${i.name} of different name for spec version ${a}.`);if(n.isBackground!==i.isBackground)throw Error(`Attempting to extend color ${n.name} as a ${n.isBackground?"background":"foreground"} with color ${i.name} as a ${i.isBackground?"background":"foreground"} for spec version ${a}.`)})(r,e,t),m.fromPalette({name:r.name,palette:n=>n.specVersion===e?t.palette(n):r.palette(n),tone:n=>n.specVersion===e?t.tone(n):r.tone(n),isBackground:r.isBackground,chromaMultiplier(n){const a=n.specVersion===e?t.chromaMultiplier:r.chromaMultiplier;return a!==void 0?a(n):1},background(n){const a=n.specVersion===e?t.background:r.background;return a!==void 0?a(n):void 0},secondBackground(n){const a=n.specVersion===e?t.secondBackground:r.secondBackground;return a!==void 0?a(n):void 0},contrastCurve(n){const a=n.specVersion===e?t.contrastCurve:r.contrastCurve;return a!==void 0?a(n):void 0},toneDeltaPair(n){const a=n.specVersion===e?t.toneDeltaPair:r.toneDeltaPair;return a!==void 0?a(n):void 0}})}class m{static fromPalette(e){return new m(e.name??"",e.palette,e.tone??m.getInitialToneFromBackground(e.background),e.isBackground??!1,e.chromaMultiplier,e.background,e.secondBackground,e.contrastCurve,e.toneDeltaPair)}static getInitialToneFromBackground(e){return e===void 0?t=>50:t=>e(t)?e(t).getTone(t):50}constructor(e,t,n,a,i,o,h,c,d){if(this.name=e,this.palette=t,this.tone=n,this.isBackground=a,this.chromaMultiplier=i,this.background=o,this.secondBackground=h,this.contrastCurve=c,this.toneDeltaPair=d,this.hctCache=new Map,!o&&h)throw Error(`Color ${e} has secondBackgrounddefined, but background is not defined.`);if(!o&&c)throw Error(`Color ${e} has contrastCurvedefined, but background is not defined.`);if(o&&!c)throw Error(`Color ${e} has backgrounddefined, but contrastCurve is not defined.`)}clone(){return m.fromPalette({name:this.name,palette:this.palette,tone:this.tone,isBackground:this.isBackground,chromaMultiplier:this.chromaMultiplier,background:this.background,secondBackground:this.secondBackground,contrastCurve:this.contrastCurve,toneDeltaPair:this.toneDeltaPair})}clearCache(){this.hctCache.clear()}getArgb(e){return this.getHct(e).toInt()}getHct(e){const t=this.hctCache.get(e);if(t!=null)return t;const n=yr(e.specVersion).getHct(e,this);return this.hctCache.size>4&&this.hctCache.clear(),this.hctCache.set(e,n),n}getTone(e){return yr(e.specVersion).getTone(e,this)}static foregroundTone(e,t){const n=F.lighterUnsafe(e,t),a=F.darkerUnsafe(e,t),i=F.ratioOfTones(n,e),o=F.ratioOfTones(a,e);return m.tonePrefersLightForeground(e)?i>=t||i>=o||.1>Math.abs(i-o)&&t>i&&t>o?n:a:t>o&&i>o?n:a}static tonePrefersLightForeground(e){return 60>Math.round(e)}static toneAllowsLightForeground(e){return 49>=Math.round(e)}static enableLightForeground(e){return m.tonePrefersLightForeground(e)&&!m.toneAllowsLightForeground(e)?49:e}}const gt=new class{getHct(r,e){const t=e.getTone(r);return e.palette(r).getHct(t)}getTone(r,e){const t=0>r.contrastLevel,n=e.toneDeltaPair?e.toneDeltaPair(r):void 0;if(n){const a=n.roleA,i=n.roleB,o=n.delta,h=n.polarity,c=n.stayTogether,d=h==="nearer"||h==="lighter"&&!r.isDark||h==="darker"&&r.isDark,u=d?a:i,f=d?i:a,p=e.name===u.name,y=r.isDark?1:-1;let v=u.tone(r),g=f.tone(r);if(e.background&&u.contrastCurve&&f.contrastCurve){const C=e.background(r),A=u.contrastCurve(r),V=f.contrastCurve(r);if(C&&A&&V){const E=C.getTone(r),L=A.get(r.contrastLevel),I=V.get(r.contrastLevel);F.ratioOfTones(E,v)<L&&(v=m.foregroundTone(E,L)),F.ratioOfTones(E,g)<I&&(g=m.foregroundTone(E,I)),t&&(v=m.foregroundTone(E,L),g=m.foregroundTone(E,I))}}return o>(g-v)*y&&(g=N(0,100,v+o*y),o>(g-v)*y&&(v=N(0,100,g-o*y))),v>=50&&60>v?y>0?(v=60,g=Math.max(g,v+o*y)):(v=49,g=Math.min(g,v+o*y)):g>=50&&60>g&&(c?y>0?(v=60,g=Math.max(g,v+o*y)):(v=49,g=Math.min(g,v+o*y)):g=y>0?60:49),p?v:g}{let a=e.tone(r);if(e.background==null||e.background(r)===void 0||e.contrastCurve==null||e.contrastCurve(r)===void 0)return a;const i=e.background(r).getTone(r),o=e.contrastCurve(r).get(r.contrastLevel);if(F.ratioOfTones(i,a)<o&&(a=m.foregroundTone(i,o)),t&&(a=m.foregroundTone(i,o)),e.isBackground&&a>=50&&60>a&&(a=F.ratioOfTones(49,i)<o?60:49),e.secondBackground==null||e.secondBackground(r)===void 0)return a;const[h,c]=[e.background,e.secondBackground],[d,u]=[h(r).getTone(r),c(r).getTone(r)],[f,p]=[Math.max(d,u),Math.min(d,u)];if(F.ratioOfTones(f,a)>=o&&F.ratioOfTones(p,a)>=o)return a;const y=F.lighter(f,o),v=F.darker(p,o),g=[];return y!==-1&&g.push(y),v!==-1&&g.push(v),m.tonePrefersLightForeground(d)||m.tonePrefersLightForeground(u)?0>y?100:y:g.length===1?g[0]:0>v?0:v}}},yt=new class{getHct(r,e){const t=e.palette(r),n=e.getTone(r),a=t.hue,i=t.chroma*(e.chromaMultiplier?e.chromaMultiplier(r):1);return D.from(a,i,n)}getTone(r,e){const t=e.toneDeltaPair?e.toneDeltaPair(r):void 0;if(t){const n=t.roleA,a=t.roleB,i=t.polarity,o=t.constraint,h=i==="darker"||i==="relative_lighter"&&r.isDark||i==="relative_darker"&&!r.isDark?-t.delta:t.delta,c=e.name===n.name,d=c?a:n;let u=(c?n:a).tone(r),f=d.getTone(r);const p=h*(c?1:-1);if(o==="exact"?u=N(0,100,f+p):o==="nearer"?u=N(0,100,p>0?N(f,f+p,u):N(f+p,f,u)):o==="farther"&&(u=p>0?N(f+p,100,u):N(0,f+p,u)),e.background&&e.contrastCurve){const y=e.background(r),v=e.contrastCurve(r);if(y&&v){const g=y.getTone(r),C=v.get(r.contrastLevel);u=F.ratioOfTones(g,u)<C||0>r.contrastLevel?m.foregroundTone(g,C):u}}return e.isBackground&&!e.name.endsWith("_fixed_dim")&&(u=57>u?N(0,49,u):N(65,100,u)),u}{let n=e.tone(r);if(e.background==null||e.background(r)===void 0||e.contrastCurve==null||e.contrastCurve(r)===void 0)return n;const a=e.background(r).getTone(r),i=e.contrastCurve(r).get(r.contrastLevel);if(n=F.ratioOfTones(a,n)<i||0>r.contrastLevel?m.foregroundTone(a,i):n,e.isBackground&&!e.name.endsWith("_fixed_dim")&&(n=57>n?N(0,49,n):N(65,100,n)),e.secondBackground==null||e.secondBackground(r)===void 0)return n;const[o,h]=[e.background,e.secondBackground],[c,d]=[o(r).getTone(r),h(r).getTone(r)],[u,f]=[Math.max(c,d),Math.min(c,d)];if(F.ratioOfTones(u,n)>=i&&F.ratioOfTones(f,n)>=i)return n;const p=F.lighter(u,i),y=F.darker(f,i),v=[];return p!==-1&&v.push(p),y!==-1&&v.push(y),m.tonePrefersLightForeground(c)||m.tonePrefersLightForeground(d)?0>p?100:p:v.length===1?v[0]:0>y?0:y}}};function yr(r){return r==="2025"?yt:gt}class P{constructor(e,t,n,a){this.low=e,this.normal=t,this.medium=n,this.high=a}get(e){return e>-1?0>e?me(this.low,this.normal,(e- -1)/1):.5>e?me(this.normal,this.medium,(e-0)/.5):1>e?me(this.medium,this.high,(e-.5)/.5):this.high:this.low}}class B{constructor(e,t,n,a,i,o){this.roleA=e,this.roleB=t,this.delta=n,this.polarity=a,this.stayTogether=i,this.constraint=o,this.constraint=o??"exact"}}var b;function oe(r){return r.variant===b.FIDELITY||r.variant===b.CONTENT}function R(r){return r.variant===b.MONOCHROME}(r=>{r[r.MONOCHROME=0]="MONOCHROME",r[r.NEUTRAL=1]="NEUTRAL",r[r.TONAL_SPOT=2]="TONAL_SPOT",r[r.VIBRANT=3]="VIBRANT",r[r.EXPRESSIVE=4]="EXPRESSIVE",r[r.FIDELITY=5]="FIDELITY",r[r.CONTENT=6]="CONTENT",r[r.RAINBOW=7]="RAINBOW",r[r.FRUIT_SALAD=8]="FRUIT_SALAD"})(b||(b={}));class vt{primaryPaletteKeyColor(){return m.fromPalette({name:"primary_palette_key_color",palette:e=>e.primaryPalette,tone:e=>e.primaryPalette.keyColor.tone})}secondaryPaletteKeyColor(){return m.fromPalette({name:"secondary_palette_key_color",palette:e=>e.secondaryPalette,tone:e=>e.secondaryPalette.keyColor.tone})}tertiaryPaletteKeyColor(){return m.fromPalette({name:"tertiary_palette_key_color",palette:e=>e.tertiaryPalette,tone:e=>e.tertiaryPalette.keyColor.tone})}neutralPaletteKeyColor(){return m.fromPalette({name:"neutral_palette_key_color",palette:e=>e.neutralPalette,tone:e=>e.neutralPalette.keyColor.tone})}neutralVariantPaletteKeyColor(){return m.fromPalette({name:"neutral_variant_palette_key_color",palette:e=>e.neutralVariantPalette,tone:e=>e.neutralVariantPalette.keyColor.tone})}errorPaletteKeyColor(){return m.fromPalette({name:"error_palette_key_color",palette:e=>e.errorPalette,tone:e=>e.errorPalette.keyColor.tone})}background(){return m.fromPalette({name:"background",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0})}onBackground(){return m.fromPalette({name:"on_background",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>this.background(),contrastCurve:e=>new P(3,3,4.5,7)})}surface(){return m.fromPalette({name:"surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0})}surfaceDim(){return m.fromPalette({name:"surface_dim",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:new P(87,87,80,75).get(e.contrastLevel),isBackground:!0})}surfaceBright(){return m.fromPalette({name:"surface_bright",palette:e=>e.neutralPalette,tone:e=>e.isDark?new P(24,24,29,34).get(e.contrastLevel):98,isBackground:!0})}surfaceContainerLowest(){return m.fromPalette({name:"surface_container_lowest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new P(4,4,2,0).get(e.contrastLevel):100,isBackground:!0})}surfaceContainerLow(){return m.fromPalette({name:"surface_container_low",palette:e=>e.neutralPalette,tone:e=>e.isDark?new P(10,10,11,12).get(e.contrastLevel):new P(96,96,96,95).get(e.contrastLevel),isBackground:!0})}surfaceContainer(){return m.fromPalette({name:"surface_container",palette:e=>e.neutralPalette,tone:e=>e.isDark?new P(12,12,16,20).get(e.contrastLevel):new P(94,94,92,90).get(e.contrastLevel),isBackground:!0})}surfaceContainerHigh(){return m.fromPalette({name:"surface_container_high",palette:e=>e.neutralPalette,tone:e=>e.isDark?new P(17,17,21,25).get(e.contrastLevel):new P(92,92,88,85).get(e.contrastLevel),isBackground:!0})}surfaceContainerHighest(){return m.fromPalette({name:"surface_container_highest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new P(22,22,26,30).get(e.contrastLevel):new P(90,90,84,80).get(e.contrastLevel),isBackground:!0})}onSurface(){return m.fromPalette({name:"on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>this.highestSurface(e),contrastCurve:e=>new P(4.5,7,11,21)})}surfaceVariant(){return m.fromPalette({name:"surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:90,isBackground:!0})}onSurfaceVariant(){return m.fromPalette({name:"on_surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?80:30,background:e=>this.highestSurface(e),contrastCurve:e=>new P(3,4.5,7,11)})}inverseSurface(){return m.fromPalette({name:"inverse_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:20,isBackground:!0})}inverseOnSurface(){return m.fromPalette({name:"inverse_on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?20:95,background:e=>this.inverseSurface(),contrastCurve:e=>new P(4.5,7,11,21)})}outline(){return m.fromPalette({name:"outline",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?60:50,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1.5,3,4.5,7)})}outlineVariant(){return m.fromPalette({name:"outline_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:80,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5)})}shadow(){return m.fromPalette({name:"shadow",palette:e=>e.neutralPalette,tone:e=>0})}scrim(){return m.fromPalette({name:"scrim",palette:e=>e.neutralPalette,tone:e=>0})}surfaceTint(){return m.fromPalette({name:"surface_tint",palette:e=>e.primaryPalette,tone:e=>e.isDark?80:40,isBackground:!0})}primary(){return m.fromPalette({name:"primary",palette:e=>e.primaryPalette,tone:e=>R(e)?e.isDark?100:0:e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(3,4.5,7,7),toneDeltaPair:e=>new B(this.primaryContainer(),this.primary(),10,"nearer",!1)})}primaryDim(){}onPrimary(){return m.fromPalette({name:"on_primary",palette:e=>e.primaryPalette,tone:e=>R(e)?e.isDark?10:90:e.isDark?20:100,background:e=>this.primary(),contrastCurve:e=>new P(4.5,7,11,21)})}primaryContainer(){return m.fromPalette({name:"primary_container",palette:e=>e.primaryPalette,tone:e=>oe(e)?e.sourceColorHct.tone:R(e)?e.isDark?85:25:e.isDark?30:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5),toneDeltaPair:e=>new B(this.primaryContainer(),this.primary(),10,"nearer",!1)})}onPrimaryContainer(){return m.fromPalette({name:"on_primary_container",palette:e=>e.primaryPalette,tone:e=>oe(e)?m.foregroundTone(this.primaryContainer().tone(e),4.5):R(e)?e.isDark?0:100:e.isDark?90:30,background:e=>this.primaryContainer(),contrastCurve:e=>new P(3,4.5,7,11)})}inversePrimary(){return m.fromPalette({name:"inverse_primary",palette:e=>e.primaryPalette,tone:e=>e.isDark?40:80,background:e=>this.inverseSurface(),contrastCurve:e=>new P(3,4.5,7,7)})}secondary(){return m.fromPalette({name:"secondary",palette:e=>e.secondaryPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(3,4.5,7,7),toneDeltaPair:e=>new B(this.secondaryContainer(),this.secondary(),10,"nearer",!1)})}secondaryDim(){}onSecondary(){return m.fromPalette({name:"on_secondary",palette:e=>e.secondaryPalette,tone:e=>R(e)?e.isDark?10:100:e.isDark?20:100,background:e=>this.secondary(),contrastCurve:e=>new P(4.5,7,11,21)})}secondaryContainer(){return m.fromPalette({name:"secondary_container",palette:e=>e.secondaryPalette,tone(e){const t=e.isDark?30:90;return R(e)?e.isDark?30:85:oe(e)?((n,a,i,o)=>{let h=i,c=D.from(n,a,i);if(c.chroma<a){let d=c.chroma;for(;c.chroma<a;){h+=o?-1:1;const u=D.from(n,a,h);if(d>u.chroma||.4>Math.abs(u.chroma-a))break;const f=Math.abs(u.chroma-a);Math.abs(c.chroma-a)>f&&(c=u),d=Math.max(d,u.chroma)}}return h})(e.secondaryPalette.hue,e.secondaryPalette.chroma,t,!e.isDark):t},isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5),toneDeltaPair:e=>new B(this.secondaryContainer(),this.secondary(),10,"nearer",!1)})}onSecondaryContainer(){return m.fromPalette({name:"on_secondary_container",palette:e=>e.secondaryPalette,tone:e=>R(e)?e.isDark?90:10:oe(e)?m.foregroundTone(this.secondaryContainer().tone(e),4.5):e.isDark?90:30,background:e=>this.secondaryContainer(),contrastCurve:e=>new P(3,4.5,7,11)})}tertiary(){return m.fromPalette({name:"tertiary",palette:e=>e.tertiaryPalette,tone:e=>R(e)?e.isDark?90:25:e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(3,4.5,7,7),toneDeltaPair:e=>new B(this.tertiaryContainer(),this.tertiary(),10,"nearer",!1)})}tertiaryDim(){}onTertiary(){return m.fromPalette({name:"on_tertiary",palette:e=>e.tertiaryPalette,tone:e=>R(e)?e.isDark?10:90:e.isDark?20:100,background:e=>this.tertiary(),contrastCurve:e=>new P(4.5,7,11,21)})}tertiaryContainer(){return m.fromPalette({name:"tertiary_container",palette:e=>e.tertiaryPalette,tone(e){if(R(e))return e.isDark?60:49;if(!oe(e))return e.isDark?30:90;const t=e.tertiaryPalette.getHct(e.sourceColorHct.tone);return Qe.fixIfDisliked(t).tone},isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5),toneDeltaPair:e=>new B(this.tertiaryContainer(),this.tertiary(),10,"nearer",!1)})}onTertiaryContainer(){return m.fromPalette({name:"on_tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>R(e)?e.isDark?0:100:oe(e)?m.foregroundTone(this.tertiaryContainer().tone(e),4.5):e.isDark?90:30,background:e=>this.tertiaryContainer(),contrastCurve:e=>new P(3,4.5,7,11)})}error(){return m.fromPalette({name:"error",palette:e=>e.errorPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(3,4.5,7,7),toneDeltaPair:e=>new B(this.errorContainer(),this.error(),10,"nearer",!1)})}errorDim(){}onError(){return m.fromPalette({name:"on_error",palette:e=>e.errorPalette,tone:e=>e.isDark?20:100,background:e=>this.error(),contrastCurve:e=>new P(4.5,7,11,21)})}errorContainer(){return m.fromPalette({name:"error_container",palette:e=>e.errorPalette,tone:e=>e.isDark?30:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5),toneDeltaPair:e=>new B(this.errorContainer(),this.error(),10,"nearer",!1)})}onErrorContainer(){return m.fromPalette({name:"on_error_container",palette:e=>e.errorPalette,tone:e=>R(e)?e.isDark?90:10:e.isDark?90:30,background:e=>this.errorContainer(),contrastCurve:e=>new P(3,4.5,7,11)})}primaryFixed(){return m.fromPalette({name:"primary_fixed",palette:e=>e.primaryPalette,tone:e=>R(e)?40:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5),toneDeltaPair:e=>new B(this.primaryFixed(),this.primaryFixedDim(),10,"lighter",!0)})}primaryFixedDim(){return m.fromPalette({name:"primary_fixed_dim",palette:e=>e.primaryPalette,tone:e=>R(e)?30:80,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5),toneDeltaPair:e=>new B(this.primaryFixed(),this.primaryFixedDim(),10,"lighter",!0)})}onPrimaryFixed(){return m.fromPalette({name:"on_primary_fixed",palette:e=>e.primaryPalette,tone:e=>R(e)?100:10,background:e=>this.primaryFixedDim(),secondBackground:e=>this.primaryFixed(),contrastCurve:e=>new P(4.5,7,11,21)})}onPrimaryFixedVariant(){return m.fromPalette({name:"on_primary_fixed_variant",palette:e=>e.primaryPalette,tone:e=>R(e)?90:30,background:e=>this.primaryFixedDim(),secondBackground:e=>this.primaryFixed(),contrastCurve:e=>new P(3,4.5,7,11)})}secondaryFixed(){return m.fromPalette({name:"secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>R(e)?80:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5),toneDeltaPair:e=>new B(this.secondaryFixed(),this.secondaryFixedDim(),10,"lighter",!0)})}secondaryFixedDim(){return m.fromPalette({name:"secondary_fixed_dim",palette:e=>e.secondaryPalette,tone:e=>R(e)?70:80,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5),toneDeltaPair:e=>new B(this.secondaryFixed(),this.secondaryFixedDim(),10,"lighter",!0)})}onSecondaryFixed(){return m.fromPalette({name:"on_secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>10,background:e=>this.secondaryFixedDim(),secondBackground:e=>this.secondaryFixed(),contrastCurve:e=>new P(4.5,7,11,21)})}onSecondaryFixedVariant(){return m.fromPalette({name:"on_secondary_fixed_variant",palette:e=>e.secondaryPalette,tone:e=>R(e)?25:30,background:e=>this.secondaryFixedDim(),secondBackground:e=>this.secondaryFixed(),contrastCurve:e=>new P(3,4.5,7,11)})}tertiaryFixed(){return m.fromPalette({name:"tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>R(e)?40:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5),toneDeltaPair:e=>new B(this.tertiaryFixed(),this.tertiaryFixedDim(),10,"lighter",!0)})}tertiaryFixedDim(){return m.fromPalette({name:"tertiary_fixed_dim",palette:e=>e.tertiaryPalette,tone:e=>R(e)?30:80,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new P(1,1,3,4.5),toneDeltaPair:e=>new B(this.tertiaryFixed(),this.tertiaryFixedDim(),10,"lighter",!0)})}onTertiaryFixed(){return m.fromPalette({name:"on_tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>R(e)?100:10,background:e=>this.tertiaryFixedDim(),secondBackground:e=>this.tertiaryFixed(),contrastCurve:e=>new P(4.5,7,11,21)})}onTertiaryFixedVariant(){return m.fromPalette({name:"on_tertiary_fixed_variant",palette:e=>e.tertiaryPalette,tone:e=>R(e)?90:30,background:e=>this.tertiaryFixedDim(),secondBackground:e=>this.tertiaryFixed(),contrastCurve:e=>new P(3,4.5,7,11)})}highestSurface(e){return e.isDark?this.surfaceBright():this.surfaceDim()}}function x(r,e=0,t=100,n=1){return N(e,t,Br(r.hue,r.chroma*n,100,!0))}function Q(r,e=0,t=100){return N(e,t,Br(r.hue,r.chroma,0,!1))}function Br(r,e,t,n){let a=t,i=D.from(r,e,a);for(;i.chroma<e&&t>=0&&100>=t;){t+=n?-1:1;const o=D.from(r,e,t);i.chroma<o.chroma&&(i=o,a=t)}return a}function k(r){return r===1.5?new P(1.5,1.5,3,4.5):r===3?new P(3,3,4.5,7):r===4.5?new P(4.5,4.5,7,11):r===6?new P(6,6,7,11):r===7?new P(7,7,11,21):r===9?new P(9,9,11,21):r===11?new P(11,11,21,21):r===21?new P(21,21,21,21):new P(r,r,7,21)}class l{constructor(){this.allColors=[this.background(),this.onBackground(),this.surface(),this.surfaceDim(),this.surfaceBright(),this.surfaceContainerLowest(),this.surfaceContainerLow(),this.surfaceContainer(),this.surfaceContainerHigh(),this.surfaceContainerHighest(),this.onSurface(),this.onSurfaceVariant(),this.outline(),this.outlineVariant(),this.inverseSurface(),this.inverseOnSurface(),this.primary(),this.primaryDim(),this.onPrimary(),this.primaryContainer(),this.onPrimaryContainer(),this.primaryFixed(),this.primaryFixedDim(),this.onPrimaryFixed(),this.onPrimaryFixedVariant(),this.inversePrimary(),this.secondary(),this.secondaryDim(),this.onSecondary(),this.secondaryContainer(),this.onSecondaryContainer(),this.secondaryFixed(),this.secondaryFixedDim(),this.onSecondaryFixed(),this.onSecondaryFixedVariant(),this.tertiary(),this.tertiaryDim(),this.onTertiary(),this.tertiaryContainer(),this.onTertiaryContainer(),this.tertiaryFixed(),this.tertiaryFixedDim(),this.onTertiaryFixed(),this.onTertiaryFixedVariant(),this.error(),this.errorDim(),this.onError(),this.errorContainer(),this.onErrorContainer()].filter(e=>e!==void 0)}highestSurface(e){return l.colorSpec.highestSurface(e)}primaryPaletteKeyColor(){return l.colorSpec.primaryPaletteKeyColor()}secondaryPaletteKeyColor(){return l.colorSpec.secondaryPaletteKeyColor()}tertiaryPaletteKeyColor(){return l.colorSpec.tertiaryPaletteKeyColor()}neutralPaletteKeyColor(){return l.colorSpec.neutralPaletteKeyColor()}neutralVariantPaletteKeyColor(){return l.colorSpec.neutralVariantPaletteKeyColor()}errorPaletteKeyColor(){return l.colorSpec.errorPaletteKeyColor()}background(){return l.colorSpec.background()}onBackground(){return l.colorSpec.onBackground()}surface(){return l.colorSpec.surface()}surfaceDim(){return l.colorSpec.surfaceDim()}surfaceBright(){return l.colorSpec.surfaceBright()}surfaceContainerLowest(){return l.colorSpec.surfaceContainerLowest()}surfaceContainerLow(){return l.colorSpec.surfaceContainerLow()}surfaceContainer(){return l.colorSpec.surfaceContainer()}surfaceContainerHigh(){return l.colorSpec.surfaceContainerHigh()}surfaceContainerHighest(){return l.colorSpec.surfaceContainerHighest()}onSurface(){return l.colorSpec.onSurface()}surfaceVariant(){return l.colorSpec.surfaceVariant()}onSurfaceVariant(){return l.colorSpec.onSurfaceVariant()}outline(){return l.colorSpec.outline()}outlineVariant(){return l.colorSpec.outlineVariant()}inverseSurface(){return l.colorSpec.inverseSurface()}inverseOnSurface(){return l.colorSpec.inverseOnSurface()}shadow(){return l.colorSpec.shadow()}scrim(){return l.colorSpec.scrim()}surfaceTint(){return l.colorSpec.surfaceTint()}primary(){return l.colorSpec.primary()}primaryDim(){return l.colorSpec.primaryDim()}onPrimary(){return l.colorSpec.onPrimary()}primaryContainer(){return l.colorSpec.primaryContainer()}onPrimaryContainer(){return l.colorSpec.onPrimaryContainer()}inversePrimary(){return l.colorSpec.inversePrimary()}primaryFixed(){return l.colorSpec.primaryFixed()}primaryFixedDim(){return l.colorSpec.primaryFixedDim()}onPrimaryFixed(){return l.colorSpec.onPrimaryFixed()}onPrimaryFixedVariant(){return l.colorSpec.onPrimaryFixedVariant()}secondary(){return l.colorSpec.secondary()}secondaryDim(){return l.colorSpec.secondaryDim()}onSecondary(){return l.colorSpec.onSecondary()}secondaryContainer(){return l.colorSpec.secondaryContainer()}onSecondaryContainer(){return l.colorSpec.onSecondaryContainer()}secondaryFixed(){return l.colorSpec.secondaryFixed()}secondaryFixedDim(){return l.colorSpec.secondaryFixedDim()}onSecondaryFixed(){return l.colorSpec.onSecondaryFixed()}onSecondaryFixedVariant(){return l.colorSpec.onSecondaryFixedVariant()}tertiary(){return l.colorSpec.tertiary()}tertiaryDim(){return l.colorSpec.tertiaryDim()}onTertiary(){return l.colorSpec.onTertiary()}tertiaryContainer(){return l.colorSpec.tertiaryContainer()}onTertiaryContainer(){return l.colorSpec.onTertiaryContainer()}tertiaryFixed(){return l.colorSpec.tertiaryFixed()}tertiaryFixedDim(){return l.colorSpec.tertiaryFixedDim()}onTertiaryFixed(){return l.colorSpec.onTertiaryFixed()}onTertiaryFixedVariant(){return l.colorSpec.onTertiaryFixedVariant()}error(){return l.colorSpec.error()}errorDim(){return l.colorSpec.errorDim()}onError(){return l.colorSpec.onError()}errorContainer(){return l.colorSpec.errorContainer()}onErrorContainer(){return l.colorSpec.onErrorContainer()}static highestSurface(e){return l.colorSpec.highestSurface(e)}}l.contentAccentToneDelta=15,l.colorSpec=new class extends vt{surface(){const r=m.fromPalette({name:"surface",palette:e=>e.neutralPalette,tone:e=>(super.surface().tone(e),e.platform==="phone"?e.isDark?4:D.isYellow(e.neutralPalette.hue)?99:e.variant===b.VIBRANT?97:98:0),isBackground:!0});return S(super.surface(),"2025",r)}surfaceDim(){const r=m.fromPalette({name:"surface_dim",palette:e=>e.neutralPalette,tone:e=>e.isDark?4:D.isYellow(e.neutralPalette.hue)?90:e.variant===b.VIBRANT?85:87,isBackground:!0,chromaMultiplier(e){if(!e.isDark){if(e.variant===b.NEUTRAL)return 2.5;if(e.variant===b.TONAL_SPOT)return 1.7;if(e.variant===b.EXPRESSIVE)return D.isYellow(e.neutralPalette.hue)?2.7:1.75;if(e.variant===b.VIBRANT)return 1.36}return 1}});return S(super.surfaceDim(),"2025",r)}surfaceBright(){const r=m.fromPalette({name:"surface_bright",palette:e=>e.neutralPalette,tone:e=>e.isDark?18:D.isYellow(e.neutralPalette.hue)?99:e.variant===b.VIBRANT?97:98,isBackground:!0,chromaMultiplier(e){if(e.isDark){if(e.variant===b.NEUTRAL)return 2.5;if(e.variant===b.TONAL_SPOT)return 1.7;if(e.variant===b.EXPRESSIVE)return D.isYellow(e.neutralPalette.hue)?2.7:1.75;if(e.variant===b.VIBRANT)return 1.36}return 1}});return S(super.surfaceBright(),"2025",r)}surfaceContainerLowest(){const r=m.fromPalette({name:"surface_container_lowest",palette:e=>e.neutralPalette,tone:e=>e.isDark?0:100,isBackground:!0});return S(super.surfaceContainerLowest(),"2025",r)}surfaceContainerLow(){const r=m.fromPalette({name:"surface_container_low",palette:e=>e.neutralPalette,tone:e=>e.platform==="phone"?e.isDark?6:D.isYellow(e.neutralPalette.hue)?98:e.variant===b.VIBRANT?95:96:15,isBackground:!0,chromaMultiplier(e){if(e.platform==="phone"){if(e.variant===b.NEUTRAL)return 1.3;if(e.variant===b.TONAL_SPOT)return 1.25;if(e.variant===b.EXPRESSIVE)return D.isYellow(e.neutralPalette.hue)?1.3:1.15;if(e.variant===b.VIBRANT)return 1.08}return 1}});return S(super.surfaceContainerLow(),"2025",r)}surfaceContainer(){const r=m.fromPalette({name:"surface_container",palette:e=>e.neutralPalette,tone:e=>e.platform==="phone"?e.isDark?9:D.isYellow(e.neutralPalette.hue)?96:e.variant===b.VIBRANT?92:94:20,isBackground:!0,chromaMultiplier(e){if(e.platform==="phone"){if(e.variant===b.NEUTRAL)return 1.6;if(e.variant===b.TONAL_SPOT)return 1.4;if(e.variant===b.EXPRESSIVE)return D.isYellow(e.neutralPalette.hue)?1.6:1.3;if(e.variant===b.VIBRANT)return 1.15}return 1}});return S(super.surfaceContainer(),"2025",r)}surfaceContainerHigh(){const r=m.fromPalette({name:"surface_container_high",palette:e=>e.neutralPalette,tone:e=>e.platform==="phone"?e.isDark?12:D.isYellow(e.neutralPalette.hue)?94:e.variant===b.VIBRANT?90:92:25,isBackground:!0,chromaMultiplier(e){if(e.platform==="phone"){if(e.variant===b.NEUTRAL)return 1.9;if(e.variant===b.TONAL_SPOT)return 1.5;if(e.variant===b.EXPRESSIVE)return D.isYellow(e.neutralPalette.hue)?1.95:1.45;if(e.variant===b.VIBRANT)return 1.22}return 1}});return S(super.surfaceContainerHigh(),"2025",r)}surfaceContainerHighest(){const r=m.fromPalette({name:"surface_container_highest",palette:e=>e.neutralPalette,tone:e=>e.isDark?15:D.isYellow(e.neutralPalette.hue)?92:e.variant===b.VIBRANT?88:90,isBackground:!0,chromaMultiplier:e=>e.variant===b.NEUTRAL?2.2:e.variant===b.TONAL_SPOT?1.7:e.variant===b.EXPRESSIVE?D.isYellow(e.neutralPalette.hue)?2.3:1.6:e.variant===b.VIBRANT?1.29:1});return S(super.surfaceContainerHighest(),"2025",r)}onSurface(){const r=m.fromPalette({name:"on_surface",palette:e=>e.neutralPalette,tone:e=>e.variant===b.VIBRANT?x(e.neutralPalette,0,100,1.1):m.getInitialToneFromBackground(t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh())(e),chromaMultiplier(e){if(e.platform==="phone"){if(e.variant===b.NEUTRAL)return 2.2;if(e.variant===b.TONAL_SPOT)return 1.7;if(e.variant===b.EXPRESSIVE)return D.isYellow(e.neutralPalette.hue)?e.isDark?3:2.3:1.6}return 1},background:e=>e.platform==="phone"?this.highestSurface(e):this.surfaceContainerHigh(),contrastCurve:e=>e.isDark?k(11):k(9)});return S(super.onSurface(),"2025",r)}onSurfaceVariant(){const r=m.fromPalette({name:"on_surface_variant",palette:e=>e.neutralPalette,chromaMultiplier(e){if(e.platform==="phone"){if(e.variant===b.NEUTRAL)return 2.2;if(e.variant===b.TONAL_SPOT)return 1.7;if(e.variant===b.EXPRESSIVE)return D.isYellow(e.neutralPalette.hue)?e.isDark?3:2.3:1.6}return 1},background:e=>e.platform==="phone"?this.highestSurface(e):this.surfaceContainerHigh(),contrastCurve:e=>e.platform==="phone"?e.isDark?k(6):k(4.5):k(7)});return S(super.onSurfaceVariant(),"2025",r)}outline(){const r=m.fromPalette({name:"outline",palette:e=>e.neutralPalette,chromaMultiplier(e){if(e.platform==="phone"){if(e.variant===b.NEUTRAL)return 2.2;if(e.variant===b.TONAL_SPOT)return 1.7;if(e.variant===b.EXPRESSIVE)return D.isYellow(e.neutralPalette.hue)?e.isDark?3:2.3:1.6}return 1},background:e=>e.platform==="phone"?this.highestSurface(e):this.surfaceContainerHigh(),contrastCurve:e=>e.platform==="phone"?k(3):k(4.5)});return S(super.outline(),"2025",r)}outlineVariant(){const r=m.fromPalette({name:"outline_variant",palette:e=>e.neutralPalette,chromaMultiplier(e){if(e.platform==="phone"){if(e.variant===b.NEUTRAL)return 2.2;if(e.variant===b.TONAL_SPOT)return 1.7;if(e.variant===b.EXPRESSIVE)return D.isYellow(e.neutralPalette.hue)?e.isDark?3:2.3:1.6}return 1},background:e=>e.platform==="phone"?this.highestSurface(e):this.surfaceContainerHigh(),contrastCurve:e=>e.platform==="phone"?k(1.5):k(3)});return S(super.outlineVariant(),"2025",r)}inverseSurface(){const r=m.fromPalette({name:"inverse_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?98:4,isBackground:!0});return S(super.inverseSurface(),"2025",r)}inverseOnSurface(){const r=m.fromPalette({name:"inverse_on_surface",palette:e=>e.neutralPalette,background:e=>this.inverseSurface(),contrastCurve:e=>k(7)});return S(super.inverseOnSurface(),"2025",r)}primary(){const r=m.fromPalette({name:"primary",palette:e=>e.primaryPalette,tone:e=>e.variant===b.NEUTRAL?e.platform==="phone"?e.isDark?80:40:90:e.variant===b.TONAL_SPOT?e.platform==="phone"?e.isDark?80:x(e.primaryPalette):x(e.primaryPalette,0,90):e.variant===b.EXPRESSIVE?x(e.primaryPalette,0,D.isYellow(e.primaryPalette.hue)?25:D.isCyan(e.primaryPalette.hue)?88:98):x(e.primaryPalette,0,D.isCyan(e.primaryPalette.hue)?88:98),isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):this.surfaceContainerHigh(),contrastCurve:e=>e.platform==="phone"?k(4.5):k(7),toneDeltaPair:e=>e.platform==="phone"?new B(this.primaryContainer(),this.primary(),5,"relative_lighter",!0,"farther"):void 0});return S(super.primary(),"2025",r)}primaryDim(){return m.fromPalette({name:"primary_dim",palette:r=>r.primaryPalette,tone:r=>r.variant===b.NEUTRAL?85:r.variant===b.TONAL_SPOT?x(r.primaryPalette,0,90):x(r.primaryPalette),isBackground:!0,background:r=>this.surfaceContainerHigh(),contrastCurve:r=>k(4.5),toneDeltaPair:r=>new B(this.primaryDim(),this.primary(),5,"darker",!0,"farther")})}onPrimary(){const r=m.fromPalette({name:"on_primary",palette:e=>e.primaryPalette,background:e=>e.platform==="phone"?this.primary():this.primaryDim(),contrastCurve:e=>e.platform==="phone"?k(6):k(7)});return S(super.onPrimary(),"2025",r)}primaryContainer(){const r=m.fromPalette({name:"primary_container",palette:e=>e.primaryPalette,tone:e=>e.platform==="watch"?30:e.variant===b.NEUTRAL?e.isDark?30:90:e.variant===b.TONAL_SPOT?e.isDark?Q(e.primaryPalette,35,93):x(e.primaryPalette,0,90):e.variant===b.EXPRESSIVE?e.isDark?x(e.primaryPalette,30,93):x(e.primaryPalette,78,D.isCyan(e.primaryPalette.hue)?88:90):e.isDark?Q(e.primaryPalette,66,93):x(e.primaryPalette,66,D.isCyan(e.primaryPalette.hue)?88:93),isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):void 0,toneDeltaPair:e=>e.platform==="phone"?void 0:new B(this.primaryContainer(),this.primaryDim(),10,"darker",!0,"farther"),contrastCurve:e=>e.platform==="phone"&&e.contrastLevel>0?k(1.5):void 0});return S(super.primaryContainer(),"2025",r)}onPrimaryContainer(){const r=m.fromPalette({name:"on_primary_container",palette:e=>e.primaryPalette,background:e=>this.primaryContainer(),contrastCurve:e=>e.platform==="phone"?k(6):k(7)});return S(super.onPrimaryContainer(),"2025",r)}primaryFixed(){const r=m.fromPalette({name:"primary_fixed",palette:e=>e.primaryPalette,tone:e=>{let t=Object.assign({},e,{isDark:!1,contrastLevel:0});return this.primaryContainer().getTone(t)},isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):void 0,contrastCurve:e=>e.platform==="phone"&&e.contrastLevel>0?k(1.5):void 0});return S(super.primaryFixed(),"2025",r)}primaryFixedDim(){const r=m.fromPalette({name:"primary_fixed_dim",palette:e=>e.primaryPalette,tone:e=>this.primaryFixed().getTone(e),isBackground:!0,toneDeltaPair:e=>new B(this.primaryFixedDim(),this.primaryFixed(),5,"darker",!0,"exact")});return S(super.primaryFixedDim(),"2025",r)}onPrimaryFixed(){const r=m.fromPalette({name:"on_primary_fixed",palette:e=>e.primaryPalette,background:e=>this.primaryFixedDim(),contrastCurve:e=>k(7)});return S(super.onPrimaryFixed(),"2025",r)}onPrimaryFixedVariant(){const r=m.fromPalette({name:"on_primary_fixed_variant",palette:e=>e.primaryPalette,background:e=>this.primaryFixedDim(),contrastCurve:e=>k(4.5)});return S(super.onPrimaryFixedVariant(),"2025",r)}inversePrimary(){const r=m.fromPalette({name:"inverse_primary",palette:e=>e.primaryPalette,tone:e=>x(e.primaryPalette),background:e=>this.inverseSurface(),contrastCurve:e=>e.platform==="phone"?k(6):k(7)});return S(super.inversePrimary(),"2025",r)}secondary(){const r=m.fromPalette({name:"secondary",palette:e=>e.secondaryPalette,tone:e=>e.platform==="watch"?e.variant===b.NEUTRAL?90:x(e.secondaryPalette,0,90):e.variant===b.NEUTRAL?e.isDark?Q(e.secondaryPalette,0,98):x(e.secondaryPalette):e.variant===b.VIBRANT?x(e.secondaryPalette,0,e.isDark?90:98):e.isDark?80:x(e.secondaryPalette),isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):this.surfaceContainerHigh(),contrastCurve:e=>e.platform==="phone"?k(4.5):k(7),toneDeltaPair:e=>e.platform==="phone"?new B(this.secondaryContainer(),this.secondary(),5,"relative_lighter",!0,"farther"):void 0});return S(super.secondary(),"2025",r)}secondaryDim(){return m.fromPalette({name:"secondary_dim",palette:r=>r.secondaryPalette,tone:r=>r.variant===b.NEUTRAL?85:x(r.secondaryPalette,0,90),isBackground:!0,background:r=>this.surfaceContainerHigh(),contrastCurve:r=>k(4.5),toneDeltaPair:r=>new B(this.secondaryDim(),this.secondary(),5,"darker",!0,"farther")})}onSecondary(){const r=m.fromPalette({name:"on_secondary",palette:e=>e.secondaryPalette,background:e=>e.platform==="phone"?this.secondary():this.secondaryDim(),contrastCurve:e=>e.platform==="phone"?k(6):k(7)});return S(super.onSecondary(),"2025",r)}secondaryContainer(){const r=m.fromPalette({name:"secondary_container",palette:e=>e.secondaryPalette,tone:e=>e.platform==="watch"?30:e.variant===b.VIBRANT?e.isDark?Q(e.secondaryPalette,30,40):x(e.secondaryPalette,84,90):e.variant===b.EXPRESSIVE?e.isDark?15:x(e.secondaryPalette,90,95):e.isDark?25:90,isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):void 0,toneDeltaPair:e=>e.platform==="watch"?new B(this.secondaryContainer(),this.secondaryDim(),10,"darker",!0,"farther"):void 0,contrastCurve:e=>e.platform==="phone"&&e.contrastLevel>0?k(1.5):void 0});return S(super.secondaryContainer(),"2025",r)}onSecondaryContainer(){const r=m.fromPalette({name:"on_secondary_container",palette:e=>e.secondaryPalette,background:e=>this.secondaryContainer(),contrastCurve:e=>e.platform==="phone"?k(6):k(7)});return S(super.onSecondaryContainer(),"2025",r)}secondaryFixed(){const r=m.fromPalette({name:"secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>{let t=Object.assign({},e,{isDark:!1,contrastLevel:0});return this.secondaryContainer().getTone(t)},isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):void 0,contrastCurve:e=>e.platform==="phone"&&e.contrastLevel>0?k(1.5):void 0});return S(super.secondaryFixed(),"2025",r)}secondaryFixedDim(){const r=m.fromPalette({name:"secondary_fixed_dim",palette:e=>e.secondaryPalette,tone:e=>this.secondaryFixed().getTone(e),isBackground:!0,toneDeltaPair:e=>new B(this.secondaryFixedDim(),this.secondaryFixed(),5,"darker",!0,"exact")});return S(super.secondaryFixedDim(),"2025",r)}onSecondaryFixed(){const r=m.fromPalette({name:"on_secondary_fixed",palette:e=>e.secondaryPalette,background:e=>this.secondaryFixedDim(),contrastCurve:e=>k(7)});return S(super.onSecondaryFixed(),"2025",r)}onSecondaryFixedVariant(){const r=m.fromPalette({name:"on_secondary_fixed_variant",palette:e=>e.secondaryPalette,background:e=>this.secondaryFixedDim(),contrastCurve:e=>k(4.5)});return S(super.onSecondaryFixedVariant(),"2025",r)}tertiary(){const r=m.fromPalette({name:"tertiary",palette:e=>e.tertiaryPalette,tone:e=>e.platform==="watch"?e.variant===b.TONAL_SPOT?x(e.tertiaryPalette,0,90):x(e.tertiaryPalette):e.variant===b.EXPRESSIVE||e.variant===b.VIBRANT?x(e.tertiaryPalette,0,D.isCyan(e.tertiaryPalette.hue)?88:e.isDark?98:100):e.isDark?x(e.tertiaryPalette,0,98):x(e.tertiaryPalette),isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):this.surfaceContainerHigh(),contrastCurve:e=>e.platform==="phone"?k(4.5):k(7),toneDeltaPair:e=>e.platform==="phone"?new B(this.tertiaryContainer(),this.tertiary(),5,"relative_lighter",!0,"farther"):void 0});return S(super.tertiary(),"2025",r)}tertiaryDim(){return m.fromPalette({name:"tertiary_dim",palette:r=>r.tertiaryPalette,tone:r=>r.variant===b.TONAL_SPOT?x(r.tertiaryPalette,0,90):x(r.tertiaryPalette),isBackground:!0,background:r=>this.surfaceContainerHigh(),contrastCurve:r=>k(4.5),toneDeltaPair:r=>new B(this.tertiaryDim(),this.tertiary(),5,"darker",!0,"farther")})}onTertiary(){const r=m.fromPalette({name:"on_tertiary",palette:e=>e.tertiaryPalette,background:e=>e.platform==="phone"?this.tertiary():this.tertiaryDim(),contrastCurve:e=>e.platform==="phone"?k(6):k(7)});return S(super.onTertiary(),"2025",r)}tertiaryContainer(){const r=m.fromPalette({name:"tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>e.platform==="watch"?e.variant===b.TONAL_SPOT?x(e.tertiaryPalette,0,90):x(e.tertiaryPalette):e.variant===b.NEUTRAL?e.isDark?x(e.tertiaryPalette,0,93):x(e.tertiaryPalette,0,96):e.variant===b.TONAL_SPOT?x(e.tertiaryPalette,0,e.isDark?93:100):e.variant===b.EXPRESSIVE?x(e.tertiaryPalette,75,D.isCyan(e.tertiaryPalette.hue)?88:e.isDark?93:100):e.isDark?x(e.tertiaryPalette,0,93):x(e.tertiaryPalette,72,100),isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):void 0,toneDeltaPair:e=>e.platform==="watch"?new B(this.tertiaryContainer(),this.tertiaryDim(),10,"darker",!0,"farther"):void 0,contrastCurve:e=>e.platform==="phone"&&e.contrastLevel>0?k(1.5):void 0});return S(super.tertiaryContainer(),"2025",r)}onTertiaryContainer(){const r=m.fromPalette({name:"on_tertiary_container",palette:e=>e.tertiaryPalette,background:e=>this.tertiaryContainer(),contrastCurve:e=>e.platform==="phone"?k(6):k(7)});return S(super.onTertiaryContainer(),"2025",r)}tertiaryFixed(){const r=m.fromPalette({name:"tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>{let t=Object.assign({},e,{isDark:!1,contrastLevel:0});return this.tertiaryContainer().getTone(t)},isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):void 0,contrastCurve:e=>e.platform==="phone"&&e.contrastLevel>0?k(1.5):void 0});return S(super.tertiaryFixed(),"2025",r)}tertiaryFixedDim(){const r=m.fromPalette({name:"tertiary_fixed_dim",palette:e=>e.tertiaryPalette,tone:e=>this.tertiaryFixed().getTone(e),isBackground:!0,toneDeltaPair:e=>new B(this.tertiaryFixedDim(),this.tertiaryFixed(),5,"darker",!0,"exact")});return S(super.tertiaryFixedDim(),"2025",r)}onTertiaryFixed(){const r=m.fromPalette({name:"on_tertiary_fixed",palette:e=>e.tertiaryPalette,background:e=>this.tertiaryFixedDim(),contrastCurve:e=>k(7)});return S(super.onTertiaryFixed(),"2025",r)}onTertiaryFixedVariant(){const r=m.fromPalette({name:"on_tertiary_fixed_variant",palette:e=>e.tertiaryPalette,background:e=>this.tertiaryFixedDim(),contrastCurve:e=>k(4.5)});return S(super.onTertiaryFixedVariant(),"2025",r)}error(){const r=m.fromPalette({name:"error",palette:e=>e.errorPalette,tone:e=>e.platform==="phone"?e.isDark?Q(e.errorPalette,0,98):x(e.errorPalette):Q(e.errorPalette),isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):this.surfaceContainerHigh(),contrastCurve:e=>e.platform==="phone"?k(4.5):k(7),toneDeltaPair:e=>e.platform==="phone"?new B(this.errorContainer(),this.error(),5,"relative_lighter",!0,"farther"):void 0});return S(super.error(),"2025",r)}errorDim(){return m.fromPalette({name:"error_dim",palette:r=>r.errorPalette,tone:r=>Q(r.errorPalette),isBackground:!0,background:r=>this.surfaceContainerHigh(),contrastCurve:r=>k(4.5),toneDeltaPair:r=>new B(this.errorDim(),this.error(),5,"darker",!0,"farther")})}onError(){const r=m.fromPalette({name:"on_error",palette:e=>e.errorPalette,background:e=>e.platform==="phone"?this.error():this.errorDim(),contrastCurve:e=>e.platform==="phone"?k(6):k(7)});return S(super.onError(),"2025",r)}errorContainer(){const r=m.fromPalette({name:"error_container",palette:e=>e.errorPalette,tone:e=>e.platform==="watch"?30:e.isDark?Q(e.errorPalette,30,93):x(e.errorPalette,0,90),isBackground:!0,background:e=>e.platform==="phone"?this.highestSurface(e):void 0,toneDeltaPair:e=>e.platform==="watch"?new B(this.errorContainer(),this.errorDim(),10,"darker",!0,"farther"):void 0,contrastCurve:e=>e.platform==="phone"&&e.contrastLevel>0?k(1.5):void 0});return S(super.errorContainer(),"2025",r)}onErrorContainer(){const r=m.fromPalette({name:"on_error_container",palette:e=>e.errorPalette,background:e=>this.errorContainer(),contrastCurve:e=>e.platform==="phone"?k(4.5):k(7)});return S(super.onErrorContainer(),"2025",r)}surfaceVariant(){const r=Object.assign(this.surfaceContainerHighest().clone(),{name:"surface_variant"});return S(super.surfaceVariant(),"2025",r)}surfaceTint(){const r=Object.assign(this.primary().clone(),{name:"surface_tint"});return S(super.surfaceTint(),"2025",r)}background(){const r=Object.assign(this.surface().clone(),{name:"background"});return S(super.background(),"2025",r)}onBackground(){const r=Object.assign(this.onSurface().clone(),{name:"on_background"});return S(super.onBackground(),"2025",r)}},l.primaryPaletteKeyColor=l.colorSpec.primaryPaletteKeyColor(),l.secondaryPaletteKeyColor=l.colorSpec.secondaryPaletteKeyColor(),l.tertiaryPaletteKeyColor=l.colorSpec.tertiaryPaletteKeyColor(),l.neutralPaletteKeyColor=l.colorSpec.neutralPaletteKeyColor(),l.neutralVariantPaletteKeyColor=l.colorSpec.neutralVariantPaletteKeyColor(),l.background=l.colorSpec.background(),l.onBackground=l.colorSpec.onBackground(),l.surface=l.colorSpec.surface(),l.surfaceDim=l.colorSpec.surfaceDim(),l.surfaceBright=l.colorSpec.surfaceBright(),l.surfaceContainerLowest=l.colorSpec.surfaceContainerLowest(),l.surfaceContainerLow=l.colorSpec.surfaceContainerLow(),l.surfaceContainer=l.colorSpec.surfaceContainer(),l.surfaceContainerHigh=l.colorSpec.surfaceContainerHigh(),l.surfaceContainerHighest=l.colorSpec.surfaceContainerHighest(),l.onSurface=l.colorSpec.onSurface(),l.surfaceVariant=l.colorSpec.surfaceVariant(),l.onSurfaceVariant=l.colorSpec.onSurfaceVariant(),l.inverseSurface=l.colorSpec.inverseSurface(),l.inverseOnSurface=l.colorSpec.inverseOnSurface(),l.outline=l.colorSpec.outline(),l.outlineVariant=l.colorSpec.outlineVariant(),l.shadow=l.colorSpec.shadow(),l.scrim=l.colorSpec.scrim(),l.surfaceTint=l.colorSpec.surfaceTint(),l.primary=l.colorSpec.primary(),l.onPrimary=l.colorSpec.onPrimary(),l.primaryContainer=l.colorSpec.primaryContainer(),l.onPrimaryContainer=l.colorSpec.onPrimaryContainer(),l.inversePrimary=l.colorSpec.inversePrimary(),l.secondary=l.colorSpec.secondary(),l.onSecondary=l.colorSpec.onSecondary(),l.secondaryContainer=l.colorSpec.secondaryContainer(),l.onSecondaryContainer=l.colorSpec.onSecondaryContainer(),l.tertiary=l.colorSpec.tertiary(),l.onTertiary=l.colorSpec.onTertiary(),l.tertiaryContainer=l.colorSpec.tertiaryContainer(),l.onTertiaryContainer=l.colorSpec.onTertiaryContainer(),l.error=l.colorSpec.error(),l.onError=l.colorSpec.onError(),l.errorContainer=l.colorSpec.errorContainer(),l.onErrorContainer=l.colorSpec.onErrorContainer(),l.primaryFixed=l.colorSpec.primaryFixed(),l.primaryFixedDim=l.colorSpec.primaryFixedDim(),l.onPrimaryFixed=l.colorSpec.onPrimaryFixed(),l.onPrimaryFixedVariant=l.colorSpec.onPrimaryFixedVariant(),l.secondaryFixed=l.colorSpec.secondaryFixed(),l.secondaryFixedDim=l.colorSpec.secondaryFixedDim(),l.onSecondaryFixed=l.colorSpec.onSecondaryFixed(),l.onSecondaryFixedVariant=l.colorSpec.onSecondaryFixedVariant(),l.tertiaryFixed=l.colorSpec.tertiaryFixed(),l.tertiaryFixedDim=l.colorSpec.tertiaryFixedDim(),l.onTertiaryFixed=l.colorSpec.onTertiaryFixed(),l.onTertiaryFixedVariant=l.colorSpec.onTertiaryFixedVariant();let bt=Sr()[4],Ae=new l;[...Ae.allColors,Ae.shadow(),Ae.scrim()];let _e=navigator.userAgent,Pt=_e.includes("Firefox"),vr=!(!_e.includes("Chrome")&&_e.includes("Safari")||Pt),Ar=function(r){let e=bt();return r.mount=()=>{this.cancel.listen(t=>{let n=s("animate",{xmlns:"http://www.w3.org/2000/svg",attributeName:"opacity",from:1,to:0,dur:t+"ms",fill:"freeze",calcMode:"spline",keySplines:"0.4 0, 0.2 1"});r.root.querySelector("circle").appendChild(n),n.beginElement()})},s("svg",{xmlns:"http://www.w3.org/2000/svg",children:[s("radialGradient",{id:"gradient-"+e,children:[s("stop",{offset:"0%","stop-color":"currentColor","stop-opacity":"0.12"}),s("stop",{offset:"70%","stop-color":"currentColor","stop-opacity":"0.12"}),s("stop",{offset:"100%","stop-color":"currentColor","stop-opacity":"0"})]}),vr?s("filter",{id:"filter-"+e,children:[s("feTurbulence",{type:"fractalNoise",baseFrequency:"0.6",seed:Math.random()}),s("feDisplacementMap",{in:"SourceGraphic",in2:"turbulence",scale:this.size**2*1e-4,xChannelSelector:"R",yChannelSelector:"B"})]}):"firefox sucks",s("circle",{cx:this.size/2,cy:this.size/2,r:0,fill:`url(#gradient-${e})`,...vr?{filter:`url(#filter-${e})`}:{},children:s("animate",{attributeName:"r",from:0,to:this.size/2,dur:this.speed+"ms",fill:"freeze",calcMode:"spline",keySplines:"0.4 0, 0.2 1"})})]})};Ar.style=z`
	:scope {
		position: absolute;
		left: ${r=>r.x-r.size/2+"px"};
		top: ${r=>r.y-r.size/2+"px"};
		width: ${r=>r.size+"px"};
		height: ${r=>r.size+"px"};
		pointer-events: none;
		overflow: visible;
	}
`;let er=function(r){this.ripples=[];let e=[];return r.mount=()=>{this.create.listen(n=>{let a=r.root.getBoundingClientRect(),i=n.clientX-a.left,o=n.clientY-a.top,h=2.5*Math.hypot(Math.max(i,a.width-i),Math.max(o,a.height-o)),c=Math.max(Math.min(50*Math.log(h),600),200),d=Je(),u=s(Ar,{x:i,y:o,size:h,speed:c,cancel:d});e.push(()=>{d(800),setTimeout(()=>this.ripples=this.ripples.filter(f=>f!==u),800)}),this.ripples=[...this.ripples,u]});let t=()=>{e.map(n=>n()),e=[]};window.addEventListener("pointerup",t),window.addEventListener("dragend",t)},s("div",{children:use(this.ripples)})};er.style=z`
	:scope {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;

		overflow: hidden;
	}

	:global(*):disabled > :scope { opacity: 0; }
`;let rr=()=>s("div",{});rr.style=z`
	:scope {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;

		overflow: hidden;

		background: var(--m3dl-state-color, currentColor);
		opacity: 0;
		transition: opacity var(--m3dl-motion-effects-default);
	}

	:global(*):hover:not(:global(:disabled)) > :scope {
		opacity: 0.08;
	}
`;let kt={xs:"label-large",s:"label-large",m:"title-medium",l:"headline-small",xl:"headline-large"},H=function(r){this.size??="s",this.shape??="round",this.icon??="left",this.disabled??=!1;let e=Je(),t=use(this.size).map(n=>kt[n]);return s("button",{class:use`m3dl-container m3dl-button m3dl-font-${t} variant-${this.variant} size-${this.size} shape-${this.shape} icon-${this.icon}`,disabled:use(this.disabled),"on:click":this["on:click"],"on:pointerdown":e,title:use(this.title),children:[s(er,{create:e}),s(rr,{}),r.children]})};H.style=z`
	:scope {
		position: relative;

		border: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		transition: border-radius var(--m3dl-motion-spatial-fast),
			flex var(--m3dl-motion-spatial-fast),
			color var(--m3dl-motion-effects-default),
			background var(--m3dl-motion-effects-default),
			border-color var(--m3dl-motion-effects-default);

		cursor: pointer;
		user-select: none;

		height: var(--m3dl-shape-full);

		word-spacing: inherit;
		text-align: inherit;
	}
	:scope:disabled {
		cursor: default;
	}

	:scope.variant-elevated {
		background: rgb(var(--m3dl-color-surface-container-low));
		color: rgb(var(--m3dl-color-primary));
		box-shadow: var(--m3dl-elevation-1);
	}
	:scope:has(:global(.m3dl-toggle.selected)).variant-elevated {
		background: rgb(var(--m3dl-color-primary));
		color: rgb(var(--m3dl-color-on-primary));
	}
	:scope:not(:has(:global(.m3dl-toggle:not(.selected)))).variant-filled {
		background: rgb(var(--m3dl-color-primary));
		color: rgb(var(--m3dl-color-on-primary));
	}
	:scope:has(:global(.m3dl-toggle)).variant-filled {
		background: rgb(var(--m3dl-color-surface-container));
		color: rgb(var(--m3dl-color-on-surface-variant));
	}
	:scope.variant-tonal {
		background: rgb(var(--m3dl-color-secondary-container));
		color: rgb(var(--m3dl-color-on-secondary-container));
	}
	:scope:has(:global(.m3dl-toggle.selected)).variant-tonal {
		background: rgb(var(--m3dl-color-secondary));
		color: rgb(var(--m3dl-color-on-secondary));
	}
	:scope.variant-outlined {
		border: var(--m3dl-button-border, 1px) solid rgb(var(--m3dl-color-outline-variant));
		background: transparent;
		color: rgb(var(--m3dl-color-on-surface-variant));
	}
	:scope:has(:global(.m3dl-toggle.selected)).variant-outlined {
		border-color: transparent;
		background: rgb(var(--m3dl-color-inverse-surface));
		color: rgb(var(--m3dl-color-inverse-on-surface));
	}
	:scope.variant-text {
		background: transparent;
		color: rgb(var(--m3dl-color-primary));
	}
	:scope:disabled:disabled:disabled:disabled {
		background: rgb(var(--m3dl-color-on-surface) / 0.1);
		color: rgb(var(--m3dl-color-on-surface) / 0.38);
		box-shadow: var(--m3dl-elevation-0);
	}

	:scope.shape-round {
		border-radius: var(--m3dl-shape-full);
	}

	:scope.shape-square:is(.size-xs, .size-s) {
		border-radius: var(--m3dl-shape-medium);
	}
	:scope.shape-square:is(.size-m) {
		border-radius: var(--m3dl-shape-large);
	}
	:scope.shape-square:is(.size-l, .size-xl) {
		border-radius: var(--m3dl-shape-extra-large);
	}

	:scope:enabled:active:is(.size-xs, .size-s) {
		border-radius: var(--m3dl-shape-small);
	}
	:scope:enabled:active:is(.size-m) {
		border-radius: var(--m3dl-shape-medium);
	}
	:scope:enabled:active:is(.size-l, .size-xl) {
		border-radius: var(--m3dl-shape-large);
	}

	:scope.size-xs {
		--m3dl-shape-full: 2rem;
		padding: 0.75rem;
		gap: 0.25rem;
	}
	:scope.size-s {
		--m3dl-shape-full: 2.5rem;
		padding: 1rem;
		gap: 0.5rem;
	}
	:scope.size-m {
		--m3dl-shape-full: 3.5rem;
		padding: 1.5rem;
		gap: 0.5rem;
	}
	:scope.size-l {
		--m3dl-button-border: 2px;
		--m3dl-shape-full: 6rem;
		padding: 3rem;
		gap: 0.75rem;
	}
	:scope.size-xl {
		--m3dl-button-border: 3px;
		--m3dl-shape-full: 8.5rem;
		padding: 4rem;
		gap: 1rem;
	}
	
	:scope:not(.icon-left).size-xs {
		--m3dl-icon-size: 1.25rem;
	}
	:scope:not(.icon-left):is(.size-s, .size-m) {
		--m3dl-icon-size: 1.5rem;
	}
	:scope:not(.icon-left).size-l {
		--m3dl-icon-size: 2rem;
	}
	:scope:not(.icon-left).size-xl {
		--m3dl-icon-size: 2.5rem;
	}

	:scope.icon-full.size-xs {
		padding: 0.375rem;
	}
	:scope.icon-full.size-s {
		padding: 0.5rem;
	}
	:scope.icon-full.size-m {
		padding: 1rem;
	}
	:scope.icon-full.size-l {
		padding: 2rem;
	}
	:scope.icon-full.size-xl {
		padding: 3rem;
	}

	:scope > :global(svg) {
		width: var(--m3dl-icon-size, 1em);
		height: var(--m3dl-icon-size, 1em);
	}

	:scope > :global(span.m3dl-toggle) {
		display: none;
	}
`;const j=function(){return s("svg",{width:use(this.width).map(r=>r||"1em"),height:use(this.height).map(r=>r||"1em"),viewBox:use`0 0 ${this.icon.width} ${this.icon.height}`,xmlns:"http://www.w3.org/2000/svg",...this.class?{class:this.class}:{},"attr:innerHTML":use(this.icon).map(r=>r.body)})};let Ce=function(r){if(this["on:click"]){let e=Je();return s("button",{class:use`m3dl-container m3dl-card variant-${this.variant}`,"on:pointerdown":e,"on:click":this["on:click"],children:[s(er,{create:e}),s(rr,{}),r.children]})}return s("div",{class:use`m3dl-container m3dl-card variant-${this.variant}`,children:r.children})};Ce.style=z`
	:scope {
		padding: 1rem;

		border: none;
		border-radius: var(--m3dl-shape-medium);
		color: rgb(var(--m3dl-color-on-surface));
	}

	button:scope {
		position: relative;
		font: inherit;
		letter-spacing: inherit;
		word-spacing: inherit;
		line-height: inherit;
		text-align: inherit;
		cursor: pointer;
	}

	:scope.variant-elevated {
		background: rgb(var(--m3dl-color-surface-container-low));
		box-shadow: var(--m3dl-elevation-1);
	}

	:scope.variant-filled {
		background: rgb(var(--m3dl-color-surface-container-highest));
	}

	:scope.variant-outlined {
		background: rgb(var(--m3dl-color-surface));
		border: 1px solid rgb(var(--m3dl-color-outline-variant));
	}
`;const br={width:24,height:24,body:'<path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h14v-6q0-.425.288-.712T20 12t.713.288T21 13v6q0 .825-.587 1.413T19 21zM19 6.4L10.4 15q-.275.275-.7.275T9 15t-.275-.7t.275-.7L17.6 5H15q-.425 0-.712-.288T14 4t.288-.712T15 3h5q.425 0 .713.288T21 4v5q0 .425-.288.713T20 10t-.712-.288T19 9z"/>'},wt={width:24,height:24,body:'<path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>'},Pr={width:24,height:24,body:'<path fill="currentColor" d="m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6z"/>'};let Vr=function(){return s("img",{src:use(this.src)})};Vr.style=z`
	:scope {
		height: 1.25em;
		width: 1.25em;
		vertical-align: -0.25em;
	}
`;let Ct=function(r){return s("a",{href:`https://hackclub.slack.com/app_redirect?channel=${this.id}`,target:"_blank",children:r.children})};const St={width:24,height:24,body:'<path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"/>'};let tr=function(r){return s("div",{"class:grid":use(this.grid),children:r.children})};tr.style=z`
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
`;let ce=function(r){return s("div",{children:s(Ce,{variant:"filled",children:[s("div",{class:"image",children:r.children[0]}),s("div",{class:"body",children:[s("div",{class:"m3dl-font-title-large",children:use(this.title)}),s("div",{class:"expand",children:r.children[1]}),this.target?s("div",{class:"buttons",children:s(H,{variant:"filled",icon:"left","on:click":()=>window.open(`https://isle.a.hackclub.dev/scenes/${this.target}`),children:[s(j,{icon:St}),"Visit!"]})}):null]})]})})};ce.style=z`
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
`;const xt={width:24,height:24,body:'<path fill="currentColor" d="M6 5q-.425 0-.712.288T5 6t.288.713T6 7t.713-.288T7 6t-.288-.712T6 5m4 13l-1.275 3.075q-.15.375-.537.538t-.763.012t-.537-.537t-.013-.763l1.075-2.6q-2.65-.7-4.3-2.85T2 10V6q0-1.65 1.175-2.825T6 2q.55 0 1.05.187t1 .388l4.775 1.95q.325.125.313.463t-.338.462L10 6.5V8l7.85 5H10q-.725 0-1.275-.45T8.05 11.4q-.075-.35-.35-.6t-.65-.25q-.425 0-.713.288t-.287.712q0 .5.3 1.113t.625.962q.55.65 1.338 1.013T10 15h11l.775 3.925q.075.425-.187.75T20.9 20h-.35q-.275 0-.475-.137t-.325-.363L19 18h-5v3q0 .425-.288.713T13 22t-.712-.288T12 21v-3z"/>'},Tt={width:24,height:24,body:'<path fill="currentColor" d="M17.9 20.075q-.2 0-.375-.062T17.2 19.8L14.4 17q-.325-.325-.462-.7t-.138-.75q0-.8.575-1.425t1.475-.625q.7 0 1.1.325t.95.875q.5-.5.913-.85t1.137-.35q.925 0 1.488.638T22 15.574q0 .375-.15.75T21.4 17l-2.8 2.8q-.15.15-.325.213t-.375.062M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v3.825q0 .425-.288.713t-.712.287t-.712-.287T20 9.825V8H4v4h7.5q.425 0 .625.4t-.075.775q-.55.825-.85 1.8T10.9 17q0 .475.063.938t.187.887t-.137.8t-.688.375z"/>'};let Fr=function(){return this.shells=0,s("div",{children:s(ce,{title:"Porple Point",target:98,children:[s("div",{class:"m3dl-porple rich-image",children:[s("div",{class:"wave"}),s("div",{class:"point"}),s("div",{class:"point-items",children:s(H,{variant:"filled",icon:"full",size:"m","on:click":()=>this.shells+=10,children:s(j,{icon:xt})})}),s("div",{class:"donate",children:[s("span",{children:[use(this.shells)," shells"]}),s(H,{variant:"elevated","on:click":()=>alert("Thanks for donating!"),children:[s(j,{icon:Tt})," Donate"]})]})]}),s("div",{children:["Porple Point is the porpliest of all the points on the island. It was mostly destroyed by the ",s("i",{children:"volcano explosion"}),` though, and this little bit is all that's left. Its population is exactly 7 and a half crabs now, so the infrastructure is lacking; the "emergency service" is just yelling really loud and hoping someone helps. The view's pretty good at least.`]})]})})};Fr.style=z`
	.rich-image {
		height: 100%;
		background: linear-gradient(
			rgb(var(--m3dl-color-surface-container-high)) 0%,
			rgb(var(--m3dl-color-surface-container)) 50%,
			rgb(var(--m3dl-color-surface-container-low)) 100%
		);
		color: rgb(var(--m3dl-color-on-surface));

		position: relative;
	}

	.point {
		border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;

		width: 60%;
		height: 50%;

		position: absolute;
		bottom: 10%;
		left: 20%;

		background: rgb(var(--m3dl-color-on-secondary));
	}

	.point-items {
		position: absolute;
		bottom: 50%;
		
		width: 100%;

		display: flex;
		justify-content: center;
	}

	.wave {
		position: absolute;
		bottom: -20%;
		left: -50%;
		height: 50%;
		width: 200%;

		background: rgb(var(--m3dl-color-secondary-container));

		border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
	}

	.donate {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 3%;
	}
`;const Dt={width:24,height:24,body:'<path fill="currentColor" d="m6 10.95l-1 .55q-.35.2-.75.1t-.6-.45l-2-3.5q-.2-.35-.1-.75T2 6.3L7.75 3H9.5q.225 0 .363.138T10 3.5V4q0 .825.588 1.413T12 6t1.413-.587T14 4v-.5q0-.225.138-.363T14.5 3h1.75L22 6.3q.35.2.45.6t-.1.75l-2 3.5q-.2.35-.588.438T19 11.475l-1-.5V20q0 .425-.288.713T17 21H7q-.425 0-.712-.288T6 20z"/>'},Mt={width:24,height:24,body:'<path fill="currentColor" d="M4 21v-2h16v2zm4-4q-1.65 0-2.825-1.175T4 13V3h16q.825 0 1.413.588T22 5v3q0 .825-.587 1.413T20 10h-2v3q0 1.65-1.175 2.825T14 17zm10-9h2V5h-2z"/>'},Lt={width:24,height:24,body:'<path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/>'},It={width:24,height:24,body:'<path fill="currentColor" d="M7 15q1.25 0 2.125-.875T10 12t-.875-2.125T7 9t-2.125.875T4 12t.875 2.125T7 15m0 3q-2.5 0-4.25-1.75T1 12t1.75-4.25T7 6q2.025 0 3.538 1.15T12.65 10h8.375L23 11.975l-3.5 4L17 14l-2 2l-2-2h-.35q-.625 1.8-2.175 2.9T7 18"/>'};let Er=function(){let r=e=>()=>{alert("Go buy a "+e+"!")};return s("div",{children:s(ce,{title:"Mount Kablooey Gift Shop",target:11,children:[s("div",{class:"rich-image m3dl-gift-shop",children:s("div",{class:"shop",children:[s("div",{children:s(H,{variant:"elevated",icon:"full",size:"m","on:click":r("Mug"),children:s(j,{icon:Mt})})}),s("div",{children:s(H,{variant:"elevated",icon:"full",size:"m","on:click":r("T-Shirt"),children:s(j,{icon:Dt})})}),s("div",{class:"weird",children:s(H,{variant:"elevated",icon:"full",size:"m","on:click":r("Postcard"),children:s(j,{icon:Lt})})}),s("div",{class:"weird2",children:s(H,{variant:"elevated",icon:"full",size:"m","on:click":r("Keychain"),children:s(j,{icon:It})})})]})}),s("div",{children:"The official Mount Kablooey Gift Shop is a great place to get your usual bits and bobs like shirts and mugs. Speaking of, why is the branded mug $35?? The whole shop seems to be very expensive... except for the keychain. That's reasonably priced at $2. I guess the visitor center needs to start selling stuff for cheaper; a new revenue source, at last!"})]})})};Er.style=z`
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
`;let Bt="./som.webp",At="./skulk.webp",Vt="./stickerlode-3.webp",Rr=function(){return s("div",{children:[s("div",{class:"m3dl-font-display-small title",children:[s("img",{src:Bt})," Mount Kablooey Summit"]}),s("div",{class:"m3dl-font-title-large",children:s("b",{children:s("i",{children:"enjoy the view..."})})}),s("div",{class:"top",children:[s("div",{class:"content",children:[s("p",{children:["Welcome to the official Mount Kablooey Summit visitor center! We're so high up that you can see almost the entire island, (including all the airplanes failing to land at ",s("b",{children:"http://island"}),"'s airport ",s(Vr,{src:At}),") so we recommend planning your next visits from here with our information and featured exhibits. However, we're still reconstructing after that massive ",s("i",{children:"volcano explosion"}),"; please don't mind the lack of exhibits and artifacts as we recover..."]}),s("p",{children:`Heidi visited us recently and gave us this awesome sticker of her looking out from the summit of Mount Kablooey to give out specifically on 15-09-2025; not sure why that date though, maybe it's a special event? She mentioned a "lode" of stickers, whatever that means.`})]}),s("img",{class:"sticker",src:Vt})]}),s("div",{class:"m3dl-font-headline-medium",children:s("b",{children:"Nearby Stops"})}),s(tr,{grid:!0,children:[s(Er,{}),s(Fr,{}),s("div",{class:"more",children:[s("div",{children:[s("div",{class:"m3dl-font-title-large",children:s("b",{children:"Featured Stops"})}),"There's a lot more to explore on the island! We've curated a seperate exhibition area to showcase all the cool places to visit."]}),s(H,{variant:"filled",size:"m","on:click":()=>Te.navigate(De+"/featured"),children:["View featured ",s(j,{icon:wt})]})]})]}),s("div",{class:"m3dl-font-headline-medium about",children:s("b",{children:"About This Center"})}),s("div",{class:"about-content",children:[s("div",{class:"info",children:["The code for this center is available ",s("a",{href:"https://github.com/r58playz/som-grand-survey",target:"_blank",children:"on GitHub"}),". It's built with the ",s("code",{children:"dreamland.js"})," JavaScript framework, which was rewritten from scratch during Journey v1, Journey v2, and Summer of Making. It's also been prerendered and hydrated client-side with ",s("code",{children:"dreamland.js"}),"'s ",s("b",{children:"built-in SSR support"})," and Vite integrations (developed during Summer of Making). Components from ",s("code",{children:"m3-dreamland"}),", rewritten during Summer of Making to support ",s("code",{children:"dreamland.js"}),"'s rewrite, were used to give this center a very ",s("i",{children:"expressive"})," (possibly even a little ",s("b",{children:"material"}),"-like) look. Assets and fonts from the Summer of Making website were used as well. Each destination's exhibit uses assets from the location."]}),s("div",{class:"cards",children:[s(Ce,{variant:"outlined",children:[s("div",{class:"m3dl-font-title-large",children:"dreamland.js"}),s("div",{class:"expand",children:[s("div",{children:"Utilitarian web framework smaller than preact."}),s("div",{children:["This is the first user-accessible project on Summer of Making! It's also used by ",s("a",{href:"https://mail.hackclub.com",target:"_blank",children:"mail.hackclub.com"}),"'s admin UI."]})]}),s("div",{class:"buttons",children:[s(H,{variant:"tonal",icon:"full","on:click":()=>window.open("https://github.com/MercuryWorkshop/dreamlandjs"),children:s(j,{icon:Pr})}),s(H,{variant:"filled","on:click":()=>window.open("https://summer.hackclub.com/projects/3"),children:[s(j,{icon:br}),"Visit on SoM!"]})]})]}),s(Ce,{variant:"outlined",children:[s("div",{class:"m3dl-font-title-large",children:"m3-dreamland"}),s("div",{class:"expand",children:"A Material 3 (Expressive) component library for dreamland.js."}),s("div",{class:"buttons",children:[s(H,{variant:"tonal",icon:"full","on:click":()=>window.open("https://github.com/r58Playz/m3-dreamland"),children:s(j,{icon:Pr})}),s(H,{variant:"filled","on:click":()=>window.open("https://summer.hackclub.com/projects/8235"),children:[s(j,{icon:br}),"Visit on SoM!"]})]})]})]})]})]})};Rr.style=z`
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
`;let Or=function(){return s("div",{children:s(ce,{title:"http://island",target:19,children:[s("div",{class:"rich-image",children:s("marquee",{direction:"right",scrollamount:10,children:[s("img",{src:"./stops/island/plane.webp"}),s("div",{children:s("span",{class:"pull-up",children:"Terrain! PULL UP!!"})})]})}),s("div",{children:["A small island in the middle of the ocean, home to a small population (currently about 5 people). 500ft",s("sup",{children:"2"})," in size with a tropical climate. Residents are English-speaking and use the Beenz currency and the Internet Time timezone."]})]})})};Or.style=z`
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
`;const Ft={width:24,height:24,body:'<path fill="currentColor" d="m18.9 21l-5.475-5.475l2.1-2.1L21 18.9zM5.1 21L3 18.9L9.9 12l-1.7-1.7l-.7.7l-1.275-1.275v2.05l-.7.7L2.5 9.45l.7-.7h2.05L4 7.5l3.55-3.55q.5-.5 1.075-.725T9.8 3t1.175.225t1.075.725l-2.3 2.3L11 7.5l-.7.7L12 9.9l2.25-2.25q-.1-.275-.162-.575t-.063-.6q0-1.475 1.013-2.488t2.487-1.012q.375 0 .713.075t.687.225L16.45 5.75l1.8 1.8l2.475-2.475q.175.35.238.687t.062.713q0 1.475-1.012 2.488t-2.488 1.012q-.3 0-.6-.05t-.575-.175z"/>'};let qr=function(){return s("div",{children:s(ce,{title:"Exhibits Under Construction",children:[s("div",{class:"construction",children:s(j,{icon:Ft})}),s("div",{children:["We apologize for the lack of exhibits showcasing ",s("i",{children:"Hacklantis Island"}),". We need to send our employees out to collect fresh information after our databases were... erm... ",s("b",{children:"vitrified"}),"... by the explosion. More exhibits will be coming.. eventually..."]})]})})};qr.style=z`
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
`;const Et={width:24,height:24,body:'<path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"/>'},Rt={width:24,height:24,body:'<path fill="currentColor" d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20"/>'};let Ot=["crab-dancing-blocky","crab-excited","crab-yay","dancing-crab1","dancing-crab2","dancing-crab3","dancing-crab4","minecraft-crab","silly-crab"],$r=function(){let r=()=>{this.meta=Ot.map(e=>({path:e,x:Math.random()*100,y:Math.random()*100,hue:Math.random()*360}))};return r(),s("div",{children:s(ce,{title:"Crab Rave",target:16,children:[s("div",{class:"rave",children:[s("div",{children:use(this.meta).mapEach(e=>s("img",{src:`./stops/crab-rave/${e.path}.webp`,style:{"--x":e.x+"%","--y":e.y+"%","--hue":e.hue+"deg"}}))}),s(H,{variant:"tonal",icon:"full","on:click":r,children:s(j,{icon:Rt})})]}),s("div",{children:['The Crab Rave island has daily performances of the "Dance of the Rising Sun", or ',s("b",{children:'"Crab Rave"'}),", by the local ",s("i",{children:"Raving Crabs"}),". Scientists do not know exactly why these crabs perform the ritual; some argue that it's instinct while others believe the crabs are intelligent and perform more extravagantly when they're being observed. In any case, this masterpiece of a performance is a must-watch!"]})]})})};$r.style=z`
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
`;let qt="./som.webp",Nr=function(){return s("div",{children:[s("div",{class:"m3dl-font-display-small title",children:[s("img",{src:qt})," Mount Kablooey Summit"]}),s("div",{class:"m3dl-font-headline-medium",children:s("b",{children:"Featured Stops"})}),s("p",{children:["We've curated a special exhibition area for stops that our lead curator, ",s(Ct,{id:"U07UY5CR7U5",children:"Toshit"}),", finds cool or fun. We urge all our visitors to give these stops a visit! They're guaranteed to be awesome."]}),s(tr,{grid:!1,children:[s(Or,{}),s($r,{}),s(qr,{})]}),s(H,{variant:"filled",size:"m","on:click":()=>Te.navigate(De),children:[s(j,{icon:Et})," Return to lobby"]})]})};Nr.style=z`
	.title img {
		width: 1em;
		height: 1em;
		vertical-align: -0.125em;
	}
`;let De;{let r=new URL("../",import.meta.url).pathname;De=r.slice(1,r.length-1)}let zr=function(r){return r.init=()=>{Te.route()},s("div",{id:"app",class:"m3dl-colon3 m3dl-font-body-large",children:s(ot,{children:s(Be,{path:De,children:[s(Be,{show:s(Rr,{})}),s(Be,{path:"featured",show:s(Nr,{})})]})})})};zr.style=z`
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
`;const $t=r=>s(zr,{});it($t,document.querySelector("#app"),document.head,document.querySelector("[dlssr-d]"));
