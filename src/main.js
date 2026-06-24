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

      import("./scene/lightning.js").then(({ createLights }) => {
        createLights(scene);
      });

      import("./scene/room.js").then(({ createRoom }) => {
        createRoom(scene);
      });

      import("./scene/monitor.js").then(({ createMonitor }) => {
        const { screenMesh } = createMonitor(scene);

        import("./scene/keyboard.js").then(({ createKeyboard }) => {
          createKeyboard(scene);
        });

        import("./terminal/renderer.js").then(({ createScreenRenderer }) => {
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
        });
      });
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

      const observer = new MutationObserver(() => renderTerminal());
      observer.observe(terminalBody, { childList: true, subtree: true });
    });
  }
}