(this.webpackJsonpkurssitiedot=this.webpackJsonpkurssitiedot||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),u=n.n(r),o=n(13),c=n.n(o),i=n(3),l=n.n(i),m="https://phonebookback.herokuapp.com/api/persons",f=function(){return l.a.get(m).then((function(e){return e.data}))},s=function(e){return l.a.post(m,e).then((function(e){return e.data}))},d=function(e){return l.a.delete("".concat(m,"/").concat(e))},b=function(e,t){return l.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))},v=(n(36),function(e){var t=e.message;return null===t?null:u.a.createElement("div",{className:"error"},t)}),h=function(e){return u.a.createElement("div",null,e.item.name," ",e.item.number," ",u.a.createElement("button",{onClick:function(){return e.deleteNumber(e.item.id)}},"Delete"))},p=function(e){return u.a.createElement("div",null,e.persons.map((function(t){return u.a.createElement(h,{key:t.id,item:t,deleteNumber:e.deleteNumber})})))},g=function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),i=Object(a.a)(c,2),l=i[0],m=i[1],h=Object(r.useState)(""),g=Object(a.a)(h,2),E=g[0],w=g[1],j=Object(r.useState)(""),O=Object(a.a)(j,2),k=O[0],C=O[1],S=Object(r.useState)([]),N=Object(a.a)(S,2),y=N[0],L=N[1],A=Object(r.useState)(null),D=Object(a.a)(A,2),P=D[0],x=D[1];Object(r.useEffect)((function(){f().then((function(e){o(e),L(e)}))}),[]);return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(v,{message:P}),"Filter names: ",u.a.createElement("input",{value:k,onChange:function(e){if(C(e.target.value),console.log(k),0===e.target.value.length)L(n);else{var t=n.filter((function(t){for(var n=0;n<e.target.value.length;n++)if(t.name.toLowerCase().charAt(n)!==e.target.value.toLowerCase().charAt(n))return!1;return!0}));console.log(t),L(t)}}}),u.a.createElement("h2",null,"Add new number"),u.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=n.findIndex((function(e){return e.name.toLowerCase()===l.toLowerCase()})),a={name:l,number:E};if(-1===t)s(a).then((function(e){o(n.concat(e)),L(y.concat(e))})).catch((function(e){x("".concat(e.response.data.error)),setTimeout((function(){x(null)}),5e3)}));else{var r=n[t];if(!window.confirm("Do we change ".concat(r.name," number?")))return;b(r.id,a).then((function(e){o(n.map((function(t){return t.id!==e.id?t:e}))),L(y.map((function(t){return t.id!==e.id?t:e})))})).catch((function(e){x("Person '".concat(a.name,"' was already removed from server")),setTimeout((function(){x(null)}),5e3),o(n.filter((function(e){return e.id!==r.id}))),L(y.filter((function(e){return e.id!==r.id})))}))}m(""),w("")}},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:l,onChange:function(e){console.log(e.target.value),m(e.target.value)}}),"number: ",u.a.createElement("input",{value:E,onChange:function(e){console.log(e.target.value),w(e.target.value)}})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add"))),u.a.createElement("h2",null,"Numbers"),u.a.createElement(p,{persons:y,deleteNumber:function(e){window.confirm("Shall we delete?")&&(console.log("Poistit ",e),d(e).then((function(t){var a=n.filter((function(t){return t.id!==e}));o(a);var r=y.filter((function(t){return t.id!==e}));L(r)})))}}))};c.a.render(u.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.590b78dd.chunk.js.map