import { defineSketch } from '../../../renderers/d3Renderer';

export default defineSketch(({ svg, d3 }) => {
    // Set up dimensions and background
    const width = 840, height = 400;
    svg.attr('width', width)
        .attr('height', height)
        .style('background-color', '#fbfbfb');

    // Initialize walker position and path
    let [x, y] = [width / 2, height / 2];
    let pathData = `M ${x} ${y}`;

    // Create path element
    const path = svg.append('path')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('fill', 'none');

    // Define possible directions
    const dirs = [
        [1, 0], [-1, 0],
        [0, 1], [0, -1]
    ];

    // Step function to move walker
    const step = () => {
        const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
        x += dx;
        y += dy;
        pathData += ` L ${x} ${y}`;
    };

    // Animation loop
    const animate = () => {
        for (let i = 0; i < 100; i++) step();
        path.attr('d', pathData);
        requestAnimationFrame(animate);
    };

    // Start animation
    animate();
});
