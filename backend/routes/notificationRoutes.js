const express = require("express");

const router = express.Router();

const notificationController = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

// GET
router.get(
  "/",
  authMiddleware,
  notificationController.getNotifications
);

// IMPORTANT
router.put(
  "/read-all",
  authMiddleware,
  notificationController.markAllAsRead
);

router.put(
  "/:id/read",
  authMiddleware,
  notificationController.markAsRead
);

//DELETE
router.delete(
  "/:id",
  authMiddleware,
  notificationController.deleteNotification
);

module.exports = router;