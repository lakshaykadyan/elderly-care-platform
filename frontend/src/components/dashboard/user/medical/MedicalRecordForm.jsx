export default function MedicalRecordForm({
  form,
  setForm,
  handleUpload,
  uploading,
}) {
  return (
    <div>
      {/* 3-Column Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "18px",
        marginBottom: "20px",
      }}>
        <div>
          <label style={{
            display: "block",
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--text-secondary)",
            marginBottom: "6px",
            letterSpacing: "0.3px",
          }}>
            📄 Record Title
          </label>
          <input
            type="text"
            placeholder="Blood Report"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "var(--bg-body)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              color: "var(--text-primary)",
              fontSize: "15px",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
            onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
          />
        </div>
        <div>
          <label style={{
            display: "block",
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--text-secondary)",
            marginBottom: "6px",
            letterSpacing: "0.3px",
          }}>
            🔗 File URL
          </label>
          <input
            type="url"
            placeholder="https://..."
            value={form.fileUrl}
            onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "var(--bg-body)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              color: "var(--text-primary)",
              fontSize: "15px",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
            onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
          />
        </div>
        <div>
          <label style={{
            display: "block",
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--text-secondary)",
            marginBottom: "6px",
            letterSpacing: "0.3px",
          }}>
            📁 File Type
          </label>
          <select
            value={form.fileType}
            onChange={(e) => setForm({ ...form, fileType: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "var(--bg-body)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              color: "var(--text-primary)",
              fontSize: "15px",
              outline: "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
            onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
          >
            <option value="">Select Type</option>
            <option value="PDF">PDF</option>
            <option value="Image">Image</option>
            <option value="Document">Document</option>
          </select>
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          padding: "12px 32px",
          borderRadius: "40px",
          border: "none",
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          color: "#fff",
          fontWeight: "600",
          fontSize: "15px",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
          opacity: uploading ? 0.6 : 1,
        }}
        onMouseEnter={(e) => { if (!uploading) { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)"; } }}
        onMouseLeave={(e) => { if (!uploading) { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.3)"; } }}
      >
        {uploading ? "⏳ Uploading..." : "⬆ Upload Record"}
      </button>
    </div>
  );
}