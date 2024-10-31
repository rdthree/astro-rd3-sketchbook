"use strict";

function randomwalk_241024(p) {
    class Walker {
        constructor() {
            this.circles = [];
            this.stepCount = 0;
            this.startTime = Date.now();
            this.maxDistance = 0;
            [this.x, this.y] = [p.width / 2, p.height / 2];
        }

        show() {
            // Permanent trail pixel
            p.stroke(20, 127);
            p.strokeWeight(1);
            p.point(this.x, this.y);
            // Add new circles occasionally
            if (Math.random() < 0.001) {
                this.circles.push({
                    x: this.x,
                    y: this.y,
                    size: p.random(5, 100),
                    alpha: p.random(10, 155),
                });
            }
            // Update and render circles
            for (let i = this.circles.length - 1; i >= 0; i--) {
                const circle = this.circles[i];
                // Decrease alpha
                circle.alpha -= 25;
                if (circle.alpha <= 0) {
                    this.circles.splice(i, 1);
                    continue;
                }
                p.push();
                p.noFill();
                const c = p.color(0);
                c.setAlpha(circle.alpha);
                p.stroke(c);
                p.strokeWeight(0.25);
                p.ellipse(circle.x, circle.y, circle.size);
                p.pop();
            }
            this.updateStats();
            this.showUI();
        }

        updateStats() {
            this.stepCount++;
            const dist = p.dist(p.width / 2, p.height / 2, this.x, this.y);
            this.maxDistance = Math.max(this.maxDistance, dist);
        }

        showUI() {
            const padding = 10;
            p.push();
            p.noStroke();
            p.fill(251, 4);
            p.rect(p.width - 250 - padding, padding, 250, 160);
            p.fill(0, 30);
            p.textAlign(p.LEFT);
            p.textFont('Consolas');
            p.textSize(12);
            const runTime = Math.floor((Date.now() - this.startTime) / 1000);
            const speed = Math.round(this.stepCount / runTime * 10) / 10;
            p.text(`Position: (${Math.round(this.x)}, ${Math.round(this.y)})`, p.width - 240, padding + 25);
            p.text(`Active Circles: ${this.circles.length}`, p.width - 240, padding + 45);
            p.text(`Steps Taken: ${this.stepCount}`, p.width - 240, padding + 65);
            p.text(`Runtime: ${runTime}s`, p.width - 240, padding + 85);
            p.text(`Steps/Second: ${speed}`, p.width - 240, padding + 105);
            p.text(`Distance from Center: ${Math.round(p.dist(p.width / 2, p.height / 2, this.x, this.y))}`, p.width - 240, padding + 125);
            p.text(`Max Distance: ${Math.round(this.maxDistance)}`, p.width - 240, padding + 145);
            p.pop();
        }

        step() {
            const [dx, dy] = Walker.dirs[Math.floor(Math.random() * 4)];
            this.x = p.constrain(this.x + dx, 0, p.width);
            this.y = p.constrain(this.y + dy, 0, p.height);
        }
    }

    Walker.dirs = [[4, 0], [-4, 0], [0, 4], [0, -4]];
    let walker;
    p.setup = () => {
        p.createCanvas(800, 800);
        p.background(251);
        walker = new Walker();
    };
    p.draw = () => {
        p.push();
        p.blendMode(p.MULTIPLY);
        p.background(251, 2);
        p.pop();
        for (let i = 0; i < 10; i++) {
            walker.step();
            walker.show();
        }
    };
}

const randomwalk_241024_instance = new p5(randomwalk_241024, 'randomwalk_241024');
