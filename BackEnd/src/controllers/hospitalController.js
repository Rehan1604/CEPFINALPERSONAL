const hospitalModel = require("../models/hospital");

// CREATE
const createHospital = async (req, res) => {
  try {
    const hospital = await hospitalModel.createHospital(req.body);

    res.status(201).json({
      success: true,
      data: hospital
    });

  } catch (error) {
    res.status(500).json({ error: "Error creating hospital" });
  }
};


// GET ALL
const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalModel.getAllHospitals();

    res.json({
      success: true,
      data: hospitals
    });

  } catch (error) {
    res.status(500).json({ error: "Error fetching hospitals" });
  }
};


// GET ONE
const getHospitalById = async (req, res) => {
  try {
    const hospital = await hospitalModel.getHospitalById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.json({ success: true, data: hospital });

  } catch (error) {
    res.status(500).json({ error: "Error fetching hospital" });
  }
};


// UPDATE
const updateHospital = async (req, res) => {
  try {
    const updated = await hospitalModel.updateHospital(req.params.id, req.body);

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(500).json({ error: "Error updating hospital" });
  }
};


// DELETE
const deleteHospital = async (req, res) => {
  try {
    await hospitalModel.deleteHospital(req.params.id);

    res.json({
      success: true,
      message: "Hospital deleted"
    });

  } catch (error) {
    res.status(500).json({ error: "Error deleting hospital" });
  }
};

module.exports = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital
};