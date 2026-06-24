import * as THREE from 'three';
import { createCoffee } from './coffee.js';

export function createTable(scene) {
  const tableGroup = new THREE.Group();

  const tableTopGeometry = new THREE.BoxGeometry(5, 0.08, 3);
  const tableTopMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a1a0a,
    roughness: 0.7,
    metalness: 0.1
  });
  const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
  tableTop.position.y = 0;
  tableTop.castShadow = true;
  tableTop.receiveShadow = true;
  tableGroup.add(tableTop);

  const legPositions = [
    { x: -2.3, z: -1.3 },
    { x: 2.3, z: -1.3 },
    { x: -2.3, z: 1.3 },
    { x: 2.3, z: 1.3 }
  ];

  legPositions.forEach((pos) => {
    const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
    const legMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.4,
      metalness: 0.6
    });
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, -0.44, pos.z);
    leg.castShadow = true;
    leg.receiveShadow = true;
    tableGroup.add(leg);

    const capGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.03, 8);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.5,
      metalness: 0.4
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.set(pos.x, -0.84, pos.z);
    tableGroup.add(cap);
  });

  const edgeGeometry = new THREE.BoxGeometry(5, 0.04, 0.1);
  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a2a1a,
    roughness: 0.6,
    metalness: 0.1
  });

  const edgePositions = [
    { x: 0, z: 1.5, ry: 0 },
    { x: 0, z: -1.5, ry: 0 },
    { x: 2.5, z: 0, ry: Math.PI / 2 },
    { x: -2.5, z: 0, ry: Math.PI / 2 }
  ];

  edgePositions.forEach((pos) => {
    const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
    edge.position.set(pos.x, 0.04, pos.z);
    edge.rotation.y = pos.ry;
    tableGroup.add(edge);
  });

  tableGroup.position.y = -0.8;
  tableGroup.position.z = -0.5;
  scene.add(tableGroup);
}

export function createWall(scene) {
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a12,
    roughness: 0.9,
    metalness: 0.0,
    side: THREE.DoubleSide
  });

  const wallGeometry = new THREE.PlaneGeometry(12, 8);
  const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  wall.position.set(0, 2, -2.5);
  wall.receiveShadow = true;
  scene.add(wall);
}

export function createRoom(scene) {
  createWall(scene);
  createTable(scene);
  createCoffee(scene);
}
