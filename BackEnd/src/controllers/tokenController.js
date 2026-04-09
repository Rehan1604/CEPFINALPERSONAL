const prisma = require("../config/db");
const { sendNotification } = require("../services/notificationService");

// CREATE TOKEN
const createToken = async (req, res) => {
  try {
    const { patientName, patientAge, hospitalId, riskLevel } = req.body;

    const lastToken = await prisma.token.findFirst({
      where: { hospitalId },
      orderBy: { tokenNumber: "desc" },
    });

    const newTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;
    const estimatedTime = newTokenNumber * 10;

    const token = await prisma.token.create({
      data: {
        patientName,
        patientAge,
        hospitalId,
        riskLevel,
        tokenNumber: newTokenNumber,
        estimatedTime,
      },
    });

    // 🔔 SEND NOTIFICATION
    await sendNotification({
      type: "TOKEN_CREATED",
      payload: token,
    });

    res.status(201).json({
      success: true,
      message: "Token generated successfully",
      data: token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error generating token",
    });
  }
};


// GET TOKENS BY HOSPITAL
const getTokensByHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const tokens = await prisma.token.findMany({
      where: { hospitalId: parseInt(hospitalId) },
      orderBy: { tokenNumber: "asc" },
    });

    res.status(200).json({
      success: true,
      count: tokens.length,
      data: tokens,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching tokens",
    });
  }
};


// UPDATE TOKEN STATUS
const updateTokenStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingToken = await prisma.token.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingToken) {
      return res.status(404).json({
        success: false,
        message: "Token not found",
      });
    }

    const updatedToken = await prisma.token.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    // 🔔 SEND NOTIFICATION
    await sendNotification({
      type: "TOKEN_UPDATED",
      payload: updatedToken,
    });

    res.status(200).json({
      success: true,
      message: "Token updated successfully",
      data: updatedToken,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating token",
    });
  }
};


module.exports = {
  createToken,
  getTokensByHospital,
  updateTokenStatus,
};