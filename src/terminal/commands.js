import { terminalScript, projects, contacts } from './data.js';

let terminalLines = [];
let renderScreenTexture = null;
let isWaitingForInput = false;
let currentInput = '';

export function setRenderFunction(fn) {
  renderScreenTexture = fn;
}

export function getCurrentInput() {
  return currentInput;
}

export function setInputState(setter, getter) {
  isWaitingForInput = setter;
  currentInput = getter;
}

function addTerminalLine(text, type = 'output') {
  terminalLines.push({ text, type });
  if (renderScreenTexture) renderScreenTexture();
}

function addCommandLine(command) {
  terminalLines.push({ text: command, type: 'command' });
  if (renderScreenTexture) renderScreenTexture();
}

export function clearTerminalLines() {
  terminalLines = [];
  if (renderScreenTexture) renderScreenTexture();
}

export function getTerminalLines() {
  return terminalLines;
}

function executeCommand(command, outputLines, delay = 200) {
  return new Promise((resolve) => {
    addCommandLine(command);
    
    setTimeout(() => {
      outputLines.forEach((line, index) => {
        setTimeout(() => {
          addTerminalLine(line, 'output');
          if (index === outputLines.length - 1) {
            resolve();
          }
        }, index * 200);
      });
    }, 200);
  });
}

function handleCdCommand(args) {
  if (args.startsWith('./projects/')) {
    const projectName = args.replace('./projects/', '').trim();
    if (!projectName) {
      addTerminalLine('Укажите имя проекта', 'error');
      return;
    }
    const project = projects[projectName];
    if (!project) {
      addTerminalLine(`Проект "${projectName}" не найден`, 'error');
      addTerminalLine(`Доступные: ${Object.keys(projects).join(', ')}`, 'output');
      return;
    }
    window.open(project.url, '_blank');
    addTerminalLine(`Открываю "${projectName}"...`, 'path');
    return;
  }
  
  if (args.startsWith('./contacts/')) {
    const contactName = args.replace('./contacts/', '').trim();
    if (!contactName) {
      addTerminalLine('Укажите имя контакта', 'error');
      return;
    }
    const contact = contacts[contactName];
    if (!contact) {
      addTerminalLine(`Контакт "${contactName}" не найден`, 'error');
      return;
    }
    window.open(contact.url, '_blank');
    addTerminalLine(`Открываю "${contactName}"...`, 'path');
    return;
  }
  
  addTerminalLine('Использование: cd ./projects/{имя} или cd ./contacts/{имя}', 'error');
}

export function handleUserCommand(command) {
  if (command.startsWith('cd ')) {
    handleCdCommand(command.substring(3).trim());
    setTimeout(() => {
      addTerminalLine('', 'prompt');
      isWaitingForInput = true;
      currentInput = '';
      if (renderScreenTexture) renderScreenTexture();
    }, 300);
    return;
  }
  
  const found = terminalScript.find(cmd => cmd.text === command);
  
  if (found) {
    found.output.forEach((line, index) => {
      setTimeout(() => {
        addTerminalLine(line, 'output');
        if (index === found.output.length - 1) {
          setTimeout(() => {
            addTerminalLine('', 'prompt');
            isWaitingForInput = true;
            currentInput = '';
            if (renderScreenTexture) renderScreenTexture();
          }, 200);
        }
      }, index * 150);
    });
    return;
  }
  
  if (command === 'clear') {
    clearTerminalLines();
    addTerminalLine('Welcome to Daniil Kamaev\'s Portfolio Terminal v1.0', 'path');
    addTerminalLine('Type "help" to see available commands.', 'path');
    setTimeout(() => {
      addTerminalLine('', 'prompt');
      isWaitingForInput = true;
      currentInput = '';
      if (renderScreenTexture) renderScreenTexture();
    }, 200);
    return;
  }
  
  addTerminalLine(`Command not found: ${command}. Type 'help'`, 'error');
  setTimeout(() => {
    addTerminalLine('', 'prompt');
    isWaitingForInput = true;
    currentInput = '';
    if (renderScreenTexture) renderScreenTexture();
  }, 300);
}

export async function loadTerminal() {
  addTerminalLine('Welcome to Daniil Kamaev\'s Portfolio Terminal v1.0', 'path');
  addTerminalLine('Type "help" to see available commands.', 'path');
  
  for (const step of terminalScript) {
    if (step.text === 'init hello' || step.text === 'whoami') {
      await executeCommand(step.text, step.output, step.delay || 200);
    }
  }
  
  setTimeout(() => {
    addTerminalLine('', 'prompt');
    isWaitingForInput = true;
    currentInput = '';
    if (renderScreenTexture) renderScreenTexture();
  }, 300);
}