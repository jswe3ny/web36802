import{s as K,b as Q,n as U}from"../chunks/scheduler.D8c12eMh.js";import{S as W,i as X,e as f,t as V,s as S,c as m,a as T,k as B,d as h,b as P,g as G,f as b,h as N,j as o,m as F,p as Z}from"../chunks/index.B2zEa4Va.js";import{e as $}from"../chunks/forms.BJo8fEDM.js";function Y(c){return(c==null?void 0:c.length)!==void 0?c:Array.from(c)}function z(c,e,n){const s=c.slice();return s[1]=e[n],s}function ee(c){let e,n="No buy info has been added yet";return{c(){e=f("p"),e.textContent=n,this.h()},l(s){e=m(s,"P",{class:!0,"data-svelte-h":!0}),G(e)!=="svelte-fcybee"&&(e.textContent=n),this.h()},h(){b(e,"class","text-lg text-center")},m(s,v){N(s,e,v)},p:U,d(s){s&&h(e)}}}function te(c){let e,n,s,v='<tr><th>Ticker</th> <th>Shares</th> <th>Value</th> <th class="hidden sm:table-cell">Average P/E</th> <th class="hidden sm:table-cell">Return</th></tr>',C,r,p=Y(c[0].displayData),l=[];for(let a=0;a<p.length;a+=1)l[a]=J(z(c,p,a));return{c(){e=f("div"),n=f("table"),s=f("thead"),s.innerHTML=v,C=S(),r=f("tbody");for(let a=0;a<l.length;a+=1)l[a].c();this.h()},l(a){e=m(a,"DIV",{class:!0});var _=T(e);n=m(_,"TABLE",{class:!0});var t=T(n);s=m(t,"THEAD",{"data-svelte-h":!0}),G(s)!=="svelte-k7h23u"&&(s.innerHTML=v),C=P(t),r=m(t,"TBODY",{});var u=T(r);for(let D=0;D<l.length;D+=1)l[D].l(u);u.forEach(h),t.forEach(h),_.forEach(h),this.h()},h(){b(n,"class","table max-w-2xl mx-auto "),b(e,"class","mx-auto max-h-[400px] overflow-y-scroll max-w-3xl")},m(a,_){N(a,e,_),o(e,n),o(n,s),o(n,C),o(n,r);for(let t=0;t<l.length;t+=1)l[t]&&l[t].m(r,null)},p(a,_){if(_&1){p=Y(a[0].displayData);let t;for(t=0;t<p.length;t+=1){const u=z(a,p,t);l[t]?l[t].p(u,_):(l[t]=J(u),l[t].c(),l[t].m(r,null))}for(;t<l.length;t+=1)l[t].d(1);l.length=p.length}},d(a){a&&h(e),Z(l,a)}}}function J(c){var O,d,E,w;let e,n,s=((O=c[1])==null?void 0:O.ticker)+"",v,C,r,p=((d=c[1])==null?void 0:d.info.numShares)+"",l,a,_,t=((E=c[1])==null?void 0:E.info.totalCost)+"",u,D,x,H=((w=c[1])==null?void 0:w.info.averagePE)+"",L,I,k,A="Test",g;return{c(){e=f("tr"),n=f("th"),v=V(s),C=S(),r=f("td"),l=V(p),a=S(),_=f("td"),u=V(t),D=S(),x=f("td"),L=V(H),I=S(),k=f("td"),k.textContent=A,g=S(),this.h()},l(y){e=m(y,"TR",{class:!0});var i=T(e);n=m(i,"TH",{});var M=T(n);v=B(M,s),M.forEach(h),C=P(i),r=m(i,"TD",{class:!0});var R=T(r);l=B(R,p),R.forEach(h),a=P(i),_=m(i,"TD",{});var j=T(_);u=B(j,t),j.forEach(h),D=P(i),x=m(i,"TD",{class:!0});var q=T(x);L=B(q,H),q.forEach(h),I=P(i),k=m(i,"TD",{class:!0,"data-svelte-h":!0}),G(k)!=="svelte-w6dmkm"&&(k.textContent=A),g=P(i),i.forEach(h),this.h()},h(){b(r,"class","py-5"),b(x,"class","hidden sm:table-cell"),b(k,"class","hidden sm:table-cell"),b(e,"class","hover")},m(y,i){N(y,e,i),o(e,n),o(n,v),o(e,C),o(e,r),o(r,l),o(e,a),o(e,_),o(_,u),o(e,D),o(e,x),o(x,L),o(e,I),o(e,k),o(e,g)},p(y,i){var M,R,j,q;i&1&&s!==(s=((M=y[1])==null?void 0:M.ticker)+"")&&F(v,s),i&1&&p!==(p=((R=y[1])==null?void 0:R.info.numShares)+"")&&F(l,p),i&1&&t!==(t=((j=y[1])==null?void 0:j.info.totalCost)+"")&&F(u,t),i&1&&H!==(H=((q=y[1])==null?void 0:q.info.averagePE)+"")&&F(L,H)},d(y){y&&h(e)}}}function le(c){var O;let e,n=((O=c[0].user)==null?void 0:O.username)+"",s,v,C,r,p,l,a,_="New Buy",t,u,D,x,H='<label class="input input-bordered flex items-center gap-2"><input type="text" class="grow" name="ticker" placeholder="Ticker"/></label> <label class="input input-bordered flex items-center gap-2"><input type="number" class="grow" name="numShares" placeholder="Number of Shares"/></label> <label class="input input-bordered flex items-center gap-2"><input type="date" class="grow" name="buyDate" placeholder="Purchase Date"/></label> <label class="input input-bordered flex items-center gap-2"><input type="number" step=".01" class="grow" name="costPerShare" placeholder="Cost Per Share"/></label> <button class="btn btn-primary">submit</button>',L,I;function k(d,E){return d[0].displayData.length>0?te:ee}let A=k(c),g=A(c);return{c(){e=f("h1"),s=V(n),v=V("'s Dashboard"),C=S(),r=f("div"),g.c(),p=S(),l=f("div"),a=f("button"),a.textContent=_,t=S(),u=f("dialog"),D=f("div"),x=f("form"),x.innerHTML=H,this.h()},l(d){e=m(d,"H1",{class:!0});var E=T(e);s=B(E,n),v=B(E,"'s Dashboard"),E.forEach(h),C=P(d),r=m(d,"DIV",{class:!0});var w=T(r);g.l(w),p=P(w),l=m(w,"DIV",{class:!0});var y=T(l);a=m(y,"BUTTON",{class:!0,onclick:!0,"data-svelte-h":!0}),G(a)!=="svelte-159uxy9"&&(a.textContent=_),t=P(y),u=m(y,"DIALOG",{id:!0,class:!0});var i=T(u);D=m(i,"DIV",{class:!0});var M=T(D);x=m(M,"FORM",{method:!0,class:!0,"data-svelte-h":!0}),G(x)!=="svelte-e3ejfv"&&(x.innerHTML=H),M.forEach(h),i.forEach(h),y.forEach(h),w.forEach(h),this.h()},h(){b(e,"class","text-3xl text-center p-6"),b(a,"class","btn btn-success btn-outline mt-4 "),b(a,"onclick","my_modal_5.showModal()"),b(x,"method","post"),b(x,"class","flex flex-col p-6 gap-3"),b(D,"class","modal-box"),b(u,"id","my_modal_5"),b(u,"class","modal sm:modal-middle"),b(l,"class","max-w-2xl mx-auto"),b(r,"class","mx-4 overflow-x-auto min-h-[80vh]")},m(d,E){N(d,e,E),o(e,s),o(e,v),N(d,C,E),N(d,r,E),g.m(r,null),o(r,p),o(r,l),o(l,a),o(l,t),o(l,u),o(u,D),o(D,x),L||(I=Q($.call(null,x)),L=!0)},p(d,[E]){var w;E&1&&n!==(n=((w=d[0].user)==null?void 0:w.username)+"")&&F(s,n),A===(A=k(d))&&g?g.p(d,E):(g.d(1),g=A(d),g&&(g.c(),g.m(r,p)))},i:U,o:U,d(d){d&&(h(e),h(C),h(r)),g.d(),L=!1,I()}}}function ae(c,e,n){let{data:s}=e;return console.log(s.displayData),c.$$set=v=>{"data"in v&&n(0,s=v.data)},[s]}class re extends W{constructor(e){super(),X(this,e,ae,le,K,{data:0})}}export{re as component};