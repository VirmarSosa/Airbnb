// Create a map centered on Melbourne
var map = L.map('map').setView([-37.8136, 144.9631], 12);

// Add a tile layer for the map
var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Load AirBnB data and create a feature layer
var airbnbData = L.geoJson();
fetch('airbnb-melbourne.geojson')
	.then(response => response.json())
	.then(data => {
		airbnbData = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, {
					radius: 5,
					fillColor: '#f03',
					color: '#000',
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8
				});
			}
		}).addTo(map);

		// Create a chart showing average price per night by room type
		var roomTypeData = data.features.reduce((acc, curr) => {
			if (!acc[curr.properties.room_type]) {
				acc[curr.properties.room_type] = { count: 0, totalPrice: 0 };
			}
			acc[curr.properties.room_type].count++;
			acc[curr.properties.room_type].totalPrice += curr.properties.price;
			return acc;
		}, {});
		var roomTypeLabels = Object.keys(roomTypeData);
		var roomTypePrices = roomTypeLabels.map(label => Math.round(roomTypeData[label].totalPrice / roomTypeData[label].count));
		var roomTypeChartCtx = document.getElementById('room-type-chart').getContext('2d');
		var roomTypeChart = new Chart(roomTypeChartCtx, {
			type: 'bar',
			data: {
				labels: roomTypeLabels,
				datasets: [{
					label: 'Average Price per Night',
					data: roomTypePrices,
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});

		// Create a chart showing number of listings by host name
		var hostNameData = data.features.reduce((acc, curr) => {
			if (!acc[curr.properties.host_name]) {
				acc[curr.properties.host_name] = 0;
			}
			acc[curr.properties.host_name]++;
			return acc;
		}, {});
		var hostNameLabels = Object.keys(hostNameData).sort((a, b) => hostNameData[b] - hostNameData[a]).slice(0, 10);
		var hostNameCounts = hostNameLabels.map(label => hostNameData[label]);
		var hostNameChartCtx = document.getElementById('host-name-chart').getContext('2d');
		var hostNameChart = new Chart(hostNameChartCtx, {
			type: 'horizontalBar',
			data:
