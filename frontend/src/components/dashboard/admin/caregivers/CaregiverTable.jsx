import CaregiverRow from "./CaregiverRow";

export default function CaregiverTable({ caregivers, handleVerify }) {
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
        minWidth: "800px",
        fontSize: "14px",
      }}>
        <thead>
          <tr style={{
            background: "#4f46e5",
            color: "#fff",
          }}>
            <th style={{ padding: "14px 16px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "14px 16px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "14px 16px", textAlign: "left" }}>Specialization</th>
            <th style={{ padding: "14px 16px", textAlign: "center" }}>Experience</th>
            <th style={{ padding: "14px 16px", textAlign: "left" }}>Service Area</th>
            <th style={{ padding: "14px 16px", textAlign: "center" }}>Status</th>
            <th style={{ padding: "14px 16px", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {caregivers.map((caregiver) => (
            <CaregiverRow key={caregiver._id} caregiver={caregiver} handleVerify={handleVerify} />
          ))}
        </tbody>
      </table>
    </div>
  );
}