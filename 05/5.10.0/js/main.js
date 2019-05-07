/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

var margin = { left:80, right:20, top:50, bottom:100 }
var height = 500 - margin.top - margin.bottom, 
	width = 800 - margin.left - margin.right,
	time = 0

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

var x = d3.scaleLog()
    .base(10)
    .range([0, width])
    .domain([100, 150000])
var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 90])
var area = d3.scaleLinear()
    .range([25*Math.PI, 1500*Math.PI])
    .domain([2000, 1400000000])
var continentColor = d3.scaleOrdinal(d3.schemePastel1)

var xLabel = g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("GDP Per Capita ($)")
var yLabel = g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -170)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Life Expectancy (Years)")
var timeLabel = g.append("text")
    .attr("y", height -10)
    .attr("x", width - 40)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("1800")

var xAxisCall = d3.axisBottom(x)
    .tickValues([400, 4000, 40000])
	.tickFormat(d3.format("$"))
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")")
    .call(xAxisCall)

var yAxisCall = d3.axisLeft(y)
    .tickFormat(d => { return +d })
g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall)

function update(data) {
	var t = d3.transition().duration(100)
	var circles = g.selectAll("circle")
		.data(data, d => d.country)

    circles.exit()
        .attr("class", "exit")
        .remove()

	circles.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("fill", d => { return continentColor(d.continent) })
        .merge(circles)
        .transition(t)
        .attr("cy", d => { return y(d.life_exp) })
        .attr("cx", d => { return x(d.income) })
        .attr("r", d => { return Math.sqrt(area(d.population) / Math.PI) })
	
	timeLabel.text(+(time + 1800))
}

d3.json("data/data.json").then(data => {
	const dataLength = data.length-1
    const formattedData = data.map(year => {
        return year["countries"].filter(country => {
            var dataExists = (country.income && country.life_exp)
            return dataExists
        }).map(country => {
            country.income = +country.income
            country.life_exp = +country.life_exp
            return country        
        })
    })

    d3.interval(() => {
        time = (time < dataLength) ? time+1 : 0
        update(formattedData[time])         
    }, 100)

    update(formattedData[0])
})