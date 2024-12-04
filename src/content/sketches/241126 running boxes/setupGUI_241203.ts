import GUI from 'lil-gui';
import * as THREE from 'three';
import type {Parameters} from './setupTypes_241203';

/**
 * Sets up the Graphical User Interface (GUI).
 */
export const setupGUI = (
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
        .onChange((value: number) => {
            boxGroup.scale.set(value, value * 2, value);
        });
    gui.addColor(params, 'boxColor')
        .name('Box Color')
        .onChange((color: string) => {
            cubes.forEach(cube => cube.material.color.set(color));
        });
    gui.addColor(params, 'lightColor').name('Light Color').onChange((color: string) => {
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
