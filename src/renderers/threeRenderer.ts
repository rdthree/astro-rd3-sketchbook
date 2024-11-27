// file: src\renderers\threeRenderer.ts
/**
 * Core Three.js setup and utility functions
 * This file handles all the basic Three.js initialization and provides a clean API for sketches.
 */

/**
 * Statically imports essential Three.js modules.
 * Using static imports enables tree-shaking, simplifies the code,
 * and improves performance by allowing the bundler to remove unused parts of the library.
 * Includes core classes needed for basic 3D scene creation.
 */
import { WebGLRenderer, Scene } from 'three';

/**
 * Creates and sets up a complete Three.js scene without a default camera.
 * @param canvas - The HTML canvas element where the 3D scene will be rendered.
 * @returns Object containing the scene and renderer.
 */
export async function createScene(canvas: HTMLCanvasElement) {
    // Create renderer with antialiasing for smoother edges.
    const renderer = new WebGLRenderer({ canvas, antialias: true });

    // Create an empty 3D scene.
    const scene = new Scene();

    /**
     * Handles canvas resizing when window size changes.
     * Updates renderer size to match new dimensions.
     */
    const handleResize = () => {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return { scene, renderer };
}

/**
 * Type definition for sketch initialization function.
 * This is what each individual sketch will implement.
 * Provides access to scene, renderer, and other Three.js utilities.
 */
export type SketchInitializer = (
    context: {
        scene: Scene;
        renderer: WebGLRenderer;
    }
) => void | Promise<void>;

/**
 * Helper function to define a new sketch.
 * Makes sketch creation more intuitive and provides proper typing.
 * @param initSketch - The sketch initialization function.
 */
export function defineSketch(initSketch: SketchInitializer) {
    return initSketch;
}
