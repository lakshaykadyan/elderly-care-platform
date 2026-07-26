import { useEffect, useState } from "react";
import { getAnalytics } from "../../../hooks/useAdmin";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import AnalyticsCards from "./analytics/AnalyticsCards";
import AnalyticsCharts from "./analytics/AnalyticsCharts";
import AnalyticsSummary from "./analytics/AnalyticsSummary";
import LoadingAnalytics from "./analytics/LoadingAnalytics";
import EmptyAnalytics from "./analytics/EmptyAnalytics";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCaregivers: 0,
    activeCaregivers: 0,
    verifiedCaregivers: 0,
    totalServices: 0,
    completedServices: 0,
    pendingServices: 0,
    acceptedServices: 0,
    inProgressServices: 0,
    rejectedServices: 0,
    totalComplaints: 0,
  });

  useEffect(() => { loadAnalytics(); }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAnalytics();
      setStats(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingAnalytics />;

  const hasData = stats.totalUsers || stats.totalCaregivers || stats.totalServices || stats.totalComplaints;

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "var(--text-primary)", margin: 0, letterSpacing: "-0.5px" }}>
          📊 Analytics Dashboard
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", margin: "6px 0 0 0" }}>
          Complete System Overview
        </p>
      </div>

      {!hasData ? <EmptyAnalytics /> : (
        <>
          <AnalyticsCards stats={stats} />
          <AnalyticsCharts stats={stats} />
          <AnalyticsSummary stats={stats} />
        </>
      )}
    </div>
  );
}