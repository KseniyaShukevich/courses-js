!function(){var t={5071:function(){var t=document.createElement("div");t.className="container",document.body.append(t)},5773:function(t,e,n){"use strict";function r(t,e){var n=document.createElement("div");return n.className=t,n.textContent=e,n}function o(t,e){t.forEach((function(t){t.style.display=e}))}var a=document.createElement("div");a.className="container-header",a.append(r("content time","Время: 00:00")),a.append(r("content moves","Шагов: 0")),a.append(r("content btn-pause","Пауза")),document.body.append(a);n(5071);var c,i=document.createElement("div"),u=document.createElement("div");function l(){var t=document.createElement("select");t.className="select settings";for(var e=function(){var t=4,e=localStorage.getItem("arraySaveGame");return e&&"null"!==e&&(t=+(e=e.split(","))[e.length-2]),t}(),n=3;n<9;n+=1){var r=document.createElement("option");n===e&&r.setAttribute("selected","selected"),r.value=n,r.textContent="".concat(n,"x").concat(n),t.append(r)}return t}function s(t,e){var n=document.createElement("div");n.className="column-rating rating",n.append(r("header-rating rating",e));for(var o=0;o<10;o+=1)n.append(r(t,""));return n}i.className="container-menu",u.className="container-content-menu",i.append(u),u.append(r("button-menu main btn-new-game","Новая игра")),u.append(r("button-menu main btn-rating","Рейтинг")),u.append(r("button-menu main btn-settings","Настройки")),u.append(r("header settings","Настройки")),u.append(r("setting settings","Размер поля")),u.append(l()),u.append(function(t){var e=document.createElement("div");return e.className="message settings",e.textContent=t,e}("Сохранено. Начните новую игру.")),u.append(r("button-menu settings exit-settings","Назад")),u.append(r("header gratulate","УРАААА")),u.append(r("message-gratulate gratulate","")),u.append(r("button-menu gratulate exit-gratulate","Назад")),u.append(r("header rating","Рейтинг")),u.append(((c=document.createElement("div")).className="rating-body rating",c.append(s("date-rating text-rating rating","Дата")),c.append(s("time-rating text-rating rating","Время")),c.append(s("moves-rating text-rating rating","Шагов")),c.append(s("field-rating text-rating rating","Поле")),c)),u.append(r("button-menu rating exit-rating","Назад")),document.body.append(i),o(document.querySelectorAll(".settings"),"none"),o(document.querySelectorAll(".rating"),"none"),o(document.querySelectorAll(".gratulate"),"none");var f,d=document.querySelectorAll(".main"),m=document.querySelectorAll(".settings"),p=document.querySelector(".select"),g=document.querySelector(".btn-settings"),h=document.querySelector(".exit-settings"),v=document.querySelector(".message"),y=4;function b(){return+y}function S(t,e,n){if(0!==t){var r=document.createElement("div");return r.className="element",r.textContent=t,r.style.left="".concat(n%e*(100/e),"%"),r.style.top="".concat(Math.floor(n/e)*(100/e),"%"),r.style.width="".concat(100/e,"%"),r.style.height="".concat(100/e,"%"),r.style.transition="all 1s",r}return!1}function x(t,e,n){for(var r=0,o=e+1;o<t.length;o+=1)n>t[o]&&(r+=1);return r}(f=localStorage.getItem("arraySaveGame"))&&"null"!==f&&(f=f.split(","),y=+f[f.length-2]),g.addEventListener("click",(function(){o(m,""),v.style.opacity="0",o(d,"none")})),p.addEventListener("change",(function(t){y=t.target.value,v.style.opacity="1",setTimeout((function(){v.style.opacity="0"}),2e3)})),h.addEventListener("click",(function(){o(m,"none"),o(d,"")}));var E=document.querySelector(".btn-pause"),q=!0;function C(){var t=document.querySelector(".container-menu"),e=document.querySelector(".btn-pause");q=!0,t.style.display="",e.textContent="Играть"}function w(){var t=document.querySelector(".container-menu"),e=document.querySelector(".btn-pause");q=!1,t.style.display="none",e.textContent="Пауза"}function I(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var c,i=t[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return A(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return A(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}E.addEventListener("click",(function(){Boolean(+localStorage.getItem("isGameStart"))&&(q?w():C())}));var j=document.querySelector(".time"),M=[];function z(t){return"".concat(t).length<2?"0".concat(t):t}function k(t){var e=[],n=Math.floor(t/60),r=t%60;return n=z(n),r=z(r),e.push(n,r),e}function G(t,e){!function(t){var e=t,n=setInterval((function(){if(!q){var t=I(k(e+=1),2),n=t[0],r=t[1];j.textContent="Время: ".concat(n,":").concat(r),localStorage.setItem("saveTimeCounter",e)}}),1e3);M.push(n)}(e),t&&(clearInterval(M[0]),M.shift())}var N=n.p+"e864a16394340d1b9f27f88d8fcf530a.jpg",L=n.p+"810527647e9b52d4746a6349663f6abe.jpg",T=n.p+"8e39253e6f6f348197df33ae913f5892.jpg",O=n.p+"1382e1825500d9e29ccece95693405ff.jpg",R=n.p+"b5737c5cd68e8dd53517647c5bfb0f3e.jpg",U=n.p+"d017e8553f34dc67b9853abe09856945.jpg",P=n.p+"a5efd71fd1c2ec97c216d82ea02946c3.jpg",W=n.p+"4b20becdce1ff265a2a074fd2b10e6cd.jpg",$=n.p+"579124660c294fbb1510f38bb2ad6d20.jpg",B=n.p+"99af400d2fa829992c097cb8fb84210f.jpg",Y=n.p+"45f27d02e7442aa4c7dce76336da62b4.jpg",X=[N,L,T,O,R,U,P,W,$,B,n.p+"bb96d0331bed28d38ce2ca4bb71a8489.jpg",n.p+"9a42fc1b0a7f850c516eec71b49ab3ae.jpg",n.p+"0538153003437bdbd38f1615a4df1007.jpg",n.p+"237642c39967a9f8036bb9887b99201f.jpg",n.p+"63c4861a3e95d2582016342e9698ea6a.jpg",n.p+"201374c216be5cdfdcfb8174b3ca6c7f.jpg",n.p+"0b95ba4ab4ca25bd0bec815fbbe16fd8.jpg",n.p+"271da505c41c339491837b39e812f714.jpg",n.p+"72c72d50316dabec57bc9f767c2b74cf.jpg",Y],D=1;function F(){var t,e,n=b(),r=document.querySelectorAll(".element");"null"===localStorage.getItem("arraySaveGame")?(t=X.length,e=Math.random()*t,D=Math.floor(e),localStorage.setItem("imageSaveGame",D)):D=localStorage.getItem("imageSaveGame"),r.forEach((function(t){t.style.backgroundImage="url(".concat(X[D],")");var e="".concat((+t.textContent-1)%n*(100/n)),r="".concat(Math.floor((+t.textContent-1)/n)*(100/n));t.style.backgroundPosition="".concat(e,"% ").concat(r,"%")}))}function H(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var c,i=t[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return J(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return J(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function J(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var K=document.querySelector(".btn-new-game"),Q=document.querySelector(".moves"),V=document.querySelector(".time"),Z=[],_=!1;function tt(){"0"===localStorage.getItem("isGameStart")&&localStorage.setItem("isGameStart","1")}function et(){var t=localStorage.getItem("arraySaveGame");if("null"!==t&&t){var e=function(){var t=localStorage.getItem("arraySaveGame").split(",");Z=(Z=t.slice(0,t.length-2)).map((function(t){return+t}));var e=+localStorage.getItem("saveTimeCounter"),n=H(k(e),2),r=n[0],o=n[1];return V.textContent="Время: ".concat(r,":").concat(o),Q.textContent="Шагов: ".concat(t[t.length-1]),e}();G(_,e),_=!0,tt(),w()}else{var n=b();!function(t){for(var e=0;e<t;e+=1){var n=(r=t,o=void 0,o=Math.random()*r,Math.floor(o));-1===Z.indexOf(n)?Z.push(n):e-=1}var r,o}(n*n),function(t,e){for(var n=0,r=0;r<t.length;r+=1){var o=t[r];n+=0===o?Math.ceil(r%e):x(t,r,o)}return n%2==0}(Z,n)||(Z=[],et())}}function nt(){var t;Z=[],(t=document.querySelectorAll(".element")).length>0&&t.forEach((function(t){t.remove()})),et(),function(){for(var t=document.querySelector(".container"),e=b(),n=0;n<Z.length;n+=1){var r=S(Z[n],e,n);r&&t.append(r)}F()}()}localStorage.setItem("isGameStart","0"),K.addEventListener("click",(function(){V.textContent="Время: 00:00",Q.textContent="Шагов: 0",localStorage.setItem("arraySaveGame","null"),G(_,0),_=!0,tt(),nt(),w()}));var rt=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.value=e,this.position=1,this.next=null,this.top=null,this.right=null,this.bottom=null,this.left=null};function ot(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function at(t){var e=[],n=t.head;for(e.push(n.value);n.next;)n=n.next,e.push(n.value);return e}function ct(t){for(var e=function(){for(var t=b(),e=t*t-1,n=[],r=1;r<=e;r+=1)n.push(r);return n.push(0),n}(),n=at(t),r=0;r<e.length;r+=1)if(e[r]!==n[r])return!1;return!0}function it(t){var e=at(t);e.push(b()),e.push(t.moves),localStorage.setItem("arraySaveGame",e)}var ut=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.head=null,this.length=0,this.moves=0}var e,n,r;return e=t,(n=[{key:"addNext",value:function(t){if(0===this.length)this.head=new rt(t);else{for(var e=this.head;e.next;)e=e.next;e.next=new rt(t),e.next.position=e.position+1}this.length+=1}},{key:"createGraphOfElements",value:function(){var t=b(),e=this.head,n=e;e.right=e.next,e.next.left=e;for(var r=e.position+t,o=e.position;o<r;o+=1)n.next&&(n=n.next);for(e.bottom=n,n.top=e;e.next;)if(n=(e=e.next).next,e.position%t!=0&&(e.right=e.next,e.next.left=e),Math.ceil(e.position/t)<t){for(var a=e.position;a<e.position+(t-1);a+=1)n.next&&(n=n.next);e.bottom=n,n.top=e}it(this)}},{key:"getPosition",value:function(t){for(var e=this.head;e&&e.value!==+t;)e=e.next;return e.position}},{key:"getNeighbor",value:function(t){for(var e=this,n=[],r=this.head;r&&r.value!==+t;)r=r.next;var o=function(t,o){if(e.size=b(),e.side=o,e.cur=t,e.side&&0===e.side.value)if(e.side===r.left){var a;a=(e.cur.position-2)%e.size*(100/e.size),n.push("left",a,e.cur.position)}else if(e.side===r.top){var c;c=Math.floor((e.cur.position-e.size-1)/e.size)*(100/e.size),n.push("top",c,e.cur.position)}else if(e.side===r.right){var i;i=e.cur.position%e.size*(100/e.size),n.push("right",i,e.cur.position)}else{var u;u=Math.floor((e.cur.position+(e.size-1))/e.size)*(100/e.size),n.push("bottom",u,e.cur.position)}};return o(r,r.left),o(r,r.bottom),o(r,r.right),o(r,r.top),n}},{key:"searchAndSwap",value:function(t,e){for(var n=this,r=this.head;r&&r.value!==+t;)r=r.next;var o=function(t,e,o){if(n.htmlElement=o,n.size=b(),n.side=e,n.cur=t,n.side&&0===n.side.value){n.moves+=1,n.side===r.left?n.htmlElement.style.left="".concat((n.cur.position-2)%n.size*(100/n.size),"%"):n.side===r.top?n.htmlElement.style.top="".concat(Math.floor((n.cur.position-n.size-1)/n.size)*(100/n.size),"%"):n.side===r.right?n.htmlElement.style.left="".concat(n.cur.position%n.size*(100/n.size),"%"):n.htmlElement.style.top="".concat(Math.floor((n.cur.position+(n.size-1))/n.size)*(100/n.size),"%");var a=n.side,c=n.cur.value;n.cur.value=a.value,a.value=c,it(n)}};o(r,r.left,e),o(r,r.bottom,e),o(r,r.right,e),o(r,r.top,e)}}])&&ot(e.prototype,n),r&&ot(e,r),t}(),lt={},st=document.querySelector(".btn-new-game"),ft=document.querySelector(".moves"),dt=0;function mt(t){var e=t.target,n=document.querySelector(".container"),r=t.clientX-e.getBoundingClientRect().left,o=t.clientY-e.getBoundingClientRect().top,a=lt.getNeighbor(e.textContent);function c(t,a){var c=t-document.body.offsetWidth/2+n.offsetWidth/2-r,i=a-100-o;e.style.left="".concat(c/n.offsetWidth*100,"%"),e.style.top="".concat(i/n.offsetHeight*100,"%")}function i(t){c(t.pageX,t.pageY)}function u(n,r){var o;"left"===a[0]||"right"===a[0]?e.style.top="".concat(n,"%"):e.style.left="".concat(r,"%"),o=t,lt.searchAndSwap(o.target.textContent,o.target),dt=lt.moves,ft.textContent="Шагов: ".concat(dt)}function l(){var t=b(),r=function(){var t=[],r=getComputedStyle(e),o=r.left,a=r.top;o=+o.substr(0,o.length-2),a=+a.substr(0,a.length-2);var c=o/n.offsetWidth*100,i=a/n.offsetHeight*100;return t.push(c,i),t}(),o=r[0],c=r[1],i=0,l=0;if(a.length>1){var s=Math.round(e.offsetWidth/n.offsetWidth*100/3),f=function(t,e,n,r){var o=0,c=0,i=[];return"left"===a[0]||"right"===a[0]?(o=Math.round(Math.abs(a[1]-e)),c=Math.round(Math.abs(e-t))):"top"!==a[0]&&"bottom"!==a[0]||(o=Math.round(Math.abs(a[1]-r)),c=Math.round(Math.abs(r-n))),i.push(o,c),i}(i=(a[2]-1)%t*(100/t),o,l=Math.floor((a[2]-1)/t)*(100/t),c),d=f[0],m=f[1];d<=s||m<=2?u(l,i):(e.style.left="".concat(i,"%"),e.style.top="".concat(l,"%"))}else!function(t){var n=lt.getPosition(e.textContent),r=(n-1)%t*(100/t),o=Math.floor((n-1)/t)*(100/t);e.style.left="".concat(r,"%"),e.style.top="".concat(o,"%")}(t)}e.ondragstart=function(){return!1},e.style.transition="",e.style.zIndex="1000",c(t.pageX,t.pageY),document.addEventListener("mousemove",i),e.onmouseup=function(){document.removeEventListener("mousemove",i),e.style.transition="all 1s",l(),setTimeout((function(){e.style.zIndex=""}),1e3),e.onmouseup=null}}function pt(){var t=ft.textContent.slice(7,ft.textContent.length),e=Z;(lt=new ut).moves=+t,e.forEach((function(t){return lt.addNext(t)})),lt.createGraphOfElements(),document.querySelectorAll(".element").forEach((function(t){t.addEventListener("mousedown",mt)}))}function gt(){return lt}nt(),pt(),st.addEventListener("click",pt);var ht=document.querySelectorAll(".main"),vt=document.querySelector(".btn-rating"),yt=document.querySelectorAll(".rating"),bt=document.querySelector(".exit-rating"),St=document.querySelectorAll(".date-rating"),xt=document.querySelectorAll(".time-rating"),Et=document.querySelectorAll(".moves-rating"),qt=document.querySelectorAll(".field-rating");function Ct(){var t=function(t){var e=[],n=[];return t.forEach((function(t){var n=t.split(",");e.push(n[0])})),e.sort((function(t,e){return t-e})),e.forEach((function(e){for(var r=0;r<t.length;r+=1)e===t[r].split(",")[0]&&n.push(t[r])})),n}(localStorage.getItem("arrayRatingUser").split("-")),e=0,n=!0;t.forEach((function(t){if(n){var r=t.split(",");r=r.slice(1),St[e].textContent=r[0],xt[e].textContent=r[1],Et[e].textContent=r[2],qt[e].textContent=r[3],(e+=1)>=10&&(n=!1)}}))}function wt(){var t=new Date,e=t.getDate(),n=t.getMonth()+1;n<10&&(n="0".concat(n));var r=t.getFullYear(),o=document.querySelector(".time"),a=document.querySelector(".moves"),c=o.textContent.slice(7),i=a.textContent.slice(7),u=b(),l=localStorage.getItem("saveTimeCounter"),s=[];s.push(l,"".concat(e,".").concat(n,".").concat(r)),s.push(c,i,"".concat(u,"x").concat(u)),function(t){if(localStorage.getItem("arrayRatingUser")){var e=localStorage.getItem("arrayRatingUser"),n="".concat(e,"-").concat(t);localStorage.setItem("arrayRatingUser",n)}else localStorage.setItem("arrayRatingUser",t)}(s),Ct()}function It(){o(yt,""),o(ht,"none")}vt.addEventListener("click",(function(){localStorage.getItem("arrayRatingUser")?(Ct(),It()):It()})),bt.addEventListener("click",(function(){o(yt,"none"),o(ht,"")}));var At=document.querySelector(".btn-new-game"),jt=document.querySelector(".btn-pause"),Mt=document.querySelectorAll(".main"),zt=document.querySelectorAll(".gratulate"),kt=document.querySelector(".exit-gratulate");function Gt(){localStorage.setItem("isGameStart","0"),localStorage.setItem("arraySaveGame","null"),C(),document.querySelector(".container-menu").style.display="",o(zt,""),o(Mt,"none"),jt.textContent="Пауза",function(){var t=document.querySelector(".message-gratulate"),e=document.querySelector(".time"),n=document.querySelector(".moves"),r=e.textContent.slice(7,e.textContent.length),o=n.textContent.slice(7,n.textContent.length);t.textContent="Вы решили головоломку за ".concat(r," и ").concat(o," ходов")}(),wt()}function Nt(){ct(gt())&&setTimeout((function(){Gt()}),1e3)}At.addEventListener("click",(function(){document.querySelectorAll(".element").forEach((function(t){t.addEventListener("click",Nt)}))})),kt.addEventListener("click",(function(){o(zt,"none"),o(Mt,"")}))}},e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}n.m=t,n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var r=e.getElementsByTagName("script");r.length&&(t=r[r.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t}(),function(){var t={179:0},e=[[1202,202],[5773,202]],r=function(){};function o(){for(var r,o=0;o<e.length;o++){for(var a=e[o],c=!0,i=1;i<a.length;i++){var u=a[i];0!==t[u]&&(c=!1)}c&&(e.splice(o--,1),r=n(n.s=a[0]))}return 0===e.length&&(n.x(),n.x=function(){}),r}n.x=function(){n.x=function(){},c=c.slice();for(var t=0;t<c.length;t++)a(c[t]);return(r=o)()};var a=function(o){for(var a,c,u=o[0],l=o[1],s=o[2],f=o[3],d=0,m=[];d<u.length;d++)c=u[d],n.o(t,c)&&t[c]&&m.push(t[c][0]),t[c]=0;for(a in l)n.o(l,a)&&(n.m[a]=l[a]);for(s&&s(n),i(o);m.length;)m.shift()();return f&&e.push.apply(e,f),r()},c=self.webpackChunk=self.webpackChunk||[],i=c.push.bind(c);c.push=a}(),n.x()}();