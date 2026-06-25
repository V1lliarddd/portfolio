import{T as e,w as t}from"./index-CX8XS6AC.js";function n(n,r){let i=null;function a(){if(!r)return;r.innerHTML=``;let o=window.innerWidth<768?`16px`:`14px`;n.slice(-50).forEach(n=>{let s=document.createElement(`div`);s.className=`terminal-line`,s.style.fontSize=o,s.style.lineHeight=`1.8`;let c=n.text,l=`#00ff41`;if(n.type===`path`?l=`#4a9eff`:n.type===`error`?l=`#ff5f56`:n.type===`command`?(c=`root@portfolio:~$ ${c}`,l=`#ffffff`):n.type===`prompt`&&(c=`root@portfolio:~$ `+(n.text||``),l=`#00ff41`),s.style.color=l,n.type===`prompt`&&n.text===``){let n=document.createElement(`input`);n.type=`text`,n.className=`command-input`,n.style.cssText=`
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
        `,n.autofocus=!0,n.placeholder=` `,s.appendChild(n),i=n,n.addEventListener(`keydown`,r=>{if(r.key===`Enter`){let r=n.value.trim();if(r){let i=t();i.length>0&&i[i.length-1].type===`prompt`&&i.pop(),e(r),n.value=``,a()}}}),n.addEventListener(`blur`,()=>{setTimeout(()=>{document.activeElement!==n&&n.focus()},10)}),setTimeout(()=>{n.focus()},300)}else s.textContent=c;r.appendChild(s)}),r.scrollTop=r.scrollHeight}function o(){i&&i.focus()}return{renderTerminal:a,focusInput:o}}export{n as createDomRenderer};