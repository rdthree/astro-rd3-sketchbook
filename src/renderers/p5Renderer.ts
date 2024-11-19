/**
 * Core p5.js setup and utility functions
 * This file handles all the basic p5.js initialization and provides a clean API for sketches
 */

import type p5 from 'p5';

/**
 * Type definition for sketch initialization function
 * This is what each individual sketch will implement
 */
export type SketchInitializer = (p: p5) => void;

/**
 * Creates and sets up a complete p5.js sketch
 * @param container - The HTML element where the p5 sketch will be rendered
 * @param sketch - The sketch initialization function
 */
export async function createScene(container: HTMLElement, sketch: SketchInitializer) {
    const p5 = (await import('p5')).default;
    new p5(sketch, container);
}

/**
 * Helper function to define a new sketch
 * Makes sketch creation more intuitive and provides proper typing
 */
export function defineSketch(sketch: SketchInitializer) {
    return sketch;
}
