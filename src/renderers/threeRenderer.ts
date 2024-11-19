// file: src\renderers\threeRenderer.ts
/**
 * Core Three.js setup and utility functions
 * This file handles all the basic Three.js initialization and provides a clean API for sketches
 */

/**
 * Dynamically imports and returns essential Three.js modules
 * Using dynamic imports helps with performance by loading modules only when needed
 * Returns core classes needed for basic 3D scene creation
 */
export async function getThree() {
    const { Scene } = await import('three');          // Container that holds all 3D objects, lights, and cameras
    const { WebGLRenderer } = await import('three');  // Renders the 3D scene using WebGL
    const { PerspectiveCamera } = await import('three'); // Camera that mimics human eye perspective
    const { Vector3 } = await import('three');        // Used for 3D coordinates and calculations

    return {
        Scene,
        WebGLRenderer,
        PerspectiveCamera,
        Vector3
    };
}

/**
 * Creates and sets up a complete Three.js scene
 * @param canvas - The HTML canvas element where the 3D scene will be rendered
 * @returns Object containing the scene, renderer, camera, and Three.js utilities
 */
export async function createScene(canvas: HTMLCanvasElement) {
    const three = await getThree();
    // Create renderer with antialiasing for smoother edges
    const renderer = new three.WebGLRenderer({ canvas, antialias: true });
    // Create an empty 3D scene
    const scene = new three.Scene();

    // Set up the camera
    // Parameters: Field of View (75 degrees), Aspect Ratio, Near clipping plane, Far clipping plane
    const camera = new three.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    // Move camera back 5 units so we can see objects at origin (0,0,0)
    camera.position.z = 5;

    /**
     * Handles canvas resizing when window size changes
     * Updates camera aspect ratio and renderer size to match new dimensions
     */
    const handleResize = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    /**
     * Main animation loop
     * This function runs every frame (typically 60 times per second)
     * It renders the scene from the camera's perspective
     */
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    return { scene, renderer, camera, ...three };
}

// Type definition for the Three.js modules we imported
export type Three = Awaited<ReturnType<typeof getThree>>;

/**
 * Type definition for sketch initialization function
 * This is what each individual sketch will implement
 * Provides access to scene, camera, and other Three.js utilities
 */
export type SketchInitializer = (
    context: Omit<Three, 'Scene' | 'WebGLRenderer'> & {
        scene: InstanceType<Three['Scene']>,
        camera: InstanceType<Three['PerspectiveCamera']>,
    }
) => void | Promise<void>;

/**
 * Helper function to define a new sketch
 * Makes sketch creation more intuitive and provides proper typing
 * @param initSketch - The sketch initialization function
 */
export function defineSketch(initSketch: SketchInitializer) {
    return initSketch;
}