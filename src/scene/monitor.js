import * as THREE from "three";

export function createMonitor(scene) {
  const monitorGroup = new THREE.Group();

  const caseGeometry = new THREE.BoxGeometry(3.8, 3.0, 1.6);
  const caseMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.4,
    metalness: 0.2,
  });
  const caseMesh = new THREE.Mesh(caseGeometry, caseMaterial);
  caseMesh.castShadow = true;
  caseMesh.receiveShadow = true;
  monitorGroup.add(caseMesh);

  const bezelGeometry = new THREE.BoxGeometry(3.4, 2.6, 0.08);
  const bezelMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.4,
    metalness: 0.3,
  });
  const bezelMesh = new THREE.Mesh(bezelGeometry, bezelMaterial);
  bezelMesh.position.z = 0.8;
  monitorGroup.add(bezelMesh);

  const screenGeometry = new THREE.PlaneGeometry(3.1, 2.3);
  const screenMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff41,
    emissive: 0x00ff41,
    emissiveIntensity: 0.05,
    roughness: 0.05,
    metalness: 0.0,
    transparent: true,
    opacity: 0,
  });
  const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
  screenMesh.position.z = 0.86;
  monitorGroup.add(screenMesh);

  const glossGeometry = new THREE.PlaneGeometry(3.0, 2.2);
  const glossMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.04,
    roughness: 0.0,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });
  const glossMesh = new THREE.Mesh(glossGeometry, glossMaterial);
  glossMesh.position.z = 0.87;
  glossMesh.position.y = 0.3;
  monitorGroup.add(glossMesh);

  const glowGeometry = new THREE.PlaneGeometry(3.3, 2.5);
  const glowMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff41,
    emissive: 0x00ff41,
    emissiveIntensity: 0,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
  });
  const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
  glowMesh.position.z = 0.84;
  monitorGroup.add(glowMesh);

  const buttonPositions = [
    { x: -1.2, y: -1.2, z: 0.85 },
    { x: -0.9, y: -1.2, z: 0.85 },
    { x: -0.6, y: -1.2, z: 0.85 },
    { x: -0.3, y: -1.2, z: 0.85 },
    { x: 0.0, y: -1.2, z: 0.85 },
    { x: 0.3, y: -1.2, z: 0.85 },
    { x: 0.6, y: -1.2, z: 0.85 },
    { x: 0.9, y: -1.2, z: 0.85 },
  ];

  buttonPositions.forEach((pos) => {
    const btnGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 8);
    const btnMat = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.3,
      metalness: 0.6,
    });
    const btn = new THREE.Mesh(btnGeo, btnMat);
    btn.position.set(pos.x, pos.y, pos.z);
    btn.rotation.x = Math.PI / 2;
    monitorGroup.add(btn);
  });

  const powerBtnGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 12);
  const powerBtnMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    roughness: 0.2,
    metalness: 0.7,
  });
  const powerBtn = new THREE.Mesh(powerBtnGeo, powerBtnMat);
  powerBtn.position.set(-1.5, -1.2, 0.85);
  powerBtn.rotation.x = Math.PI / 2;
  monitorGroup.add(powerBtn);

  const ledGeo = new THREE.SphereGeometry(0.03, 12, 12);
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x00ff41,
    emissive: 0x00ff41,
    emissiveIntensity: 1.5,
  });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(-1.4, -1.2, 0.9);
  monitorGroup.add(led);

  const standGeometry = new THREE.CylinderGeometry(0.15, 0.35, 0.6, 12);
  const standMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.4,
    metalness: 0.3,
  });
  const stand = new THREE.Mesh(standGeometry, standMaterial);
  stand.position.set(0, -0.3, 0);
  stand.castShadow = true;
  stand.receiveShadow = true;
  monitorGroup.add(stand);

  const baseGeometry = new THREE.CylinderGeometry(0.6, 0.7, 0.15, 24);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.3,
    metalness: 0.4,
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.set(0, -0.7, 0);
  base.castShadow = true;
  base.receiveShadow = true;
  monitorGroup.add(base);

  monitorGroup.position.set(0, 0.9, 0.3);
  scene.add(monitorGroup);

  function bootAnimation() {
    const duration = 2000;
    const startTime = Date.now();
    const texture = screenMesh.material.map;

    function animateBoot() {
      const elapsed = Date.now() - startTime;
      let progress = Math.min(elapsed / duration, 1);

      screenMesh.material.opacity = Math.min(progress * 1.2, 0.95);

      const glowIntensity = Math.sin(progress * Math.PI * 8) * 0.1 + 0.1;
      glowMaterial.emissiveIntensity = progress * 0.4 + glowIntensity * 0.2;
      glowMaterial.opacity = progress * 0.15;

      if (progress < 0.3) {
        const flicker = Math.random() * 0.3;
        screenMesh.material.opacity = Math.min(progress * 1.2 + flicker, 0.95);
      }

      if (texture) {
        const scanOffset = (1 - progress) * 1.15;
        texture.offset.y = -scanOffset;
        texture.needsUpdate = true;
      }

      if (progress < 1) {
        requestAnimationFrame(animateBoot);
      } else {
        screenMesh.material.opacity = 0.95;
        glowMaterial.emissiveIntensity = 0.05;
        glowMaterial.opacity = 0.05;
        if (texture) {
          texture.offset.y = 0;
          texture.needsUpdate = true;
        }
      }
    }

    animateBoot();
  }

  setTimeout(bootAnimation, 500);

  return { monitorGroup, screenMesh };
}
