const t={btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};let e=null;t.btnStart.addEventListener("click",(function(a){a.target.disabled=!0,t.btnStop.disabled=!1,e=setInterval((()=>{document.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.btnStop.addEventListener("click",(function(a){a.target.disabled=!0,t.btnStart.disabled=!1,clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.d2a0dd03.js.map