export async function getBabylon() {
    const { Engine } = await import('@babylonjs/core/Engines/engine');
    const { Scene } = await import('@babylonjs/core/scene');
    const { ArcRotateCamera } = await import('@babylonjs/core/Cameras/arcRotateCamera');
    const { Vector3 } = await import('@babylonjs/core/Maths/math.vector');
    const { HemisphericLight } = await import('@babylonjs/core/Lights/hemisphericLight');
    const { MeshBuilder } = await import('@babylonjs/core/Meshes/meshBuilder');
    const { StandardMaterial } = await import('@babylonjs/core/Materials/standardMaterial');

    return {
        Engine,
        Scene,
        ArcRotateCamera,
        Vector3,
        HemisphericLight,
        MeshBuilder,
        StandardMaterial,
    };
}

export async function createScene(canvas: HTMLCanvasElement) {
    const babylon = await getBabylon();
    const engine = new babylon.Engine(canvas, true);
    const scene = new babylon.Scene(engine);

    const camera = new babylon.ArcRotateCamera(
        'Camera',
        Math.PI / 2,
        Math.PI / 2,
        2,
        babylon.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    engine.runRenderLoop(() => scene.render());
    window.addEventListener('resize', () => engine.resize());

    return { scene, ...babylon };
}

export type Babylon = Awaited<ReturnType<typeof getBabylon>>;
export type SketchInitializer = (
    context: Omit<Babylon, 'Engine' | 'Scene'> & { scene: InstanceType<Babylon['Scene']> }
) => void | Promise<void>;
export type DefinedSketch = ReturnType<typeof defineSketch>;

export function defineSketch(initSketch: SketchInitializer) {
    return initSketch;
}
