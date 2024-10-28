// src\types\global-types.d.ts
declare global {
  let p5: typeof import('p5');
  let d3: typeof import('d3');
  let THREE: typeof import('three');
  let BABYLON: typeof import('@babylonjs/core');
}

// This is technically more correct than the original because:
// 1. Using 'var' instead of 'const' in global declarations is preferred
// 2. Using typeof import() avoids potential circular references
// 3. No need to import the modules at the top since we're using typeof import()

export {}; // Keep this to ensure the file is treated as a module
