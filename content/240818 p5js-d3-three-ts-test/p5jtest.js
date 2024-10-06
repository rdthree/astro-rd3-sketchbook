"use strict";
// Import p5 types if you're using modules. If p5 is included globally via a script tag, you can omit this.
function p5jtest(p) {
    // The setup function to initialize the sketch
    p.setup = () => {
        p.createCanvas(1000, 400);
        p.background(200);
    };
    // The draw function to continuously run the sketch
    p.draw = () => {
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
    };
}
// Create a new p5 instance using sketch
const p5jtestInstance = new p5(p5jtest, 'p5jtest');
