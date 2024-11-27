import { defineSketch } from '../../../renderers/p5Renderer';

export default defineSketch((p5) => {
    let x = p5.width / 2,
        y = p5.height / 2,
        dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    p5.setup = () => {
        p5.createCanvas(840, 400);
        p5.background(251);
        p5.stroke(0);
        x = p5.width / 2;
        y = p5.height / 2;
    };

    p5.draw = () => {
        for (let i = 0; i < 100; i++) {
            const [dx, dy] = dirs[Math.floor(p5.random(4))];
            x += dx;
            y += dy;
            p5.point(x, y);
        }
    };
});
