import { useEffect, useState } from "react";
import { Users, Stethoscope, Calendar, AlertTriangle } from "lucide-react";
import { getDashboardStats } from "../../../hooks/useAdmin";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCaregivers: 0,
    totalServices: 0,
    totalComplaints: 0,
  });

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    { icon: <Users size={28} />, title: "Total Users", value: stats.totalUsers, color: "#4f46e5" },
    { icon: <Stethoscope size={28} />, title: "Caregivers", value: stats.totalCaregivers, color: "#22c55e" },
    { icon: <Calendar size={28} />, title: "Services", value: stats.totalServices, color: "#f59e0b" },
    { icon: <AlertTriangle size={28} />, title: "Complaints", value: stats.totalComplaints, color: "#ef4444" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "var(--text-primary)", margin: 0, letterSpacing: "-0.5px" }}>
          👑 Admin Dashboard
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", margin: "6px 0 0 0" }}>
          Welcome back! Here's today's overview.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }}>
        {cards.map((card, i) => (
          <div key={i} style={{
            background: "var(--bg-card)",
            padding: "24px 28px",
            borderRadius: "20px",
            border: "1px solid var(--border-color)",
            boxShadow: "0 8px 24px -8px rgba(0,0,0,0.06)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
            e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "0 8px 24px -8px rgba(0,0,0,0.06)";
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: `${card.color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: card.color,
              border: `1px solid ${card.color}10`,
            }}>
              {card.icon}
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: "500", color: "var(--text-muted)", margin: 0 }}>{card.title}</h3>
              <h1 style={{ fontSize: "32px", fontWeight: "700", color: "var(--text-primary)", margin: 0, letterSpacing: "-1px" }}>{card.value}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}