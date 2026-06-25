import { getDeviceType, isDesktop } from "./utils/device.js";
import {
  loadTerminal,
  setRenderFunction,
  getTerminalLines,
  setKeyboardControls,
} from "./terminal/commands.js";
import { setupKeyboardInput } from "./controls/keyboard.js";
import * as THREE from "three";

const deviceType = getDeviceType();
const isDesktopDevice = isDesktop();

let renderScreenTexture = null;
let keyboardControls = null;
let isTerminalLoaded = false;

if (isDesktopDevice) {
  const mobileTerminal = document.getElementById("terminal-wrapper");
  if (mobileTerminal) mobileTerminal.style.display = "none";

  import("./scene/scene.js").then(
    ({ createScene, createCamera, createRenderer }) => {
      const scene = createScene();
      const camera = createCamera();
      const renderer = createRenderer();
      document
        .getElementById("three-container")
        .appendChild(renderer.domElement);

      let lightsReady = false;
      let roomReady = false;
      let monitorReady = false;
      let keyboardReady = false;
      let rendererReady = false;
      let screenMesh = null;
      
      let sceneReady = () => {
        if (lightsReady && roomReady && monitorReady && keyboardReady && rendererReady) {
          startMainScene();
        }
      };

      import("./scene/lightning.js").then(({ createLights }) => {
        createLights(scene);
        lightsReady = true;
        sceneReady();
      });

      import("./scene/room.js").then(({ createRoom }) => {
        createRoom(scene);
        roomReady = true;
        sceneReady();
      });

      import("./scene/monitor.js").then(({ createMonitor }) => {
        const result = createMonitor(scene);
        screenMesh = result.screenMesh;
        monitorReady = true;
        sceneReady();
      });

      import("./scene/keyboard.js").then(({ createKeyboard }) => {
        createKeyboard(scene);
        keyboardReady = true;
        sceneReady();
      });

      import("./terminal/renderer.js").then(({ createScreenRenderer }) => {
        rendererReady = true;
        sceneReady();
        window.__createScreenRenderer = createScreenRenderer;
      });

      const finalPosition = new THREE.Vector3(0, 1.8, 5.5);
      const finalTarget = new THREE.Vector3(0, 0.4, 0);
      
      camera.position.set(0, 4.0, 50);
      camera.lookAt(0, 0.4, 0);
      
      let startTime = Date.now();
      const duration = 3500;
      
      function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const ease = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        const startPos = new THREE.Vector3(0, 4.0, 50);
        camera.position.lerpVectors(startPos, finalPosition, ease);
        
        const lookY = 0.4 + (1 - ease) * 0.4;
        camera.lookAt(0, lookY, 0);
        
        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        } else {
          camera.position.copy(finalPosition);
          camera.lookAt(finalTarget);
          startMainScene();
        }
      }

      function startMainScene() {
        if (!screenMesh) return;
        if (isTerminalLoaded) return;
        isTerminalLoaded = true;
        
        const createScreenRenderer = window.__createScreenRenderer;
        if (!createScreenRenderer) return;
        
        const { renderScreenTexture: renderFn } = createScreenRenderer(
          getTerminalLines(),
          screenMesh,
        );
        renderScreenTexture = renderFn;
        setRenderFunction(renderScreenTexture);

        keyboardControls = setupKeyboardInput(() => {
          if (renderScreenTexture) renderScreenTexture();
        });
        setKeyboardControls(keyboardControls);

        loadTerminal();
        setInterval(renderScreenTexture, 100);

        import("./controls/mouse.js").then(({ setupMouseTracking }) => {
          const targetLookAt = { x: 0, y: 0.4, z: 0 };
          const currentLookAt = { x: 0, y: 0.4, z: 0 };
          const LOOK_SENSITIVITY = 0.05;
          const MAX_LOOK_ANGLE = 3;

          setupMouseTracking(camera, targetLookAt, MAX_LOOK_ANGLE);

          function animate() {
            requestAnimationFrame(animate);
            currentLookAt.x +=
              (targetLookAt.x - currentLookAt.x) * LOOK_SENSITIVITY;
            currentLookAt.y +=
              (targetLookAt.y - currentLookAt.y) * LOOK_SENSITIVITY;
            camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);
            renderer.render(scene, camera);
          }
          animate();
        });

        window.addEventListener("resize", () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        });
      }

      animateCamera();
    },
  );
} else {
  const threeContainer = document.getElementById("three-container");
  if (threeContainer) threeContainer.style.display = "none";

  const terminalBody = document.getElementById("terminal-body");

  if (terminalBody) {
    import("./terminal/renderer-dom.js").then(({ createDomRenderer }) => {
      const { renderTerminal } = createDomRenderer(
        getTerminalLines(),
        terminalBody,
      );
      renderScreenTexture = renderTerminal;
      setRenderFunction(renderTerminal);

      keyboardControls = setupKeyboardInput(() => {
        if (renderScreenTexture) renderScreenTexture();
      });
      setKeyboardControls(keyboardControls);

      loadTerminal();

      // Фокус при клике
      terminalBody.addEventListener("click", () => {
        const input = terminalBody.querySelector(".command-input");
        if (input) input.focus();
      });

      // Фокус при касании
      terminalBody.addEventListener("touchstart", () => {
        const input = terminalBody.querySelector(".command-input");
        if (input) {
          setTimeout(() => input.focus(), 100);
        }
      }, { passive: true });
    });
  }
}