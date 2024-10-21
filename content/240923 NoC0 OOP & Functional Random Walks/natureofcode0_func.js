"use strict";
// natureofcode0_func.ts
const natureofcode0_func = (p) => {
    // Possible movement directions: right, left, down, up
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    // Current xy position of the walker
    let pos;
    // Function to perform one step of the random walk
    const step = () => {
        // Choose a random direction from the dirs array
        const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
        // Update position by adding the chosen direction
        pos = [pos[0] + dx, pos[1] + dy];
        // Draw a point at the new position
        p.point(...pos);
    };
    // p5.js setup function: called once at the start
    p.setup = () => {
        // Create a canvas and set the background
        p.createCanvas(400, 400);
        p.background(251);
        // Set the color of the points to black
        p.stroke(0);
        // Initialize the walker's position to the center of the canvas
        pos = [p.width / 2, p.height / 2];
    };
    // p5.js draw function: called repeatedly to animate
    p.draw = () => {
        // Perform 100 steps of the random walk each frame
        for (let i = 0; i < 100; i++)
            step();
    };
};
// Create a new p5 instance with our sketch function
let natureofcode0func = new p5(natureofcode0_func, document.getElementById('natureofcode0_func'));
