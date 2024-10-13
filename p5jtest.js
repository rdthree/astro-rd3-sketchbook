// filename: p5jtest.ts
var p5jtest = function (p) {
    // The setup function to initialize the sketch
    p.setup = function () {
        p.createCanvas(1000, 400);
        p.background(200);
    };
    // The draw function to continuously run the sketch
    p.draw = function () {
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
    };
};
// Create a new p5 instance using sketch
var p5test = new p5(p5jtest, document.getElementById('p5jtest'));
console.log("caca");
