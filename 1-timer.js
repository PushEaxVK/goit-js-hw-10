/* empty css                      */import{f as b,i as d}from"./assets/vendor-BZoxUzx5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function u(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();const r={btn:document.querySelector("button[data-start]"),days:document.querySelector("span[data-days]"),hours:document.querySelector("span[data-hours]"),minutes:document.querySelector("span[data-minutes]"),seconds:document.querySelector("span[data-seconds]"),inputDatetime:document.querySelector("input#datetime-picker")};r.btn.disabled=!0;let f,a;function c(t){return String(t).padStart(2,"0")}function l(t){const o=v(t);r.days.textContent=c(o.days),r.hours.textContent=c(o.hours),r.minutes.textContent=c(o.minutes),r.seconds.textContent=c(o.seconds)}function m(){a&&(clearInterval(a),a=null)}function p(){const t=f-new Date;return r.btn.disabled=!(t>0),l(r.btn.disabled?0:t),!r.btn.disabled}const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){f=t[0],p()||d.warning({title:"Caution",message:"Please choose a date in the future"}),m()}};b("input#datetime-picker",g);r.btn.addEventListener("click",t=>{m(),p()&&(r.btn.disabled=!0,r.inputDatetime.disabled=!0,d.info({title:"Info",message:"Timer is start!"}),a=setInterval(()=>{const s=f-new Date;l(s),s<1e3&&(clearInterval(a),l(0),r.btn.disabled=!1,r.inputDatetime.disabled=!1,d.success({title:"OK",message:"End of timer"}))},1e3))});function v(t){const n=Math.floor(t/864e5),i=Math.floor(t%864e5/36e5),y=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:n,hours:i,minutes:y,seconds:h}}
//# sourceMappingURL=1-timer.js.map
