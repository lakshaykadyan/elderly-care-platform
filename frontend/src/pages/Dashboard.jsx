import { useEffect, useState } from "react";
import { getDashboardStats } from "../hooks/useAdmin";
import { Users, Stethoscope, Calendar, AlertTriangle, Crown } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCaregivers: 0,
    totalServices: 0,
    totalComplaints: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      console.log("Dashboard Data :", data);
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "25px", display: "flex", alignItems: "center", gap: "10px" }}>
        <Crown size={28} style={{ color: "#f59e0b" }} />
        Admin Dashboard
      </h1>

      <div className="stats-container">
        <div className="stat-card">
          <h3 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Users size={20} /> Users
          </h3>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="stat-card">
          <h3 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Stethoscope size={20} /> Caregivers
          </h3>
          <h2>{stats.totalCaregivers}</h2>
        </div>

        <div className="stat-card">
          <h3 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Calendar size={20} /> Services
          </h3>
          <h2>{stats.totalServices}</h2>
        </div>

        <div className="stat-card">
          <h3 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <AlertTriangle size={20} style={{ color: "#ef4444" }} /> Complaints
          </h3>
          <h2>{stats.totalComplaints}</h2>
        </div>
      </div>
    </div>
  );
}