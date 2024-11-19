import { defineSketch } from '../../../renderers/p5Renderer';

export default defineSketch(({ sketch }) => {
    sketch.setup = () => {
        const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        // Get the canvas wrapper div element - p5 types are satisfied
        const wrapper = document.querySelector('.p5-sketch');
        if (wrapper) {
            canvas.parent(wrapper);
        }
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255, 0, 0);
        sketch.noStroke();
        sketch.ellipse(sketch.width/2, sketch.height/2, 100, 100);
    };

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    };
});