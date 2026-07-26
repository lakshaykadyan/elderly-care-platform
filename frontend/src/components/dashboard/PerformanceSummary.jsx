export default function PerformanceSummary({
  completionRate,
  rating,
  earnings,
  todayVisits,
}) {
  return (
    <div className="performance-summary">

      <h2>📈 Performance Summary</h2>

      <div className="performance-grid">

        <div className="performance-card">

          <div className="performance-icon">
            🎯
          </div>

          <h4>Completion Rate</h4>

          <div className="progress-circle">

          <span>{completionRate}%</span>

        </div>

      </div>

        <div className="performance-card">

          <div className="performance-icon">
            ⭐
          </div>

          <h4>Average Rating</h4>

          <h1>{rating}</h1>

        </div>

        <div className="performance-card">

          <div className="performance-icon">
            💰
          </div>

          <h4>Monthly Earnings</h4>

          <h1>₹{earnings}</h1>

        </div>

        <div className="performance-card">

          <div className="performance-icon">
            🚗
          </div>

          <h4>Today's Visits</h4>

          <h1>{todayVisits}</h1>

        </div>

      </div>

    </div>
  );
}