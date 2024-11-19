import { defineSketch } from '../../../renderers/p5Renderer';

export default defineSketch(({ sketch }) => {
    console.log('SKETCH: p5-test: Sketch initialization started');
    sketch.setup = () => {
        sketch.createCanvas(400, 400);
        sketch.background(0);
        console.log('SKETCH: p5-test: Sketch setup complete');
    };
    console.log('SKETCH: p5-test: Sketch setup function defined');

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255, 0, 0);
        sketch.noStroke();
        sketch.ellipse(sketch.mouseX, sketch.mouseY, 50, 50);
        console.log('SKETCH: p5-test: draw loop running');
    };
    console.log('SKETCH: p5-test: draw function defined');
});