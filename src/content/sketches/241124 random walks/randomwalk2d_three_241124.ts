import { defineSketch } from '../../../renderers/threeRenderer';
import { Vector3, BufferGeometry, Color, Points, PointsMaterial } from 'three';

export default defineSketch(async ({ scene, camera }) => {
    // Setup scene background
    scene.background = new Color(0xfbfbfb);

    // Walker setup with tiny steps (0.01 units)
    let pos = new Vector3();
    const trail: Vector3[] = [pos.clone()];

    // Create trail with THREE.Points
    const trailGeometry = new BufferGeometry().setFromPoints(trail);
    const trailMaterial = new PointsMaterial({
        color: 0x211111,
        size: 0.0125,  // Adjust size as needed
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.5,
    });
    const trailPoints = new Points(trailGeometry, trailMaterial);
    scene.add(trailPoints);

    // Walker movement with random directions
    const getRandomDirection = (): Vector3 => {
        const angle = Math.random() * Math.PI * 2;
        return new Vector3(Math.cos(angle) * 0.01, Math.sin(angle) * 0.01, 0);
    };

    const step = () => {
        const direction = getRandomDirection();
        pos.add(direction);
        trail.push(pos.clone());

        // Debugging log
        console.log(`Trail length: ${trail.length}, Position: (${pos.x.toFixed(3)}, ${pos.y.toFixed(3)}, ${pos.z.toFixed(3)})`);

        // Update trail geometry
        trailGeometry.setFromPoints(trail);
        trailGeometry.attributes.position.needsUpdate = true;
    };

    // Camera setup for 2D view
    camera.position.set(0, 0, 1);  // Closer camera for better scale
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
        for (let i = 0; i < 100; i++) step();
        requestAnimationFrame(animate);
    };

    animate();
});
