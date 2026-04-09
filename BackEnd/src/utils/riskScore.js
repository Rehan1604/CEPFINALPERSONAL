// utils/riskScore.js

const calculateRiskScore = (data) => {
  let score = 0;

  if (data.chest_pain) score += 4;
  if (data.breathing_difficulty) score += 4;
  if (data.heavy_bleeding) score += 5;
  if (data.unconscious) score += 6;
  if (data.severe_burns) score += 5;
  if (data.head_injury) score += 4;
  if (data.seizure) score += 4;

  score += data.pain_level || 0;

  return score;
};

const getRiskCategory = (score) => {
  if (score >= 8) return "RED";
  if (score >= 4) return "YELLOW";
  return "GREEN";
};

module.exports = {
  calculateRiskScore,
  getRiskCategory
};