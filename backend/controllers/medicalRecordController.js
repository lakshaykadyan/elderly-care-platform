const MedicalRecord = require("../models/MedicalRecord");

// ================= GET ALL RECORDS =================

const getMedicalRecords = async (req, res) => {

  try {

    const records = await MedicalRecord.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      message: "Medical records fetched successfully",
      records,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================= CREATE RECORD =================

const createMedicalRecord = async (req, res) => {

  try {

    const {
      title,
      fileUrl,
      fileType,
    } = req.body;

    if (!title || !fileUrl) {

      return res.status(400).json({
        message: "Title and File URL are required",
      });

    }

    const record = await MedicalRecord.create({

      userId: req.user.id,

      title,

      fileUrl,

      fileType,

    });

    res.status(201).json({

      message: "Medical record uploaded successfully",

      record,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================= DELETE RECORD =================

const deleteMedicalRecord = async (req, res) => {

  try {

    const record = await MedicalRecord.findById(req.params.id);

    if (!record) {

      return res.status(404).json({
        message: "Medical record not found",
      });

    }

    if (record.userId.toString() !== req.user.id) {

      return res.status(403).json({
        message: "Unauthorized",
      });

    }

    await MedicalRecord.findByIdAndDelete(req.params.id);

    res.json({
      message: "Medical record deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {

  getMedicalRecords,

  createMedicalRecord,

  deleteMedicalRecord,

};