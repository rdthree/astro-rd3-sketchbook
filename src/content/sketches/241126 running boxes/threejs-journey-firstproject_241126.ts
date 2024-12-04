// Import necessary modules and types
import { defineSketch } from '../../../renderers/threeRenderer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import gsap from 'gsap';
import GUI from 'lil-gui';

// Define interfaces for structured data
interface Parameters {
    boxRotationSpeed: number;
    lightRotationSpeed: number;
    boxColor: string;
    lightColor: string;
    boxScale: number;
}

interface Cursor {
    x: number;
    y: number;
}

/**
 * Utility function to set up the Graphical User Interface (GUI).
 * @param parameters - The parameters object to be manipulated via GUI.
 * @param boxGroup - The THREE.Group containing all cubes.
 * @param cubes - An array of THREE.Mesh representing the cubes.
 * @param directionalLight - The directional light in the scene.
 * @param parentElement - The parent HTML element to which the GUI will be appended.
 * @param sizes - The sizes object containing width and height of the canvas.
 * @returns The GUI instance or null if parentElement is unavailable.
 */
const setupGUI = (
    parameters: Parameters,
    boxGroup: THREE.Group,
    cubes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[],
    directionalLight: THREE.DirectionalLight,
    parentElement: HTMLElement | null,
    sizes: { width: number, height: number }
): GUI | null => { // Return the GUI instance for future reference
    if (!parentElement) {
        console.warn('Canvas has no parent element. GUI will not be displayed within the canvas.');
        return null;
    }

    const gui = new GUI({ container: parentElement }).close();

    // Set GUI styles to position it at the top-left corner
    Object.assign(gui.domElement.style, {
        position: 'absolute',
        top: '10px',    // 10px from the top
        left: '10px',   // 10px from the left
        zIndex: '100',  // Ensure GUI is above other elements
    });

    // Add GUI controls
    gui.add(parameters, 'boxRotationSpeed', 0, 5, 0.1).name('Box Rotation');
    gui.add(parameters, 'lightRotationSpeed', 0, 5, 0.1).name('Light Rotation');
    gui.add(parameters, 'boxScale', 0.1, 3.0, 0.1)
        .name('Box Scale')
        .onChange(() => {
            boxGroup.scale.set(parameters.boxScale, parameters.boxScale * 2, parameters.boxScale);
        });
    gui.addColor(parameters, 'boxColor').name('Box Color').onChange(() => {
        cubes.forEach((cube) => {
            cube.material.color.set(parameters.boxColor);
        });
    });
    gui.addColor(parameters, 'lightColor').name('Light Color').onChange(() => {
        directionalLight.color.set(parameters.lightColor);
    });

    return gui;
};

/**
 * Utility function to create a cube mesh.
 * @param position - The position where the cube will be placed.
 * @param color - The color of the cube.
 * @returns A THREE.Mesh representing the cube.
 */
const createCube = (
    position: THREE.Vector3,
    color: string = 'ghostwhite'
): THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial> => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.copy(position);
    return cube;
};

/**
 * Utility function to set up the Heads-Up Display (HUD).
 * @param canvas - The HTML canvas element where the scene is rendered.
 * @returns The HUD HTMLDivElement.
 */
const setupHUD = (canvas: HTMLCanvasElement): HTMLDivElement => {
    const hud = document.createElement('div');
    Object.assign(hud.style, {
        position: 'absolute',
        bottom: '10px',               // 10px from the bottom
        right: '10px',                // 10px from the right
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '5px 10px',
        fontFamily: 'monospace',
        fontSize: '14px',
        textAlign: 'right',           // Right-aligned text
        pointerEvents: 'none',        // Allows clicks to pass through to the canvas
        zIndex: '100',                // Ensure it's on top
        maxWidth: 'calc(100% - 20px)',// Prevent overflow on small screens
        boxSizing: 'border-box',      // Include padding in width
        borderRadius: '4px',          // Slight rounding
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
    });

    const parentElement = canvas.parentElement;
    if (parentElement) {
        const computedStyle = getComputedStyle(parentElement);
        if (computedStyle.position === 'static') {
            parentElement.style.position = 'relative'; // Set parent to relative if it's static
        }
        parentElement.appendChild(hud);
    } else {
        console.warn('Canvas has no parent element. HUD will not be displayed.');
    }

    return hud;
};

