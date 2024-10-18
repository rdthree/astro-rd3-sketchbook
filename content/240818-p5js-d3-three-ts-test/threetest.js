"use strict";
// filepath content\240818-p5js-d3-three-ts-test\threetest.js
const threeId = 'threetest';
const createRotatingCube = ({ containerId = threeId, color = 0x00ff00, rotationSpeed = 0.01 } = {}) => {
    const container = document.getElementById(containerId);
    if (!container)
        throw new Error(`Container with id "${containerId}" not found.`);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });
    window.addEventListener('resize', () => {
        const { clientWidth: width, clientHeight: height } = container;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color }));
    scene.add(cube);
    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += rotationSpeed;
        cube.rotation.y += rotationSpeed;
        renderer.render(scene, camera);
    };
    animate();
};
const init = () => {
    const checkContainer = () => {
        const container = document.getElementById(threeId);
        if (container) {
            createRotatingCube();
        }
        else {
            requestAnimationFrame(checkContainer);
        }
    };
    checkContainer();
};
document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
console.log("Three test script running");
