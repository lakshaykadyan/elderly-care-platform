import {
  Calendar,
  Clock,
  Hourglass,
  DollarSign,
  FileText,
  Clipboard,
  Star,
  Edit,
  Trash2,
  Save,
} from "lucide-react";

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
    pending: "#f59e0b",
    accepted: "#3b82f6",
    "in-progress": "#8b5cf6",
    completed: "#22c55e",
    rejected: "#ef4444",
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
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDurationChange = (value) => {
    setEditForm({ ...editForm, duration: value });
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "20px",
        padding: "24px 28px",
        marginBottom: "24px",
        border: "1px solid var(--border-color)",
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.06)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
        e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--border-color)";
        e.currentTarget.style.boxShadow = "0 8px 24px -8px rgba(0,0,0,0.06)";
      }}
    >
      {/* Accent Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #4f46e5, #a855f7, #ec4899, #4f46e5)",
          backgroundSize: "300% 100%",
          animation: "gradientMove 4s ease infinite",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {service.serviceType}
        </h3>
        <span
          style={{
            padding: "6px 18px",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#fff",
            background: statusColors[service.status] || "#6b7280",
            boxShadow: `0 4px 12px ${statusColors[service.status] || "rgba(107,114,128,0.3)"}`,
          }}
        >
          {statusLabels[service.status] || service.status}
        </span>
      </div>

      {/* Details Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          padding: "16px 20px",
          background: "var(--bg-body)",
          borderRadius: "16px",
          marginBottom: "16px",
          border: "1px solid var(--border-color)",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              fontWeight: "600",
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "2px",
            }}
          >
            <Calendar size={12} style={{ display: "inline-block", marginRight: "4px" }} />
            Date
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "var(--text-primary)",
            }}
          >
            {formatDate(service.bookingDate)}
          </span>
        </div>
        <div>
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              fontWeight: "600",
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "2px",
            }}
          >
            <Clock size={12} style={{ display: "inline-block", marginRight: "4px" }} />
            Time
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "var(--text-primary)",
            }}
          >
            {service.bookingTime || "Not Set"}
          </span>
        </div>
        <div>
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              fontWeight: "600",
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "2px",
            }}
          >
            <Hourglass size={12} style={{ display: "inline-block", marginRight: "4px" }} />
            Duration
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "var(--text-primary)",
            }}
          >
            {service.duration || "Not Set"}
          </span>
        </div>
        <div>
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              fontWeight: "600",
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "2px",
            }}
          >
            <DollarSign size={12} style={{ display: "inline-block", marginRight: "4px" }} />
            Price
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#4f46e5",
            }}
          >
            ₹ {service.price || 0}
          </span>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          padding: "12px 16px",
          background: "var(--bg-body)",
          borderRadius: "12px",
          marginBottom: "14px",
          borderLeft: "3px solid #4f46e5",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: "600",
            color: "var(--text-muted)",
            display: "block",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          <FileText size={12} style={{ display: "inline-block", marginRight: "4px" }} />
          Description
        </span>
        <p
          style={{
            color: "var(--text-primary)",
            fontSize: "14px",
            lineHeight: "1.6",
            margin: "4px 0 0 0",
          }}
        >
          {service.description && service.description !== "Description" && service.description !== "Description text goes here."
            ? service.description
            : "No description provided"}
        </p>
      </div>

      {/* Care Notes */}
      {service.careNotes && (
        <div
          style={{
            padding: "12px 16px",
            background: "var(--bg-body)",
            borderRadius: "12px",
            marginBottom: "14px",
            borderLeft: "3px solid #22c55e",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "var(--text-muted)",
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            <Clipboard size={12} style={{ display: "inline-block", marginRight: "4px" }} />
            Care Notes
          </span>
          <p
            style={{
              color: "var(--text-primary)",
              fontSize: "14px",
              lineHeight: "1.6",
              margin: "4px 0 0 0",
            }}
          >
            {service.careNotes && service.careNotes !== "Care Notes" && service.careNotes !== "Care Notes text goes here."
              ? service.careNotes
              : "No care notes provided"}
          </p>
        </div>
      )}

      {/* Rating */}
      {service.rating > 0 && (
        <div
          style={{
            padding: "12px 16px",
            background: "var(--bg-body)",
            borderRadius: "12px",
            marginBottom: "20px",
            borderLeft: "3px solid #f59e0b",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "var(--text-muted)",
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            <Star size={12} style={{ display: "inline-block", marginRight: "4px" }} />
            {service.rating}/5
          </span>
          <p
            style={{
              color: "var(--text-primary)",
              fontSize: "14px",
              lineHeight: "1.6",
              margin: "4px 0 0 0",
            }}
          >
            {service.review}
          </p>
        </div>
      )}

      {/* Actions Buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          borderTop: "1px solid var(--border-color)",
          paddingTop: "16px",
          marginBottom: "16px",
        }}
      >
        <button
          style={{
            padding: "10px 24px",
            borderRadius: "30px",
            border: "none",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "#fff",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
          }}
          disabled={processing}
          onClick={() => handleEdit(service)}
          onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)"; }}
          onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.3)"; }}
        >
          <Edit size={16} style={{ display: "inline-block", marginRight: "6px" }} />
          Edit
        </button>
        <button
          style={{
            padding: "10px 24px",
            borderRadius: "30px",
            border: "1px solid rgba(239,68,68,0.2)",
            background: "transparent",
            color: "#f87171",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          disabled={processing}
          onClick={() => handleDelete(service._id)}
          onMouseEnter={(e) => { e.target.style.background = "#ef4444"; e.target.style.color = "#fff"; e.target.style.borderColor = "#ef4444"; }}
          onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#f87171"; e.target.style.borderColor = "rgba(239,68,68,0.2)"; }}
        >
          <Trash2 size={16} style={{ display: "inline-block", marginRight: "6px" }} />
          Delete
        </button>
      </div>

      {/* ============================ EDIT FORM ============================ */}
      {editingId === service._id && (
        <div
          style={{
            marginTop: "24px",
            padding: "24px",
            background: "var(--bg-body)",
            borderRadius: "16px",
            border: "1px solid var(--border-color)",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-secondary)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Service Type
            </label>
            <select
              value={editForm.serviceType}
              onChange={(e) => setEditForm({ ...editForm, serviceType: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                color: "var(--text-primary)",
                fontSize: "15px",
                outline: "none",
              }}
            >
              <option value="Home Nursing">Home Nursing</option>
              <option value="Elderly Attendant">Elderly Attendant</option>
              <option value="Physiotherapy">Physiotherapy</option>
              <option value="Post Hospital Care">Post Hospital Care</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--text-secondary)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Booking Date
              </label>
              <input
                type="date"
                value={editForm.bookingDate || ""}
                onChange={(e) => setEditForm({ ...editForm, bookingDate: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  color: "var(--text-primary)",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--text-secondary)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Booking Time
              </label>
              <input
                type="time"
                value={editForm.bookingTime || ""}
                onChange={(e) => setEditForm({ ...editForm, bookingTime: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  color: "var(--text-primary)",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--text-secondary)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Duration
              </label>
              <input
                type="text"
                placeholder="e.g., 2 Hours"
                value={editForm.duration || ""}
                onChange={(e) => handleDurationChange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  color: "var(--text-primary)",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--text-secondary)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Price (₹)
              </label>
              <input
                type="number"
                placeholder="1200"
                value={editForm.price || ""}
                disabled
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "var(--bg-body)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  color: "var(--text-primary)",
                  fontSize: "15px",
                  outline: "none",
                  cursor: "not-allowed",
                  opacity: 0.7,
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-secondary)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Description
            </label>
            <textarea
              placeholder="Describe your requirements..."
              value={editForm.description || ""}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              style={{
                width: "100%",
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
          </div>

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
            <Save size={16} style={{ display: "inline-block", marginRight: "6px" }} />
            Update Booking
          </button>
        </div>
      )}

      {/* Review Form (No Emoji Stars) */}
      {service.status === "completed" && service.rating === 0 && (
        <div
          style={{
            marginTop: "24px",
            padding: "20px",
            background: "var(--bg-body)",
            borderRadius: "16px",
            border: "1px solid var(--border-color)",
          }}
        >
          <h4
            style={{
              color: "var(--text-primary)",
              marginBottom: "12px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <Star size={16} style={{ display: "inline-block", marginRight: "6px" }} />
            Rate Caregiver
          </h4>
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
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
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
              boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
            }}
            disabled={processing}
            onClick={() => handleReview(service._id)}
            onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.3)"; }}
          >
            <Star size={16} style={{ display: "inline-block", marginRight: "6px" }} />
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
}