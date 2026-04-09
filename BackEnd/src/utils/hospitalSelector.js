const { calculateHospitalLoad } = require("./calculateLoad");
const { calculateDistance } = require("./distance");

const selectNearestHospitals = (
  hospitals,
  patientLocation,
  priority,
  limit = 10
) => {
  let filtered = [];

  for (let hospital of hospitals) {

    // ✅ Skip invalid hospitals (FIXED for Prisma)
    if (
      hospital.lat == null ||
      hospital.lng == null ||
      isNaN(patientLocation.lat) ||
      isNaN(patientLocation.lon)
    ) {
      continue;
    }

    // ❌ Skip inactive hospitals
    if (hospital.isActive === false) continue;

    // ❌ RED patients need capacity (simulate ICU via availableBeds)
    if (priority === "RED" && hospital.availableBeds <= 0) continue;

    // 📍 Distance (FIXED)
    const distance = calculateDistance(
      Number(patientLocation.lat),
      Number(patientLocation.lon),
      Number(hospital.lat),
      Number(hospital.lng)
    );

    // 🚗 Travel Time
    const avgSpeed = 30;
    const travelTime = (distance / avgSpeed) * 60;

    // 🏥 Wait Time
    const waitTime =
      hospital.avgWaitTime ||
      10;

    // 📊 Load
    const load = calculateHospitalLoad(hospital);

    // ⏱️ Total Time
    const totalTime = travelTime + waitTime;

    filtered.push({
      ...hospital,
      distance,
      travelTime,
      waitTime,
      totalTime,
      load
    });
  }

  // 🔥 Sort best first
  filtered.sort((a, b) => a.totalTime - b.totalTime);

  return filtered.slice(0, limit);
};

module.exports = {
  selectNearestHospitals
};