const terminalScript = [
  {
    type: 'command',
    text: 'init hello',
    output: [
      'Привет! Меня зовут Камаев Даниил',
      'Я студент,',
      'Любительский разработчик игр',
      'И frontend developer.'
    ]
  },
  {
    type: 'command',
    text: 'show skills',
    output: [
      'JavaScript / TypeScript',
      'React / Next.js',
      'Three.js / GSAP',
      'Matter.js / Lenis'
    ]
  },
  {
    type: 'command',
    text: 'experience',
    output: [
      '2017 — Начало пути: print("Hello world!")',
      '2022 — МГБОУ Колледж Царицыно (с отличием)',
      '2023 — НИЯУ МЭИ (до 2027)',
      '2024 — Яндекс Практикум',
      '2025 — Three.js, шейдеры, моды для игр'
    ]
  },
  {
    type: 'command',
    text: 'projects',
    output: [
      'Доступные проекты:',
      '  portfolio       — Личное портфолио с 3D-терминалом',
      '  draggable-works     — Бесконечный draggable field',
      '  fiction-sandbox      — Библиотека с анимациями',
      '',
      'Для перехода в проект: cd ./projects/{имя_проекта}'
    ]
  },
  {
    type: 'command',
    text: 'contact',
    output: [
      'GitHub: github.com/V1lliarddd',
      'LeetCode: leetcode.com/u/V1lliard/',
      'HH.ru: резюме на hh.ru',
      'Email: V1lliard@yandex.ru'
    ]
  },
  {
    type: 'command',
    text: 'help',
    output: [
      'Доступные команды:',
      '  init hello     — приветствие',
      '  show skills    — список технологий',
      '  experience     — мой путь в IT',
      '  projects       — список проектов',
      '  cd ./projects/{name} — открыть проект на GitHub',
      '  contacts        — контакты',
      '  cd ./contacts/{name} — открыть соответствующий контакт',
      '  help           — эта справка',
      '  clear          — очистить терминал',
      '  whoami         — информация обо мне'
    ]
  },
  {
    type: 'command',
    text: 'whoami',
    output: [
      'Даниил Камаев',
      'Москва, Россия',
      'Frontend и Game Developer',
      'Люблю создавать интерактивные интерфейсы'
    ]
  }
];

const projects = {
  portfolio: {
    url: 'https://github.com/V1lliarddd/portfolio',
    description: 'Личное портфолио с 3D-терминалом'
  },
  'draggable-works': {
    url: 'https://github.com/V1lliarddd/FictionSandbox/tree/main/draggableWorks',
    description: 'Бесконечный draggable field'
  },
  'fiction-sandbox': {
    url: 'https://github.com/V1lliarddd/FictionSandbox/tree/main',
    description: 'Библиотека с анимациями'
  }
};

const contacts = {
  github: {
    url: 'https://github.com/V1lliarddd',
    description: 'GitHub профиль'
  },
  leetcode: {
    url: 'https://leetcode.com/u/V1lliard/',
    description: 'LeetCode профиль'
  },
  hh: {
    url: 'https://hh.ru/resume/6b563057ff0b4853d90039ed1f7a4f67763048',
    description: 'Резюме на HH.ru'
  },
  email: {
    url: 'mailto:V1lliard@yandex.ru',
    description: 'Email'
  }
};

const terminalBody = document.getElementById('terminalBody');
let commandHistory = [];
let historyIndex = -1;
let isUserInputActive = false;

