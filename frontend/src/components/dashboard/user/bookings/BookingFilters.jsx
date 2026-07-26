export default function BookingFilters({

  search,

  setSearch,

  filter,

  setFilter,

  totalBookings,

}) {

  const filters = [

    { label: "All", value: "all" },

    { label: "Pending", value: "pending" },

    { label: "Accepted", value: "accepted" },

    { label: "In Progress", value: "in-progress" },

    { label: "Completed", value: "completed" },

    { label: "Rejected", value: "rejected" },

  ];

  return (

    <>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "20px",
        }}
      >

        <input
          type="text"
          placeholder="🔍 Search Service..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            flex: 1,
            minWidth: "280px",
            padding: "12px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "10px",
            outline: "none",
          }}
        />

        <div
          style={{
            background: "#5867dd",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "10px",
            fontWeight: "600",
          }}
        >
          Total : {totalBookings}
        </div>

      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >

        {filters.map((item) => (

          <button
            key={item.value}
            onClick={() =>
              setFilter(item.value)
            }
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              background:
                filter === item.value
                  ? "#5867dd"
                  : "#eceff5",
              color:
                filter === item.value
                  ? "#fff"
                  : "#374151",
            }}
          >

            {item.label}

          </button>

        ))}

      </div>

    </>

  );

}