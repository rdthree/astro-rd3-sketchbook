import { defineSketch } from '../../../renderers/p5Renderer';

export default defineSketch((p5) => {
    const particles: { x: number; y: number; color: number[] }[] = [];
    const maxParticles = 100;
    const connectionRadius = 50; // Maximum distance for particle connections

    p5.setup = () => {
        p5.createCanvas(800, 400);
        p5.background(0);
        p5.colorMode(p5.HSB, 360, 100, 100, 1);
    };

    p5.draw = () => {
        p5.background(0, 0, 0, 0.1);

        // Create new particles if needed
        if (particles.length < maxParticles) {
            particles.push({
                x: p5.width / 2,
                y: p5.height / 2,
                color: [p5.random(360), 80, 90]
            });
        }

        // Draw connections first (behind particles)
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const d = p5.dist(p1.x, p1.y, p2.x, p2.y);
                if (d < connectionRadius) {
                    const alpha = p5.map(d, 0, connectionRadius, 0.2, 0);
                    p5.stroke(p1.color[0], 30, 100, alpha);
                    p5.line(p1.x, p1.y, p2.x, p2.y);
                }
            });
        });

        particles.forEach(particle => {
            // Random walk movement
            const angle = p5.noise(particle.x * 0.01, particle.y * 0.01, p5.frameCount * 0.01) * p5.TWO_PI;
            
            // Subtle attraction to mouse
            const mouseInfluence = 0.2;
            particle.x += p5.cos(angle) * 2 + (p5.mouseX - particle.x) * mouseInfluence * 0.01;
            particle.y += p5.sin(angle) * 2 + (p5.mouseY - particle.y) * mouseInfluence * 0.01;

            // Wrap around edges
            particle.x = (particle.x + p5.width) % p5.width;
            particle.y = (particle.y + p5.height) % p5.height;

            // Draw particle
            p5.noStroke();
            p5.fill(particle.color[0], particle.color[1], particle.color[2], 0.7);
            p5.circle(particle.x, particle.y, 8);
        });
    };
});