// file: src/content/sketches/241111_babylonjs_test/babylon-test-simple.ts

/**
 * Enhanced Babylon.js Demo Sketch with Random Mesh Toggling
 * Demonstrates:
 * - Custom camera setup (FreeCamera) with orbital controls
 * - Multiple lighting for better mesh visibility
 * - Wireframe geometry to visualize the mesh structure
 * - Camera animation (orbital movement)
 * - Randomly toggling mesh faces on and off
 */

import { defineSketch } from '../../../renderers/babylonRenderer';
import { VertexBuffer } from '@babylonjs/core/Meshes/buffer';

export default defineSketch(async ({ scene, Vector3 }) => {
    // Dynamic import of Babylon.js modules
    const { FreeCamera } = await import('@babylonjs/core/Cameras/freeCamera');
    const { HemisphericLight, PointLight } = await import('@babylonjs/core/Lights');
    const { MeshBuilder } = await import('@babylonjs/core/Meshes/meshBuilder');
    const { StandardMaterial } = await import('@babylonjs/core/Materials/standardMaterial');
    const { Color3 } = await import('@babylonjs/core/Maths/math.color');
    const { ShadowGenerator } = await import('@babylonjs/core/Lights/Shadows/shadowGenerator');

    // Dispose of the default camera
    scene.activeCamera?.dispose();

    // Create a custom FreeCamera
    const camera = new FreeCamera("myCamera", new Vector3(0, 2, -6), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(true); // Enable camera controls (mouse, touch)

    // Create and add a hemispheric light for ambient lighting
    const hemiLight = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.6;

    // Add a point light to create dynamic shading and highlights
    const pointLight = new PointLight('pointLight', new Vector3(5, 5, -5), scene);
    pointLight.intensity = 0.8;

    // Create a simple sphere with wireframe material
    const sphere = MeshBuilder.CreateSphere('sphere', { segments: 32, diameter: 3 }, scene);

    // Create and configure the material
    const sphereMaterial = new StandardMaterial("sphereMaterial", scene);
    sphereMaterial.diffuseColor = new Color3(0.2, 0.6, 1); // Light blue color
    sphereMaterial.wireframe = true; // Enable wireframe to visualize mesh

    // Assign the material to the sphere
    sphere.material = sphereMaterial;

    // Animate camera in an orbital motion around the sphere
    scene.onBeforeRenderObservable.add(() => {
        const rotationSpeed = 0.5; // Radians per second

        // Calculate the current angle based on time
        const angle = rotationSpeed * Date.now() * 0.001;
        const radius = 6;
        camera.position.x = Math.sin(angle) * radius;
        camera.position.z = Math.cos(angle) * radius;

        // Always look at the sphere
        camera.setTarget(sphere.position);
    });

    // Enable shadows for better depth perception
    const shadowGeneratorInstance = new ShadowGenerator(1024, pointLight);
    shadowGeneratorInstance.addShadowCaster(sphere);
    sphere.receiveShadows = true;

    // === Randomly Toggle Mesh Faces On and Off ===

    // Retrieve the mesh's indices (each set of three defines a triangle)
    const indices = sphere.getIndices();
    if (!indices) {
        console.error("Failed to retrieve mesh indices.");
        return;
    }

    // Total number of triangles
    const totalTriangles = indices.length / 3;

    // Initialize visibility array: true means the triangle is visible
    const triangleVisibility: boolean[] = new Array(totalTriangles).fill(true);

    // Function to toggle random triangles
    const toggleRandomTriangles = () => {
        const toggleCount = Math.floor(totalTriangles * 0.01); // Toggle 1% of triangles per frame

        for (let i = 0; i < toggleCount; i++) {
            const triangleIndex = Math.floor(Math.random() * totalTriangles);
            triangleVisibility[triangleIndex] = !triangleVisibility[triangleIndex];
        }

        // Rebuild the indices based on visibility
        const newIndices: number[] = [];
        for (let i = 0; i < totalTriangles; i++) {
            if (triangleVisibility[i]) {
                // Each triangle has three indices
                newIndices.push(
                    indices[i * 3],
                    indices[i * 3 + 1],
                    indices[i * 3 + 2]
                );
            }
        }

        // Update the mesh with new indices
        sphere.setIndices(newIndices);
    };

    // Register the toggle function to the render loop
    scene.onBeforeRenderObservable.add(() => {
        toggleRandomTriangles();
    });
});
