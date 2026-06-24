export const terminalScript = [
  {
    type: 'command',
    text: 'init hello',
    output: [
      'Привет! Меня зовут Камаев Даниил',
      "Я студент,",
      "Любительский разработчик игр",
      "И frontend developer."
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
    text: 'contacts',
    output: [
      'Доступные контакты:',
      '  github          — GitHub профиль',
      '  leetcode        — LeetCode профиль',
      '  hh              — HH.ru резюме',
      '  email           — Email',
      '',
      'Для открытия контакта: cd ./contacts/{имя_контакта}'
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
      '  contacts       — список контактов',
      '  cd ./contacts/{name} — открыть контакт',
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
      'Frontend Developer & Game Dev Enthusiast',
      'Люблю создавать интерактивные интерфейсы',
      'Изучаю Three.js и физические движки'
    ]
  }
];

export const projects = {
  'portfolio': {
    url: 'https://github.com/V1lliarddd/portfolio',
    description: 'Личное портфолио с 3D-терминалом'
  },
  'draggable-works': {
    url: 'https://github.com/V1lliarddd/game-engine',
    description: 'Физический движок на Matter.js'
  },
  'fiction-sandbox': {
    url: 'https://github.com/V1lliarddd/shader-lab',
    description: 'Эксперименты с GLSL шейдерами'
  }
};

export const contacts = {
  'github': {
    url: 'https://github.com/V1lliarddd',
    description: 'GitHub профиль',
  },
  'leetcode': {
    url: 'https://leetcode.com/u/V1lliard/',
    description: 'LeetCode профиль',
  },
  'hh': {
    url: 'https://hh.ru/resume/6b563057ff0b4853d90039ed1f7a4f67763048',
    description: 'Резюме на HH.ru',
  },
  'email': {
    url: 'mailto:V1lliard@yandex.ru',
    description: 'Email',
  }
};