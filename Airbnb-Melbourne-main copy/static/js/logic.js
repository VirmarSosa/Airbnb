
  // Create a map centered on Melbourne
var map = L.map('map').setView([-37.8136, 144.9631], 12);

// Add a tile layer for the map
var tileLayer = L.tileLayer('https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, Imagery © <a href="https://hot.openstreetmap.org">Humanitarian OpenStreetMap Team</a>'
}).addTo(map);

d3.json("/Data/airbnb_melbourne.geojson").then(function(data) {

    var markers = L.layerGroup();
  
    data.features.forEach(function(feature) {
  
      var price = feature.properties.price;
  
      var color;
  
      if (price >= 1 && price < 50) {
        color = "#FF0000"; // red
      } else if (price >= 50 && price <= 100) {
        color = "#808000"; // green
      } else if (price >= 101 && price <= 200) {
        color = "#ff6600"; // orange
      } else if (price >= 201 && price <= 300) {
        color = "#ff6699"; // pink
      } else if (price >= 301 && price <= 400) {
        color = "#0000FF"; // blue  
      } else {
        color = "#FFFF00"; // yellow
      }
  
      var popupContent = "<b>Name: </b>" + feature.properties.name + "<br>" +
                         "<b>Host: </b>" + feature.properties.host_name + "<br>" +
                         "<b>Price: </b>$" + feature.properties.price + "<br>" +
                         "<b>Availability: </b>" + feature.properties.has_availability + "<br>" +
                         "<b>Review Rating: </b>" + feature.properties.review_scores_rating;

                         
  
      var marker = L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        radius: feature.properties.review_scores_rating / 1.5,
        fillColor: color,
        fillOpacity: 0.8,
        color: "#fff",
        weight: 1,
      }).bindPopup(popupContent); // Bind popup to marker
  
      markers.addLayer(marker);
    });
  
    map.addLayer(markers);
});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

  var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 50, 100, 200, 300, 400],
      colors = ["#FF0000", "#808000", "#ff6600", "#ff6699", "#0000FF", "#FFFF00"],
      labels = [];
  var legendInfo = "<h3 style='margin-top: 0;'>Price</h3>"
  div.innerHTML = legendInfo

  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + colors[i] + '"></i> ' +
          "$" + grades[i] + (grades[i + 1] ? '&ndash;' + "$" + grades[i + 1] + '<br>' : '+');
  }

  // Add CSS for the legend's <i> element
  div.querySelectorAll('i').forEach(function (el) {
    el.style.width = '20px';
    el.style.height = '15px';
    el.style.display = 'inline-block';
    el.style.marginRight = '5px';
  });

  return div;
};

legend.addTo(map);

// Get the data for the chart
d3.json("/Data/airbnb_melbourne.geojson").then(function(data) {
    var prices = data.features.map(function(feature) {
      return feature.properties.price;
    });
  
    // Create a data object for the chart
    var chartData = {
      labels: ["0-50", "51-100", "101-200", "201-300", "301-400", "401+"],
      datasets: [{
        label: "Price",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "#FF0000",
          "#808000",
          "#ff6600",
          "#ff6699",
          "#0000FF",
          "#FFFF00"
        ]
      }]
    };
  
    // Update the data object with the actual data
    for (var i = 0; i < prices.length; i++) {
      if (prices[i] >= 1 && prices[i] < 50) {
        chartData.datasets[0].data[0]++;
      } else if (prices[i] >= 50 && prices[i] <= 100) {
        chartData.datasets[0].data[1]++;
      } else if (prices[i] >= 101 && prices[i] <= 200) {
        chartData.datasets[0].data[2]++;
      } else if (prices[i] >= 201 && prices[i] <= 300) {
        chartData.datasets[0].data[3]++;
      } else if (prices[i] >= 301 && prices[i] <= 400) {
        chartData.datasets[0].data[4]++;
      } else {
        chartData.datasets[0].data[5]++;
      }
    }
  
    // Create the chart
    var ctx = document.getElementById("acquisitions").getContext("2d");
    var acquisitions = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });
  

