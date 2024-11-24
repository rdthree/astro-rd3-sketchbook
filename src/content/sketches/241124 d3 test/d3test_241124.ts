import { defineSketch } from '../../../renderers/d3Renderer';

export default defineSketch(({ svg, d3 }) => {
    // Generate Fibonacci sequence for more interesting data
    const fibonacci: number[] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

    // Calculate center of SVG
    const width = 600;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    // Set SVG size
    svg.attr('width', width).attr('height', height);

    // Color scale
    const colorScale = d3.scaleSequential()
        .domain([0, fibonacci.length - 1]) // Correct domain to match the array indices
        .interpolator(d3.interpolateRainbow);

    // Create spiral layout
    const circles = svg.selectAll<SVGCircleElement, number>('circle') // Explicitly type selection
        .data(fibonacci)
        .join('circle')
        .attr('cx', (_, i) => {
            const angle = i * 0.5 * Math.PI;
            return centerX + (i * 20) * Math.cos(angle);
        })
        .attr('cy', (_, i) => {
            const angle = i * 0.5 * Math.PI;
            return centerY + (i * 20) * Math.sin(angle);
        })
        .attr('r', d => d * 2)
        .style('fill', (_, i) => colorScale(i))
        .style('opacity', 0.8)
        .style('cursor', 'pointer');

    // Add fun animations
    function spin(): void {
        circles
            .transition()
            .duration(5000)
            .attr('cx', (_, i) => {
                const angle = (i * 0.5 * Math.PI) + Math.PI;
                return centerX + (i * 20) * Math.cos(angle);
            })
            .attr('cy', (_, i) => {
                const angle = (i * 0.5 * Math.PI) + Math.PI;
                return centerY + (i * 20) * Math.sin(angle);
            })
            .transition()
            .duration(5000)
            .attr('cx', (_, i) => {
                const angle = i * 0.5 * Math.PI;
                return centerX + (i * 20) * Math.cos(angle);
            })
            .attr('cy', (_, i) => {
                const angle = i * 0.5 * Math.PI;
                return centerY + (i * 20) * Math.sin(angle);
            })
            .on('end', spin);
    }

    spin();

    // Interactive elements
    circles
        .on('mouseover', function (_event: MouseEvent, d: number): void {
            d3.select<SVGCircleElement, number>(this)
                .transition()
                .duration(300)
                .style('fill', '#fff')
                .attr('r', () => d * 3)
                .style('filter', 'url(#glow)');
        })
        .on('mouseout', function (_event: MouseEvent, d: number): void {
            d3.select<SVGCircleElement, number>(this)
                .transition()
                .duration(300)
                .style('fill', (_, i) => colorScale(i))
                .attr('r', () => d * 2)
                .style('filter', null);
        });

    // Add glow filter
    const defs = svg.append('defs');
    const filter = defs.append('filter')
        .attr('id', 'glow');
    filter.append('feGaussianBlur')
        .attr('stdDeviation', '3')
        .attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode')
        .attr('in', 'coloredBlur');
    feMerge.append('feMergeNode')
        .attr('in', 'SourceGraphic');
});
