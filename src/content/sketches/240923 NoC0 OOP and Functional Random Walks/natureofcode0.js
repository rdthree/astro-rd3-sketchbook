"use strict";
//natureofcode0.ts
function natureofcode0(p) {
    // Walker class to represent the moving point
    class Walker {
        constructor() {
            // Initialize walker at the center of the canvas
            this.x = p.width / 2;
            this.y = p.height / 2;
        }
        // Draw the walker at its current position
        show() {
            p.point(this.x, this.y);
        }
        // Move the walker in a random direction
        step() {
            // Choose a random direction and update position
            const [dx, dy] = Walker.dirs[Math.floor(Math.random() * 4)];
            this.x += dx;
            this.y += dy;
        }
    }
    // Possible movement directions: right, left, down, up
    Walker.dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let walker;
    // p5.js setup function: called once at the start
    p.setup = () => {
        p.createCanvas(400, 400);
        p.background(251);
        p.stroke(0); // Set point color to black
        walker = new Walker();
    };
    // p5.js draw function: called repeatedly to animate
    p.draw = () => {
        // Perform and display 100 steps each frame
        for (let i = 0; i < 100; i++) {
            walker.step();
            walker.show();
        }
    };
}
// Create a new p5 instance using sketch
const natureofcode0Instance = new p5(natureofcode0, 'natureofcode0');
