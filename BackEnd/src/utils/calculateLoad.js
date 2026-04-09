// utils/calculateLoad.js

const calculateHospitalLoad = (hospital) => {
  if (!hospital.total_rooms || hospital.total_rooms === 0) return 1;

  const roomLoad = hospital.occupied_rooms / hospital.total_rooms;

  const icuLoad = hospital.icu_beds
    ? hospital.occupied_icu / hospital.icu_beds
    : 0;

  // weighted average
  const load = (roomLoad * 0.6) + (icuLoad * 0.4);

  return load; // 0 = empty, 1 = full
};

module.exports = {
  calculateHospitalLoad
};