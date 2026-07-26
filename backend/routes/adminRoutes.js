console.log("✅ adminRoutes.js loaded");

const express = require("express");

const {
  getAllServices,
  updateServiceStatus,
  verifyCaregiver,
  assignCaregiver,
  getComplaints,
  updateComplaint,
  getAllCaregivers,  
  getAllUsers,
  toggleUserStatus,
  deleteUser,
  getAnalytics,
  getDashboardStats
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Admin Routes Working" });
});

router.get("/services", authMiddleware, adminMiddleware, getAllServices);
router.put("/service/:id/status", authMiddleware, adminMiddleware, updateServiceStatus);
router.put("/service/:serviceId/assign-caregiver", authMiddleware, adminMiddleware, assignCaregiver);

router.get("/caregivers", authMiddleware, adminMiddleware, getAllCaregivers);
router.put("/caregiver/:id/verify", authMiddleware, adminMiddleware, verifyCaregiver);

router.get("/complaints", authMiddleware, adminMiddleware, getComplaints);
router.put("/complaint/:id", authMiddleware, adminMiddleware, updateComplaint);

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.put("/user/:id/toggle-status", authMiddleware, adminMiddleware, toggleUserStatus);
router.delete("/user/:id", authMiddleware, adminMiddleware, deleteUser);

router.get("/dashboard",authMiddleware,adminMiddleware,getDashboardStats);
router.get("/analytics",authMiddleware,adminMiddleware,getAnalytics);

module.exports = router;
