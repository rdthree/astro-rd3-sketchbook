// src/main.ts

// ignore the following script reference, it causeses a type error, but is
// necessary for the compiled javascript file to work
// @ts-ignore
import { THREE } from '../../scripts/threejs-shared-module.js'; // Adjust the path as needed

const threeId: string = 'threetest';

/**
 * Creates a rotating cube inside the specified container.
 * @param containerId - The ID of the container where the cube will be rendered.
 */
function createRotatingCube(containerId: string = threeId): void {
    const container: HTMLElement | null = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
    }

    // Create the scene
    const scene: THREE.Scene = new THREE.Scene();

    // Create a camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Create the renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement); // Append to the specified container

    // Ensure the canvas fills the container
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    // Handle window resize
    window.addEventListener('resize', () => {
        const width: number = container.clientWidth;
        const height: number = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Create a geometry and material
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Create a mesh and add it to the scene
    const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    const animate = (): void => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    animate();
}

// Auto-execute when the script loads
document.addEventListener('DOMContentLoaded', () => {
    createRotatingCube('threetest'); // Ensure the ID matches the container
});

console.log("Three test script running");
