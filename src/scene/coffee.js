import * as THREE from 'three';

export function createCoffee(scene) {
  const coffeeGroup = new THREE.Group();

  const saucerGeometry = new THREE.CylinderGeometry(0.22, 0.24, 0.025, 24);
  const saucerMaterial = new THREE.MeshStandardMaterial({
    color: 0x444444,
    roughness: 0.4,
    metalness: 0.3
  });
  const saucer = new THREE.Mesh(saucerGeometry, saucerMaterial);
  saucer.position.y = 0.01;
  saucer.castShadow = true;
  saucer.receiveShadow = true;
  coffeeGroup.add(saucer);

  const mugGeometry = new THREE.CylinderGeometry(0.13, 0.15, 0.18, 24);
  const mugMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.3,
    metalness: 0.2
  });
  const mug = new THREE.Mesh(mugGeometry, mugMaterial);
  mug.position.y = 0.105;
  mug.castShadow = true;
  mug.receiveShadow = true;
  coffeeGroup.add(mug);

  const rimGeometry = new THREE.TorusGeometry(0.13, 0.015, 12, 24);
  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.3,
    metalness: 0.2
  });
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.y = 0.19;
  rim.rotation.x = Math.PI / 2;
  coffeeGroup.add(rim);

  const handlePoints = [
    new THREE.Vector3(0.14, 0.1, 0),
    new THREE.Vector3(0.22, 0.12, 0),
    new THREE.Vector3(0.24, 0.14, 0.02),
    new THREE.Vector3(0.22, 0.16, 0.04),
    new THREE.Vector3(0.14, 0.18, 0.04)
  ];
  const handleCurve = new THREE.CatmullRomCurve3(handlePoints);
  const handleGeometry = new THREE.TubeGeometry(
    handleCurve,
    16,
    0.02,
    8,
    false
  );
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.3,
    metalness: 0.2
  });
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.castShadow = true;
  handle.receiveShadow = true;
  coffeeGroup.add(handle);

  const coffeeGeometry = new THREE.CircleGeometry(0.11, 24);
  const coffeeMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a1a0a,
    roughness: 0.1,
    metalness: 0.0,
    side: THREE.DoubleSide
  });
  const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
  coffee.position.y = 0.188;
  coffee.rotation.x = -Math.PI / 2;
  coffeeGroup.add(coffee);

  const foamGroup = new THREE.Group();

  const foamGeometry = new THREE.CircleGeometry(0.08, 16);
  const foamMaterial = new THREE.MeshStandardMaterial({
    color: 0x8a7a6a,
    roughness: 0.9,
    metalness: 0.0,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  });
  const foam = new THREE.Mesh(foamGeometry, foamMaterial);
  foam.position.set(-0.02, 0.19, 0.02);
  foam.rotation.x = -Math.PI / 2;
  foamGroup.add(foam);

  const smallFoamPositions = [
    { x: 0.04, z: -0.03, scale: 0.6 },
    { x: -0.05, z: -0.04, scale: 0.5 },
    { x: 0.03, z: 0.05, scale: 0.4 },
    { x: -0.06, z: 0.02, scale: 0.3 }
  ];
  smallFoamPositions.forEach((pos) => {
    const smallFoam = new THREE.Mesh(
      new THREE.CircleGeometry(0.03, 8),
      new THREE.MeshStandardMaterial({
        color: 0x9a8a7a,
        roughness: 0.9,
        metalness: 0.0,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      })
    );
    smallFoam.position.set(pos.x, 0.19, pos.z);
    smallFoam.scale.set(pos.scale, pos.scale, 1);
    smallFoam.rotation.x = -Math.PI / 2;
    foamGroup.add(smallFoam);
  });

  coffeeGroup.add(foamGroup);

  const steamGroup = new THREE.Group();
  const steamPositions = [
    { x: -0.02, z: 0.03, delay: 0, speed: 0.8 },
    { x: 0.03, z: -0.02, delay: 0.5, speed: 0.6 },
    { x: -0.01, z: -0.03, delay: 1.0, speed: 0.7 },
    { x: 0.04, z: 0.02, delay: 0.3, speed: 0.9 }
  ];

  steamPositions.forEach((pos) => {
    const steamGeo = new THREE.PlaneGeometry(0.02, 0.05);
    const steamMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const steam = new THREE.Mesh(steamGeo, steamMat);
    steam.position.set(pos.x, 0.22, pos.z);
    steamGroup.add(steam);
  });
  coffeeGroup.add(steamGroup);

  coffeeGroup.position.set(1.9, -0.76, 1.5);
  coffeeGroup.rotation.y = -0.3;

  scene.add(coffeeGroup);

  function animateSteam() {
    const time = Date.now() / 1000;
    const steams = steamGroup.children;
    steams.forEach((steam, index) => {
      const offset = index * 0.7;
      const floatY = Math.sin(time * 0.6 + offset) * 0.025 + 0.02;
      const floatX = Math.sin(time * 0.4 + offset * 0.5) * 0.008;
      const opacity = 0.06 + Math.sin(time * 0.5 + offset) * 0.04 + 0.04;

      steam.position.y = 0.22 + floatY;
      steam.position.x += floatX * 0.005;
      steam.material.opacity = Math.max(0.02, Math.min(0.2, opacity));

      steam.rotation.z = Math.sin(time * 0.3 + offset) * 0.05;
    });
    requestAnimationFrame(animateSteam);
  }
  animateSteam();

  return coffeeGroup;
}
