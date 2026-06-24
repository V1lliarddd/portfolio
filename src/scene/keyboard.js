import * as THREE from 'three';

export function createKeyboard(scene) {
  const keyboardGroup = new THREE.Group();

  const kbBaseGeometry = new THREE.BoxGeometry(1.8, 0.06, 0.7);
  const kbBaseMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.5,
    metalness: 0.2
  });
  const kbBase = new THREE.Mesh(kbBaseGeometry, kbBaseMaterial);
  kbBase.position.y = 0;
  kbBase.castShadow = true;
  kbBase.receiveShadow = true;
  keyboardGroup.add(kbBase);

  const keyColors = [0x222222, 0x2a2a2a, 0x333333];
  const rowConfigs = [
    { y: 0.04, z: -0.2, count: 12, spacing: 0.13, startX: -0.75 },
    { y: 0.04, z: -0.07, count: 11, spacing: 0.13, startX: -0.7 },
    { y: 0.04, z: 0.06, count: 10, spacing: 0.13, startX: -0.65 },
    { y: 0.04, z: 0.19, count: 9, spacing: 0.13, startX: -0.6 }
  ];

  rowConfigs.forEach((row, rowIndex) => {
    for (let i = 0; i < row.count; i++) {
      const keyGeo = new THREE.BoxGeometry(0.1, 0.025, 0.09);
      const keyMat = new THREE.MeshStandardMaterial({
        color: keyColors[rowIndex % keyColors.length],
        roughness: 0.4,
        metalness: 0.3
      });
      const key = new THREE.Mesh(keyGeo, keyMat);
      key.position.set(row.startX + i * row.spacing, row.y, row.z);
      key.castShadow = true;
      key.receiveShadow = true;
      keyboardGroup.add(key);

      if (i % 3 === 0) {
        const highlightGeo = new THREE.PlaneGeometry(0.06, 0.04);
        const highlightMat = new THREE.MeshStandardMaterial({
          color: 0x444444,
          transparent: true,
          opacity: 0.15,
          roughness: 0.0,
          metalness: 0.0
        });
        const highlight = new THREE.Mesh(highlightGeo, highlightMat);
        highlight.position.set(
          row.startX + i * row.spacing,
          row.y + 0.02,
          row.z + 0.02
        );
        highlight.rotation.x = -0.2;
        keyboardGroup.add(highlight);
      }
    }
  });

  const spaceGeo = new THREE.BoxGeometry(0.5, 0.025, 0.09);
  const spaceMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.4,
    metalness: 0.3
  });
  const space = new THREE.Mesh(spaceGeo, spaceMat);
  space.position.set(0, 0.04, 0.28);
  space.castShadow = true;
  space.receiveShadow = true;
  keyboardGroup.add(space);

  const enterGeo = new THREE.BoxGeometry(0.2, 0.025, 0.09);
  const enterMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.4,
    metalness: 0.3
  });
  const enter = new THREE.Mesh(enterGeo, enterMat);
  enter.position.set(0.65, 0.04, -0.07);
  enter.castShadow = true;
  enter.receiveShadow = true;
  keyboardGroup.add(enter);

  const ledPositions = [
    { x: -0.6, z: 0.4, color: 0x00ff41 },
    { x: -0.5, z: 0.4, color: 0xff4444 },
    { x: -0.4, z: 0.4, color: 0x4a9eff }
  ];

  ledPositions.forEach((ledPos) => {
    const ledGeo = new THREE.SphereGeometry(0.015, 6, 6);
    const ledMat = new THREE.MeshStandardMaterial({
      color: ledPos.color,
      emissive: ledPos.color,
      emissiveIntensity: 0.5
    });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(ledPos.x, 0.05, ledPos.z);
    keyboardGroup.add(led);
  });

  keyboardGroup.position.set(0, -0.72, 2);
  // keyboardGroup.rotation.x = -0.2;
  // keyboardGroup.rotation.z = 0;
  scene.add(keyboardGroup);
}
