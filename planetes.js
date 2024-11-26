import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 0);  // Soleil au centre
scene.add(light);

// Créer un Soleil (simple sphère)
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Créer les planètes
const planets = [
    { name: "Mercure", distance: 8, radius: 0.4, color: 0x808080, speed: 0.02 },
    { name: "Vénus", distance: 12, radius: 0.8, color: 0xffc0cb, speed: 0.015 },
    { name: "Terre", distance: 16, radius: 1, color: 0x0000ff, speed: 0.01 },
    { name: "Mars", distance: 20, radius: 0.6, color: 0xff4500, speed: 0.008 },
    { name: "Jupiter", distance: 30, radius: 2, color: 0xffa500, speed: 0.005 },
    { name: "Saturne", distance: 40, radius: 1.5, color: 0xffff00, speed: 0.004 },
    { name: "Uranus", distance: 50, radius: 1.2, color: 0x00ffff, speed: 0.003 },
    { name: "Neptune", distance: 60, radius: 1.1, color: 0x00008b, speed: 0.002 }
];

// Fonction pour créer une planète
function createPlanet(radius, color, distance) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = distance;
    return planet;
}

// Création et ajout des planètes à la scène
const planetMeshes = planets.map(planet => {
    const mesh = createPlanet(planet.radius, planet.color, planet.distance);
    scene.add(mesh);
    return {
        mesh: mesh,
        speed: planet.speed
    };
});

// Animation
function animate() {
    requestAnimationFrame(animate);

    // Faire tourner les planètes autour du soleil
    planetMeshes.forEach((planet, index) => {
        const planetData = planets[index];
        planet.mesh.position.x = planetData.distance * Math.cos(planetData.speed * Date.now() / 1000);
        planet.mesh.position.z = planetData.distance * Math.sin(planetData.speed * Date.now() / 1000);
    });

    renderer.render(scene, camera);
}

animate();

// Redimensionner le rendu à la taille de la fenêtre
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
