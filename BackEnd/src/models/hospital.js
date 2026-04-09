const prisma = require("../config/db");

// CREATE
const createHospital = async (data) => {
  return await prisma.hospital.create({
    data: {
      name: data.name,
      address: data.address,
      lat: Number(data.latitude),
      lng: Number(data.longitude),
      totalBeds: Number(data.total_rooms) || 0,
      erCapacity: Number(data.emergency_rooms) || 0,
      currentPatients: Number(data.occupied_rooms) || 0,
      availableBeds: Number(data.available_rooms) || 0,
      avgWaitTime: Number(data.avgWaitTime) || 10,
      contactNumber: data.contactNumber || null,
      isActive: true
    }
  });
};


// GET ALL
const getAllHospitals = async () => {
  return await prisma.hospital.findMany();
};


// GET ONE
const getHospitalById = async (id) => {
  return await prisma.hospital.findUnique({
    where: { id: Number(id) }
  });
};


// UPDATE
const updateHospital = async (id, data) => {
  return await prisma.hospital.update({
    where: { id: Number(id) },
    data: {
      name: data.name,
      address: data.address,
      lat: Number(data.latitude),
      lng: Number(data.longitude),
      totalBeds: Number(data.total_rooms),
      erCapacity: Number(data.emergency_rooms),
      currentPatients: Number(data.occupied_rooms),
      availableBeds: Number(data.available_rooms),
      avgWaitTime: Number(data.avgWaitTime),
      contactNumber: data.contactNumber
    }
  });
};


// DELETE
const deleteHospital = async (id) => {
  return await prisma.hospital.delete({
    where: { id: Number(id) }
  });
};


module.exports = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital
};