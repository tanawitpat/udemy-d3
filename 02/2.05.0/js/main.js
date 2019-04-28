/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var svg = d3.select("#chart-area").append("svg")
	.attr("width", 500)
	.attr("height", 500);

var circle = svg.append("circle")
	.attr("cx", 70)
	.attr("cy", 100)
	.attr("r", 50)
    .attr("fill", "red");
    
var text = svg.append("text")
	.attr("x", 150)
	.attr("y", 100)
    .attr("fill", "red")
    .text("This is a circle")