import { defineSketch } from '../../../renderers/threeRenderer';
import {
    PerspectiveCamera,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Color,
    Points,
    BufferGeometry,
    Float32BufferAttribute,
    PointsMaterial
} from 'three';

export default defineSketch(({ scene, renderer }) => {
    const camera = new PerspectiveCamera(
        75,
        renderer.domElement.clientWidth / renderer.domElement.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 7);
    camera.lookAt(0, 0, 0);

    scene.background = new Color(0xffffff); // Light gray background

    const geometry = new BufferGeometry();
    const positions: number[] = [];
    
    let x = 0;
    let y = 0;

    const material = new PointsMaterial({
        color: 0x000000, // Black dots
        size: 0.025,
        opacity: 0.5,
        transparent: true,
        sizeAttenuation: true
    });

    const points = new Points(geometry, material);
    scene.add(points);

    const animate = () => {
        x += (Math.random() - 0.5) * 0.1;
        y += (Math.random() - 0.5) * 0.1;
        
        positions.push(x, y, 0);
        
        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
        
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
        camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight, false);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
});