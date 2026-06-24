import * as THREE from "three";

let todos = [
  { text: "Добавить projects", done: true },
  { text: "Добавить contacts", done: true },
  { text: "Купить хлеб", done: true },
  { text: "Купить молоко", done: false },
  { text: "Захватить мир", done: false },
];

let paperMesh = null;

export function createPaper(scene) {
  const paperGroup = new THREE.Group();

  const paperGeometry = new THREE.PlaneGeometry(1.2, 1.6);
  const paperMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f0e8,
    roughness: 0.9,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });
  paperMesh = new THREE.Mesh(paperGeometry, paperMaterial);
  paperMesh.rotation.x = -0.1;
  paperMesh.rotation.z = 0.05;
  paperMesh.position.y = 0.01;
  paperMesh.castShadow = true;
  paperMesh.receiveShadow = true;
  paperGroup.add(paperMesh);

  const shadowGeometry = new THREE.PlaneGeometry(1.3, 1.7);
  const shadowMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.05,
    side: THREE.DoubleSide,
  });
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.rotation.x = -0.1;
  shadow.rotation.z = 0.05;
  shadow.position.set(0, -0.005, 0.01);
  paperGroup.add(shadow);

  paperGroup.position.set(0, -1, 2.5);
  paperGroup.rotation.x = -1;

  scene.add(paperGroup);

  updatePaperTexture();

  return paperGroup;
}

export function updatePaperTexture() {
  if (!paperMesh) return;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 682;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f5f0e8";
  ctx.fillRect(0, 0, 512, 682);

  ctx.strokeStyle = "rgba(200, 190, 180, 1)";
  ctx.lineWidth = 1;
  for (let y = 60; y < 682; y += 35) {
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(472, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(200, 100, 100, 1)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 20);
  ctx.lineTo(60, 662);
  ctx.stroke();

  ctx.fillStyle = "#333333";
  ctx.font = 'bold 28px "Press Start 2P", monospace';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("TODO", 80, 25);

  ctx.font = '18px "Press Start 2P", monospace';
  todos.forEach((todo, index) => {
    const yPos = 80 + index * 45;

    if (todo.done) {
      ctx.fillStyle = "#888888";
      ctx.fillText("☑", 80, yPos);
      ctx.fillText(todo.text, 120, yPos);
      ctx.strokeStyle = "#888888";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(118, yPos + 12);
      ctx.lineTo(450, yPos + 12);
      ctx.stroke();
    } else {
      ctx.fillStyle = "#444444";
      ctx.fillText("□", 80, yPos);
      ctx.fillText(todo.text, 120, yPos);
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  paperMesh.material.map = texture;
  paperMesh.material.needsUpdate = true;
}
