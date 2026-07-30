import { Bell } from "lucide-react";

export default function EmptyNotifications() {
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
        <Bell size={70} strokeWidth={1.2} />
      </div>

      <h2
        style={{
          marginTop: "15px",
          color: "var(--text-primary)",
        }}
      >
        No Notifications
      </h2>

      <p
        style={{
          color: "var(--text-secondary)",
          marginTop: "10px",
        }}
      >
        You're all caught up. New notifications will appear here.
      </p>
    </div>
  );
}