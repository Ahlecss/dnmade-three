import * as THREE from 'three';
import gsap from "gsap"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// gsap.to(cube.position, { duration: 2, x: 3})

const cubes = [];

const tete = [];

const offset = -5;

const mixer = new THREE.AnimationMixer( mesh );

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
for (let i = 0; i < 5; i++) {
	const meshCube = new THREE.Mesh(geometry, material);
	cubes.push(meshCube);
	scene.add(meshCube);
}
cubes.forEach((cube, i) => {
	// gsap.to(cube.position, { x: offset + i, y: offset + i, z: offset + i, yoyo: true, repeat: -1, ease: "elastic.out(1,0.3)", })
});

// gsap.to(cube.position, { x: 2, duration: 2, yoyo: true, repeat: -1 })



document.addEventListener('mousemove', handleMove)

handleMove(e) {
	console.log(e)
}


function animate(dt, t) {


	mixer.update( dt );
	// cube.position.x = Math.sin(dt / 1000)
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;


	// Position en y du cube est au dessus ou en dessous de la position en Y de l'eau
	// if(cube.position.y < model.position.y) {
	// cube.color: 0xff0000
	//} else {
	// cube.color: 0x00ff00
	// }
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);