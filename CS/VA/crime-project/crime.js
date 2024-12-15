// // heyyy Ben i left comments so you can refer to them
// fetch('./crime_data_cities.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log("Loaded Crime Data:", data);

//     const svg = d3.select("#crime-map")
//       .attr("width", 800)
//       .attr("height", 600)
//       .style("background-color", "#e0f7fa");

//     const projection = d3.geoMercator()
//       .center([2.2137, 46.2276]) // adjusted the center coordinates 
//       .scale(2500) //  zoom level
//       .translate([400, 300]); // center the map in svg

//     const path = d3.geoPath().projection(projection);

//     // Load the GeoJSON for the map
//     fetch('./france.json')
//       .then(response => response.json())
//       .then(geoData => {
//         console.log("Loaded GeoJSON Data:", geoData);

//         // map
//         svg.append("g")
//           .selectAll("path")
//           .data(geoData.features)
//           .enter()
//           .append("path")
//           .attr("d", path)
//           .attr("fill", "#d1e8f0") // color of land but idk it's not working still trying
//           .attr("stroke", "#00509e") // for boundaries
//           .attr("stroke-width", 0.5);

//         // city circles
//         const drawCircles = (filteredData) => {
//           const circles = svg.selectAll("circle")
//             .data(filteredData, d => d.Regions);

//           circles.enter()
//             .append("circle")
//             .merge(circles)
//             .attr("cx", d => projection([d.Longitude, d.Latitude])[0])
//             .attr("cy", d => projection([d.Longitude, d.Latitude])[1])
//             .attr("r", d => Math.min(Math.max(d["Crime Count"] / 50, 3), 15))
//             .attr("fill", d => {
//               if (d["Crime Count"] > 100) return "red";
//               else if (d["Crime Count"] > 50) return "orange";
//               else return "yellow";
//             })
//             .attr("stroke", "black")
//             .attr("stroke-width", 0.8)
//             .on("mouseover", function (event, d) {
//               const cityCrimes = data.filter(city => city.Regions === d.Regions);

//               //Ben i ussed a set to ensure unique crime types
//               const uniqueCrimeTypes = [...new Set(cityCrimes.map(city => city["Types of crime"]))].join(", ");

//               const tooltip = d3.select("body").append("div")
//                 .attr("class", "tooltip")
//                 .style("position", "absolute")
//                 .style("background", "#fff")
//                 .style("border", "1px solid #ccc")
//                 .style("padding", "8px")
//                 .style("border-radius", "4px")
//                 .style("pointer-events", "none")
//                 .html(`
//                   <strong>${d.Regions || "Unknown Region"}</strong><br>
//                   <strong>Crime Count:</strong> ${d["Crime Count"] || "Unknown"}<br>
//                   <strong>Crime Types:</strong> ${uniqueCrimeTypes || "Unknown"}<br>
//                   <strong>Population:</strong> ${d["Population number"] || "Unknown"}<br>
//                   <strong>Avg Net Income (€):</strong> ${d["Average Monthly Net Income (€)"] || "Unknown"}<br>
//                   <strong>Unemployment (%):</strong> ${d["Unemployment Rate (%)"] || "Unknown"}
//                 `);

//               d3.select(this)
//                 .attr("stroke", "blue")
//                 .attr("stroke-width", 2);

//               tooltip.style("top", `${event.pageY + 5}px`)
//                      .style("left", `${event.pageX + 10}px`);
//             })
//             .on("mouseout", function () {
//               d3.select("body").select(".tooltip").remove();
//               d3.select(this)
//                 .attr("stroke", "black")
//                 .attr("stroke-width", 0.8);
//             });

//           circles.exit().remove();
//         };

//         drawCircles(data);

//         // year selection dropdown
//         const yearDropdown = document.getElementById("year-dropdown");
//         if (!yearDropdown) {
//           console.error("Dropdown element not found!");
//           return;
//         }

//         const uniqueYears = [...new Set(data.map(d => d.Year))];
//         uniqueYears.sort().forEach(year => {
//           const option = document.createElement("option");
//           option.value = year;
//           option.textContent = year;
//           yearDropdown.appendChild(option);
//         });

//         yearDropdown.addEventListener("change", function () {
//           const selectedYear = this.value;
//           const filteredData = data.filter(d => d.Year == selectedYear);
//           drawCircles(filteredData);
//         });
//       })
//       .catch(error => console.error("Error loading GeoJSON data:", error));
//   })
//   .catch(error => console.error("Error loading crime data:", error));




// fetch('./crime_data_cities.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log("Loaded Crime Data:", data);

