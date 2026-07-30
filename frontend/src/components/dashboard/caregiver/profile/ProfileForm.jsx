import {
  User,
  Mail,
  Phone,
  UserRound,
  Calendar,
  GraduationCap,
  Stethoscope,
  MapPin,
  Home,
  FileText,
  Loader,
  Save,
} from "lucide-react";

export default function ProfileForm({ profile, handleChange, saveProfile, saving }) {
  return (
    <div className="caregiver-profile-wrapper" style={{ background: "transparent" }}>
      <style>{`
        .caregiver-profile-wrapper .cp-input,
        .caregiver-profile-wrapper .cp-textarea,
        .caregiver-profile-wrapper .cp-select {
          width: 100% !important;
          padding: 12px 16px !important;
          border-radius: 12px !important;
          font-size: 15px !important;
          font-family: inherit !important;
          outline: none !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box !important;
        }
        .caregiver-profile-wrapper .cp-textarea {
          resize: vertical !important;
          min-height: 120px !important;
        }
        .caregiver-profile-wrapper .cp-input:focus,
        .caregiver-profile-wrapper .cp-textarea:focus {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79,70,229,0.10) !important;
        }
        .caregiver-profile-wrapper .cp-label {
          display: block !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          letter-spacing: 0.3px !important;
          margin-bottom: 6px !important;
        }

        .caregiver-profile-wrapper .cp-input,
        .caregiver-profile-wrapper .cp-textarea {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #0f172a !important;
        }
        .caregiver-profile-wrapper .cp-label {
          color: #475569 !important;
        }

        [data-theme="dark"] .caregiver-profile-wrapper .cp-input,
        [data-theme="dark"] .caregiver-profile-wrapper .cp-textarea {
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          color: #f8fafc !important;
        }
        [data-theme="dark"] .caregiver-profile-wrapper .cp-label {
          color: #94a3b8 !important;
        }
        [data-theme="dark"] .caregiver-profile-wrapper .cp-input::placeholder,
        [data-theme="dark"] .caregiver-profile-wrapper .cp-textarea::placeholder {
          color: #64748b !important;
        }

        [data-theme="dark"] .caregiver-profile-wrapper .cp-input:disabled {
          color: #94a3b8 !important;
          opacity: 0.8 !important;
        }

        .caregiver-profile-wrapper .cp-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 20px !important;
          margin-bottom: 24px !important;
        }
        @media (max-width: 600px) {
          .caregiver-profile-wrapper .cp-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Avatar + Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        marginBottom: "32px",
        paddingBottom: "20px",
        borderBottom: "1px solid var(--border-color)",
        flexWrap: "wrap",
      }}>
        <div style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          color: "#fff",
          boxShadow: "0 8px 24px rgba(79,70,229,0.3)",
        }}>
          <Stethoscope size={36} />
        </div>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>
            {profile.name || "Caregiver"}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", margin: "4px 0 0 0" }}>
            {profile.specialization || "Healthcare Professional"}
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <h3 style={{
        fontSize: "18px",
        fontWeight: "600",
        color: "var(--text-primary)",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <FileText size={18} style={{ color: "var(--primary)" }} />
        Personal Information
      </h3>

      <div className="cp-grid">
        <div>
          <label className="cp-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <User size={14} style={{ color: "var(--text-muted)" }} /> Full Name
          </label>
          <input className="cp-input" value={profile.name} disabled placeholder="Full Name" />
        </div>
        <div>
          <label className="cp-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Mail size={14} style={{ color: "var(--text-muted)" }} /> Email
          </label>
          <input className="cp-input" value={profile.email} disabled placeholder="Email" />
        </div>
        <div>
          <label className="cp-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Phone size={14} style={{ color: "var(--text-muted)" }} /> Phone
          </label>
          <input className="cp-input" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
        </div>
        <div>
          <label className="cp-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <UserRound size={14} style={{ color: "var(--text-muted)" }} /> Gender
          </label>
          <input className="cp-input" name="gender" value={profile.gender} onChange={handleChange} placeholder="Gender" />
        </div>
        <div>
          <label className="cp-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Calendar size={14} style={{ color: "var(--text-muted)" }} /> Age
          </label>
          <input className="cp-input" name="age" value={profile.age} onChange={handleChange} placeholder="Age" />
        </div>
        <div>
          <label className="cp-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <GraduationCap size={14} style={{ color: "var(--text-muted)" }} /> Qualification
          </label>
          <input className="cp-input" name="qualification" value={profile.qualification} onChange={handleChange} placeholder="Qualification" />
        </div>
        <div>
          <label className="cp-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Stethoscope size={14} style={{ color: "var(--text-muted)" }} /> Specialization
          </label>
          <input className="cp-input" name="specialization" value={profile.specialization} onChange={handleChange} placeholder="Specialization" />
        </div>
        <div>
          <label className="cp-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Calendar size={14} style={{ color: "var(--text-muted)" }} /> Experience (Years)
          </label>
          <input className="cp-input" name="experience" value={profile.experience} onChange={handleChange} placeholder="Experience" />
        </div>
        <div>
          <label className="cp-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={14} style={{ color: "var(--text-muted)" }} /> Service Area
          </label>
          <input className="cp-input" name="serviceArea" value={profile.serviceArea} onChange={handleChange} placeholder="Service Area" />
        </div>
        <div>
          <label className="cp-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Home size={14} style={{ color: "var(--text-muted)" }} /> Address
          </label>
          <input className="cp-input" name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
        </div>
      </div>

      {/* About Me */}
      <h3 style={{
        fontSize: "18px",
        fontWeight: "600",
        color: "var(--text-primary)",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <FileText size={18} style={{ color: "var(--primary)" }} />
        About Me
      </h3>
      <textarea
        className="cp-textarea"
        name="bio"
        rows="4"
        value={profile.bio}
        onChange={handleChange}
        placeholder="Write something about yourself..."
      />

      {/* Save Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
        <button
          onClick={saveProfile}
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
              Save Changes
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