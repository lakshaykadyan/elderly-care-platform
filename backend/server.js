require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const caregiverRoutes = require("./routes/caregiverRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const emergencyContactRoutes = require("./routes/emergencyContactRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Database connection
connectDB();

// ✅ CORS - Sabse pehle middleware (Order MATTERS!)
app.use(
  cors({
    origin: "https://elderly-care-platform-chi.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ JSON parser - CORS ke BAAD aana chahiye
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient-profile", profileRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/caregiver", caregiverRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/emergency-contacts", emergencyContactRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});