export default function BookingRow({
  service,
  processing,
  editingId,
  editForm,
  setEditForm,
  handleUpdate,
  handleEdit,
  handleDelete,
  handleReview,
  reviewForm,
  setReviewForm,
}) {
  const statusColors = {
    pending: { bg: "#f59e0b", shadow: "rgba(245,158,11,0.3)", dot: "#fbbf24" },
    accepted: { bg: "#3b82f6", shadow: "rgba(59,130,246,0.3)", dot: "#60a5fa" },
    "in-progress": { bg: "#8b5cf6", shadow: "rgba(139,92,246,0.3)", dot: "#a78bfa" },
    completed: { bg: "#22c55e", shadow: "rgba(34,197,94,0.3)", dot: "#4ade80" },
    rejected: { bg: "#ef4444", shadow: "rgba(239,68,68,0.3)", dot: "#f87171" },
  };

  const statusLabels = {
    pending: "Pending",
    accepted: "Accepted",
    "in-progress": "In Progress",
    completed: "Completed",
    rejected: "Rejected",
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // ✅ Light/Dark mode compatible styles using CSS variables
  const cardStyle = {
    background: "var(--bg-card)",
    borderRadius: "24px",
    padding: "28px 30px 24px",
    marginBottom: "28px",
    border: "1px solid var(--border-color)",
    boxShadow: "0 8px 32px -8px rgba(0,0,0,0.1)",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    position: "relative",
    overflow: "hidden",
  };

  const detailGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "24px",
    padding: "20px 24px",
    background: "var(--bg-body)",
    borderRadius: "16px",
    border: "1px solid var(--border-color)",
  };

  const boxStyle = {
    padding: "16px 20px",
    background: "var(--bg-body)",
    borderRadius: "14px",
    borderLeft: "3px solid #4f46e5",
  };

  const greenBoxStyle = {
    ...boxStyle,
    borderLeft: "3px solid #22c55e",
  };

  const labelStyle = {
    color: "var(--text-muted)",
    fontSize: "11px",
    fontWeight: "600",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const valueStyle = {
    color: "var(--text-primary)",
    fontSize: "16px",
    fontWeight: "600",
  };

  const priceStyle = {
    ...valueStyle,
    fontSize: "18px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #4f46e5, #a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const editBtnStyle = {
    padding: "10px 28px",
    borderRadius: "40px",
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
  };

  const deleteBtnStyle = {
    padding: "10px 28px",
    borderRadius: "40px",
    border: "1px solid rgba(239,68,68,0.2)",
    background: "transparent",
    color: "#f87171",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <div style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
        e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--border-color)";
        e.currentTarget.style.boxShadow = "0 8px 32px -8px rgba(0,0,0,0.1)";
      }}
    >
      {/* Gradient Accent Line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #4f46e5, #a855f7, #ec4899, #4f46e5)",
        backgroundSize: "300% 100%",
        animation: "gradientMove 4s ease infinite",
      }} />

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "var(--text-primary)",
          margin: 0,
          letterSpacing: "-0.3px",
        }}>
          {service.serviceType || "Service"}
        </h2>

        {/* Status Badge with Pulsing Dot */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "6px 18px 6px 14px",
          borderRadius: "40px",
          background: `${statusColors[service.status]?.bg}15`,
          border: `1px solid ${statusColors[service.status]?.bg}30`,
          boxShadow: `0 0 20px ${statusColors[service.status]?.shadow}`,
        }}>
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: statusColors[service.status]?.dot || "#6b7280",
            animation: "pulse 1.8s ease-in-out infinite",
            boxShadow: `0 0 12px ${statusColors[service.status]?.dot}80`,
          }} />
          <span style={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "0.3px",
            textTransform: "uppercase",
          }}>
            {statusLabels[service.status] || service.status}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div style={detailGridStyle}>
        <div>
          <span style={labelStyle}>📅 Date</span>
          <span style={valueStyle}>{formatDate(service.bookingDate)}</span>
        </div>
        <div>
          <span style={labelStyle}>🕒 Time</span>
          <span style={valueStyle}>{service.bookingTime || "N/A"}</span>
        </div>
        <div>
          <span style={labelStyle}>⏳ Duration</span>
          <span style={valueStyle}>{service.duration || "N/A"}</span>
        </div>
        <div>
          <span style={labelStyle}>💰 Price</span>
          <span style={priceStyle}>₹ {service.price || 0}</span>
        </div>
      </div>

      {/* Description */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        <div style={boxStyle}>
          <h4 style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>📝 Description</h4>
          <p style={{ color: "var(--text-primary)", fontSize: "15px", lineHeight: "1.6", margin: 0 }}>
            {service.description && service.description !== "Description" && service.description !== "Description text goes here."
              ? service.description
              : "No description provided"}
          </p>
        </div>
        {service.careNotes && (
          <div style={greenBoxStyle}>
            <h4 style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>📋 Care Notes</h4>
            <p style={{ color: "var(--text-primary)", fontSize: "15px", lineHeight: "1.6", margin: 0 }}>
              {service.careNotes && service.careNotes !== "Care Notes" && service.careNotes !== "Care Notes text goes here."
                ? service.careNotes
                : "No care notes provided"}
            </p>
          </div>
        )}
      </div>

      {/* Rating */}
      {service.rating > 0 && (
        <div style={{
          padding: "14px 20px",
          background: "var(--bg-body)",
          borderRadius: "14px",
          marginBottom: "22px",
          borderLeft: "3px solid #f59e0b",
        }}>
          <h4 style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>⭐ Rating</h4>
          <p style={{ color: "var(--text-primary)", fontSize: "15px", fontWeight: "500", margin: 0 }}>
            {service.rating}/5 — {service.review || "No review text"}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        borderTop: "1px solid var(--border-color)",
        paddingTop: "20px",
      }}>
        <button
          style={editBtnStyle}
          disabled={processing}
          onClick={() => handleEdit(service)}
          onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 30px rgba(79,70,229,0.6)"; }}
          onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.35)"; }}
        >
          ✏️ Edit
        </button>
        <button
          style={deleteBtnStyle}
          disabled={processing}
          onClick={() => handleDelete(service._id)}
          onMouseEnter={(e) => { e.target.style.background = "#ef4444"; e.target.style.color = "#fff"; e.target.style.borderColor = "#ef4444"; e.target.style.boxShadow = "0 4px 14px rgba(239,68,68,0.3)"; }}
          onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#f87171"; e.target.style.borderColor = "rgba(239,68,68,0.2)"; e.target.style.boxShadow = "none"; }}
        >
          🗑 Delete
        </button>
      </div>

      {/* Edit Form */}
      {editingId === service._id && (
        <div style={{
          marginTop: "24px",
          padding: "24px",
          background: "var(--bg-body)",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
        }}>
          <input
            type="text"
            placeholder="Service Type"
            value={editForm.serviceType}
            onChange={(e) => setEditForm({ ...editForm, serviceType: e.target.value })}
            style={{
              width: "100%",
              marginBottom: "12px",
              padding: "12px 16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              color: "var(--text-primary)",
              fontSize: "15px",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.15)"; }}
          />
          <textarea
            placeholder="Description"
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            style={{
              width: "100%",
              marginBottom: "12px",
              padding: "12px 16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              color: "var(--text-primary)",
              fontSize: "15px",
              outline: "none",
              fontFamily: "inherit",
              resize: "vertical",
              minHeight: "80px",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.15)"; }}
          />
          <button
            style={{
              padding: "10px 28px",
              borderRadius: "40px",
              border: "none",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
            }}
            disabled={processing}
            onClick={handleUpdate}
            onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 25px rgba(34,197,94,0.5)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(34,197,94,0.35)"; }}
          >
            💾 Update Booking
          </button>
        </div>
      )}

      {/* Review Form */}
      {service.status === "completed" && service.rating === 0 && (
        <div style={{
          marginTop: "24px",
          padding: "24px",
          background: "var(--bg-body)",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
        }}>
          <h4 style={{ color: "var(--text-primary)", marginBottom: "12px", fontSize: "16px", fontWeight: "600" }}>⭐ Rate Caregiver</h4>
          <select
            value={reviewForm.rating}
            onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
            style={{
              width: "100%",
              marginBottom: "12px",
              padding: "12px 16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              color: "var(--text-primary)",
              fontSize: "15px",
              outline: "none",
            }}
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
          <textarea
            placeholder="Write your review..."
            value={reviewForm.review}
            onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
            style={{
              width: "100%",
              marginBottom: "12px",
              padding: "12px 16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              color: "var(--text-primary)",
              fontSize: "15px",
              outline: "none",
              fontFamily: "inherit",
              resize: "vertical",
              minHeight: "80px",
            }}
          />
          <button
            style={{
              padding: "10px 28px",
              borderRadius: "40px",
              border: "none",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
            }}
            disabled={processing}
            onClick={() => handleReview(service._id)}
            onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.35)"; }}
          >
            ⭐ Submit Review
          </button>
        </div>
      )}
    </div>
  );
}