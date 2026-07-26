const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "caregiver"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    

    // ================== CAREGIVER FIELDS ==================
    caregiverProfile: {

      specialization: {
        type: String,
        default: "",
      },

      experience: {
        type: Number,
        default: 0,
      },

      qualification: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      gender: {
        type: String,
        default: "",
      },

      age: {
        type: Number,
        default: 0,
      },

      address: {
        type: String,
        default: "",
      },

      bio: {
        type: String,
        default: "",
      },

      serviceArea: {
        type: String,
        default: "",
      },

      availability: {
        type: String,
        default: "available",
      },

      verified: {
        type: Boolean,
        default: false,
      },

      rating: {
        type: Number,
        default: 0,
      },

      totalReviews: {
        type: Number,
        default: 0,
      },

    },
  },
  { timestamps: true }
);

//  Password auto-hash middleware (safety net)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password compare method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);