// Main sketch function
export default defineSketch(({ scene, renderer }) => {
    // **Initialize parameters**
    const parameters: Parameters = {
        boxRotationSpeed: 0.65,
        lightRotationSpeed: 2.5,
        boxColor: '#ffffff',
        lightColor: '#ffa500',
        boxScale: 1.0,
    };

    // **Set renderer size and aspect ratio**
    const sizes = { width: 840, height: 630 };
    renderer.setSize(sizes.width, sizes.height);
    let aspectRatio: number = sizes.width / sizes.height;

    // **Set scene background**
    scene.background = new THREE.Color('ghostwhite');

    // **Initialize camera**
    const camera = new THREE.PerspectiveCamera(75, aspectRatio);
    camera.position.z = 5.5;
    scene.add(camera);

    // **Initialize OrbitControls**
    const canvas = renderer.domElement;
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // **Add lights**
    const ambientLight = new THREE.AmbientLight('skyblue', 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(parameters.lightColor, 2.5);
    directionalLight.position.set(1, 1, 1);
    directionalLight.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(directionalLight);

    // **Add axes helper (optional)**
    const axesHelper = new THREE.AxesHelper(0.5);
    scene.add(axesHelper);

    // **Create a group for boxes**
    const boxGroup = new THREE.Group();
    boxGroup.scale.set(parameters.boxScale, parameters.boxScale * 2, parameters.boxScale);
    boxGroup.rotation.set(0.0, 0.2, 0.0);
    scene.add(boxGroup);

    // **Create cubes and add them to the boxGroup**
    const cubePositions = [
        new THREE.Vector3(-2.0, 0.0, 0.0),
        new THREE.Vector3(0.0, 0.0, 0.0),
        new THREE.Vector3(2.0, 0.0, 0.0),
    ];
    const cubes = cubePositions.map((position) => createCube(position, parameters.boxColor));
    cubes.forEach((cube) => boxGroup.add(cube));

    // **Set camera to look at the boxGroup**
    camera.lookAt(boxGroup.position);

    // **Initialize cursor tracking**
    const cursor: Cursor = { x: 0, y: 0 };

    // **Event handler for mouse movement**
    const onMouseMove = (event: MouseEvent): void => {
        const rect: DOMRect = canvas.getBoundingClientRect();
        // Normalize cursor.x to [-0.5, 0.5]
        cursor.x = (event.clientX - rect.left) / canvas.width - 0.5;
        // Normalize cursor.y to [-0.5, 0.5] and reverse Y-axis for intuitive control
        cursor.y = 0.5 - (event.clientY - rect.top) / canvas.height;
    };
    canvas.addEventListener('mousemove', onMouseMove);

    // **Ensure the parent element has position: relative and matches renderer size**
    const parentElement = canvas.parentElement;
    if (parentElement) {
        const computedStyle = getComputedStyle(parentElement);
        if (computedStyle.position === 'static') {
            parentElement.style.position = 'relative'; // Set to relative if static
        }
        // Initialize parent element's size to match renderer's initial size
        parentElement.style.width = `${sizes.width}px`;
        parentElement.style.height = `${sizes.height}px`;
        parentElement.style.overflow = 'hidden'; // Optional: hides any overflow
    } else {
        console.warn('Canvas has no parent element.');
    }

    // **Setup HUD**
    const hud = setupHUD(canvas);

    // **Setup GUI**
    const gui = setupGUI(parameters, boxGroup, cubes, directionalLight, parentElement, sizes);

    // **Setup Window Resize & Pixel Ratio**
    window.addEventListener('resize', () => {
        // Update sizes based on window dimensions
        sizes.width = window.innerWidth * 0.75;
        sizes.height = window.innerHeight * 0.75;
        aspectRatio = sizes.width / sizes.height;

        // Update parent element's size to match renderer's new size
        if (parentElement) {
            parentElement.style.width = `${sizes.width}px`;
            parentElement.style.height = `${sizes.height}px`;
        }

        // Update camera
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // No need to update GUI or HUD positions since they're fixed via CSS
    });

    // **Setup Fullscreen Toggle**
    window.addEventListener('dblclick', (): void => {
        const fullscreenElement: Element | null = document.fullscreenElement;

        if (!fullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            }
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    });

    // **Initialize clock for animations**
    const clock = new THREE.Clock();

    // **GSAP rotation animation for boxGroup**
    gsap.to(boxGroup.rotation, {
        z: Math.PI * 4, // 720 degrees
        duration: 20,
        repeat: -1, // infinite loop
        yoyo: true, // bounce back and forth
        ease: 'power1.inOut',
    });

    // **Animation loop**
    const tick = (): void => {
        // Get elapsed time
        const elapsedTime = clock.getElapsedTime();

        // Update box group rotation based on elapsed time and GUI parameters
        boxGroup.rotation.y = parameters.boxRotationSpeed * elapsedTime;

        // Update directional light rotation based on elapsed time and GUI parameters
        directionalLight.rotation.y = parameters.lightRotationSpeed * elapsedTime;

        // Animate cube positions
        cubes[0].position.y = Math.sin(elapsedTime);
        cubes[1].position.y = Math.cos(elapsedTime);
        cubes[2].position.z = Math.tan(elapsedTime);

        // Animate cube scales
        cubes[0].scale.x = 1 + Math.cos(elapsedTime * 0.8) * 0.5;
        cubes[1].scale.z = 1 + Math.sin(elapsedTime * 0.8) * 0.5;
        cubes[2].scale.y = 1 + Math.sin(elapsedTime * 0.8) * 0.5;

        // Update controls
        controls.update();

        // Render the scene
        renderer.render(scene, camera);

        // Update HUD content with cursor and camera positions
        hud.innerHTML = `
            <div>Cursor: (${cursor.x.toFixed(2)}, ${cursor.y.toFixed(2)})</div>
            <div>Camera: (${camera.position.x.toFixed(2)},
             ${camera.position.y.toFixed(2)},
             ${camera.position.z.toFixed(2)})</div>
        `;

        // Request the next animation frame
        window.requestAnimationFrame(tick);
    };

    // **Start the animation loop**
    tick();
});
