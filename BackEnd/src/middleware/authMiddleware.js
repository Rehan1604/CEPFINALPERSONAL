const prisma = require("../config/prisma");
const { assignHospital } = require("../services/loadbalancingService");

exports.createTriage = async (req, res) => {
    try {
        const { severity } = req.body;

        // 1. Create triage
        const triage = await prisma.triage.create({
            data: {
                severity,
                patientId: req.user.id
            }
        });

        // 2. Assign hospital
        const hospital = await assignHospital(severity);

        // 3. Update triage
        const updated = await prisma.triage.update({
            where: { id: triage.id },
            data: {
                hospitalId: hospital.id,
                status: "assigned"
            }
        });

        res.json({
            success: true,
            triage: updated,
            hospital
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};