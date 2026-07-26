import ComplaintRow from "./ComplaintRow";

export default function ComplaintTable({
  complaints,
  reply,
  setReply,
  handleReply,
}) {
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
            <th style={{ padding: "14px 16px", textAlign: "left", minWidth: "100px" }}>User</th>
            <th style={{ padding: "14px 16px", textAlign: "left", minWidth: "120px" }}>Subject</th>
            <th style={{ padding: "14px 16px", textAlign: "left", minWidth: "200px" }}>Message</th>
            <th style={{ padding: "14px 16px", textAlign: "center", minWidth: "100px" }}>Status</th>
            <th style={{ padding: "14px 16px", textAlign: "left", minWidth: "220px" }}>Reply</th>
            <th style={{ padding: "14px 16px", textAlign: "center", minWidth: "100px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <ComplaintRow
              key={complaint._id}
              complaint={complaint}
              reply={reply}
              setReply={setReply}
              handleReply={handleReply}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}