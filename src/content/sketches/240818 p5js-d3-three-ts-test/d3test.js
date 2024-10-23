"use strict";
// filepath: content\240818-p5js-d3-three-ts-test\d3test.ts
const d3testId = "d3-chart-circle";
function createBarChart(containerId = d3testId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
    }
    const data = [30, 80, 45, 60, 20, 90, 50];
    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", 500)
        .attr("height", 300);
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d) => 300 - d)
        .attr("width", 65)
        .attr("height", (d) => d).attr("fill", "teal");
}
function createSimpleCircle(containerId = d3testId) {
    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", 500)
        .attr("height", 300)
        .style("border", "1px solid black");
    svg.append("circle")
        .attr("cx", 250)
        .attr("cy", 150)
        .attr("r", 100)
        .attr("fill", "blue");
    console.log(svg.empty() ? "Failed to create SVG element." : "SVG element created successfully.");
}
// Execute the D3 functions directly
createBarChart();
createSimpleCircle();
console.log("D3 test script running");
