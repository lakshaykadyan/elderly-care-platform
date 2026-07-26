import UserRow from "./UserRow";
import EmptyUsers from "./EmptyUsers";

export default function UserTable({
  users,
  selectedUsers,
  handleSelect,
  handleSelectAll,
  handleSort,
  sortField,
  sortOrder,
  handleToggle,
  handleDelete,
}) {
  if (users.length === 0) return <EmptyUsers />;

  return (
    <div style={{
      overflowX: "auto",
      background: "var(--bg-body)",
      borderRadius: "16px",
      border: "1px solid var(--border-color)",
    }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "900px",
        fontSize: "14px",
      }}>
        <thead>
          <tr style={{
            background: "#4f46e5",
            color: "#fff",
          }}>
            <th style={{ padding: "14px 16px", textAlign: "center", width: "50px" }}>
              <input type="checkbox" checked={users.length > 0 && selectedUsers.length === users.length} onChange={handleSelectAll} />
            </th>
            <th style={{ padding: "14px 16px", textAlign: "left", cursor: "pointer" }} onClick={() => handleSort("name")}>
              Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
            </th>
            <th style={{ padding: "14px 16px", textAlign: "left", cursor: "pointer" }} onClick={() => handleSort("email")}>
              Email {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
            </th>
            <th style={{ padding: "14px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => handleSort("role")}>
              Role {sortField === "role" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
            </th>
            <th style={{ padding: "14px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => handleSort("isActive")}>
              Status {sortField === "isActive" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
            </th>
            <th style={{ padding: "14px 16px", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              selectedUsers={selectedUsers}
              handleSelect={handleSelect}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}