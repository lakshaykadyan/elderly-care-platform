import { useEffect, useState } from "react";
import { getNotifications } from "../../../hooks/useNotification";
import { showSuccess, showError } from "../../../utils/toast";

export default function CaregiverNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error(error);
      showError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      // Yahan API call karna hai (placeholder)
      showSuccess("All notifications marked as read");
      loadNotifications();
    } catch (error) {
      showError("Failed to mark all as read");
    }
  };

  if (loading) {
    return (
      <div style={{
        padding: "60px 20px",
        textAlign: "center",
        background: "var(--bg-card)",
        borderRadius: "24px",
        border: "1px solid var(--border-color)",
      }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
        <p style={{ color: "var(--text-secondary)" }}>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: "32px 28px",
      background: "var(--bg-card)",
      borderRadius: "24px",
      border: "1px solid var(--border-color)",
      boxShadow: "0 8px 32px -8px rgba(0,0,0,0.06)",
    }}>
      
      {/* === HEADER: Title + Mark All Read === */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "28px",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div>
          <h2 style={{
            fontSize: "26px",
            fontWeight: "700",
            color: "var(--text-primary)",
            margin: 0,
            letterSpacing: "-0.5px",
          }}>
            🔔 Caregiver Notifications
          </h2>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            margin: "6px 0 0 0",
          }}>
            View all caregiver alerts and updates
          </p>
        </div>
        <button
          onClick={handleMarkAllRead}
          style={{
            padding: "8px 24px",
            borderRadius: "40px",
            border: "1px solid rgba(99,102,241,0.15)",
            background: "rgba(99,102,241,0.08)",
            color: "#a78bfa",
            fontWeight: "500",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => { e.target.style.background = "rgba(99,102,241,0.15)"; e.target.style.borderColor = "rgba(99,102,241,0.3)"; }}
          onMouseLeave={(e) => { e.target.style.background = "rgba(99,102,241,0.08)"; e.target.style.borderColor = "rgba(99,102,241,0.15)"; }}
        >
          ✅ Mark All Read
        </button>
      </div>

      {/* === NOTIFICATIONS LIST === */}
      {notifications.length === 0 ? (
        // ✅ PREMIUM EMPTY STATE - No more dull/odd look
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "var(--bg-body)",
          borderRadius: "20px",
          border: "2px dashed var(--border-color)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
          e.currentTarget.style.boxShadow = "0 8px 24px -8px rgba(0,0,0,0.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border-color)";
          e.currentTarget.style.boxShadow = "none";
        }}>
          <div style={{
            fontSize: "56px",
            marginBottom: "16px",
            display: "inline-block",
            background: "var(--bg-card)",
            padding: "20px",
            borderRadius: "50%",
            border: "2px dashed var(--border-color)",
          }}>
            🔕
          </div>
          <h4 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}>
            No notifications yet
          </h4>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            maxWidth: "400px",
            margin: "0 auto",
          }}>
            We'll notify you when something important happens.
          </p>
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}>
          {notifications.map((item) => (
            <div
              key={item._id}
              style={{
                padding: "16px 20px",
                background: item.isRead ? "var(--bg-body)" : "rgba(79,70,229,0.05)",
                borderRadius: "16px",
                borderLeft: item.isRead ? "4px solid var(--border-color)" : "4px solid #4f46e5",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-card)";
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = item.isRead ? "var(--bg-body)" : "rgba(79,70,229,0.05)";
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                }}>
                  <span style={{
                    fontSize: "18px",
                    color: "#4f46e5",
                  }}>
                    {item.icon || "🔔"}
                  </span>
                  <p style={{
                    color: "var(--text-primary)",
                    fontSize: "15px",
                    fontWeight: item.isRead ? "400" : "500",
                    margin: 0,
                  }}>
                    {item.message}
                  </p>
                </div>
                <span style={{
                  color: "var(--text-muted)",
                  fontSize: "12px",
                }}>
                  {new Date(item.createdAt).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <span style={{
                fontSize: "12px",
                fontWeight: "600",
                padding: "4px 14px",
                borderRadius: "30px",
                background: item.isRead ? "rgba(100,116,139,0.1)" : "rgba(34,197,94,0.1)",
                color: item.isRead ? "var(--text-muted)" : "#4ade80",
                border: `1px solid ${item.isRead ? "var(--border-color)" : "rgba(34,197,94,0.1)"}`,
                whiteSpace: "nowrap",
              }}>
                {item.isRead ? "Read" : "Unread"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}