export default function UserRow({
  user,
  selectedUsers,
  handleSelect,
  handleToggle,
  handleDelete,
}) {
  const isAdmin = user.role === "admin";

  return (
    <tr style={{
      borderBottom: "1px solid var(--border-color)",
      transition: "background 0.2s ease",
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-card)"}
    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
      <td style={{ padding: "12px 16px", textAlign: "center" }}>
        <input type="checkbox" checked={selectedUsers.includes(user._id)} onChange={() => handleSelect(user._id)} />
      </td>
      <td style={{ padding: "12px 16px", fontWeight: "600", color: "var(--text-primary)" }}>
        {user.name}
      </td>
      <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>
        {user.email}
      </td>
      <td style={{ padding: "12px 16px", textAlign: "center" }}>
        {isAdmin ? (
          <span style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", padding: "4px 14px", borderRadius: "30px", fontSize: "12px", fontWeight: "600" }}>
            👑 Admin
          </span>
        ) : user.role === "caregiver" ? (
          <span style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", padding: "4px 14px", borderRadius: "30px", fontSize: "12px", fontWeight: "600" }}>
            🩺 Caregiver
          </span>
        ) : (
          <span style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", padding: "4px 14px", borderRadius: "30px", fontSize: "12px", fontWeight: "600" }}>
            👤 User
          </span>
        )}
      </td>
      <td style={{ padding: "12px 16px", textAlign: "center" }}>
        {user.isActive ? (
          <span style={{ color: "#22c55e", fontWeight: "600" }}>🟢 Active</span>
        ) : (
          <span style={{ color: "#ef4444", fontWeight: "600" }}>🔴 Disabled</span>
        )}
      </td>
      <td style={{ padding: "12px 16px", textAlign: "center" }}>
        {isAdmin ? (
          <span style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", padding: "4px 14px", borderRadius: "30px", fontSize: "12px", fontWeight: "600" }}>
            🔒 Protected
          </span>
        ) : (
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => handleToggle(user._id)}
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                border: "none",
                background: user.isActive ? "#f59e0b" : "#22c55e",
                color: "#fff",
                fontWeight: "600",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {user.isActive ? "Disable" : "Enable"}
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                border: "none",
                background: "#ef4444",
                color: "#fff",
                fontWeight: "600",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}