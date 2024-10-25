"use strict";
function randomwalk_241024(p) {
    class Walker {
        x;
        y;
        static dirs = [[4, 0], [-4, 0], [0, 4], [0, -4]];
        circles = [];
        stepCount = 0;
        startTime = Date.now();
        maxDistance = 0;
        constructor() {
            [this.x, this.y] = [p.width / 2, p.height / 2];
        }
        show() {
            // Permanent trail pixel
            p.stroke(20, 127);
            p.strokeWeight(1);
            p.point(this.x, this.y);
            // Fading pulsing circles
            this.circles.forEach(circle => {
                circle.phase += 0.02;
                circle.currentSize = circle.baseSize + Math.sin(circle.phase) * 5;
                circle.opacity *= 0.99; // Control fade rate here
                p.noFill();
                p.stroke(0, circle.opacity * 127); // This will fade from 127 to 0
                p.strokeWeight(1);
                p.ellipse(circle.x, circle.y, circle.currentSize);
            });
            if (Math.random() < 0.005) {
                this.circles.push({
                    x: this.x,
                    y: this.y,
                    baseSize: p.random(10, 50),
                    currentSize: 0,
                    phase: 0,
                    opacity: 1.0
                });
            }
            this.circles = this.circles.filter(circle => circle.opacity > 0.1);
            this.updateStats();
            this.showUI();
        }
        updateStats() {
            this.stepCount++;
            const dist = p.dist(p.width / 2, p.height / 2, this.x, this.y);
            this.maxDistance = Math.max(this.maxDistance, dist);
        }
        showUI() {
            const padding = 20;
            p.push();
            p.noStroke();
            p.fill(251, 64);
            p.rect(p.width - 250 - padding, padding, 250, 160);
            p.fill(0);
            p.textAlign(p.LEFT);
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
    let walker;
    p.setup = () => {
        p.createCanvas(800, 800);
        p.background(251);
        walker = new Walker();
    };
    p.draw = () => {
        // Only fade the background for circles, not the trail
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
