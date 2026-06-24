export function setupMouseTracking(camera, targetLookAt, MAX_LOOK_ANGLE) {
  document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;
    
    const targetX = x * MAX_LOOK_ANGLE;
    const targetY = -y * MAX_LOOK_ANGLE * 0.5;
    
    targetLookAt.x = targetX;
    targetLookAt.y = 0.4 + targetY;
    targetLookAt.z = 0;
  });
}