import { handleUserCommand, getTerminalLines } from './commands.js';

let isRendering = false;

export function createDomRenderer(terminalLines, terminalBody) {
  function renderTerminal() {
    if (isRendering) return;
    isRendering = true;

    if (!terminalBody) {
      isRendering = false;
      return;
    }

    terminalBody.innerHTML = '';

    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? '12px' : '14px';
    const lineHeight = isMobile ? '1.6' : '1.8';

    const displayLines = terminalLines.slice(-20);

    displayLines.forEach((line) => {
      const lineElement = document.createElement('div');
      lineElement.className = 'terminal-line';

      lineElement.style.fontSize = fontSize;
      lineElement.style.lineHeight = lineHeight;

      let text = line.text;
      let color = '#00ff41';

      if (line.type === 'path') {
        color = '#4a9eff';
      } else if (line.type === 'error') {
        color = '#ff5f56';
      } else if (line.type === 'command') {
        text = `root@portfolio:~$ ${text}`;
        color = '#ffffff';
      } else if (line.type === 'prompt') {
        text = 'root@portfolio:~$ ' + (line.text || '');
        color = '#00ff41';
      }

      lineElement.style.color = color;

      if (line.type === 'prompt' && line.text === '') {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'command-input';
        input.style.cssText = `
          background: transparent;
          border: none;
          color: ${color};
          font-family: 'Press Start 2P', monospace;
          font-size: ${fontSize};
          outline: none;
          width: 100%;
          caret-color: #00ff41;
          padding: 0;
          margin: 0;
          display: inline-block;
        `;
        input.autofocus = true;
        lineElement.appendChild(input);

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
              const lines = getTerminalLines();
              if (lines.length > 0) {
                const lastLine = lines[lines.length - 1];
                if (lastLine.type === 'prompt') {
                  lastLine.type = 'command';
                  lastLine.text = command;
                }
              }
              handleUserCommand(command);
              input.value = '';
              renderTerminal();
            }
          }
        });

        setTimeout(() => {
          input.focus();
        }, 100);
      } else {
        lineElement.textContent = text;
      }

      terminalBody.appendChild(lineElement);
    });

    terminalBody.scrollTop = terminalBody.scrollHeight;
    isRendering = false;
  }

  return { renderTerminal };
}
