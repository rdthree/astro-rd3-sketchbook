// file: src\content\sketches\241111%20babylonjs%20test\babylon-test-simple.ts
/**
 * Basic Babylon.js Demo Sketch
 * Demonstrates:
 * - Custom camera setup (FreeCamera)
 * - Basic lighting
 * - Simple geometry (sphere)
 * - Camera animation (orbital movement)
 */
import { defineSketch } from '../../../renderers/babylonRenderer';
import {FreeCamera, HemisphericLight, MeshBuilder, StandardMaterial} from "@babylonjs/core";

export default defineSketch(({ scene, Vector3 }) => {
    // Replace default camera with a custom FreeCamera
    scene.cameras[0].dispose();
    const camera = new FreeCamera("myCamera", new Vector3(0, 2, -4), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl();

    // Add ambient lighting
    const light = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);

    // Create a simple sphere as our subject
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 3 }, scene);

    // Animate camera in an orbital motion around the sphere
    scene.onBeforeRenderObservable.add(() => {
        camera.position.x = Math.sin(Date.now() * 0.001) * 4;
        camera.position.z = Math.cos(Date.now() * 0.001) * 4;
        camera.setTarget(sphere.position);
    });
});
