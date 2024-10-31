// src\types\global-types.d.ts

declare global {
    // p5.js is a default export
    const p5: typeof p5;

    // D3.js uses named exports, aggregated under the d3 namespace
    const d3: typeof d3;

    // Three.js uses named exports, aggregated under the THREE namespace
    const THREE: typeof THREE;
}

export {}; // Ensures this file is treated as a module
