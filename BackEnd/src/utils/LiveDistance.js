const getLiveDistance = async (userLat, userLng, hospitalLat, hospitalLng) => {
  try {
    const apiKey = process.env.ORS_API_KEY;

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${userLng},${userLat}&end=${hospitalLng},${hospitalLat}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.features || data.features.length === 0) {
      throw new Error("No route found");
    }

    const summary = data.features[0].properties.summary;

    return {
      distanceKm: summary.distance / 1000,
      durationMin: summary.duration / 60,
      source: "OpenRouteService",
    };
  } catch (error) {
    console.error("LIVE DISTANCE API ERROR:", error);

    return {
      distanceKm: 999,
      durationMin: 999,
      source: "Fallback",
    };
  }
};

module.exports = { getLiveDistance };