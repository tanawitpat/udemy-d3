/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("data/buildings.json").then(function(data){
    data.forEach(function(d){
        d.height = +d.height
    })
    console.log(data)
    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    chart = svg.selectAll()
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (s, i) => {return i*40})
        .attr("y", (s) => 50)
        .attr("height", (s) => {return s.height})
        .attr("width", 30)
        .attr("fill", "grey")
}).catch(function(error){
    console.log(error);
})