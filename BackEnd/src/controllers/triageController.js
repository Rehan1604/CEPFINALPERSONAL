const triageService = require("../services/triageService");
const triageModel = require("../models/triage");

/* CREATE TRIAGE SUBMISSION */
exports.submitTriage = async (req, res) => {
  try {
    const result = await triageService.processTriage(req.body);

    res.status(201).json({
      success: true,
      message: "Triage completed successfully",
      data: result
    });

  } catch (error) {
    console.error("Triage Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Server error"
    });
  }
};


/* GET ALL TRIAGE SUBMISSIONS */
exports.getAllTriage = async (req, res) => {
  try {
    const triageList = await triageModel.getAllTriage();

    res.json({
      success: true,
      data: triageList
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};