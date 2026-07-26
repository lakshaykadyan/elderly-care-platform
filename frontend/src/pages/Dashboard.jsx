import { useEffect, useState } from "react";
import { getDashboardStats } from "../hooks/useAdmin";

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

      <h1 style={{ marginBottom: "25px" }}>
        👑 Admin Dashboard
      </h1>

      <div className="stats-container">

        <div className="stat-card">
          <h3>👥 Users</h3>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="stat-card">
          <h3>🧑‍⚕️ Caregivers</h3>
          <h2>{stats.totalCaregivers}</h2>
        </div>

        <div className="stat-card">
          <h3>📅 Services</h3>
          <h2>{stats.totalServices}</h2>
        </div>

        <div className="stat-card">
          <h3>⚠ Complaints</h3>
          <h2>{stats.totalComplaints}</h2>
        </div>

      </div>

    </div>

  );

}