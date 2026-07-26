const express = require("express");

const caregiverController = require("../controllers/caregiverController");

const authMiddleware = require("../middleware/authMiddleware");
const caregiverMiddleware = require("../middleware/caregiverMiddleware");

const router = express.Router();

console.log("CAREGIVER CONTROLLER LOADED:", caregiverController);

// ================= DASHBOARD =================

router.get(
  "/dashboard",
  authMiddleware,
  caregiverMiddleware,
  caregiverController.getDashboardStats
);

// ================= PROFILE =================

router.get(
  "/profile",
  authMiddleware,
  caregiverMiddleware,
  caregiverController.getCaregiverProfile
);

router.put(
  "/profile",
  authMiddleware,
  caregiverMiddleware,
  caregiverController.updateCaregiverProfile
);

// ================= AVAILABILITY =================

router.get(
  "/availability",
  authMiddleware,
  caregiverMiddleware,
  caregiverController.getAvailability
);

router.put(
  "/availability",
  authMiddleware,
  caregiverMiddleware,
  caregiverController.updateAvailability
);

// ================= SERVICES =================

router.get(
  "/services",
  authMiddleware,
  caregiverMiddleware,
  caregiverController.getAssignedServices
);

router.put(
  "/service/:id/status",
  authMiddleware,
  caregiverMiddleware,
  caregiverController.updateCaregiverServiceStatus
);

module.exports = router;