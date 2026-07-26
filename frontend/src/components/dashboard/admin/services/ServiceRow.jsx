export default function ServiceRow({
  service,
  caregivers,
  selectedCaregiver,
  setSelectedCaregiver,
  assignCaregiver,
  updateStatus,
}) {
  const statusColors = {
    pending: "#f59e0b",
    accepted: "#2563eb",
    "in-progress": "#9333ea",
    completed: "#16a34a",
    rejected: "#dc2626",
  };

  return (
    <>
      <style>{`
        [data-theme="dark"] .service-status-select,
        [data-theme="dark"] .service-assign-select {
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          color: #f8fafc !important;
        }
        [data-theme="dark"] .service-status-select option,
        [data-theme="dark"] .service-assign-select option {
          background: #0f172a !important;
          color: #f8fafc !important;
        }
        .service-status-select,
        .service-assign-select {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #0f172a !important;
          padding: 8px 12px !important;
          border-radius: 8px !important;
          outline: none !important;
          cursor: pointer !important;
          font-size: 13px !important;
          min-width: 120px !important;
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
        {/* ✅ Patient - Left Align */}
        <td style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", color: "var(--text-primary)" }}>
          {service.userId?.name || "-"}
        </td>

        {/* ✅ Service - Left Align */}
        <td style={{ padding: "12px 16px", textAlign: "left", color: "var(--text-primary)" }}>
          {service.serviceType}
        </td>

        {/* ✅ Status - Center Align */}
        <td style={{ padding: "12px 16px", textAlign: "center" }}>
          <span
            style={{
              background: statusColors[service.status],
              color: "#fff",
              padding: "4px 14px",
              borderRadius: "30px",
              fontSize: "12px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {service.status}
          </span>
        </td>

        {/* ✅ Caregiver - Left Align (with min-width for dropdown) */}
        <td style={{ padding: "12px 16px", textAlign: "left" }}>
          {service.caregiverId ? (
            <span style={{ color: "#22c55e", fontWeight: "600" }}>
              {service.caregiverId.name}
            </span>
          ) : (
            <select
              className="service-assign-select"
              value={selectedCaregiver[service._id] || ""}
              onChange={(e) =>
                setSelectedCaregiver({
                  ...selectedCaregiver,
                  [service._id]: e.target.value,
                })
              }
              style={{ minWidth: "130px" }}
            >
              <option value="">Select Caregiver</option>
              {caregivers.map((caregiver) => (
                <option key={caregiver._id} value={caregiver._id}>
                  {caregiver.name}
                </option>
              ))}
            </select>
          )}
        </td>

        {/* ✅ Assign - Center Align */}
        <td style={{ padding: "12px 16px", textAlign: "center" }}>
          {service.caregiverId ? (
            <span style={{ color: "#22c55e", fontWeight: "700" }}>✔ Assigned</span>
          ) : (
            <button
              onClick={() => assignCaregiver(service._id)}
              style={{
                padding: "6px 18px",
                borderRadius: "30px",
                border: "none",
                background: "#22c55e",
                color: "#fff",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Assign
            </button>
          )}
        </td>

        {/* ✅ Update Status - Center Align */}
        <td style={{ padding: "12px 16px", textAlign: "center" }}>
          <select
            className="service-status-select"
            value={service.status}
            onChange={(e) => updateStatus(service._id, e.target.value)}
            style={{ minWidth: "120px" }}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </td>
      </tr>
    </>
  );
}