let airbnb_data = d3.json("/Data/airbnb_melbourne.geojson")
  .then(function(data) {
    // Do something with the data
    console.log(data);
  })
  .catch(function(error) {
    // Handle any errors
    console.error(error);
  });