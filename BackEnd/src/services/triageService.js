const { calculateRiskScore, getRiskCategory } = require("../utils/riskScore");
const { selectNearestHospitals } = require("../utils/hospitalSelector");
const hospitalModel = require("../models/hospital");
const processTriage = async (data) => {
  try {
    const score = calculateRiskScore(data);
    const category = getRiskCategory(score);

    data.priority_score = score;
    data.triage_category = category;

    // 🔥 TEMP: skip DB save
    const triageResult = {
      message: "Triage processed (not saved)",
      ...data,
    };

    const hospitals = await hospitalModel.getAllHospitals();

    if (!hospitals || hospitals.length === 0) {
      throw new Error("No hospitals available");
    }

    const patientLocation = {
      lat: data.latitude || 19.0760,
      lon: data.longitude || 72.8777,
    };

    const nearestHospitals = await selectNearestHospitals(
      hospitals,
      patientLocation,
      category,
      10
    );

    return {
      triage: triageResult,
      priority_score: score,
      triage_category: category,
      nearestHospitals,
    };
  } catch (error) {
    console.error("Triage Service Error:", error);
    throw error;
  }
};
module.exports = {
  processTriage
};