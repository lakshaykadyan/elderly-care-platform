const PatientProfile = require("../models/PatientProfile");

// ================== CREATE / UPDATE PATIENT PROFILE ==================
const savePatientProfile = async (req, res) => {
  try {
    const {
      patientName,
      patientAge,
      medicalCondition,
      patientAddress,
      emergencyContact,
    } = req.body;

    if (
      !patientName ||
      !patientAge ||
      !medicalCondition ||
      !patientAddress ||
      !emergencyContact
    ) {
      return res.status(400).json({
        message: "All patient profile fields are required",
      });
    }

    const profile = await PatientProfile.findOneAndUpdate(
      { userId: req.user.id },
      {
        userId: req.user.id,
        patientName,
        patientAge,
        medicalCondition,
        patientAddress,
        emergencyContact,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      message: "Patient profile saved Successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================== GET PATIENT PROFILE ==================
const getPatientProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({
      userId: req.user.id,
    });

    res.json({
      message: "Patient profile fetched Successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  savePatientProfile,
  getPatientProfile,
};