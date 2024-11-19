import type p5 from 'p5';

export type SketchInitializer = (context: { sketch: p5 }) => void;

export async function createScene(canvas: HTMLCanvasElement) {
    console.log('p5Renderer: Creating scene with canvas:', canvas);
    const p5Module = await import('p5');
    console.log('p5Renderer: p5 module loaded');

    let sketchInstance: any;
    const p5Instance = new p5Module.default((p) => {
        sketchInstance = p;
        if (sketchInstance.setup) {
            sketchInstance.setup();
        }
    }, canvas);

    return { sketch: p5Instance };
}


export function defineSketch(initSketch: SketchInitializer) {
    return initSketch;
}