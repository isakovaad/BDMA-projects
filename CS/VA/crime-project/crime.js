// // Load the city dataset
// fetch('./crime_data_cities.json')
//   .then(response => {
//     if (!response.ok) throw new Error("Failed to fetch JSON file");
//     return response.json();
//   })
//   .then(data => {
//     console.log("Loaded Data:", data);

//     // Filter out outliers (optional)
//     data = data.filter(d => d.Longitude > -10 && d.Longitude < 10 && d.Latitude > 40 && d.Latitude < 52);

//     // Select the SVG container
//     const svg = d3.select("#crime-map")
//       .attr("width", 800)
//       .attr("height", 600)
//       .style("background-color", "white");

//     // Define a projection to convert geographic coordinates to SVG coordinates
//     const projection = d3.geoMercator()
//       .center([2.2137, 46.2276]) // Center of France [Longitude, Latitude]
//       .scale(2000) // Zoom level
//       .translate([400, 300]); // Center in the SVG (adjust as necessary)

//     // Define a path generator using the projection
//     const path = d3.geoPath().projection(projection);

//     // Load GeoJSON map data
//     fetch('./france.json') // Replace with the path to your GeoJSON file
//       .then(response => {
//         if (!response.ok) throw new Error("Failed to load GeoJSON");
//         return response.json();
//       })
//       .then(geoData => {
//         console.log("Loaded GeoJSON Data:", geoData);

//         // Draw the map
//         svg.append("g")
//           .selectAll("path")
//           .data(geoData.features)
//           .enter()
//           .append("path")
//           .attr("d", path)
//           .attr("fill", "#d9e6f2") // Light blue color for land
//           .attr("stroke", "#7da6c2") // Blue-grey for boundaries
//           .attr("stroke-width", 0.7);

//         // Render circles for cities using the projection
//         svg.selectAll("circle")
//           .data(data)
//           .enter()
//           .append("circle")
//           .attr("cx", d => projection([d.Longitude, d.Latitude])[0]) // Use projection for X
//           .attr("cy", d => projection([d.Longitude, d.Latitude])[1]) // Use projection for Y
//           .attr("r", d => {
//             const radius = d["Crime Count"] / 50;
//             return Math.min(Math.max(radius, 2), 12); // Clamp radius between 2px and 12px
//           })
//           .attr("fill", d => {
//             if (d["Crime Count"] > 100) return "red";
//             else if (d["Crime Count"] > 50) return "orange";
//             else return "yellow";
//           })
//           .attr("stroke", "black")
//           .attr("stroke-width", 1)
//           .on("mouseover", (event, d) => {
//             console.log(`Hovered city: ${d.Regions}, Crime Count: ${d["Crime Count"]}`);
//           });

//         // Add search functionality
//         const cityInput = document.getElementById("city-input");
//         const cityList = document.getElementById("city-list");

//         cityInput.addEventListener("input", function () {
//           const inputValue = cityInput.value.toLowerCase();
//           cityList.innerHTML = ""; // Clear previous suggestions

//           if (inputValue) {
//             const filteredCities = data
//               .map(d => d.Regions)
//               .filter(city => city.toLowerCase().startsWith(inputValue));

//             filteredCities.forEach(city => {
//               const listItem = document.createElement("li");
//               listItem.textContent = city;

//               // Highlight the selected city
//               listItem.addEventListener("click", function () {
//                 cityInput.value = city; // Set selected city
//                 cityList.innerHTML = ""; // Clear dropdown

//                 const selectedCity = data.find(d => d.Regions === city);

//                 // Highlight the city on the map
//                 d3.selectAll("circle")
//                   .attr("stroke", d => (d.Regions === city ? "blue" : "black"))
//                   .attr("stroke-width", d => (d.Regions === city ? 3 : 1));

//                 // Log the selected city
//                 console.log(`Selected city: ${selectedCity.Regions}`);
//               });

//               cityList.appendChild(listItem);
//             });
//           }
//         });

//         // Add a legend
//         const legend = svg.append("g")
//           .attr("transform", "translate(600, 50)");

//         const crimeLevels = [
//           { color: "yellow", label: "Low Crime" },
//           { color: "orange", label: "Medium Crime" },
//           { color: "red", label: "High Crime" }
//         ];

//         legend.selectAll("rect")
//           .data(crimeLevels)
//           .enter()
//           .append("rect")
//           .attr("x", 0)
//           .attr("y", (d, i) => i * 20)
//           .attr("width", 15)
//           .attr("height", 15)
//           .attr("fill", d => d.color);

//         legend.selectAll("text")
//           .data(crimeLevels)
//           .enter()
//           .append("text")
//           .attr("x", 20)
//           .attr("y", (d, i) => i * 20 + 12)
//           .text(d => d.label)
//           .attr("font-size", "12px")
//           .attr("fill", "black");
//       })
//       .catch(error => console.error("Error loading GeoJSON data:", error));
//   })
//   .catch(error => console.error("Error loading city data:", error));




// // Load the dataset
// fetch('./crime_data_cities.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log("Loaded Crime Data:", data);

//     const svg = d3.select("#crime-map")
//       .attr("width", 800)
//       .attr("height", 600)
//       .style("background-color", "#e0f7fa");

