import { Wrench, Clock, Calendar, Clock as ClockIcon, FileText, Loader } from "lucide-react";

export default function RequestForm({
  form,
  setForm,
  handleSubmit,
  loading,
}) {
  return (
    <div className="request-form-wrapper">
      <style>{`
        .request-form-wrapper .rf-input,
        .request-form-wrapper .rf-select,
        .request-form-wrapper .rf-textarea {
          width: 100% !important;
          padding: 12px 16px !important;
          border-radius: 12px !important;
          font-size: 15px !important;
          font-family: inherit !important;
          outline: none !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box !important;
        }

        .request-form-wrapper .rf-textarea {
          resize: vertical !important;
          min-height: 100px !important;
        }

        .request-form-wrapper .rf-input:focus,
        .request-form-wrapper .rf-select:focus,
        .request-form-wrapper .rf-textarea:focus {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.10) !important;
        }

        .request-form-wrapper .rf-label {
          display: block !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          letter-spacing: 0.3px !important;
          margin-bottom: 6px !important;
        }

        .request-form-wrapper .rf-input,
        .request-form-wrapper .rf-select,
        .request-form-wrapper .rf-textarea {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #0f172a !important;
        }
        .request-form-wrapper .rf-label {
          color: #475569 !important;
        }

        [data-theme="dark"] .request-form-wrapper .rf-input,
        [data-theme="dark"] .request-form-wrapper .rf-select,
        [data-theme="dark"] .request-form-wrapper .rf-textarea {
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          color: #f8fafc !important;
        }
        [data-theme="dark"] .request-form-wrapper .rf-label {
          color: #94a3b8 !important;
        }

        [data-theme="dark"] .request-form-wrapper .rf-input::placeholder,
        [data-theme="dark"] .request-form-wrapper .rf-textarea::placeholder,
        [data-theme="dark"] .request-form-wrapper .rf-select {
          color: #64748b !important;
        }
      `}</style>

      {/* 2-Column Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        marginBottom: "28px",
      }}>
        {/* Row 1: Service Type + Duration */}
        <div>
          <label className="rf-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Wrench size={14} style={{ color: "var(--text-muted)" }} />
            Service Type
          </label>
          <select
            className="rf-select"
            value={form.serviceType}
            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
          >
            <option value="">Select Service</option>
            <option value="Home Nursing">Home Nursing</option>
            <option value="Elderly Attendant">Elderly Attendant</option>
            <option value="Physiotherapy">Physiotherapy</option>
            <option value="Post Hospital Care">Post Hospital Care</option>
          </select>
        </div>
        <div>
          <label className="rf-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Clock size={14} style={{ color: "var(--text-muted)" }} />
            Duration
          </label>
          <input
            className="rf-input"
            type="text"
            placeholder="e.g., 2 Hours"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
        </div>

        {/* Row 2: Date + Time */}
        <div>
          <label className="rf-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Calendar size={14} style={{ color: "var(--text-muted)" }} />
            Booking Date
          </label>
          <input
            className="rf-input"
            type="date"
            value={form.bookingDate}
            onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
          />
        </div>
        <div>
          <label className="rf-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ClockIcon size={14} style={{ color: "var(--text-muted)" }} />
            Booking Time
          </label>
          <input
            className="rf-input"
            type="time"
            value={form.bookingTime}
            onChange={(e) => setForm({ ...form, bookingTime: e.target.value })}
          />
        </div>

        {/* Row 3: Description (Full Width) */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label className="rf-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FileText size={14} style={{ color: "var(--text-muted)" }} />
            Description
          </label>
          <textarea
            className="rf-textarea"
            rows="4"
            placeholder="Describe your requirements in detail..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "12px 36px",
            borderRadius: "40px",
            border: "none",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
            opacity: loading ? 0.6 : 1,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => { if (!loading) { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)"; } }}
          onMouseLeave={(e) => { if (!loading) { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.3)"; } }}
        >
          {loading ? (
            <>
              <Loader size={18} className="spin" />
              Booking...
            </>
          ) : (
            <>
              <Calendar size={18} />
              Book Service
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}