import { handleUserCommand, getTerminalLines } from "../terminal/commands.js";

export function setupKeyboardInput(renderFn) {
  let currentInput = "";
  let isWaitingForInput = true;

  function updateCurrentPrompt() {
    const terminalLines = getTerminalLines();
    if (terminalLines.length > 0) {
      const lastLine = terminalLines[terminalLines.length - 1];
      if (lastLine.type === "prompt") {
        lastLine.text = currentInput;
        if (renderFn) renderFn();
      }
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (isWaitingForInput) {
        const command = currentInput.trim();

        if (command) {
          isWaitingForInput = false;

          const terminalLines = getTerminalLines();
          const lastLine = terminalLines[terminalLines.length - 1];
          if (lastLine && lastLine.type === "prompt") {
            lastLine.type = "command";
            lastLine.text = command;
            if (renderFn) renderFn();
          }

          handleUserCommand(command);
          currentInput = "";
        }
      }
      return;
    }

    if (isWaitingForInput) {
      e.preventDefault();

      if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateCurrentPrompt();
      } else if (e.key === "Escape") {
        currentInput = "";
        updateCurrentPrompt();
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        currentInput += e.key;
        updateCurrentPrompt();
      }
    }
  });

  return {
    setWaitingForInput: (value) => {
      isWaitingForInput = value;
      if (value) {
        currentInput = "";
        updateCurrentPrompt();
      }
    },
  };
}
