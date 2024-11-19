import { defineSketch } from '../../../renderers/threeRenderer';

export default defineSketch(async ({ scene, camera }) => {
    // Dynamic imports for Three.js modules
    const { SphereGeometry, Mesh, MeshStandardMaterial } = await import('three');
    const { DirectionalLight, AmbientLight } = await import('three');

    // Set up lighting
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0x404040);
    scene.add(ambientLight);

    // Create a sphere
    const geometry = new SphereGeometry(1.5, 32, 32);
    const material = new MeshStandardMaterial({ color: 0x3366ff });
    const sphere = new Mesh(geometry, material);
    scene.add(sphere);

    // Position camera
    camera.position.set(0, 2, -4);
    camera.lookAt(sphere.position);

    // Animate camera in orbital motion
    function animate() {
        const time = Date.now() * 0.001;
        camera.position.x = Math.sin(time) * 4;
        camera.position.z = Math.cos(time) * 4;
        camera.lookAt(sphere.position);
        requestAnimationFrame(animate);
    }
    animate();
});
