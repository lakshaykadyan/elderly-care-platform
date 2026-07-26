import NotificationCard from "./NotificationCard";

export default function NotificationList({

  notifications,

  handleRead,

  processing,

}) {

  return (

    <>

      {notifications.map((notification) => (

        <NotificationCard

          key={notification._id}

          notification={notification}

          handleRead={handleRead}

          processing={processing}

        />

      ))}

    </>

  );

}