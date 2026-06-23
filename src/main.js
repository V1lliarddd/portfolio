import gsap from "gsap";
import { TextPlugin } from "gsap/all";

gsap.registerPlugin(TextPlugin);

// ============================================
// ТЕРМИНАЛ — ВЕСЬ КОНТЕНТ ЧЕРЕЗ КОМАНДЫ
// ============================================

const terminalScript = [
  {
    type: "command",
    text: "init hello",
    output: [
      "Hello! My name is Daniil Kamaev.",
      "I'm a student.",
      "I'm an amateur game developer.",
      "I'm a frontend developer.",
    ],
  },
  {
    type: "command",
    text: "show skills",
    output: [
      "JavaScript / TypeScript",
      "React / Next.js",
      "Three.js / GSAP",
      "Matter.js / Lenis",
    ],
  },
  {
    type: "command",
    text: "experience",
    output: [
      '2017 — Начало пути: print("Hello world!")',
      "2022 — МГБОУ Колледж Царицыно (с отличием)",
      "2023 — НИЯУ МЭИ (до 2027)",
      "2024 — Яндекс Практикум",
      "2025 — Three.js, шейдеры, моды для игр",
    ],
  },
  {
    type: "command",
    text: "projects",
    output: [
      "Type cd ./projects/{project} for more info",
      "Draggable Works — бесконечный охват проектов",
      "Fiction Sandbox — наработки с анимациями",
      "Course Work Loft — дипломный проект, он не закончен, но дорог мне как память"
    ],
  },
  {
    type: "command",
    text: "contact",
    output: [
      "Type cd ./projects/{contact} for more info",
      "GitHub: github.com/V1lliarddd",
      "LeetCode: leetcode.com/u/V1lliard/",
      "HH: резюме на hh.ru",
      "Email: daniil@example.com",
    ],
  },
  {
    type: "command",
    text: "help",
    output: [
      "Доступные команды:",
      "  init hello     — приветствие",
      "  show skills    — список технологий",
      "  experience     — мой путь в IT",
      "  projects       — мои проекты",
      "  contact        — контакты",
      "  help           — эта справка",
      "  clear          — очистить терминал",
      "  whoami         — информация обо мне",
    ],
  },
  {
    type: "command",
    text: "whoami",
    output: [
      "Daniil Kamaev",
      "Moscow, Russia",
      "Frontend Developer & Game Dev Enthusiast",
      "Люблю создавать интерактивные интерфейсы",
      "Изучаю Three.js и физические движки",
    ],
  },
];

let commandHistory = [];
let historyIndex = -1;
let isUserInputActive = false;

const terminalBody = document.getElementById("terminalBody");

function typeText(element, text, speed = 15, callback) {
  let index = 0;
  element.textContent = "";

  function type() {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  type();
}

function executeCommand(command, outputLines, delay = 200) {
  return new Promise((resolve) => {
    const commandLine = document.createElement("div");
    commandLine.className = "terminal-line";
    commandLine.innerHTML = `
      <span class="prompt">
        <span class="path">root@portfolio</span>:<span class="symbol">~$</span>
      </span>
      <span class="command"></span>
    `;
    terminalBody.appendChild(commandLine);

    const commandSpan = commandLine.querySelector(".command");

    typeText(commandSpan, command, 40, () => {
      setTimeout(() => {
        outputLines.forEach((line, index) => {
          setTimeout(() => {
            const outputLine = document.createElement("div");
            outputLine.className = "terminal-line command-output";
            outputLine.textContent = line;
            terminalBody.appendChild(outputLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;

            if (index === outputLines.length - 1) {
              resolve();
            }
          }, index * 200);
        });
      }, 200);
    });
  });
}

function createUserPrompt() {
  const promptLine = document.createElement("div");
  promptLine.className = "terminal-line";
  promptLine.innerHTML = `
    <span class="prompt">
      <span class="path">root@portfolio</span>:<span class="symbol">~$</span>
    </span>
    <span class="command-input"></span>
  `;
  terminalBody.appendChild(promptLine);
  terminalBody.scrollTop = terminalBody.scrollHeight;

  const inputSpan = promptLine.querySelector(".command-input");
  setupCommandInput(inputSpan);
}

function setupCommandInput(inputSpan) {
  isUserInputActive = true;
  inputSpan.contentEditable = true;

  const focusHandler = () => {
    inputSpan.focus();
  };
  terminalBody.addEventListener("click", focusHandler);

  setTimeout(() => inputSpan.focus(), 50);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = inputSpan.textContent.trim();

      if (command === "") return;

      commandHistory.push(command);
      historyIndex = commandHistory.length;

      isUserInputActive = false;

      inputSpan.removeEventListener("keydown", handleKeyDown);
      inputSpan.removeEventListener("keyup", handleKeyUp);
      terminalBody.removeEventListener("click", focusHandler);

      inputSpan.contentEditable = false;

      handleUserCommand(command, inputSpan);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        inputSpan.textContent = commandHistory[historyIndex];
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(inputSpan);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputSpan.textContent = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        inputSpan.textContent = "";
      }
    }
  };

  const handleKeyUp = () => {};

  inputSpan.addEventListener("keydown", handleKeyDown);
  inputSpan.addEventListener("keyup", handleKeyUp);

  inputSpan.addEventListener("paste", (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text");
    document.execCommand("insertText", false, text);
  });
}

function handleUserCommand(command, inputSpan) {
  const found = terminalScript.find((cmd) => cmd.text === command);

  if (found) {
    const outputLines = found.output;

    setTimeout(() => {
      outputLines.forEach((line, index) => {
        setTimeout(() => {
          const outputLine = document.createElement("div");
          outputLine.className = "terminal-line command-output";
          outputLine.textContent = line;
          terminalBody.appendChild(outputLine);
          terminalBody.scrollTop = terminalBody.scrollHeight;

          if (index === outputLines.length - 1) {
            setTimeout(() => {
              createUserPrompt();
            }, 300);
          }
        }, index * 150);
      });
    }, 200);
  } else if (command === "clear") {
    const lines = terminalBody.querySelectorAll(".terminal-line");
    lines.forEach((line) => line.remove());

    setTimeout(() => {
      createUserPrompt();
    }, 200);
  } else {
    const outputLine = document.createElement("div");
    outputLine.className = "terminal-line command-output";
    outputLine.style.color = "#ff5f56";
    outputLine.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
    terminalBody.appendChild(outputLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;

    setTimeout(() => {
      createUserPrompt();
    }, 300);
  }
}

async function loadTerminal() {
  if (!terminalBody) {
    console.error("Terminal body not found!");
    return;
  }

  const welcomeLine = document.createElement("div");
  welcomeLine.className = "terminal-line";
  welcomeLine.style.color = "#4a9eff";
  welcomeLine.style.marginBottom = "16px";
  welcomeLine.textContent =
    "Welcome to Daniil Kamaev's Portfolio Terminal v1.0";
  terminalBody.appendChild(welcomeLine);

  const helpLine = document.createElement("div");
  helpLine.className = "terminal-line";
  helpLine.style.color = "#888";
  helpLine.style.marginBottom = "16px";
  helpLine.textContent = 'Type "help" to see available commands.';
  terminalBody.appendChild(helpLine);

  for (const step of terminalScript) {
    if (step.text === "init hello" || step.text === "whoami") {
      await executeCommand(step.text, step.output, step.delay || 200);
    }
  }

  setTimeout(() => {
    createUserPrompt();
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  loadTerminal();
});
