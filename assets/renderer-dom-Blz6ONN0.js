import{T as e,w as t}from"./index-CA-Yy5ZO.js";function n(n,r){let i=null,a=``;function o(){if(!r)return;let s=r.scrollTop;r.innerHTML=``;let c=window.innerWidth<768?`16px`:`14px`;n.slice(-50).forEach(n=>{let s=document.createElement(`div`);s.className=`terminal-line`,s.style.fontSize=c,s.style.lineHeight=`1.8`;let l=n.text,u=`#00ff41`;if(n.type===`path`?u=`#4a9eff`:n.type===`error`?u=`#ff5f56`:n.type===`command`?(l=`root@portfolio:~$ ${l}`,u=`#ffffff`):n.type===`prompt`&&(l=`root@portfolio:~$ `+(n.text||``),u=`#00ff41`),s.style.color=u,n.type===`prompt`&&n.text===``){let n=a,r=document.createElement(`input`);r.type=`text`,r.className=`command-input`,r.style.cssText=`
          background: transparent;
          border: none;
          color: ${u};
          font-family: 'Press Start 2P', monospace;
          font-size: ${c};
          outline: none;
          width: 100%;
          caret-color: #00ff41;
          padding: 4px 0;
          margin: 0;
          display: inline-block;
          -webkit-appearance: none;
          appearance: none;
          min-height: 30px;
        `,r.autofocus=!0,r.placeholder=` `,s.appendChild(r),i=r,n&&(r.value=n,a=n),r.addEventListener(`input`,e=>{a=e.target.value}),r.addEventListener(`keydown`,n=>{if(n.key===`Enter`){let n=r.value.trim();if(n){a=``;let r=t();r.length>0&&r[r.length-1].type===`prompt`&&r.pop(),e(n),o()}}}),r.addEventListener(`blur`,()=>{setTimeout(()=>{i&&document.activeElement!==i&&i.focus()},10)}),setTimeout(()=>{if(i){i.focus();let e=i.value.length;i.setSelectionRange(e,e)}},100)}else s.textContent=l;r.appendChild(s)}),s>0?r.scrollTop=s:r.scrollTop=r.scrollHeight}function s(){if(i){i.focus();let e=i.value.length;i.setSelectionRange(e,e)}}return{renderTerminal:o,focusInput:s}}export{n as createDomRenderer};