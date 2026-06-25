import{T as e,w as t}from"./index-CWie7ErB.js";function n(n,r){let i=null;function a(){if(!r)return;r.innerHTML=``;let o=window.innerWidth<768?`16px`:`14px`;n.slice(-50).forEach(n=>{let s=document.createElement(`div`);s.className=`terminal-line`,s.style.fontSize=o,s.style.lineHeight=`1.8`;let c=n.text,l=`#00ff41`;if(n.type===`path`?l=`#4a9eff`:n.type===`error`?l=`#ff5f56`:n.type===`command`?(c=`root@portfolio:~$ ${c}`,l=`#ffffff`):n.type===`prompt`&&(c=`root@portfolio:~$ `+(n.text||``),l=`#00ff41`),s.style.color=l,n.type===`prompt`&&n.text===``){let n=document.createElement(`div`);n.style.display=`inline-block`,n.style.width=`100%`;let r=document.createElement(`input`);r.type=`text`,r.className=`command-input`,r.style.cssText=`
          background: transparent;
          border: none;
          color: ${l};
          font-family: 'Press Start 2P', monospace;
          font-size: ${o};
          outline: none;
          width: 100%;
          caret-color: #00ff41;
          padding: 4px 0;
          margin: 0;
          display: inline-block;
          -webkit-appearance: none;
          appearance: none;
          min-height: 30px;
          position: relative;
          z-index: 10;
        `,r.autofocus=!0,r.placeholder=` `,n.appendChild(r),s.appendChild(n),i=r,r.addEventListener(`keydown`,n=>{if(n.key===`Enter`){let n=r.value.trim();if(n){let i=t();i.length>0&&i[i.length-1].type===`prompt`&&i.pop(),e(n),r.value=``,a()}}n.stopPropagation()}),r.addEventListener(`blur`,e=>{e.preventDefault(),setTimeout(()=>{i&&i.focus()},50)}),setTimeout(()=>{if(i){i.focus();let e=i.value.length;i.setSelectionRange&&i.setSelectionRange(e,e)}},300)}else s.textContent=c;r.appendChild(s)}),r.scrollTop=r.scrollHeight}function o(){if(i){i.focus();let e=i.value.length;i.setSelectionRange&&i.setSelectionRange(e,e)}}return{renderTerminal:a,focusInput:o}}export{n as createDomRenderer};