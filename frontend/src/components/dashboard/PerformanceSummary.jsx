import { TrendingUp, Target, Star, DollarSign, Car } from "lucide-react";

export default function PerformanceSummary({
  completionRate,
  rating,
  earnings,
  todayVisits,
}) {
  return (
    <div className="performance-summary">
      <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <TrendingUp size={20} /> Performance Summary
      </h2>

      <div className="performance-grid">
        <div className="performance-card">
          <div className="performance-icon"><Target size={24} /></div>
          <h4>Completion Rate</h4>
          <div className="progress-circle"><span>{completionRate}%</span></div>
        </div>

        <div className="performance-card">
          <div className="performance-icon"><Star size={24} /></div>
          <h4>Average Rating</h4>
          <h1>{rating}</h1>
        </div>

        <div className="performance-card">
          <div className="performance-icon"><DollarSign size={24} /></div>
          <h4>Monthly Earnings</h4>
          <h1>₹{earnings}</h1>
        </div>

        <div className="performance-card">
          <div className="performance-icon"><Car size={24} /></div>
          <h4>Today's Visits</h4>
          <h1>{todayVisits}</h1>
        </div>
      </div>
    </div>
  );
}