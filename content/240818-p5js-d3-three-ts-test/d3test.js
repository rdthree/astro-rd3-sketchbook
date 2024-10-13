"use strict";
// Import D3 types if you're using modules. If D3 is included globally via a script tag, you can omit this.
// If using modules, uncomment the following line:
// import * as d3 from 'd3';
const d3testId = "d3-chart-circle";
/**
 * Creates a bar chart inside the specified container.
 * @param containerId - The ID of the container where the bar chart will be appended.
 */
function createBarChart(containerId = d3testId) {
    const data = [30, 80, 45, 60, 20, 90, 50];
    // Select the container and append an SVG element
    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", 500)
        .attr("height", 300);
    // Bind data and create rectangles for the bar chart
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d) => 300 - d)
        .attr("width", 65)
        .attr("height", (d) => d)
        .attr("fill", "teal");
}
/**
 * Creates a simple circle inside the specified container.
 * @param containerId - The ID of the container where the circle will be appended.
 */
function createSimpleCircle(containerId = d3testId) {
    // Select the container and append an SVG element with a border
    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", 500)
        .attr("height", 300)
        .style("border", "1px solid black");
    // Append a circle to the SVG
    svg.append("circle")
        .attr("cx", 250)
        .attr("cy", 150)
        .attr("r", 100)
        .attr("fill", "blue");
    // Check if the SVG selection is empty and log accordingly
    if (svg.empty()) {
        console.error("Failed to create SVG element.");
    }
    else {
        console.log("SVG element created successfully.");
    }
}
// Automatically execute functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    createBarChart();
    createSimpleCircle();
});
// Export functions for potential external use
// If you need to attach these functions to the global window object, you can uncomment the following lines.
// However, TypeScript will require you to extend the Window interface accordingly.
// declare global {
//     interface Window {
//         createBarChart: typeof createBarChart;
//         createSimpleCircle: typeof createSimpleCircle;
//     }
// }
// window.createBarChart = createBarChart;
// window.createSimpleCircle = createSimpleCircle;
console.log("D3 test script running");
