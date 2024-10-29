
import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector"; // this doesn't work without customizing the window
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

console.log("babylonjs test");

function createBabylonScene() {
    // Get the container element
    const container = document.getElementById("babylon-test");
    if (!container) {
        console.error("Container with id 'babylon-test' not found");
        return;
    }

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    // Initialize Babylon.js scene and engine
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    // Create camera
    const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Create light
    const light = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    // Create sphere
    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

    // Hide/show the Inspector
    window.addEventListener("keydown", (ev) => {
        if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else {
                scene.debugLayer.show();
            }
        }
    });

    // Run the render loop
    engine.runRenderLoop(() => {
        scene.render();
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        engine.resize();
    });
}

// Run the function when the DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createBabylonScene);
} else {
    createBabylonScene();
}

console.log("Babylon.js test script running");
