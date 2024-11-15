"use strict";
// src\content\sketches\240818%20p5js-d3-three-ts-test\babylontest.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => __awaiter(void 0, void 0, void 0, function* () {
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
    // Dynamically import Babylon.js modules
    const [{ Engine }, { Scene }, { ArcRotateCamera }, { Vector3 }, { HemisphericLight }, { MeshBuilder },] = yield Promise.all([
        import("@babylonjs/core/Engines/engine"),
        import("@babylonjs/core/scene"),
        import("@babylonjs/core/Cameras/arcRotateCamera"),
        import("@babylonjs/core/Maths/math.vector"),
        import("@babylonjs/core/Lights/hemisphericLight"),
        import("@babylonjs/core/Meshes/meshBuilder"),
        import("@babylonjs/core/Materials/standardMaterial"),
    ]);
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
    // SLOW BUILDS
    // Hide/show the Inspector
    // window.addEventListener("keydown", async (ev) => {
    //     if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "I") {
    //         if (scene.debugLayer.isVisible()) {
    //             scene.debugLayer.hide();
    //         } else {
    //             // Dynamically import the debug layer and inspector
    //             await import("@babylonjs/core/Debug/debugLayer");
    //             await import("@babylonjs/inspector");
    //             scene.debugLayer.show();
    //         }
    //     }
    // });
    // Run the render loop
    engine.runRenderLoop(() => {
        scene.render();
    });
    // Handle window resize
    window.addEventListener("resize", () => {
        engine.resize();
    });
}))();