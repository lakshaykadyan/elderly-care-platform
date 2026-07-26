const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    patientName: {
      type: String,
      required: true,
    },

    patientAge: {
      type: Number,
      required: true,
    },

    medicalCondition: {
      type: String,
      required: true,
    },

    patientAddress: {
      type: String,
      required: true,
    },

    emergencyContact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PatientProfile', patientProfileSchema);