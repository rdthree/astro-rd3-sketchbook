import { defineSketch } from '../../../renderers/p5Renderer';

export default defineSketch((p5) => {
    // Variables declaration
    let x: number, y: number;

    p5.setup = () => {
        p5.createCanvas(840, 400);
        p5.background(251);
        // Initialize variables and settings here
    };

    p5.draw = () => {
        // Animation loop code here
    };
});
