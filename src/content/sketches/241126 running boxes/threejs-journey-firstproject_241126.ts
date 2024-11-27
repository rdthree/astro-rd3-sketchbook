import { defineSketch } from '../../../renderers/threeRenderer';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

export default defineSketch(({ scene, renderer }) => {

    // Scene setup
    scene.background = new THREE.Color('ghostwhite');

    // Soft lighting
    const ambientLight = new THREE.AmbientLight('skyblue', 0.5);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight('orange', 2.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Axes helper (optional)
    // const axesHelper = new THREE.AxesHelper(1.2);
    // scene.add(axesHelper);

    // Sizes
    const sizes = { width: window.innerWidth, height: window.innerHeight };

    // Group setup
    const boxGroup = new THREE.Group();
    boxGroup.scale.set(1.0, 2.0, 1.0);
    boxGroup.rotation.set(0.0, 0.2, 0.0);

    directionalLight.lookAt(boxGroup.position);
    scene.add(boxGroup);

    // Objects
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 'ghostwhite' });

    const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), cubeMaterial);
    cube1.position.set(-2.0, 0.0, 0.0);
    boxGroup.add(cube1);

    const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), cubeMaterial);
    cube2.position.set(0.0, 0.0, 0.0);
    boxGroup.add(cube2);

    const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), cubeMaterial);
    cube3.position.set(2.0, 0.0, 0.0);
    boxGroup.add(cube3);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 5.5;
    scene.add(camera);

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: Enable damping for smoother experience
    controls.dampingFactor = 0.05;
    controls.minDistance = 2; // Optional: Set minimum zoom distance
    controls.maxDistance = 10; // Optional: Set maximum zoom distance

    // Resize Handler
    const handleResize = () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Initial resize
    handleResize();

    // Camera looks at the group
    camera.lookAt(boxGroup.position);

    // Renderer size setup (redundant due to handleResize, can be removed)
    // renderer.setSize(sizes.width, sizes.height);

    // Animation
    const clock = new THREE.Clock();
    const tick = () => {
        // Time
        const elapsedTime = clock.getElapsedTime();

        // Update objects
        boxGroup.rotation.y = 0.65 * elapsedTime;
        directionalLight.rotation.y = 2.5 * elapsedTime;
        cube1.position.y = Math.sin(elapsedTime);
        cube2.position.y = Math.cos(elapsedTime);
        cube3.position.z = Math.tan(elapsedTime);

        cube1.scale.x = 1 + Math.cos(elapsedTime * 0.8) * 0.5;
        cube2.scale.z = 1 + Math.sin(elapsedTime * 0.8) * 0.5;
        cube3.scale.y = 1 + Math.sin(elapsedTime * 0.8) * 0.5;

        // Update controls
        controls.update();

        // Render the scene
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };

    tick();
});
