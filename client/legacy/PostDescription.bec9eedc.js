import{_ as t,a as n,b as a,c as r,i as s,s as o,d as c,S as e,P as f,f as i,v as u,e as l,t as h,j as p,k as v,w as $,h as g,l as m,g as d,m as y,n as R,x as b,o as x,C as D,E,u as P,y as j,z as w}from"./client.3629f1f4.js";function S(t){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var s,o=n(t);if(r){var c=n(this).constructor;s=Reflect.construct(o,arguments,c)}else s=o.apply(this,arguments);return a(this,s)}}function k(t){var n,a,r,s,o,c,e,S=t[0].data.title+"";return a=new f({props:{post:t[0]}}),{c:function(){n=i("div"),u(a.$$.fragment),r=l(),s=i("a"),o=h(S),this.h()},l:function(t){n=p(t,"DIV",{});var c=v(n);$(a.$$.fragment,c),r=g(c),s=p(c,"A",{href:!0});var e=v(s);o=m(e,S),e.forEach(d),c.forEach(d),this.h()},h:function(){y(s,"href",c="blog/".concat(t[0].slug))},m:function(t,c){R(t,n,c),b(a,n,null),x(n,r),x(n,s),x(s,o),e=!0},p:function(t,n){var r=D(n,1)[0],f={};1&r&&(f.post=t[0]),a.$set(f),(!e||1&r)&&S!==(S=t[0].data.title+"")&&E(o,S),(!e||1&r&&c!==(c="blog/".concat(t[0].slug)))&&y(s,"href",c)},i:function(t){e||(P(a.$$.fragment,t),e=!0)},o:function(t){j(a.$$.fragment,t),e=!1},d:function(t){t&&d(n),w(a)}}}function z(t,n,a){var r=n.post;return t.$$set=function(t){"post"in t&&a(0,r=t.post)},[r]}var A=function(n){t(f,e);var a=S(f);function f(t){var n;return r(this,f),n=a.call(this),s(c(n),t,z,k,o,{post:0}),n}return f}();export{A as P};