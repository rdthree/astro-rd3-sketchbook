// Create a new p5 instance and pass a sketch function to it
let followCircle = function (p) {
    // p5.js setup function
    p.setup = function () {
        p.createCanvas(400, 400);
        p.background(200);
    };

    // p5.js draw function
    p.draw = function () {
        p.background(100, 100, 150);  // Clear the canvas with a background color
        p.fill(150, 50, 50);  // Set the fill color
        p.ellipse(p.mouseX, p.mouseY, 50, 50);  // Draw an ellipse that follows the mouse
    };
};

// Instantiate the sketch, linking it to a specific HTML element ID
new p5(followCircle, 'followCircle');