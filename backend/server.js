require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

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

//console.log("adminRoutes type:", typeof adminRoutes);
//console.log("authRoutes type:", typeof authRoutes);
//console.log("profileRoutes type:", typeof profileRoutes);
//console.log("serviceRoutes type:", typeof serviceRoutes);
//console.log("caregiverRoutes type:", typeof caregiverRoutes);
//console.log("complaintRoutes type:", typeof complaintRoutes);
//console.log("notificationRoutes type:", typeof notificationRoutes);

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
console.log("✅ Mounting admin routes...");
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
  console.log(`Server running on port ${PORT}`);
});