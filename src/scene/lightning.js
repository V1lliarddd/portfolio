import * as THREE from 'three';

export function createLights(scene) {
  const mainLight = new THREE.DirectionalLight(0xffeedd, 3.0);
  mainLight.position.set(3, 8, 6);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.bias = -0.001;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 20;
  mainLight.shadow.camera.left = -6;
  mainLight.shadow.camera.right = 6;
  mainLight.shadow.camera.top = 6;
  mainLight.shadow.camera.bottom = -6;
  scene.add(mainLight);

  const leftLight = new THREE.DirectionalLight(0x4a9eff, 0.8);
  leftLight.position.set(-4, 5, 3);
  scene.add(leftLight);

  const rightLight = new THREE.DirectionalLight(0xff8844, 0.6);
  rightLight.position.set(4, 4, 2);
  scene.add(rightLight);

  const fillLight = new THREE.AmbientLight(0x444466, 0.6);
  scene.add(fillLight);

  const bottomLight = new THREE.PointLight(0x00ff41, 0.4, 4);
  bottomLight.position.set(0, -0.5, 1.5);
  scene.add(bottomLight);

  const screenGlowLight = new THREE.PointLight(0x00ff41, 0.6, 4);
  screenGlowLight.position.set(0, 0.5, 1.5);
  scene.add(screenGlowLight);

  const wallLight = new THREE.SpotLight(0x4466ff, 0.3, 10, Math.PI / 4, 0.5, 1);
  wallLight.position.set(0, 3, 2);
  wallLight.target.position.set(0, 1.5, -2.5);
  scene.add(wallLight);
  scene.add(wallLight.target);

  const backLight = new THREE.DirectionalLight(0x4488ff, 0.2);
  backLight.position.set(-2, 1, -5);
  scene.add(backLight);
}
