// Find the play button on the page
const playButton = document.querySelector(".PlayButton");

if (playButton) {
  // Add event listener to the play button
  playButton.addEventListener("click", () => {
    // Get user's current location using a geolocation API
    navigator.geolocation.getCurrentPosition(position => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      // Calculate distances to all servers and find the closest one
      const servers = [
        {
          "Lat": 41.845134,
          "Lng": -87.662879,
          "Region": "Chicago, IL, USA"
        },
        {
            "Lat": 32.772643,
            "Lng": -96.79922,
            "Region": "Dallas, TX, USA"
        },
        {
            "Lat": 37.335712,
            "Lng": -121.891536,
            "Region": "San Jose, CA, USA"
          },
        // Add other server locations here
        {
          "Lat": 39.041572,
          "Lng": -77.4872,
          "Region": "Ashburn, VA, USA"
        }
      ];

      let closestServer = servers[0];
      let closestDistance = getDistance(userLat, userLng, closestServer.Lat, closestServer.Lng);

      servers.forEach(server => {
        const distance = getDistance(userLat, userLng, server.Lat, server.Lng);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestServer = server;
        }
      });

      // Redirect the user to the closest server
      window.location.href = `https://www.roblox.com/games/serverredirect?url=&placeId=16709048641&region=${closestServer.Lat},${closestServer.Lng}`;
    });
  });
}

// Function to calculate distance between two points using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
