import { Pie, Bar } from "react-chartjs-2";
import { PieChart, BarChart3 } from "lucide-react";

export default function AnalyticsCharts({ stats }) {
  const pieData = {
    labels: ["Completed", "Pending", "Accepted", "In Progress", "Rejected"],
    datasets: [{
      data: [stats.completedServices, stats.pendingServices, stats.acceptedServices, stats.inProgressServices, stats.rejectedServices],
      backgroundColor: ["#22c55e", "#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444"],
    }],
  };

  const barData = {
    labels: ["Users", "Active Users", "Caregivers", "Active Caregivers", "Verified", "Complaints"],
    datasets: [{
      label: "Overview",
      data: [stats.totalUsers, stats.activeUsers, stats.totalCaregivers, stats.activeCaregivers, stats.verifiedCaregivers, stats.totalComplaints],
      backgroundColor: ["#4f46e5", "#22c55e", "#f59e0b", "#06b6d4", "#8b5cf6", "#ef4444"],
    }],
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      marginBottom: "24px",
    }}>
      <div style={{
        background: "var(--bg-card)",
        padding: "24px 28px",
        borderRadius: "20px",
        border: "1px solid var(--border-color)",
      }}>
        <h3 style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <PieChart size={20} style={{ color: "var(--primary)" }} />
          Service Status
        </h3>
        <Pie data={pieData} />
      </div>
      <div style={{
        background: "var(--bg-card)",
        padding: "24px 28px",
        borderRadius: "20px",
        border: "1px solid var(--border-color)",
      }}>
        <h3 style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <BarChart3 size={20} style={{ color: "var(--primary)" }} />
          System Overview
        </h3>
        <Bar data={barData} />
      </div>
    </div>
  );
}