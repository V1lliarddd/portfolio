import gsap from 'gsap';
import { TextPlugin } from 'gsap/all';
import { ScrollTrigger } from 'gsap/all';
import Matter from 'matter-js';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

document.addEventListener('DOMContentLoaded', () => {
  const introWords = [
    `Hi! My name is Daniil Kamaev.`,
    `I'm a student.`,
    `I'm an amateur game developer.`,
    `I'm a frontend developer.`
  ];
  gsap.to('.pop', {
    opacity: 0,
    yoyo: true,
    repeat: -1,
    ease: 'power2.inOut'
  });

  const wordsMainTl = gsap.timeline({ repeat: -1 });

  introWords.forEach((word) => {
    let tl = gsap
      .timeline({ repeat: 1, yoyo: true, repeatDelay: 1 })
      .to('.role', { duration: 1, text: word });
    wordsMainTl.add(tl);
  });

  const cardsTl = gsap.timeline();
  const aboutCards = document.querySelectorAll('.card');

  const sectorsData = [
    {
      number: 0,
      name: 'Как все начиналось?',
      description: 'Началось все в 7 классе с написания print("Hello world!")'
    },
    {
      number: 25,
      name: 'Колледж',
      description: 'МГБОУ Колледж Царицыно. Окончил с отличием.'
    },
    {
      number: 50,
      name: 'Высшее учебное заведение',
      description: 'НИЯУ МЭИ. Заканчиваю в 2027 году.'
    },
    {
      number: 75,
      name: 'Курсы',
      description:
        'Яндекс Практикум, Курс ThreeJS и много просмотренный гайдов на ютубе.'
    },
    {
      number: 100,
      name: 'Что-нибудь еще?',
      description: 'Конечно! Также был опыт написания шейдеров и модов для игр.'
    }
  ];

  const numberSpan = document.getElementById('sector-number');
  const nameSpan = document.getElementById('sector-name');
  const descSpan = document.getElementById('sector-description');

  let currentIndex = 0;
  let isAnimating = false;

  function animateNumber(element, start, end, duration = 0.8) {
    gsap.to(
      { val: start },
      {
        val: end,
        duration: duration,
        ease: 'power2.out',
        onUpdate: function () {
          element.textContent = Math.floor(this.targets()[0].val);
        },
        onComplete: () => {
          isAnimating = false;
        }
      }
    );
  }

  function updateSector(index) {
    if (isAnimating) return;
    if (index === currentIndex) return;

    isAnimating = true;
    const newSector = sectorsData[index];
    const oldNumber = parseInt(numberSpan.textContent);

    animateNumber(numberSpan, oldNumber, newSector.number);

    gsap.to([nameSpan, descSpan], {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        nameSpan.textContent = newSector.name;
        descSpan.textContent = newSector.description;
        gsap.to([nameSpan, descSpan], {
          opacity: 1,
          duration: 0.4,
          delay: 0.1
        });
      }
    });

    currentIndex = index;
  }

  ScrollTrigger.create({
    trigger: '.sectors-scene',
    start: 'top top',
    end: '+=300%',
    pin: '.sectors-scene',
    scrub: 0.8,
    onUpdate: (self) => {
      let newIndex = Math.floor(self.progress * sectorsData.length);
      newIndex = Math.min(newIndex, sectorsData.length - 1);
      updateSector(newIndex);
    }
  });
  updateSector(0);
});

let engine = null;
let bodies = [];
let animationId = null;
let topWall = null;
let isPhysicsRunning = false;

const CONFIG = {
  gravity: { x: 0, y: 1, scale: 0.001 },
  wallThickness: 50,
  restitution: 0.7,
  friction: 0.1,
  frictionAir: 0.01,
  density: 0.001
};

ScrollTrigger.create({
  trigger: '.sandbox',
  start: 'bottom -150%',
  once: true,
  onEnter: () => {
    setTimeout(() => {
      const container = document.querySelector('.object-container');
      const objects = document.querySelectorAll('.object');
      objects.forEach((obj) => {
        obj.style.opacity = 1;
      });
      if (container && !isPhysicsRunning) {
        initPhysics(container);
        isPhysicsRunning = true;
      }
    }, 100);
  }
});

