import { defineSketch } from '../../../renderers/d3Renderer';

export default defineSketch(({ svg, d3 }) => {
    const data = [4, 8, 15, 16, 23, 42];
    
    svg.selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', (d, i) => i * 50 + 30)
        .attr('cy', 50)
        .attr('r', d => d)
        .style('fill', 'steelblue');
});
