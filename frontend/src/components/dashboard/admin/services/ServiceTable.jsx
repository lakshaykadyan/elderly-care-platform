import ServiceRow from "./ServiceRow";

export default function ServiceTable({
  services,
  caregivers,
  selectedCaregiver,
  setSelectedCaregiver,
  assignCaregiver,
  updateStatus,
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
            <th style={{ padding: "14px 16px", textAlign: "left", minWidth: "120px" }}>Patient</th>
            <th style={{ padding: "14px 16px", textAlign: "left", minWidth: "120px" }}>Service</th>
            <th style={{ padding: "14px 16px", textAlign: "center", minWidth: "100px" }}>Status</th>
            <th style={{ padding: "14px 16px", textAlign: "left", minWidth: "150px" }}>Caregiver</th>
            <th style={{ padding: "14px 16px", textAlign: "center", minWidth: "90px" }}>Assign</th>
            <th style={{ padding: "14px 16px", textAlign: "center", minWidth: "140px" }}>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <ServiceRow
              key={service._id}
              service={service}
              caregivers={caregivers}
              selectedCaregiver={selectedCaregiver}
              setSelectedCaregiver={setSelectedCaregiver}
              assignCaregiver={assignCaregiver}
              updateStatus={updateStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}