function initPhysics(container) {
  if (typeof Matter === 'undefined') {
    return;
  }

  if (!container) {
    return;
  }

  const containerRect = container.getBoundingClientRect();

  if (containerRect.width === 0 || containerRect.height === 0) {
    const computedStyle = window.getComputedStyle(container);
    const width = parseInt(computedStyle.width) || window.innerWidth;
    const height = parseInt(computedStyle.height) || 400;
    containerRect.width = width;
    containerRect.height = height;
  }

  engine = Matter.Engine.create();
  engine.gravity = CONFIG.gravity;
  engine.constraintIterations = 10;
  engine.positionIterations = 20;
  engine.velocityIterations = 16;
  engine.timing.timeScale = 1;

  const wallThickness = CONFIG.wallThickness;

  if (engine.world.bodies.length === 0) {
    const walls = [
      Matter.Bodies.rectangle(
        containerRect.width / 2,
        containerRect.height + wallThickness / 2,
        containerRect.width + wallThickness * 2,
        wallThickness,
        {
          isStatic: true,
          restitution: 0.5,
          label: 'ground'
        }
      ),
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        containerRect.height / 2,
        wallThickness,
        containerRect.height + wallThickness * 2,
        {
          isStatic: true,
          restitution: 0.5,
          label: 'leftWall'
        }
      ),
      Matter.Bodies.rectangle(
        containerRect.width + wallThickness / 2,
        containerRect.height / 2,
        wallThickness,
        containerRect.height + wallThickness * 2,
        {
          isStatic: true,
          restitution: 0.5,
          label: 'rightWall'
        }
      )
    ];

    Matter.World.add(engine.world, walls);
  }
  const objects = container.querySelectorAll('.object');

  bodies = [];

  objects.forEach((obj, index) => {
    let objRect = obj.getBoundingClientRect();

    const startX =
      Math.random() * (containerRect.width - objRect.width) + objRect.width / 2;
    const startY = -500 - index * 150;
    const startRotation = (Math.random() - 0.5) * Math.PI;

    const body = Matter.Bodies.rectangle(
      startX,
      startY,
      objRect.width,
      objRect.height,
      {
        restitution: CONFIG.restitution,
        friction: CONFIG.friction,
        frictionAir: CONFIG.frictionAir,
        density: CONFIG.density,
        label: `object_${index}`
      }
    );

    Matter.Body.setAngle(body, startRotation);

    bodies.push({
      body,
      element: obj,
      width: objRect.width,
      height: objRect.height
    });

    Matter.World.add(engine.world, body);
  });

  setTimeout(() => {
    if (engine && engine.world) {
      topWall = Matter.Bodies.rectangle(
        containerRect.width / 2,
        -wallThickness / 2,
        containerRect.width + wallThickness * 2,
        wallThickness,
        {
          isStatic: true,
          restitution: 0.5,
          label: 'ceiling'
        }
      );
      Matter.World.add(engine.world, topWall);
    }
  }, 3000);

  startAnimation();
  startPhysicsLoop();
}

function startAnimation() {
  function updatePositions() {
    if (!bodies.length) return;

    bodies.forEach(({ body, element, width, height }) => {
      const { x, y } = body.position;
      const angle = body.angle;
      element.style.left = `${x - width / 2}px`;
      element.style.top = `${y - height / 2}px`;
      element.style.transform = `rotate(${angle}rad)`;
    });

    requestAnimationFrame(updatePositions);
  }

  updatePositions();
}

function startPhysicsLoop() {
  function physicsUpdate() {
    if (engine) {
      Matter.Engine.update(engine, 1000 / 60);
      requestAnimationFrame(physicsUpdate);
    }
  }

  physicsUpdate();
}

window.addEventListener('resize', () => {
  if (engine && engine.world) {
    const container = document.querySelector('.object-container');
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const wallThickness = CONFIG.wallThickness;

      const walls = engine.world.bodies.filter(
        (body) =>
          body.isStatic &&
          (body.label === 'ground' ||
            body.label === 'leftWall' ||
            body.label === 'rightWall')
      );

      if (walls.length >= 3) {
        Matter.Body.setPosition(
          walls[0],
          Matter.Vector.create(
            containerRect.width / 2,
            containerRect.height + wallThickness / 2
          )
        );

        Matter.Body.setPosition(
          walls[1],
          Matter.Vector.create(-wallThickness / 2, containerRect.height / 2)
        );

        Matter.Body.setPosition(
          walls[2],
          Matter.Vector.create(
            containerRect.width + wallThickness / 2,
            containerRect.height / 2
          )
        );
      }
    }
  }
});

function cleanupPhysics() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (engine) {
    Matter.Engine.clear(engine);
    engine = null;
  }
  bodies = [];
  isPhysicsRunning = false;
}
