import { defineSketch } from '../../../renderers/threeRenderer';
import * as THREE from 'three';
import gsap from 'gsap';

export default defineSketch(({ scene, renderer }) => {
    
    // scene already included in renderer import
    scene.background = new THREE.Color('ghostwhite');
    
    // soft lighting
    const ambientLight = new THREE.AmbientLight('skyblue', 0.5);
    scene.add(ambientLight);
    
    // directional light
    const directionalLight = new THREE.DirectionalLight('orange', 2.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // axes helper
    const axesHelper = new THREE.AxesHelper(1.2);
    //scene.add(axesHelper);
    
    // sizes
    const sizes = { width: 800, height: 600 };
    const aspectRatio = sizes.width / sizes.height;
    
    // groups
    const boxGroup = new THREE.Group();
    boxGroup.scale.set(1.0, 2.0, 1.0);
    boxGroup.rotation.set(0.0, 0.2, 0.0);
    
    directionalLight.lookAt(boxGroup.position);
    scene.add(boxGroup);

    // objects
    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'ghostwhite' })
    );
    cube1.position.set(-2.0, 0.0, 0.0);
    boxGroup.add(cube1);
    
    const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'ghostwhite' })
    );
    cube2.position.set(0.0, 0.0, 0.0);
    boxGroup.add(cube2);
    
    const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'ghostwhite' })
    );
    cube3.position.set(2.0, 0.0, 0.0);
    boxGroup.add(cube3);
    

    // camera
    const camera = new THREE.PerspectiveCamera(75, aspectRatio);
    camera.position.z = 5.5;
    camera.lookAt(boxGroup.position);
    scene.add(camera);
    
    // cursor
    const canvas = renderer.domElement;
    const cursor = { x: 0, y: 0 };
    canvas.addEventListener('mousemove', (event) =>
    {
        const rect = canvas.getBoundingClientRect();
        cursor.x = ((event.clientX - rect.left) / canvas.width) * 0.5;
        cursor.y = -((event.clientY - rect.top) / canvas.height) * 0.5;
    });

    // Add after your existing canvas and cursor setup
    const stats = document.createElement('div');
    stats.style.cssText = `
    position: absolute !important;
    top: 10px !important;
    left: 10px !important;
    color: black !important;
    background-color: white !important;
    padding: 10px !important;
    font-family: monospace !important;
    font-size: 24px !important;
    font-weight: bold !important;
    pointer-events: none !important;
    z-index: 9999 !important;
    border: 2px solid red !important;
`;


    //canvas.parentElement.appendChild(stats);
    if (canvas.parentElement) {
        canvas.parentElement.appendChild(stats);
    }

    // render is already included in renderer import
    renderer.setSize(sizes.width, sizes.height);
    
    // animation
    const clock = new THREE.Clock();
    
    // GSAP rotation animation
    gsap.to(boxGroup.rotation, {
        z: Math.PI * 4, // 45 degrees
        duration: 20,
        repeat: -1, // infinite loop
        yoyo: true, // bounce back and forth
        ease: 'power1.inOut' // easing function
    })
    const tick = () =>
    {
        console.log('tick');
        // time
        const elapsedTime = clock.getElapsedTime();
        
        // update objects
        boxGroup.rotation.y = 0.65 * elapsedTime;
        directionalLight.rotation.y = 2.5 * elapsedTime;
        cube1.position.y = Math.sin(elapsedTime);
        cube2.position.y = Math.cos(elapsedTime)
        cube3.position.z = Math.tan(elapsedTime);

        cube1.scale.x = 1 + Math.cos(elapsedTime * 0.8) * 0.5;
        cube2.scale.z = 1 + Math.sin(elapsedTime * 0.8) * 0.5;
        cube3.scale.y = 1 + Math.sin(elapsedTime * 0.8) * 0.5;
        
        // update camera
        camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2 ;
        camera.position.y = Math.cos(cursor.y * Math.PI * 2) * 2 ;
        camera.position.z = cursor.y * 3;
        camera.lookAt(boxGroup.position);

        // Inside your tick function, add this before the renderer.render call:
        stats.textContent =
            `Cursor: (${cursor.x.toFixed(2)}, ${cursor.y.toFixed(2)})\n` +
            `Camera: (${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`;
        console.log('Stats updated:', stats.textContent);
        
        // render
        renderer.render(scene, camera);

        // call tick again on the next frame
        window.requestAnimationFrame(tick);
    }

    tick();

});


