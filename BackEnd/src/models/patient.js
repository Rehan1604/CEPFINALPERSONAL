const pool = require('../config/db');

// 🔹 Create Patient
const createPatient = async (data) => {
  const {
    name,
    age,
    gender,
    phone,
    blood_group,
    allergies,
    emergency_contact,
    latitude,
    longitude
  } = data;

  const query = `
    INSERT INTO patients
    (name, age, gender, phone, blood_group, allergies, emergency_contact, latitude, longitude)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *;
  `;

  const values = [
    name,
    age,
    gender,
    phone,
    blood_group,
    allergies,
    emergency_contact,
    latitude,
    longitude
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};


// 🔹 Get All Patients
const getAllPatients = async () => {
  const result = await pool.query(`SELECT * FROM patients ORDER BY created_at DESC`);
  return result.rows;
};


// 🔹 Get Patient by ID
const getPatientById = async (id) => {
  const result = await pool.query(`SELECT * FROM patients WHERE id = $1`, [id]);
  return result.rows[0];
};


// 🔹 Update Patient
const updatePatient = async (id, data) => {
  const {
    name,
    age,
    gender,
    phone,
    blood_group,
    allergies,
    emergency_contact
  } = data;

  const query = `
    UPDATE patients
    SET name=$1, age=$2, gender=$3, phone=$4,
        blood_group=$5, allergies=$6, emergency_contact=$7
    WHERE id=$8
    RETURNING *;
  `;

  const values = [
    name,
    age,
    gender,
    phone,
    blood_group,
    allergies,
    emergency_contact,
    id
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};


// 🔹 Delete Patient
const deletePatient = async (id) => {
  await pool.query(`DELETE FROM patients WHERE id = $1`, [id]);
};


module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
};