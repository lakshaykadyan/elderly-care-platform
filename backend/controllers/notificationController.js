const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      message: "Notifications fetched successfully",
      notifications,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const markAsRead = async (req, res) => {
  try {

    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.json({
      message: "Notification marked as read",
      notification,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const markAllAsRead = async (req, res) => {
  try {

    await Notification.updateMany(
      {
        userId: req.user.id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.json({
      message: "All notifications marked as read",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE NOTIFICATION

const deleteNotification = async (req, res) => {
  try {

    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    await notification.deleteOne();

    res.json({
      message: "Notification deleted successfully",
    });

  } catch (error) {

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