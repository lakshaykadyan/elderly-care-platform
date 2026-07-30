const Contact = require("../models/Contact");
const Notification = require("../models/Notification");
const User = require("../models/User");

// ================== SEND CONTACT MESSAGE ==================
const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({ name, email, message });

    // ✅ Notify all admins
    try {
      const admins = await User.find({ role: "admin" });
      if (admins.length > 0) {
        const notifications = admins.map((admin) => ({
          userId: admin._id,
          message: `New contact message from ${name} (${email})`,
          isRead: false,
        }));
        await Notification.insertMany(notifications);
      }
    } catch (notifError) {
      console.error("Failed to send admin notification:", notifError);
    }

    res.status(201).json({
      message: "Message sent successfully! We'll get back to you soon.",
      contact,
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================== GET ALL MESSAGES (ADMIN) ==================
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== MARK AS READ (ADMIN) ==================
const markAsRead = async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Marked as read", contact: message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  markAsRead,
};