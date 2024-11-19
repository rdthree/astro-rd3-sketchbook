import { defineSketch } from '../../../renderers/p5Renderer';

export default defineSketch((p5) => {
    console.log('SKETCH: p5-test: Sketch initialization started');
    p5.setup = () => {
        p5.createCanvas(400, 400);
        p5.background(0);
        console.log('SKETCH: p5-test: Sketch setup complete');
    };
    console.log('SKETCH: p5-test: Sketch setup function defined');

    p5.draw = () => {
        p5.background(0);
        p5.fill(255, 0, 0);
        p5.noStroke();
        p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
        console.log('SKETCH: p5-test: draw loop running');
    };
    console.log('SKETCH: p5-test: draw function defined');
});