//     const svg = d3.select("#crime-map")
//       .attr("width", 800)
//       .attr("height", 600)
//       .style("background-color", "#e0f7fa");

//     const projection = d3.geoMercator()
//       .center([2.2137, 46.2276]) // adjusted the center coordinates 
//       .scale(2500) // zoom level
//       .translate([400, 300]); // center the map in svg

//     const path = d3.geoPath().projection(projection);

//     // Load the GeoJSON for the map
//     fetch('./france.json')
//       .then(response => response.json())
//       .then(geoData => {
//         console.log("Loaded GeoJSON Data:", geoData);

//         // Render the map
//         svg.append("g")
//           .selectAll("path")
//           .data(geoData.features)
//           .enter()
//           .append("path")
//           .attr("d", path)
//           .attr("fill", "#d1e8f0") // color of land
//           .attr("stroke", "#00509e") // boundary color
//           .attr("stroke-width", 0.5);

//         // Draw city circles
//         const drawCircles = (filteredData) => {
//           const circles = svg.selectAll("circle")
//             .data(filteredData, d => d.Regions);

//           circles.enter()
//             .append("circle")
//             .merge(circles)
//             .attr("cx", d => projection([d.Longitude, d.Latitude])[0])
//             .attr("cy", d => projection([d.Longitude, d.Latitude])[1])
//             .attr("r", d => Math.min(Math.max(d["Crime Count"] / 50, 3), 15))
//             .attr("fill", d => {
//               if (d["Crime Count"] > 100) return "red";
//               else if (d["Crime Count"] > 50) return "orange";
//               else return "yellow";
//             })
//             .attr("stroke", "black")
//             .attr("stroke-width", 0.8)
//             .on("mouseover", function (event, d) {
//               // Safely access all data fields with fallback values
//               const cityName = d.Regions || "Unknown Region";
//               const crimeCount = d["Crime Count"] || "Unknown";
//               const crimeTypes = [...new Set(data.filter(city => city.Regions === d.Regions).map(city => city["Types of crime"]))].join(", ") || "Unknown";
//               const population = d["Population number"] || "Unknown";
//               const avgIncome = d["Average Monthly Net Income (€)"] || "Unknown";
//               const unemployment = d["Unemployment Rate (%)"] || "Unknown";

//               const tooltip = d3.select("body").append("div")
//                 .attr("class", "tooltip")
//                 .style("position", "absolute")
//                 .style("background", "#fff")
//                 .style("border", "1px solid #ccc")
//                 .style("padding", "8px")
//                 .style("border-radius", "4px")
//                 .style("pointer-events", "none")
//                 .html(`
//                   <strong>${cityName}</strong><br>
//                   <strong>Crime Count:</strong> ${crimeCount}<br>
//                   <strong>Crime Types:</strong> ${crimeTypes}<br>
//                   <strong>Population:</strong> ${population}<br>
//                   <strong>Avg Net Income (€):</strong> ${avgIncome}<br>
//                   <strong>Unemployment (%):</strong> ${unemployment}
//                 `);

//               d3.select(this)
//                 .attr("stroke", "blue")
//                 .attr("stroke-width", 2);

//               tooltip.style("top", `${event.pageY + 5}px`)
//                      .style("left", `${event.pageX + 10}px`);
//             })
//             .on("mouseout", function () {
//               d3.select("body").select(".tooltip").remove();
//               d3.select(this)
//                 .attr("stroke", "black")
//                 .attr("stroke-width", 0.8);
//             });

//           circles.exit().remove();
//         };

//         drawCircles(data);

//         // City search and highlight
//         const cityInput = document.getElementById("city-input");
//         cityInput.addEventListener("input", function () {
//           const cityName = cityInput.value.trim();

//           if (!cityName) {
//             // Clear highlighting when the input field is cleared
//             d3.selectAll("circle")
//               .attr("stroke", "black")
//               .attr("stroke-width", 0.8);
//           }
//         });

//         cityInput.addEventListener("keypress", function (event) {
//           if (event.key === "Enter") {
//             const cityName = cityInput.value.trim();
//             highlightCity(cityName);
//           }
//         });

//         // Highlight city function
//         function highlightCity(cityName) {
//           const selectedCity = data.find(d => d.Regions.toLowerCase() === cityName.toLowerCase());
//           if (selectedCity) {
//             d3.selectAll("circle")
//               .attr("stroke", d => (d.Regions === selectedCity.Regions ? "blue" : "black"))
//               .attr("stroke-width", d => (d.Regions === selectedCity.Regions ? 3 : 0.8));
//           } else {
//             console.error("City not found:", cityName);
//           }
//         }

