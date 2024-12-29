// Set the time format
const parseTime = d3.timeParse("%Y");

// Load the dataset and formatting variables
d3.csv("./data.csv", d => {
  return {
    geo: d.geo,
    country: d.country,
    year: +d.year,
    value: +d.value,
    date: parseTime(d.year)
  }
}).then(data => {
  // We need to make sure that the data are sorted correctly by country and then by year
  data = data.sort((a, b) => d3.ascending(a.country, b.country) || d3.ascending(a.year, b.year));

  // Move the color scale here to share with both charts
  const countries = Array.from(new Set(data.map(d => d.country))).sort();
  const colors = d3.scaleOrdinal()
    .domain(countries)
    .range(d3.quantize(d3.interpolateRainbow, countries.length));

  // Plot the bar chart
  createBarChart(data, colors);

  // Plot the line chart
  createLineChart(data, colors);
})

const createBarChart = (data, colors) => {
  // Set the dimensions and margins of the graph
  const width = 900, height = 400;
  const margins = {top: 10, right: 30, bottom: 80, left: 20};

  // Filter the data from the year 2020
  let newData = data.filter(data => data.year == 2020);

  // Create the SVG container
  const svg = d3.select("#bar")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  // Define x-axis, y-axis, and color scales
  const x = d3.scaleBand()
    .domain(newData.map(d => d.country))
    .range([margins.left, width - margins.right])
    .padding(0.2);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(newData, d => d.value)])
    .range([height - margins.bottom, margins.top]);

  // Create the bar elements and append to the SVG group
  let bar = svg.append("g")
    .selectAll("rect")
    // TODO: 0.1 Add geo as id to refer to the data point
    .data(newData)
    .join("rect")
      // TODO: 0.2 Add geo as the class
      .attr("x", d => x(d.country))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      .attr("fill", d => colors(d.country))
      // TODO: 1.1 Add event listeners to each bar


  // Add the tooltip when hover on the bar
  bar.append('title').text(d => d.country);
  
  // Create the x and y axes and append them to the chart
  const yAxis = d3.axisLeft(y)

  const yGroup = svg.append("g")
      .attr("transform", `translate(${margins.left},0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove());

  const xAxis = d3.axisBottom(x)

  const xGroup = svg.append("g")
      .attr("transform", `translate(0,${height - margins.bottom})`)
    .call(xAxis)

  xGroup.selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  // TODO: 1.2 Define mouseover and mouseout functions
  function mouseover(e, d) {
    // TODO: 1.3 Highlight the bar with black stroke
   

    // TODO: 1.4 Highlight the line with the color
    

    // TODO: 1.5 Make the text label visible
    

  }

  function mouseout(e, d) {
    // TODO: 1.6 Remove the stroke when mouse out
    

    // TODO: 1.7 Change the line color to lightgrey
    

    // TODO: 1.8 Make the text label invisible again
    

  }

  // TODO: 2.1 Add event listener to the year slider
  d3.select("#yearSlider").on("change", function(e) {
    // Get the year selected
    //console.log(this.value);

    // Update the chart
    //update();
  });

// TODO: 2.2 Add event listener to the sort dropdown
  d3.select("#sort").on("change", function(e) {
    // Get sorting option selected
    //console.log(this.value);

    // Update the chart
    //update();
  });

// TODO: 2.3 Update the bar chart based on new inputs
  function update() {
    // TODO: 2.4 Get the selected year and sorting method
    

    // TODO: 2.5 Filter and sorting the new data
    

    // TODO: 2.6 Define new x and y scales based on the new data
    

    // TODO: 2.7 Define a transition
    // Reference: https://d3js.org/d3-transition and https://www.d3indepth.com/transitions/
    

    // TODO: 2.8 Update the bar chart with enter, update, and exit pattern
    

    // TODO: 2.9 Transition on the x and y axes
    
    
  }
}

const createLineChart = (data, colors) => {
  // Set the dimensions and margins of the graph
  const width = 900, height = 400;
  const margins = {top: 10, right: 100, bottom: 20, left: 20};

  // Create the SVG container
  //const svg =

  // Define x-axis, y-axis, and color scales
  //const x = 
  
  //const y = 

  // Construct a line generator
  //const line = 

  // Group the data for each country
  //
  //const group = 

  // TODO: 0.3 Add the geo as the class
  // TODO: 0.4 Change the color to lightgrey
  // TODO: 0.5 Set the line opacity

  // Draw a line path for each country
  //const path = 

  // Add the tooltip when hover on the line
  

  // Create the x and y axes and append them to the chart
  //const xAxis = d3.axisBottom(x);

  

  //const yAxis = d3.axisLeft(y);

  

  // Add text labels on the right of the chart
  /*const data2020 = data.filter(data => data.year == 2020);
  const labels = svg.append("g")
    .selectAll("text.label")
    .data(data2020)
    .join("text")
      .attr("class", d => d.geo)
      .attr("x", width - margins.right + 5)
      .attr("y", d => y(d.value))
      .attr("dy", "0.35em")
      .style("font-family", "sans-serif")
      .style("font-size", 12)
      .style("fill", d => colors(d.country))
    .text(d => d.country);*/

  // TODO: 0.6 Hide text labels when unselected
  // Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
  // labels.style("visibility", "hidden");
}