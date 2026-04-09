const prisma = require("../config/db");

/*
CREATE TRIAGE SUBMISSION
*/

const createTriage = async (triageData) => {
  try {
    const result = await prisma.triageSubmission.create({
      data: {
        patient_name: triageData.patient_name || "Unknown",
        age: Number(triageData.age) || 0,
        gender: triageData.gender || "UNKNOWN",

        chest_pain: triageData.chest_pain ?? false,
        breathing_difficulty: triageData.breathing_difficulty ?? false,
        heavy_bleeding: triageData.heavy_bleeding ?? false,
        unconscious: triageData.unconscious ?? false,
        severe_burns: triageData.severe_burns ?? false,
        head_injury: triageData.head_injury ?? false,
        accident: triageData.accident ?? false,
        high_fever: triageData.high_fever ?? false,
        vomiting: triageData.vomiting ?? false,
        seizure: triageData.seizure ?? false,

        pain_level: Number(triageData.pain_level) || 0,
        symptom_duration_hours: Number(triageData.symptom_duration_hours) || 0,

        priority_score: Number(triageData.priority_score) || 0,
        triage_category: triageData.triage_category || "GREEN",
      },
    });

    return result;

  } catch (error) {
    console.error("❌ TRIAGE MODEL ERROR:", error);
    throw error;
  }
};


/*
GET ALL TRIAGE
*/

const getAllTriage = async () => {
  try {
    return await prisma.triageSubmission.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  } catch (error) {
    console.error("❌ GET ALL TRIAGE ERROR:", error);
    throw error;
  }
};


/*
GET TRIAGE BY ID
*/

const getTriageById = async (id) => {
  try {
    return await prisma.triageSubmission.findUnique({
      where: {
        submission_id: id,
      },
    });
  } catch (error) {
    console.error("❌ GET TRIAGE BY ID ERROR:", error);
    throw error;
  }
};


module.exports = {
  createTriage,
  getAllTriage,
  getTriageById,
};