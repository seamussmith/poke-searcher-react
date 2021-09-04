(this["webpackJsonppoke-searcher-react"]=this["webpackJsonppoke-searcher-react"]||[]).push([[0],{24:function(e,n,t){},36:function(e,n,t){},37:function(e,n,t){},39:function(e,n,t){},46:function(e,n,t){},47:function(e,n,t){},49:function(e,n,t){},50:function(e,n,t){},51:function(e,n,t){},52:function(e,n,t){},53:function(e,n,t){"use strict";t.r(n);var r=t(7),a=t.n(r),c=t(11),i=t(1),s=t.n(i),o=t(25),l=t.n(o),d=(t(36),t(6)),u=(t(37),t(0));var b=function(e){var n=Object(i.useState)(""),t=Object(d.a)(n,2),r=t[0],a=t[1];return Object(u.jsxs)("div",{className:"search-box",children:[Object(u.jsx)("h1",{className:"search-box__title",children:"PokeSearcher!"}),Object(u.jsx)("input",{type:"text",className:"search-box__input",placeholder:"Search for a Pokemon!",spellCheck:!1,value:r,onChange:function(n){e.keyUp(n.currentTarget.value),a(n.currentTarget.value)}})]})};function h(e){return e.charAt(0).toUpperCase()+e.slice(1)}function j(e){var n;if("ho-oh"===e)return Object(u.jsx)(u.Fragment,{children:h(e)});var t=null;return(n=e.split("-").map((function(e){return h(e)})))[n.length-1].match(/M$|Male$/)?(delete n[n.length-1],t=Object(u.jsx)("i",{className:"fas fa-mars --force-inheritence"})):n[n.length-1].match(/F$|Female$/)&&(delete n[n.length-1],t=Object(u.jsx)("i",{className:"fas fa-venus --force-inheritence"})),Object(u.jsxs)(u.Fragment,{children:[n.join(" ")," ",t]})}t(39),t(24);var p=t(18);function x(e){var n;return Object(u.jsx)("span",{className:"search-result__type ".concat(null!==(n=e.type)&&void 0!==n?n:"search-result__type--none"),children:Object(u.jsx)("span",{children:e.children})})}var f=function(e){var n,t,r,a,c=e.pokemon;return Object(u.jsxs)(p.b,{to:"/".concat(e.pokemon.id,"/").concat(e.pokemon.name,"/"),className:"".concat(e.disabled?"search-result--disabled":""," search-result"),style:{backgroundImage:"url(".concat(e.pokemon.sprites.front_default,")")},children:[Object(u.jsx)("div",{className:"search-result__img-container",children:Object(u.jsx)("img",{className:"search-result__image nofilter",src:c.sprites.front_default,alt:"".concat(c.name," sprite")})}),Object(u.jsxs)("div",{className:"search-result__info-container",children:[Object(u.jsx)("div",{className:"search-result__name-container",children:Object(u.jsx)("h2",{className:"search-result__name ".concat(c.types[0].type.name),children:j(c.name)})}),Object(u.jsxs)("p",{className:"search-result__type-container",children:[Object(u.jsxs)(x,{type:c.types[0].type.name,children:[h(c.types[0].type.name)," "]},c.types[0].type.name),Object(u.jsxs)(x,{type:null===(n=c.types[1])||void 0===n?void 0:n.type.name,children:[h(null!==(r=null===(a=c.types[1])||void 0===a?void 0:a.type.name)&&void 0!==r?r:"???")," "]},null===(t=c.types[1])||void 0===t?void 0:t.type.name)]})]})]})},m=t(26),O=t.n(m),v=(t(46),t(47),"Click to copy!");var g,y,w,k,N,_,P,S,A,C,T,I,E,z,F,D,$,L,M,G,U,B,R,H,J,V,W,X,q,K,Q,Y,Z,ee,ne,te,re,ae,ce,ie,se,oe,le=function(e){var n=Object(i.useState)(v),t=Object(d.a)(n,2),r=t[0],a=t[1],c=Object(i.useRef)(-1);return Object(u.jsx)("span",{className:"copy-clicker tooltip","data-hover-txt":r,onClick:function(){window.clearTimeout(c.current),a("Copied!"),O()(e.copyTxt),c.current=window.setTimeout((function(){a(v)}),500)},children:e.copyTxt})},de=s.a.createContext({}),ue=t(2),be=t(3),he=be.b.div(g||(g=Object(ue.a)(["\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 5px;\n    margin: 5px;\n"]))),je=be.b.div(y||(y=Object(ue.a)(["\n    text-align: center;\n    display: grid;\n    grid-template-rows: 1fr 1fr;\n    width: 100%;\n    height: 10em;\n    background-color: var(--layer-3);\n    border-radius: 10px;\n    box-shadow: 2px 2px 0 var(--shadow-color);\n"]))),pe=be.b.div(w||(w=Object(ue.a)(["\n    text-align: left;\n    background-color: var(--layer-1);\n    border-radius: 10px 10px 0 0;\n    display: flex;\n    justify-content: left;\n    align-items: center;\n"]))),xe=be.b.div(k||(k=Object(ue.a)(["\n    padding: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 5px;\n"]))),fe=be.b.div(N||(N=Object(ue.a)(["\n    text-align: center;\n    display: grid;\n    grid-template-columns: repeat(8, 1fr); \n\n    gap: 10px;\n\n    --pokemon-color: none;\n    width: 60vw;\n    transform-origin: top;\n    border-color: var(--pokemon-color);\n    background-color: var(--layer-1);\n    border-radius: var(--division-radius);\n    box-shadow: 1px 2px 2px 1px var(--shadow-color);\n    padding: 10px;\n    margin: 1% 0;\n    @media (max-width: 1280px) {\n        width: 80vw;\n    }\n    @media (max-width: 1024px) {\n        width: 100vw;\n    }\n"]))),me=be.b.div(_||(_=Object(ue.a)(["\n    grid-column: span "," / auto;\n    grid-row: span "," / auto;\n    padding: 5px;\n    background-color: var(--layer-2);\n    border-radius: var(--division-radius);\n    box-shadow: 1px 2px 0px 0px var(--shadow-color);\n    @media (max-width: 800px) {\n        grid-column: span 8 / auto;\n        grid-row: span 8 / auto;\n    }\n"])),(function(e){var n=e.width;return null!==n&&void 0!==n?n:8}),(function(e){var n=e.height;return null!==n&&void 0!==n?n:1})),Oe=Object(be.b)(me)(P||(P=Object(ue.a)(["\n    display: flex;\n    justify-content: space-evenly;\n    padding: 10px;\n    flex-direction: column;\n"]))),ve=be.b.div(S||(S=Object(ue.a)(["\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    flex-wrap: wrap;\n    padding: 10px;\n    * {\n        width: 100%;\n    }\n"]))),ge=be.b.p(A||(A=Object(ue.a)(["\n    --flair-color: gray;\n    --flair-shadow: darkgray;\n    color: var(--text-color);\n    text-shadow: 1px 1px black;\n    background-color: var(--flair-color);\n    box-shadow: 2px 2px var(--flair-shadow);\n    font-size: 20pt;\n    font-weight: bold;\n    margin: 5px 10%;\n    @media (max-width: 720px) {\n        margin: 5px 2%;\n    }\n    border-radius: 100px;\n    padding: 2px 2px;\n    display: block;\n"]))),ye=Object(be.b)(ge)(C||(C=Object(ue.a)(["\n    --flair-color: #c02727;\n    --flair-shadow: #691717;\n"]))),we=Object(be.b)(ge)(T||(T=Object(ue.a)(["\n    --flair-color: #22a534;\n    --flair-shadow: #1b7727;\n"]))),ke=Object(be.b)(ge)(I||(I=Object(ue.a)(["\n    --flair-color: #a52a95;\n    --flair-shadow: #5c1252;\n"]))),Ne=Object(be.b)(ge)(E||(E=Object(ue.a)(["\n    --flair-color: #cc7829;\n    --flair-shadow: #79481a;\n"]))),_e=Object(be.b)(ge)(z||(z=Object(ue.a)(['\n    --flair-color: transparent;\n    --flair-shadow: transparent;\n    --mega-evo-gradient: linear-gradient(to right, #bac24e, #4bb84b, #48b4b6, #db58dd);\n\n    position: relative;\n    z-index: 0;\n    background-image: var(--mega-evo-gradient);\n    \n    /* Emulating a box shadow but with a background image */\n    &::before {\n        content: "";\n        position: absolute;\n\n        /* Creates the sort of box shadow effect I like */\n        /* Somehow... */\n        opacity: 50%;\n        background-image: var(--mega-evo-gradient);\n        border-radius: 100px;\n\n        z-index: -1;\n        top: 2px;\n        left: 2px;\n        width: 100%;\n        height: 100%;\n    }\n']))),Pe={male:"var(--male-stat-background)",female:"var(--female-stat-background)"},Se=be.b.div(F||(F=Object(ue.a)(["\n    flex-grow: 1;\n    width: 40%;\n    height: 84px;\n    display: flex;\n    border-radius: var(--mini-divison-radius);\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    background-color: ",";\n    box-shadow: 1px 2px 0px 0px var(--shadow-color);\n    margin: 5px;\n    /* oH BUt ThiS iS BaD PraCTIcE */\n    /* I JUST WANT THEM TO AL */\n    & > h1 {\n        width: auto;\n        margin: 0ch 0.5ch;\n    }\n"])),(function(e){var n,t=e.gender;return null!==(n=Pe[t])&&void 0!==n?n:"var(--layer-1)"})),Ae=be.b.div(D||(D=Object(ue.a)(["\n    display: flex;\n    align-items: center;\n    background-color: var(--layer-1);\n    box-shadow: 1px 1px 1px var(--shadow-color);\n    border-radius: var(--mini-divison-radius);\n    padding: 10px 0;\n    margin: 5px;\n    text-align: left;\n"]))),Ce=be.b.div($||($=Object(ue.a)(["\n    background-color: var(--layer-2);\n    border-radius: var(--mini-divison-radius);\n    box-shadow: 1px 1px 1px var(--shadow-color);\n    /* flexbox abuse \ud83d\ude33 */\n    display: inline-flex;\n    justify-content: center;\n    width: 15px;\n    padding: 15px;\n    margin: 0px 1ch;\n"]))),Te=Object(be.a)(L||(L=Object(ue.a)(["\n    border-bottom: solid 2px transparent;\n    border-image: radial-gradient(currentColor 20%, transparent 100%);\n    border-image-slice: 1;\n    margin: 10px auto;\n    padding: 0.25ch 1ch;\n    width: fit-content;\n"]))),Ie=(be.b.span(M||(M=Object(ue.a)(["\n    ","\n"])),Te),be.b.h1(G||(G=Object(ue.a)(["\n    ","\n"])),Te)),Ee=be.b.h2(U||(U=Object(ue.a)(["\n    ","\n"])),Te),ze=(be.b.h3(B||(B=Object(ue.a)(["\n    ","\n"])),Te),be.b.h1(R||(R=Object(ue.a)(["\n    ","\n    font-size: 30pt;\n    @media (max-width: 720px) {\n        font-size: 25pt;\n    }\n"])),Te)),Fe=be.b.div(H||(H=Object(ue.a)(["\n    background-color: var(--layer-0);\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(275px, 2fr));\n    grid-auto-rows: 150px;\n    justify-content: center;\n\n    gap: 10px;\n    padding: 5px;\n    margin: 10px;\n    border: 2px solid var(--layer-1);\n    overflow: auto;\n    max-height: 480px;\n    height: 520px;\n\n    &::-webkit-scrollbar {\n        width: 0.7em;\n    }\n\n    @media (max-width: 720px) {\n        grid-template-columns: 1fr;\n    }\n"]))),De={hp:Object(be.a)(J||(J=Object(ue.a)(["\n        --primary: hsl(3, 81%, 25%);\n        --secondary: hsl(3, 79%, 35%);\n        --shadow: hsl(3, 100%, 11%);\n        --tertiary: hsl(3, 100%, 14%); \n    "]))),attack:Object(be.a)(V||(V=Object(ue.a)(["\n        --primary: hsl(22, 84%, 33%);\n        --secondary: hsl(22, 93%, 44%);\n        --shadow: hsl(22, 75%, 15%);\n        --tertiary: hsl(22, 75%, 20%); \n    "]))),defense:Object(be.a)(W||(W=Object(ue.a)(["\n        --primary: hsl(50, 88%, 35%);\n        --secondary: hsl(50, 88%, 43%);\n        --shadow: hsl(50, 100%, 24%);\n        --tertiary: hsl(50, 80%, 18%); \n    "]))),"special-attack":Object(be.a)(X||(X=Object(ue.a)(["\n        --primary: hsl(222, 70%, 26%);\n        --secondary: hsl(222, 59%, 48%);\n        --shadow: hsl(222, 70%, 10%);\n        --tertiary: hsl(222, 70%, 14%); \n    "]))),"special-defense":Object(be.a)(q||(q=Object(ue.a)(["\n        --primary: hsl(115, 80%, 23%);\n        --secondary: hsl(115, 75%, 34%);\n        --shadow: hsl(115, 75%, 10%);\n        --tertiary: hsl(115, 84%, 12%); \n    "]))),speed:Object(be.a)(K||(K=Object(ue.a)(["\n        --primary: hsl(330, 91%, 26%);\n        --secondary: hsl(330, 91%, 43%);\n        --shadow: hsl(330, 77%, 18%);\n        --tertiary: hsl(330, 91%, 14%); \n    "]))),total:Object(be.a)(Q||(Q=Object(ue.a)(["\n        --primary: hsl(0, 0%, 20%);\n        --secondary: hsl(0, 0%, 43%);\n        --shadow: hsl(0, 0%, 0%);\n        --tertiary: hsl(0, 0%, 10%);\n    "])))},$e=be.b.div(Y||(Y=Object(ue.a)(["\n    ","\n    --stat-radius: 15px;\n    box-shadow: 2px 2px 1px 0px var(--shadow);\n    display: flex;\n    align-items: center;\n    background-color: var(--tertiary);\n    height: 2.5em;\n    border-radius: var(--stat-radius);\n    margin: 5px;\n"])),(function(e){var n,t=e.name;return null!==(n=De[t])&&void 0!==n?n:De.total})),Le=be.b.div(Z||(Z=Object(ue.a)(["\n    background-color: transparent;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    height: 100%;\n    /* border: 2px solid var(--layer-0); */\n    border: 2px solid var(--primary);\n    border-radius: 0 var(--stat-radius) var(--stat-radius) 0;\n"]))),Me=be.b.div(ee||(ee=Object(ue.a)(["\n    display: flex;\n    align-items: center;\n    transition: 0.25s ease;\n    width: calc(100% * (","/","));\n    height: 100%;\n    padding: 0 0 0 0.5ch;\n    margin: 0;\n    border-radius: 0 var(--stat-radius) var(--stat-radius) 0;\n    /* box-shadow: 2px 0 1px 0px var(--shadow); */\n    background-color: var(--secondary);\n"])),(function(e){return e.stat}),(function(e){return e.outOf})),Ge=(be.b.div(ne||(ne=Object(ue.a)(["\n    background-color: transparent;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    height: 100%;\n    /* border: 2px solid var(--layer-0); */\n    border: 2px solid var(--primary);\n    border-radius: 0 var(--stat-radius) var(--stat-radius) 0;\n"]))),be.b.div(te||(te=Object(ue.a)(["\n    box-sizing: border-box;\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    height: 100%;\n    width: 25ch;\n    padding: 0 1ch;\n    background-color: var(--primary);\n    border-radius: var(--stat-radius) 0 0 var(--stat-radius);\n    box-shadow: 1px 0 4px var(--shadow);\n    z-index: 1;\n    border-right-width: 0px;\n"])))),Ue=be.b.h1(re||(re=Object(ue.a)(["\n    display: inline-block;\n    background-color: currentColor;\n    text-shadow: 2px 2px 1px var(--shadow-color);\n    border-radius: 10px;\n    padding: 5px;\n    margin: 5px;\n    width: 8ch;\n"]))),Be=Object(be.b)(Ue)(ae||(ae=Object(ue.a)(["\n    background-color: transparent;\n    box-shadow: 0 0 10px inset white;\n"]))),Re=be.b.p(ce||(ce=Object(ue.a)(["\n    margin: 1ch 1ch;\n"]))),He=be.b.div(ie||(ie=Object(ue.a)(["\n    display: grid;\n    grid-template-columns: 1fr;\n    height: 500px;\n    overflow: auto;\n    background-color: var(--layer-0);\n"]))),Je=be.b.div(se||(se=Object(ue.a)(["\n    background-color: var(--layer-1);\n    margin: 5px;\n    box-shadow: 3px 3px 0px var(--shadow-color);\n    border-radius: 10px;\n    padding: 0 10px;\n"])));be.b.div(oe||(oe=Object(ue.a)(["\n    display: flex;\n    justify-items: flex-start;\n"])));function Ve(e){var n,t=e.ability.effect_entries.filter((function(e){return"en"===e.language.name}))[0];return Object(u.jsxs)(je,{children:[Object(u.jsx)(pe,{children:Object(u.jsx)(Ee,{children:h(e.ability.name).replace("-"," ")})}),Object(u.jsx)(xe,{children:Object(u.jsx)("p",{children:null!==(n=null===t||void 0===t?void 0:t.short_effect)&&void 0!==n?n:"[NO DESCRIPTION]"})})]})}var We=t(30);t(49);function Xe(e){return Object(u.jsxs)("div",{className:"lds-ring",style:{display:e.visible?"inline-block":"none"},children:[Object(u.jsx)("div",{}),Object(u.jsx)("div",{}),Object(u.jsx)("div",{}),Object(u.jsx)("div",{})]})}var qe={},Ke=null,Qe=Object(c.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://pokeapi.co/api/v2/pokemon/?limit=9999").then((function(e){return e.json()}));case 2:Ke=e.sent;case 3:case"end":return e.stop()}}),e)})))(),Ye="https://pokeapi.co/api/v2";function Ze(e){return en.apply(this,arguments)}function en(){return(en=Object(c.a)(a.a.mark((function e(n){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",null!==(t=qe[n])&&void 0!==t?t:qe[n]=fetch(n).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function nn(){return(nn=Object(c.a)(a.a.mark((function e(n,t){var r,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c="".concat(Ye,"/").concat(n,"/").concat(t,"/"),e.abrupt("return",null!==(r=qe[c])&&void 0!==r?r:qe[c]=fetch(c).then((function(e){return e.json()})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function tn(e){return rn.apply(this,arguments)}function rn(){return(rn=Object(c.a)(a.a.mark((function e(n){var t,r,c=arguments;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.length>1&&void 0!==c[1]?c[1]:-1,e.next=3,Qe;case 3:return r=Ke.results.filter((function(e){return null!==e.name.match(n)})),t>0&&(r=r.slice(0,t)),e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function an(e){var n,t=Object(i.useState)(null),r=Object(d.a)(t,2),a=r[0],c=r[1],s=Object(i.useContext)(de),o=s.pokemon,l=s.species;return Object(i.useEffect)((function(){Ze(l.evolution_chain.url).then((function(e){return function(e){return cn.apply(this,arguments)}(e)})).then((function(e){return c(e.sort((function(e,n){return Number(n.is_default)-Number(e.is_default)})))}))}),[l.evolution_chain.url]),Object(u.jsx)(Fe,{children:null!==(n=null===a||void 0===a?void 0:a.map((function(e){return Object(u.jsx)(f,{pokemon:e,disabled:o.name===e.name},e.name)})))&&void 0!==n?n:Object(u.jsx)(Xe,{visible:!0})})}function cn(){return(cn=Object(c.a)(a.a.mark((function e(n){var t,r,c,i,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=n.chain){e.next=2;break}return e.abrupt("return",[]);case 2:for(t=[],(r=[]).push(n.chain);0!==r.length;)c=r.pop(),t.push(c.species.url),r.push.apply(r,Object(We.a)(c.evolves_to));return e.next=8,Promise.all(t.map((function(e){return Ze(e)})));case 8:return i=e.sent,s=Promise.all(i.map((function(e){return e.varieties.map((function(e){return Ze(e.pokemon.url)}))})).flat()),e.next=12,s;case 12:return e.abrupt("return",e.sent);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function sn(e){var n,t,r,a={male:Object(u.jsx)("i",{className:"fas fa-mars"}),female:Object(u.jsx)("i",{className:"fas fa-venus"})};return Object(u.jsxs)(Se,{gender:null!==(n=e.gender)&&void 0!==n?n:"",children:[Object(u.jsx)("h1",{children:null!==(t=a[null!==(r=e.gender)&&void 0!==r?r:""])&&void 0!==t?t:"Genderless"}),Object(u.jsxs)("h1",{children:[e.ratio,e.gender&&"%"]})]})}function on(e){return Object(u.jsxs)(Ae,{children:[Object(u.jsx)(Ce,{children:Object(u.jsx)("i",{className:e.icoName})})," ",Object(u.jsx)("span",{children:e.children})]})}function ln(e){return Object(u.jsxs)($e,{name:e.name,children:[Object(u.jsx)(Ge,{children:e.name.split("-").map((function(e){return h(e)})).join(" ")}),Object(u.jsx)(Le,{children:Object(u.jsx)(Me,{stat:e.stat,outOf:e.outOf,children:e.stat})})]})}function dn(e){return null==e.typeName?Object(u.jsx)(Be,{children:Object(u.jsx)("span",{children:"???"})}):Object(u.jsx)(Ue,{className:e.typeName,children:Object(u.jsx)("span",{children:h(e.typeName)})})}function un(e){var n,t=Object(i.useState)(null),r=Object(d.a)(t,2),a=r[0],c=r[1],s=Object(i.useContext)(de).pokemon;return Object(i.useEffect)((function(){Promise.all(s.moves.map((function(e){return Ze(e.move.url)}))).then((function(e){return c(e)}))}),[s]),Object(u.jsx)(He,{children:null!==(n=null===a||void 0===a?void 0:a.map((function(e){var n,t;return Object(u.jsxs)(Je,{children:[Object(u.jsx)(Ie,{children:e.name.split("-").map((function(e){return h(e)})).join(" ")}),Object(u.jsx)(Ee,{children:"Type"}),Object(u.jsx)("div",{children:Object(u.jsx)(dn,{typeName:e.type.name})}),Object(u.jsx)(Ee,{children:"Stats"}),Object(u.jsx)(ln,{name:"Power",outOf:255,stat:null!==(n=e.power)&&void 0!==n?n:0}),Object(u.jsx)(ln,{name:"Accuracy",outOf:100,stat:null!==(t=e.accuracy)&&void 0!==t?t:0}),Object(u.jsx)(Ee,{style:{textAlign:"left"},children:"Description"}),Object(u.jsx)("p",{children:e.effect_entries.filter((function(e){return"en"===e.language.name})).reverse()[0].short_effect.replaceAll("$effect_chance%","".concat(e.effect_chance,"%"))})]},e.id)})))&&void 0!==n?n:Object(u.jsx)(Xe,{visible:!0})})}var bn=t(4);function hn(e){var n=Object(i.useContext)(de),t=n.pokemon,r=n.species,a=t.name.split("-"),c=[],s=!0;return r.is_legendary&&c.push(Object(u.jsx)(we,{children:"Legendary Pokemon"},"legendary")),r.is_mythical&&c.push(Object(u.jsx)(ke,{children:"Mythical Pokemon"},"mythical")),a.some((function(e){return"mega"===e}))&&(s=!1,c.push(Object(u.jsx)(_e,{children:"Mega evolution"},"mega"))),a.some((function(e){return"gmax"===e}))&&(s=!1,c.push(Object(u.jsx)(ye,{children:"Gigantamax Form"},"giga"))),!t.is_default&&s&&c.push(Object(u.jsx)(Ne,{children:"Alternative Form"},"alt")),Object(u.jsx)("div",{children:c})}function jn(e){var n,t=Object(i.useContext)(de).pokemon,r=Object(i.useState)(null),a=Object(d.a)(r,2),c=a[0],s=a[1];return Object(i.useEffect)((function(){Promise.all(t.abilities.map((function(e){return Ze(e.ability.url)}))).then((function(e){return s(e)}))}),[t]),Object(u.jsx)(he,{children:null!==(n=null===c||void 0===c?void 0:c.map((function(e){return Object(u.jsx)(Ve,{ability:e},e.id)})))&&void 0!==n?n:Object(u.jsx)(Xe,{visible:!0})})}var pn=function(e){var n,t,r,a,c,s=Object(i.useState)({}),o=Object(d.a)(s,2),l=o[0],b=o[1],p=Object(i.useState)({}),x=Object(d.a)(p,2),f=x[0],m=x[1],O=Object(bn.g)(),v=Object(bn.h)(),g=Object(i.useState)(!1),y=Object(d.a)(g,2),w=y[0],k=y[1],N=Object(i.useRef)(null);if(Object(i.useEffect)((function(){var e,n;(window.screen.width<720&&(null===(e=N.current)||void 0===e||e.scrollIntoView()),n=v.id,/\d+$/.test(n))?function(e,n){return nn.apply(this,arguments)}("pokemon",v.id).then((function(e){e.name===v.name?Ze(e.species.url).then((function(n){b(e),m(n),k(!0)})):O.push("/".concat(e.id,"/").concat(e.name))})).catch((function(e){return O.push("/")})):O.push("/")}),[v,O]),!w)return Object(u.jsx)(Xe,{visible:!0});var _=l.types[0].type.name,P=null===(n=l.types[1])||void 0===n?void 0:n.type.name,S=f.egg_groups.map((function(e){return h("no-eggs"===e.name?"undiscovered":e.name)}));S.join("")||(S=["N/A"]);var A=f.flavor_text_entries.filter((function(e){return"en"===e.language.name})).reverse()[0].flavor_text.replaceAll("\f"," ").replaceAll(/(\r\n|\n|\r)/gm," "),C=f.gender_rate,T=C/8*100,I=100-T;return Object(u.jsx)(fe,{ref:N,children:Object(u.jsxs)(de.Provider,{value:{pokemon:l,species:f},children:[Object(u.jsxs)(Oe,{width:4,height:1,children:[Object(u.jsx)(ze,{className:_,children:j(l.name)}),Object(u.jsx)("div",{children:Object(u.jsx)("img",{className:"pokeimg",src:null!==(t=null!==(r=l.sprites.other["official-artwork"].front_default)&&void 0!==r?r:l.sprites.front_default)&&void 0!==t?t:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/399.png",alt:l.name})}),Object(u.jsxs)("div",{children:[Object(u.jsx)(hn,{}),Object(u.jsx)(dn,{typeName:_},_),Object(u.jsx)(dn,{typeName:P},P)]})]}),Object(u.jsxs)(Oe,{width:4,height:1,children:[Object(u.jsx)(Ie,{children:"Stats"}),Object(u.jsxs)(ve,{children:[l.stats.map((function(e){var n=e.stat.name,t=e.base_stat;return Object(u.jsx)(ln,{name:n,stat:t,outOf:255},n)})),Object(u.jsx)(ln,{name:"total",stat:l.stats.map((function(e){return e.base_stat})).reduce((function(e,n){return e+n})),outOf:1125})]}),Object(u.jsx)(Ie,{children:"Gender ratio "}),Object(u.jsx)(ve,{children:-1!==C?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(sn,{gender:"male",ratio:I}),Object(u.jsx)(sn,{gender:"female",ratio:T})]}):Object(u.jsx)(sn,{})})]}),Object(u.jsxs)(Oe,{width:5,height:2,children:[Object(u.jsx)(Ie,{children:"Evolutions/Variants"}),Object(u.jsx)(an,{})]}),Object(u.jsxs)(Oe,{width:3,height:1,children:[Object(u.jsx)(Ee,{children:"Pokemon Info"}),Object(u.jsxs)(on,{icoName:"fas fa-hashtag",children:["ID ",l.id<1e4?"#".concat(l.id):"N/A"]}),Object(u.jsxs)(on,{icoName:"fas fa-weight-hanging",children:["Weight: ",l.weight/10,"kg"]}),Object(u.jsxs)(on,{icoName:"fas fa-ruler-vertical",children:["Height: ",10*l.height,"cm"]}),Object(u.jsxs)(on,{icoName:"fas fa-tree",children:["Likes ",null!==(a=null===(c=f.habitat)||void 0===c?void 0:c.name)&&void 0!==a?a:"no"," environments"]}),Object(u.jsxs)(on,{icoName:"fas fa-egg",children:["Egg groups: ",S.join(", ")]})]}),Object(u.jsxs)(Oe,{width:3,height:1,children:[Object(u.jsx)(Ee,{children:"Pokedex Desc."}),Object(u.jsx)(Re,{children:A})]}),Object(u.jsxs)(me,{width:5,height:1,children:[Object(u.jsx)(Ie,{children:"Moves"}),Object(u.jsx)(un,{})]}),Object(u.jsxs)(me,{width:3,height:1,children:[Object(u.jsx)(Ie,{children:"Abilities"}),Object(u.jsx)(jn,{})]}),Object(u.jsx)(me,{width:8,height:1,children:Object(u.jsxs)("p",{children:["Share this Pokemon ",Object(u.jsx)("span",{className:"--bigify",children:Object(u.jsx)("i",{className:"fas fa-share"})})," ",Object(u.jsx)("br",{}),Object(u.jsx)(le,{copyTxt:window.location.origin+window.location.pathname})]})})]})})};t(50);function xn(){var e=Object(i.useRef)(0),n=Object(i.useState)([]),t=Object(d.a)(n,2),r=t[0],a=t[1],c=Object(i.useState)(!1),s=Object(d.a)(c,2),o=s[0],l=s[1],h=Object(bn.g)();return Object(i.useEffect)((function(){document.body.classList.add("dark")}),[]),Object(u.jsx)("div",{className:"App",children:Object(u.jsxs)("div",{className:"search",children:[Object(u.jsx)("div",{className:"loading-container",children:Object(u.jsx)(Xe,{visible:o})}),Object(u.jsx)(b,{keyUp:function(n){l(!0),h.push("/"),e.current+=1;var t,r=e.current;if(t=n.toLowerCase().replaceAll(" ","-").replaceAll(/:|\.|'/g,""),""===(n=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")))return a([]),void l(!1);tn(n,30).then((function(e){return Promise.all(e.map((function(e){return Ze(e.url)})))})).then((function(n){n.forEach((function(e){return Ze(e.species.url)})),r<e.current||(a([]),a(n.map((function(e){return Object(u.jsx)(f,{pokemon:e},e.name)}))),l(!1))}))}}),Object(u.jsxs)(bn.d,{children:[Object(u.jsx)(bn.b,{path:"/:id/:name/",exact:!0,children:Object(u.jsx)("div",{className:"search__result-detailed-container",children:Object(u.jsx)(pn,{})})}),Object(u.jsxs)(bn.b,{path:"/:name/",exact:!0,children:[Object(u.jsx)(fn,{}),Object(u.jsx)("div",{className:"search__result-detailed-container",children:Object(u.jsx)(Xe,{visible:!0})})]}),Object(u.jsx)(bn.b,{path:"/",children:Object(u.jsx)("div",{className:"search__result-container",children:r})})]})]})})}function fn(){var e=Object(bn.h)(),n=Object(bn.g)(),t=Object(i.useState)(null),r=Object(d.a)(t,2),a=r[0],c=r[1];return Object(i.useEffect)((function(){tn(e.name).then((function(t){var r=t.find((function(n){return n.name===e.name}));void 0!==r?c(parseInt(r.url.split("/").slice(-2)[0])):n.push("/")}))}),[e,n]),null==a?null:Object(u.jsx)(bn.a,{to:"/".concat(a,"/").concat(e.name,"/")})}var mn,On,vn,gn,yn,wn=function(e){return Object(u.jsx)(p.a,{children:Object(u.jsx)(xn,{})})},kn=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,54)).then((function(n){var t=n.getCLS,r=n.getFID,a=n.getFCP,c=n.getLCP,i=n.getTTFB;t(e),r(e),a(e),c(e),i(e)}))},Nn=(t(51),t(52),be.b.nav(mn||(mn=Object(ue.a)(["\n    background: var(--layer-1);\n    text-align: center;\n    border-bottom: solid var(--layer-3) 2px;\n    box-shadow: 0 1px 2px var(--shadow-color);\n    padding: 18px 0;\n"])))),_n=be.b.a(On||(On=Object(ue.a)(["\n    position: relative;\n    color: var(--link-color);\n    font-size: 23pt;\n    padding: 0px 10px;\n    text-decoration: none;\n    transition: all 0.10s;\n    &:hover {\n        color: var(--link-hover);\n    }\n    &:before {\n        content: '';\n        position: absolute;\n        width: 100%;\n        left: 0;\n        bottom: 0;\n        border-bottom: solid var(--link-hover) 2px;\n        border-radius: 20px;\n        /* NEGATIVE PADDING!?!?!?? */\n        margin: -0.3ch 0px;\n        background-color: transparent;\n        transition: all 0.30s ease;\n        transform: scaleX(0);\n    }\n    &:hover::before {\n        transform:scaleX(1);\n    }\n    @media (max-width: 1080px) {\n        font-size: 18pt;\n        padding: 0 2px;\n    }\n"]))),Pn=be.b.ul(vn||(vn=Object(ue.a)(["\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    height: auto;\n    display: flex;\n    justify-content: left;\n    align-items: center;\n    flex-flow: wrap row;\n"]))),Sn=be.b.li(gn||(gn=Object(ue.a)(["\n    margin: 0 10px;\n"]))),An=Object(be.b)(Nn)(yn||(yn=Object(ue.a)(["\n    & "," {\n        padding: 0;\n        font-size: 20px;\n        background-color: transparent;\n    }\n    & "," {\n        flex-flow: wrap row;\n    }\n    & "," {\n        margin: 0 10px;\n    }\n    border: 0;\n    padding: 10px 20px;\n    background-color: transparent;\n    box-shadow: none;\n"])),_n,Pn,Sn);var Cn=function(){return Object(u.jsxs)("footer",{children:[Object(u.jsxs)("p",{className:"footer__content",children:[Object(u.jsx)("i",{className:"far fa-copyright"})," copyright 2021 lolololol"]}),Object(u.jsxs)("p",{className:"footer__content",children:["A ",Object(u.jsx)("a",{className:"--animated-underline",href:"https://github.com/seamussmith",children:"Seamus Smith"})," website powered by PokeAPI."]}),Object(u.jsx)(An,{children:Object(u.jsxs)(Pn,{children:[Object(u.jsx)(Sn,{children:Object(u.jsxs)(_n,{href:"https://github.com/seamussmith/poke-searcher-react",children:[Object(u.jsx)("i",{className:"fab fa-github --force-inheritence"})," github"]})}),Object(u.jsx)(Sn,{children:Object(u.jsxs)(_n,{href:"https://www.youtube.com/watch?v=G4z9yW72A1o",children:[Object(u.jsx)("i",{className:"fas fa-angry --force-inheritence"})," get rickrolled"]})}),Object(u.jsx)(Sn,{children:Object(u.jsxs)(_n,{href:"https://pokeapi.co/",children:[Object(u.jsx)("i",{className:"fas fa-server --force-inheritence"})," PokeAPI"]})})]})})]})};function Tn(){return(Tn=Object(c.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l.a.render(Object(u.jsxs)(s.a.StrictMode,{children:[Object(u.jsx)(wn,{}),Object(u.jsx)(Cn,{})]}),document.getElementById("root"));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){Tn.apply(this,arguments)}(),kn()}},[[53,1,2]]]);
//# sourceMappingURL=main.579533b2.chunk.js.map