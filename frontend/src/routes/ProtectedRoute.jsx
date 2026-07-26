import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for AuthContext to load user from localStorage
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: 'var(--text-secondary)'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // If no user, redirect to login (replace prevents back navigation)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based protection
  const path = location.pathname;
  const role = user.role?.toLowerCase();

  if (path.startsWith("/dashboard/admin") && role !== "admin") {
    return <Navigate to={`/dashboard/${role}`} replace />;
  }
  if (path.startsWith("/dashboard/caregiver") && role !== "caregiver") {
    return <Navigate to={`/dashboard/${role}`} replace />;
  }
  if (path.startsWith("/dashboard/user") && role !== "user") {
    return <Navigate to={`/dashboard/${role}`} replace />;
  }

  return children;
}