import type { Selection } from 'd3';

/**
 * Core D3.js setup and utility functions
 * This file handles all the basic D3.js initialization and provides a clean API for sketches
 */

/**
 * Dynamically imports and returns essential D3.js modules
 * Using dynamic imports helps with performance by loading modules only when needed
 */
export async function getD3() {
    const d3 = await import('d3');
    return d3;
}

/**
 * Creates and sets up a complete D3.js scene
 * @param container - The HTML element where the D3 visualization will be rendered
 * @returns Object containing the svg, d3 instance, and utilities
 */
export async function createScene(container: HTMLElement) {
    const d3 = await getD3();
    
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create SVG container with responsive sizing
    const svg = d3.select(container)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`);

    /**
     * Handles container resizing when window size changes
     * Updates SVG viewBox to match new dimensions
     */
    const handleResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        svg.attr('viewBox', `0 0 ${newWidth} ${newHeight}`);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return { svg, d3 };
}

// Type definition for the D3.js modules we imported
export type D3 = Awaited<ReturnType<typeof getD3>>;

/**
 * Type definition for sketch initialization function
 * This is what each individual sketch will implement
 * Provides access to svg and D3 utilities
 */
export type SketchInitializer = (
    context: {
        svg: Selection<SVGSVGElement, unknown, null, undefined>,
        d3: D3
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
