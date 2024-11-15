// file: src\content\sketches\241111%20babylonjs%20test\babylon-test-simple.ts
/**
 * Basic Babylon.js Demo Sketch
 * Demonstrates:
 * - Basic lighting
 * - Simple geometry (sphere)
 * - Camera animation (orbital movement)
 */
import { defineSketch } from '../../../renderers/babylonRenderer';
import {HemisphericLight, MeshBuilder } from "@babylonjs/core";

export default defineSketch(({ scene, Vector3, camera }) => {

    // Add ambient lighting
    const light = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);

    // Create a simple sphere as our subject
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);

    //Animate camera in an orbital motion around the sphere
    scene.onBeforeRenderObservable.add(() => {
        camera.alpha += 0.01;
    });
});
