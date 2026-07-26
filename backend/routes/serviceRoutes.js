const express = require("express");

const serviceController = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

console.log("SERVICE CONTROLLER LOADED:", serviceController);

router.post("/", authMiddleware, serviceController.createService);
router.get("/", authMiddleware, serviceController.getUserServices);
router.put("/:id", authMiddleware, serviceController.updateService);
router.delete("/:id", authMiddleware, serviceController.deleteService);
router.put("/:id/review", authMiddleware, serviceController.submitServiceReview);

module.exports = router;