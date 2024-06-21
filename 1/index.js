import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

const fov = 75; //field of view
const aspect = width / height;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);  // 2nd argument is number of faces?
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

function animate(t = 0) {
    requestAnimationFrame(animate);
    // mesh.scale.setScalar(Math.cos(t * 0.001 + 1.0))
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}

animate();

function handleWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleWindowResize, false);