import { useState } from "react";
import { SidebarProvider } from "../../../context/SidebarContext";
import Sidebar from "../../../components/dashboard/Sidebar"; 
import Topbar from "../../../components/dashboard/Topbar";

import CaregiverHome from "../../../components/dashboard/caregiver/CaregiverDashboard";
import AssignedServices from "../../../components/dashboard/caregiver/AssignedServices";
import Availability from "../../../components/dashboard/caregiver/Availability";
import Notifications from "../../../components/dashboard/caregiver/CaregiverNotifications";
import CaregiverProfile from "../../../components/dashboard/caregiver/CaregiverProfile";

export default function CaregiverDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <CaregiverHome />;
      case "profile": return <CaregiverProfile />;
      case "services": return <AssignedServices />;
      case "availability": return <Availability />;
      case "notifications": return <Notifications />;
      default: return <CaregiverHome />;
    }
  };

  return (
    <SidebarProvider>
      <div className="dashboard-container">
        <Sidebar activePage={activePage} setActivePage={setActivePage} role="caregiver" />
        <div className="dashboard-content">
          <Topbar />
          <div className="dashboard-main">{renderPage()}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}