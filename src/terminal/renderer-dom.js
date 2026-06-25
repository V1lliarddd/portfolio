import { handleUserCommand, getTerminalLines } from './commands.js';

export function createDomRenderer(terminalLines, terminalBody) {
  let inputElement = null;

  function renderTerminal() {
    if (!terminalBody) return;

    const scrollTop = terminalBody.scrollTop;
    terminalBody.innerHTML = '';

    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? '16px' : '14px';
    const lineHeight = isMobile ? '1.8' : '1.8';

    const displayLines = terminalLines.slice(-50);

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
        const container = document.createElement('div');
        container.style.display = 'inline-block';
        container.style.width = '100%';

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
          padding: 4px 0;
          margin: 0;
          display: inline-block;
          -webkit-appearance: none;
          appearance: none;
          min-height: 30px;
          position: relative;
          z-index: 10;
        `;
        input.autofocus = true;
        input.placeholder = ' ';
        container.appendChild(input);
        lineElement.appendChild(container);
        inputElement = input;

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
              const lines = getTerminalLines();
              if (lines.length > 0) {
                const lastLine = lines[lines.length - 1];
                if (lastLine.type === 'prompt') {
                  lines.pop();
                }
              }
              handleUserCommand(command);
              input.value = '';
              renderTerminal();
            }
          }
          e.stopPropagation();
        });

        // iOS: постоянный фокус
        input.addEventListener('blur', (e) => {
          e.preventDefault();
          setTimeout(() => {
            if (inputElement) {
              inputElement.focus();
            }
          }, 50);
        });

        input.addEventListener('focus', () => {});

        setTimeout(() => {
          if (inputElement) {
            inputElement.focus();
            // Ставим курсор в конец
            const len = inputElement.value.length;
            if (inputElement.setSelectionRange) {
              inputElement.setSelectionRange(len, len);
            }
          }
        }, 300);
      } else {
        lineElement.textContent = text;
      }

      terminalBody.appendChild(lineElement);
    });

    if (scrollTop > 0) {
      terminalBody.scrollTop = scrollTop;
    } else {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  function focusInput() {
    if (inputElement) {
      inputElement.focus();
      const len = inputElement.value.length;
      if (inputElement.setSelectionRange) {
        inputElement.setSelectionRange(len, len);
      }
    }
  }

  return { renderTerminal, focusInput };
}
