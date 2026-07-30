import { Clock, CheckCircle, XCircle, RefreshCw, Mail } from "lucide-react";

export default function ComplaintCard({ complaint }) {
  const statusColors = {
    pending: { bg: "#f59e0b", text: "#fbbf24" },
    resolved: { bg: "#22c55e", text: "#4ade80" },
    rejected: { bg: "#ef4444", text: "#f87171" },
    processing: { bg: "#3b82f6", text: "#60a5fa" },
  };

  const statusIcons = {
    pending: <Clock size={14} style={{ display: "inline", marginRight: "4px" }} />,
    resolved: <CheckCircle size={14} style={{ display: "inline", marginRight: "4px" }} />,
    rejected: <XCircle size={14} style={{ display: "inline", marginRight: "4px" }} />,
    processing: <RefreshCw size={14} style={{ display: "inline", marginRight: "4px" }} />,
  };

  const statusLabels = {
    pending: "Pending",
    resolved: "Resolved",
    rejected: "Rejected",
    processing: "Processing",
  };

  const status = complaint.status || "pending";

  return (
    <div style={{
      background: "var(--bg-body)",
      borderRadius: "16px",
      padding: "20px 24px",
      marginBottom: "16px",
      border: "1px solid var(--border-color)",
      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
      e.currentTarget.style.transform = "translateX(4px)";
      e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.06)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--border-color)";
      e.currentTarget.style.transform = "translateX(0)";
      e.currentTarget.style.boxShadow = "none";
    }}>
      {/* Header: Subject + Status */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <h4 style={{
          fontSize: "17px",
          fontWeight: "600",
          color: "var(--text-primary)",
          margin: 0,
        }}>
          {complaint.subject}
        </h4>
        <span style={{
          padding: "4px 16px",
          borderRadius: "30px",
          fontSize: "13px",
          fontWeight: "600",
          background: `${statusColors[status]?.bg}15`,
          color: statusColors[status]?.text || "#94a3b8",
          border: `1px solid ${statusColors[status]?.bg}20`,
          display: "inline-flex",
          alignItems: "center",
        }}>
          {statusIcons[status]}
          {statusLabels[status] || status}
        </span>
      </div>

      {/* Message */}
      <div style={{
        padding: "12px 16px",
        background: "rgba(0,0,0,0.08)",
        borderRadius: "12px",
        marginBottom: "12px",
        borderLeft: `3px solid ${statusColors[status]?.bg || "#6b7280"}`,
      }}>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "15px",
          lineHeight: "1.6",
          margin: 0,
        }}>
          {complaint.message}
        </p>
      </div>

      {/* Admin Reply (if exists) */}
      {complaint.adminReply && (
        <div style={{
          padding: "12px 16px",
          background: "rgba(79,70,229,0.04)",
          borderRadius: "12px",
          border: "1px solid rgba(79,70,229,0.06)",
          marginTop: "4px",
        }}>
          <strong style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "4px",
          }}>
            <Mail size={14} />
            Admin Reply
          </strong>
          <p style={{
            color: "var(--text-primary)",
            fontSize: "15px",
            lineHeight: "1.6",
            margin: 0,
          }}>
            {complaint.adminReply}
          </p>
        </div>
      )}
    </div>
  );
}