const Notification = require("../models/Notification");

console.log("✅ Notification Controller Loaded");

// ================== GET NOTIFICATIONS (UPGRADED WITH DEBUG LOGS) ==================
const getNotifications = async (req, res) => {
  try {
    console.log("📢 [Backend] getNotifications called");

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let notifications = [];
    try {
      // ✅ 1. Type mismatch se bachne ke liye userId ko string mein convert karo
      const userIdString = req.user.id.toString();
      console.log(`🔍 Querying notifications for userId: ${userIdString}`);
      
      // ✅ 2. Collection name bhi log karo (taaki pata chale sahi collection hit ho rahi hai)
      console.log(`ℹ️ Notification collection name: ${Notification.collection.name}`);

      // ✅ 3. Actual database query (with lean() for faster response)
      notifications = await Notification.find({ userId: userIdString })
        .sort({ createdAt: -1 })
        .lean();

      console.log(`📢 Found ${notifications.length} real notifications`);
    } catch (dbError) {
      // ✅ 4. Ab error FULLY log hoga (message + stack trace)
      console.error("❌ DATABASE QUERY FAILED! Error:", dbError.message);
      console.error("📚 Full Error Stack:", dbError.stack);
      
      // Fallback (temporary)
      notifications = [
        {
          _id: "fallback1",
          userId: req.user.id,
          message: `⚠️ DB Error: ${dbError.message.substring(0, 50)}... (Check logs)`,
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

// ================== MARK AS READ ==================
const markAsRead = async (req, res) => {
  try {
    console.log(`📢 [Backend] markAsRead called for ID: ${req.params.id}`);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userIdString = req.user.id.toString();

    const existingNotification = await Notification.findOne({
      _id: req.params.id,
      userId: userIdString,
    });

    if (!existingNotification) {
      console.log(`⚠️ Notification ${req.params.id} not found`);
      return res.status(404).json({ message: "Notification not found" });
    }

    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
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

// ================== MARK AS READ  ==================
const markAsRead = async (req, res) => {
  try {
    console.log(`📢 [Backend] markAsRead called for ID: ${req.params.id}`);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notificationId = req.params.id;
    const userIdString = req.user.id.toString();

    // Check if ID is a valid MongoDB ObjectId
    const mongoose = require('mongoose');
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

// ================== DELETE NOTIFICATION  ==================
const deleteNotification = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notificationId = req.params.id;
    const userIdString = req.user.id.toString();

    // Check if ID is a valid MongoDB ObjectId
    const mongoose = require('mongoose');
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