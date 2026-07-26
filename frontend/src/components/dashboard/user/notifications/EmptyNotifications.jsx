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
        }}
      >

        🔔

      </div>

      <h2
        style={{
          marginTop: "15px",
        }}
      >

        No Notifications

      </h2>

      <p
        style={{
          color: "#777",
          marginTop: "10px",
        }}
      >

        You're all caught up. New notifications will appear here.

      </p>

    </div>

  );

}