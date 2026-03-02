import{r as l,j as e}from"./react-core-DKgYvWpl.js";import{c as i,B as h,T as x}from"./index-DuALmYPw.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]],j=i("check-check",u);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]],f=i("clock-3",m);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],r=i("file-warning",y),k=[{id:"n1",title:"اقتراب انتهاء وثيقة مركبة",message:"المركبة 734-125-16: رخصة السير تنتهي خلال 18 يوماً.",date:"02/03/2026",type:"vehicle-doc",read:!1},{id:"n2",title:"اقتراب انتهاء رخصة سائق",message:"رخصة السائق رضا ماحي تنتهي خلال 23 يوماً.",date:"02/03/2026",type:"driver-license",read:!1},{id:"n3",title:"تأخر رحلة",message:"الرحلة TR-2404 متأخرة بـ 1س و40د عن الموعد المتوقع.",date:"01/03/2026",type:"trip-delay",read:!0},{id:"n4",title:"طلب رحلة جديد",message:"عميل جديد طلب رحلة من الجزائر إلى الجلفة.",date:"01/03/2026",type:"new-request",read:!1}],N=()=>[...k],g=a=>{switch(a){case"vehicle-doc":return e.jsx(r,{size:16});case"driver-license":return e.jsx(r,{size:16});case"trip-delay":return e.jsx(f,{size:16});case"new-request":return e.jsx(x,{size:16});default:return e.jsx(h,{size:16})}},q=()=>{const[a,n]=l.useState(N()),d=l.useMemo(()=>a.filter(s=>!s.read).length,[a]),o=s=>{n(c=>c.map(t=>t.id===s?{...t,read:!t.read}:t))},p=()=>{n(s=>s.map(c=>({...c,read:!0})))};return e.jsxs("section",{className:"page-section",children:[e.jsx("div",{className:"panel fade-in-up",children:e.jsxs("div",{className:"trips-head",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"panel-title",children:"الإشعارات والتنبيهات"}),e.jsxs("p",{className:"panel-subtitle",children:["غير المقروء: ",d]})]}),e.jsxs("button",{className:"ghost-btn",onClick:p,children:[e.jsx(j,{size:16}),"تحديد الكل كمقروء"]})]})}),e.jsx("div",{className:"panel fade-in-up",children:e.jsx("ul",{className:"alerts-list",children:a.map(s=>e.jsxs("li",{className:`notification-row ${s.read?"read":"unread"}`,children:[e.jsxs("div",{className:"fleet-doc-row",children:[g(s.type),e.jsxs("div",{children:[e.jsx("p",{children:s.title}),e.jsx("small",{children:s.message})]})]}),e.jsxs("div",{className:"trips-actions",children:[e.jsx("small",{children:s.date}),e.jsx("button",{className:"ghost-btn",onClick:()=>o(s.id),children:s.read?"غير مقروء":"مقروء"})]})]},s.id))})})]})};export{q as default};
