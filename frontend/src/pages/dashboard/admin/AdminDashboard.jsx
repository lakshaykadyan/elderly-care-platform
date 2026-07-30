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
      case "dashboard":
        return <Dashboard setActivePage={handleSetActivePage} />;
      case "users": {
        const filter = sessionStorage.getItem("adminUsersFilter") || "all";
        sessionStorage.removeItem("adminUsersFilter");
        return <Users initialFilter={filter} page="users" />;  
      }
      case "caregivers": {
        const filter = sessionStorage.getItem("adminUsersFilter") || "verified";
        sessionStorage.removeItem("adminUsersFilter");
        return <Users initialFilter={filter} page="caregivers" />; 
      }
      case "services": {
        const filter = sessionStorage.getItem("adminServicesFilter") || null;
        sessionStorage.removeItem("adminServicesFilter");
        return <Services initialFilter={filter} />;
      }
      case "complaints":
        return <Complaints />;
      case "analytics":
        return <Analytics setActivePage={handleSetActivePage} />;
      case "notifications":
        return <Notifications />;
      default:
        return <Dashboard setActivePage={handleSetActivePage} />;
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