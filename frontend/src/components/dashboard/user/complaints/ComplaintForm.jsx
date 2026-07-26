export default function ComplaintForm({
  form,
  setForm,
  handleSubmit,
  submitting,
}) {
  return (
    <div className="complaint-form-wrapper">
      <style>{`
        .complaint-form-wrapper .cf-input,
        .complaint-form-wrapper .cf-textarea {
          width: 100% !important;
          padding: 12px 16px !important;
          border-radius: 12px !important;
          font-size: 15px !important;
          font-family: inherit !important;
          outline: none !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box !important;
        }

        .complaint-form-wrapper .cf-textarea {
          resize: vertical !important;
          min-height: 120px !important;
        }

        .complaint-form-wrapper .cf-input:focus,
        .complaint-form-wrapper .cf-textarea:focus {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.10) !important;
        }

        .complaint-form-wrapper .cf-label {
          display: block !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          letter-spacing: 0.3px !important;
          margin-bottom: 6px !important;
        }

        /* --- LIGHT MODE --- */
        .complaint-form-wrapper .cf-input,
        .complaint-form-wrapper .cf-textarea {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #0f172a !important;
        }
        .complaint-form-wrapper .cf-label {
          color: #475569 !important;
        }

        /* --- DARK MODE --- */
        [data-theme="dark"] .complaint-form-wrapper .cf-input,
        [data-theme="dark"] .complaint-form-wrapper .cf-textarea {
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          color: #f8fafc !important;
        }
        [data-theme="dark"] .complaint-form-wrapper .cf-label {
          color: #94a3b8 !important;
        }

        [data-theme="dark"] .complaint-form-wrapper .cf-input::placeholder,
        [data-theme="dark"] .complaint-form-wrapper .cf-textarea::placeholder {
          color: #64748b !important;
        }
      `}</style>

      {/* 2-Column Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        marginBottom: "20px",
      }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label className="cf-label">📌 Subject</label>
          <input
            className="cf-input"
            type="text"
            placeholder="Enter complaint subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label className="cf-label">📝 Message</label>
          <textarea
            className="cf-textarea"
            rows="5"
            placeholder="Describe your complaint in detail..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            padding: "12px 36px",
            borderRadius: "40px",
            border: "none",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
            opacity: submitting ? 0.6 : 1,
          }}
          onMouseEnter={(e) => { if (!submitting) { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)"; } }}
          onMouseLeave={(e) => { if (!submitting) { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.3)"; } }}
        >
          {submitting ? "⏳ Submitting..." : "📤 Submit Complaint"}
        </button>
      </div>
    </div>
  );
}