const patientModel = require('../models/patient');

// 🔹 Create Patient
const createPatient = async (req, res) => {
  try {
    const patient = await patientModel.createPatient(req.body);

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: patient
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating patient"
    });
  }
};


// 🔹 Get All Patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.getAllPatients();

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching patients"
    });
  }
};


// 🔹 Get Patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await patientModel.getPatientById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching patient"
    });
  }
};


// 🔹 Update Patient
const updatePatient = async (req, res) => {
  try {
    const updated = await patientModel.updatePatient(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: updated
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating patient"
    });
  }
};


// 🔹 Delete Patient
const deletePatient = async (req, res) => {
  try {
    await patientModel.deletePatient(req.params.id);

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting patient"
    });
  }
};


module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
};