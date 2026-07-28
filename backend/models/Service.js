const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    serviceType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      default: null,
    },
    bookingTime: {
      type: String,
      default: "",
    },
    
    duration: {
      type: Number,
      default: 0,
    },
    durationValue: {
      type: Number,
      default: 1,
    },
    durationUnit: {
      type: String,
      enum: ['hours', 'days', 'weeks', 'months', 'years'],  
      default: 'hours',
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "in-progress", "completed", "rejected"],
      default: "pending",
    },
    careNotes: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
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