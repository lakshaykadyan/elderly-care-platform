import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";
import { 
  Calendar, 
  ClipboardList, 
  Home,
  User,
  Bell,
  AlertTriangle,
  ChevronRight,
  Stethoscope,
  Heart,
  Activity,
  Users,
} from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    completed: 0,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await API.get("/service");
      const data = res.data.services || [];
      setServices(data);
      
      // Calculate stats
      const total = data.length;
      const pending = data.filter(s => s.status === "pending").length;
      const accepted = data.filter(s => s.status === "accepted" || s.status === "in-progress").length;
      const completed = data.filter(s => s.status === "completed").length;
      setStats({ total, pending, accepted, completed });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const goToServiceDetail = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  const recentServices = services.slice(0, 4);

  // Quick action cards
  const quickCards = [
    { icon: <Calendar size={24} />, title: "Book Service", desc: "Request a new caregiver", action: "book", color: "#4f46e5" },
    { icon: <ClipboardList size={24} />, title: "My Bookings", desc: "View all your services", action: "bookings", color: "#22c55e" },
    { icon: <Bell size={24} />, title: "Notifications", desc: "Check updates", action: "notifications", color: "#f59e0b" },
    { icon: <AlertTriangle size={24} />, title: "Complaints", desc: "Raise an issue", action: "complaints", color: "#ef4444" },
  ];

  // Stats Cards
  const statsCards = [
    { title: "Total Services", value: stats.total, color: "#4f46e5" },
    { title: "Pending", value: stats.pending, color: "#f59e0b" },
    { title: "Active", value: stats.accepted, color: "#22c55e" },
    { title: "Completed", value: stats.completed, color: "#10b981" },
  ];

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        color: "var(--text-secondary)",
        fontSize: "16px",
      }}>
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div style={{ padding: "8px 4px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "var(--text-primary)",
          margin: 0,
          letterSpacing: "-0.5px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <Home size={28} style={{ color: "var(--primary)" }} />
          User Dashboard
        </h1>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "15px",
          margin: "6px 0 0 0",
        }}>
          Welcome back! Manage your services, notifications, and profile.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "32px",
      }}>
        {statsCards.map((card, i) => (
          <div key={i} style={{
            background: "var(--bg-card)",
            padding: "20px 24px",
            borderRadius: "16px",
            border: "1px solid var(--border-color)",
            transition: "all 0.3s ease",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
            e.currentTarget.style.boxShadow = "0 12px 32px -8px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <h3 style={{
              fontSize: "32px",
              fontWeight: "700",
              color: card.color,
              margin: 0,
              letterSpacing: "-1px",
            }}>
              {card.value}
            </h3>
            <span style={{
              color: "var(--text-muted)",
              fontSize: "14px",
              fontWeight: "500",
            }}>
              {card.title}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Action Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "32px",
      }}>
        {quickCards.map((card, i) => (
          <div key={i} style={{
            background: "var(--bg-card)",
            padding: "24px 28px",
            borderRadius: "20px",
            border: "1px solid var(--border-color)",
            boxShadow: "0 8px 24px -8px rgba(0,0,0,0.06)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
          onClick={() => {
            // Handle quick actions - navigate to respective pages
            if (card.action === "book") {
              // Navigate to booking page - implement routing accordingly
              window.dispatchEvent(new CustomEvent("user-page", { detail: "request" }));
            } else if (card.action === "bookings") {
              window.dispatchEvent(new CustomEvent("user-page", { detail: "bookings" }));
            } else if (card.action === "notifications") {
              window.dispatchEvent(new CustomEvent("user-page", { detail: "notifications" }));
            } else if (card.action === "complaints") {
              window.dispatchEvent(new CustomEvent("user-page", { detail: "complaints" }));
            }
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
              width: "48px",
              height: "48px",
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
              <h3 style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "var(--text-primary)",
                margin: 0,
              }}>
                {card.title}
              </h3>
              <span style={{
                color: "var(--text-muted)",
                fontSize: "13px",
              }}>
                {card.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Services - Clickable */}
      <div style={{
        background: "var(--bg-card)",
        padding: "24px 28px",
        borderRadius: "20px",
        border: "1px solid var(--border-color)",
        marginBottom: "32px",
      }}>
        <h2 style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "var(--text-primary)",
          margin: "0 0 16px 0",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <ClipboardList size={20} />
          Recent Services
        </h2>
        {recentServices.length === 0 ? (
          <p style={{
            color: "var(--text-muted)",
            fontSize: "15px",
            textAlign: "center",
            padding: "30px 0",
          }}>
            No services booked yet.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentServices.map((service, i) => (
              <div
                key={i}
                onClick={() => goToServiceDetail(service._id)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 18px",
                  background: "var(--bg-body)",
                  borderRadius: "14px",
                  border: "1px solid var(--border-color)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                  e.currentTarget.style.transform = "translateX(6px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(99,102,241,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  <h4 style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}>
                    {service.serviceType || "Service"}
                  </h4>
                  <span style={{
                    color: "var(--text-muted)",
                    fontSize: "13px",
                  }}>
                    {service.bookingDate ? new Date(service.bookingDate).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{
                    padding: "4px 14px",
                    borderRadius: "30px",
                    fontSize: "12px",
                    fontWeight: "600",
                    background: service.status === "completed" ? "rgba(34,197,94,0.08)" :
                               service.status === "in-progress" ? "rgba(139,92,246,0.08)" :
                               service.status === "accepted" ? "rgba(59,130,246,0.08)" :
                               service.status === "pending" ? "rgba(245,158,11,0.08)" :
                               "rgba(100,116,139,0.08)",
                    color: service.status === "completed" ? "#4ade80" :
                           service.status === "in-progress" ? "#a78bfa" :
                           service.status === "accepted" ? "#60a5fa" :
                           service.status === "pending" ? "#fbbf24" :
                           "#94a3b8",
                    border: `1px solid ${service.status === "completed" ? "rgba(34,197,94,0.08)" :
                            service.status === "in-progress" ? "rgba(139,92,246,0.08)" :
                            service.status === "accepted" ? "rgba(59,130,246,0.08)" :
                            service.status === "pending" ? "rgba(245,158,11,0.08)" :
                            "rgba(100,116,139,0.08)"}`,
                  }}>
                    {service.status || "Unknown"}
                  </span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}