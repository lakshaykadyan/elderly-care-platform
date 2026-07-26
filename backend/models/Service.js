const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    // ================== USER ==================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ================== CAREGIVER ==================
    caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ================== SERVICE DETAILS ==================
    serviceType: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // ================== BOOKING ==================
    bookingDate: {
      type: Date,
      default: null,
    },

    bookingTime: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    // ================== STATUS ==================
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "in-progress",
        "completed",
        "rejected",
      ],
      default: "pending",
    },

    // ================== CARE NOTES ==================
    careNotes: {
      type: String,
      default: "",
    },

    // ================== PRICING ==================
    price: {
      type: Number,
      default: 0,
    },

    // ================== REVIEW ==================
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    review: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);