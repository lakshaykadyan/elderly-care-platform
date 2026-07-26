const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    const { serviceId, subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        message: "Subject and message are required",
      });
    }

    const complaint = await Complaint.create({
      userId: req.user.id,
      serviceId: serviceId || null,
      subject,
      message,
      status: "pending",
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      message: "My complaints fetched successfully",
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL COMPLAINTS (ADMIN) =================

const getAllComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      message: "All complaints fetched successfully",
      complaints,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================= ADMIN REPLY =================

const replyComplaint = async (req, res) => {

  try {

    const { adminReply, status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {

      return res.status(404).json({
        message: "Complaint not found",
      });

    }

    complaint.adminReply = adminReply;

    complaint.status = status || "resolved";

    await complaint.save();

    res.json({
      message: "Reply submitted successfully",
      complaint,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  replyComplaint,
};