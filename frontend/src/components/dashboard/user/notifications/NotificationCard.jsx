export default function NotificationCard({

  notification,

  handleRead,

  processing,

}) {

  return (

    <div
      className="booking-card"
      style={{
        borderLeft: notification.isRead
          ? "5px solid #999"
          : "5px solid #4CAF50",
        marginBottom: "20px",
      }}
    >

      <p>{notification.message}</p>

      <p>
        <strong>Status :</strong>{" "}
        {notification.isRead
          ? "Read ✅"
          : "Unread 🔔"}
      </p>

      {!notification.isRead && (

        <button
          className="primary-btn"
          onClick={() => handleRead(notification._id)}
          disabled={processing}
        >
          {processing
            ? "Updating..."
            : "Mark as Read"}
        </button>

      )}

    </div>

  );

}