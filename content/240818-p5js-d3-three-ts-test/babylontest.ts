// TypeScript-specific imports for type information (Babylon.js types)
import type { Engine, Scene, FreeCamera, HemisphericLight, Vector3, MeshBuilder } from '@babylonjs/core';

// Runtime Babylon.js library, loaded via the CDN.
declare const BABYLON: {
    Engine: typeof Engine;
    Scene: typeof Scene;
    FreeCamera: typeof FreeCamera;
    HemisphericLight: typeof HemisphericLight;
    Vector3: typeof Vector3;
    MeshBuilder: typeof MeshBuilder;
};

console.log("Babylon.js script starting to execute...");

// Select the canvas element
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
if (!canvas) {
    console.error("Canvas with ID 'renderCanvas' not found.");
} else {
    // Create Babylon engine
    const engine = new BABYLON.Engine(canvas, true);
    console.log("Babylon engine created:", engine);

    // Create a scene function
    const createScene = function (): Scene {
        const scene = new BABYLON.Scene(engine);

        // Create a camera and set up
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        // Create a hemispheric light
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Create a sphere
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
        sphere.position.y = 1;

        // Create a ground
        BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

        return scene;
    };

    // Create the scene
    const scene = createScene();

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Handle resizing of the window
    window.addEventListener("resize", function () {
        engine.resize();
    });

    console.log("Babylon.js script finished executing");
}
