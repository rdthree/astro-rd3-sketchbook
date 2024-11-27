import { defineSketch } from '../../../renderers/threeRenderer';
import * as THREE from 'three';

export default defineSketch(({ scene, renderer }) => {
    
    // scene already included in renderer import
    
    // axes helper
    const axesHelper = new THREE.AxesHelper(1.2);
    scene.add(axesHelper);
    
    // sizes
    const sizes = { width: 800, height: 600 };
    
    // groups
    const boxGroup = new THREE.Group();
    boxGroup.scale.set(1.0, 2.0, 1.0);
    boxGroup.rotation.set(0.0, 0.2, 0.0);
    scene.add(boxGroup);

    // objects
    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 'skyblue' })
    );
    cube1.position.set(-2.0, 0.0, 0.0);
    boxGroup.add(cube1);
    
    const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 'skyblue' })
    );
    cube2.position.set(0.0, 0.0, 0.0);
    boxGroup.add(cube2);
    
    const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 'skyblue' })
    );
    cube3.position.set(2.0, 0.0, 0.0);
    boxGroup.add(cube3);



    // camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3.5; 
    scene.add(camera);
    
    // mess with the camera
    camera.lookAt(boxGroup.position);
    
    // render is already included in renderer import
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
 
});
