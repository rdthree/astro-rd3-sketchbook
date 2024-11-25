import { defineSketch } from '../../../renderers/threeRenderer';
import type { Vector3, Mesh, LineBasicMaterial, PointLight } from 'three';

export default defineSketch(async ({ scene, camera }) => {
    const {
        BoxGeometry,
        Mesh: ThreeMesh,
        MeshStandardMaterial,
        Vector3,
        BufferGeometry,
        LineBasicMaterial,
        Line,
        Color,
        DirectionalLight,
        AmbientLight,
        PointLight
    } = await import('three');

    // Set background color
    scene.background = new Color(0xf8f8f8);

    // Setup lights
    const directionalLight = new DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight, new AmbientLight(0x404040, 1.5));

    // Initialize walker elements
    const dirs = [
        new Vector3(1, 0, 0), new Vector3(-1, 0, 0),
        new Vector3(0, 1, 0), new Vector3(0, -1, 0),
        new Vector3(0, 0, 1), new Vector3(0, 0, -1)
    ];
    let pos = new Vector3(0, 0, 0);
    const trail: Vector3[] = [pos.clone()];

    const markerMat = new MeshStandardMaterial({
        color: 0xff3366,
        emissive: 0xff3366,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2
    });
    const marker = new ThreeMesh(new BoxGeometry(0.5, 0.5, 0.5), markerMat);
    scene.add(marker);

    const lineMat = new LineBasicMaterial({ color: 0xff3366, linewidth: 2 });
    const trailGeo = new BufferGeometry().setFromPoints(trail);
    const trailLine = new Line(trailGeo, lineMat);
    scene.add(trailLine);

    const walkerLight = new PointLight(0xff3366, 4, 10);
    scene.add(walkerLight);

    // Walker step function
    const step = () => {
        pos.add(dirs[Math.floor(Math.random() * dirs.length)]);
        trail.push(pos.clone());
        if (trail.length > 5000) trail.shift();

        marker.position.copy(pos);
        walkerLight.position.copy(pos);

        trailGeo.setFromPoints(trail);
    };

    // Camera setup
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
        for (let i = 0; i < 3; i++) step();

        const time = Date.now() * 0.001;
        const radius = 80;
        camera.position.set(
            Math.sin(time * 0.1) * radius,
            40,
            Math.cos(time * 0.1) * radius
        );
        camera.lookAt(0, 0, 0);

        requestAnimationFrame(animate);
    };

    animate();
});
