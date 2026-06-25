import { handleUserCommand, getTerminalLines } from './commands.js';

export function createDomRenderer(terminalLines, terminalBody) {
  function renderTerminal() {
    if (!terminalBody) return;

    terminalBody.innerHTML = '';

    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? '14px' : '14px';
    const lineHeight = isMobile ? '1.8' : '1.8';

    const filteredLines = [];
    let skipOutput = false;

    for (const line of terminalLines) {
      if (line.type === 'command') {
        const cmdText = line.text.trim().split(' ')[0];
        if (cmdText === 'cowsay' || cmdText === 'neofetch') {
          filteredLines.push(line);
          const lastLine = filteredLines[filteredLines.length - 1];
          if (!lastLine || lastLine.text !== '  Доступно только в ПК версии') {
            filteredLines.push({
              text: '  Доступно только в ПК версии',
              type: 'output'
            });
          }
          skipOutput = true;
          continue;
        }
      }

      if (skipOutput && line.type === 'output') {
        const isCowsay =
          line.text.includes('┌─') ||
          line.text.includes('^__^') ||
          line.text.includes('(oo)') ||
          line.text.includes('\\   ^__^') ||
          line.text.includes('\\  (oo)');
        const isNeofetch =
          line.text.includes('DANIIL KAMAEV') ||
          line.text.includes('Skills:') ||
          line.text.includes('Uptime:') ||
          line.text.includes('Shell:') ||
          line.text.includes('CPU:') ||
          line.text.includes('GitHub') ||
          line.text.includes('LeetCode');
        if (isCowsay || isNeofetch) {
          continue;
        }
        skipOutput = false;
      }

      if (
        line.type === 'output' &&
        line.text === '  Доступно только в ПК версии'
      ) {
        const prevLine = filteredLines[filteredLines.length - 1];
        if (prevLine && prevLine.text === '  Доступно только в ПК версии') {
          continue;
        }
      }

      filteredLines.push(line);
    }

    const displayLines = filteredLines.slice(-50);

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
          padding: 4px 0;
          margin: 0;
          display: inline-block;
          -webkit-appearance: none;
          appearance: none;
          min-height: 30px;
        `;
        input.autofocus = true;
        input.placeholder = ' ';
        lineElement.appendChild(input);

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
        });

        setTimeout(() => {
          input.focus();
        }, 300);
      } else {
        lineElement.textContent = text;
      }

      terminalBody.appendChild(lineElement);
    });

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  return { renderTerminal };
}
