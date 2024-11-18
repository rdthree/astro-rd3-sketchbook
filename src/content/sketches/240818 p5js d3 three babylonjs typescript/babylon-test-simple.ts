// file: src\content\sketches\241111%20babylonjs%20test\babylon-test-simple.ts
/**
 * Basic Babylon.js Demo Sketch
 * Demonstrates:
 * - Basic lighting
 * - Simple geometry (sphere)
 * - Camera animation (orbital movement)
 */
import { defineSketch } from '../../../renderers/babylonRenderer';

export default defineSketch(async ({ scene, Vector3, camera }) => {
    const {HemisphericLight} = await import('@babylonjs/core/Lights/hemisphericLight');
    const {MeshBuilder} = await import('@babylonjs/core/Meshes/meshBuilder');
    const {StandardMaterial} = await import('@babylonjs/core/Materials/standardMaterial');
    // Add ambient lighting
    const light = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);

    // Create a simple sphere as our subject
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);

    // create material
    const material = new StandardMaterial("material", scene);
    sphere.material = material;

    //Animate camera in an orbital motion around the sphere
    scene.onBeforeRenderObservable.add(() => {
        camera.alpha += 0.01;
    });
});
