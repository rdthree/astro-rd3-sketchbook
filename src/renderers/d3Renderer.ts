import type { Selection } from 'd3';

export async function getD3() {
    const d3 = await import('d3');
    return d3;
}

export async function createD3Canvas(container: HTMLElement) {
    const d3 = await getD3();

    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`);

    const handleResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        svg.attr('viewBox', `0 0 ${newWidth} ${newHeight}`);
    };

    window.addEventListener('resize', handleResize);

    return { svg, d3 };
}

export type D3 = Awaited<ReturnType<typeof getD3>>;
export type SketchInitializer = (
    context: {
        svg: Selection<SVGSVGElement, unknown, null, undefined>,
        d3: D3
    }
) => void | Promise<void>;

export function defineSketch(initSketch: SketchInitializer) {
    return initSketch;
}
