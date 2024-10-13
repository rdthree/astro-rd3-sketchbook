"use strict";
// src/main.ts
Object.defineProperty(exports, "__esModule", { value: true });
// ignore the following script reference, it causeses a type error, but is
// necessary for the compiled javascript file to work
// @ts-ignore
var threejs_shared_module_js_1 = require("../../scripts/threejs-shared-module.js"); // Adjust the path as needed
var threeId = 'threetest';
/**
 * Creates a rotating cube inside the specified container.
 * @param containerId - The ID of the container where the cube will be rendered.
 */
function createRotatingCube(containerId) {
    if (containerId === void 0) { containerId = threeId; }
    var container = document.getElementById(containerId);
    if (!container) {
        console.error("Container with id \"".concat(containerId, "\" not found."));
        return;
    }
    // Create the scene
    var scene = new threejs_shared_module_js_1.THREE.Scene();
    // Create a camera
    var camera = new threejs_shared_module_js_1.THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    // Create the renderer
    var renderer = new threejs_shared_module_js_1.THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement); // Append to the specified container
    // Ensure the canvas fills the container
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    // Handle window resize
    window.addEventListener('resize', function () {
        var width = container.clientWidth;
        var height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    // Create a geometry and material
    var geometry = new threejs_shared_module_js_1.THREE.BoxGeometry();
    var material = new threejs_shared_module_js_1.THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // Create a mesh and add it to the scene
    var cube = new threejs_shared_module_js_1.THREE.Mesh(geometry, material);
    scene.add(cube);
    // Animation loop
    var animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    animate();
}
// Auto-execute when the script loads
document.addEventListener('DOMContentLoaded', function () {
    createRotatingCube('threetest'); // Ensure the ID matches the container
});
console.log("Three test script running");
