import { defineSketch } from '../../../renderers/babylonRenderer';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { LinesMesh } from '@babylonjs/core/Meshes/linesMesh';
import { PointLight, HemisphericLight } from '@babylonjs/core/Lights';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';

export default defineSketch(async ({ scene }) => {
    // Setup camera
    scene.activeCamera?.dispose();
    const camera = new FreeCamera('camera', new Vector3(20, 20, 20), scene);
    camera.setTarget(Vector3.Zero());

    // Setup lights
    new HemisphericLight('hemiLight', new Vector3(1, 1, 0), scene).intensity = 0.7;

    // Create material once
    const markerMat = new StandardMaterial('markerMat', scene);
    markerMat.diffuseColor = markerMat.emissiveColor = new Color3(1, 0.2, 0.4);

    // Walker setup
    const dirs = [
        new Vector3(1, 0, 0), new Vector3(-1, 0, 0),
        new Vector3(0, 1, 0), new Vector3(0, -1, 0),
        new Vector3(0, 0, 1), new Vector3(0, 0, -1),
    ];

    let pos = Vector3.Zero();
    const trail: Vector3[] = [pos.clone()];
    const marker = MeshBuilder.CreateBox('marker', { size: 0.5 }, scene);
    marker.material = markerMat;
    const light = new PointLight('walkerLight', pos.clone(), scene);
    light.intensity = 0.8;
    light.diffuse = new Color3(1, 0.2, 0.4);
    let trailMesh: LinesMesh | null = null;

    const step = () => {
        pos.addInPlace(dirs[Math.floor(Math.random() * dirs.length)]);
        trail.push(pos.clone());
        if (trail.length > 5000) trail.shift();
        marker.position.copyFrom(pos);
        light.position.copyFrom(pos);
        trailMesh?.dispose();
        trailMesh = MeshBuilder.CreateLines('trail', { points: trail }, scene);
        trailMesh.color = new Color3(1, 0.2, 0.4);
    };

    scene.onBeforeRenderObservable.add(() => {
        for (let i = 0; i < 3; i++) step();
        const time = Date.now() * 0.001;
        const radius = 80;
        camera.position.set(Math.sin(time * 0.1) * radius, 40, Math.cos(time * 0.1) * radius);
        camera.setTarget(Vector3.Zero());
    });

    scene.clearColor = new Color4(0.98, 0.98, 0.98, 1);
});
