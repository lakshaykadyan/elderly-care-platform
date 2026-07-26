export default function ContactForm({
  form,
  setForm,
  handleSave,
  editingId,
  saving,
}) {
  return (
    <div className="contact-form-wrapper">
      <style>{`
        .contact-form-wrapper .cf-input,
        .contact-form-wrapper .cf-textarea {
          width: 100% !important;
          padding: 12px 16px !important;
          border-radius: 12px !important;
          font-size: 15px !important;
          font-family: inherit !important;
          outline: none !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box !important;
          resize: vertical !important;
        }

        .contact-form-wrapper .cf-textarea {
          min-height: 80px !important;
        }

        .contact-form-wrapper .cf-input:focus,
        .contact-form-wrapper .cf-textarea:focus {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.10) !important;
        }

        .contact-form-wrapper .cf-label {
          display: block !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          letter-spacing: 0.3px !important;
          margin-bottom: 6px !important;
        }

        /* --- LIGHT MODE --- */
        .contact-form-wrapper .cf-input,
        .contact-form-wrapper .cf-textarea {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #0f172a !important;
        }
        .contact-form-wrapper .cf-label {
          color: #475569 !important;
        }

        /* --- DARK MODE --- */
        [data-theme="dark"] .contact-form-wrapper .cf-input,
        [data-theme="dark"] .contact-form-wrapper .cf-textarea {
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          color: #f8fafc !important;
        }
        [data-theme="dark"] .contact-form-wrapper .cf-label {
          color: #94a3b8 !important;
        }

        [data-theme="dark"] .contact-form-wrapper .cf-input::placeholder,
        [data-theme="dark"] .contact-form-wrapper .cf-textarea::placeholder {
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
        <div>
          <label className="cf-label">👤 Full Name</label>
          <input
            className="cf-input"
            type="text"
            placeholder="Enter Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>
        <div>
          <label className="cf-label">❤️ Relationship</label>
          <input
            className="cf-input"
            type="text"
            placeholder="Father / Mother / Friend"
            value={form.relationship}
            onChange={(e) => setForm({ ...form, relationship: e.target.value })}
          />
        </div>
        <div>
          <label className="cf-label">📞 Phone Number</label>
          <input
            className="cf-input"
            type="tel"
            placeholder="9876543210"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
        </div>
        <div>
          <label className="cf-label">📍 Address</label>
          <textarea
            className="cf-textarea"
            rows="3"
            placeholder="Enter Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
      </div>

      {/* Save Button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSave}
          disabled={saving}
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
            opacity: saving ? 0.6 : 1,
          }}
          onMouseEnter={(e) => { if (!saving) { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)"; } }}
          onMouseLeave={(e) => { if (!saving) { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.3)"; } }}
        >
          {saving
            ? editingId
              ? "⏳ Updating..."
              : "⏳ Adding..."
            : editingId
            ? "✏️ Update Contact"
            : "➕ Add Contact"}
        </button>
      </div>
    </div>
  );
}