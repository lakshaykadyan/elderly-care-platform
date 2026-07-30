import { useState } from "react";
import { SidebarProvider } from "../../../context/SidebarContext";
import Sidebar from "../../../components/dashboard/Sidebar";
import Topbar from "../../../components/dashboard/Topbar";
import Dashboard from "../../../components/dashboard/admin/Dashboard";
import Users from "../../../components/dashboard/admin/Users";
import Caregivers from "../../../components/dashboard/admin/Caregivers";
import Services from "../../../components/dashboard/admin/Services";
import Complaints from "../../../components/dashboard/admin/Complaints";
import Analytics from "../../../components/dashboard/admin/Analytics";
import Notifications from "../../../components/common/Notifications";

export default function AdminDashboard() {
 
  const [activePage, setActivePage] = useState(() => {
    return sessionStorage.getItem("adminActivePage") || "dashboard";
  });

  const handleSetActivePage = (page) => {
    setActivePage(page);
    sessionStorage.setItem("adminActivePage", page);
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "users": return <Users />;
      case "caregivers": return <Caregivers />;
      case "services": return <Services />;
      case "complaints": return <Complaints />;
      case "analytics": return <Analytics />;
      case "notifications": return <Notifications />;
      default: return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="dashboard-container">
        <Sidebar activePage={activePage} setActivePage={handleSetActivePage} role="admin" />
        <div className="dashboard-content">
          <Topbar />
          <div className="dashboard-main">{renderPage()}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}