import { defineSketch } from '../../../renderers/threeRenderer';
import {
    PerspectiveCamera,
    Vector3,
    BufferGeometry,
    Color,
    Points,
    PointsMaterial
} from 'three';

export default defineSketch(({ scene, renderer }) => {
    // Create a custom camera for this sketch.
    const camera = new PerspectiveCamera(
        75,
        renderer.domElement.clientWidth / renderer.domElement.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 2); // Closer camera for better 2D scale.
    camera.lookAt(0, 0, 0);

    // Setup scene background.
    scene.background = new Color(0xfbfbfb);

    // Walker setup with tiny steps (0.01 units).
    let pos = new Vector3();
    const trail: Vector3[] = [pos.clone()];

    // Create trail with THREE.Points.
    const trailGeometry = new BufferGeometry().setFromPoints(trail);
    const trailMaterial = new PointsMaterial({
        color: 0x211111,
        size: 0.0125, // Adjust size as needed.
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.5,
    });
    const trailPoints = new Points(trailGeometry, trailMaterial);
    scene.add(trailPoints);

    // Walker movement with random directions.
    const getRandomDirection = (): Vector3 => {
        const angle = Math.random() * Math.PI * 2;
        return new Vector3(Math.cos(angle) * 0.01, Math.sin(angle) * 0.01, 0);
    };

    const step = () => {
        const direction = getRandomDirection();
        pos.add(direction);
        trail.push(pos.clone());

        // Update trail geometry.
        trailGeometry.setFromPoints(trail);
        trailGeometry.attributes.position.needsUpdate = true;
    };

    // Animation loop.
    const animate = () => {
        for (let i = 0; i < 100; i++) step();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();

    // Handle resizing for both renderer and camera.
    const handleResize = () => {
        camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight, false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
});
