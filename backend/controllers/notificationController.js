const Notification = require("../models/Notification");
const mongoose = require("mongoose"); 

console.log(" Notification Controller Loaded");

// ================== GET NOTIFICATIONS ==================
const getNotifications = async (req, res) => {
  try {
    console.log("📢 [Backend] getNotifications called");

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let notifications = [];
    try {
      const userIdString = req.user.id.toString();
      console.log(`🔍 Querying notifications for userId: ${userIdString}`);
      
      notifications = await Notification.find({ userId: userIdString })
        .sort({ createdAt: -1 })
        .lean();

      console.log(`📢 Found ${notifications.length} real notifications`);
    } catch (dbError) {
      console.error("❌ Database error, using fallback:", dbError.message);
      notifications = [
        {
          _id: "fallback1",
          userId: req.user.id,
          message: "⚠️ Could not load notifications. Check logs.",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    res.json({ notifications });

  } catch (error) {
    console.error("❌ [Backend] Critical error:", error.message);
    res.json({
      notifications: [
        {
          _id: "emergency1",
          userId: req.user?.id || "unknown",
          message: "⚠️ Service is running in emergency mode.",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ],
    });
  }
};

// ================== MARK AS READ  ==================
const markAsRead = async (req, res) => {
  try {
    console.log(`📢 [Backend] markAsRead called for ID: ${req.params.id}`);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notificationId = req.params.id;
    const userIdString = req.user.id.toString();

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      console.log(`⚠️ Invalid ObjectId: ${notificationId}`);
      return res.status(404).json({ message: "Notification not found (invalid ID)" });
    }

    const existingNotification = await Notification.findOne({
      _id: notificationId,
      userId: userIdString,
    });

    if (!existingNotification) {
      console.log(`⚠️ Notification ${notificationId} not found for this user`);
      return res.status(404).json({ message: "Notification not found" });
    }

    const notification = await Notification.findOneAndUpdate(
      {
        _id: notificationId,
        userId: userIdString,
      },
      { isRead: true },
      { new: true }
    );

    res.json({
      message: "Notification marked as read",
      notification,
    });

  } catch (error) {
    console.error("❌ [Backend] markAsRead error:", error.message);
    res.status(500).json({
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

// ================== MARK ALL AS READ ==================
const markAllAsRead = async (req, res) => {
  try {
    console.log("📢 [Backend] markAllAsRead called");

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userIdString = req.user.id.toString();

    const result = await Notification.updateMany(
      { userId: userIdString, isRead: false },
      { isRead: true }
    );

    res.json({
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });

  } catch (error) {
    console.error("❌ [Backend] markAllAsRead error:", error.message);
    res.status(500).json({
      message: "Failed to mark all notifications as read",
      error: error.message,
    });
  }
};

// ================== DELETE NOTIFICATION  ==================
const deleteNotification = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notificationId = req.params.id;
    const userIdString = req.user.id.toString();

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      console.log(`⚠️ Invalid ObjectId: ${notificationId}`);
      return res.status(404).json({ message: "Notification not found (invalid ID)" });
    }

    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      userId: userIdString,
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("❌ [Backend] deleteNotification error:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};