import { defineSketch } from '../../../renderers/threeRenderer';
import * as THREE from 'three';

export default defineSketch(({ scene, renderer }) => {
    // ==== SETUP CAMERA ====
    // Create a camera to view the 3D scene.
    // A PerspectiveCamera mimics how the human eye sees the world.
    const camera = new THREE.PerspectiveCamera(
        75, // Field of View (FOV) in degrees, determines how wide the view is
        renderer.domElement.clientWidth / renderer.domElement.clientHeight, // Aspect ratio to match the canvas size
        0.1, // Near clipping plane; anything closer won't be rendered
        1000 // Far clipping plane; anything beyond this won't be rendered
    );
    camera.position.set(10, 10, 5); // Position the camera so it can see the scene clearly
    camera.lookAt(0, 0, 0); // Make the camera look at the origin (center of the scene)

    // ==== SCENE BACKGROUND ====
    // Set the background color of the scene.
    scene.background = new THREE.Color(0xe0e0e0); // A light gray background color for better contrast

    // ==== LIGHTING SETUP ====
    // Lighting is crucial to make the objects visible and give them depth and shadows.

    // Ambient Light: Provides a soft general light for the entire scene.
    // Think of this as light coming from every direction, providing uniform lighting.
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Soft white light, with an intensity of 1.5

    // Directional Light: Think of it as sunlight; it provides parallel rays of light.
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2); // Bright white light, with an intensity of 1.2
    dirLight.position.set(5, 10, 7.5); // Positioning it above and to the side of the scene
    dirLight.castShadow = true; // Enables shadows for this light

    // Hemisphere Light: Provides a nice gradient ambient light.
    // It simulates a natural sky effect, with light from above and slightly colored light from below.
    const hemiLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 0.8); // Sky-like light from above and soft reflection from below

    // Add all lights to the scene.
    scene.add(ambientLight, dirLight, hemiLight);

    // ==== OBJECT CREATION ====
    // Adding a simple box to the scene to visualize something.
    const geometry = new THREE.BoxGeometry(3, 3, 3); // Box with dimensions 3x3x3 units
    const material = new THREE.MeshStandardMaterial({
        color: 0x77f2a8, // Green color for the box
        metalness: 0.5, // Makes it look a bit metallic
        roughness: 0.5  // Makes it look not too shiny, adds realism
    });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(0, 0, 0); // Place the box at the center of the scene
    scene.add(box); // Add the box to the scene

    // ==== ANIMATION LOOP ====
    // The animation loop, responsible for continuously updating the frame and rendering it.
    const animate = () => {
        // Rotate the box around its axes for some simple movement.
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;

        // Render the scene from the perspective of the camera.
        requestAnimationFrame(animate); // Calls animate again on the next frame
        renderer.render(scene, camera);
    };

    animate(); // Start the animation loop

    // ==== HANDLE RESIZE ====
    // This function updates the renderer and camera whenever the window size changes,
    // ensuring the scene looks correct and maintains the proper aspect ratio.
    const handleResize = () => {
        camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
        camera.updateProjectionMatrix(); // Update the camera's projection matrix with the new aspect ratio
        renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight, false);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set the correct size
});
