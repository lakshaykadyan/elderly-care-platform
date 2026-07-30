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
import { BarChart3, Users, Stethoscope, Calendar, AlertTriangle } from "lucide-react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function Analytics({ setActivePage }) {
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

  // ✅ Card click handlers - navigate to respective pages with filter
  const handleCardClick = (type) => {
    if (!setActivePage) return;
    
    if (type === "users") {
      // Users page pe jaao with filter "user"
      setActivePage("users");
      // Filter apply karne ke liye sessionStorage use karo
      sessionStorage.setItem("adminUsersFilter", "user");
    } else if (type === "caregivers") {
      setActivePage("caregivers");
      sessionStorage.setItem("adminUsersFilter", "caregiver");
    } else if (type === "services") {
      setActivePage("services");
    } else if (type === "complaints") {
      setActivePage("complaints");
    }
  };

  if (loading) return <LoadingAnalytics />;

  const hasData = stats.totalUsers || stats.totalCaregivers || stats.totalServices || stats.totalComplaints;

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ 
          fontSize: "28px", 
          fontWeight: "700", 
          color: "var(--text-primary)", 
          margin: 0, 
          letterSpacing: "-0.5px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <BarChart3 size={28} style={{ color: "var(--primary)" }} />
          Analytics Dashboard
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", margin: "6px 0 0 0" }}>
          Complete System Overview
        </p>
      </div>

      {/* ✅ Clickable Analytics Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "32px",
      }}>
        {[
          { 
            icon: <Users size={24} />, 
            label: "Total Users", 
            value: stats.totalUsers, 
            color: "#4f46e5",
            type: "users"
          },
          { 
            icon: <Stethoscope size={24} />, 
            label: "Caregivers", 
            value: stats.totalCaregivers, 
            color: "#22c55e",
            type: "caregivers"
          },
          { 
            icon: <Calendar size={24} />, 
            label: "Services", 
            value: stats.totalServices, 
            color: "#f59e0b",
            type: "services"
          },
          { 
            icon: <AlertTriangle size={24} />, 
            label: "Complaints", 
            value: stats.totalComplaints, 
            color: "#ef4444",
            type: "complaints"
          },
        ].map((card, i) => (
          <div
            key={i}
            onClick={() => handleCardClick(card.type)}
            style={{
              background: "var(--bg-card)",
              padding: "20px 24px",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
              e.currentTarget.style.boxShadow = "0 12px 32px -8px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: `${card.color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: card.color,
            }}>
              {card.icon}
            </div>
            <div>
              <span style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "var(--text-muted)",
                display: "block",
              }}>
                {card.label}
              </span>
              <h3 style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--text-primary)",
                margin: 0,
              }}>
                {card.value}
              </h3>
            </div>
          </div>
        ))}
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