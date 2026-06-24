import { terminalScript, projects, contacts } from "./data.js";
import { triggerRestEffect } from "../effects/restEffect.js";

let terminalLines = [];
let renderScreenTexture = null;
let keyboardControls = null;

export function setRenderFunction(fn) {
  renderScreenTexture = fn;
}

export function setKeyboardControls(controls) {
  keyboardControls = controls;
}

export function getTerminalLines() {
  return terminalLines;
}

function addTerminalLine(text, type = "output") {
  terminalLines.push({ text, type });
  if (renderScreenTexture) renderScreenTexture();
}

function addCommandLine(command) {
  terminalLines.push({ text: command, type: "command" });
  if (renderScreenTexture) renderScreenTexture();
}

export function clearTerminalLines() {
  terminalLines = [];
  if (renderScreenTexture) renderScreenTexture();
}

function executeCommand(command, outputLines, delay = 200) {
  return new Promise((resolve) => {
    addCommandLine(command);

    setTimeout(() => {
      outputLines.forEach((line, index) => {
        setTimeout(() => {
          addTerminalLine(line, "output");
          if (index === outputLines.length - 1) {
            resolve();
          }
        }, index * 200);
      });
    }, 200);
  });
}

function handleCdCommand(args) {
  if (args.startsWith("./projects/")) {
    const projectName = args.replace("./projects/", "").trim();
    if (!projectName) {
      addTerminalLine("Укажите имя проекта", "error");
      return;
    }
    const project = projects[projectName];
    if (!project) {
      addTerminalLine(`Проект "${projectName}" не найден`, "error");
      addTerminalLine(
        `Доступные: ${Object.keys(projects).join(", ")}`,
        "output",
      );
      return;
    }
    window.open(project.url, "_blank");
    addTerminalLine(`Открываю "${projectName}"...`, "path");
    addTerminalLine(`${project.url}`, "output");
    return;
  }

  if (args.startsWith("./contacts/")) {
    const contactName = args.replace("./contacts/", "").trim();
    if (!contactName) {
      addTerminalLine("Укажите имя контакта", "error");
      return;
    }
    const contact = contacts[contactName];
    if (!contact) {
      addTerminalLine(`Контакт "${contactName}" не найден`, "error");
      addTerminalLine(
        `Доступные: ${Object.keys(contacts).join(", ")}`,
        "output",
      );
      return;
    }
    window.open(contact.url, "_blank");
    addTerminalLine(`Открываю "${contactName}"...`, "path");
    addTerminalLine(`${contact.icon} ${contact.url}`, "output");
    return;
  }

  addTerminalLine(
    "Использование: cd ./projects/{имя} или cd ./contacts/{имя}",
    "error",
  );
}

export function handleUserCommand(command) {
  if (command.startsWith("cd ")) {
    handleCdCommand(command.substring(3).trim());
    setTimeout(() => {
      addTerminalLine("", "prompt");
      if (keyboardControls) {
        keyboardControls.setWaitingForInput(true);
      }
    }, 300);
    return;
  }

  if (command === "rest") {
    addCommandLine("rest");

    const messages = [
      "Не могу больше. Нужно отдохнуть...",
      "Уффф. Так на чем я там остановился?",
    ];

    messages.forEach((msg, index) => {
      setTimeout(() => {
        addTerminalLine(msg, "output");
      }, index * 700);
    });

    setTimeout(() => {
      triggerRestEffect();
    }, 400);

    setTimeout(() => {
      addTerminalLine("", "prompt");
      if (keyboardControls) {
        keyboardControls.setWaitingForInput(true);
      }
    }, 4500);

    return;
  }

  if (command === "cmatrix") {
    addCommandLine("cmatrix");

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()";
    let count = 0;
    const maxCount = 30;

    function renderMatrix() {
      let lines = [];
      for (let i = 0; i < 10; i++) {
        let line = "";
        for (let j = 0; j < 34; j++) {
          line += chars[Math.floor(Math.random() * chars.length)] + " ";
        }
        lines.push(line);
      }

      const currentLines = getTerminalLines();
      const cmatrixIndex = currentLines.findIndex(
        (line) => line.text && line.text.includes("cmatrix"),
      );
      const startIndex =
        cmatrixIndex !== -1 ? cmatrixIndex + 1 : currentLines.length;

      while (terminalLines.length > startIndex) {
        terminalLines.pop();
      }

      lines.forEach((line) => {
        terminalLines.push({ text: line, type: "output" });
      });

      if (renderScreenTexture) renderScreenTexture();

      count++;
      if (count < maxCount) {
        setTimeout(renderMatrix, 150);
      } else {
        terminalLines.push({ text: "", type: "output" });
        terminalLines.push({ text: "The Matrix has you...", type: "output" });
        terminalLines.push({
          text: "Follow the white rabbit.",
          type: "output",
        });
        terminalLines.push({ text: "", type: "output" });
        if (renderScreenTexture) renderScreenTexture();
        setTimeout(() => {
          addTerminalLine("", "prompt");
          if (keyboardControls) {
            keyboardControls.setWaitingForInput(true);
          }
        }, 300);
      }
    }

    setTimeout(renderMatrix, 100);
    return;
  }

  if (command === "clear") {
    terminalLines.length = 0;
    terminalLines.push(
      {
        text: "Welcome to Daniil Kamaev's Portfolio Terminal v1.0",
        type: "path",
      },
      { text: 'Type "help" to see available commands.', type: "path" },
    );
    if (renderScreenTexture) renderScreenTexture();
    setTimeout(() => {
      terminalLines.push({ text: "", type: "prompt" });
      if (renderScreenTexture) renderScreenTexture();
      if (keyboardControls) {
        keyboardControls.setWaitingForInput(true);
      }
    }, 100);
    return;
  }

  const parts = command.split(" ");
  const cmdName = parts[0];
  const args = parts.slice(1).join(" ");

  const found = terminalScript.find((cmd) => cmd.text === cmdName);

  if (found) {
    let outputLines;
    if (typeof found.output === "function") {
      outputLines = found.output(args);
    } else {
      outputLines = found.output;
    }

    addCommandLine(command);

    setTimeout(() => {
      outputLines.forEach((line, index) => {
        setTimeout(() => {
          addTerminalLine(line, "output");
          if (index === outputLines.length - 1) {
            setTimeout(() => {
              addTerminalLine("", "prompt");
              if (keyboardControls) {
                keyboardControls.setWaitingForInput(true);
              }
            }, 200);
          }
        }, index * 150);
      });
    }, 200);
    return;
  }

  addTerminalLine(`Command not found: ${command}. Type 'help'`, "error");
  setTimeout(() => {
    addTerminalLine("", "prompt");
    if (keyboardControls) {
      keyboardControls.setWaitingForInput(true);
    }
  }, 300);
}

export async function loadTerminal() {
  addTerminalLine("Welcome to Daniil Kamaev's Portfolio Terminal v1.0", "path");
  addTerminalLine('Type "help" to see available commands.', "path");

  setTimeout(() => {
    addTerminalLine("", "prompt");
    if (keyboardControls) {
      keyboardControls.setWaitingForInput(true);
    }
  }, 300);
}
