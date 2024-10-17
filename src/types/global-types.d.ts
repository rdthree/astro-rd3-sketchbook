// src\types\global-types.d.ts
import p5 from 'p5';
import * as d3 from 'd3';
import * as THREE from 'three';

declare global {
  // p5.js is a default export
  const p5: typeof p5;

  // D3.js uses named exports, aggregated under the d3 namespace
  const d3: typeof d3;

  // Three.js uses named exports, aggregated under the THREE namespace
  const THREE: typeof THREE;
}

export {}; // Ensures this file is treated as a module
