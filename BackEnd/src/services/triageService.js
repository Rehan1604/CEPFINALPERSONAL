const triageModel = require("../models/triage");
const hospitalModel = require("../models/hospital");

const { calculateRiskScore, getRiskCategory } = require("../utils/riskScore");
const { selectNearestHospitals } = require("../utils/hospitalSelector");

const processTriage = async (data) => {
  try {
    // 🔹 Step 1: Calculate score
    const score = calculateRiskScore(data);

    // 🔹 Step 2: Get category
    const category = getRiskCategory(score);

    data.priority_score = score;
    data.triage_category = category;

    // 🔹 Step 3: Save triage
    const triageResult = await triageModel.createTriage(data);

    // 🔹 Step 4: Fetch hospitals
    const hospitals = await hospitalModel.getAllHospitals();

    if (!Array.isArray(hospitals) || hospitals.length === 0) {
      throw new Error("No hospitals available");
    }

    // 🔹 Step 5: Safe patient location (FIXED)
    let lat = Number(data.latitude);
    let lon = Number(data.longitude);

    if (isNaN(lat) || isNaN(lon)) {
      lat = 19.0760;   // Mumbai fallback
      lon = 72.8777;
    }

    const patientLocation = { lat, lon };

    // 🔹 Step 6: Get nearest hospitals
    const nearestHospitals = selectNearestHospitals(
      hospitals,
      patientLocation,
      category,
      10
    );

    return {
      triage: triageResult,
      priority_score: score,
      triage_category: category,
      nearestHospitals: nearestHospitals || []
    };

  } catch (error) {
    console.error("Triage Service Error:", error);
    throw error;
  }
};

module.exports = {
  processTriage
};