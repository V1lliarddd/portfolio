const startTime = Date.now();

export const terminalScript = [
  {
    type: "command",
    text: "hello",
    output: [
      "Привет! Меня зовут Камаев Даниил",
      "Я студент,",
      "Любительский разработчик игр",
      "И frontend developer.",
    ],
  },
  {
    type: "command",
    text: "skills",
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
      "2022 — МГБОУ Колледж 'Царицыно'(с отличием)",
      "2023 — НИЯУ МЭИ (до 2027)",
      "2024 — Яндекс Практикум",
      "2025 — Three.js, шейдеры, моды для игр",
    ],
  },
  {
    type: "command",
    text: "rest",
    output: [],
  },
  {
    type: "command",
    text: "cowsay",
    output: (args) => {
      const message = args || "Муу!";
      const cow = `
  ┌────────────────────────┐
  │ ${message.padEnd(24).slice(0, 24)} │
  └────────────────────────┘
          \\   ^__^
           \\  (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||`;
      return cow.split("\n");
    },
  },
  {
    type: "command",
    text: "projects",
    output: [
      "Доступные проекты:",
      "  portfolio       — Личное портфолио с 3D терминалом",
      "  draggable-works     — Бесконечный draggable field",
      "  fiction-sandbox      — Библиотека с анимациями",
      "",
      "Для перехода в проект: cd ./projects/{имя_проекта}",
    ],
  },
  {
    type: "command",
    text: "contacts",
    output: [
      "Доступные контакты:",
      "  github          — профиль Github",
      "  leetcode        — профиль Leetcode",
      "  hh              — резюме на hh",
      "  email           — Email",
      "",
      "Для открытия контакта: cd ./contacts/{контакт}",
    ],
  },
  {
    type: "command",
    text: "neofetch",
    output: () => {
      const uptime = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);

      return [
        "",
        "",
        "              DANIIL KAMAEV",
        "           ─────────────────",
        "           Portfolio v1.0",
        "           Frontend Developer",
        "",
        "           Skills: 1337",
        "           Uptime:  " + hours + "h " + minutes + "m",
        "           Shell:  Terminal v1.0",
        "           CPU:   JavaScript",
        "",
        "           ───  CONNECT  ───",
        "           GitHub   LeetCode   HH.ru",
        "",
      ];
    },
  },
  {
    type: "command",
    text: "help",
    output: [
      "Доступные команды:",
      "  hello     — приветствие",
      "  skills    — стек",
      "  experience     — мой путь в IT",
      "  projects       — список проектов",
      "  cd ./projects/{имя_проекта} — открыть проект на GitHub",
      "  contacts       — список контактов",
      "  cd ./contacts/{контакт} — открыть контакт",
      "  help           — справка",
      "  clear          — очистить терминал",
      "  whoami         — информация обо мне",
      "  cowsay {stroka}         — корова говорит",
      "  rest         — отдых",
      "  date           — текущая дата и время",
      "  uptime         — время работы терминала",
      '  echo "text"    — вывести текст',
      "  calc 2+2       — калькулятор",
      "  joke           — случайная шутка",
      "  fortune        — предсказание",
      "  neofetch        — информация о системе",
      "  cmatrix        — красная или синяя?",
    ],
  },
  {
    type: "command",
    text: "cmatrix",
    output: () => {
      return [];
    },
  },
  {
    type: "command",
    text: "whoami",
    output: [
      "Даниил Камаев",
      "Москва, Россия",
      "Frontend Developer & Game Dev Enthusiast",
      "Люблю создавать интерактивные интерфейсы",
    ],
  },
  {
    type: "command",
    text: "date",
    output: () => {
      const now = new Date();
      const formatted = now.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return [`${formatted}`];
    },
  },
  {
    type: "command",
    text: "uptime",
    output: () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;
      return [`Текущее время: ${hours}h ${minutes}m ${seconds}s`];
    },
  },
  {
    type: "command",
    text: "echo",
    output: (args) => {
      const message = args || "";
      if (!message) return ['Укажите текст. Пример: echo "Hello World!"'];
      return [`${message}`];
    },
  },
  {
    type: "command",
    text: "calc",
    output: (args) => {
      if (!args) return ["Укажите выражение. Пример: calc 2 + 2"];
      try {
        const result = Function(`"use strict"; return (${args})`)();
        return [`${args} = ${result}`];
      } catch {
        return ["Ошибка в выражении"];
      }
    },
  },
  {
    type: "command",
    text: "joke",
    output: () => {
      const jokes = [
        "Почему программисты не любят природу? Слишком много багов.",
        "Сколько программистов нужно, чтобы заменить лампочку? Ни одного, это аппаратная проблема.",
        'Что говорит программист, когда видит ошибку? "Это не баг, это фича."',
        "В чем разница между программистом и сантехником? Сантехник не оставляет воды на полу.",
        "Какой язык программирования самый быстрый? Тот, который ты знаешь.",
      ];
      return [`${jokes[Math.floor(Math.random() * jokes.length)]}`];
    },
  },
  {
    type: "command",
    text: "fortune",
    output: () => {
      const fortunes = [
        "Сегодня ты напишешь идеальный код!",
        "В твоем будущем — много кофе и дебага.",
        "Баги боятся тебя.",
        "Твой код будет жить вечно.",
        "Сегодня — отличный день для рефакторинга.",
        "Ты решишь сложную задачу с легкостью.",
      ];
      return [`${fortunes[Math.floor(Math.random() * fortunes.length)]}`];
    },
  },
];

export const projects = {
  portfolio: {
    url: "https://github.com/V1lliarddd/portfolio",
    description: "Личное портфолио с 3D терминалом",
  },
  "draggable-works": {
    url: "https://github.com/V1lliarddd/FictionSandbox/tree/main/draggableWorks",
    description: "Бесконечный draggable field",
  },
  "fiction-sandbox": {
    url: "https://github.com/V1lliarddd/FictionSandbox",
    description: "Библиотека с анимациями",
  },
};

export const contacts = {
  github: {
    url: "https://github.com/V1lliarddd",
    description: "GitHub profil",
  },
  leetcode: {
    url: "https://leetcode.com/u/V1lliard/",
    description: "LeetCode profil",
  },
  hh: {
    url: "https://hh.ru/resume/6b563057ff0b4853d90039ed1f7a4f67763048",
    description: "HH.ru resume",
  },
  email: {
    url: "mailto:V1lliard@yandex.ru",
    description: "Email",
  },
};
