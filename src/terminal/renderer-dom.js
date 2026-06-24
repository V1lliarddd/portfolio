export function createDomRenderer(terminalLines, terminalBody) {
  function renderTerminal() {
    if (!terminalBody) return;

    terminalBody.innerHTML = "";

    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? "12px" : "14px";
    const lineHeight = isMobile ? "1.6" : "1.8";

    const displayLines = terminalLines.slice(-20);

    displayLines.forEach((line) => {
      const lineElement = document.createElement("div");
      lineElement.className = "terminal-line";

      lineElement.style.fontSize = fontSize;
      lineElement.style.lineHeight = lineHeight;

      let text = line.text;
      let color = "#00ff41";

      if (line.type === "path") {
        color = "#4a9eff";
      } else if (line.type === "error") {
        color = "#ff5f56";
      } else if (line.type === "command") {
        text = `root@portfolio:~$ ${text}`;
        color = "#ffffff";
      } else if (line.type === "prompt") {
        text = "root@portfolio:~$ " + (line.text || "");
        color = "#00ff41";
      }

      lineElement.style.color = color;
      lineElement.textContent = text;

      if (line.type === "prompt" && line.text === "") {
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        cursor.textContent = "▌";
        cursor.style.animation = "blink 0.8s infinite";
        if (isMobile) {
          cursor.style.width = "8px";
          cursor.style.height = "14px";
        }
        lineElement.appendChild(cursor);
      }

      terminalBody.appendChild(lineElement);
    });

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  return { renderTerminal };
}
