const express = require("express");
const { submitEmergency, getEmergencies, resolveEmergency } = require("../controllers/emergencyController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", submitEmergency); // Public
router.get("/", auth, getEmergencies); // Admin only
router.put("/:id/resolve", auth, resolveEmergency); // Admin only

module.exports = router;