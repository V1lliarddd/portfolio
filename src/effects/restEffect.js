export function triggerRestEffect() {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.id = 'rest-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      pointer-events: none;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.8s ease;
      flex-direction: column;
      padding: 20px;
    `;
    document.body.appendChild(overlay);

    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? '18px' : '24px';
    const shadowSize = isMobile
      ? '0 0 20px rgba(0, 255, 65, 0.2)'
      : '0 0 40px rgba(0, 255, 65, 0.3)';

    const text = document.createElement('div');
    text.id = 'rest-text';
    text.style.cssText = `
      color: #00ff41;
      font-family: 'Press Start 2P', monospace;
      font-size: ${fontSize};
      opacity: 0;
      transition: opacity 0.8s ease;
      text-shadow: ${shadowSize};
      text-align: center;
      line-height: 2;
      max-width: 90%;
      word-break: break-word;
    `;
    text.innerHTML = 'Не могу больше. Нужно отдохнуть...';
    overlay.appendChild(text);

    setTimeout(() => {
      overlay.style.background = 'rgba(0, 0, 0, 0.85)';
      overlay.style.backdropFilter = 'blur(12px)';
      overlay.style.webkitBackdropFilter = 'blur(12px)';
      text.style.opacity = '1';
    }, 100);

    setTimeout(() => {
      overlay.style.background = 'rgba(0, 0, 0, 0)';
      overlay.style.backdropFilter = 'blur(0px)';
      overlay.style.webkitBackdropFilter = 'blur(0px)';
      text.innerHTML = 'Уффф. Так на чем я там остановился?';
      text.style.color = '#00ff41';

      setTimeout(() => {
        text.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
          resolve();
        }, 500);
      }, 1500);
    }, 2200);
  });
}
