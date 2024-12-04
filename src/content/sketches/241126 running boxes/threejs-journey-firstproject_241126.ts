// Import necessary modules and types
import { defineSketch } from '../../../renderers/threeRenderer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import gsap from 'gsap';
import GUI from 'lil-gui';

// Define types for parameters and cursor location
type Parameters = {
    boxRotationSpeed: number;
    lightRotationSpeed: number;
    boxColor: string;
    lightColor: string;
    boxScale: number;
};

type Cursor = {
    x: number;
    y: number;
};

/**
 * Sets up the Graphical User Interface (GUI).
 */
const setupGUI = (
    params: Parameters,
    boxGroup: THREE.Group,
    cubes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[],
    light: THREE.DirectionalLight,
    container: HTMLElement
): GUI => {
    const gui = new GUI({ container }).close();

    gui.add(params, 'boxRotationSpeed', 0, 5, 0.1).name('Box Rotation');
    gui.add(params, 'lightRotationSpeed', 0, 5, 0.1).name('Light Rotation');
    gui.add(params, 'boxScale', 0.1, 3, 0.1)
        .name('Box Scale')
        .onChange((value: number) => { // Added type annotation
            boxGroup.scale.set(value, value * 2, value);
        });
    gui.addColor(params, 'boxColor')
        .name('Box Color')
        .onChange((color: string) => { // Added type annotation
            cubes.forEach(cube => cube.material.color.set(color));
        });
    gui.addColor(params, 'lightColor').name('Light Color').onChange((color: string) => { // Added type annotation
        light.color.set(color);
    });

    Object.assign(gui.domElement.style, {
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: '100',
    });

    return gui;
};

/**
 * Creates a cube mesh.
 */
const createCube = (
    position: THREE.Vector3,
    color: string = 'ghostwhite'
): THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial> => { // Specified generic types
    const cube = new THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color })
    );
    cube.position.copy(position);
    return cube;
};

/**
 * Sets up the Heads-Up Display (HUD).
 */
const setupHUD = (canvas: HTMLCanvasElement): HTMLDivElement => {
    const hud = document.createElement('div');
    Object.assign(hud.style, {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '5px 10px',
        fontFamily: 'monospace',
        fontSize: '14px',
        textAlign: 'right',
        pointerEvents: 'none',
        zIndex: '100',
        maxWidth: 'calc(100% - 20px)',
        boxSizing: 'border-box',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    });

    const parent = canvas.parentElement;
    if (parent) {
        const computedStyle = getComputedStyle(parent);
        if (computedStyle.position === 'static') {
            parent.style.position = 'relative';
        }
        parent.appendChild(hud);
    } else {
        console.warn('Canvas has no parent element. HUD will not be displayed.');
    }

    return hud;
};

// Main sketch function
export default defineSketch(({ scene, renderer }) => {
    // Initialize parameters
    const params: Parameters = {
        boxRotationSpeed: 0.65,
        lightRotationSpeed: 2.5,
        boxColor: '#ffffff',
        lightColor: '#ffa500',
        boxScale: 1.0,
    };

    // Set renderer size
    const sizes = { width: 840, height: 630 };
    renderer.setSize(sizes.width, sizes.height);
    const aspectRatio = sizes.width / sizes.height;

    // Set scene background
    scene.background = new THREE.Color('ghostwhite');

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    scene.add(camera);

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Add lights
    const ambientLight = new THREE.AmbientLight('skyblue', 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(params.lightColor, 2.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Optional: Add axes helper
    scene.add(new THREE.AxesHelper(0.5));

    // Create a group for boxes
    const boxGroup = new THREE.Group();
    boxGroup.scale.set(params.boxScale, params.boxScale * 2, params.boxScale);
    boxGroup.rotation.set(0, 0.2, 0);
    scene.add(boxGroup);

    // Create and add cubes to the group
    const cubePositions = [
        new THREE.Vector3(-2, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(2, 0, 0),
    ];
    const cubes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = cubePositions.map(pos => createCube(pos, params.boxColor));
    cubes.forEach(cube => boxGroup.add(cube));

    // Initialize cursor tracking
    const cursor: Cursor = { x: 0, y: 0 };
    renderer.domElement.addEventListener('mousemove', (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        cursor.x = (event.clientX - rect.left) / rect.width - 0.5;
        cursor.y = 0.5 - (event.clientY - rect.top) / rect.height;
    });

    // Ensure parent element styling
    const parent = renderer.domElement.parentElement;
    if (parent) {
        const computedStyle = getComputedStyle(parent);
        if (computedStyle.position === 'static') {
            parent.style.position = 'relative';
        }
        parent.style.width = `${sizes.width}px`;
        parent.style.height = `${sizes.height}px`;
        parent.style.overflow = 'hidden';
    } else {
        console.warn('Canvas has no parent element.');
    }

    // Setup HUD and GUI
    const hud = setupHUD(renderer.domElement);
    setupGUI(params, boxGroup, cubes, directionalLight, parent!);

    // Handle window resize
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth * 0.75;
        sizes.height = window.innerHeight * 0.75;
        const newAspect = sizes.width / sizes.height;

        // Update renderer and camera
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.aspect = newAspect;
        camera.updateProjectionMatrix();

        // Update parent size
        if (parent) {
            parent.style.width = `${sizes.width}px`;
            parent.style.height = `${sizes.height}px`;
        }
    });

    // Toggle fullscreen on double click
    window.addEventListener('dblclick', () => {
        if (!document.fullscreenElement) {
            renderer.domElement.requestFullscreen().catch(console.error);
        } else {
            document.exitFullscreen().catch(console.error);
        }
    });

    // Initialize GSAP animation
    gsap.to(boxGroup.rotation, {
        z: Math.PI * 4, // 720 degrees
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
    });

    // Initialize clock for additional animations
    const clock = new THREE.Clock();

    // Animation loop
    const animate = () => {
        const elapsed = clock.getElapsedTime();

        // Update rotations based on parameters
        boxGroup.rotation.y = params.boxRotationSpeed * elapsed;
        directionalLight.rotation.y = params.lightRotationSpeed * elapsed;

        // Animate cube positions and scales
        cubes[0].position.y = Math.sin(elapsed);
        cubes[1].position.y = Math.cos(elapsed);
        cubes[2].position.z = Math.tan(elapsed);

        cubes[0].scale.x = 1 + Math.cos(elapsed * 0.8) * 0.5;
        cubes[1].scale.z = 1 + Math.sin(elapsed * 0.8) * 0.5;
        cubes[2].scale.y = 1 + Math.sin(elapsed * 0.8) * 0.5;

        // Update controls and render
        controls.update();
        renderer.render(scene, camera);

        // Update HUD
        hud.innerHTML = `
            <div>Cursor: (${cursor.x.toFixed(2)}, ${cursor.y.toFixed(2)})</div>
            <div>Camera: (${camera.position.x.toFixed(2)},
            ${camera.position.y.toFixed(2)},
            ${camera.position.z.toFixed(2)})</div>
        `;

        requestAnimationFrame(animate);
    };

    // Start animation
    animate();
});
