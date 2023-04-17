
  // Create a map centered on Melbourne
var map = L.map('map').setView([-37.8136, 144.9631], 12);

// Add a tile layer for the map
var tileLayer = L.tileLayer('https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, Imagery © <a href="https://hot.openstreetmap.org">Humanitarian OpenStreetMap Team</a>'
}).addTo(map);

d3.json("Data/airbnb_melbourne.geojson").then(function(data) {

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
