import{T as e,w as t}from"./index-D1E9GR8k.js";function n(n,r){function i(){if(!r)return;r.innerHTML=``,window.innerWidth;let a=`14px`,o=[],s=!1;for(let e of n){if(e.type===`command`){let t=e.text.trim().split(` `)[0];if(t===`cowsay`||t===`neofetch`){o.push(e);let t=o[o.length-1];(!t||t.text!==`  Доступно только в ПК версии`)&&o.push({text:`  Доступно только в ПК версии`,type:`output`}),s=!0;continue}}if(s&&e.type===`output`){let t=e.text.includes(`┌─`)||e.text.includes(`^__^`)||e.text.includes(`(oo)`)||e.text.includes(`\\   ^__^`)||e.text.includes(`\\  (oo)`),n=e.text.includes(`DANIIL KAMAEV`)||e.text.includes(`Skills:`)||e.text.includes(`Uptime:`)||e.text.includes(`Shell:`)||e.text.includes(`CPU:`)||e.text.includes(`GitHub`)||e.text.includes(`LeetCode`);if(t||n)continue;s=!1}if(e.type===`output`&&e.text===`  Доступно только в ПК версии`){let e=o[o.length-1];if(e&&e.text===`  Доступно только в ПК версии`)continue}o.push(e)}o.slice(-50).forEach(n=>{let o=document.createElement(`div`);o.className=`terminal-line`,o.style.fontSize=a,o.style.lineHeight=`1.8`;let s=n.text,c=`#00ff41`;if(n.type===`path`?c=`#4a9eff`:n.type===`error`?c=`#ff5f56`:n.type===`command`?(s=`root@portfolio:~$ ${s}`,c=`#ffffff`):n.type===`prompt`&&(s=`root@portfolio:~$ `+(n.text||``),c=`#00ff41`),o.style.color=c,n.type===`prompt`&&n.text===``){let n=document.createElement(`input`);n.type=`text`,n.className=`command-input`,n.style.cssText=`
          background: transparent;
          border: none;
          color: ${c};
          font-family: 'Press Start 2P', monospace;
          font-size: ${a};
          outline: none;
          width: 100%;
          caret-color: #00ff41;
          padding: 4px 0;
          margin: 0;
          display: inline-block;
          -webkit-appearance: none;
          appearance: none;
          min-height: 30px;
        `,n.autofocus=!0,n.placeholder=` `,o.appendChild(n),n.addEventListener(`keydown`,r=>{if(r.key===`Enter`){let r=n.value.trim();if(r){let a=t();a.length>0&&a[a.length-1].type===`prompt`&&a.pop(),e(r),n.value=``,i()}}}),setTimeout(()=>{n.focus()},300)}else o.textContent=s;r.appendChild(o)}),r.scrollTop=r.scrollHeight}return{renderTerminal:i}}export{n as createDomRenderer};