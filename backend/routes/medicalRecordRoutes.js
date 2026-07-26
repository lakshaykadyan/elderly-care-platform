const express = require("express");

const medicalRecordController = require("../controllers/medicalRecordController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

console.log("MEDICAL RECORD CONTROLLER LOADED:", medicalRecordController);

// ================= GET =================
router.get(
  "/",
  authMiddleware,
  medicalRecordController.getMedicalRecords
);

// ================= CREATE =================
router.post(
  "/",
  authMiddleware,
  medicalRecordController.createMedicalRecord
);

// ================= DELETE =================
router.delete(
  "/:id",
  authMiddleware,
  medicalRecordController.deleteMedicalRecord
);

module.exports = router;