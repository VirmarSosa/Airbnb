// Get the data for the chart
d3.json("/Data/airbnb_melbourne.geojson").then(function(data) {
    var prices = data.features.map(function(feature) {
      return feature.properties.price;
    });
  
    // Create a data object for the chart
    var chartData = {
      labels: ["0-50", "51-100", "101-200", "201-300", "301-400", "401+"],
      datasets: [{
        label: "Price Per Airbnb",
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
        indexAxis: 'y',
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
  
  d3.json("/Data/airbnb_melbourne.geojson").then(function(data) {
    var prices = data.features.map(function(feature) {
      return feature.properties.price;
    });
  
    // Create a data object for the chart
    var chartData = {
      labels: ["0-50", "51-100", "101-200", "201-300", "301-400", "401+"],
      datasets: [{
        label: "Price Per Airbnb",
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
    var ctx = document.getElementById("myChart").getContext("2d");
    var acquisitions = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: {
        indexAxis: 'y',
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
  
  