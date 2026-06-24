import{T as e,w as t}from"./index-CW9KlgVR.js";var n=!1;function r(r,i){function a(){if(n)return;if(n=!0,!i){n=!1;return}i.innerHTML=``;let o=window.innerWidth<768,s=o?`12px`:`14px`,c=o?`1.6`:`1.8`;r.slice(-20).forEach(n=>{let r=document.createElement(`div`);r.className=`terminal-line`,r.style.fontSize=s,r.style.lineHeight=c;let o=n.text,l=`#00ff41`;if(n.type===`path`?l=`#4a9eff`:n.type===`error`?l=`#ff5f56`:n.type===`command`?(o=`root@portfolio:~$ ${o}`,l=`#ffffff`):n.type===`prompt`&&(o=`root@portfolio:~$ `+(n.text||``),l=`#00ff41`),r.style.color=l,n.type===`prompt`&&n.text===``){let n=document.createElement(`input`);n.type=`text`,n.className=`command-input`,n.style.cssText=`
          background: transparent;
          border: none;
          color: ${l};
          font-family: 'Press Start 2P', monospace;
          font-size: ${s};
          outline: none;
          width: 100%;
          caret-color: #00ff41;
          padding: 0;
          margin: 0;
          display: inline-block;
        `,n.autofocus=!0,r.appendChild(n),n.addEventListener(`keydown`,r=>{if(r.key===`Enter`){let r=n.value.trim();if(r){let i=t();if(i.length>0){let e=i[i.length-1];e.type===`prompt`&&(e.type=`command`,e.text=r)}e(r),n.value=``,a()}}}),setTimeout(()=>{n.focus()},100)}else r.textContent=o;i.appendChild(r)}),i.scrollTop=i.scrollHeight,n=!1}return{renderTerminal:a}}export{r as createDomRenderer};