//natureofcode0.ts
function randomwalk_240924(p: typeof p5) {
    // Walker class to represent the moving point
    class Walker {
        // Possible movement directions: right, left, down, up
        private static dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        private x: number;
        private y: number;

        constructor() {
            // Initialize walker at the center of the canvas, start random shade value
            [this.x, this.y] = [p.width / 2, p.height / 2];
            this.alpha();
        }

        // Draw the walker at its current position
        show = () => p.point(this.x, this.y);

        // Move the walker in a random direction by selecting one of
        // 4 array positions 0 right, 1 left, 2 down, 3 up
        step() {
            // Choose a random direction and update position
            const [dx, dy] = Walker.dirs[Math.floor(Math.random() * 4)];
            [this.x, this.y] = [this.x + dx, this.y + dy];
        }

        // Generate a random shade value between 0 and 255
        alpha = () => Math.floor(Math.random() * 256);
    }

    let walker: Walker;

    // p5.js setup function: called once at the start
    p.setup = () => {
        p.createCanvas(800, 800);
        p.background(251);
        p.stroke(0);  // Set point color to black
        walker = new Walker();
    };

    // p5.js draw function: called repeatedly to animate
    p.draw = () => {
        // Perform and display 100 steps each frame
        for (let i = 0; i < 100; i++) {
            walker.step();
            walker.show();
        }
        p.stroke(0, walker.alpha());
    };
}

// Create a new p5 instance using sketch
const randomwalk_240924_instance = new p5(randomwalk_240924, 'randomwalk_240924');