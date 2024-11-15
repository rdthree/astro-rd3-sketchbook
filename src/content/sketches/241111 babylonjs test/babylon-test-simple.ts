import { defineSketch } from '../../../renderers/babylonRenderer';

export default defineSketch(({ scene, Vector3, HemisphericLight, MeshBuilder }) => {
    // Create light
    const light = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    // Create sphere
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);
});
