import { defineSketch } from '../../../renderers/babylonRenderer';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { HemisphericLight } from '@babylonjs/core/Lights';

export default defineSketch(async ({ scene }) => {
    // Setup camera
    scene.activeCamera?.dispose();
    const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());

    // Setup lights
    new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    // Scene setup
    scene.clearColor = new Color4(0.98, 0.98, 0.98, 1);

    // Animation loop
    scene.onBeforeRenderObservable.add(() => {
        // Animation code here
    });
});
