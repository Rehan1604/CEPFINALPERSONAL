const prisma = require("../config/prisma");

const assignHospital = async (severity) => {
    try {
        let hospital;

        // 🔴 High severity → least load (fastest)
        if (severity === "high") {
            hospital = await prisma.hospital.findFirst({
                where: {
                    currentLoad: {
                        lt: prisma.hospital.fields.capacity
                    }
                },
                orderBy: {
                    currentLoad: "asc"
                }
            });
        }

        // 🟡 Medium → balanced
        else if (severity === "medium") {
            hospital = await prisma.hospital.findFirst({
                where: {
                    currentLoad: {
                        lt: prisma.hospital.fields.capacity
                    }
                },
                orderBy: {
                    currentLoad: "asc"
                }
            });
        }

        // 🟢 Low → also least load (simple strategy)
        else {
            hospital = await prisma.hospital.findFirst({
                where: {
                    currentLoad: {
                        lt: prisma.hospital.fields.capacity
                    }
                },
                orderBy: {
                    currentLoad: "asc"
                }
            });
        }

        if (!hospital) {
            throw new Error("No hospitals available");
        }

        // ✅ Increment load (CRITICAL)
        await prisma.hospital.update({
            where: { id: hospital.id },
            data: {
                currentLoad: {
                    increment: 1
                }
            }
        });

        return hospital;

    } catch (error) {
        throw error;
    }
};

module.exports = { assignHospital };