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
        }}
      >
        📅
      </div>

      <h2
        style={{
          marginTop: "15px",
        }}
      >
        No Bookings Found
      </h2>

      <p
        style={{
          color: "#777",
          marginTop: "10px",
        }}
      >
        You haven't booked any service yet.
      </p>

    </div>

  );

}