//         // Year dropdown functionality
//         const yearDropdown = document.getElementById("year-dropdown");
//         const uniqueYears = [...new Set(data.map(d => d.Year))];
//         uniqueYears.sort().forEach(year => {
//           const option = document.createElement("option");
//           option.value = year;
//           option.textContent = year;
//           yearDropdown.appendChild(option);
//         });

//         yearDropdown.addEventListener("change", function () {
//           const selectedYear = this.value;
//           const filteredData = data.filter(d => d.Year == selectedYear);
//           drawCircles(filteredData);
//         });
//       })
//       .catch(error => console.error("Error loading GeoJSON data:", error));
//   })
//   .catch(error => console.error("Error loading crime data:", error));



fetch('./crime_data_cities.json')
  .then(response => response.json())
  .then(data => {
    console.log("Loaded Crime Data:", data);

    const width = 1027; // width
    const height = 895; // height

    // SVG container
    const svg = d3.select("#crime-map")
      .attr("width", width)
      .attr("height", height);

    // PNG map as a background image
    svg.append("image")
      .attr("xlink:href", "./map.png") // Path 
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0);

    // the projection for the circles
    const projection = d3.geoMercator()
      .center([2.2137, 46.2276]) // center coordinates for France
      .scale(2500) // Zoom level
      .translate([width / 2, height / 2]); // center on the SVG canvas

    // here drawing the crime circles
    const drawCircles = (filteredData) => {
      // here removing existing circles
      svg.selectAll("circle").remove();

      // circles for each city
      svg.selectAll("circle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("cx", d => projection([d.Longitude, d.Latitude])[0])
        .attr("cy", d => projection([d.Longitude, d.Latitude])[1])
        .attr("r", d => Math.min(Math.max(d["Crime Count"] / 50, 3), 15)) // Scale radius
        .attr("fill", d => {
          if (d["Crime Count"] > 100) return "red";
          else if (d["Crime Count"] > 50) return "orange";
          else return "yellow";
        })
        .attr("stroke", "black")
        .attr("stroke-width", 0.8)
        .on("mouseover", function (event, d) {
          // aggregating all crime types for the current city
          const crimeTypes = [...new Set(
            data
              .filter(city => city.Regions === d.Regions) // filtering all rows for the current city
              .map(city => city["Types of crime"]) // extracting "Types of crime"
          )].join(", ") || "Unknown"; // joining unique crime types into a single string

          // tooltip
          const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "#fff")
            .style("border", "1px solid #ccc")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .html(`
              <strong>${d.Regions}</strong><br>
              <strong>Crime Count:</strong> ${d["Crime Count"]}<br>
              <strong>Crime Types:</strong> ${crimeTypes}<br>
              <strong>Population:</strong> ${d["Population number"] || "Unknown"}<br>
              <strong>Avg Income (€):</strong> ${d["Average Monthly Net Income (€)"] || "Unknown"}<br>
              <strong>Unemployment (%):</strong> ${d["Unemployment Rate (%)"] || "Unknown"}
            `);

          d3.select(this)
            .attr("stroke", "blue")
            .attr("stroke-width", 2);

          tooltip.style("top", `${event.pageY + 5}px`)
                 .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function () {
          d3.select("body").select(".tooltip").remove();
          d3.select(this)
            .attr("stroke", "black")
            .attr("stroke-width", 0.8);
        });
    };

    drawCircles(data); // initial render with all data

    // adding year filtering
    const yearDropdown = document.getElementById("year-dropdown");
    const uniqueYears = [...new Set(data.map(d => d.Year))].sort();
    uniqueYears.forEach(year => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearDropdown.appendChild(option);
    });

    yearDropdown.addEventListener("change", function () {
      const selectedYear = this.value;
      const filteredData = data.filter(d => d.Year == selectedYear);
      drawCircles(filteredData);
    });

    // adding city search highlighting

    //please PRESS ENTER after writing a city name in the "search input field" then the highliting will work
    
    const cityInput = document.getElementById("city-input");
    cityInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        const cityName = cityInput.value.trim();
        const selectedCity = data.find(d => d.Regions.toLowerCase() === cityName.toLowerCase());
        svg.selectAll("circle")
          .attr("stroke", d => (d.Regions === selectedCity?.Regions ? "blue" : "black"))
          .attr("stroke-width", d => (d.Regions === selectedCity?.Regions ? 3 : 0.8));
      }
    });
  })
  .catch(error => console.error("Error loading crime data:", error));
