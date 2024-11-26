import * as THREE from 'three';
import gsap from "gsap"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;
console.log(cube)

const loader = new GLTFLoader();

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();



loader.load(
	// resource URL
	'models/mclaren.glb',
	// called when the resource is loaded
	function (gltf) {

		console.log(gltf)

		// gltf.scene.children[0].scale.set(200, 200, 200)
		scene.add(gltf.scene);

		controls.update();


		// gltf.animations; // Array<THREE.AnimationClip>
		// gltf.scene; // THREE.Group
		// gltf.scenes; // Array<THREE.Group>
		// gltf.cameras; // Array<THREE.Camera>
		// gltf.asset; // Object

	},
	// called while loading is progressing
	function (xhr) {

		console.log((xhr.loaded / xhr.total * 100) + '% loaded');

	},
	// called when loading has errors
	function (error) {

		console.log('An error happened');

	}
);


// Charger un HDRI pour éclairer la scène
const hdrLoader = new RGBELoader();
hdrLoader.load(
	'hdri/qwantani_sunset_1k.hdr',  // Remplacez par le chemin vers votre image HDRI
	(hdrTexture) => {
		// Appliquer le HDRI en tant que carte d'environnement
		hdrTexture.mapping = THREE.EquirectangularRefractionMapping;
		scene.background = hdrTexture; // Utiliser le HDRI comme fond
		scene.environment = hdrTexture; // Appliquer le HDRI comme environnement lumineux

		// Redemander un rendu avec l'éclairage HDRI appliqué
		// animate();
	},
	undefined,
	(error) => {
		console.error('Erreur de chargement de l\'HDRI :', error);
	}
);

// gsap.to(cube.position, { duration: 2, x: 3})

// gsap.to(cube.position, { x: 2, duration: 2, yoyo: true, repeat: -1 })

function animate(dt, t) {

	// cube.position.x = Math.sin(dt / 1000)

	// cube.rotation.x -= 0.01	
	// cube.rotation = cube.rotation + 0.01
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;


	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);