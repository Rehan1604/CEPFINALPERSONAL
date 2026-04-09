const { calculateHospitalLoad } = require("./calculateLoad");
const { getLiveDistance } = require("./liveDistance");

const selectNearestHospitals = async (
  hospitals,
  patientLocation,
  priority,
  limit = 10
) => {
  let filtered = [];

  for (let hospital of hospitals) {
    if (!hospital.isActive) continue;

    if (
      hospital.lat == null ||
      hospital.lng == null ||
      isNaN(patientLocation.lat) ||
      isNaN(patientLocation.lon)
    ) {
      continue;
    }

    const route = await getLiveDistance(
      patientLocation.lat,
      patientLocation.lon,
      hospital.lat,
      hospital.lng
    );

    const waitTime = hospital.avgWaitTime || 10;
    const totalTime = route.durationMin + waitTime;

    filtered.push({
      ...hospital,
      distance: route.distanceKm,
      travelTime: route.durationMin,
      waitTime,
      totalTime,
      source: route.source,
      load: calculateHospitalLoad(hospital),
    });
  }

  filtered.sort((a, b) => a.totalTime - b.totalTime);

  return filtered.slice(0, limit);
};

module.exports = {
  selectNearestHospitals,
};