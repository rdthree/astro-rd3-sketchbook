// file: src\renderers\babylonRenderer.ts
/**
 * Core Babylon.js renderer setup and utilities
 * Handles the essential scene creation, engine initialization, and basic camera setup.
 * Provides the foundation for all Babylon.js sketches in the project.
 * Sketches can build on top of this base setup with their own custom elements.
 * Cameras can be added, removed, modified, or replaced as needed within the sketches
 */

/**
 * Loads and returns core Babylon.js modules needed for basic scene functionality.
 * Keeps imports minimal - sketches can import additional modules as needed.
 */
export async function getBabylon() {
    const { Engine } = await import('@babylonjs/core/Engines/engine');
    const { Scene } = await import('@babylonjs/core/scene');
    const { ArcRotateCamera } = await import('@babylonjs/core/Cameras/arcRotateCamera');
    const { Vector3 } = await import('@babylonjs/core/Maths/math.vector');
    //const { HemisphericLight } = await import('@babylonjs/core/Lights/hemisphericLight');
    //const { MeshBuilder } = await import('@babylonjs/core/Meshes/meshBuilder');
    //const { StandardMaterial } = await import('@babylonjs/core/Materials/standardMaterial');

    return {
        Engine,
        Scene,
        ArcRotateCamera,
        Vector3,
        //HemisphericLight, MeshBuilder, StandardMaterial
    };
}

/**
 * Creates and initializes a new Babylon.js scene
 * Sets up the rendering engine, scene, default camera and render loop
 * @param canvas The HTML canvas element to render to
 * @returns Scene setup and core Babylon.js components
 */
export async function createScene(canvas: HTMLCanvasElement) {
    const babylon = await getBabylon();
    const engine = new babylon.Engine(canvas, true);
    const scene = new babylon.Scene(engine);

    // Default camera setup - can be overridden in individual sketches
    const camera = new babylon.ArcRotateCamera(
        'Camera',
        Math.PI / 2,
        Math.PI / 2,
        2,
        babylon.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    // Start render loop and handle window resizing
    engine.runRenderLoop(() => scene.render());
    window.addEventListener('resize', () => engine.resize());

    return { scene, engine, camera, ...babylon };
}

// Type definitions for sketch creation and initialization
export type Babylon = Awaited<ReturnType<typeof getBabylon>>;
export type SketchInitializer = (
    context: Omit<Babylon, 'Engine' | 'Scene'> & { 
        scene: InstanceType<Babylon['Scene']>,
        camera: InstanceType<Babylon['ArcRotateCamera']>,
    }
) => void | Promise<void>;
export type DefinedSketch = ReturnType<typeof defineSketch>;

/**
 * Helper function to define a new Babylon.js sketch
 * Provides type safety and consistent sketch structure
 */
export function defineSketch(initSketch: SketchInitializer) {
    return initSketch;
}