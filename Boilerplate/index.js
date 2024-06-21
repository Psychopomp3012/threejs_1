import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"

const width = window.innerWidth;
const height = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

function handleWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleWindowResize, false);