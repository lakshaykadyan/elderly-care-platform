import {
  Users,
  Stethoscope,
  Calendar,
  AlertTriangle,
  UserCheck,
  BadgeCheck,
  Heart,
  FileCheck,
  Clock,
  CheckCircle,
  Loader,
  XCircle,
} from "lucide-react";

export default function AnalyticsCards({ stats }) {
  const cards = [
    { title: "Total Users", value: stats.totalUsers, icon: <Users size={20} />, color: "#4f46e5" },
    { title: "Caregivers", value: stats.totalCaregivers, icon: <Stethoscope size={20} />, color: "#22c55e" },
    { title: "Total Services", value: stats.totalServices, icon: <Calendar size={20} />, color: "#f59e0b" },
    { title: "Complaints", value: stats.totalComplaints, icon: <AlertTriangle size={20} />, color: "#ef4444" },
    { title: "Active Users", value: stats.activeUsers, icon: <UserCheck size={20} />, color: "#10b981" },
    { title: "Verified Caregivers", value: stats.verifiedCaregivers, icon: <BadgeCheck size={20} />, color: "#8b5cf6" },
    { title: "Active Caregivers", value: stats.activeCaregivers, icon: <Heart size={20} />, color: "#06b6d4" },
    { title: "Completed", value: stats.completedServices, icon: <FileCheck size={20} />, color: "#22c55e" },
    { title: "Pending", value: stats.pendingServices, icon: <Clock size={20} />, color: "#f59e0b" },
    { title: "Accepted", value: stats.acceptedServices, icon: <CheckCircle size={20} />, color: "#3b82f6" },
    { title: "In Progress", value: stats.inProgressServices, icon: <Loader size={20} />, color: "#8b5cf6" },
    { title: "Rejected", value: stats.rejectedServices, icon: <XCircle size={20} />, color: "#ef4444" },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px",
      marginBottom: "24px",
    }}>
      {cards.map((card, i) => (
        <div key={i} style={{
          background: "var(--bg-card)",
          padding: "18px 20px",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
          e.currentTarget.style.boxShadow = "0 12px 32px -8px rgba(0,0,0,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "var(--border-color)";
          e.currentTarget.style.boxShadow = "none";
        }}>
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: `${card.color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: card.color,
          }}>
            {card.icon}
          </div>
          <div>
            <span style={{ fontSize: "12px", fontWeight: "500", color: "var(--text-muted)", display: "block" }}>{card.title}</span>
            <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>{card.value}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}