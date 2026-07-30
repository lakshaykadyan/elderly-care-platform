import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";
import { showSuccess, showError } from "../../../utils/toast";
import {
  getAssignedServices,
  updateAvailability,
} from "../../../hooks/useCaregiver";
import {
  ClipboardList,
  Activity,
  CheckCircle,
  FileCheck,
  Star,
  DollarSign,
  BarChart3,
  LineChart,
  Bell,
  Home,
  Calendar,
  User,
  ChevronRight,
} from "lucide-react";

// ✅ Accept setActivePage prop for navigation
export default function CaregiverDashboard({ setActivePage }) {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState("available");
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    working: 0,
    accepted: 0,
    earnings: 0,
    averageRating: 0,
  });
  const [updatingAvailability, setUpdatingAvailability] = useState(false);

  const formatRating = (rating) => {
    const num = Number(rating);
    return isNaN(num) ? "0.0" : num.toFixed(1);
  };

  useEffect(() => {
    loadServices();
    loadAvailability();
    loadDashboardStats();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getAssignedServices();
      setServices(data.services || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadAvailability = async () => {
    try {
      const res = await API.get("/caregiver/availability");
      setAvailability(res.data.availability);
    } catch (err) {
      console.log(err);
    }
  };

  const loadDashboardStats = async () => {
    try {
      const res = await API.get("/caregiver/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Optimistic availability update (instant UI change)
  const changeAvailability = async (status) => {
    setAvailability(status);
    setUpdatingAvailability(true);

    try {
      const data = await updateAvailability(status);
      showSuccess(data.message || `Availability updated to ${status}`);
    } catch (err) {
      console.log(err);
      await loadAvailability();
      showError("Failed to update availability");
    } finally {
      setUpdatingAvailability(false);
    }
  };

  const goToServiceDetail = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  // ✅ Quick action handler using setActivePage prop
  const handleQuickAction = (page) => {
    if (setActivePage) {
      setActivePage(page);
    }
  };

  const recentServices = [...services]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const weeklyData = [
    { day: "Mon", services: 2 },
    { day: "Tue", services: 5 },
    { day: "Wed", services: 3 },
    { day: "Thu", services: 4 },
    { day: "Fri", services: 1 },
    { day: "Sat", services: 6 },
    { day: "Sun", services: 2 },
  ];

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const todayVisits = stats.accepted + stats.working;

  const statusColors = {
    available: { bg: "#22c55e", text: "#4ade80" },
    busy: { bg: "#f59e0b", text: "#fbbf24" },
    offline: { bg: "#ef4444", text: "#f87171" },
  };

  const statsCards = [
    { 
      icon: <ClipboardList size={28} />, 
      title: "Assigned", 
      value: stats.total, 
      color: "#4f46e5",
      page: "services" 
    },
    { 
      icon: <Activity size={28} />, 
      title: "Working", 
      value: stats.working, 
      color: "#f59e0b",
      page: "services" 
    },
    { 
      icon: <CheckCircle size={28} />, 
      title: "Accepted", 
      value: stats.accepted, 
      color: "#22c55e",
      page: "services" 
    },
    { 
      icon: <FileCheck size={28} />, 
      title: "Completed", 
      value: stats.completed, 
      color: "#10b981",
      page: "services" 
    },
    { 
      icon: <Star size={28} />, 
      title: "Rating", 
      value: formatRating(stats.averageRating), 
      color: "#f59e0b",
      page: "profile" 
    },
    { 
      icon: <DollarSign size={28} />, 
      title: "Earnings", 
      value: `₹${stats.earnings}`, 
      color: "#8b5cf6",
      page: null 
    },
  ];

  return (
    <div className="caregiver-dashboard-wrapper">
      <style>{`
        .caregiver-dashboard-wrapper .stats-card-clickable {
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .caregiver-dashboard-wrapper .stats-card-clickable:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(99, 102, 241, 0.3) !important;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3) !important;
        }
        .caregiver-dashboard-wrapper .quick-btn {
          padding: 10px 28px !important;
          border-radius: 40px !important;
          border: none !important;
          background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
          color: #fff !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          cursor: pointer !important;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3) !important;
        }
        .caregiver-dashboard-wrapper .quick-btn:hover {
          transform: scale(1.04) !important;
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.5) !important;
        }
        .caregiver-dashboard-wrapper .status-btn {
          padding: 10px 28px !important;
          border-radius: 40px !important;
          border: none !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          cursor: pointer !important;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .caregiver-dashboard-wrapper .status-btn:hover {
          transform: scale(1.04) !important;
        }
        .caregiver-dashboard-wrapper .service-clickable {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .caregiver-dashboard-wrapper .service-clickable:hover {
          border-color: rgba(99, 102, 241, 0.3) !important;
          transform: translateX(6px) !important;
          box-shadow: 0 8px 24px -6px rgba(99, 102, 241, 0.15) !important;
        }
        .caregiver-dashboard-wrapper .stats-grid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 20px !important;
          margin-top: 24px !important;
          margin-bottom: 32px !important;
        }
        .caregiver-dashboard-wrapper .status-buttons {
          display: flex !important;
          gap: 12px !important;
          flex-wrap: wrap !important;
          margin-top: 16px !important;
        }
        .caregiver-dashboard-wrapper .quick-actions {
          display: flex !important;
          gap: 12px !important;
          flex-wrap: wrap !important;
          margin-top: 16px !important;
        }
        @media (max-width: 768px) {
          .caregiver-dashboard-wrapper .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .caregiver-dashboard-wrapper .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .caregiver-dashboard-wrapper .status-buttons {
            flex-direction: column !important;
          }
          .caregiver-dashboard-wrapper .quick-actions {
            flex-direction: column !important;
          }
          .caregiver-dashboard-wrapper .quick-actions button {
            width: 100% !important;
          }
        }
      `}</style>

      <div style={{ padding: "8px 4px" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "var(--text-primary)",
            margin: 0,
            letterSpacing: "-0.5px",
          }}>
            <Home size={24} style={{ display: "inline-block", marginRight: "8px" }} />
            Caregiver Dashboard
          </h1>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            margin: "6px 0 0 0",
          }}>
            Manage your assigned services, availability and performance.
          </p>
        </div>

        {/* Stats Grid - Clickable */}
        <div className="stats-grid">
          {statsCards.map((card, i) => {
            const isClickable = card.page && card.page !== "dashboard";
            return (
              <div 
                key={i} 
                className={`stats-card ${isClickable ? 'stats-card-clickable' : ''}`}
                onClick={() => {
                  if (isClickable && setActivePage) {
                    setActivePage(card.page);
                  }
                }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "20px",
                  padding: "24px 28px",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  cursor: isClickable ? "pointer" : "default",
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div>
                    <span style={{
                      color: "var(--text-muted)",
                      fontSize: "13px",
                      fontWeight: "500",
                      display: "block",
                      marginBottom: "4px",
                    }}>
                      {card.title}
                    </span>
                    <h3 style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "var(--text-primary)",
                      margin: 0,
                      letterSpacing: "-0.5px",
                    }}>
                      {card.value}
                    </h3>
                  </div>
                  <div style={{
                    background: `rgba(79,70,229,0.08)`,
                    padding: "10px 12px",
                    borderRadius: "14px",
                    border: `1px solid rgba(79,70,229,0.04)`,
                    color: card.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {card.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Summary */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "32px",
        }}>
          {[
            { label: "Completion Rate", value: `${completionRate}%`, color: "#4f46e5" },
            { label: "Rating", value: formatRating(stats.averageRating), color: "#f59e0b" },
            { label: "Earnings", value: `₹${stats.earnings}`, color: "#22c55e" },
            { label: "Today Visits", value: todayVisits, color: "#8b5cf6" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "var(--bg-card)",
              padding: "18px 20px",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              textAlign: "center",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 32px -8px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <span style={{
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: "500",
                display: "block",
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
              }}>
                {item.label}
              </span>
              <h4 style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "var(--text-primary)",
                margin: 0,
              }}>
                {item.value}
              </h4>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "32px",
        }}>
          <div style={{
            background: "var(--bg-card)",
            padding: "24px 28px",
            borderRadius: "20px",
            border: "1px solid var(--border-color)",
          }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}>
              <BarChart3 size={18} style={{ display: "inline-block", marginRight: "6px" }} />
              Weekly Services
            </h3>
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              height: "140px",
              gap: "8px",
            }}>
              {weeklyData.map((day, i) => (
                <div key={i} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}>
                  <div style={{
                    width: "100%",
                    height: `${Math.max(10, (day.services / 8) * 120)}px`,
                    background: "linear-gradient(180deg, #4f46e5, #7c3aed)",
                    borderRadius: "6px 6px 0 0",
                    minHeight: "10px",
                    transition: "height 0.3s ease",
                  }} />
                  <span style={{
                    color: "var(--text-muted)",
                    fontSize: "11px",
                    marginTop: "6px",
                    fontWeight: "500",
                  }}>
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: "var(--bg-card)",
            padding: "24px 28px",
            borderRadius: "20px",
            border: "1px solid var(--border-color)",
          }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}>
              <LineChart size={18} style={{ display: "inline-block", marginRight: "6px" }} />
              Service Status
            </h3>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
              {[
                { label: "Assigned", value: stats.total, color: "#4f46e5" },
                { label: "Accepted", value: stats.accepted, color: "#22c55e" },
                { label: "Working", value: stats.working, color: "#f59e0b" },
                { label: "Completed", value: stats.completed, color: "#10b981" },
              ].map((item, i) => {
                const maxVal = Math.max(stats.total, 1);
                const percentage = Math.round((item.value / maxVal) * 100);
                return (
                  <div key={i}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                    }}>
                      <span style={{
                        color: "var(--text-muted)",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}>
                        {item.label}
                      </span>
                      <span style={{
                        color: "var(--text-primary)",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}>
                        {item.value}
                      </span>
                    </div>
                    <div style={{
                      width: "100%",
                      height: "6px",
                      background: "var(--bg-body)",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background: item.color,
                        borderRadius: "10px",
                        transition: "width 0.6s ease",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Availability - Optimistic Update */}
        <div className="availability-card" style={{
          background: "var(--bg-card)",
          padding: "24px 28px",
          borderRadius: "20px",
          border: "1px solid var(--border-color)",
          marginTop: "30px",
        }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "var(--text-primary)",
            margin: 0,
          }}>
            <Activity size={18} style={{ display: "inline-block", marginRight: "6px" }} />
            Availability
          </h2>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            margin: "8px 0 0 0",
          }}>
            Current Status:{' '}
            <b style={{
              color: statusColors[availability]?.text || "#94a3b8",
            }}>
              {availability.charAt(0).toUpperCase() + availability.slice(1)}
            </b>
            {updatingAvailability && <span style={{ marginLeft: "8px", fontSize: "13px", color: "var(--text-muted)" }}> (Updating...)</span>}
          </p>
          <div className="status-buttons">
            <button
              className="status-btn"
              style={{
                background: availability === "available" ? "#22c55e" : "rgba(34,197,94,0.08)",
                color: availability === "available" ? "#fff" : "#4ade80",
                border: availability === "available" ? "none" : "1px solid rgba(34,197,94,0.15)",
              }}
              onClick={() => changeAvailability("available")}
              disabled={updatingAvailability}
            >
              Available
            </button>
            <button
              className="status-btn"
              style={{
                background: availability === "busy" ? "#f59e0b" : "rgba(245,158,11,0.08)",
                color: availability === "busy" ? "#fff" : "#fbbf24",
                border: availability === "busy" ? "none" : "1px solid rgba(245,158,11,0.15)",
              }}
              onClick={() => changeAvailability("busy")}
              disabled={updatingAvailability}
            >
              Busy
            </button>
            <button
              className="status-btn"
              style={{
                background: availability === "offline" ? "#ef4444" : "rgba(239,68,68,0.08)",
                color: availability === "offline" ? "#fff" : "#f87171",
                border: availability === "offline" ? "none" : "1px solid rgba(239,68,68,0.15)",
              }}
              onClick={() => changeAvailability("offline")}
              disabled={updatingAvailability}
            >
              Offline
            </button>
          </div>
        </div>

        {/* Recent Services */}
        <div className="recent-card" style={{
          background: "var(--bg-card)",
          padding: "24px 28px",
          borderRadius: "20px",
          border: "1px solid var(--border-color)",
          marginTop: "30px",
        }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "var(--text-primary)",
            margin: "0 0 16px 0",
          }}>
            <ClipboardList size={18} style={{ display: "inline-block", marginRight: "6px" }} />
            Recent Assigned Services
          </h2>
          {recentServices.length === 0 ? (
            <p style={{
              color: "var(--text-muted)",
              fontSize: "15px",
              textAlign: "center",
              padding: "30px 0",
            }}>
              No recent services assigned.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentServices.slice(0, 4).map((service, i) => (
                <div
                  key={i}
                  className="service-clickable"
                  onClick={() => goToServiceDetail(service._id)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 18px",
                    background: "var(--bg-body)",
                    borderRadius: "14px",
                    border: "1px solid var(--border-color)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
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

        {/* Today's Schedule */}
        <div className="recent-card" style={{
          background: "var(--bg-card)",
          padding: "24px 28px",
          borderRadius: "20px",
          border: "1px solid var(--border-color)",
          marginTop: "30px",
        }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "var(--text-primary)",
            margin: "0 0 16px 0",
          }}>
            <Calendar size={18} style={{ display: "inline-block", marginRight: "6px" }} />
            Today's Schedule
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}>
            {[
              { time: "09:00 AM", title: "Morning Check-up", patient: "Rajesh K." },
              { time: "11:30 AM", title: "Medication Reminder", patient: "Suman P." },
              { time: "02:00 PM", title: "Physiotherapy", patient: "Anita M." },
              { time: "04:30 PM", title: "Evening Visit", patient: "Vikram S." },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "14px 18px",
                background: "var(--bg-body)",
                borderRadius: "14px",
                border: "1px solid var(--border-color)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#4f46e5",
                  marginBottom: "4px",
                }}>
                  {item.time}
                </div>
                <h4 style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  margin: 0,
                }}>
                  {item.title}
                </h4>
                <span style={{
                  color: "var(--text-muted)",
                  fontSize: "13px",
                }}>
                  <User size={12} style={{ display: "inline-block", marginRight: "4px" }} />
                  {item.patient}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Fixed */}
        <div className="action-card" style={{
          background: "var(--bg-card)",
          padding: "24px 28px",
          borderRadius: "20px",
          border: "1px solid var(--border-color)",
          marginTop: "30px",
        }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "var(--text-primary)",
            margin: 0,
          }}>
            <Bell size={18} style={{ display: "inline-block", marginRight: "6px" }} />
            Quick Actions
          </h2>
          <div className="quick-actions">
            <button
              className="quick-btn"
              onClick={() => handleQuickAction("services")}
            >
              <ClipboardList size={16} style={{ display: "inline-block", marginRight: "6px" }} />
              Assigned Services
            </button>
            <button
              className="quick-btn"
              onClick={() => handleQuickAction("availability")}
            >
              <Activity size={16} style={{ display: "inline-block", marginRight: "6px" }} />
              Availability
            </button>
            <button
              className="quick-btn"
              onClick={() => handleQuickAction("notifications")}
            >
              <Bell size={16} style={{ display: "inline-block", marginRight: "6px" }} />
              Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}