"use strict";
// filepath content\240818-p5js-d3-three-ts-test\threetest.js
const DEFAULT_ID = 'threetest';
// Destructuring assignment with default parameters
// Allows flexible function calls with optional arguments
// If no object is passed, defaults to an empty object
// Enables preset values for each parameter if not provided
const createRotatingCube = ({ containerId = DEFAULT_ID, color = 0x00ff00, rotationSpeed = 0.02 } = {}) => {
    // setup container, scene, camera, renderer
    const container = document.getElementById(containerId) ?? (() => { throw new Error(`Container not found: ${containerId}`); })();
    const { clientWidth, clientHeight } = container;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    // add renderer to container
    container.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });
    // create cube and add to scene
    scene.add(new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color })));
    // resize renderer and camera on window resize
    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });
    // animate cube, animation loop
    (function animate() {
        requestAnimationFrame(animate);
        scene.children[0].rotation.x += rotationSpeed;
        scene.children[0].rotation.y += rotationSpeed;
        renderer.render(scene, camera);
    })();
};
// Run the function if the DOM is ready, otherwise wait for it to be ready
document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => createRotatingCube())
    : createRotatingCube();
console.log("Three.js test script running");
