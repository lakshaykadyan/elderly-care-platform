import { useEffect, useState } from "react";
import API from "../../../services/api";
import AvailabilityCard from "./availability/AvailabilityCard";
import { showSuccess, showError } from "../../../utils/toast";

export default function Availability() {
  const [availability, setAvailability] = useState("available");

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    try {
      const res = await API.get("/caregiver/availability");
      if (res.data?.availability) {
        setAvailability(res.data.availability);
      } else if (res.data?.user?.caregiverProfile?.availability) {
        setAvailability(res.data.user.caregiverProfile.availability);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateAvailability = async (value) => {
    try {
      await API.put("/caregiver/availability", { availability: value });
      setAvailability(value);
      showSuccess(`Availability updated to ${value}`);
    } catch (err) {
      console.log(err);
      showError("Failed to update availability");
    }
  };

  return (
    <div style={{
      padding: "32px 28px",
      background: "var(--bg-card)",
      borderRadius: "24px",
      border: "1px solid var(--border-color)",
      boxShadow: "0 8px 32px -8px rgba(0,0,0,0.06)",
    }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{
          fontSize: "26px",
          fontWeight: "700",
          color: "var(--text-primary)",
          margin: 0,
          letterSpacing: "-0.5px",
        }}>
          🟢 Availability
        </h2>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "15px",
          margin: "6px 0 0 0",
        }}>
          Manage your availability status for service assignments
        </p>
      </div>

      <AvailabilityCard availability={availability} updateAvailability={updateAvailability} />
    </div>
  );
}