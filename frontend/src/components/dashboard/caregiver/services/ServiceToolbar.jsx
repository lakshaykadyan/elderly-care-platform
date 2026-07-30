import { Search } from "lucide-react";

export default function ServiceToolbar({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
}) {
  return (
    <>
      <style>{`
        [data-theme="dark"] .toolbar-input,
        [data-theme="dark"] .toolbar-select {
          background: #0f172a !important;
          border-color: #334155 !important;
          color: #f8fafc !important;
        }
        [data-theme="dark"] .toolbar-input::placeholder {
          color: #94a3b8 !important;
        }
        [data-theme="dark"] .toolbar-select option {
          background: #0f172a !important;
          color: #f8fafc !important;
        }
      `}</style>

      <div style={{
        display: "flex",
        gap: "16px",
        marginBottom: "24px",
        flexWrap: "wrap",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          minWidth: "260px",
          background: "var(--bg-body)",
          borderRadius: "12px",
          border: "1px solid var(--border-color)",
          padding: "0 12px",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#4f46e5"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <Search size={18} color="var(--text-muted)" />
          <input
            className="toolbar-input"
            type="text"
            placeholder="Search Patient / Email / Phone / Service"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 10px",
              border: "none",
              background: "transparent",
              color: "var(--text-primary)",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </div>
        <select
          className="toolbar-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            background: "var(--bg-body)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            fontSize: "15px",
            outline: "none",
            cursor: "pointer",
            minWidth: "160px",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
          onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </>
  );
}