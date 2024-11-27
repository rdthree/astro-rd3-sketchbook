import { defineSketch } from '../../../renderers/threeRenderer';
import {
    Scene,
    PerspectiveCamera,
    Vector3,
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    BufferGeometry,
    LineBasicMaterial,
    Line,
    Color,
    DirectionalLight,
    AmbientLight,
    PointLight
} from 'three';

export default defineSketch(({ scene, renderer }) => {
    // Create a custom camera for this sketch
    const camera = new PerspectiveCamera(
        75,
        renderer.domElement.clientWidth / renderer.domElement.clientHeight,
        0.1,
        1000
    );
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // Setup scene
    scene.background = new Color(0xf8f8f8);
    const dirLight = new DirectionalLight(0xffffff, 2);
    dirLight.position.set(1, 1, 0);
    scene.add(dirLight, new AmbientLight(0x404040, 1.5));

    // Walker setup
    const dirs = [
        new Vector3(1, 0, 0), new Vector3(-1, 0, 0),
        new Vector3(0, 1, 0), new Vector3(0, -1, 0),
        new Vector3(0, 0, 1), new Vector3(0, 0, -1)
    ];
    let pos = new Vector3();
    const trail = [pos.clone()];

    const marker = new Mesh(
        new BoxGeometry(0.5, 0.5, 0.5),
        new MeshStandardMaterial({
            color: 0xff3366,
            emissive: 0xff3366,
            emissiveIntensity: 0.5,
            metalness: 0.8,
            roughness: 0.2
        })
    );
    scene.add(marker);

    const trailLine = new Line(
        new BufferGeometry().setFromPoints(trail),
        new LineBasicMaterial({ color: 0xff3366, linewidth: 2 })
    );
    scene.add(trailLine);

    const walkerLight = new PointLight(0xff3366, 4, 10);
    scene.add(walkerLight);

    // Walker movement
    const step = () => {
        pos.add(dirs[Math.floor(Math.random() * dirs.length)]);
        trail.push(pos.clone());
        if (trail.length > 50000) trail.shift();
        marker.position.copy(pos);
        walkerLight.position.copy(pos);
        trailLine.geometry.setFromPoints(trail);
    };

    // Animation loop
    const animate = () => {
        for (let i = 0; i < 3; i++) step();
        const time = Date.now() * 0.001;
        const radius = 80;
        camera.position.set(
            Math.sin(time * 0.1) * radius,
            20,
            Math.cos(time * 0.1) * radius
        );
        camera.lookAt(0, 0, 0);
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();

    // Handle resizing for both renderer and camera
    const handleResize = () => {
        camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight, false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
});
