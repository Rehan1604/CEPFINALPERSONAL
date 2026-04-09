const pool = require("../config/db");

// CREATE TOKEN
const createToken = async (data) => {
  const query = `
    INSERT INTO tokens 
    (token_number, patient_id, hospital_id, priority, estimated_wait_time, expires_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    data.token_number,
    data.patient_id,
    data.hospital_id,
    data.priority,
    data.estimated_wait_time || 0,
    data.expires_at || null
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// GET TOKEN BY ID
const getTokenById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM tokens WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

// GET ALL TOKENS FOR HOSPITAL
const getTokensByHospital = async (hospital_id) => {
  const result = await pool.query(
    `SELECT * FROM tokens WHERE hospital_id = $1 ORDER BY issued_at ASC`,
    [hospital_id]
  );
  return result.rows;
};

// UPDATE TOKEN STATUS
const updateTokenStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE tokens SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

module.exports = {
  createToken,
  getTokenById,
  getTokensByHospital,
  updateTokenStatus
};