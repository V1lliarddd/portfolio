import * as THREE from 'three';

export function createScreenRenderer(terminalLines, screenMesh) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1536;
  const ctx = canvas.getContext('2d');

  let isFirstRender = true;

  function renderScreenTexture() {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '28px "Press Start 2P", monospace';
    ctx.textBaseline = 'top';

    let y = 50;
    const padding = 60;
    const maxWidth = canvas.width - padding * 2;
    const lineHeight = 48;

    const displayLines = terminalLines.slice(-30);

    displayLines.forEach((line) => {
      let color = '#00ff41';
      let text = line.text;

      if (line.type === 'path') {
        color = '#4a9eff';
      } else if (line.type === 'error') {
        color = '#ff5f56';
      } else if (line.type === 'command') {
        color = '#ffffff';
        text = `root@portfolio:~$ ${text}`;
      } else if (line.type === 'prompt') {
        text = 'root@portfolio:~$ ' + (line.text || '');
        color = '#00ff41';
      }

      ctx.fillStyle = color;

      let currentLine = '';
      const words = text.split(' ');

      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
          ctx.fillText(currentLine, padding, y);
          y += lineHeight;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        ctx.fillText(currentLine, padding, y);
        y += lineHeight;
      }
    });

    const lastLine = terminalLines[terminalLines.length - 1];
    if (lastLine && lastLine.type === 'prompt') {
      const time = Date.now() / 500;
      if (Math.floor(time) % 2 === 0) {
        ctx.fillStyle = '#00ff41';
        const promptText = 'root@portfolio:~$ ' + (lastLine.text || '');
        const width = ctx.measureText(promptText).width;
        ctx.fillText('▌', padding + width, y - lineHeight);
      }
    }

    if (screenMesh && screenMesh.material && screenMesh.material.map) {
      screenMesh.material.map.needsUpdate = true;
    }

    if (isFirstRender) {
      isFirstRender = false;
    }
  }

  const screenTexture = new THREE.CanvasTexture(canvas);
  screenTexture.minFilter = THREE.LinearFilter;
  screenTexture.magFilter = THREE.LinearFilter;
  if (screenMesh && screenMesh.material) {
    screenMesh.material.map = screenTexture;
    screenMesh.material.needsUpdate = true;
  }

  return { renderScreenTexture, canvas };
}
