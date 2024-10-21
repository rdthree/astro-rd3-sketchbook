"use strict";
//natureofcode0_orig.ts
function natureofcode0_orig(p) {
    //walker class
    class Walker {
        x;
        y;
        constructor() {
            // initialize walker at center of canvas
            this.x = p.width / 2;
            this.y = p.height / 2;
        }
        // display walker, starting with a point
        show() {
            p.stroke(0);
            p.point(this.x, this.y);
        }
        // move walker randomly
        step() {
            const choice = p.floor(p.random(4));
            switch (choice) {
                case 0:
                    this.x++;
                    break; //move right
                case 1:
                    this.x--;
                    break; //move left
                case 2:
                    this.y++;
                    break; //move down
                case 3:
                    this.y--;
                    break; //move up
            }
        }
    }
    //declare walker variable
    let walker;
    // setup p5js sketch
    p.setup = () => {
        p.createCanvas(400, 400);
        p.background(251);
        walker = new Walker();
    };
    p.draw = () => {
        // Perform and display 100 steps each frame
        for (let i = 0; i < 100; i++) {
            walker.step();
            walker.show();
        }
    };
}
// Create a new p5 instance using sketch
let natureofcode0origInstanceMaker = new p5(natureofcode0_orig, document.getElementById('natureofcode0_orig'));
