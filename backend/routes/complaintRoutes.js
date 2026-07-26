const express = require("express");
const complaintController = require("../controllers/complaintController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();
console.log("COMPLAINT CONTROLLER LOADED:", complaintController);

router.post("/", authMiddleware, complaintController.createComplaint);
router.get("/", authMiddleware, complaintController.getMyComplaints);
// ================= ADMIN =================

router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  complaintController.getAllComplaints
);

router.put(
  "/:id/reply",
  authMiddleware,
  adminMiddleware,
  complaintController.replyComplaint
);

module.exports = router;