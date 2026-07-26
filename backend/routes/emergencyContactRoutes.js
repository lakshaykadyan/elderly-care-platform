const express = require("express");

const emergencyContactController = require("../controllers/emergencyContactController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

console.log(
  "EMERGENCY CONTACT CONTROLLER LOADED:",
  emergencyContactController
);

// ================= GET =================

router.get(
  "/",
  authMiddleware,
  emergencyContactController.getContacts
);

// ================= CREATE =================

router.post(
  "/",
  authMiddleware,
  emergencyContactController.createContact
);

// ================= UPDATE =================

router.put(
  "/:id",
  authMiddleware,
  emergencyContactController.updateContact
);

// ================= DELETE =================

router.delete(
  "/:id",
  authMiddleware,
  emergencyContactController.deleteContact
);

module.exports = router;