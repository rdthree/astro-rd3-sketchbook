export async function getThree() {
    const { Scene } = await import('three');
    const { WebGLRenderer } = await import('three');
    const { PerspectiveCamera } = await import('three');
    const { Vector3 } = await import('three');

    return {
        Scene,
        WebGLRenderer,
        PerspectiveCamera,
        Vector3
    };
}

export async function createScene(canvas: HTMLCanvasElement) {
    const three = await getThree();
    const renderer = new three.WebGLRenderer({ canvas, antialias: true });
    const scene = new three.Scene();

    // Default camera setup
    const camera = new three.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Handle window resizing
    const handleResize = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    return { scene, renderer, camera, ...three };
}

export type Three = Awaited<ReturnType<typeof getThree>>;
export type SketchInitializer = (
    context: Omit<Three, 'Scene' | 'WebGLRenderer'> & {
        scene: InstanceType<Three['Scene']>,
        camera: InstanceType<Three['PerspectiveCamera']>,
    }
) => void | Promise<void>;

export function defineSketch(initSketch: SketchInitializer) {
    return initSketch;
}
