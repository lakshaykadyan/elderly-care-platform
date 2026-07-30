import { User, Calendar, Stethoscope, Phone, MapPin, Loader, Save } from "lucide-react";

export default function ProfileForm({
  profile,
  setProfile,
  handleSave,
  saving,
}) {
  return (
    <div className="profile-form-wrapper">
      <style>{`
        .profile-form-wrapper .pf-input,
        .profile-form-wrapper .pf-textarea {
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

        .profile-form-wrapper .pf-input:focus,
        .profile-form-wrapper .pf-textarea:focus {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.10) !important;
        }

        .profile-form-wrapper .pf-label {
          display: block !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          letter-spacing: 0.3px !important;
          margin-bottom: 6px !important;
        }

        .profile-form-wrapper .pf-input,
        .profile-form-wrapper .pf-textarea {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #0f172a !important;
        }
        .profile-form-wrapper .pf-label {
          color: #475569 !important;
        }

        [data-theme="dark"] .profile-form-wrapper .pf-input,
        [data-theme="dark"] .profile-form-wrapper .pf-textarea {
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          color: #f8fafc !important;
        }
        [data-theme="dark"] .profile-form-wrapper .pf-label {
          color: #94a3b8 !important;
        }

        [data-theme="dark"] .profile-form-wrapper .pf-input::placeholder,
        [data-theme="dark"] .profile-form-wrapper .pf-textarea::placeholder {
          color: #64748b !important;
        }
      `}</style>

      {/* 2-Column Grid Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        marginBottom: "28px",
      }}>
        {/* Row 1: Name + Age */}
        <div>
          <label className="pf-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <User size={14} style={{ color: "var(--text-muted)" }} />
            Full Name
          </label>
          <input
            className="pf-input"
            type="text"
            placeholder="John Doe"
            value={profile.patientName}
            onChange={(e) => setProfile({ ...profile, patientName: e.target.value })}
          />
        </div>
        <div>
          <label className="pf-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Calendar size={14} style={{ color: "var(--text-muted)" }} />
            Age
          </label>
          <input
            className="pf-input"
            type="number"
            min="1"
            placeholder="60"
            value={profile.patientAge}
            onChange={(e) => setProfile({ ...profile, patientAge: e.target.value })}
          />
        </div>

        {/* Row 2: Condition + Emergency Contact */}
        <div>
          <label className="pf-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Stethoscope size={14} style={{ color: "var(--text-muted)" }} />
            Medical Condition
          </label>
          <input
            className="pf-input"
            type="text"
            placeholder="Alzheimer's, Diabetes"
            value={profile.medicalCondition}
            onChange={(e) => setProfile({ ...profile, medicalCondition: e.target.value })}
          />
        </div>
        <div>
          <label className="pf-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Phone size={14} style={{ color: "var(--text-muted)" }} />
            Emergency Contact
          </label>
          <input
            className="pf-input"
            type="text"
            placeholder="+91 9876543210"
            value={profile.emergencyContact}
            onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
          />
        </div>

        {/* Row 3: Address (Full Width) */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label className="pf-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <MapPin size={14} style={{ color: "var(--text-muted)" }} />
            Address
          </label>
          <textarea
            className="pf-textarea"
            rows="3"
            placeholder="123 Main Street, City, State"
            value={profile.patientAddress}
            onChange={(e) => setProfile({ ...profile, patientAddress: e.target.value })}
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
            cursor: saving ? "not-allowed" : "pointer",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
            opacity: saving ? 0.6 : 1,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => { if (!saving) { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)"; } }}
          onMouseLeave={(e) => { if (!saving) { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.3)"; } }}
        >
          {saving ? (
            <>
              <Loader size={18} className="spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Profile
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