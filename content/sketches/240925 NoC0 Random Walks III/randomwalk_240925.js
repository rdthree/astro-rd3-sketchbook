"use strict";
// randomwalk_240925.ts
// This sketch creates a random walk visualization using p5.js
function randomwalk_240925(p) {
    // Configuration constants
    const CANVAS_SIZE = 800; // Size of the canvas
    const STEPS = 100; // Number of steps per frame
    const BG_COLOR = 251; // Background color (light gray)
    const STROKE_COLOR = 0; // Stroke color (black)
    const ALPHA_MIN = 0; // Minimum alpha value
    const ALPHA_MAX = 255; // Maximum alpha value
    // Possible movement directions: right, left, down, up
    const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    // Generate a random alpha value for stroke opacity
    const getRandomAlpha = () => Math.floor(Math.random() * (ALPHA_MAX - ALPHA_MIN + 1)) + ALPHA_MIN;
    // Select a random direction from DIRS array
    const getRandomDir = () => DIRS[Math.floor(Math.random() * DIRS.length)];
    // Starting position at the center of the canvas
    let x = CANVAS_SIZE / 2, y = CANVAS_SIZE / 2;
    // Setup function: called once at the start
    p.setup = () => {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        p.background(BG_COLOR);
        p.stroke(STROKE_COLOR);
    };
    // Draw function: called every frame
    p.draw = () => {
        for (let i = 0; i < STEPS; i++) {
            const [dx, dy] = getRandomDir();
            x += dx;
            y += dy; // Update position
            p.point(x, y); // Draw point at new position
        }
        // Set a new random alpha value for the next frame
        p.stroke(STROKE_COLOR, getRandomAlpha());
    };
}
// Create a new p5 instance with our sketch
new p5(randomwalk_240925, 'randomwalk_240925');
