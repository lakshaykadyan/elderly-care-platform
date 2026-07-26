import { useEffect, useRef, useState } from "react";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../../hooks/useNotification";

export default function NotificationPanel() {

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const panelRef = useRef(null);

  useEffect(() => {

    loadNotifications();

  }, []);

  const loadNotifications = async () => {

    try {

      setLoading(true);

      const data = await getNotifications();

      setNotifications(data.notifications || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };
    useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {

        setOpen(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  const latestNotifications = [...notifications]

    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )

    .slice(0, 5);

  const handleNotificationClick = async (id) => {

    try {

      await markAsRead(id);

      await loadNotifications();

    } catch (err) {

      console.log(err);

    }

  };

  const handleDelete = async (e, id) => {

    e.stopPropagation();

    try {

      await deleteNotification(id);

      loadNotifications();

    } catch (err) {

      console.log(err);

    }

  };

    return (

    <div
      className="notification-panel"
      ref={panelRef}
    >

      <div
        className="notification-bell"
        onClick={() => setOpen(!open)}
      >

        🔔

        {unreadCount > 0 && (

          <span className="notification-badge">

            {unreadCount}

          </span>

        )}

      </div>

      {open && (

        <div className="notification-dropdown">

          <div className="notification-header">

            <h3>Notifications</h3>

          </div>

          {loading ? (

            <p className="notification-empty">

              Loading...

            </p>

          ) : latestNotifications.length === 0 ? (

            <p className="notification-empty">

              No Notifications

            </p>

          ) : (

            latestNotifications.map((item) => (

              <div
                key={item._id}
                className={`notification-item ${
                  item.isRead ? "read" : "unread"
                }`}
                onClick={() => handleNotificationClick(item._id)}
              >

                <div
                  style={{
                    flex: 1,
                  }}
                >

                  <div className="notification-message">
                    {item.message}
                  </div>

                  <div className="notification-time">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>

                </div>

                <button
                  className="delete-btn"
                  onClick={(e) => handleDelete(e, item._id)}
                >
                  🗑
                </button>

              </div>

            ))

          )}

        </div>

      )}
    </div>

  );

}