import{_ as Q}from"./shelf.7c2517db.js";import{a as O,i as v,b as A,o as t,e as l,f as s,u as e,h as k,j as E,k as f,s as S,F as x,r as B,p as j,l as R,m as X,w as Y,q as Z,v as T,t as p,x as U,y as ee}from"./entry.d04aec46.js";import{_ as D}from"./_plugin-vue_export-helper.c27b6911.js";import{u as V}from"./game.ac62bea7.js";const se=""+globalThis.__publicAssetsURL("images/close.svg"),G=""+globalThis.__publicAssetsURL("images/selected.svg"),z=a=>(j("data-v-0aea8ea6"),a=a(),R(),a),te={class:"bookContainer"},le={key:0,class:"checkBox show"},oe=z(()=>s("img",{class:"closeIcon",src:se,style:{width:"24px",height:"24px"}},null,-1)),ae=[oe],ne={key:1,class:"checkBox"},ce=z(()=>s("img",{class:"closeIcon",src:G,style:{width:"24px",height:"24px"}},null,-1)),re=[ce],ie=["innerHTML"],ue=["src"],de=O({__name:"book",props:{data:{},eng:{type:Boolean}},emits:["selectedChange"],setup(a,{emit:u}){const $=a,y=v(!1);function b(){if(!$.data.correct){y.value=!0;return}u("selectedChange",$.data)}const{tObj:m}=A({});return(i,o)=>(t(),l("div",te,[s("div",{class:E({book:!0,selected:i.data.selected,eng:i.eng}),style:f(`--hue:${i.data.hue}`),onClick:o[0]||(o[0]=n=>b(i.data))},[e(y)?(t(),l("div",le,ae)):k("",!0),i.data.selected?(t(),l("div",ne,re)):k("",!0),s("div",{class:"bookName",innerHTML:e(m)("label",i.data)},null,8,ie)],6),o[1]||(S(-1),o[1]=(t(!0),l(x,null,B(new Array(Number((Math.random()*(1-2)+2).toFixed(0))),n=>(t(),l("img",{class:"rotateImg",src:`/images/books/r${Math.floor(Math.random()*4)%10}.svg`,style:f(`width:${Math.random()*(100-60)+60}%; margin-left:${Math.random()*(20- -20)+-20}px`)},null,12,ue))),256)),S(1),o[1])]))}});const _e=D(de,[["__scopeId","data-v-0aea8ea6"]]),ve=a=>(j("data-v-9cdc6d50"),a=a(),R(),a),me=["src"],ge=["src"],pe=["src"],be=["src"],he={key:0,class:"subLevelBg"},fe=["onClick"],ke={class:"bookTitle"},$e=ve(()=>s("img",{class:"closeIcon",src:G,width:"24px"},null,-1)),ye=O({__name:"sublevel",emits:["success","reset"],setup(a,{emit:u}){const{isLastSubLevel:$,makeSubLevelOptions:y,currentLevel:b,nextLevel:m,subLevelNumber:i,currentSubLevelAnswer:o}=V(),n=v(!1),L=v(!1),g=v([]);function d(h){const c=o.value.findIndex(K=>K.labelHK===h.labelHK);o.value[c].selected=!o.value[c].selected}const C=X(()=>o.value.filter(h=>h.selected));function w(){!n.value&&$()?(u("success"),n.value=!0):m()}const{t:I,tObj:q}=A({confirmHK:"確定",confirmEN:"Confirm",bookListHK:"書單",bookListEN:"Book List",level1HK:"第一關",level1EN:"Level 1",level2HK:"第二關",level2EN:"Level 2",level3HK:"第三關",level3EN:"Level 3",nextHK:"下一位夢想家",nextEN:"Next Dreamer"});v(0);const M=v(),H=v(),r=v();function F(){if(!r.value){clearInterval(M.value);return}r.value.scrollLeft+=20,r.value.scrollLeft>=r.value.scrollWidth-r.value.clientWidth-10&&(clearInterval(M.value),H.value=setInterval(J,30))}function J(){if(!r.value){clearInterval(H.value);return}r.value.scrollLeft-=20,r.value.scrollLeft<=0&&clearInterval(H.value)}return Y(b,async()=>{L.value=!1,n.value=!1,u("reset"),y();let h=!1;for(let c=0;c<o.value.length;c++)o.value[c].labelHK||(h=!0,console.log(o.value,o.value[c]));h&&y(),U(()=>{g.value=[0,1,2,3,4,6,7,8,9].map(c=>({slide:Math.floor(Math.random()*4)%10,scale:Math.random()*(1.2-.8)+.8})),L.value=!0,U(()=>{r.value&&(r.value.scrollLeft=0,M.value=setInterval(F,30))})})},{immediate:!0}),Z(()=>{r.value&&setTimeout(()=>{r.value.scrollLeft=0,M.value=setInterval(F,30)},50)}),(h,c)=>{const K=Q,P=_e;return t(),l("div",{class:E({bottomContainer:!0,isSuccess:e(n)})},[T(K,{class:"backgroundShelf",divided:3.5,style:{opacity:"0.8",filter:"blur(5px)"}}),e(L)?(t(),l("div",{key:0,ref_key:"optionsEl",ref:r,class:"booksOptions"},[c[0]||(S(-1),c[0]=(t(),l(x,null,B(3,_=>s("img",{class:"betweenImg",key:1,src:`/images/books/${Math.floor(Math.random()*12)%10}.svg`,style:f(`--scale:${Math.random()*(1.2-.8)+.8}`)},null,12,me)),64)),S(1),c[0]),(t(!0),l(x,null,B(e(o),(_,N)=>(t(),l(x,{key:_.labelHK},[T(P,{data:_,onSelectedChange:d,eng:!0},null,8,["data"]),s("img",{class:"betweenImg",src:`/images/books/${e(g)[N].slide}.svg`,style:f(`--scale:${e(g)[N].scale}`)},null,12,ge),s("img",{class:"betweenImg",src:`/images/books/${e(g)[N+1].slide}.svg`,style:f(`--scale:${e(g)[N+1].scale}`)},null,12,pe)],64))),128)),c[1]||(S(-1),c[1]=(t(),l(x,null,B(3,_=>s("img",{key:1,class:"betweenImg",src:`/images/books/${Math.floor(Math.random()*12)%10}.svg`,style:f(`--scale:${Math.random()*(1.2-.8)+.8}`)},null,12,be)),64)),S(1),c[1])],512)):k("",!0),s("div",{class:E({selectedContainer:!0,isSuccess:e(n)})},[e(n)?k("",!0):(t(),l("div",he,p(e(i)===0?e(I)("level1"):e(i)<2?e(I)("level2"):e(I)("level3")),1)),(t(!0),l(x,null,B(e(C),_=>(t(),l("div",{class:"selectedBook",key:_.label,style:f(`--hue:${_.hue}`),onClick:N=>d(_)},[s("div",ke,p(e(q)("name",_)),1),$e],12,fe))),128))],2),e(C).length===3||e(n)?(t(),l("div",{key:1,class:"submitBtn",onClick:w},p(e(b)==="Hailey-2"&&e(n)?e(I)("bookList"):e(n)?e(I)("next"):e(I)("confirm")),1)):k("",!0)],2)}}});const Le=D(ye,[["__scopeId","data-v-9cdc6d50"]]),Ie=""+globalThis.__publicAssetsURL("images/shelf_bg1.png"),xe=""+globalThis.__publicAssetsURL("images/shelf_bg2.png"),W=a=>(j("data-v-f7810bbb"),a=a(),R(),a),Se={class:"pageContainer"},we={class:"shelfBg"},Ne=W(()=>s("img",{src:Ie},null,-1)),Be=W(()=>s("img",{src:xe},null,-1)),Ce={class:"logo"},Me=["src"],Ee={key:0,class:"characterDesc"},He={class:"big"},Ke=["src"],Te={key:0,class:"successDesc"},Oe=O({__name:"game",setup(a){const{levelObject:u,makeSubLevelOptions:$,subLevelNumber:y,previousLevel:b}=V(),m=v(!1);function i(g){m.value=g}const{t:o,tObj:n,currentLang:L}=A({backHK:"返回",backEN:"Back"});return(g,d)=>{const C=Le;return t(),l("div",Se,[s("div",we,[Ne,Be,s("div",{class:"previousLevelBtn",onClick:d[0]||(d[0]=(...w)=>e(b)&&e(b)(...w))},p(e(o)("back")),1)]),s("div",Ce,[s("img",{src:e(L)==="EN"?"/images/logo_purpleEN.svg":"/images/logo_purple.svg",alt:"logo"},null,8,Me),e(m)?k("",!0):(t(),l("span",Ee,[s("span",He,p(e(n)("name",e(u)))+p(e(L)==="EN"?"'s":""),1),ee(p(e(n)("description",e(u))),1)]))]),s("div",{class:E({character:!0,isSuccess:e(m)})},[s("img",{src:e(u).img,alt:"character"},null,8,Ke),e(m)?(t(),l("div",Te,p(e(n)("success",e(u))),1)):k("",!0)],2),T(C,{answers:e($)(),onSuccess:d[1]||(d[1]=w=>i(!0)),onReset:d[2]||(d[2]=w=>i(!1))},null,8,["answers"])])}}});const Fe=D(Oe,[["__scopeId","data-v-f7810bbb"]]);export{Fe as default};
