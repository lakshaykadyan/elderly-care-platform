import { Calendar } from "lucide-react";

export default function EmptyBookings() {
  return (
    <div
      className="profile-card"
      style={{
        textAlign: "center",
        padding: "60px",
      }}
    >
      <div
        style={{
          fontSize: "70px",
          color: "var(--text-muted)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Calendar size={70} strokeWidth={1.2} />
      </div>

      <h2
        style={{
          marginTop: "15px",
          color: "var(--text-primary)",
        }}
      >
        No Bookings Found
      </h2>

      <p
        style={{
          color: "var(--text-secondary)",
          marginTop: "10px",
        }}
      >
        You haven't booked any service yet.
      </p>
    </div>
  );
}