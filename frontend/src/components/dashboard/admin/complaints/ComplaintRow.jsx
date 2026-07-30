import { CheckCircle, Check } from "lucide-react";

export default function ComplaintRow({
  complaint,
  reply,
  setReply,
  handleReply,
}) {
  const statusColor = {
    pending: "#f59e0b",
    resolved: "#16a34a",
    rejected: "#dc2626",
  };

  return (
    <>
      <style>{`
        [data-theme="dark"] .complaint-reply-textarea {
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          color: #f8fafc !important;
        }
        [data-theme="dark"] .complaint-reply-textarea::placeholder {
          color: #94a3b8 !important;
        }
        .complaint-reply-textarea {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #0f172a !important;
          padding: 8px 12px !important;
          border-radius: 8px !important;
          resize: none !important;
          width: 95% !important;
          min-width: 160px !important;
          font-family: inherit !important;
          outline: none !important;
          transition: all 0.3s ease !important;
        }
        .complaint-reply-textarea:focus {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79,70,229,0.08) !important;
        }
        .complaint-resolve-btn {
          padding: 6px 18px !important;
          border-radius: 30px !important;
          border: none !important;
          background: #22c55e !important;
          color: #fff !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }
        .complaint-resolve-btn:hover {
          transform: scale(1.04) !important;
        }
      `}</style>

      <tr
        style={{
          borderBottom: "1px solid var(--border-color)",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-card)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
      >
        <td style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", color: "var(--text-primary)" }}>
          {complaint.userId?.name || "-"}
        </td>

        <td style={{ padding: "12px 16px", textAlign: "left", color: "var(--text-primary)" }}>
          {complaint.subject}
        </td>

        <td style={{ padding: "12px 16px", textAlign: "left", maxWidth: "250px", color: "var(--text-secondary)" }}>
          {complaint.message}
        </td>

        <td style={{ padding: "12px 16px", textAlign: "center" }}>
          <span
            style={{
              background: statusColor[complaint.status] || "#6b7280",
              color: "#fff",
              padding: "4px 14px",
              borderRadius: "30px",
              fontSize: "12px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {complaint.status}
          </span>
        </td>

        <td style={{ padding: "12px 16px", textAlign: "left" }}>
          {complaint.status === "resolved" ? (
            <span style={{ color: "#22c55e", fontWeight: "600" }}>
              {complaint.adminReply}
            </span>
          ) : (
            <textarea
              className="complaint-reply-textarea"
              rows="3"
              placeholder="Write Reply..."
              value={reply[complaint._id] || ""}
              onChange={(e) =>
                setReply({
                  ...reply,
                  [complaint._id]: e.target.value,
                })
              }
            />
          )}
        </td>

        <td style={{ padding: "12px 16px", textAlign: "center" }}>
          {complaint.status === "resolved" ? (
            <span style={{ color: "#22c55e", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Check size={16} /> Done
            </span>
          ) : (
            <button
              className="complaint-resolve-btn"
              onClick={() => handleReply(complaint._id)}
              style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              <CheckCircle size={14} /> Resolve
            </button>
          )}
        </td>
      </tr>
    </>
  );
}