export default function RecentActivity({
  title = "Recent Activity",
  activities = [],
}) {
  return (
    <div className="recent-activity">

      <div className="recent-header">

        <h2>{title}</h2>

        <span>
          {activities.length} Records
        </span>

      </div>

      {activities.length === 0 ? (

        <div className="recent-empty">

          <h3>No Recent Activity</h3>

          <p>
            Activity will appear here.
          </p>

        </div>

      ) : (

        <div className="recent-list">

          {activities.map((service) => (

            <div
              key={service._id}
              className="recent-card"
              title="View Recent Service"
            >

              <div className="recent-left">

                <div className="recent-avatar">

                  {service.userId?.name?.charAt(0)?.toUpperCase() || "👤"}

                </div>

                <div>

                  <h3>
                    {service.userId?.name}
                  </h3>

                  <p>
                    🏥 {service.serviceType}
                  </p>

                </div>

              </div>

              <div className="recent-right">

                <span
                  className={`status ${service.status}`}
                >
                  {service.status}
                </span>

                <small>
                  {new Date(service.createdAt).toLocaleDateString()}
                </small>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}