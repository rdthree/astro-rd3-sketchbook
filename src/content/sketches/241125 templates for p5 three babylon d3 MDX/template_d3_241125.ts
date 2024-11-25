import { defineSketch } from '../../../renderers/d3Renderer';

export default defineSketch(({ svg, d3 }) => {
    // Set up dimensions
    const width = 840, height = 400;

    // Setup SVG
    svg.attr('width', width)
        .attr('height', height)
        .style('background-color', '#fbfbfb');

    // Create elements
    const elements = svg.append('g');

    // Animation function
    const animate = () => {
        requestAnimationFrame(animate);
    };

    // Start animation
    animate();
});
