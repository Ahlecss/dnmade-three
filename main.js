import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, AmbientLight, Object3D } from 'three';


class App {
    constructor() {
        // Initialisation des éléments de base
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initLoader();
        this.addObjects();
        this.addLighting();

        window.addEventListener('click', this.handleClick.bind(this))
    }
    // Importer des models

    // Initialise la scène

    handleClick() {
        console.log(this)
    }
    initScene() {
        this.scene = new Scene();
    }

    // Initialise la caméra
    initCamera() {
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
    }

    // Initialise le renderer
    initRenderer() {
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Liaison de la méthode animate pour l'utiliser dans setAnimationLoop
        this.renderer.setAnimationLoop(this.animate.bind(this));
    }

    initLoader() {
        
    }

    // Ajoute des objets à la scène
    addObjects() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new Mesh(geometry, material);

        this.scene.add(this.cube);

        console.log('Cube ajouté : ', this.cube);
    }

    // Ajoute une lumière ambiante
    addLighting() {
        const light = new AmbientLight(0xffffff); // Soft white light
        this.scene.add(light);
    }

    // Animation de la scène
    animate() {
        // Animation du cube (exemple simple)
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        // Rendu de la scène
        this.renderer.render(this.scene, this.camera);
    }
}

// Instanciation de l'application
const app = new App();
