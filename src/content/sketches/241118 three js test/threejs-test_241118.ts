// file: src\renderers\threeRenderer.ts
/**
 * Three.js Demo Sketch
 * Demonstrates:
 * - Dynamic module imports
 * - Basic lighting setup
 * - Geometry creation
 * - Camera animation
 */

// Import our sketch definition utility
import { defineSketch } from '../../../renderers/threeRenderer';

export default defineSketch(async ({ scene }) => {
    // Dynamic imports for Three.js modules
    // Only loads the specific features we need, improving performance
    const { PerspectiveCamera, SphereGeometry, Mesh, MeshStandardMaterial } = await import('three');
    const { DirectionalLight, AmbientLight } = await import('three');
    
    // Camera Setup
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000);     // 75° field of view, 1:1 aspect ratio, near/far clipping planes

    // Lighting Setup
    // DirectionalLight simulates sun-like lighting from a specific direction
    const directionalLight = new DirectionalLight(0xffffff, 1); // white light, full intensity
    directionalLight.position.set(1, 1, 0);                     // light coming from top-right
    scene.add(directionalLight);

    // AmbientLight provides global illumination to prevent completely dark shadows
    const ambientLight = new AmbientLight(0x404040);           // soft gray light
    scene.add(ambientLight);

    // Create a 3D sphere
    // SphereGeometry(radius, horizontal segments, vertical segments)
    const geometry = new SphereGeometry(1.5, 32, 32);          // smooth sphere with 1.5 unit radius
    const material = new MeshStandardMaterial({ 
        color: 0x3366ff                                        // blue color
    });
    const sphere = new Mesh(geometry, material);               // combine geometry and material
    scene.add(sphere);                                         // add to scene

    // Set initial camera position and orientation
    camera.position.set(0, 2, -4);                            // position above and behind
    camera.lookAt(sphere.position);                           // point camera at sphere

    // Animation loop for camera movement
    function animate() {
        const time = Date.now() * 0.001;             // time in seconds
        // Create circular motion using sine and cosine
        camera.position.x = Math.sin(time) * 4;               // 4 units radius
        camera.position.z = Math.cos(time) * 4;
        camera.lookAt(sphere.position);                       // always look at sphere
        requestAnimationFrame(animate);                       // queue next frame
    }
    animate();                                                // start animation loop
});