//     const projection = d3.geoMercator()
//       .center([2.2137, 46.2276]) // Adjust the center coordinates for France
//       .scale(3000) // Adjust zoom level
//       .translate([400, 300]); // Center the map in SVG

//     const path = d3.geoPath().projection(projection);

//     // Load the GeoJSON for the map
//     fetch('./france.json')
//       .then(response => response.json())
//       .then(geoData => {
//         console.log("Loaded GeoJSON Data:", geoData);

//         // Draw the map
//         svg.append("g")
//           .selectAll("path")
//           .data(geoData.features)
//           .enter()
//           .append("path")
//           .attr("d", path)
//           .attr("fill", "#d1e8f0") // Light blue for land
//           .attr("stroke", "#00509e") // Dark blue for boundaries
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
//               const cityCrimes = data.filter(city => city.Regions === d.Regions);

//               // Use a Set to ensure unique crime types
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

//         // Dropdown for year selection
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









// heyyy Ben i left comments so you can refer to them
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




fetch('./crime_data_cities.json')
  .then(response => response.json())
  .then(data => {
    console.log("Loaded Crime Data:", data);

    const svg = d3.select("#crime-map")
      .attr("width", 800)
      .attr("height", 600)
      .style("background-color", "#e0f7fa");

    const projection = d3.geoMercator()
      .center([2.2137, 46.2276]) // adjusted the center coordinates 
      .scale(2500) // zoom level
      .translate([400, 300]); // center the map in svg

    const path = d3.geoPath().projection(projection);

    // Load the GeoJSON for the map
    fetch('./france.json')
      .then(response => response.json())
      .then(geoData => {
        console.log("Loaded GeoJSON Data:", geoData);

        // Render the map
        svg.append("g")
          .selectAll("path")
          .data(geoData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("fill", "#d1e8f0") // color of land
          .attr("stroke", "#00509e") // boundary color
          .attr("stroke-width", 0.5);

        // Draw city circles
        const drawCircles = (filteredData) => {
          const circles = svg.selectAll("circle")
            .data(filteredData, d => d.Regions);

          circles.enter()
            .append("circle")
            .merge(circles)
            .attr("cx", d => projection([d.Longitude, d.Latitude])[0])
            .attr("cy", d => projection([d.Longitude, d.Latitude])[1])
            .attr("r", d => Math.min(Math.max(d["Crime Count"] / 50, 3), 15))
            .attr("fill", d => {
              if (d["Crime Count"] > 100) return "red";
              else if (d["Crime Count"] > 50) return "orange";
              else return "yellow";
            })
            .attr("stroke", "black")
            .attr("stroke-width", 0.8)
            .on("mouseover", function (event, d) {
              // Safely access all data fields with fallback values
              const cityName = d.Regions || "Unknown Region";
              const crimeCount = d["Crime Count"] || "Unknown";
              const crimeTypes = [...new Set(data.filter(city => city.Regions === d.Regions).map(city => city["Types of crime"]))].join(", ") || "Unknown";
              const population = d["Population number"] || "Unknown";
              const avgIncome = d["Average Monthly Net Income (€)"] || "Unknown";
              const unemployment = d["Unemployment Rate (%)"] || "Unknown";

              const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background", "#fff")
                .style("border", "1px solid #ccc")
                .style("padding", "8px")
                .style("border-radius", "4px")
                .style("pointer-events", "none")
                .html(`
                  <strong>${cityName}</strong><br>
                  <strong>Crime Count:</strong> ${crimeCount}<br>
                  <strong>Crime Types:</strong> ${crimeTypes}<br>
                  <strong>Population:</strong> ${population}<br>
                  <strong>Avg Net Income (€):</strong> ${avgIncome}<br>
                  <strong>Unemployment (%):</strong> ${unemployment}
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

          circles.exit().remove();
        };

        drawCircles(data);

        // City search and highlight
        const cityInput = document.getElementById("city-input");
        cityInput.addEventListener("input", function () {
          const cityName = cityInput.value.trim();

          if (!cityName) {
            // Clear highlighting when the input field is cleared
            d3.selectAll("circle")
              .attr("stroke", "black")
              .attr("stroke-width", 0.8);
          }
        });

        cityInput.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
            const cityName = cityInput.value.trim();
            highlightCity(cityName);
          }
        });

        // Highlight city function
        function highlightCity(cityName) {
          const selectedCity = data.find(d => d.Regions.toLowerCase() === cityName.toLowerCase());
          if (selectedCity) {
            d3.selectAll("circle")
              .attr("stroke", d => (d.Regions === selectedCity.Regions ? "blue" : "black"))
              .attr("stroke-width", d => (d.Regions === selectedCity.Regions ? 3 : 0.8));
          } else {
            console.error("City not found:", cityName);
          }
        }

        // Year dropdown functionality
        const yearDropdown = document.getElementById("year-dropdown");
        const uniqueYears = [...new Set(data.map(d => d.Year))];
        uniqueYears.sort().forEach(year => {
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
      })
      .catch(error => console.error("Error loading GeoJSON data:", error));
  })
  .catch(error => console.error("Error loading crime data:", error));
