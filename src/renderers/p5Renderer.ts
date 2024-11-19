import type p5 from 'p5';

export async function getP5() {
    const p5Module = await import('p5');
    return { p5: p5Module.default };
}

export async function createScene(canvas: HTMLCanvasElement) {
    const { p5 } = await getP5();
    let p5Instance = new p5(() => {}, canvas);
    return { sketch: p5Instance };
}

export type SketchInitializer = (context: { sketch: p5 }) => void | Promise<void>;

export function defineSketch(initSketch: SketchInitializer) {
    return initSketch;
}