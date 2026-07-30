import { useEffect, useState } from "react";
import { getNotifications } from "../../../hooks/useNotification";
import { showSuccess, showError } from "../../../utils/toast";
import { Inbox, Bell, CheckSquare, BellOff, Loader } from "lucide-react";

export default function UserNotifications() {
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
        <div style={{
          fontSize: "32px",
          marginBottom: "12px",
          color: "var(--primary)",
          display: "flex",
          justifyContent: "center",
        }}>
          <Loader size={32} className="spin" />
        </div>
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
    }}>
      {/* Header */}
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
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <Inbox size={24} style={{ color: "var(--primary)" }} />
            My Notifications
          </h2>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            margin: "4px 0 0 0",
          }}>
            Stay updated with your latest alerts
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
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => { e.target.style.background = "rgba(99,102,241,0.15)"; e.target.style.borderColor = "rgba(99,102,241,0.3)"; }}
          onMouseLeave={(e) => { e.target.style.background = "rgba(99,102,241,0.08)"; e.target.style.borderColor = "rgba(99,102,241,0.15)"; }}
        >
          <CheckSquare size={16} />
          Mark All Read
        </button>
      </div>

      {/* List */}
      {notifications.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "var(--bg-body)",
          borderRadius: "20px",
          border: "2px dashed var(--border-color)",
        }}>
          <div style={{
            fontSize: "56px",
            marginBottom: "16px",
            color: "var(--text-muted)",
            display: "flex",
            justifyContent: "center",
          }}>
            <BellOff size={56} strokeWidth={1.5} />
          </div>
          <h3 style={{ color: "var(--text-primary)" }}>No notifications yet</h3>
          <p style={{ color: "var(--text-secondary)" }}>We'll notify you when something important happens.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {notifications.map((item) => (
            <div
              key={item._id}
              style={{
                padding: "16px 20px",
                background: item.isRead ? "var(--bg-body)" : "rgba(79,70,229,0.05)",
                borderRadius: "14px",
                borderLeft: item.isRead ? "3px solid var(--border-color)" : "3px solid #4f46e5",
                transition: "all 0.3s ease",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = item.isRead ? "var(--bg-body)" : "rgba(79,70,229,0.05)"; }}
            >
              <div>
                <p style={{ color: "var(--text-primary)", fontSize: "15px", margin: 0, fontWeight: item.isRead ? "400" : "500" }}>
                  {item.message || item.text || item.content || "No message"}
                </p>
                <span style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "4px", display: "block" }}>
                  {new Date(item.createdAt).toLocaleDateString()}
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