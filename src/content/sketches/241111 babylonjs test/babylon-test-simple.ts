import { defineSketch } from '../../../renderers/babylonRenderer';
import {FreeCamera, HemisphericLight, MeshBuilder, StandardMaterial} from "@babylonjs/core";


export default defineSketch(({ scene, Vector3 }) => {
    // Create light
    const light = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    
    // Create sphere
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 5 }, scene);

        // Remove default camera
        scene.cameras[0].dispose();

        // Create new FreeCamera
        const camera = new FreeCamera("myCamera", new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl();

        // Add camera movement if desired
        scene.onBeforeRenderObservable.add(() => {
            camera.position.x = Math.sin(Date.now() * 0.001) * 10;
            camera.position.z = Math.cos(Date.now() * 0.001) * 10;
            camera.setTarget(sphere.position);
        });
    });
