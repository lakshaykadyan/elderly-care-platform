import { CheckCircle, Bell } from "lucide-react";

export default function NotificationCard({
  notification,
  handleRead,
  processing,
}) {
  return (
    <div
      className="booking-card"
      style={{
        borderLeft: notification.isRead
          ? "5px solid #999"
          : "5px solid #4CAF50",
        marginBottom: "20px",
        padding: "16px 20px",
        background: "var(--bg-body)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        transition: "all 0.3s ease",
      }}
    >
      <p style={{ color: "var(--text-primary)", fontSize: "15px", marginBottom: "8px" }}>
        {notification.message}
      </p>

      <p style={{ color: "var(--text-muted)", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
        <strong>Status :</strong>{" "}
        {notification.isRead ? (
          <>
            <CheckCircle size={14} style={{ color: "#22c55e" }} /> Read
          </>
        ) : (
          <>
            <Bell size={14} style={{ color: "#f59e0b" }} /> Unread
          </>
        )}
      </p>

      {!notification.isRead && (
        <button
          className="primary-btn"
          onClick={() => handleRead(notification._id)}
          disabled={processing}
          style={{
            marginTop: "10px",
            padding: "6px 20px",
            borderRadius: "30px",
            border: "none",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "#fff",
            fontWeight: "500",
            fontSize: "14px",
            cursor: processing ? "not-allowed" : "pointer",
            opacity: processing ? 0.6 : 1,
          }}
        >
          {processing ? "Updating..." : "Mark as Read"}
        </button>
      )}
    </div>
  );
}