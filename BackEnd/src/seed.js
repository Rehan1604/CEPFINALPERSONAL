require("dotenv").config({ path: "../.env" });
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log(" Starting database seed...");

  const hospitals = [
    {
      name: "KEM Hospital",
      address: "Parel, Mumbai",
      lat: 19.0176,
      lng: 72.8425,
      totalBeds: 180,
      erCapacity: 40,
      currentPatients: 120,
      availableBeds: 60,
      avgWaitTime: 25,
      contactNumber: "02224107000",
      isActive: true,
    },
    {
      name: "Lilavati Hospital",
      address: "Bandra West, Mumbai",
      lat: 19.0514,
      lng: 72.8296,
      totalBeds: 250,
      erCapacity: 60,
      currentPatients: 170,
      availableBeds: 80,
      avgWaitTime: 18,
      contactNumber: "02226751000",
      isActive: true,
    },
    {
      name: "Kokilaben Hospital",
      address: "Andheri West, Mumbai",
      lat: 19.1367,
      lng: 72.8331,
      totalBeds: 300,
      erCapacity: 75,
      currentPatients: 220,
      availableBeds: 80,
      avgWaitTime: 15,
      contactNumber: "02230999999",
      isActive: true,
    },
  ];

  for (const hospital of hospitals) {
    await prisma.hospital.upsert({
      where: {
        id: hospitals.indexOf(hospital) + 1,
      },
      update: {
        ...hospital,
        lastUpdated: new Date(),
      },
      create: {
        ...hospital,
        lastUpdated: new Date(),
      },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });