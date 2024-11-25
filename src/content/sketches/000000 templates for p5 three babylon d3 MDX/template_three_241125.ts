import { defineSketch } from '../../../renderers/threeRenderer';
import { Vector3 } from 'three';

export default defineSketch(async ({ scene, camera }) => {
    const {
        Mesh, MeshStandardMaterial, BufferGeometry,
        Color, DirectionalLight, AmbientLight
    } = await import('three');

    // Setup scene
    scene.background = new Color(0xf8f8f8);

    // Lighting
    const dirLight = new DirectionalLight(0xffffff, 2);
    dirLight.position.set(1, 1, 0);
    scene.add(dirLight, new AmbientLight(0x404040));

    // Camera setup
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
    };

    animate();
});
