// boiler plate modules to load for any given babylonjs scene
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

export type Babylon = Awaited<ReturnType<typeof getBabylon>>;
export type SketchInitializer = (
    context: Omit<Babylon, 'Engine' | 'Scene'> & { scene: InstanceType<Babylon['Scene']> }
) => void | Promise<void>;
export type DefinedSketch = ReturnType<typeof defineSketch>;

export function defineSketch(initSketch: SketchInitializer) {
    return initSketch
}