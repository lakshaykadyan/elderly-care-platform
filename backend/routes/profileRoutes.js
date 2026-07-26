const express = require("express");

const profileController = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

console.log("PROFILE CONTROLLER LOADED:", profileController);

router.post("/", authMiddleware, profileController.savePatientProfile);
router.get("/", authMiddleware, profileController.getPatientProfile);

module.exports = router;