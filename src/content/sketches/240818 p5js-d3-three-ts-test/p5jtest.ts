// filename: p5jtest.ts
const p5jtest = (p: typeof p5) => {

    // The setup function to initialize the sketch
    p.setup = () => {
        p.createCanvas(1000, 400);
        p.background(200);
    };

    // The draw function to continuously run the sketch
    p.draw = () => {
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
    };
};
// Create a new p5 instance using sketch
let p5test = new p5(p5jtest, document.getElementById('p5jtest'));