function typeText(element, text, speed = 15, callback) {
  let index = 0;
  element.textContent = '';

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
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `
      <span class="prompt">
        <span class="path">root@portfolio</span>:<span class="symbol">~$</span>
      </span>
      <span class="command"></span>
    `;
    terminalBody.appendChild(commandLine);

    const commandSpan = commandLine.querySelector('.command');

    typeText(commandSpan, command, 40, () => {
      setTimeout(() => {
        outputLines.forEach((line, index) => {
          setTimeout(() => {
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line command-output';
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
  const promptLine = document.createElement('div');
  promptLine.className = 'terminal-line';
  promptLine.innerHTML = `
    <span class="prompt">
      <span class="path">root@portfolio</span>:<span class="symbol">~$</span>
    </span>
    <span class="command-input"></span>
  `;
  terminalBody.appendChild(promptLine);
  terminalBody.scrollTop = terminalBody.scrollHeight;

  const inputSpan = promptLine.querySelector('.command-input');
  setupCommandInput(inputSpan);
}

function setupCommandInput(inputSpan) {
  isUserInputActive = true;
  inputSpan.contentEditable = true;

  const focusHandler = () => inputSpan.focus();
  terminalBody.addEventListener('click', focusHandler);
  setTimeout(() => inputSpan.focus(), 50);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = inputSpan.textContent.trim();

      if (command === '') return;

      commandHistory.push(command);
      historyIndex = commandHistory.length;
      isUserInputActive = false;

      inputSpan.removeEventListener('keydown', handleKeyDown);
      inputSpan.removeEventListener('keyup', handleKeyUp);
      terminalBody.removeEventListener('click', focusHandler);
      inputSpan.contentEditable = false;

      handleUserCommand(command, inputSpan);
    } else if (e.key === 'ArrowUp') {
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
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputSpan.textContent = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        inputSpan.textContent = '';
      }
    }
  };

  const handleKeyUp = () => {};

  inputSpan.addEventListener('keydown', handleKeyDown);
  inputSpan.addEventListener('keyup', handleKeyUp);

  inputSpan.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    document.execCommand('insertText', false, text);
  });
}

function handleCdCommand(args) {
  if (args.startsWith('./projects/')) {
    handleProjectCommand(args);
  } else if (args.startsWith('./contacts/')) {
    handleContactCommand(args);
  } else {
    addOutputLine(
      'Использование: cd ./projects/{имя} или cd ./contacts/{имя}',
      'error'
    );
  }
}

function handleProjectCommand(args) {
  const projectName = args.replace('./projects/', '').trim();

  if (!projectName) {
    addOutputLine(
      'Укажите имя проекта. Например: cd ./projects/portfolio',
      'error'
    );
    return;
  }

  const project = projects[projectName];

  if (!project) {
    const availableProjects = Object.keys(projects).join(', ');
    addOutputLine(`Проект "${projectName}" не найден.`, 'error');
    addOutputLine(`Доступные проекты: ${availableProjects}`, 'output');
    return;
  }

  window.open(project.url, '_blank');
  addOutputLine(`Открываю проект "${projectName}"...`, 'path');
}

function handleContactCommand(args) {
  const contactName = args.replace('./contacts/', '').trim();

  if (!contactName) {
    addOutputLine(
      'Укажите имя контакта. Например: cd ./contacts/github',
      'error'
    );
    return;
  }

  const contact = contacts[contactName];

  if (!contact) {
    const availableContacts = Object.keys(contacts).join(', ');
    addOutputLine(`Контакт "${contactName}" не найден.`, 'error');
    addOutputLine(`Доступные контакты: ${availableContacts}`, 'output');
    return;
  }

  window.open(contact.url, '_blank');
  addOutputLine(`Открываю контакт "${contactName}"...`, 'path');
}

function addOutputLine(text, type = 'output') {
  const line = document.createElement('div');
  line.className = 'terminal-line command-output';
  if (type === 'error') line.style.color = '#ff5f56';
  if (type === 'path') line.style.color = '#4a9eff';
  line.textContent = text;
  terminalBody.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function showUserPrompt() {
  setTimeout(() => createUserPrompt(), 300);
}

function handleUserCommand(command, inputSpan) {
  if (command.startsWith('cd ')) {
    const args = command.substring(3).trim();
    handleCdCommand(args);
    showUserPrompt();
    return;
  }

  const found = terminalScript.find((cmd) => cmd.text === command);

  if (found) {
    const outputLines = found.output;

    setTimeout(() => {
      outputLines.forEach((line, index) => {
        setTimeout(() => {
          addOutputLine(line, 'output');
          if (index === outputLines.length - 1) {
            showUserPrompt();
          }
        }, index * 150);
      });
    }, 200);
  } else if (command === 'clear') {
    const lines = terminalBody.querySelectorAll('.terminal-line');
    lines.forEach((line) => line.remove());
    showUserPrompt();
  } else {
    addOutputLine(
      `Command not found: ${command}. Type 'help' for available commands.`,
      'error'
    );
    showUserPrompt();
  }
}

async function loadTerminal() {
  if (!terminalBody) {
    console.error('Terminal body not found!');
    return;
  }

  const welcomeLine = document.createElement('div');
  welcomeLine.className = 'terminal-line';
  welcomeLine.style.color = '#4a9eff';
  welcomeLine.style.marginBottom = '16px';
  welcomeLine.textContent =
    "Welcome to Daniil Kamaev's Portfolio Terminal v1.0";
  terminalBody.appendChild(welcomeLine);

  const helpLine = document.createElement('div');
  helpLine.className = 'terminal-line';
  helpLine.style.color = '#888';
  helpLine.style.marginBottom = '16px';
  helpLine.textContent = 'Type "help" to see available commands.';
  terminalBody.appendChild(helpLine);

  for (const step of terminalScript) {
    if (step.text === 'init hello' || step.text === 'whoami') {
      await executeCommand(step.text, step.output, step.delay || 200);
    }
  }

  setTimeout(() => {
    createUserPrompt();
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  loadTerminal();
});
